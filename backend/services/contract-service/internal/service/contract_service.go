package service

import (
	"context"
	"encoding/json"
	"errors"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/saiyam0211/defellix/services/contract-service/internal/domain"
	"github.com/saiyam0211/defellix/services/contract-service/internal/dto"
	"github.com/saiyam0211/defellix/services/contract-service/internal/notification"
	"github.com/saiyam0211/defellix/services/contract-service/internal/repository"
)

var (
	ErrNotDraft           = errors.New("contract is not in draft status")
	ErrAlreadySent        = errors.New("contract was already sent")
	ErrAlreadySigned      = errors.New("contract was already signed")
	ErrAlreadyPending     = errors.New("contract is already pending review")
	ErrInvalidCompanyAddr = errors.New("company_address must be 'Remote', a full address, or a valid URL")
)

type ContractService struct {
	repo                 repository.ContractRepository
	shareableLinkBaseURL string
	notifier             notification.ContractNotifier
	draftExpiryDays      int
}

// NewContractService creates the contract service. shareableLinkBaseURL is used for shareable_link when status is sent (e.g. https://app.ourdomain.com/contract).
// draftExpiryDays is used by DeleteExpiredDrafts; if <= 0, 14 is used.
func NewContractService(repo repository.ContractRepository, shareableLinkBaseURL string, notifier notification.ContractNotifier, draftExpiryDays int) *ContractService {
	if draftExpiryDays <= 0 {
		draftExpiryDays = 14
	}
	return &ContractService{
		repo:                 repo,
		shareableLinkBaseURL: strings.TrimSuffix(shareableLinkBaseURL, "/"),
		notifier:             notifier,
		draftExpiryDays:      draftExpiryDays,
	}
}

func (s *ContractService) Create(ctx context.Context, freelancerUserID uint, req *dto.CreateContractRequest) (*dto.ContractResponse, error) {
	currency := req.Currency
	if currency == "" {
		currency = "INR"
	}
	c := &domain.Contract{
		FreelancerUserID:   freelancerUserID,
		ProjectCategory:    req.ProjectCategory,
		ProjectName:        req.ProjectName,
		Description:        req.Description,
		DueDate:            req.DueDate,
		TotalAmount:        req.TotalAmount,
		Currency:           currency,
		PRDFileURL:         req.PRDFileURL,
		SubmissionCriteria: req.SubmissionCriteria,
		ClientName:         req.ClientName,
		ClientCompanyName:  req.ClientCompanyName,
		ClientEmail:        req.ClientEmail,
		ClientPhone:        req.ClientPhone,
		TermsAndConditions: req.TermsAndConditions,
		Status:             domain.ContractStatusDraft,
	}
	ms := milestonesFromInput(req.Milestones)
	if err := s.repo.Create(ctx, c, ms); err != nil {
		return nil, err
	}
	return s.toResponse(c, ms), nil
}

func (s *ContractService) GetByID(ctx context.Context, id uint, freelancerUserID uint) (*dto.ContractResponse, error) {
	c, err := s.repo.GetByID(ctx, id, freelancerUserID)
	if err != nil {
		return nil, err
	}
	return s.contractToResponse(c), nil
}

func (s *ContractService) List(ctx context.Context, freelancerUserID uint, status string, page, limit int) ([]*dto.ContractResponse, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	list, total, err := s.repo.ListByFreelancer(ctx, freelancerUserID, status, page, limit)
	if err != nil {
		return nil, 0, err
	}
	out := make([]*dto.ContractResponse, len(list))
	for i, c := range list {
		out[i] = s.contractToResponse(c)
	}
	return out, total, nil
}

