# Auth Service

Authentication microservice for the Decentralized Freelancer Trust Platform.

## 🚀 Quick Start

### Prerequisites
- Go 1.24.0 or higher
- PostgreSQL database (local, Neon DB, AWS RDS, or Docker)

### Database Options

#### Option 1: Local PostgreSQL (No Docker)

1. **Install PostgreSQL locally:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS (Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # Create database
   createdb auth_db
   ```

2. **Create user and database:**
   ```bash
   psql postgres
   CREATE USER freelancer WITH PASSWORD 'secret';
   CREATE DATABASE auth_db OWNER freelancer;
   GRANT ALL PRIVILEGES ON DATABASE auth_db TO freelancer;
   \q
   ```

#### Option 2: Neon DB (Serverless PostgreSQL) - Recommended for Development

1. **Sign up at [Neon](https://neon.tech)**
2. **Create a new project**
3. **Get connection details from Neon dashboard:**
   - Host: `ep-xxx-xxx.us-east-2.aws.neon.tech`
   - Database: `neondb` (default)
   - User and Password: Provided by Neon

#### Option 3: Docker (Optional)

```bash
docker-compose up -d
```

#### Option 4: AWS RDS (Production)

Use RDS PostgreSQL instance connection details.

### Environment Variables

**Create a `.env` file** in the `auth-service` directory (copy from `.env.example`):

```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env
```

**Or set environment variables directly:**

```bash
# Server Configuration
export SERVER_HOST=0.0.0.0
export SERVER_PORT=8080

# Database Configuration
# For Local PostgreSQL:
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=freelancer
export DB_PASSWORD=secret
export DB_NAME=auth_db
export DB_SSLMODE=disable

# For Neon DB / AWS RDS:
export DB_HOST=ep-xxx-xxx.us-east-2.aws.neon.tech
export DB_PORT=5432
export DB_USER=your-user
export DB_PASSWORD=your-password
export DB_NAME=neondb
export DB_SSLMODE=require  # Required for cloud databases

# JWT Configuration
export JWT_SECRET=your-secret-key-min-32-characters
export JWT_ACCESS_TTL_HOURS=24
export JWT_REFRESH_TTL_DAYS=7

# Application Configuration
export APP_ENV=development
export LOG_LEVEL=info
```

### Run Locally

```bash
# Navigate to service directory
cd backend/services/auth-service

# Install dependencies (if not already done)
go mod download

# Load environment variables (if using .env file)
# Note: Go doesn't load .env automatically, use one of:
# Option A: Use godotenv package (install: go get github.com/joho/godotenv)
# Option B: Export variables manually
# Option C: Use a tool like direnv

# Run the server
go run cmd/server/main.go
```

The server will start on `http://localhost:8080` by default.

### Using .env File (Optional)

If you want automatic `.env` file loading, install `godotenv`:

```bash
go get github.com/joho/godotenv
```

Then add to `cmd/server/main.go`:
```go
import "github.com/joho/godotenv"

func main() {
    // Load .env file
    godotenv.Load()
    
    // Rest of the code...
}
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

