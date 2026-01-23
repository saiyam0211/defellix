# Auth Service

Authentication microservice for the Decentralized Freelancer Trust Platform.

## 🚀 Quick Start

### Prerequisites
- Go 1.24.0 or higher
- (Optional) Docker for PostgreSQL (Week 2)

### Run Locally

```bash
# Navigate to service directory
cd backend/services/auth-service

# Install dependencies (if not already done)
go mod download

# Run the server
go run cmd/server/main.go
```

The server will start on `http://localhost:8080` by default.

### Environment Variables

```bash
# Server Configuration
export SERVER_HOST=0.0.0.0
export SERVER_PORT=8080
export SERVER_READ_TIMEOUT=15
export SERVER_WRITE_TIMEOUT=15
export SERVER_IDLE_TIMEOUT=60

# Application Configuration
export APP_ENV=development
export LOG_LEVEL=info

# Database Configuration (for Week 2)
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=freelancer
export DB_PASSWORD=secret
export DB_NAME=auth_db
```

## 📁 Project Structure

```
auth-service/
├── cmd/
│   └── server/
│       └── main.go          # Application entry point
├── internal/
│   ├── config/              # Configuration management
│   ├── domain/              # Domain entities (future)
│   ├── dto/                 # Data Transfer Objects
│   ├── handler/             # HTTP handlers
│   ├── middleware/          # HTTP middleware
│   ├── repository/          # Data access layer (future)
│   └── service/             # Business logic (future)
└── pkg/
    └── jwt/                 # JWT utilities (future)
```

## 🔌 API Endpoints

### Health Checks
- `GET /health` - Basic health check
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe

### Authentication (Week 1 - Placeholder)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Token refresh
- `GET /api/v1/auth/me` - Get current user (protected)

**Note:** Authentication endpoints are placeholders in Week 1. Full implementation will be completed in Week 2.

## 🧪 Testing

See `Learning/TestBackend.md` for comprehensive testing instructions.

### Quick Test

```bash
# Health check
curl http://localhost:8080/health

# Register (placeholder)
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

## 🏗️ Architecture

This service follows **Clean Architecture** principles:

- **Handlers**: HTTP request/response handling
- **DTOs**: Data Transfer Objects for API contracts
- **Middleware**: Cross-cutting concerns (logging, CORS, validation)
- **Config**: Externalized configuration management

## 📚 Learning Resources

- Implementation details: `Learning/executionAccordingLearning.md`
- Testing guide: `Learning/TestBackend.md`
- Execution plan: `backend/execution.md`

## 🔄 Development Status

### ✅ Week 1 (Completed)
- [x] Basic HTTP server
- [x] Chi router setup
- [x] Request validation
- [x] Middleware (Logger, Recoverer, CORS)
- [x] Health check endpoints
- [x] Clean architecture structure

### 🚧 Week 2 (Next)
- [ ] PostgreSQL integration
- [ ] GORM setup
- [ ] User model and repository
- [ ] Password hashing (bcrypt)
- [ ] JWT token generation
- [ ] Authentication middleware

## 🛠️ Build

```bash
# Build binary
go build -o bin/auth-service ./cmd/server

# Run binary
./bin/auth-service
```

## 📝 License

Part of the Decentralized Freelancer Trust Platform.

