# Backend Testing Guide
## Decentralized Freelancer Trust Platform

**Purpose:** This document provides testing instructions and test cases for verifying that each phase/week of development is working correctly. Update this document as new features are implemented.

---

## 🧪 Week 1 - Phase 1: HTTP Server & Routing Tests

**Goal:** Verify that the basic HTTP server, routing, validation, and middleware are working correctly.

---

### 📋 Prerequisites

1. **Start the Auth Service:**
   ```bash
   cd backend/services/auth-service
   go run cmd/server/main.go
   ```

2. **Verify Server is Running:**
   - You should see: `🚀 Auth Service starting on 0.0.0.0:8080`
   - Server should be accessible at `http://localhost:8080`

3. **Tools Needed:**
   - `curl` (command-line HTTP client)
   - Or any REST client (Postman, Insomnia, etc.)
   - Browser (for simple GET requests)

---

### ✅ Test Cases

#### 1. Health Check Endpoints

**Test 1.1: Basic Health Check**
```bash
curl http://localhost:8080/health
```

**Expected Response:**
```json
{
    "status": "healthy",
    "timestamp": "2026-01-24T10:30:00Z",
    "service": "auth-service",
    "version": "1.0.0"
}
```

**Status Code:** `200 OK`

---

**Test 1.2: Liveness Probe**
```bash
curl http://localhost:8080/health/live
```

**Expected Response:**
```json
{
    "status": "alive",
    "timestamp": "2026-01-24T10:30:00Z",
    "service": "auth-service",
    "version": "1.0.0"
}
```

**Status Code:** `200 OK`

---

**Test 1.3: Readiness Probe**
```bash
curl http://localhost:8080/health/ready
```

**Expected Response:**
```json
{
    "status": "ready",
    "timestamp": "2026-01-24T10:30:00Z",
    "service": "auth-service",
    "version": "1.0.0"
}
```

**Status Code:** `200 OK`

---

#### 2. Request Validation Tests

**Test 2.1: Valid Registration Request**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

**Expected Response:**
```json
{
    "data": {
        "message": "Registration endpoint - implementation pending",
        "email": "test@example.com"
    },
    "message": "User registration endpoint ready"
}
```

**Status Code:** `201 Created`

---

**Test 2.2: Invalid Email Format**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "Field 'Email' failed validation: must be a valid email address",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

**Test 2.3: Missing Required Field**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "Field 'FullName' failed validation: is required",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

**Test 2.4: Password Too Short**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "short",
    "full_name": "John Doe"
  }'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "Field 'Password' failed validation: must be at least 8 characters",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

**Test 2.5: Invalid JSON**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "John Doe"
  invalid json'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "invalid JSON: ...",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

#### 3. Login Endpoint Tests

**Test 3.1: Valid Login Request**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
    "data": {
        "message": "Login endpoint - implementation pending",
        "email": "test@example.com"
    },
    "message": "User login endpoint ready"
}
```

**Status Code:** `200 OK`

---

**Test 3.2: Invalid Login Request (Missing Email)**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "Field 'Email' failed validation: is required",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

#### 4. Token Refresh Endpoint Tests

**Test 4.1: Valid Refresh Request**
```bash
curl -X POST http://localhost:8080/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "some-refresh-token"
  }'
