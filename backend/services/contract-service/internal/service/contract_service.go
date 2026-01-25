package service

import (
	"context"
	"errors"
	"time"

	"github.com/saiyam0211/defellix/services/contract-service/internal/domain"
	"github.com/saiyam0211/defellix/services/contract-service/internal/dto"
	"github.com/saiyam0211/defellix/services/contract-service/internal/repository"
)

var (
	ErrNotDraft    = errors.New("contract is not in draft status")
	ErrAlreadySent = errors.New("contract was already sent")
)

type ContractService struct {
	repo repository.ContractRepository
}

func NewContractService(repo repository.ContractRepository) *ContractService {
	return &ContractService{repo: repo}
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
	if c.Status != domain.ContractStatusDraft {
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
	if c.Status != domain.ContractStatusDraft {
		if c.Status == domain.ContractStatusSent {
			return nil, ErrAlreadySent
		}
		return nil, ErrNotDraft
	}
	now := time.Now()
	if err := s.repo.UpdateStatusAndSentAt(ctx, id, freelancerUserID, domain.ContractStatusSent, &now); err != nil {
		return nil, err
	}
	c.Status = domain.ContractStatusSent
	c.SentAt = &now
	return s.contractToResponse(c), nil
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
