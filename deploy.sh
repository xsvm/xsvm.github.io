#!/bin/bash

# 确保脚本在任何错误时退出
set -e

# 构建项目
echo "Building project..."
npm run docs:build

# 处理 Windows 和 Unix 路径差异
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  DIST_PATH="docs/.vitepress/dist"
else
  DIST_PATH="docs/.vitepress/dist"
fi

# 进入构建目录
cd "$DIST_PATH"

# 初始化 Git
echo "Initializing Git repository..."
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# 添加文件
echo "Adding files..."
git add -A
git commit -m "Auto-deploy $(date '+%Y-%m-%d %H:%M:%S')"

# 推送
echo "Pushing to GitHub..."
git push -f git@github.com:xsvm/xsvm.github.io.git main:gh-pages

echo "Deployment successful!"