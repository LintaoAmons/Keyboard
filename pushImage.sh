#!/usr/bin/env bash
set -e

version=$(cat package.json | jq -r ".version")
echo "🤡 version: $version ===================="

echo "👻 start build =========================="
docker build -t lintao0o0/keyboard:$version .

echo "👻 start push =========================="
docker push lintao0o0/keyboard:$version
