---
title: DockerでLaravel(PHP8)&Apache&MySQLを動かす
tags:
  - Laravel
  - PHP
  - Docker
  - Apache
  - MySQL
categories: 技術
featured_image: thumb.png
date: 2022-12-04 22:09:11
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

今回はDocker内にApache、MySQLを使ってLaravelアプリを動かせるような設定を紹介します。
<!-- more -->

## 前提条件
- Docker: v20.10.17
- MacOS: Monteray

GitHubにソースをのっけてあります。

[Docker-LAMP-Laravel](https://github.com/karintomania/Docker-LAMP-Laravel)

## プロジェクト構成
プロジェクトの構成は以下のようになります。

```
プロジェクトルート
  - config
    - xdebug-local.ini
  - Dockerfile
  - docker-compose.yml

```

## Dockerfile
PHPのDockerfileは以下のようになります。

{% codeblock Dockerfile lang:dockerfile %}
FROM php:8.1-apache

# apache rewriteを有効化
RUN a2enmod rewrite
# 必要ライブラリとツール(git,nodejs)のインストール
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get -y update \
&& apt-get install -y libicu-dev gnupg2 unzip git nodejs

# PHPエクステンションのインストール
RUN docker-php-ext-install intl \
&& docker-php-ext-install pdo_mysql \
&& pecl install xdebug
# composerのインストール
COPY --from=composer /usr/bin/composer /usr/bin/composer

# DocumentRootを/var/www/html/publicに設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

{% endcodeblock %}

割とコメントに大事なことは書いてあるので、これに関しては特に難しいことはないかと思います。

## 設定ファイル
PHPとApacheの設定ファイルはconfigフォルダ内に入れています。
それぞれ中身は以下のようになっています。

### xdebug-local.ini

{% codeblock xdebug-local.ini lang:ini %}
zend_extension=xdebug
xdebug.mode=develop,debug
xdebug.start_with_request=yes
xdebug.client_host=host.docker.internal

{% endcodeblock %}

これはなくても大丈夫ですが、xdebugを使いたい人はどうぞ。
4行目の`host.docker.internal`でコンテナ内からあなたのマシンの`localhost`を参照できます。
これにより、VSCodeなどでxdebugクライアントを立ち上げたときに、コンテナ内からクライアントに接続できます。

## docker-compose.yml
docker-compose.ymlは以下です。

{% codeblock docker-compose.yml lang:yaml %}
version: "3.7"

services:
  laravel-php:
    build: 
      context: . 
    environment:
			# LaravelのDB接続情報
      - DB_CONNECTION=mysql
      - DB_HOST=laravel-php-db
      - DB_PORT=3306
      - DB_DATABASE=app
      - DB_USERNAME=root
      - DB_PASSWORD=root
    container_name: laravel-php
    # 設定ファイルとソースをマウント
    volumes:
      - "./html/:/var/www/html/"
      - "./config/xdebug-local.ini:/usr/local/etc/php/conf.d/xdebug-local.ini"
    # ローカルの8080をコンテナの80に設定
    ports:
      - "8080:80"
    # host.docker.internalでローカルホストを参照する
    extra_hosts:
      - "host.docker.internal:host-gateway"

  laravel-db:
    image: mysql:8.0
    container_name: laravel-php-db
    environment:
      MYSQL_DATABASE: 'app'
      MYSQL_ROOT_PASSWORD: 'root'
    # パスワードでのログインを許可
    command: --default-authentication-plugin=mysql_native_password
    ports:
      - '3306:3306'
    volumes:
      # laravel-dbという名前のボリュームを使用する
      - laravel-db:/var/lib/mysql

volumes:
  laravel-db:

{% endcodeblock %}

基本的に大事なことはコメントに書いてあるのと、そんなに難しいことをしていないです。
ただ、MySQLのボリュームについて少し解説します。

```
    volumes:
      # laravel-dbという名前のボリュームを使用する
      - laravel-db:/var/lib/mysql

```

この箇所で、コンテナ内の`/var/lib/mysql`を`laravel-db`という名前付きボリュームに保存しています。

この設定がなくても大丈夫なのですが、その場合、コンテナに紐付いた匿名ボリュームにデータが保存されることになります。
その場合、コンテナを消したときにボリュームも一緒に消えてしまいます。
名前付きボリュームであれば、なにかの理由でコンテナを消したい、消してしまったときにもボリュームは保存されるので安心です。

## Laravelプロジェクトを作成

以下のコマンドでコンテナをビルド&起動します。

```
docker compose up -d

```

次にLaravelのプロジェクトをcomposerを使ってダウンロードします。
しばらくかかります。

```
docker exec -it laravel-php composer create-project laravel/laravel .

```

私の環境では上記コマンドを実行した後にコンテナの再起動が必要でした。

```
docker compose down && docker compose up -d

```

## サイトにアクセスする

以上でDockerコンテナ内にLaravelサイトが立ち上がったはずです。
以下のURLにアクセスして動作確認をしましょう。
[http://localhost:8080](http://localhost:8080/)

Laravelのデフォルトページが表示されたでしょうか。

{% asset_img 0_laravel.png %}

## DB接続の確認
DBに接続できているかLaravel tinkerを使って確認します。
以下のコマンドを実行してtinkerを起動します。

```
docker compose exec -it laravel-php php artisan tinker

```

tinkerはPHPとLaravelのコードを実行できる、いわゆるREPL環境です。
以下のコードでmysql接続が確認できます。

```
DB::connection('mysql')->getPdo();

// アウトプットは以下のような感じになります
= PDO {#3671
    inTransaction: false,
    attributes: {
      CASE: NATURAL,
      ERRMODE: EXCEPTION,
      AUTOCOMMIT: 1,
      PERSISTENT: false,
      DRIVER_NAME: "mysql",
      SERVER_INFO: "Uptime: 79  Threads: 2  Questions: 9  Slow queries: 0  Opens: 120  Flush tables: 3  Open tables: 39  Queries per second av
g: 0.113",
      ORACLE_NULLS: NATURAL,
      CLIENT_VERSION: "mysqlnd 8.1.12",
      SERVER_VERSION: "8.0.31",
      STATEMENT_CLASS: [
        "PDOStatement",
      ],
      EMULATE_PREPARES: 0,
      CONNECTION_STATUS: "laravel-php-db via TCP/IP",
      DEFAULT_FETCH_MODE: BOTH,
    },
  }

```

## まとめ
LaravelをPHP8、MySQL、Apache環境で動かすためのDocker設定を紹介しました。
ローカルにPHPをインストールすることなくLaravelでの開発ができるので嬉しいですね！

お役に立てたなら幸いです。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[年収をあげるためにはPHPをやめたほうがいいのか？](/2021/10/2021-1002-php-income/)

## PR
あなたの会社はあなたの技術を評価してくれていますか？
技術力を高めようと頑張っているのに、
技術が評価されないような会社にいたらそれは良い環境なのでしょうか？
エンジニアとして技術を高めたいのなら環境を選ぶことも大事です。

**レバテックキャリア**
エンジニアとして働いていて実務経験があるなら、
求人数の充実具合からレバテックキャリアがおすすめです。
<u>IT転職ではデファクト・スタンダード</u>ですね。
[▼レバテック　キャリア 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZRIB5 )
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" rel="nofollow">
<img border="0" width="728" height="90" alt="" src="https://www22.a8.net/svt/bgt?aid=210117795527&wid=001&eno=01&mid=s00000011866006030000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" alt="">

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">