func (s *ContractService) Update(ctx context.Context, id uint, freelancerUserID uint, req *dto.UpdateContractRequest) (*dto.ContractResponse, error) {
	c, err := s.repo.GetByID(ctx, id, freelancerUserID)
	if err != nil {
		return nil, err
	}
	if c.Status != domain.ContractStatusDraft && c.Status != domain.ContractStatusPending {
		return nil, ErrNotDraft
	}
	applyUpdate(c, req)
	if len(req.Milestones) > 0 {
		ms := milestonesFromInput(req.Milestones)
		if err := s.repo.Update(ctx, c, ms); err != nil {
			return nil, err
		}
		c.Milestones = ms
	} else {
		if err := s.repo.UpdateContractOnly(ctx, c); err != nil {
			return nil, err
		}
	}
	return s.contractToResponse(c), nil
}

func (s *ContractService) Send(ctx context.Context, id uint, freelancerUserID uint) (*dto.ContractResponse, error) {
	c, err := s.repo.GetByID(ctx, id, freelancerUserID)
	if err != nil {
		return nil, err
	}
	now := time.Now()
	switch c.Status {
	case domain.ContractStatusSent:
		return nil, ErrAlreadySent
	case domain.ContractStatusDraft:
		clientToken := uuid.New().String()
		if err := s.repo.UpdateStatusSentAtAndClientToken(ctx, id, freelancerUserID, domain.ContractStatusSent, &now, clientToken); err != nil {
			return nil, err
		}
		c.Status = domain.ContractStatusSent
		c.SentAt = &now
		c.ClientViewToken = clientToken
		shareableLink := s.buildShareableLinkForContract(c)
		go s.notifier.NotifyContractSent(context.Background(), id, c.ClientEmail, shareableLink)
		return s.contractToResponse(c), nil
	case domain.ContractStatusPending:
		if err := s.repo.UpdateStatusAndSentAt(ctx, id, freelancerUserID, domain.ContractStatusSent, &now); err != nil {
			return nil, err
		}
		c.Status = domain.ContractStatusSent
		c.SentAt = &now
		return s.contractToResponse(c), nil
	default:
		return nil, ErrNotDraft
	}
}

// GetByClientToken returns the contract for the client view (no auth). Token is the client_view_token from the link.
func (s *ContractService) GetByClientToken(ctx context.Context, token string) (*dto.PublicContractViewResponse, error) {
	c, err := s.repo.FindByClientViewToken(ctx, token)
	if err != nil {
		return nil, err
	}
	return toPublicViewResponse(c), nil
}

// SendForReview sets status to pending and stores the client's comment. Allowed only when status is sent.
func (s *ContractService) SendForReview(ctx context.Context, token string, req *dto.SendForReviewRequest) error {
	c, err := s.repo.FindByClientViewToken(ctx, token)
	if err != nil {
		return err
	}
	if c.Status == domain.ContractStatusPending {
		return ErrAlreadyPending
	}
	if c.Status != domain.ContractStatusSent {
		return repository.ErrContractNotFound
	}
	return s.repo.UpdateToPendingByToken(ctx, token, strings.TrimSpace(req.Comment))
}

// Sign records client sign with required company_address and optional metadata. Allowed only when status is sent. No blockchain here (3.4).
func (s *ContractService) Sign(ctx context.Context, token string, req *dto.SignRequest) (*dto.PublicContractViewResponse, error) {
	if err := validateCompanyAddress(req.CompanyAddress); err != nil {
		return nil, err
	}
	c, err := s.repo.FindByClientViewToken(ctx, token)
	if err != nil {
		return nil, err
	}
	if c.Status == domain.ContractStatusSigned {
		return nil, ErrAlreadySigned
	}
	if c.Status != domain.ContractStatusSent {
		return nil, repository.ErrContractNotFound
	}
	meta := signMetadataFromRequest(req)
	metaJSON, _ := json.Marshal(meta)
	now := time.Now()
	if err := s.repo.UpdateToSignedByToken(ctx, token, &now, strings.TrimSpace(req.CompanyAddress), string(metaJSON)); err != nil {
		return nil, err
	}
	c.Status = domain.ContractStatusSigned
	c.ClientSignedAt = &now
	c.ClientCompanyAddress = strings.TrimSpace(req.CompanyAddress)
	return toPublicViewResponse(c), nil
}

