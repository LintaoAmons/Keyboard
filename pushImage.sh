#!/usr/bin/env bash
set -e

version=$(cat package.json | jq -r ".version")

docker build -t lintao0o0/keyboard:$version .

docker push lintao0o0/keyboard:$version
