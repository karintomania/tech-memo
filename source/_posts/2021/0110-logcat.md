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
