#!/bin/bash

# Test script for Admin Prompts API
# Task #40: API Admin - CRUD de Prompts

BASE_URL="http://localhost:3000"
ADMIN_USER_ID="your-admin-user-id-here"  # Replace with actual admin user ID
CATEGORY_ID="your-category-id-here"      # Replace with actual category ID

echo "=========================================="
echo "Testing Admin Prompts API"
echo "=========================================="
echo ""

echo "⚠️  IMPORTANT: This script requires:"
echo "1. Server running on localhost:3000"
echo "2. Valid admin user ID in database"
echo "3. Valid category ID in database"
echo "4. Cookie 'user_id' set for authentication"
echo ""

# Test 1: Create a new prompt
echo "Test 1: POST /api/admin/prompts - Create new prompt"
echo "---------------------------------------------------"

RESPONSE=$(curl -s -X POST "$BASE_URL/api/admin/prompts" \
  -H "Content-Type: application/json" \
  -H "Cookie: user_id=$ADMIN_USER_ID" \
  -d '{
    "slug": "test-prompt-api",
    "alias": "TEST-API-01",
    "title": "Test Prompt via API",
    "description": "This is a test prompt created via the Admin API",
    "content": "You are a helpful assistant. Answer the following question: {{question}}",
    "categoryId": "'"$CATEGORY_ID"'",
    "status": "DRAFT",
    "sourceChapter": "test-chapter",
    "placeholders": [
      {
        "name": "question",
        "label": "Question",
        "type": "textarea",
        "required": true
      }
    ],
    "modelTag": "universal"
  }')

echo "$RESPONSE" | jq '.'
PROMPT_ID=$(echo "$RESPONSE" | jq -r '.data.id')
echo ""
echo "Created Prompt ID: $PROMPT_ID"
echo ""

# Test 2: Update the prompt
echo "Test 2: PUT /api/admin/prompts/[id] - Update prompt"
echo "---------------------------------------------------"

if [ "$PROMPT_ID" != "null" ] && [ -n "$PROMPT_ID" ]; then
  RESPONSE=$(curl -s -X PUT "$BASE_URL/api/admin/prompts/$PROMPT_ID" \
    -H "Content-Type: application/json" \
    -H "Cookie: user_id=$ADMIN_USER_ID" \
    -d '{
      "title": "Updated Test Prompt via API",
      "description": "This prompt has been updated",
      "status": "PUBLISHED"
    }')
  
  echo "$RESPONSE" | jq '.'
  echo ""
else
  echo "⚠️  Skipping update test - no prompt ID available"
  echo ""
fi

# Test 3: Get the prompt (using public API)
echo "Test 3: GET /api/prompts/[slug] - View prompt"
echo "---------------------------------------------------"

RESPONSE=$(curl -s -X GET "$BASE_URL/api/prompts/test-prompt-api")
echo "$RESPONSE" | jq '.'
echo ""

# Test 4: Delete the prompt
echo "Test 4: DELETE /api/admin/prompts/[id] - Delete prompt"
echo "---------------------------------------------------"

if [ "$PROMPT_ID" != "null" ] && [ -n "$PROMPT_ID" ]; then
  read -p "Do you want to delete the test prompt? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    RESPONSE=$(curl -s -X DELETE "$BASE_URL/api/admin/prompts/$PROMPT_ID" \
      -H "Cookie: user_id=$ADMIN_USER_ID")
    
    echo "$RESPONSE" | jq '.'
    echo ""
  else
    echo "⚠️  Skipping delete - keeping test prompt"
    echo ""
  fi
else
  echo "⚠️  Skipping delete test - no prompt ID available"
  echo ""
fi

echo "=========================================="
echo "Tests completed!"
echo "=========================================="
