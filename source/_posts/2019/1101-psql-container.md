---
title: PostgreSQLをコンテナ化する
tags:
  - Docker
  - PostgreSQL
  - Spring Boot
date: 2019-11-01 11:25:28
---

 PostgreSQLをDockerコンテナにします。
 今までMySQLしか使ったことなかったのですが、  
 Herokuにアプリケーションをデプロイする際にポスグレを使う必要があったので、  
 試してみることにしました。
<!-- more -->
 色々試行錯誤した気がしますが、結論はこれです。
とりあえず、これでSpringアプリケーションから接続できました。

ポイントは環境変数を宣言しているところくらいですかね。  
最初、Dockerfileにこの宣言を書いていたのですが、  
これはdocker runコマンドに必要な宣言らしく、  
docker-compose.ymlに書く必要があるみたいです。  

 {% codeblock docker-compose.yml lang:yaml %}
version: "3"
services:
  psql_docker:
    image: postgres:12.0-alpine
    container_name: psql_docker
    ports:
      - "5432:5432"
    environment:
       POSTGRES_USER: "dev"
       POSTGRES_PASSWORD: "dev"
       POSTGRES_DB: "mydb"
 {% endcodeblock %}


コンテナを起動するときは
```
# docker-compose up -d
```

以下コマンドで、PSQLを起動できます。
```
# docker exec -it psql_docker psql -U dev -d mydb
```

 以上。

