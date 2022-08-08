---
title: Macの無料SQLクライアントDBeaverを紹介する
tags:
  - DB
  - OSS
categories: 技術
date: 2020-05-08 16:31:06
featured_image: Logo.png
---


こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
Macユーザのみなさま、こんにちは。
突然ですが、DBのGUIクライアントは何を使っていますか？

私は、仕事でWindows機を使っていたため、
職場ではA5:SQL Mk-2を使うことが推奨されていました。
<!-- more -->
その後、個人開発を始めた時にMacBookでA5を使おうとしてサイトを訪れたところ、
Mac非対応、と言う事実を突きつけられます。  

そこでMacで使えるSQLクライアントを調べ始め、DBeaverに出会いました。
[DBeaver公式サイト](https://dbeaver.io/download/)
今日はそのDBeaverを選んだポイントを紹介します。

## 無料
DBeaverは**<u>無料でオープンソース</u>**です。
ぶっちゃけこれが一番でかいです。
他にも良さそうなソフトもあったのですが、有料だったりしたので。

## クロスプラットフォーム
DBeaverは**<u>クロスプラットフォーム</u>**で、Windows、Mac、Linuxに対応しています。
私も個人開発用のMacBookと職場のWindows機に入れて使っていますが、
シームレスに使えています。
端末ごとで違うツールを使わなきゃいけないのはストレスですからね。
   
## 様々なDBに対応
私が使ったDBは以下の通りですが、もちろん他にも色々使えます。
- SQLServer
- MySQL
- Postgre SQL
- H2
H2に対応しているのが意外だったのですが、
Javaで作られているから当然と言えば当然かもしれません。

ただし、**<u>MongoDBなどのNoSQLはEnterpriseエディション(有償版)のみの対応</u>**みたいです。

## 操作性
基本的な操作であれば直感的に使えます。
私はDBに接続してSQL実行するくらいの基本的な操作だけしかしてませんが、
特にマニュアルなどを見ずにさくっと使えました。

## ダークモードに対応
私は絶対ダークモード派なので、
対応しているツールは無条件にポイントが高くなります。
クールな見た目ですね。
{% asset_img darkmode.png %}

## 最後に
いかがでしたか。
この記事を作るためにDBeaverの公式サイトを訪れたところ、
公式キャラクターがマスクをしていました。(本記事執筆時はコロナウイルスの真っ最中です。)

{% asset_img mask.png %}
また、有償版と無償版でサイトが分かれているのですが、
無償版サイトの完成度があからさまに有償版と違っていて面白かったです。
{% asset_img ee.png %}


皆さんもDBeaverで快適な開発ライフをお過ごしください。

それでは今日はこの辺で。

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
