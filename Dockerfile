FROM node:20 AS base

RUN apt-get -y update \
&& apt-get install -y git \
&& npm install -g hexo-cli

# Create a user with UID 1001 and GID 1001
RUN groupadd -g 1001 appuser && \
    useradd -u 1001 -g 1001 -m -s /bin/bash appuser

FROM base

WORKDIR /app
USER appuser
CMD npm run server
