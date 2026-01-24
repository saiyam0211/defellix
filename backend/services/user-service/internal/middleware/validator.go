package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
)

// Validator wraps the go-playground validator
type Validator struct {
	validate *validator.Validate
}

// NewValidator creates a new validator instance
func NewValidator() *Validator {
	v := validator.New()
	return &Validator{
		validate: v,
	}
}

// ValidateJSON validates a JSON request body against a struct
func (v *Validator) ValidateJSON(r *http.Request, dst interface{}) error {
	// Decode JSON body
	if err := json.NewDecoder(r.Body).Decode(dst); err != nil {
		return fmt.Errorf("invalid JSON: %w", err)
	}

	// Validate struct
	if err := v.validate.Struct(dst); err != nil {
		return v.formatValidationError(err)
	}

	return nil
}

// formatValidationError formats validation errors into a readable message
func (v *Validator) formatValidationError(err error) error {
	var messages []string

	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			message := fmt.Sprintf(
				"Field '%s' failed validation: %s",
				fieldError.Field(),
				getValidationMessage(fieldError),
			)
			messages = append(messages, message)
		}
	} else {
		return err
	}

	return fmt.Errorf(strings.Join(messages, "; "))
}

// getValidationMessage returns a human-readable validation message
func getValidationMessage(fieldError validator.FieldError) string {
	switch fieldError.Tag() {
	case "required":
		return "is required"
	case "email":
		return "must be a valid email address"
	case "min":
		return fmt.Sprintf("must be at least %s characters", fieldError.Param())
	case "max":
		return fmt.Sprintf("must be at most %s characters", fieldError.Param())
	case "url":
		return "must be a valid URL"
	case "oneof":
		return fmt.Sprintf("must be one of: %s", fieldError.Param())
	default:
		return fmt.Sprintf("failed validation rule: %s", fieldError.Tag())
	}
}

