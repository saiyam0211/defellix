package repository

import (
	"errors"

	"github.com/saiyam0211/defellix/services/auth-service/internal/domain"
	"gorm.io/gorm"
)

var (
	// ErrOAuthProviderNotFound indicates OAuth provider was not found
	ErrOAuthProviderNotFound = errors.New("oauth provider not found")
	// ErrOAuthProviderExists indicates OAuth provider already exists
	ErrOAuthProviderExists = errors.New("oauth provider already exists")
)

// OAuthRepository defines the interface for OAuth provider data access
type OAuthRepository interface {
	Create(provider *domain.OAuthProvider) error
	FindByUserIDAndProvider(userID uint, provider string) (*domain.OAuthProvider, error)
	FindByProviderID(provider, providerID string) (*domain.OAuthProvider, error)
	Update(provider *domain.OAuthProvider) error
	Delete(userID uint, provider string) error
	FindByUserID(userID uint) ([]*domain.OAuthProvider, error)
}

// oauthRepository implements OAuthRepository interface
type oauthRepository struct {
	db *gorm.DB
}

// NewOAuthRepository creates a new OAuth repository
func NewOAuthRepository(db *gorm.DB) OAuthRepository {
	return &oauthRepository{db: db}
}

// Create creates a new OAuth provider connection
func (r *oauthRepository) Create(provider *domain.OAuthProvider) error {
	// Check if already exists
	existing, _ := r.FindByUserIDAndProvider(provider.UserID, provider.Provider)
	if existing != nil {
		return ErrOAuthProviderExists
	}

	if err := r.db.Create(provider).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return ErrOAuthProviderExists
		}
		return err
	}
	return nil
}

// FindByUserIDAndProvider finds OAuth provider by user ID and provider name
func (r *oauthRepository) FindByUserIDAndProvider(userID uint, provider string) (*domain.OAuthProvider, error) {
	var oauthProvider domain.OAuthProvider
	if err := r.db.Where("user_id = ? AND provider = ?", userID, provider).First(&oauthProvider).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrOAuthProviderNotFound
		}
		return nil, err
	}
	return &oauthProvider, nil
}

// FindByProviderID finds OAuth provider by external provider ID
func (r *oauthRepository) FindByProviderID(provider, providerID string) (*domain.OAuthProvider, error) {
	var oauthProvider domain.OAuthProvider
	if err := r.db.Where("provider = ? AND provider_id = ?", provider, providerID).First(&oauthProvider).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrOAuthProviderNotFound
		}
		return nil, err
	}
	return &oauthProvider, nil
}

// Update updates an existing OAuth provider
func (r *oauthRepository) Update(provider *domain.OAuthProvider) error {
	if err := r.db.Save(provider).Error; err != nil {
		return err
	}
	return nil
}

// Delete soft deletes an OAuth provider connection
func (r *oauthRepository) Delete(userID uint, provider string) error {
	if err := r.db.Where("user_id = ? AND provider = ?", userID, provider).Delete(&domain.OAuthProvider{}).Error; err != nil {
		return err
	}
	return nil
}

// FindByUserID finds all OAuth providers for a user
func (r *oauthRepository) FindByUserID(userID uint) ([]*domain.OAuthProvider, error) {
	var providers []*domain.OAuthProvider
	if err := r.db.Where("user_id = ?", userID).Find(&providers).Error; err != nil {
		return nil, err
	}
	return providers, nil
}
