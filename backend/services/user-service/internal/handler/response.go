package handler

import (
	"encoding/json"
	"net/http"
)

// ErrorResponse represents an error response
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message,omitempty"`
	Code    string `json:"code,omitempty"`
}

// SuccessResponse represents a success response with data
type SuccessResponse struct {
	Data    interface{} `json:"data"`
	Message string      `json:"message,omitempty"`
}

// respondJSON sends a JSON response with the given status code
func respondJSON(w http.ResponseWriter, statusCode int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if payload != nil {
		if err := json.NewEncoder(w).Encode(payload); err != nil {
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		}
	}
}

// respondError sends an error JSON response
func respondError(w http.ResponseWriter, statusCode int, message string, code string) {
	response := ErrorResponse{
		Error:   http.StatusText(statusCode),
		Message: message,
		Code:    code,
	}
	respondJSON(w, statusCode, response)
}

// respondSuccess sends a success JSON response
func respondSuccess(w http.ResponseWriter, statusCode int, data interface{}, message string) {
	response := SuccessResponse{
		Data:    data,
		Message: message,
	}
	respondJSON(w, statusCode, response)
}

