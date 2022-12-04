FROM node:18

ARG USER_ID
ARG GROUP_ID

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli
WORKDIR /app
CMD npm run server

