---
title: 「シンボルを見つけられません」エラーが出た時の対処方法【Kotlin】
tags:
  - android
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
