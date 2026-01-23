# Quick Start Checklist - Go Backend Learning

Use this checklist to track your progress. Check off items as you complete them!

---

## ✅ Phase 1: Foundation & HTTP Server

### Step 1.1: Project Structure & Go Modules
- [ ] Create `services/auth-service/go.mod`
- [ ] Create `services/user-service/go.mod`
- [ ] Create `shared/pkg/go.mod`
- [ ] Understand `go mod init`, `go mod tidy`, `go get`
- [ ] Set up basic project structure (cmd/, internal/, pkg/)

### Step 1.2: HTTP Server with net/http
- [ ] Create simple HTTP server in `auth-service/cmd/server/main.go`
- [ ] Implement `/health` endpoint
- [ ] Implement `/api/v1/register` endpoint (in-memory, no DB)
- [ ] Understand `http.Request`, `http.ResponseWriter`
- [ ] Understand `json.Marshal` and `json.Unmarshal`

### Step 1.3: Struct Tags & JSON
- [ ] Create `RegisterRequest` struct with JSON tags
- [ ] Create `RegisterResponse` struct
- [ ] Handle JSON parsing errors
- [ ] Return proper HTTP status codes (200, 400, 500)

### Step 1.4: Error Handling
- [ ] Create `internal/errors/errors.go` with domain errors
- [ ] Implement error handling in handlers
- [ ] Return user-friendly error messages
- [ ] Understand error wrapping (`fmt.Errorf`, `%w`)

---

## ✅ Phase 2: Database & ORM

### Step 2.1: PostgreSQL Connection
- [ ] Set up PostgreSQL (Docker or local)
- [ ] Install PostgreSQL driver (`github.com/lib/pq` or `github.com/jackc/pgx/v5`)
- [ ] Create database connection function
- [ ] Write raw SQL to create users table
- [ ] Implement `CreateUser` with raw SQL
- [ ] Implement `GetUserByEmail` with raw SQL

### Step 2.2: GORM - The ORM
- [ ] Install GORM (`gorm.io/gorm`, `gorm.io/driver/postgres`)
- [ ] Convert User struct to GORM model
- [ ] Add GORM tags (`primaryKey`, `uniqueIndex`, etc.)
- [ ] Implement `db.AutoMigrate(&User{})`
- [ ] Replace raw SQL with GORM methods
- [ ] Understand: `db.Create()`, `db.First()`, `db.Where()`, `db.Save()`

### Step 2.3: Repository Pattern
- [ ] Create `UserRepository` interface
- [ ] Implement PostgreSQL repository
- [ ] Refactor service to use repository
- [ ] Understand dependency injection
- [ ] Understand interface benefits

### Step 2.4: Context Package
- [ ] Add `context.Context` to all repository methods
- [ ] Add timeout middleware to HTTP handlers
- [ ] Understand `context.Background()`, `context.WithTimeout()`
- [ ] Handle context cancellation

---

## ✅ Phase 3: Authentication & Security

### Step 3.1: Password Hashing
- [ ] Install `golang.org/x/crypto/bcrypt`
- [ ] Create password hashing utility function
- [ ] Hash passwords on registration
- [ ] Verify passwords on login
- [ ] Understand hashing vs encryption

### Step 3.2: JWT Tokens
- [ ] Install `github.com/golang-jwt/jwt/v5`
- [ ] Create JWT utility package
- [ ] Generate access token on login/register
- [ ] Generate refresh token
- [ ] Create JWT validation middleware
- [ ] Understand token expiration
- [ ] Implement refresh token endpoint

### Step 3.3: HTTP Middleware
- [ ] Create `internal/middleware/auth.go`
- [ ] Create `internal/middleware/logging.go`
- [ ] Create `internal/middleware/cors.go`
- [ ] Apply middleware to routes
- [ ] Understand middleware chaining

### Step 3.4: Router Library (Chi)
- [ ] Install `github.com/go-chi/chi/v5`
- [ ] Replace `net/http` routing with Chi
- [ ] Organize routes into groups
- [ ] Separate public and protected routes
- [ ] Understand `chi.URLParam()`
- [ ] Understand route patterns

---

## ✅ Phase 4: Configuration & Environment

### Step 4.1: Environment Variables
- [ ] Create `.env` file
- [ ] Load environment variables with `os.Getenv()`
- [ ] Create config struct
- [ ] Load database URL from env
- [ ] Load JWT secret from env
- [ ] Load server port from env

### Step 4.2: Viper for Config
- [ ] Install `github.com/spf13/viper`
- [ ] Create config package
- [ ] Load config from file (YAML/JSON)
- [ ] Support environment variable overrides
- [ ] Use config throughout application
- [ ] Understand config precedence

---

## ✅ Phase 5: Advanced Database

### Step 5.1: Database Migrations
- [ ] Install `golang-migrate/migrate` tool
- [ ] Create migration files
- [ ] Set up migration runner
- [ ] Run migrations programmatically
- [ ] Understand up/down migrations

### Step 5.2: Transactions
- [ ] Understand database transactions
- [ ] Implement atomic user registration
- [ ] Implement atomic contract creation
- [ ] Handle rollback scenarios
- [ ] Understand ACID properties

### Step 5.3: MongoDB Integration
- [ ] Install `go.mongodb.org/mongo-driver`
- [ ] Connect to MongoDB
- [ ] Create contract repository with MongoDB
- [ ] Store contracts in MongoDB
- [ ] Store ratings in MongoDB
- [ ] Understand BSON tags
- [ ] Understand when to use MongoDB vs PostgreSQL

