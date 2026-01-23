# Backend Development Learning Documentation
## Decentralized Freelancer Trust Platform

**Purpose:** This document tracks the implementation details, technologies, and concepts learned during the backend development process. It serves as a knowledge base for understanding how each phase was implemented.

---

## 📚 Week 1 - Phase 1: HTTP Server & Routing

**Duration:** Days 1-7  
**Goal:** Set up basic HTTP server, Chi router, request validation, and clean architecture structure

---

### 🏗️ Architecture Overview

We implemented a **clean architecture** pattern for the auth-service with the following structure:

```
auth-service/
├── cmd/server/          # Application entry point
│   └── main.go
├── internal/            # Private application code
│   ├── config/         # Configuration management
│   ├── domain/         # Domain entities (future)
│   ├── dto/            # Data Transfer Objects
│   ├── handler/        # HTTP handlers
│   ├── middleware/     # HTTP middleware
│   ├── repository/     # Data access layer (future)
│   └── service/        # Business logic (future)
└── pkg/                # Public packages
    └── jwt/            # JWT utilities (future)
```

**Why Clean Architecture?**
- **Separation of Concerns:** Each layer has a specific responsibility
- **Testability:** Easy to mock dependencies and test in isolation
- **Maintainability:** Changes in one layer don't affect others
- **Scalability:** Easy to add new features without breaking existing code

---

### 🔧 Technologies & Concepts Implemented

#### 1. **Go HTTP Server (`net/http`)**

**What we learned:**
- Go's standard library provides a robust HTTP server
- `http.Server` struct allows fine-grained control over server behavior
- Graceful shutdown is essential for production applications

**Implementation:**
```go
srv := &http.Server{
    Addr:         fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port),
    Handler:      r,
    ReadTimeout:  time.Duration(cfg.Server.ReadTimeout) * time.Second,
    WriteTimeout: time.Duration(cfg.Server.WriteTimeout) * time.Second,
    IdleTimeout:  time.Duration(cfg.Server.IdleTimeout) * time.Second,
}
```

**Key Concepts:**
- **ReadTimeout:** Maximum time to read the entire request
- **WriteTimeout:** Maximum time to write the response
- **IdleTimeout:** Maximum time to wait for the next request when keep-alives are enabled

**Graceful Shutdown:**
```go
// Wait for interrupt signal
quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit

// Shutdown with timeout
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
srv.Shutdown(ctx)
```

**Why Graceful Shutdown?**
- Prevents data loss during shutdown
- Allows in-flight requests to complete
- Properly closes database connections and resources

---

#### 2. **Chi Router (`github.com/go-chi/chi/v5`)**

**What we learned:**
- Chi is a lightweight, idiomatic HTTP router for Go
- Supports route groups, middleware, and URL parameters
- Better performance and more features than standard `http.ServeMux`

**Basic Setup:**
```go
r := chi.NewRouter()
r.Get("/health", healthHandler)
```

**Route Groups:**
```go
r.Route("/api/v1/auth", func(r chi.Router) {
    r.Post("/register", h.Register)
    r.Post("/login", h.Login)
    r.With(middleware.RequireAuth).Get("/me", h.Me)
})
```

**Key Features:**
- **Route Groups:** Organize related routes together
- **Middleware:** Apply middleware to specific routes or groups
- **URL Parameters:** Extract path parameters (e.g., `/users/{id}`)
- **Method Routing:** Separate handlers for GET, POST, PUT, DELETE

**Why Chi over other routers?**
- Lightweight and fast
- Standard library compatible
- Excellent middleware support
- Great for microservices

---

#### 3. **Middleware Pattern**

**What we learned:**
- Middleware functions wrap HTTP handlers
- They can modify requests/responses or add cross-cutting concerns
- Middleware chain executes in order

**Custom Middleware Implementation:**
```go
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
        next.ServeHTTP(ww, r)
        duration := time.Since(start)
        log.Printf("[%s] %s %d %v", r.Method, r.RequestURI, ww.Status(), duration)
    })
}
```

**Middleware Types Implemented:**

1. **Logger Middleware**
   - Logs all HTTP requests with method, URI, status, and duration
   - Uses Chi's `WrapResponseWriter` to capture status code

2. **Recoverer Middleware**
   - Catches panics and prevents server crashes
   - Returns 500 error instead of crashing

3. **CORS Middleware**
   - Handles Cross-Origin Resource Sharing
   - Sets appropriate headers for browser requests
   - Handles preflight OPTIONS requests

4. **Request ID Middleware** (Chi built-in)
   - Adds unique ID to each request for tracing

5. **Real IP Middleware** (Chi built-in)
   - Extracts real client IP from proxy headers

**Middleware Chain:**
```go
r.Use(chimw.RequestID)    // 1. Add request ID
r.Use(chimw.RealIP)       // 2. Extract real IP
r.Use(appmw.Logger)        // 3. Log request
r.Use(appmw.Recoverer)    // 4. Catch panics
r.Use(appmw.CORS)         // 5. Handle CORS
r.Use(chimw.Timeout(60))  // 6. Set timeout
```

**Execution Order:** Middleware executes in the order it's registered (top to bottom), then handlers, then reverse order for response.

---

#### 4. **Request Validation (`go-playground/validator/v10`)**

**What we learned:**
- Input validation is critical for security and data integrity
- Struct tags provide declarative validation rules
- Validator library supports many built-in validators

**DTO (Data Transfer Object) Pattern:**
```go
type RegisterRequest struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
    FullName string `json:"full_name" validate:"required,min=2,max=100"`
}
```

