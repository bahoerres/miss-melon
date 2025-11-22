#!/bin/bash
set -e

echo "[2025-11-21 18:50:27] Starting deployment..."

cd /home/sysadmin/code/miss-melon

# Fetch latest changes
git fetch origin main
git checkout main
git reset --hard origin/main

# Build the site
npm run quartz -- build

echo "[2025-11-21 18:50:27] Deployment completed successfully"
