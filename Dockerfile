FROM node:18

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli
WORKDIR /app
CMD npm run server

