package oauth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/saiyam0211/defellix/services/auth-service/internal/config"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/github"
)

// OAuthUser represents user data from OAuth provider
type OAuthUser struct {
	Provider    string
	ProviderID  string
	Email       string
	Name        string
	Picture     string
	ProfileURL  string
	RawData     map[string]interface{}
}

// OAuthManager manages OAuth flows
type OAuthManager struct {
	googleConfig   *oauth2.Config
	linkedinConfig *oauth2.Config
	githubConfig   *oauth2.Config
	stateStore     map[string]time.Time // Simple in-memory state store (use Redis in production)
}

// NewOAuthManager creates a new OAuth manager
func NewOAuthManager(cfg *config.OAuthConfig) *OAuthManager {
	manager := &OAuthManager{
		stateStore: make(map[string]time.Time),
	}

	// Google OAuth config
	if cfg.Google.ClientID != "" {
		manager.googleConfig = &oauth2.Config{
			ClientID:     cfg.Google.ClientID,
			ClientSecret: cfg.Google.ClientSecret,
			RedirectURL:  cfg.Google.RedirectURL,
			Scopes:       cfg.Google.Scopes,
			Endpoint:     google.Endpoint,
		}
	}

	// LinkedIn OAuth config (custom endpoint)
	if cfg.LinkedIn.ClientID != "" {
		manager.linkedinConfig = &oauth2.Config{
			ClientID:     cfg.LinkedIn.ClientID,
			ClientSecret: cfg.LinkedIn.ClientSecret,
			RedirectURL:  cfg.LinkedIn.RedirectURL,
			Scopes:       cfg.LinkedIn.Scopes,
			Endpoint: oauth2.Endpoint{
				AuthURL:  "https://www.linkedin.com/oauth/v2/authorization",
				TokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
			},
		}
	}

	// GitHub OAuth config
	if cfg.GitHub.ClientID != "" {
		manager.githubConfig = &oauth2.Config{
			ClientID:     cfg.GitHub.ClientID,
			ClientSecret: cfg.GitHub.ClientSecret,
			RedirectURL:  cfg.GitHub.RedirectURL,
			Scopes:       cfg.GitHub.Scopes,
			Endpoint:     github.Endpoint,
		}
	}

	return manager
}

// GenerateState generates a random state token for OAuth flow
func (m *OAuthManager) GenerateState() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	state := base64.URLEncoding.EncodeToString(b)
	m.stateStore[state] = time.Now().Add(10 * time.Minute) // 10 min expiry
	return state, nil
}

// ValidateState validates and removes state token
func (m *OAuthManager) ValidateState(state string) bool {
	expiry, exists := m.stateStore[state]
	if !exists {
		return false
	}
	if time.Now().After(expiry) {
		delete(m.stateStore, state)
		return false
	}
	delete(m.stateStore, state)
	return true
}

// GetGoogleAuthURL returns Google OAuth authorization URL
func (m *OAuthManager) GetGoogleAuthURL() (string, string, error) {
	if m.googleConfig == nil {
		return "", "", fmt.Errorf("Google OAuth not configured")
	}
	state, err := m.GenerateState()
	if err != nil {
		return "", "", err
	}
	url := m.googleConfig.AuthCodeURL(state, oauth2.AccessTypeOffline, oauth2.ApprovalForce)
	return url, state, nil
}

// GetLinkedInAuthURL returns LinkedIn OAuth authorization URL
func (m *OAuthManager) GetLinkedInAuthURL() (string, string, error) {
	if m.linkedinConfig == nil {
		return "", "", fmt.Errorf("LinkedIn OAuth not configured")
	}
	state, err := m.GenerateState()
	if err != nil {
		return "", "", err
	}
	url := m.linkedinConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	return url, state, nil
}

// GetGitHubAuthURL returns GitHub OAuth authorization URL
func (m *OAuthManager) GetGitHubAuthURL() (string, string, error) {
	if m.githubConfig == nil {
		return "", "", fmt.Errorf("GitHub OAuth not configured")
	}
	state, err := m.GenerateState()
	if err != nil {
		return "", "", err
	}
	url := m.githubConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	return url, state, nil
}

