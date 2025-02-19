FROM node:20 as base

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli

FROM base
ARG SSH_PRIVATE_KEY
ARG SSH_PUBLIC_KEY

COPY known_hosts /home/node/.ssh/known_hosts

RUN mkdir -p /home/node/.ssh && \
    echo "$SSH_PRIVATE_KEY" > /home/node/.ssh/id_rsa && \
    echo "$SSH_PUBLIC_KEY" > /home/node/.ssh/id_rsa.pub && \
    chmod 600 /home/node/.ssh/id_rsa* && \
    chown node:node /home/node/.ssh /home/node/.ssh/id_rsa* /home/node/.ssh/known_hosts

WORKDIR /app
CMD npm run server

