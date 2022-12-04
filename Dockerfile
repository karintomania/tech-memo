FROM node:12

ARG USER_ID
ARG GROUP_ID

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli
WORKDIR /app
CMD npm run server

USER node