---

## ✅ Phase 6: Caching & Redis

### Step 6.1: Redis Basics
- [ ] Install `github.com/redis/go-redis/v9`
- [ ] Set up Redis connection
- [ ] Implement session caching
- [ ] Implement user profile caching
- [ ] Understand Redis commands
- [ ] Understand TTL and eviction

### Step 6.2: Rate Limiting
- [ ] Install `github.com/go-chi/httprate`
- [ ] Implement rate limiting middleware
- [ ] Implement per-IP rate limiting
- [ ] Implement per-user rate limiting
- [ ] Use Redis for distributed rate limiting
- [ ] Understand rate limiting algorithms

---

## ✅ Phase 7: Inter-Service Communication

### Step 7.1: gRPC Basics
- [ ] Install protoc compiler
- [ ] Install `google.golang.org/grpc` and `google.golang.org/protobuf`
- [ ] Create `.proto` file for auth service
- [ ] Generate Go code from proto
- [ ] Implement gRPC server
- [ ] Implement gRPC client
- [ ] Understand protobuf syntax
- [ ] Understand gRPC vs REST

### Step 7.2: API Gateway
- [ ] Create API Gateway service
- [ ] Set up routing to microservices
- [ ] Implement authentication at gateway
- [ ] Forward requests to services
- [ ] Understand gateway pattern

---

## ✅ Phase 8: Event-Driven Architecture

### Step 8.1: Kafka Basics
- [ ] Install `github.com/segmentio/kafka-go`
- [ ] Set up Kafka (Docker)
- [ ] Create event producer
- [ ] Create event consumer
- [ ] Publish contract.signed events
- [ ] Consume events in blockchain service
- [ ] Understand topics, partitions, consumer groups

### Step 8.2: Event Schemas
- [ ] Create `shared/events/` package
- [ ] Define event structs
- [ ] Implement event serialization
- [ ] Handle event processing errors
- [ ] Understand event versioning

---

## ✅ Phase 9: Blockchain Integration

### Step 9.1: Ethereum Basics
- [ ] Install `github.com/ethereum/go-ethereum`
- [ ] Connect to Polygon/Base testnet RPC
- [ ] Generate wallet addresses
- [ ] Check balances
- [ ] Understand Ethereum addresses
- [ ] Understand transactions

### Step 9.2: Smart Contract Interaction
- [ ] Get smart contract ABI
- [ ] Generate Go bindings from ABI
- [ ] Implement contract interaction
- [ ] Record contracts on blockchain
- [ ] Understand ABI
- [ ] Understand transaction signing
- [ ] Understand gas estimation

### Step 9.3: IPFS Integration
- [ ] Set up IPFS (local or Pinata)
- [ ] Implement file upload to IPFS
- [ ] Store IPFS hash in database
- [ ] Link IPFS hash to blockchain records
- [ ] Retrieve documents from IPFS

---

## ✅ Phase 10: Advanced Features

### Step 10.1: Logging
- [ ] Install `go.uber.org/zap`
- [ ] Replace `log` with `zap`
- [ ] Add structured logging
- [ ] Add request ID tracking
- [ ] Understand log levels
- [ ] Understand structured logging

### Step 10.2: Testing
- [ ] Install `github.com/stretchr/testify`
- [ ] Write unit tests for services
- [ ] Write integration tests for repositories
- [ ] Write HTTP handler tests
- [ ] Understand test coverage
- [ ] Understand table-driven tests

### Step 10.3: Validation
- [ ] Install `github.com/go-playground/validator/v10`
- [ ] Add validation tags to request structs
- [ ] Validate request payloads
- [ ] Return validation errors
- [ ] Create custom validators

---

## ✅ Phase 11: Production Readiness

### Step 11.1: Docker
- [ ] Create Dockerfile for auth-service
- [ ] Create Dockerfile for user-service
- [ ] Create docker-compose.yml
- [ ] Build and run containers
- [ ] Optimize image sizes (multi-stage builds)
- [ ] Understand Docker best practices

### Step 11.2: Graceful Shutdown
- [ ] Implement signal handling
- [ ] Handle SIGTERM/SIGINT
- [ ] Gracefully close database connections
- [ ] Gracefully close Redis connections
- [ ] Finish in-flight requests
- [ ] Understand graceful shutdown pattern

---

## 📊 Progress Summary

**Total Phases:** 11  
**Total Steps:** ~30  
**Estimated Time:** 14 weeks (3-4 hours/day)

**Current Progress:**
- Phase 1: ___ / 4 steps
- Phase 2: ___ / 4 steps
- Phase 3: ___ / 4 steps
- Phase 4: ___ / 2 steps
- Phase 5: ___ / 3 steps
- Phase 6: ___ / 2 steps
- Phase 7: ___ / 2 steps
- Phase 8: ___ / 2 steps
- Phase 9: ___ / 3 steps
- Phase 10: ___ / 3 steps
- Phase 11: ___ / 2 steps

---

## 🎯 Current Focus

**Current Phase:** _______________  
**Current Step:** _______________  
**Started On:** _______________  
**Target Completion:** _______________

---

## 📝 Notes

Use this space to jot down:
- Things you learned
- Problems you encountered
- Solutions you found
- Ideas for improvements

---

## 🚀 Ready to Start?

1. ✅ Read the full learning plan: `GO_LEARNING_PLAN.md`
2. ✅ Start with Phase 1, Step 1.1
3. ✅ Check off items as you complete them
4. ✅ Build real features, not just tutorials!

**Remember:** You're building a production system while learning. Every step directly applies to your project!

