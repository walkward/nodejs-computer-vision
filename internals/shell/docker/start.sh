#!/bin/sh

npm run docker:stop

# Run the docker image
docker run -p 3000:3000 --restart always -d "${npm_package_config_user}/${npm_package_name}:latest"
