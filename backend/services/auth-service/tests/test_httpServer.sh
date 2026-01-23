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