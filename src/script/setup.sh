#!/bin/sh

echo "🚀Setting Up!!🚀"

if docker container inspect redis >/dev/null 2>&1; then
  echo 'Container for redis exists! Terminating the container...'
  docker stop redis && docker rm redis
  echo
fi

####### Volume Setup ######

echo "📦️Checking required volumes...📦️️"

if docker volume inspect redis_volume >/dev/null 2>&1; then
  echo "Creating volumes for redis...."
  docker volume create redis_volume
fi

echo "📦️All volumes exists!📦️"

####### REDIS #######
echo "🔨Phase 1: Redis🔨"
echo "[REDIS] Initiating set ups for redis..."

# Check and stop running postgres container

docker run -p 6379:6379 -v redis_volume:/data --rm --name redis -d redis:latest || { echo "❗️Redis Container failed to start"; exit 1; }

echo "Redis Container started! Testing the connection..."

MAX_RETRIES=10
WAIT_SECONDS=2
ATTEMPTS=0

while true; do
    response=$(docker exec -it redis redis-cli ping)
    case $response in
        *PONG*)
            echo "✨ Connection Successful. Redis is up and running! ✨"
            break
            ;;
        *)
            ATTEMPTS=$((ATTEMPTS + 1))
            echo "⚠️ Redis did not respond with PONG. Attempt $ATTEMPTS of $MAX_RETRIES. Retrying in $WAIT_SECONDS seconds..."

            if [ $ATTEMPTS -eq $MAX_RETRIES ]; then
                echo "❗️Failed to connect to Redis after $MAX_RETRIES attempts. Exiting."
                exit 1
            fi

            sleep $WAIT_SECONDS
            ;;
    esac
done


echo "🌟Setup finished! Enjoy your dev! :)🌟"