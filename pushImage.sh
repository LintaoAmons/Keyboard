#!/usr/bin/env bash
docker build -t lintao0o0/keyboard:"$1" .
docker push lintao0o0/keyboard:"$1"
