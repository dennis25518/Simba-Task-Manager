#!/bin/bash
set -e

echo "🚀 Building Simba Task Manager Backend..."

# Navigate to server directory
cd server

# Install dependencies
echo "📦 Installing server dependencies..."
npm install

echo "✅ Build complete! Ready to start server."
