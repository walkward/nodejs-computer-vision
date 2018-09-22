#!/bin/sh

DOCKER_IMAGE="${npm_package_config_user}/${npm_package_name}:latest"
DOCKER_CONTAINER=$(docker ps -a -q --filter ancestor=$DOCKER_IMAGE --format="{{.ID}}")

# Stop and remove containers if they exist
if [ "$DOCKER_CONTAINER" != '' ]
  then
  if [ $(docker inspect -f {{.State.Running}} "$DOCKER_CONTAINER") == true ]
    then
    docker rm $(docker stop "$DOCKER_CONTAINER")
    else
    docker rm "$DOCKER_CONTAINER"
  fi
fi
