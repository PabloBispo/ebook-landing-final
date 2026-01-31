#!/bin/bash

# Test Middleware and Route Protection
# This script tests the authentication middleware implementation

echo "=========================================="
echo "Testing Middleware and Route Protection"
echo "=========================================="
echo ""

BASE_URL="http://localhost:3000"

echo "1. Testing unauthenticated access to /prompts/manage"
echo "   Expected: Redirect to /login"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE_URL/prompts/manage")
echo "   Response code: $RESPONSE"
echo ""

echo "2. Testing login page accessibility"
echo "   Expected: 200 OK"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/login")
echo "   Response code: $RESPONSE"
echo ""

echo "3. Testing 403 page accessibility"
echo "   Expected: 200 OK"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/403")
echo "   Response code: $RESPONSE"
echo ""

echo "4. Testing public routes (should work without auth)"
echo "   Testing home page"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
echo "   Response code: $RESPONSE"
echo ""

echo "=========================================="
echo "Manual Testing Required:"
echo "=========================================="
echo ""
echo "1. Open browser and navigate to: $BASE_URL/prompts/manage"
echo "   - Should redirect to /login"
echo ""
echo "2. Try to login with a USER role account"
echo "   - Should redirect to /403 (Forbidden)"
echo ""
echo "3. Try to login with STAFF or ADMIN role account"
echo "   - Should successfully access /prompts/manage"
echo ""
echo "4. Test the login form:"
echo "   - Email validation"
echo "   - Password validation"
echo "   - Error messages"
echo "   - Loading states"
echo ""
echo "=========================================="
