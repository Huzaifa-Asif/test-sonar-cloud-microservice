FROM python:alpine
RUN apk add --update npm
RUN npm install -g npm@7.5.2
RUN apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip install aws-sam-cli && \
    apk del build-deps
WORKDIR /var/app
COPY . .
RUN ./npm-install.sh

RUN ["chmod", "+x", "./sam-entrypoint.sh"]
ENTRYPOINT ["bash", "./sam-entrypoint.sh"]