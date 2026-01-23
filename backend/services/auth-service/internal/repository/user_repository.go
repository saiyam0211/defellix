package repository

import (
	"errors"

	"github.com/saiyam0211/defellix/services/auth-service/internal/domain"
	"gorm.io/gorm"
)

var (
	// ErrUserNotFound indicates user was not found
	ErrUserNotFound = errors.New("user not found")
	// ErrUserExists indicates user already exists
	ErrUserExists = errors.New("user already exists")
)

// UserRepository defines the interface for user data access
type UserRepository interface {
	Create(user *domain.User) error
	FindByID(id uint) (*domain.User, error)
	FindByEmail(email string) (*domain.User, error)
	Update(user *domain.User) error
	Delete(id uint) error
}

// userRepository implements UserRepository interface
type userRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new user repository
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

// Create creates a new user
func (r *userRepository) Create(user *domain.User) error {
	if err := r.db.Create(user).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return ErrUserExists
		}
		return err
	}
	return nil
}

// FindByID finds a user by ID
func (r *userRepository) FindByID(id uint) (*domain.User, error) {
	var user domain.User
	if err := r.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return &user, nil
}

// FindByEmail finds a user by email
func (r *userRepository) FindByEmail(email string) (*domain.User, error) {
	var user domain.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return &user, nil
}

// Update updates an existing user
func (r *userRepository) Update(user *domain.User) error {
	if err := r.db.Save(user).Error; err != nil {
		return err
	}
	return nil
}

// Delete soft deletes a user
func (r *userRepository) Delete(id uint) error {
	if err := r.db.Delete(&domain.User{}, id).Error; err != nil {
		return err
	}
	return nil
}
