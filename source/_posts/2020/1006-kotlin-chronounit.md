---
title: Kotlinで日付の差分を計算する方法
tags:
  - Kotlin
  - Android
categories: 技術
featured_image: thumb.png
date: 2020-10-06 22:17:44
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今回はKotlinで二つの日付、LocalDateTimeを比較する方法を紹介します。

<!-- more -->

## ChronoUnitを使用する
KotlinにはChronoUnitというクラスがあるので、
それを利用していきましょう。

現在時から午後10時まで何分あるかを計算するプログラムを書いてみます。

{% codeblock Compare.kts lang:Kotlin %}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

// 現在時刻の取得
val now = LocalDateTime.now()
println(now)  // 2020-10-06T21:26:58.536212

// 10:00PMのLocalDateTimeを作成
val dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")
val target = LocalDateTime.parse("2020/10/06 22:00:00", dtf)

// 差分を計算
val minutes: Long = ChronoUnit.MINUTES.between(LocalDateTime.now(), target)

print(minutes) // 結果: 33

{% endcodeblock %}

特解解説も必要ないかと思いますが、
`ChronoUnit.{時間の単位}.between(時間1, 時間2)`
とすることで時間の差分が計算できます。

## Chronounitの時間単位
時間の単位として、ChronoUnit Classに以下のようなものが用意されています。

メンバ名 | 単位
--- | ---
NANOS | ナノ秒
MICROS | マイクロ秒
MILLIS | ミリ秒
SECONDS | 秒
MINUTES | 分
HOURS | 時間
HALF_DAYS | 12時間
DAYS | 日
MONTHS | 月
YEARS | 年
DECADES | 10年
CENTURIES | 100年
MILLENNIA | 1000年
ERAS | 10億年
FOREVER | そして永遠へ。。。

DECADES以降はそうそう使わないと思うけど
なんか面白いですね。
ちなみにFOREVERは2.92277266 × 10^11年(3千億年くらい)として定義されているらしいです。
参考：[Java 9. Where “forever” is hard coded.](https://medium.com/@ggajos/java-9-where-forever-is-hard-coded-7841dad53f16)

## まとめ
今回はKotlinでの日付の比較について紹介しました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[Kotlinで日付をフォーマットする方法](/2020/10/2020-1018-kotlin-localdatetime-format/)
[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)


## おすすめ書籍
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/621/066/089/20010009784621066089_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">人月の神話   /丸善出版/フレデリック・フィリップス・ブルックス</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB07QL464C2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