```

**Expected Response:**
```json
{
    "data": {
        "message": "Token refresh endpoint - implementation pending"
    },
    "message": "Token refresh endpoint ready"
}
```

**Status Code:** `200 OK`

---

**Test 4.2: Missing Refresh Token**
```bash
curl -X POST http://localhost:8080/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
    "error": "Bad Request",
    "message": "Field 'RefreshToken' failed validation: is required",
    "code": "VALIDATION_ERROR"
}
```

**Status Code:** `400 Bad Request`

---

#### 5. Protected Endpoint Tests

**Test 5.1: Get Current User (Protected Route)**
```bash
curl http://localhost:8080/api/v1/auth/me
```

**Expected Response:**
```json
{
    "data": {
        "message": "Get current user endpoint - implementation pending"
    },
    "message": "Current user endpoint ready"
}
```

**Status Code:** `200 OK`

**Note:** Authentication middleware is a placeholder in Week 1, so this will work without a token. In Week 2, this will require a valid JWT token.

---

#### 6. Middleware Tests

**Test 6.1: CORS Preflight Request**
```bash
curl -X OPTIONS http://localhost:8080/api/v1/auth/register \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected Headers:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Accept, Authorization, Content-Type, X-CSRF-Token
```

**Status Code:** `204 No Content`

---

**Test 6.2: Request Logging**
Check server logs when making any request. You should see:
```
[POST] /api/v1/auth/register 127.0.0.1:xxxxx 201 2.5ms
```

**Format:** `[METHOD] URI IP STATUS DURATION`

---

**Test 6.3: Request ID**
Make a request and check if `X-Request-Id` header is present in response:
```bash
curl -v http://localhost:8080/health
```

**Expected Header:**
```
X-Request-Id: <unique-id>
```

---

#### 7. Error Handling Tests

**Test 7.1: Non-existent Route**
```bash
curl http://localhost:8080/api/v1/nonexistent
```

**Expected Response:**
```
404 page not found
```

**Status Code:** `404 Not Found`

---

**Test 7.2: Wrong HTTP Method**
```bash
curl -X GET http://localhost:8080/api/v1/auth/register
```

**Expected Response:**
```
404 page not found
```

**Status Code:** `404 Not Found`

---

### 🎯 Week 1 Completion Checklist

- [ ] All health check endpoints return correct responses
- [ ] Request validation works for all endpoints
- [ ] Invalid requests return proper error messages
- [ ] CORS middleware handles preflight requests
- [ ] Request logging is working
- [ ] Request ID is generated for each request
- [ ] Graceful shutdown works (Ctrl+C stops server cleanly)
- [ ] All endpoints return consistent JSON format
- [ ] Error responses include error code
- [ ] Server handles concurrent requests

---

### 🚀 Quick Test Script

Save this as `test_week1.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080"

echo "Testing Health Endpoints..."
curl -s $BASE_URL/health | jq .
echo ""

echo "Testing Registration (Valid)..."
curl -s -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","full_name":"John Doe"}' | jq .
echo ""

echo "Testing Registration (Invalid Email)..."
curl -s -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid","password":"password123","full_name":"John Doe"}' | jq .
echo ""

echo "Testing Login..."
curl -s -X POST $BASE_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' | jq .
echo ""

echo "All tests completed!"
```

**Run with:**
```bash
chmod +x test_week1.sh
./test_week1.sh
```

---

### 📊 Expected Test Results Summary

| Test Category | Tests | Passed | Failed |
|--------------|-------|--------|--------|
| Health Checks | 3 | ✅ | ❌ |
| Validation | 5 | ✅ | ❌ |
| Login | 2 | ✅ | ❌ |
| Refresh | 2 | ✅ | ❌ |
| Protected Routes | 1 | ✅ | ❌ |
| Middleware | 3 | ✅ | ❌ |
| Error Handling | 2 | ✅ | ❌ |
| **Total** | **18** | **✅** | **❌** |

---

### 🔍 Debugging Tips

1. **Server not starting?**
   - Check if port 8080 is already in use: `lsof -i :8080`
   - Change port via environment variable: `SERVER_PORT=8081 go run cmd/server/main.go`

2. **Validation not working?**
   - Check Content-Type header is `application/json`
   - Verify JSON syntax is correct
   - Check struct tags match validation rules

3. **CORS issues?**
   - Verify CORS middleware is registered
   - Check browser console for CORS errors
   - Ensure preflight OPTIONS request is handled

4. **No logs appearing?**
   - Check Logger middleware is registered
   - Verify log output is going to stdout

---

**Document Version:** 1.0  
**Last Updated:** January 24, 2026  
**Next Update:** After Week 2 completion

