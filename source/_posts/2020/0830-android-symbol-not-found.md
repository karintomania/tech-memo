---
title: 「シンボルを見つけられません」エラーが出た時の対処方法【Kotlin】
tags:
  - Android
  - Kotlin
categories: 技術
featured_image: thumb.png
date: 2020-08-30 09:07:19
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

今回はKotlinでAndroidアプリの開発時に
「エラー: シンボルを見つけられません」というエラーが出た際の対処方法を紹介します。

<!-- more -->
 
## 「エラー: シンボルを見つけられません」の意味
私の環境では、
Data Bindingを使用しているときにこのエラーが発生しました。

{% asset_img 01-error.png %}
Data Bindingを設定すると、ビルドの際に自動的にDataBinding用のクラスが生成されます。
この自動生成されるクラスが「〇〇BindingImple」という名前のクラスなのですが、
そのクラスが自動生成できなかった時に、
「エラー: シンボルを見つけられません」
のエラーが発生するようです。



## 対応方法
実はビルドアウトプットをよく見ると、
<u> シンボルを…のエラー以外にもう一つエラーが出ています。 </u>
{% asset_img 02-another-error.png %}

こちらが本当の原因でした。
`Could not find accessor com.example.tweetanalytics.ui.main.MainViewModel.tweet and java.lang.CharSequence has 4 abstract methods, so is not resolved as a listener`

{% asset_img 03-another.png %}


layoutのXMLでViewModel内の変数を参照しているのですが、
ViewModelからその変数を削除してしまったために、エラーが発生していたようです。
画像内の`mainViewModel.tweet`という変数ですね。
{% asset_img 04-remove.png %}

なので、この記述を消してあげることでビルドが通るようになりました。
ちなみにエラーが解消されると、
プロジェクト内の`java(generated)`フォルダ内に
「〇〇BindingImple」クラスが作成されます。
{% asset_img 05-success.png %}

## まとめ
「エラー: シンボルを見つけられません」という
エラーが発生した時は、
- 自動生成されるクラスが生成されていない
- 対象のlayoutのエラーが別に出ている可能性がある

ということを覚えておくといいかもしれません。

それでは今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)


## PR
Android開発を学ぶならこんな本もあります。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/160/443/20010009784798160443_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">基礎＆応用力をしっかり育成！Ａｎｄｒｏｉｄアプリ開発の教科書Ｋｏｔｌｉｎ対応 なんちゃって開発者にならないための実践ハンズオン  /翔泳社/齊藤新三</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F479816044X%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>

{% endraw %}