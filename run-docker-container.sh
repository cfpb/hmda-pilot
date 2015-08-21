#!/bin/sh
# Remove any current container for the UI
docker rm -f hmda-pilot
# Run the UI container, linking in the api container
docker run -d --link hmda-pilot-api --name hmda-pilot -p 80:80 hmda-pilot