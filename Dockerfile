FROM mhart/alpine-node:0.10

WORKDIR /usr/local/app

COPY . .

RUN docker-files/run.sh

USER notroot

RUN docker-files/run-node.sh

USER root

RUN cp -r dist/ /var/www/hmda-pilot/

EXPOSE 80 443

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx"]
