---
title: Kotlinで日付の差分を計算する方法
tags:
  - Kotlin
  - android
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
