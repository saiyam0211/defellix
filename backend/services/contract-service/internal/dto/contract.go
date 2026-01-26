package dto

import "time"

// CreateContractRequest is the payload for creating or saving a contract as draft
type CreateContractRequest struct {
	// Project
	ProjectCategory    string     `json:"project_category" validate:"required,max=80"`
	ProjectName        string     `json:"project_name" validate:"required,min=2,max=200"`
	Description        string     `json:"description" validate:"omitempty,max=5000"`
	DueDate            *time.Time `json:"due_date,omitempty"`
	TotalAmount        float64    `json:"total_amount" validate:"required,min=0"`
	Currency           string     `json:"currency" validate:"omitempty,len=3"`
	PRDFileURL         string     `json:"prd_file_url,omitempty" validate:"omitempty,url"`
	SubmissionCriteria string     `json:"submission_criteria,omitempty" validate:"omitempty,max=2000"`

	// Client
	ClientName        string `json:"client_name" validate:"required,max=120"`
	ClientCompanyName string `json:"client_company_name,omitempty" validate:"omitempty,max=120"`
	ClientEmail       string `json:"client_email" validate:"required,email"`
	ClientPhone       string `json:"client_phone,omitempty" validate:"omitempty,max=30"`

	// Terms
	TermsAndConditions string `json:"terms_and_conditions,omitempty" validate:"omitempty,max=10000"`

	// Milestones (at least one; first can be initial payment)
	Milestones []MilestoneInput `json:"milestones" validate:"required,min=1,dive"`
}

// MilestoneInput is one milestone in create/update payload
type MilestoneInput struct {
	Title             string     `json:"title" validate:"required,max=200"`
	Description       string     `json:"description,omitempty" validate:"omitempty,max=2000"`
	Amount            float64    `json:"amount" validate:"required,min=0"`
	DueDate           *time.Time `json:"due_date,omitempty"`
	IsInitialPayment  bool       `json:"is_initial_payment"`
}

// UpdateContractRequest is the payload for updating a draft contract
type UpdateContractRequest struct {
	ProjectCategory    *string    `json:"project_category,omitempty" validate:"omitempty,max=80"`
	ProjectName        *string    `json:"project_name,omitempty" validate:"omitempty,max=200"`
	Description        *string    `json:"description,omitempty" validate:"omitempty,max=5000"`
	DueDate            *time.Time `json:"due_date,omitempty"`
	TotalAmount        *float64   `json:"total_amount,omitempty" validate:"omitempty,min=0"`
	Currency           *string    `json:"currency,omitempty" validate:"omitempty,len=3"`
	PRDFileURL         *string    `json:"prd_file_url,omitempty" validate:"omitempty,url"`
	SubmissionCriteria *string    `json:"submission_criteria,omitempty" validate:"omitempty,max=2000"`
	ClientName         *string    `json:"client_name,omitempty" validate:"omitempty,max=120"`
	ClientCompanyName  *string    `json:"client_company_name,omitempty" validate:"omitempty,max=120"`
	ClientEmail        *string    `json:"client_email,omitempty" validate:"omitempty,email"`
	ClientPhone        *string    `json:"client_phone,omitempty" validate:"omitempty,max=30"`
	TermsAndConditions *string    `json:"terms_and_conditions,omitempty" validate:"omitempty,max=10000"`
	Milestones         []MilestoneInput `json:"milestones,omitempty" validate:"omitempty,dive"`
}

// ContractResponse is the API response for a contract (with milestones)
type ContractResponse struct {
	ID                 uint                 `json:"id"`
	FreelancerUserID   uint                 `json:"freelancer_user_id"`
	ProjectCategory    string               `json:"project_category"`
	ProjectName        string               `json:"project_name"`
	Description        string               `json:"description"`
	DueDate            *time.Time           `json:"due_date,omitempty"`
	TotalAmount        float64              `json:"total_amount"`
	Currency           string               `json:"currency"`
	PRDFileURL         string               `json:"prd_file_url,omitempty"`
	SubmissionCriteria string               `json:"submission_criteria,omitempty"`
	ClientName         string               `json:"client_name"`
	ClientCompanyName  string               `json:"client_company_name,omitempty"`
	ClientEmail        string               `json:"client_email"`
	ClientPhone        string               `json:"client_phone,omitempty"`
	TermsAndConditions string               `json:"terms_and_conditions,omitempty"`
	Status             string               `json:"status"`
	SentAt             *time.Time           `json:"sent_at,omitempty"`
	ShareableLink      string               `json:"shareable_link,omitempty"` // Set when status is sent; base URL + /:id
	Milestones         []MilestoneResponse  `json:"milestones"`
	CreatedAt          time.Time            `json:"created_at"`
	UpdatedAt          time.Time            `json:"updated_at"`
}

// MilestoneResponse is one milestone in API response
type MilestoneResponse struct {
	ID                uint       `json:"id"`
	OrderIndex        int        `json:"order_index"`
	Title             string     `json:"title"`
	Description       string     `json:"description,omitempty"`
	Amount            float64    `json:"amount"`
	DueDate           *time.Time `json:"due_date,omitempty"`
	IsInitialPayment  bool       `json:"is_initial_payment"`
	Status            string     `json:"status"`
	CreatedAt         time.Time  `json:"created_at"`
	UpdatedAt         time.Time  `json:"updated_at"`
}

// ListContractsQuery is used for GET /contracts query params
type ListContractsQuery struct {
	Status string `json:"status"` // draft, sent, ...
	Page   int    `json:"page"`
	Limit  int    `json:"limit"`
}
