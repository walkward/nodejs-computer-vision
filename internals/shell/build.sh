#!/bin/sh

# Start with clean slate!
npm run cleanup:prebuild
npm run cleanup:reports

# Install packages
npm install

# Compile typescript
npm run build:tsc

# Build docker image
npm run docker:build
