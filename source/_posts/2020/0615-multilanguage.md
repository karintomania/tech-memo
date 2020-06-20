---
title: androidアプリで多言語対応するには
tags:
  - android
categories: 技術
featured_image: 00_thumb.png
date: 2020-06-15 00:10:22
---


## 背景
こんにちは。  
にわかandroider[karintomania(twitter)](https://twitter.com/karintozuki)です。  

<u>個人開発でアプリを作るのは楽しい</u>。  
でも、たくさんの人に自分の作ったアプリが使ってもらえたら
もっと楽しいはず。  

じゃあどうしたら良いんだ、という時に、  
<!-- more -->
色々方法はあるんだろうけど、  
一つ上げられるのは多言語に対応すること。  

<u>日本語が読める人は1億2千万人とかだけど、  
英語だったら大体15億人</u>くらいいるそうだ。  

日本語の10倍のチャンスがある。クールだね。  

もし、あなたが語学堪能で中国語もできるよっていうことだったら、  
(もしくは翻訳を外注する余裕があれば。個人開発でそこまで気合入っている人は少ないだろう。)  
潜在顧客はさらに14億人も増える。  


というわけで、15億人にリーチするための最初の一歩、  
多言語対応するための手順を説明してみる。  

## 概要
今回はテキストを多言語対応する方法を紹介するけど、  
おそらく、画像とかを言語によって変えたい場合も同じような手順になるかと思う。  

androidは、  
プロジェクト配下の`res/values/strings.xml`
にテキストを格納するようになっている。  
(ソースにテキストベタ打ちなんてしてる開発者は
多言語化うんぬん以前にリファクタリングしろというandroidからのメッセージだ。きっと。)

<u>多言語対応する際は、他の言語用にvaluesフォルダを新調する。</u>  

`res/values-(国コード)`
というフォルダを作成し、その中に他の言語を格納したstrings.xmlを格納することになる。  

例えば、日本語を作成した場合はこんな感じ。  
res/
 ┣value
 ┃┗strings.xml
 ┃
 ┗value-ja
 　┗strings.xml

これでandroid自体の設定で
日本語を選択している場合は日本語、  
それ以外の言語が選ばれていれば、デフォルト言語の英語が出てくるというわけ。  

**注意**
この例では、デフォルト言語を英語にしてるけど、  
value/strings.xmlに日本語を書いたら、  
当然、デフォルトは日本語、何か特別に言語が指定されていたらそちらを表示する、  
という挙動になる。  

## 日本語用のstrings.xmlの作成
android studioにてapp/res/valueを右クリックして、  
New > Value Resource fileをクリック。  

{% asset_img 01-new-file.png %}
ファイル作成画面が開くので、  
File Nameは`strings.xml`でOK。  

もう一つ、画面下のAvailable qualiersから
Locale > ja: Japanese > Any: region
を選択し、OK押下。  
{% asset_img 02-enter-name-android-多言語.png %}

すると、プロジェクト画面に
strings.xml (ja)
が作成される。  
{% asset_img 03-ja.png %}

あとはstrings.xmlに英語と日本語でテキストを記載していくだけ。  
こんな感じってサンプルを記載しておく。  


{% codeblock strings.xml lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">bedroom computing</string>
</resources>
{% endcodeblock %}

{% codeblock strings.xml(ja) lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">寝室コンピューティング</string>
</resources>
{% endcodeblock %}

これだけでandroidの設定を勝手に読み込んで  
日本語だったら「寝室コンピューティング」  
それ以外の言語だったら「bedroom computing」  
と、適切な言語の方を表示してくれる。  

## 言語を変える
Androidで対応言語を変える際は、  
<u>設定 > システム > 言語と入力 > 言語</u>  
から変更できる。  

## まとめ
多言語化するときは
- テキストをstrings.xmlに外出しする
- strings.xmlを言語ごとに作成する

英語に翻訳することは難しいかもしれないけど、  
<u>英語対応の実装自体はさして難しくないよ</u>、ということでした。  

それでは今日はこの辺で。  


## 関連記事
こちらの記事もおすすめ！  
[sqliteとは？特徴と使い方を解説する](/2020/06/2020-0610-sqlite/)