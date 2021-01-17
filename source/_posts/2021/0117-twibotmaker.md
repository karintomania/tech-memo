---
title: 【誰でも無料で！】スマホアプリを使ったTwitter Botの作り方
categories: 技術
featured_image: thumb.png
date: 2021-01-17 18:54:24
tags:
---


## はじめに
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
<!-- more -->
この記事にたどり着いたということは
<u>Twitter Botを作りたい</u>と思っている方だと思います。

Twitter Botの作り方を解説しているサイトはたくさんありますが、
こんな風に思ったりしませんでしたか？
- <u>プログラミングが必要だったりして自分には難しそう</u>
- <u>いろいろな設定が必要でめんどくさそう</u>

そんな人のために<u>スマホだけで誰でも簡単にTwitter Botが作れる</u>
TwiBotMakerというアプリを開発しました。

しかも<u>無料</u>です。

開発者の私が使い方を徹底的に紹介しますので、
ぜひ最後までお付き合いください。

あと、今<u>android版しかない</u>ので、iPhoneの人はごめんなさい。。。
どうしてもiPhone版欲しいって人はTwitterとかにDMくれると、
そういう人がたくさんいそうであれば考えようと思います。

## Twitter Botとは
そもそもTwitter Botとは、
人間が操作するのではなく、自動でツイートしたり、リプライをしたりするアカウントのことです。

複雑なものになると、AIを利用して他のアカウントと会話する、
なんてこともできるようです。

この記事で紹介するのは、
<u>つぶやかせたい内容を登録しておくと定期的にその内容をランダムにつぶやく</u>
という、とってもシンプルなBotです。

## TwiBotMakerの紹介
この記事ではTwiBotMakerを使っての
Bot作成を紹介します。

[▶︎TwiBotMakerをDL](https://play.google.com/store/apps/details?id=com.bedroomcomputing.twibotmaker )
{% asset_img 00-feature.png %}

このアプリの特徴を紹介します。

### スマホだけでBotができる
簡単にBotを作れるサービスは他にもありますが、
TwiBotMakerを使うと<u>PCがなくてもスマホだけでBotが作れます</u>。

### 完全無料
TwiBotMakerは<u>完全に無料アプリ</u>なので、
お金をかけずにBotができます。

### 簡単にできる
TwiBotMakerでは複雑な処理をするBotを作ることはできませんが、
その代わりにとても簡単にBotを作ることができます。

必要なのは
- Twitterアカウントでログインして
- つぶやきを登録することと、
- つぶやく間隔を設定すること
だけです！

<u>超簡単ですね。</u>

それでは次から具体的な手順を紹介します。

## Step 1.どんなBotにするか決める
まずはどんなBotにしたいかを決めないと始まらないですね。

TwiBotMakerで作れるBotは定期的にランダムでつぶやくというシンプルなものです。

そんなシンプルな Botでも工夫次第でいろいろなことができます。
Twitterで人気があるようなBotの例を挙げてみます。

###  偉人・有名人・人気キャラクターの名言ボット
アニメのキャラクターなどがアイコンになっていて、
そのキャラクターのセリフをつぶやいているアカウントをみたことがありますか？

<u>実在しないキャラクターや故人などがあたかもTwitterをしているように見えて面白い</u>ですよね。

注意点として、著作権には気をつけて運用する必要があります。

### 有益情報Bot
このタイプのBotは英単語やビジネス名言など、
<u>見ているだけで勉強になるようなアカウント</u>を作ることができます。

こちらも人気なBotになる可能性があります。

### 広告・宣伝としてのBot
こちらは自分が宣伝したいものがあるときに便利です。
例えば<u>ブログをやっているのであれば過去記事を登録しておいて</u>
<u>定期的につぶやく</u>ようにするのも良いでしょう。

ただ、広告の性質上、やりすぎると
うざがられてフォロワーが減る危険性もあるので、バランスが大事です。

どんなBotを作るか決められたでしょうか？

## Step 2. アカウントを作る
どんなBotにするか決めたらBot用のTwitterアカウントを作ります。
TwiBotMakerアプリからアカウントを作ることはできないので、
Twitterの公式アプリからアカウントを作ってください。

### 注意！アカウントがBotだと分かるようにする
TwitterによるとアカウントがBotであると分かるようにしなさい、とのこと。

- 名前にBotと入れる
- プロフィールにBotであることを明記する
などが推奨されています。


##  Step 3. ログインする
TwiBotMakerアプリで先ほど作ったアカウントにログインします。

Loginボタンを押して、
{% asset_img 01-login.jpg %}

アカウント情報を入力します。
usernameのところにはTwitterの@〇〇の@以外を入力します。
{% asset_img 02-auth.jpg %}

## Step 4. つぶやきを登録する
ログインが完了したらこんな画面になると思います。

{% asset_img 03-top.jpg %}
（この画像では既につぶやきがいくつか登録されてますが、
最初にログインしたときは何もないと思います。）

ADDボタンを押すとつぶやきを入力する画面が表示されるので、
つぶやきたい内容をどんどん登録します。
{% asset_img 04-edit.jpg %}


<u>同じ内容をつぶやかないように最低でも20個くらいは登録すること</u>をおすすめします。

## Step 5.つぶやく間隔を設定する
1時間から3時間の間でつぶやく間隔を選ぶことができますので、
多すぎないくらいの間隔を選びましょう。

{% asset_img 05-span.jpg %}
私は３時間を選びました。

## Step 6. Botをスタートする
あとはSTARTボタンを押すだけでBotがスタートします。
{% asset_img 06-start.jpg %}

BotがスタートするとSTOPボタンが押せるようになります。
{% asset_img 07-started.jpg %}

<u>ボタンを押してすぐにつぶやくわけではないので、気長に待ちましょう。</u>

## まとめ
この記事を読んだあなたが
TwiBotMakerを使ってくださるのであれば
開発者としてとても嬉しいです。

また、感想やこういう機能が欲しいなどのレビューも
お待ちしております。
（Google Play Storeにレビューしていただいても良いですし、
TwitterのDMをしていただいても構いません。）

ちなみにこれは僕が作ってみたイケてる日本語を
英語圏の人に教えてあげるBotです。
{% asset_img 08-mybot.png %}

Botの運用は難しいですね。
（フォロワー１って。。。。笑）


運用はさておき、<u>TwiBotMakerを使えば</u>
<u>Bot自体はとても簡単に始められる</u>ので、
ぜひ挑戦してみてください。

ダウンロードはこちらから！
[▶︎TwiBotMakerをDL](https://play.google.com/store/apps/details?id=com.bedroomcomputing.twibotmaker )
{% asset_img 00-feature.png %}


## 最後に
TwitterをはじめとするSNSの運用でお困りではないですか？
書籍をうまく使って勉強してみるのも良いかもしれません。

<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15952629%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19662741%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/844/368/762/20010009784844368762_1.jpg?_ex=64x64" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15952629%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19662741%252F" target="_blank">ＳＮＳマーケティングのやさしい教科書。 Ｆａｃｅｂｏｏｋ・Ｔｗｉｔｔｅｒ・Ｉｎｓｔａｇｒａ  改訂新版/エムディエヌコ-ポレ-ション/グローバルリンクジャパン</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15952629%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19662741%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4844368761%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
