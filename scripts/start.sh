#!/bin/bash

# X Profile Viral Intelligence Launcher
# Port: 3032

echo "🚀 Starting X Profile Viral Intelligence..."
echo "📍 Port: 3032"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for .env.local file
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found!"
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo ""
    echo "🔑 Please add your API keys to .env.local:"
    echo "   - X API credentials (Bearer Token, etc.)"
    echo "   - Gemini API key"
    echo ""
fi

# Start the application
echo "🔄 Starting Next.js server on port 3032..."
npm run dev