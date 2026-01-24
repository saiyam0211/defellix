package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/saiyam0211/defellix/services/auth-service/internal/dto"
	"github.com/saiyam0211/defellix/services/auth-service/internal/middleware"
	"github.com/saiyam0211/defellix/services/auth-service/internal/service"
	"github.com/saiyam0211/defellix/services/auth-service/pkg/jwt"
)

// AuthHandler handles authentication-related endpoints
type AuthHandler struct {
	validator   *middleware.Validator
	authService *service.AuthService
	oauthService *service.OAuthService
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(authService *service.AuthService, oauthService *service.OAuthService) *AuthHandler {
	return &AuthHandler{
		validator:    middleware.NewValidator(),
		authService:  authService,
		oauthService: oauthService,
	}
}

// RegisterRoutes registers authentication routes
func (h *AuthHandler) RegisterRoutes(r chi.Router, jwtManager *jwt.JWTManager) {
	r.Route("/api/v1/auth", func(r chi.Router) {
		r.Post("/register", h.Register)
		r.Post("/login", h.Login)
		r.Post("/refresh", h.Refresh)
		
		// Protected routes
		r.With(middleware.RequireAuth(jwtManager)).Get("/me", h.Me)
		
		// OAuth routes
		r.Get("/oauth/google", h.OAuthGoogle)
		r.Get("/oauth/google/callback", h.OAuthGoogleCallback)
		r.Get("/oauth/linkedin", h.OAuthLinkedIn)
		r.Get("/oauth/linkedin/callback", h.OAuthLinkedInCallback)
		r.Get("/oauth/github", h.OAuthGitHub)
		r.Get("/oauth/github/callback", h.OAuthGitHubCallback)
	})
}

// Register handles user registration
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req dto.RegisterRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	authResp, err := h.authService.Register(&req)
	if err != nil {
		if err == service.ErrInvalidCredentials || err.Error() == "user already exists" {
			respondError(w, http.StatusConflict, "User with this email already exists", "USER_EXISTS")
			return
		}
		respondError(w, http.StatusInternalServerError, "Failed to register user", "INTERNAL_ERROR")
		return
	}

	respondSuccess(w, http.StatusCreated, authResp, "User registered successfully")
}

// Login handles user login
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req dto.LoginRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	authResp, err := h.authService.Login(&req)
	if err != nil {
		if err == service.ErrInvalidCredentials {
			respondError(w, http.StatusUnauthorized, "Invalid email or password", "INVALID_CREDENTIALS")
			return
		}
		if err == service.ErrUserInactive {
			respondError(w, http.StatusForbidden, "User account is inactive", "USER_INACTIVE")
			return
		}
		respondError(w, http.StatusInternalServerError, "Failed to login", "INTERNAL_ERROR")
		return
	}

	respondSuccess(w, http.StatusOK, authResp, "Login successful")
}

// Refresh handles token refresh
func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	var req dto.RefreshTokenRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	authResp, err := h.authService.RefreshToken(req.RefreshToken)
	if err != nil {
		if err.Error() == "invalid token" || err.Error() == "token has expired" {
			respondError(w, http.StatusUnauthorized, "Invalid or expired refresh token", "INVALID_TOKEN")
			return
		}
		respondError(w, http.StatusInternalServerError, "Failed to refresh token", "INTERNAL_ERROR")
		return
	}

	respondSuccess(w, http.StatusOK, authResp, "Token refreshed successfully")
}

// Me returns the current authenticated user
func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	// Get user from context (set by auth middleware)
	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		respondError(w, http.StatusUnauthorized, "User not authenticated", "UNAUTHORIZED")
		return
	}

	user, err := h.authService.GetUserByID(userID)
	if err != nil {
		respondError(w, http.StatusNotFound, "User not found", "USER_NOT_FOUND")
		return
	}

	respondSuccess(w, http.StatusOK, user, "User retrieved successfully")
}

// OAuthGoogle initiates Google OAuth flow
func (h *AuthHandler) OAuthGoogle(w http.ResponseWriter, r *http.Request) {
	url, state, err := h.oauthService.GetGoogleAuthURL()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to initiate Google OAuth", "OAUTH_ERROR")
		return
	}
	
	// Store state in cookie for validation
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		HttpOnly: true,
		Secure:   r.TLS != nil,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   600, // 10 minutes
	})
	
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// OAuthGoogleCallback handles Google OAuth callback
func (h *AuthHandler) OAuthGoogleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	
	// Validate state from cookie
	cookie, err := r.Cookie("oauth_state")
	if err != nil || cookie.Value != state {
		respondError(w, http.StatusBadRequest, "Invalid state parameter", "INVALID_STATE")
		return
	}
	
	authResp, err := h.oauthService.HandleGoogleCallback(r.Context(), code, state)
	if err != nil {
		respondError(w, http.StatusUnauthorized, "OAuth authentication failed", "OAUTH_FAILED")
		return
	}
	
	// Clear state cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    "",
		MaxAge:   -1,
	})
	
	respondSuccess(w, http.StatusOK, authResp, "Google OAuth authentication successful")
}

// OAuthLinkedIn initiates LinkedIn OAuth flow
func (h *AuthHandler) OAuthLinkedIn(w http.ResponseWriter, r *http.Request) {
	url, state, err := h.oauthService.GetLinkedInAuthURL()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to initiate LinkedIn OAuth", "OAUTH_ERROR")
		return
	}
	
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		HttpOnly: true,
		Secure:   r.TLS != nil,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   600,
	})
	
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// OAuthLinkedInCallback handles LinkedIn OAuth callback
func (h *AuthHandler) OAuthLinkedInCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	
	cookie, err := r.Cookie("oauth_state")
	if err != nil || cookie.Value != state {
		respondError(w, http.StatusBadRequest, "Invalid state parameter", "INVALID_STATE")
		return
	}
	
	authResp, err := h.oauthService.HandleLinkedInCallback(r.Context(), code, state)
	if err != nil {
		respondError(w, http.StatusUnauthorized, "OAuth authentication failed", "OAUTH_FAILED")
		return
	}
	
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    "",
		MaxAge:   -1,
	})
	
	respondSuccess(w, http.StatusOK, authResp, "LinkedIn OAuth authentication successful")
}

// OAuthGitHub initiates GitHub OAuth flow
func (h *AuthHandler) OAuthGitHub(w http.ResponseWriter, r *http.Request) {
	url, state, err := h.oauthService.GetGitHubAuthURL()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to initiate GitHub OAuth", "OAUTH_ERROR")
		return
	}
	
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		HttpOnly: true,
		Secure:   r.TLS != nil,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   600,
	})
	
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// OAuthGitHubCallback handles GitHub OAuth callback
func (h *AuthHandler) OAuthGitHubCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	
	cookie, err := r.Cookie("oauth_state")
	if err != nil || cookie.Value != state {
		respondError(w, http.StatusBadRequest, "Invalid state parameter", "INVALID_STATE")
		return
	}
	
	authResp, err := h.oauthService.HandleGitHubCallback(r.Context(), code, state)
	if err != nil {
		respondError(w, http.StatusUnauthorized, "OAuth authentication failed", "OAUTH_FAILED")
		return
	}
	
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    "",
		MaxAge:   -1,
	})
	
	respondSuccess(w, http.StatusOK, authResp, "GitHub OAuth authentication successful")
}