**Validation Tags:**
- `required`: Field must be present
- `email`: Must be valid email format
- `min=8`: Minimum length of 8 characters
- `max=100`: Maximum length of 100 characters

**Validation Implementation:**
```go
func (v *Validator) ValidateJSON(r *http.Request, dst interface{}) error {
    // 1. Decode JSON body
    if err := json.NewDecoder(r.Body).Decode(dst); err != nil {
        return fmt.Errorf("invalid JSON: %w", err)
    }
    
    // 2. Validate struct
    if err := v.validate.Struct(dst); err != nil {
        return v.formatValidationError(err)
    }
    
    return nil
}
```

**Error Formatting:**
- Converts validation errors to human-readable messages
- Returns all validation errors in a single response
- Provides field-specific error messages

**Why Validation?**
- **Security:** Prevents injection attacks and malformed data
- **Data Integrity:** Ensures data meets business rules
- **User Experience:** Provides clear error messages
- **API Contract:** Enforces API expectations

---

#### 5. **Configuration Management**

**What we learned:**
- Configuration should be externalized (environment variables)
- Default values provide sensible fallbacks
- Type-safe configuration structs prevent errors

**Implementation:**
```go
type Config struct {
    Server   ServerConfig
    App      AppConfig
    Database DatabaseConfig
}

func Load() *Config {
    return &Config{
        Server: ServerConfig{
            Host: getEnv("SERVER_HOST", "0.0.0.0"),
            Port: getEnv("SERVER_PORT", "8080"),
            // ...
        },
    }
}
```

**Environment Variables:**
- `SERVER_HOST`: Server host (default: "0.0.0.0")
- `SERVER_PORT`: Server port (default: "8080")
- `APP_ENV`: Environment (default: "development")
- `LOG_LEVEL`: Log level (default: "info")

**Why Environment Variables?**
- Different configs for dev/staging/production
- No hardcoded secrets in code
- Easy to change without code modifications
- Follows 12-factor app principles

---

#### 6. **Handler Pattern**

**What we learned:**
- Handlers are HTTP request processors
- Each handler should have a single responsibility
- Response helpers keep code DRY

**Handler Structure:**
```go
type AuthHandler struct {
    validator *middleware.Validator
}

func (h *AuthHandler) RegisterRoutes(r chi.Router) {
    r.Route("/api/v1/auth", func(r chi.Router) {
        r.Post("/register", h.Register)
        r.Post("/login", h.Login)
    })
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
    // 1. Validate request
    // 2. Process business logic
    // 3. Return response
}
```

**Response Helpers:**
```go
// Success response
respondSuccess(w, http.StatusOK, data, "Message")

// Error response
respondError(w, http.StatusBadRequest, "Error message", "ERROR_CODE")
```

**Benefits:**
- Consistent response format
- Easy to modify response structure
- Centralized error handling

---

#### 7. **Health Check Endpoints**

**What we learned:**
- Health checks are essential for monitoring and orchestration
- Different types: liveness, readiness, health
- Kubernetes and load balancers use these endpoints

**Endpoints Implemented:**
- `GET /health`: Basic health status
- `GET /health/live`: Liveness probe (is service running?)
- `GET /health/ready`: Readiness probe (can service accept traffic?)

**Response Format:**
```json
{
    "status": "healthy",
    "timestamp": "2026-01-24T10:30:00Z",
    "service": "auth-service",
    "version": "1.0.0"
}
```

**Why Health Checks?**
- **Monitoring:** Track service availability
- **Orchestration:** Kubernetes uses them for rolling updates
- **Load Balancing:** Remove unhealthy instances
- **Debugging:** Quick way to verify service is running

---

### 📝 Code Patterns & Best Practices

#### 1. **Error Handling**
- Always return errors, don't ignore them
- Wrap errors with context: `fmt.Errorf("failed to decode: %w", err)`
- Use custom error types for different error categories

#### 2. **JSON Responses**
- Consistent response structure across all endpoints
- Proper HTTP status codes
- Error responses include error code for client handling

#### 3. **Project Structure**
- `cmd/`: Application entry points
- `internal/`: Private application code
- `pkg/`: Public packages that can be imported
- Clear separation of concerns

#### 4. **Code Organization**
- One file per concern (handler, middleware, config)
- Group related functionality
- Use interfaces for testability (future)

---

### 🎯 Week 1 Deliverables

✅ **Day 1-2: Basic HTTP Server**
- HTTP server with configurable timeouts
- Health check endpoints
- Graceful shutdown

✅ **Day 3-4: Chi Router Setup**
- Route groups for API versioning
- Middleware chain
- URL parameter support (prepared for future use)

✅ **Day 5: Request Validation**
- DTO structs with validation tags
- JSON validation middleware
- Human-readable error messages

✅ **Day 6-7: Project Structure**
- Clean architecture layout
- Configuration management
- Response helpers

---

### 🔄 What's Next (Week 2)

- PostgreSQL database integration
- GORM ORM setup
- User model and repository
- Password hashing with bcrypt
- JWT token generation
- Authentication middleware implementation

---

### 📖 Key Takeaways

1. **Clean Architecture** makes code maintainable and testable
2. **Middleware** provides powerful cross-cutting concerns
3. **Validation** is essential for security and data integrity
4. **Configuration** should be externalized via environment variables
5. **Graceful Shutdown** is critical for production applications
6. **Health Checks** enable proper monitoring and orchestration

---

**Document Version:** 1.0  
**Last Updated:** January 24, 2026  
**Next Update:** After Week 2 completion

