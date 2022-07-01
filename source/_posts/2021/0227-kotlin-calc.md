---
title: 未経験OK！最速Kotlin&androidアプリ開発入門その５　Kotlinで計算する
tags:
  - 最速Kotlin&Androidアプリ開発入門
categories: 技術
featured_image: thumb.png
date: 2021-02-27 23:16:30
---



## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
<!-- more -->
前回は変数に数字や文字を代入しました。
今回はコンピュータに計算をさせる方法を紹介します。

今回はこんなことを学びます
- 整数の四則演算
- 文字列の処理
- 変数を使った計算


## 整数の四則演算
前回は整数を格納することができるInt型を勉強しました。
それらにKotlinを使って計算をした結果を入れてみましょう。

### 足し算・引き算
まずは簡単な足し算と引き算をしてみます。

以下のコードを実行してみてください。
{% codeblock kotlin lang:Kotlin %}
var tashizan :Int = 1 + 1
var hikizan :Int = 2 - 1

println(tashizan)
println(hikizan)
{% endcodeblock %}

これは数学で勉強するのと同じ`+`と`-`記号を使います。

### 掛け算・割り算
では、掛け算と割り算はどうでしょうか。

掛け算は少し数学と違っていて、`*`を使います。
ちなみにこの記号`*`はアスタリスクと読みます。

{% codeblock kotlin lang:Kotlin %}
var kakezan :Int = 2 * 1
println(kakezan)
{% endcodeblock %}


割り算も数学で使う`÷`ではなく`/`(スラッシュ)を使います。

ここでの注意は、
<u>Int型は整数しか入らないので、答えを整数で表す必要があります。</u>

`/`を使った計算をすると、
割り算の、いわゆる商を計算します。
○○あまりXXとなったときの○○の値ですね。

以下のコードを実行してみてください。

{% codeblock kotlin lang:Kotlin %}
var warizan: Int = 10 / 3
println(warizan)
{% endcodeblock %}

これは10/3は3あまり1なので、実行結果は3となります。

ちなみに余りも求めたくなりますよね？
割り算の余りを計算するには`%`を使います。

以下のコードを実行してみてください。
{% codeblock kotlin lang:Kotlin %}
var amari: Int = 10 % 3
println(amari)
{% endcodeblock %}

ちなみに、この`+`や`-`など、計算に使う記号を演算子と呼ぶことがあるので、言葉を覚えておきましょう。

### 演算子まとめ
さて、今まで5つの演算子を学んできました。
以下にまとめてみます。

演算子 |計算
--- | ---
+ |足し算
- |引き算
* |掛け算
/ |割り算の商
% |割り算のあまり

それでは少し練習をしてみます。


> 問題
次の計算式の結果をInt型の変数answerに代入して、
結果をprintln()を使って表示してください。
計算式：3 × 4 ÷ 2 + 3

解答
{% codeblock kotlin lang:Kotlin %}
fun main() {
    var answer:Int = 3 * 4 / 2 + 3
    println(answer)
}
{% endcodeblock %}

答えは9になります。
×は*に、÷は/になるんでしたね。 

できたでしょうか。

## 文字の演算
文字列に対しては＋の演算子が使えます。

ちなみに同じ＋記号を使いますが、
文字列は普通、足し算とは言わず結合と言います。

というわけで、文字列の結合をするコードは以下のようになります。
次のコードを実行してみてください。
{% codeblock kotlin lang:Kotlin %}
var moji:String= "Kotlin" + "入門"
println(moji)
{% endcodeblock %}

Kotlin入門という文字が表示されたら成功です。

ちなみに文字列を引き算など足し算以外の演算をしようとするとエラーが出ます。

例えば、以下のコードではエラーが出てしまいます。
{% codeblock kotlin lang:Kotlin %}
var moji:String= "Kotlin" - "入門"
println(moji)
{% endcodeblock %}

## 変数を使った計算
今までは数字を使った計算でしたが、変数を計算に使うこともできます。

以下の幅と高さから長方形の面積を求めるコードを実行してみてください。
{% codeblock kotlin lang:Kotlin %}
fun main() {
    var height:Int = 5
    var width:Int = 3 
    var area:Int = height * width
    println(area)  
       
}
{% endcodeblock %}

この行に注目してみてください。
```
var area:Int = height * width
```
右辺で、変数heightと変数widthを掛け算しています。

これくらいの簡単な計算ならあまり必要ないかもしれませんが、
これから複雑なことをしようとすると変数同士を計算することが増えるので、ぜひ覚えておいてください。

## おまけ：文字列と変数の便利な結合
ちょっとおまけ的な内容なので、
ここまでの内容でお腹いっぱいという人は飛ばしても大丈夫です。

さて、先ほど文字列の結合を勉強しました。

nameという変数に名前を代入して、
ようこそ、○○（名前）さん！というメッセージを表示するプログラムを作ることにします。

以下のコードを実行してみてください。

{% codeblock kotlin lang:Kotlin %}
fun main() {
    var name:String = "かりんとう"
    var message:String = "ようこそ、" + name + "さん！"
    println(message)  
    
}
{% endcodeblock %}

ようこそ、かりんとうさん！というメッセージが表示されたでしょうか。

このままでももちろんOKなのですが、
<u>Kotlinにはこんな時に便利な書き方があります。</u>
以下のコードを実行してみてください。

{% codeblock kotlin lang:Kotlin %}
fun main() {
    var name:String = "かりんとう"
    var message:String = "ようこそ、${name}さん！"
    println(message)  
    
}
{% endcodeblock %}

結果は同じようになったと思います。
文字列と変数を+（プラス）でつなげる代わりに文字列の中に${○○（変数名）}と書くことで同じような結果を得ることができます。

覚えておくと便利なので使ってみてください。

## まとめ
今回は計算の方法を勉強しました。
自分がプログラミングを勉強した時はこの辺りですごくプログラミングを勉強してる！
という実感を覚えたのですが、どうでしょうか笑

それじゃ今日はこの辺で。

## 関連記事
この入門の記事一覧はこちらです。
[未経験OK！最速Kotlin&androidアプリ開発入門](/tags/%E6%9C%80%E9%80%9FKotlin-Android%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E5%85%A5%E9%96%80/ )

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
