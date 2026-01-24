package domain

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// UserProfile represents a user profile in the system
// Using PostgreSQL with JSONB for flexible fields
type UserProfile struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	UserID uint   `gorm:"uniqueIndex;not null" json:"user_id"` // Foreign key to auth-service users table
	Email  string `gorm:"index;not null" json:"email"`

	// Basic Information (Required at registration)
	FullName      string `gorm:"not null" json:"full_name"`
	Photo         string `gorm:"type:text" json:"photo,omitempty"`                 // Avatar/Profile picture URL
	ShortHeadline string `gorm:"type:varchar(150);not null" json:"short_headline"` // Professional tagline
	Role          string `gorm:"type:varchar(20);default:freelancer" json:"role"`  // freelancer, client, both
	Location      string `gorm:"type:varchar(100)" json:"location,omitempty"`
	Experience    string `gorm:"type:varchar(50)" json:"experience,omitempty"` // e.g., "5 years", "Senior"

	// Social Links (Required at registration)
	GitHubLink    string `gorm:"type:text" json:"github_link,omitempty"`
	LinkedInLink  string `gorm:"type:text" json:"linkedin_link,omitempty"`
	PortfolioLink string `gorm:"type:text" json:"portfolio_link,omitempty"`
	InstagramLink string `gorm:"type:text" json:"instagram_link,omitempty"`

	// Skills (Required at registration - multiple) - Using PostgreSQL array
	Skills datatypes.JSON `gorm:"type:jsonb" json:"skills,omitempty"` // Stored as JSON array

	// Extended Profile Fields (Added after contracts/projects)
	Bio          string   `gorm:"type:text" json:"bio,omitempty"` // Detailed bio
	Timezone     string   `gorm:"type:varchar(50)" json:"timezone,omitempty"`
	Phone        string   `gorm:"type:varchar(20)" json:"phone,omitempty"`
	HourlyRate   *float64 `gorm:"type:decimal(10,2)" json:"hourly_rate,omitempty"`
	Availability string   `gorm:"type:varchar(20)" json:"availability,omitempty"` // full-time, part-time, available, unavailable

	// Reputation & Stats (Populated after contracts) - Using JSONB for flexibility
	Stats datatypes.JSON `gorm:"type:jsonb" json:"stats,omitempty"` // {no_of_projects_done, on_time_completion, reputation_score}

	// Projects (Added after contract completion) - Using JSONB for nested documents
	Projects datatypes.JSON `gorm:"type:jsonb" json:"projects,omitempty"` // Array of project objects

	// Testimonials (Added after project completion) - Using JSONB
	Testimonials datatypes.JSON `gorm:"type:jsonb" json:"testimonials,omitempty"` // Array of testimonial objects

	// Portfolio Items (Legacy - for backward compatibility) - Using JSONB
	Portfolio datatypes.JSON `gorm:"type:jsonb" json:"portfolio,omitempty"` // Array of portfolio items

	// Client-specific fields
	CompanyName string `gorm:"type:varchar(100)" json:"company_name,omitempty"`
	CompanySize string `gorm:"type:varchar(20)" json:"company_size,omitempty"` // startup, small, medium, large

	// Metadata
	IsActive          bool           `gorm:"default:true" json:"is_active"`
	IsVerified        bool           `gorm:"default:false" json:"is_verified"`         // Email/Phone verification
	IsProfileComplete bool           `gorm:"default:false" json:"is_profile_complete"` // All required fields filled
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
	DeletedAt         gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName specifies the table name
func (UserProfile) TableName() string {
	return "user_profiles"
}

// Project represents a completed project (stored as JSONB in PostgreSQL)
type Project struct {
	ID          string `json:"id"` // UUID string
	ProjectName string `json:"project_name"`
	Description string `json:"description,omitempty"`

	// Media Links (Flexible for different freelancer types)
	Screenshots []string      `json:"screenshots,omitempty"` // Image URLs
	GitHubLink  string        `json:"github_link,omitempty"`
	LiveLink    string        `json:"live_link,omitempty"`   // Live project URL
	DriveLink   string        `json:"drive_link,omitempty"`  // Google Drive/Dropbox
	VideoLink   string        `json:"video_link,omitempty"`  // For video editors
	OtherLinks  []ProjectLink `json:"other_links,omitempty"` // Flexible for future links

	Technologies  []string `json:"technologies,omitempty"`
	ClientName    string   `json:"client_name,omitempty"`
	CompletedDate string   `json:"completed_date,omitempty"` // ISO 8601 string
	CreatedAt     string   `json:"created_at"`               // ISO 8601 string
	UpdatedAt     string   `json:"updated_at"`               // ISO 8601 string
}

// ProjectLink represents additional project links (flexible structure)
type ProjectLink struct {
	Label string `json:"label"` // e.g., "Figma Design", "Behance", "Dribbble"
	URL   string `json:"url"`
}

// Testimonial represents a client testimonial (stored as JSONB)
type Testimonial struct {
	ID          string `json:"id"` // UUID string
	ClientName  string `json:"client_name"`
	ClientEmail string `json:"client_email,omitempty"`
	Rating      int    `json:"rating"` // 1-10
	Comment     string `json:"comment"`
	ProjectName string `json:"project_name,omitempty"`
	IsVerified  bool   `json:"is_verified"` // From verified client
	CreatedAt   string `json:"created_at"`  // ISO 8601 string
}

// PortfolioItem represents a portfolio entry (legacy - stored as JSONB)
type PortfolioItem struct {
	ID           string   `json:"id"` // UUID string
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	URL          string   `json:"url"`
	ImageURL     string   `json:"image_url,omitempty"`
	Technologies []string `json:"technologies,omitempty"`
	CreatedAt    string   `json:"created_at"` // ISO 8601 string
}

// UserRole constants
const (
	RoleFreelancer = "freelancer"
	RoleClient     = "client"
	RoleBoth       = "both"
)

// Availability constants
const (
	AvailabilityFullTime    = "full-time"
	AvailabilityPartTime    = "part-time"
	AvailabilityAvailable   = "available"
	AvailabilityUnavailable = "unavailable"
)

// CompanySize constants
const (
	CompanySizeStartup = "startup"
	CompanySizeSmall   = "small"
	CompanySizeMedium  = "medium"
	CompanySizeLarge   = "large"
)
