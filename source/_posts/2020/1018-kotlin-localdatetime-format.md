---
title: Kotlinで日付をフォーマットする方法
tags:
  - Kotlin
  - android
categories: 技術
featured_image: thumb.png
date: 2020-10-18 19:30:39
---

## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今回はKotlinで日時を好きなフォーマットで表示する方法を紹介します。
<!-- more -->

## Kotlinで使える日時を扱うクラス
Kotlinの、と言いつつも、実際はJavaのクラスです。
Javaには日時を扱うクラスがいくつかあります。
（これらはより良い実装のために試行錯誤を重ねた結果だそうですが、
新しくJavaを始める人にとってはややこしいだけですね。）

以下の表がKotlinで使える日時を扱うためのクラスです。
基本的にはLocalDateTimeが推奨されています。

クラス名 | 説明
--- | ---
Date |一番の古株。後方互換性のためだけに残されているクラスなので、新しいプロジェクトでは使わないのが吉。ただ、既存のプロジェクトでは見かける機会もあると思います。
Calendar |Dateだけでは日付の操作ができないので、それらが実装されています。Dateと一緒に使うイメージ。
LocalDateTime |Java8で導入されたクラス。使える時はこちらを使ったほうが良いです。Localはタイムゾーンについての情報をもたないという意味合いです。

また、Joda Timesというライブラリも人気らしいのですが、今回はKotlin標準で使えるクラスだけを扱うことにします。

というわけで、それぞれのフォーマット方法を紹介します。

## LocalDateTime型で書式を指定する
LocalDateTime型で書式を指定したい時は
<u>DateTimeFormatter</u>を使用します。

### 実装例
{% codeblock FormatLocalDateTime.kts lang:kotlin %}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

// 現在時刻の取得
val now = LocalDateTime.now()

// フォーマットの指定
val dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")

// 文字列の生成
val result = now.format(dtf)

println(result) // 結果: 2020/10/18 18:04:5
{% endcodeblock %}

## Date型で書式を指定する
Date型で書式を指定したい時は
<u>SimpleDateFormat</u>型を使用します。

### 実装例
{% codeblock FormatDate.kts lang:kotlin %}
import java.util.Date
import java.text.SimpleDateFormat

// 現在時刻の取得
val now = Date();

// フォーマットの指定
val sdf = SimpleDateFormat("yyyy/MM/dd HH:mm:ss")

// 文字列の生成
val result = sdf.format(now)

print(result) //結果:2020/10/18 18:04:52
{% endcodeblock %}


## Calendar型で書式を指定する
Calendar型は二つ方法があります。
一つは<u>Date型に変換して、SimpleDateFormatを使う方法。</u>
もう一つはCalendarが持っている<u>get()メソッドを利用して日付や時間などを個別に取り出す方法</u>です。

### 実装例
{% codeblock FormatCalendar.kts lang:kotlin %}
import java.util.Date
import java.util.Calendar
import java.text.SimpleDateFormat

/*
* SimpleDateFormatを使う
*/
// 現在時刻の取得
val cal = Calendar.getInstance();
// フォーマットの指定
val sdf = SimpleDateFormat("yyyy/MM/dd HH:mm:ss")

// 文字列の生成
val result = sdf.format(cal.getTime())

println(result) // 結果:2020/10/18 18:10:06

/*
* getメソッドを使う
*/

val result2 = "${cal.get(Calendar.YEAR)}/${cal.get(Calendar.MONTH)+1}/${cal.get(Calendar.DAY_OF_MONTH)}"
println(result2) // 結果:2020/10/18
{% endcodeblock %}

`Calendar.get(Calendar.MONTH)`で取得できる数字は0始まりの月です。
実装例では+1をすることで実際の月と合わせています。

## パターン文字
日時フォーマットを指定する際に使用できる文字を紹介します。
たくさんあるので、ここではよく使われるものだけ紹介します。
興味があれば公式ドキュメントを見てみてください。

DateTimeFormatterの方が使える文字が増えていますが、
よく使う以下のものはどちらにも使えます。

文字 | 時間の単位
--- | ---
y | 年
M | 月
d | 日
H | 時間（0-23)
h | 午前・午後の時間（0-11）
m | 分
s | 秒
S | ミリ秒


参考：公式ドキュメント
[SimpleDateFormat](https://docs.oracle.com/javase/jp/8/docs/api/java/text/SimpleDateFormat.html)
[DateTimeFormatter](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html)

## まとめ
今回はKotlinで日時をフォーマットを指定して表示する方法を紹介しました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[Kotlinで日付の差分を計算する方法](/2020/10/2020-1006-kotlin-chronounit/)

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
