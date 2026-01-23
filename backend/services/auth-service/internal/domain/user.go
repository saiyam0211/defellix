package domain

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Email     string         `gorm:"uniqueIndex;not null" json:"email"`
	Password  string         `gorm:"not null" json:"-"` // Never return password in JSON
	FullName  string         `gorm:"not null" json:"full_name"`
	Role      string         `gorm:"default:user" json:"role"` // user, freelancer, client, admin
	IsActive  bool           `gorm:"default:true" json:"is_active"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName specifies the table name for User model
func (User) TableName() string {
	return "users"
}

// UserRole constants
const (
	RoleUser      = "user"
	RoleFreelancer = "freelancer"
	RoleClient    = "client"
	RoleAdmin     = "admin"
)

