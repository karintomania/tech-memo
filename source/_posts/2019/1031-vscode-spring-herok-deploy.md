---
title: VS CodeからSpring Bootプロジェクトを作成してHerokuにデプロイするまで
tags:
  - Java
  - Heroku
  - Spring Boot
date: 2019-10-31 00:56:06
---


## 概要
タイトルの通り、VS CodeからSpring Bootプロジェクトを作成してHerokuにデプロイするまでを備忘録として残しました。

## 前提
+ 以下がインストール済みであること
	+ VS Code
	+ JDK
+ Herokuのアカウントを作成済みであること

## Spring関連のExtention導入
VS Codeに以下のExtentionをインストールします。
+ Language Support for Java(TM) by Red Hat
+ Spring Boot Extension Pack
+ Maven for Java
<!-- more -->
## Spring Bootプロジェクト作成
VS CodeからSpring Initializrを使用できます。
F1キーでコマンドパレットを開き、
Spring Initializr: Generate a Gradle Project
を実行します。
![](initializr.png)

言語を指定します。ここでは当然Javaですね。
![](language.png)

パッケージ名を指定します
![](package.png)

プロジェクト名を指定します
今回は「heroku_spring」としてみます。
![](project.png)

バージョンを選びます。2.2.0で良いのではないでしょうか。
![](version.png)

必要なパッケージを選びます。とりあえず以下があれば大丈夫かと思います。
* Spring Web Services
* Spring Boot DevTools
* Thymeleaf
* お好みでLombok

以下のようなDB関連のパッケージもあとで追加しますが、今は大丈夫です。
+ MySQL Driver もしくは H2
+ Spring Data JPA
![](dependency.png)

フォルダの作成場所を指定したら、プロジェクトフォルダができているはずです。

## Controller追加
/src/main/java/com/example/heroku_spring
のなかにcontrollerフォルダを追加して、  
以下のHelloController.javaを作成します。

{% codeblock HelloController.java lang:java %}
package com.example.heroku_spring.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

    @RequestMapping("/")
    public String index() {
        return "Hello World!!";
    }

}
{% endcodeblock %}

デバッグしてhttp://localhost:8080/ で確認してみましょう。
![](hello.png)
## Herokuへのデプロイ
Heroku CLIをbrewでインストールします。
```
$ brew tap heroku/brew && brew install heroku
```

CLIを利用するために初回のみHerokuアカウントの認証が必要です。  
以下コマンドを実行すると認証用URLが表示されるので、そこから認証を完了してください。
```
$ heroku login

   // 適当なキーを押下
heroku: Press any key to open up the browser to login or q to exit:

  //このURLにアクセスして認証完了
Opening browser to https://cli-auth.heroku.com/auth/browser/bbbbbb
Logging in... done
```

herokuアプリをcreateコマンドで作成します。
アプリのURLとGitのリモートリポジトリのURLが発行されるので、控えておきます。
```
$ heroku create
Creating app... done, ⬢ floating-garden-83355
https://example-example-83355.herokuapp.com/ | https://git.heroku.com/example-example-83355.git
```


プロジェクトフォルダでgit initします。
```
$ git init
Initialized empty Git repository in heroku_spring/.git/
```

先ほど取得したリモートリポジトリにpushします。
```
$ git remote add heroku https://git.heroku.com/example-example-83355.git
$ git push heroku master
```

アプリ作成時に取得したURLにアクセスして
Hello Worldが表示されたら成功です。


![](hello.png)


