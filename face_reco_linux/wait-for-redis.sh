#!/bin/sh
set -e

while ! nc -z redis 6379; do
  echo "Miandry ny Redis to be available..."
  sleep 1
done

echo "Redis is up and running! ok ok"
exec python /app/app.py
