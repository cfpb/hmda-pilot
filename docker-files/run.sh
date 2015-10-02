#!/bin/sh

##### add dependencies
apk --update add nginx sed make gcc g++ python git

##### Move some things into place
cp -f docker-files/nginx.conf /etc/nginx
cp -f docker-files/hmda-pilot.conf.tmpl /etc/nginx
cp -f docker-files/entrypoint.sh /
cp -f docker-files/update-nginx-config.sh /etc/nginx

##### Set permissions
mkdir -p /var/www/
chown -R nginx:nginx /var/www
adduser -S notroot
chown -R notroot /usr/local/app

##### Install global modules
npm install -g grunt-cli

##### Clean up
rm -rf /var/cache/apk/*
