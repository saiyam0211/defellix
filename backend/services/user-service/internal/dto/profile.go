package dto

// CreateProfileRequest represents the request to create a freelancer profile
// This is called after registration with required fields
type CreateProfileRequest struct {
	// Required fields at registration
	FullName      string   `json:"full_name" validate:"required,min=2,max=100"`
	Photo         string   `json:"photo,omitempty" validate:"omitempty,url"`
	ShortHeadline string   `json:"short_headline" validate:"required,min=10,max=150"`
	Role          string   `json:"role" validate:"required,oneof=freelancer client both"`
	Location      string   `json:"location,omitempty" validate:"omitempty,max=100"`
	Experience    string   `json:"experience,omitempty" validate:"omitempty,max=50"`

	// Social links
	GitHubLink    string `json:"github_link,omitempty" validate:"omitempty,url"`
	LinkedInLink  string `json:"linkedin_link,omitempty" validate:"omitempty,url"`
	PortfolioLink string `json:"portfolio_link,omitempty" validate:"omitempty,url"`
	InstagramLink string `json:"instagram_link,omitempty" validate:"omitempty,url"`

	// Skills (multiple)
	Skills []string `json:"skills" validate:"required,min=1,dive,min=2,max=50"`

	// Public profile slug for ourdomain.com/user_name (optional; 3–30 chars, normalized to lowercase in backend)
	UserName string `json:"user_name,omitempty" validate:"omitempty,min=3,max=30"`
}

// UpdateProfileRequest represents the request to update user profile
// Includes all fields that can be updated after profile creation
type UpdateProfileRequest struct {
	FullName      string   `json:"full_name,omitempty" validate:"omitempty,min=2,max=100"`
	Photo         string   `json:"photo,omitempty" validate:"omitempty,url"`
	ShortHeadline string   `json:"short_headline,omitempty" validate:"omitempty,min=10,max=150"`
	Bio           string   `json:"bio,omitempty" validate:"omitempty,max=1000"`
	Location      string   `json:"location,omitempty" validate:"omitempty,max=100"`
	Experience    string   `json:"experience,omitempty" validate:"omitempty,max=50"`
	Timezone      string   `json:"timezone,omitempty" validate:"omitempty"`
	Phone         string   `json:"phone,omitempty" validate:"omitempty"`
	HourlyRate    *float64 `json:"hourly_rate,omitempty" validate:"omitempty,min=0"`
	Availability  string   `json:"availability,omitempty" validate:"omitempty,oneof=full-time part-time available unavailable"`

	// Social links
	GitHubLink    string `json:"github_link,omitempty" validate:"omitempty,url"`
	LinkedInLink  string `json:"linkedin_link,omitempty" validate:"omitempty,url"`
	PortfolioLink string `json:"portfolio_link,omitempty" validate:"omitempty,url"`
	InstagramLink string `json:"instagram_link,omitempty" validate:"omitempty,url"`

	CompanyName string `json:"company_name,omitempty" validate:"omitempty,max=100"`
	CompanySize string `json:"company_size,omitempty" validate:"omitempty,oneof=startup small medium large"`

	// Public profile: ourdomain.com/user_name (3–30 chars; normalized to lowercase in backend)
	UserName string `json:"user_name,omitempty" validate:"omitempty,min=3,max=30"`

	// Visibility: what to show on public profile
	ShowProfile   *bool `json:"show_profile,omitempty"`
	ShowProjects  *bool `json:"show_projects,omitempty"`
	ShowContracts *bool `json:"show_contracts,omitempty"`
}

// AddProjectRequest represents the request to add a project
type AddProjectRequest struct {
	ProjectName  string        `json:"project_name" validate:"required,min=2,max=100"`
	Description  string        `json:"description,omitempty" validate:"omitempty,max=1000"`
	Screenshots  []string      `json:"screenshots,omitempty" validate:"omitempty,dive,url"`
	GitHubLink   string        `json:"github_link,omitempty" validate:"omitempty,url"`
	LiveLink     string        `json:"live_link,omitempty" validate:"omitempty,url"`
	DriveLink    string        `json:"drive_link,omitempty" validate:"omitempty,url"`
	VideoLink    string        `json:"video_link,omitempty" validate:"omitempty,url"`
	OtherLinks   []ProjectLink `json:"other_links,omitempty"`
	Technologies []string      `json:"technologies,omitempty"`
	ClientName   string        `json:"client_name,omitempty" validate:"omitempty,max=100"`
}

// ProjectLink represents additional project links
type ProjectLink struct {
	Label string `json:"label" validate:"required,min=1,max=50"`
	URL   string `json:"url" validate:"required,url"`
}

// UpdateProjectRequest represents the request to update a project
type UpdateProjectRequest struct {
	ProjectName  string        `json:"project_name,omitempty" validate:"omitempty,min=2,max=100"`
	Description  string        `json:"description,omitempty" validate:"omitempty,max=1000"`
	Screenshots  []string      `json:"screenshots,omitempty" validate:"omitempty,dive,url"`
	GitHubLink   string        `json:"github_link,omitempty" validate:"omitempty,url"`
	LiveLink     string        `json:"live_link,omitempty" validate:"omitempty,url"`
	DriveLink    string        `json:"drive_link,omitempty" validate:"omitempty,url"`
	VideoLink    string        `json:"video_link,omitempty" validate:"omitempty,url"`
	OtherLinks   []ProjectLink `json:"other_links,omitempty"`
	Technologies []string      `json:"technologies,omitempty"`
	ClientName   string        `json:"client_name,omitempty" validate:"omitempty,max=100"`
}
