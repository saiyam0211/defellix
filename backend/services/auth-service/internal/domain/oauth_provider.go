package domain

import (
	"time"

	"gorm.io/gorm"
)

// OAuthProvider represents an OAuth provider connection
type OAuthProvider struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	UserID        uint           `gorm:"index;not null" json:"user_id"` // Foreign key to users table
	Provider      string         `gorm:"index;not null" json:"provider"` // google, linkedin, github
	ProviderID    string         `gorm:"index;not null" json:"provider_id"` // External provider user ID
	Email         string         `gorm:"index" json:"email"`
	AccessToken   string         `gorm:"type:text" json:"-"` // Encrypted
	RefreshToken  string         `gorm:"type:text" json:"-"` // Encrypted
	TokenExpiry   *time.Time     `json:"token_expiry,omitempty"`
	ProfileData   string         `gorm:"type:text" json:"-"` // JSON encoded profile data
	IsVerified    bool           `gorm:"default:false" json:"is_verified"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName specifies the table name
func (OAuthProvider) TableName() string {
	return "oauth_providers"
}

// Provider constants
const (
	ProviderGoogle   = "google"
	ProviderLinkedIn = "linkedin"
	ProviderGitHub   = "github"
)

// Unique constraint: (user_id, provider) should be unique
// This is handled at application level or via database constraint
