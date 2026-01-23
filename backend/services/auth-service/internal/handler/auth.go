package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/saiyam0211/defellix/services/auth-service/internal/dto"
	"github.com/saiyam0211/defellix/services/auth-service/internal/middleware"
)

// AuthHandler handles authentication-related endpoints
type AuthHandler struct {
	validator *middleware.Validator
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler() *AuthHandler {
	return &AuthHandler{
		validator: middleware.NewValidator(),
	}
}

// RegisterRoutes registers authentication routes
func (h *AuthHandler) RegisterRoutes(r chi.Router) {
	r.Route("/api/v1/auth", func(r chi.Router) {
		r.Post("/register", h.Register)
		r.Post("/login", h.Login)
		r.Post("/refresh", h.Refresh)
		r.With(middleware.RequireAuth).Get("/me", h.Me)
	})
}

// Register handles user registration
// This is a placeholder implementation for Week 1
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req dto.RegisterRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	// TODO: Implement actual registration logic in Week 2
	respondSuccess(w, http.StatusCreated, map[string]string{
		"message": "Registration endpoint - implementation pending",
		"email":   req.Email,
	}, "User registration endpoint ready")
}

// Login handles user login
// This is a placeholder implementation for Week 1
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req dto.LoginRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	// TODO: Implement actual login logic in Week 2
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "Login endpoint - implementation pending",
		"email":   req.Email,
	}, "User login endpoint ready")
}

// Refresh handles token refresh
// This is a placeholder implementation for Week 1
func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	var req dto.RefreshTokenRequest

	if err := h.validator.ValidateJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, err.Error(), "VALIDATION_ERROR")
		return
	}

	// TODO: Implement actual refresh logic in Week 2
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "Token refresh endpoint - implementation pending",
	}, "Token refresh endpoint ready")
}

// Me returns the current authenticated user
// This is a placeholder implementation for Week 1
func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	// TODO: Extract user from JWT token in Week 2
	respondSuccess(w, http.StatusOK, map[string]string{
		"message": "Get current user endpoint - implementation pending",
	}, "Current user endpoint ready")
}

