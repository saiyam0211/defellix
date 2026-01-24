package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
)

// RequireAuth is a middleware that requires authentication
// This is a placeholder - in production, validate JWT token from auth-service
func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract token from Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			respondError(w, http.StatusUnauthorized, "Authorization header required", "UNAUTHORIZED")
			return
		}

		// Check if it's a Bearer token
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			respondError(w, http.StatusUnauthorized, "Invalid authorization header format", "UNAUTHORIZED")
			return
		}

		// TODO: Validate JWT token with auth-service via gRPC
		// For now, extract user_id from token claims (simplified)
		// In production, call auth-service to validate token

		// Placeholder: Extract user_id from context or token
		// This will be replaced with actual JWT validation in gRPC integration
		userID := uint(1) // Placeholder - will come from validated token

		// Add user info to context
		ctx := context.WithValue(r.Context(), "user_id", userID)
		ctx = context.WithValue(ctx, "user_email", "user@example.com") // Placeholder

		// Continue with authenticated request
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// respondError is a helper to send error responses
func respondError(w http.ResponseWriter, statusCode int, message string, code string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	type ErrorResponse struct {
		Error   string `json:"error"`
		Message string `json:"message"`
		Code    string `json:"code"`
	}

	response := ErrorResponse{
		Error:   http.StatusText(statusCode),
		Message: message,
		Code:    code,
	}

	json.NewEncoder(w).Encode(response)
}

