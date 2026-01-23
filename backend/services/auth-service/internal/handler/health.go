package handler

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

// HealthHandler handles health check endpoints
type HealthHandler struct{}

// NewHealthHandler creates a new health handler
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// RegisterRoutes registers health check routes
func (h *HealthHandler) RegisterRoutes(r chi.Router) {
	r.Get("/health", h.Health)
	r.Get("/health/live", h.Liveness)
	r.Get("/health/ready", h.Readiness)
}

// HealthResponse represents the health check response
type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Service   string    `json:"service"`
	Version   string    `json:"version"`
}

// Health returns the basic health status
func (h *HealthHandler) Health(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:    "healthy",
		Timestamp: time.Now(),
		Service:   "auth-service",
		Version:   "1.0.0",
	}

	respondJSON(w, http.StatusOK, response)
}

// Liveness checks if the service is alive
func (h *HealthHandler) Liveness(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:    "alive",
		Timestamp: time.Now(),
		Service:   "auth-service",
		Version:   "1.0.0",
	}

	respondJSON(w, http.StatusOK, response)
}

// Readiness checks if the service is ready to accept traffic
func (h *HealthHandler) Readiness(w http.ResponseWriter, r *http.Request) {
	// TODO: Add database connection check in future phases
	response := HealthResponse{
		Status:    "ready",
		Timestamp: time.Now(),
		Service:   "auth-service",
		Version:   "1.0.0",
	}

	respondJSON(w, http.StatusOK, response)
}
