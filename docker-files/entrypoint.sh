#!/bin/sh

if [ "$1" = 'nginx' ]; then
    /etc/nginx/update-nginx-config.sh
fi
exec $@