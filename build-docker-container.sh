#!/bin/sh
# Create the dist package for docker
grunt build:docker
# Remove any previous instance of the api image
docker rmi -f hmda-pilot
# Build the api image as defined in the Dockerfile in the current dir
docker build -t hmda-pilot .