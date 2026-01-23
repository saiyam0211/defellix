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
	validator  *middleware.Validator
	authService *service.AuthService
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		validator:  middleware.NewValidator(),
		authService: authService,
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
		
		// OAuth routes (stubs for Week 2)
		r.Get("/oauth/google", h.OAuthGoogle)
		r.Get("/oauth/google/callback", h.OAuthGoogleCallback)
		r.Get("/oauth/linkedin", h.OAuthLinkedIn)
		r.Get("/oauth/linkedin/callback", h.OAuthLinkedInCallback)
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

// OAuthGoogle initiates Google OAuth flow (stub)
func (h *AuthHandler) OAuthGoogle(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement Google OAuth in future phase
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "Google OAuth - implementation pending",
		"url":     "/oauth/google/callback",
	}, "Google OAuth endpoint ready")
}

// OAuthGoogleCallback handles Google OAuth callback (stub)
func (h *AuthHandler) OAuthGoogleCallback(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement Google OAuth callback in future phase
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "Google OAuth callback - implementation pending",
	}, "Google OAuth callback endpoint ready")
}

// OAuthLinkedIn initiates LinkedIn OAuth flow (stub)
func (h *AuthHandler) OAuthLinkedIn(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement LinkedIn OAuth in future phase
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "LinkedIn OAuth - implementation pending",
		"url":     "/oauth/linkedin/callback",
	}, "LinkedIn OAuth endpoint ready")
}

// OAuthLinkedInCallback handles LinkedIn OAuth callback (stub)
func (h *AuthHandler) OAuthLinkedInCallback(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement LinkedIn OAuth callback in future phase
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "LinkedIn OAuth callback - implementation pending",
	}, "LinkedIn OAuth callback endpoint ready")
}

