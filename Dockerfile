FROM alpine:3.2

ADD ./dist /var/www/hmda-pilot
COPY ./docker-files /tmp/scripts

# Use a custom build script instead of messy chained together RUN
# or multiple RUN statements that add bloat to the image
RUN /tmp/scripts/run.sh

EXPOSE 80 443
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx"]