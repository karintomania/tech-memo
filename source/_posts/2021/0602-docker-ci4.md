---
title: Dockerを使ってApache+Code Igniter+XDebugな開発環境を作る
tags:
  - PHP
  - code igniter
  - Docker
categories: 技術
featured_image: thumb.png
date: 2021-06-02 23:30:42
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

最近仕事での開発環境にDockerを使い始めました。
そこで勉強したことを元に、
Code Igniter 4の開発環境構築を紹介します。
<!-- more -->

こちらのリポジトリをダウンロードして
コンテナを起動すると、http://localhost:80でCode IgniterのWelcomeページが表示されるはずです。
https://github.com/karintomania/docker-ci4

今日はこちらを解説します。

## フォルダ構成
フォルダ構成はこちらのリポジトリを参考にさせていただきました。
https://github.com/sprintcube/docker-compose-lamp

こんな感じになっています。
```
root
├── config // 設定ファイル置き場
│   ├── apache2
│   └── php
├── html
│   └── ソースコード
├── logs
│   └── apache2
├── docker-compose.yml
└── php.Dockerfile
```

詳細はGitHubを見てもらうとして、
この中でも主要なファイルを紹介していきます。

## php.Dockerfile
{% codeblock php.Dockerfile lang:Dockerfile %}
FROM php:7.4.3-apache
RUN a2enmod rewrite \
&& a2ensite 000-default
RUN apt-get -y update \
&& apt-get install -y libicu-dev \
&& docker-php-ext-install intl \
&& docker-php-ext-install pdo \
&& pecl install xdebug

CMD apachectl -D FOREGROUND
{% endcodeblock %}


色々と書いてありますが、
最初のRUNではアパッチの設定をしています。
Code Igniterではrewriteが必要なので、その設定と後述するvirtual hostを有効にする
ディレクションを書いています。
その次はphpのエクステンションのインストールです。

これ以外に使いたいエクステンションがあれば追加してください。

最後のCMDでアパッチの起動コマンドを叩いてます。
これを書くことでコンテナ起動時にアパッチが起動します。

## docker-compose.yml
{% codeblock docker-compose.yml lang:yaml %}
version: "3.7"
services:
  web-server:
    build:
      dockerfile: php.Dockerfile
      context: .
    restart: always
    volumes:
      - "./html/:/var/www/html/"
      - "./config/php/xdebug-local.ini:/usr/local/etc/php/conf.d/xdebug-local.ini"
      - "./logs/apache2:/var/log/apache2/"
      - "./config/apache2/000-default.conf:/etc/apache2/sites-available/000-default.conf"
    ports:
      - "80:80"
    extra_hosts:
      - "host.docker.internal:host-gateway"
      - "php.local:127.0.0.1"
{% endcodeblock %}

コチフラで大切なのはvolumeでしょうか。

プロジェクトフォルダのhtmlをコンテナ内の/var/www/html/にマウントすることで、
ローカルのソースをコンテナ内から参照できるようにします。

あとはログや設定ファイルをバインドしています。

extra_hostsに書いてあるこちらはxdebug用の設定です。
```
      - "host.docker.internal:host-gateway"
```

また、こちらはvirtual host用に設定してあります。
これを書くことで、ローカルのブラウザでhttp://php.local/ へのアクセスが
コンテナの127.0.0.1に繋がるらしいです。
```
      - "php.local:127.0.0.1"
```

ちなみに、そのためにはローカルマシンのホスト設定(Macならetc/hosts/)も
変更する必要があるので、お忘れなく。

## config/apache2/000-default.conf
これはvirtual host用の設定です。

Code Igniter はver4からセキュリティの理由で、
index.phpがpublic以下に配置されるようになりました。

なので、publicがドキュメントルートになるような設定が必要になります。
{% codeblock 000-default.conf lang:xml %}
<VirtualHost *:80>
	ServerName php.local
    DocumentRoot /var/www/html/public/
</VirtualHost>
{% endcodeblock %}

## config/php/xdebug-local.ini
特に解説はないですが、xdebugの設定ですね。
こう書くとあっけないですが、
きちんと動くようになるまで大変な道のりでした笑

```
zend_extension=xdebug
xdebug.mode=develop,debug
xdebug.start_with_request=yes
xdebug.client_host=host.docker.internal
```

VS Codeでデバッグするポイントとしては、ローカルではなく、
コンテナ用のPHP Debugの拡張機能をインストールすることです。

Dockerの拡張機能を入れることで、コンテナ内のフォルダをVS Codeで開くことができるようになります。
{% asset_img 01-attach.png %}

その後にコンテナ用の拡張機能をインストールすることができるようになります。
アイコンにリモートマーク（？）がついているのが目印です。
{% asset_img 02-icon.png %}

## まとめ
細かいところは省きましたが、
興味があればGitHubを確認してみてください。

Dockerを使うとクリーンな環境で開発ができるので、
楽しいですね。

それでは今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[Code Igniter4 & SQLiteでサイトを作って遊ぶ](/2021/04/2021-0403-ci-sqlite/)