---
title: 【Android Studio】Logcatにログがでない時の対処方法
tags:
  - android
  - android studio
  - Logcat
categories: 技術
featured_image: thumb.png
date: 2021-01-10 20:27:11
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
Android Studioで開発しているとLogcatに何も出力されず
絶望することがあるかと思います。

{% asset_img 00-no-log.png %}
絶望ですね！笑

今回はLogcatにログがでない時の対処方法をご紹介します。
<!-- more -->

## Logcatのリセット
まずはLogcatをリセットします。

ゴミ箱マークを押して今までのログを消して、
再起動ボタンでLogcatを再起動します。

{% asset_img 01-restart.png %}

これで直るときは直ります。

## Android Studioの再起動
Logcatをリセットしてもダメな場合は
Android Studio自体を再起動します。


## Unexpected EOFエラーのときはバッファサイズを変更する
それでもログが出ないときはUnexpected EOFというエラーが出ているかもしれません。

Logcatはデフォルトで、対象アプリのログのみを出すようになっているので、
端末全てのログを出すように設定をします。
{% asset_img 02-no-filter.png %}

こんなエラーが出ていないでしょうか？

{% asset_img 03-unexpected-eof.png %}


エラーメッセージを抜き出すとこんな感じです。
```
Logcat: Unexpected EOF!
    
    This means that either the device shut down, logd crashed, or this instance of Logcat was unable to read log
    messages as quickly as they were being produced.
    
    If you have enabled significant logging, look into using the -G option to increase log buffer sizes.
```

これに対応するには端末の設定を変更します。
開発端末から
`設定 > システム > 開発者向けオプション > ログバッファサイズ`とたどって
最大の16MBにしてみて下さい。
{% asset_img 04-buffer-size.jpg %}

これでLogcatを再起動するとログが表示されると思います。


## まとめ
Android Studioでの開発を始めた時に
この問題に悩まされて泣きそうになっていました笑

この記事がそんな開発者を救えるようになると幸いです。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)

## おすすめ技術書
Android開発を学ぶならこんな本もあります。
たまには書籍で網羅的に知識をつけるのも大事ですよね！
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/160/443/20010009784798160443_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">基礎＆応用力をしっかり育成！Ａｎｄｒｏｉｄアプリ開発の教科書Ｋｏｔｌｉｎ対応 なんちゃって開発者にならないための実践ハンズオン  /翔泳社/齊藤新三</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F479816044X%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>

{% endraw %}
