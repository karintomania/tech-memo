---
title: LINE BotでFlex Messageを使う (with Spring Boot)
tags:
  - Java
  - Spring Boot
  - LINE Bot
categories: 技術
date: 2020-04-15 20:40:01
featured_image: feature-line-flex-message.png
---


## 背景
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  

この記事はこの記事の続きです。
[Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜](/2020/04/2020-0408-linebot/)
LINE Botを開発する際に必ずと言っていいほど(？)使うのがFlex Messageです。
これはメッセージのレイアウトをJsonで記述したもので、  
Botから送信するメッセージの自由なレイアウトを可能にしてくれます。  
私はこれを利用して、簡単な英単語クイズを作ってみました。  
{% asset_img linebot.gif %}
その中で学んだことを記事にしています。  

<!-- more -->
## 作ったもの
私はFlex Messageを利用して、以下の英単語クイズを作ってみました。  

ユーザーが会話を始めると英単語と意味の選択肢が出てきます。
５問解答するとイラストと共に結果を教えてくれるというものです。  

**クイズ画面**
{% asset_img quiz.jpg [クイズ画面] %}
**結果レポート**
{% asset_img word_result.jpg [結果レポート] %}

githubにソースを公開しているので、良かったら見てみてください。
https://github.com/karintomania/wordbot

## Flex Messageを作る流れ
Flex Messageを開発する流れは以下のような感じでした。  
1. simulatorを使ってメッセージのデザイン
1. 実装
一つ一つ見て解説します。  

## simulatorを使ってメッセージのデザイン
このリンクからFlex Messageのシミュレーターが使えます。
https://developers.line.biz/flex-simulator/

{% asset_img simulator.png [simulator] %}

### 要素の種類
要素一覧を見てください。  
（ちなみに要素一覧とか言ってるのは私だけです。説明する上で便宜上言っているだけです）
Flex Messageがどんな要素で構成されているかを説明します。  

一番上の階層のbubbleというのが、一つの吹き出しに格納されるメッセージの種類のことです。  
これがcarouselだと複数の吹き出しが横並びになるようなレイアウトになります。  

その次の階層がheaderとかheroとかです。heroはでかい画像をボンっとおくところを指すようです。  
その下に大体Boxというのがあると思います。
これは複数の要素をまとめる単位です。
Boxの中にテキストやイメージを入れていく感じです。  

### 要素の追加
各種操作ボタンの欄を見てみてください。  
まあ、直感的なので大体大丈夫と思います。  
ちなみに要素を追加する時は、追加したい場所ではなく、
要素を追加したい親要素を選択して＋ボタンを押さなきゃいけないのが若干注意が必要ですね。

### Jsonで保存
これらをガチャガチャやってみて、  
納得がいくまでデザインします。  
私はこんな感じになりました。  
{% asset_img simu-example.png [完成したレイアウト例] %}

ここまでできたらJsonで保存しておきましょう。  
View as Jsonボタンがあるので、ここからJsonを表示して
コピペしておきます。  
個人的にはこのJsonはレイアウトの保存用にしか使いませんでした。  
レイアウトを考える上ではシミュレータ使えばいいし、実装ではJson触るわけではないので。  

## 実装
SDKでJsonをイメージしながら実装していきます。
サンプルを見れば大体イメージが湧くと思いますが、
少し解説をします。

### Boxの作り方
イメージとしては要素をオブジェクトとして作る
→それを親要素のコンストラクタに配列として渡す
って感じですね。

詳細な実装は公式のkitchen sinkボットが参考になると思います。  
ExampleFlexMessageSupplier.javaがFlex Messageを実装しているので  
参考にしてください。  

ここでは少しだけ解説します。  
以下のコードを見てください。
これは問題を出すときの選択肢の一行分をBoxで作っているところです。  
{% asset_img answer.png [選択肢] %}

回答の選択肢ひとつひとつは回答のテキスト要素と回答ボタン要素からなっています。

{% codeblock 選択肢の作成 lang:java %}
private Box createDefBtnBox(int optionNum, Word word) {
	
	//　解答のテキストを作成
	Text def = Text.builder()
			.size(FlexFontSize.Md)
			.flex(5)
			.wrap(true)
			.text(word.getDefinition())
			.build();
	
	//　解答ボタンを作成
	Button btn = Button.builder()
			.style(ButtonStyle.PRIMARY)
			.flex(1)
			.color(Const.Quiz.BOTTUN_COLORS.get(optionNum))
			.height(ButtonHeight.SMALL)
			// 解答ボタンが押された際の挙動を定義。この場合は解答番号がユーザから送信されます。
			.action(new MessageAction(Integer.toString(optionNum + 1), Integer.toString(optionNum + 1))) 
			.build();

	//　テキストと解答ボタンを一つのBoxに入れる
	Box defBtnBox = Box.builder()
			.layout(FlexLayout.HORIZONTAL)
			.margin(FlexMarginSize.LG)
			.contents(asList(def, btn)) // リストとして子要素を格納
			.build();

	return defBtnBox;
}
{% endcodeblock %}


## まとめ
Flex Messageに最初触った時は、若干クセがあって戸惑ったのですが、笑
今日紹介したようなことに慣れてしまえば  
結構、簡単に作れるので、ぜひ挑戦してみてください。

それでは今日はこの辺で。  

## 関連記事
こちらの記事もおすすめ。  

前回の記事→[Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜](/2020/04/2020-0408-linebot/)
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
