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

## おすすめ本
<u>Team Geek</u>
エンジニアが会社という組織の中で立ち回っていくために
必要な知識が詰まっています。
タイトルにもある通り、プログラミング大好きな
ギークの方におすすめです。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/873/116/303/20010009784873116303_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank">Ｔｅａｍ　Ｇｅｅｋ Ｇｏｏｇｌｅのギ-クたちはいかにしてチ-ムを作るの  /オライリ-・ジャパン/ブライアン・Ｗ．フィッツパトリック</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873116309%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