// ExchangeGoogleCode exchanges authorization code for Google user info
func (m *OAuthManager) ExchangeGoogleCode(ctx context.Context, code string) (*OAuthUser, *oauth2.Token, error) {
	if m.googleConfig == nil {
		return nil, nil, fmt.Errorf("Google OAuth not configured")
	}

	token, err := m.googleConfig.Exchange(ctx, code)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to exchange code: %w", err)
	}

	client := m.googleConfig.Client(ctx, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	return &OAuthUser{
		Provider:   "google",
		ProviderID: userInfo.ID,
		Email:      userInfo.Email,
		Name:       userInfo.Name,
		Picture:    userInfo.Picture,
		RawData:    map[string]interface{}{"id": userInfo.ID, "email": userInfo.Email, "name": userInfo.Name},
	}, token, nil
}

// ExchangeLinkedInCode exchanges authorization code for LinkedIn user info
func (m *OAuthManager) ExchangeLinkedInCode(ctx context.Context, code string) (*OAuthUser, *oauth2.Token, error) {
	if m.linkedinConfig == nil {
		return nil, nil, fmt.Errorf("LinkedIn OAuth not configured")
	}

	token, err := m.linkedinConfig.Exchange(ctx, code)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to exchange code: %w", err)
	}

	client := m.linkedinConfig.Client(ctx, token)
	
	// Get profile
	profileResp, err := client.Get("https://api.linkedin.com/v2/userinfo")
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get profile: %w", err)
	}
	defer profileResp.Body.Close()

	var profile struct {
		Sub         string `json:"sub"`
		Name        string `json:"name"`
		Email       string `json:"email"`
		Picture     string `json:"picture"`
	}

	if err := json.NewDecoder(profileResp.Body).Decode(&profile); err != nil {
		return nil, nil, fmt.Errorf("failed to decode profile: %w", err)
	}

	return &OAuthUser{
		Provider:   "linkedin",
		ProviderID: profile.Sub,
		Email:      profile.Email,
		Name:       profile.Name,
		Picture:    profile.Picture,
		ProfileURL: fmt.Sprintf("https://www.linkedin.com/in/%s", profile.Sub),
		RawData:    map[string]interface{}{"sub": profile.Sub, "email": profile.Email, "name": profile.Name},
	}, token, nil
}

// ExchangeGitHubCode exchanges authorization code for GitHub user info
func (m *OAuthManager) ExchangeGitHubCode(ctx context.Context, code string) (*OAuthUser, *oauth2.Token, error) {
	if m.githubConfig == nil {
		return nil, nil, fmt.Errorf("GitHub OAuth not configured")
	}

	token, err := m.githubConfig.Exchange(ctx, code)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to exchange code: %w", err)
	}

	client := m.githubConfig.Client(ctx, token)
	
	// Get user info
	userResp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get user info: %w", err)
	}
	defer userResp.Body.Close()

	var userInfo struct {
		ID        int    `json:"id"`
		Login     string `json:"login"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		AvatarURL string `json:"avatar_url"`
		HTMLURL   string `json:"html_url"`
	}

	if err := json.NewDecoder(userResp.Body).Decode(&userInfo); err != nil {
		return nil, nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	// Get email if not in user info
	if userInfo.Email == "" {
		emailResp, err := client.Get("https://api.github.com/user/emails")
		if err == nil {
			defer emailResp.Body.Close()
			var emails []struct {
				Email   string `json:"email"`
				Primary bool   `json:"primary"`
			}
			if json.NewDecoder(emailResp.Body).Decode(&emails) == nil {
				for _, email := range emails {
					if email.Primary {
						userInfo.Email = email.Email
						break
					}
				}
			}
		}
	}

	return &OAuthUser{
		Provider:   "github",
		ProviderID: fmt.Sprintf("%d", userInfo.ID),
		Email:      userInfo.Email,
		Name:       userInfo.Name,
		Picture:    userInfo.AvatarURL,
		ProfileURL: userInfo.HTMLURL,
		RawData:    map[string]interface{}{"id": userInfo.ID, "login": userInfo.Login, "email": userInfo.Email},
	}, token, nil
}