func validateCompanyAddress(s string) error {
	s = strings.TrimSpace(s)
	if s == "" {
		return ErrInvalidCompanyAddr
	}
	if strings.EqualFold(s, "Remote") {
		return nil
	}
	if len(s) > 500 {
		return ErrInvalidCompanyAddr
	}
	// if it looks like a URL, validate
	if strings.HasPrefix(s, "http://") || strings.HasPrefix(s, "https://") {
		if u, err := url.Parse(s); err != nil || u.Host == "" {
			return ErrInvalidCompanyAddr
		}
	}
	return nil
}

func signMetadataFromRequest(req *dto.SignRequest) map[string]string {
	m := make(map[string]string)
	if req.Email != "" {
		m["email"] = strings.TrimSpace(req.Email)
	}
	if req.Phone != "" {
		m["phone"] = strings.TrimSpace(req.Phone)
	}
	if req.CompanyName != "" {
		m["company_name"] = strings.TrimSpace(req.CompanyName)
	}
	if req.GSTNumber != "" {
		m["gst_number"] = strings.TrimSpace(req.GSTNumber)
	}
	if req.BusinessEmail != "" {
		m["business_email"] = strings.TrimSpace(req.BusinessEmail)
	}
	if req.Instagram != "" {
		m["instagram"] = strings.TrimSpace(req.Instagram)
	}
	if req.LinkedIn != "" {
		m["linkedin"] = strings.TrimSpace(req.LinkedIn)
	}
	return m
}

func toPublicViewResponse(c *domain.Contract) *dto.PublicContractViewResponse {
	return &dto.PublicContractViewResponse{
		ID:                  c.ID,
		ProjectCategory:     c.ProjectCategory,
		ProjectName:         c.ProjectName,
		Description:         c.Description,
		DueDate:             c.DueDate,
		TotalAmount:         c.TotalAmount,
		Currency:            c.Currency,
		PRDFileURL:          c.PRDFileURL,
		SubmissionCriteria:  c.SubmissionCriteria,
		ClientName:          c.ClientName,
		ClientCompanyName:   c.ClientCompanyName,
		ClientEmail:         c.ClientEmail,
		ClientPhone:         c.ClientPhone,
		TermsAndConditions:  c.TermsAndConditions,
		Status:              c.Status,
		SentAt:              c.SentAt,
		ClientReviewComment: c.ClientReviewComment,
		Milestones:          milestonesToResponse(c.Milestones),
		CreatedAt:           c.CreatedAt,
		UpdatedAt:           c.UpdatedAt,
	}
}

func (s *ContractService) Delete(ctx context.Context, id uint, freelancerUserID uint) error {
	c, err := s.repo.GetByID(ctx, id, freelancerUserID)
	if err != nil {
		return err
	}
	if c.Status != domain.ContractStatusDraft {
		return ErrNotDraft
	}
	return s.repo.Delete(ctx, id, freelancerUserID)
}

// DeleteExpiredDrafts permanently deletes draft contracts older than draftExpiryDays. Returns the number deleted.
// Used by the scheduled draft-cleanup job.
func (s *ContractService) DeleteExpiredDrafts(ctx context.Context) (int64, error) {
	cutoff := time.Now().Add(-time.Duration(s.draftExpiryDays) * 24 * time.Hour)
	return s.repo.DeleteDraftsOlderThan(ctx, cutoff)
}

func (s *ContractService) buildShareableLink(contractID uint) string {
	if s.shareableLinkBaseURL == "" {
		return ""
	}
	return s.shareableLinkBaseURL + "/" + strconv.FormatUint(uint64(contractID), 10)
}

// buildShareableLinkForContract returns the client-facing link: base/token when token is set, else base/id.
func (s *ContractService) buildShareableLinkForContract(c *domain.Contract) string {
	if s.shareableLinkBaseURL == "" {
		return ""
	}
	if c.Status == domain.ContractStatusSent && c.ClientViewToken != "" {
		return s.shareableLinkBaseURL + "/" + c.ClientViewToken
	}
	return s.shareableLinkBaseURL + "/" + strconv.FormatUint(uint64(c.ID), 10)
}

