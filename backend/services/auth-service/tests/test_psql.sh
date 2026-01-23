BASE_URL="http://localhost:8080"
EMAIL="test$(date +%s)@example.com"
PASSWORD="password123"

echo "=== Week 2 Tests ==="
echo ""

echo "1. Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"full_name\":\"Test User\"}")

echo "$REGISTER_RESPONSE" | jq .
ACCESS_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.access_token')
REFRESH_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.refresh_token')

echo ""
echo "2. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
echo "$LOGIN_RESPONSE" | jq .

echo ""
echo "3. Testing Protected Route (/me)..."
curl -s http://localhost:8080/api/v1/auth/me \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq .

echo ""
echo "4. Testing Token Refresh..."
REFRESH_RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH_TOKEN\"}")
echo "$REFRESH_RESPONSE" | jq .

echo ""
echo "All Week 2 tests completed!"