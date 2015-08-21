#!/bin/sh

# Try to use the manually set variables
# Sets a default via the := syntax if blank or not set
API_HOST=${HMDA_PILOT_API_HOST:=hmda-pilot-api}
API_PORT=${HMDA_PILOT_API_PORT:=8000}

# If the docker --link variables are set, use those
if [ ${HMDA_PILOT_API_PORT_8000_TCP_ADDR:-} ]; then
  API_HOST=$HMDA_PILOT_API_PORT_8000_TCP_ADDR
fi
if [ ${HMDA_PILOT_API_PORT_8000_TCP_PORT:-} ]; then
  API_PORT=$HMDA_PILOT_API_PORT_8000_TCP_PORT
fi

cat /etc/nginx/hmda-pilot.conf.tmpl \
    | sed -e "s/__HOST__/$API_HOST/" \
    | sed -e "s/__PORT__/$API_PORT/" \
    > /etc/nginx/conf.d/hmda-pilot.conf