func milestonesFromInput(in []dto.MilestoneInput) []domain.ContractMilestone {
	out := make([]domain.ContractMilestone, len(in))
	for i := range in {
		out[i] = domain.ContractMilestone{
			Title:             in[i].Title,
			Description:       in[i].Description,
			Amount:            in[i].Amount,
			DueDate:           in[i].DueDate,
			IsInitialPayment:  in[i].IsInitialPayment,
			Status:            "pending",
		}
	}
	return out
}

func applyUpdate(c *domain.Contract, req *dto.UpdateContractRequest) {
	if req.ProjectCategory != nil {
		c.ProjectCategory = *req.ProjectCategory
	}
	if req.ProjectName != nil {
		c.ProjectName = *req.ProjectName
	}
	if req.Description != nil {
		c.Description = *req.Description
	}
	if req.DueDate != nil {
		c.DueDate = req.DueDate
	}
	if req.TotalAmount != nil {
		c.TotalAmount = *req.TotalAmount
	}
	if req.Currency != nil {
		c.Currency = *req.Currency
	}
	if req.PRDFileURL != nil {
		c.PRDFileURL = *req.PRDFileURL
	}
	if req.SubmissionCriteria != nil {
		c.SubmissionCriteria = *req.SubmissionCriteria
	}
	if req.ClientName != nil {
		c.ClientName = *req.ClientName
	}
	if req.ClientCompanyName != nil {
		c.ClientCompanyName = *req.ClientCompanyName
	}
	if req.ClientEmail != nil {
		c.ClientEmail = *req.ClientEmail
	}
	if req.ClientPhone != nil {
		c.ClientPhone = *req.ClientPhone
	}
	if req.TermsAndConditions != nil {
		c.TermsAndConditions = *req.TermsAndConditions
	}
}

func (s *ContractService) toResponse(c *domain.Contract, ms []domain.ContractMilestone) *dto.ContractResponse {
	shareable := s.buildShareableLinkForContract(c)
	return s.toResponseWithShareable(c, ms, shareable)
}

func (s *ContractService) toResponseWithShareable(c *domain.Contract, ms []domain.ContractMilestone, shareableLink string) *dto.ContractResponse {
	return &dto.ContractResponse{
		ID:                 c.ID,
		FreelancerUserID:   c.FreelancerUserID,
		ProjectCategory:    c.ProjectCategory,
		ProjectName:        c.ProjectName,
		Description:        c.Description,
		DueDate:            c.DueDate,
		TotalAmount:        c.TotalAmount,
		Currency:           c.Currency,
		PRDFileURL:         c.PRDFileURL,
		SubmissionCriteria: c.SubmissionCriteria,
		ClientName:         c.ClientName,
		ClientCompanyName:  c.ClientCompanyName,
		ClientEmail:        c.ClientEmail,
		ClientPhone:        c.ClientPhone,
		TermsAndConditions: c.TermsAndConditions,
		Status:             c.Status,
		SentAt:             c.SentAt,
		ShareableLink:      shareableLink,
		Milestones:         milestonesToResponse(ms),
		CreatedAt:          c.CreatedAt,
		UpdatedAt:          c.UpdatedAt,
	}
}

func (s *ContractService) contractToResponse(c *domain.Contract) *dto.ContractResponse {
	return s.toResponse(c, c.Milestones)
}

func milestonesToResponse(ms []domain.ContractMilestone) []dto.MilestoneResponse {
	out := make([]dto.MilestoneResponse, len(ms))
	for i := range ms {
		out[i] = dto.MilestoneResponse{
			ID:               ms[i].ID,
			OrderIndex:       ms[i].OrderIndex,
			Title:            ms[i].Title,
			Description:      ms[i].Description,
			Amount:           ms[i].Amount,
			DueDate:          ms[i].DueDate,
			IsInitialPayment: ms[i].IsInitialPayment,
			Status:           ms[i].Status,
			CreatedAt:        ms[i].CreatedAt,
			UpdatedAt:        ms[i].UpdatedAt,
		}
	}
	return out
}
