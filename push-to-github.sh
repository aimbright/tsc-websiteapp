#!/bin/bash

# Push code to GitHub repository
# Repository: https://github.com/aimbright/tsc-websiteapp.git

echo "🚀 Pushing code to GitHub..."

# Set remote (using HTTPS - will prompt for credentials)
git remote set-url origin https://github.com/aimbright/tsc-websiteapp.git

# Check status
echo "📊 Current git status:"
git status

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Check your repository at: https://github.com/aimbright/tsc-websiteapp"

