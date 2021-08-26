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

## おすすめ書籍
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/621/066/089/20010009784621066089_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">人月の神話   /丸善出版/フレデリック・フィリップス・ブルックス</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB07QL464C2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
