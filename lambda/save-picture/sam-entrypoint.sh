#!/bin/bash
set -o errexit
BASEDIR="$1"
/usr/local/bin/sam local start-lambda \
  -p 3021 \
  --host 0.0.0.0 \
  --docker-volume-basedir "${BASEDIR}" \
  --docker-network respondio-network \
  --skip-pull-image
