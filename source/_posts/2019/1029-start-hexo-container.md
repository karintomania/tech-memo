---
title: Dockerコンテナ上でHexoを導入してGithubPagesにデプロイする〜①コンテナ作成編〜
date: 2019-10-29 19:44:23
tags: [Docker, Hexo, Github Pages]
categories: 技術
---


## 概要
Dockerコンテナ上にHexoをインストールして  
静的WebサイトをGithubPageにローンチするまでの流れをまとめました。  

Dockerコンテナ上で諸々を行うので、Dockerさえインストールされていれば、ローカルへのnodeおよびHexoのインストールが必要ありません。  
Hexoに興味があってちょっと試してみたい人などにおすすめです。  

## 準備物
+ Git Pages用のリポジトリ
+ Docker

<!-- more -->

## コンテナの準備
コンテナを作ります。  
DockerfileとDocker-compose用のymlファイルを作成します。  
nodeイメージをベースにDockerfile内のRUNコマンドでHexo運用に必要なツールをインストールしています。

{% codeblock Dockerfile lang:Dockerfile%}
# node:10.13-alpineイメージを使用
FROM node:10.13-alpine

# よくわかってないです笑。要調査
WORKDIR /app

# git, hexo, hexoのgithub pagesデプロイ用ツールをインストールするコマンド
RUN apk add git
RUN npm install -g hexo-cli
RUN npm install -g hexo-deployer-git

# 4000ポートを開く
# Hexoではサイトプレビュー用にローカルサーバを立てられるのですが、
# そこでlocalhost:4000を使用するので開けておきます。
EXPOSE 4000
{% endcodeblock %}


{% codeblock docker-compose.yml lang:yaml %}
version: '3'
services:
  app:
    build: .
    image: hexo_app
    container_name: hexo_app
    volumes: 
      - ./app:/app
    ports:
      - 4000:4000
    tty: true
{% endcodeblock %}

こいつらを適当なフォルダに配置して以下のコマンドを実行しましょう。  
{% codeblock %}
# docker-compose up -d
# docker exec -it hexo_app /bin/sh
{% endcodeblock %}

上手くいっていたらbash画面が開くはずです。
nodeのバージョン確認をしてみませう。  
{% codeblock %}
/app node -v
v10.13.0
{% endcodeblock %}

できたっぽいっすね。  

次回はHexoの導入とサイトの生成をローカルでやってみます。  
