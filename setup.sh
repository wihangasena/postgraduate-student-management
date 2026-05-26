#!/bin/bash

# Wayamba University Postgraduate Application Portal
# Quick Start Setup Script

echo "🎓 Wayamba University - Postgraduate Application Portal"
echo "=================================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build project
echo ""
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Success
echo ""
echo "✨ Setup complete!"
echo ""
echo "To start development server:"
echo "  npm run dev"
echo ""
echo "To start production server:"
echo "  npm run start"
echo ""
echo "To run linter:"
echo "  npm run lint"
echo ""
