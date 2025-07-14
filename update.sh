#!/bin/bash

echo "🔄 Pulling latest code from GitHub..."
git reset --hard
git clean -fd
git pull origin main

echo "🔧 Rebuilding Docker container..."
docker compose down --volumes --remove-orphans
docker compose up -d --build

echo "✅ Done. App is running."
