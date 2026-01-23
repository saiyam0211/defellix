package middleware

import (
	"net/http"
)

// RequireAuth is a middleware that requires authentication
// This is a placeholder implementation for Week 1
// Actual JWT validation will be implemented in Week 2
func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO: Implement JWT token validation in Week 2
		// For now, this middleware just passes through
		next.ServeHTTP(w, r)
	})
}

