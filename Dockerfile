FROM node:20 as base

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli

FROM base

WORKDIR /app
CMD npm run server

