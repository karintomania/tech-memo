---
title: Docker内のphp.iniを編集する方法
tags:
  - PHP
  - Docker
categories: 技術
featured_image: thumb.png
date: 2022-04-16 22:33:55
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
DockerでPHPを使っていて、php.iniを編集したいときがあるかと思います。
今回はDocker上でのphp.iniの編集方法を紹介しようと思います。
<!-- more -->

## php.iniのDocker内のファイルパス
Dockerに限らず、php.iniのファイルパスを知りたいときは
以下のコマンドが役に立ちます。
```
php -i|grep php.ini
```

`php -i`は`phpinfo()`をコマンドライン上で実行するコマンドで、
その結果をphp.iniでgrepしています。

上記コマンドをDockerコンテナ内で使用すると
以下の結果が得られるかと思います。
```
Configuration File (php.ini) Path => /usr/local/etc/php
```

つまり、/usr/local/etc/phpフォルダ内のphp.iniファイルを読み込んでくれるようです。
デフォルトではこのフォルダ内にはphp.iniファイルは存在せず、
以下の二つの雛形ファイルがあります。
- php.ini-development
- php.ini-production

オリジナルのphp.iniを編集したいときは、
上記雛形ファイルをコピーしphp.iniを作成して、編集することになります。

## php.iniを作成・編集
以下のコマンドでphp.ini-development（もしくはproduction）を
php.iniにコピー&リネームして、php.iniファイルが作れます。
```
cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini
```

あとはこのphp.iniを自由に編集して下さい。

## まとめ
今回はDockerコンテナ内のphp.iniの編集の仕方を紹介しました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[年収をあげるためにはPHPをやめたほうがいいのか？](/2021/10/2021-1002-php-income/)