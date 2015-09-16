#!/bin/sh

##### add dependencies
apk --update add nginx sed
chown -R nginx:nginx /var/www

##### Move some things into place
cp -f /tmp/scripts/nginx.conf /etc/nginx
cp -f /tmp/scripts/hmda-pilot.conf.tmpl /etc/nginx
cp -f /tmp/scripts/entrypoint.sh /
cp -f /tmp/scripts/update-nginx-config.sh /etc/nginx

##### Clean up
rm -rf /var/cache/apk/* /tmp/scripts