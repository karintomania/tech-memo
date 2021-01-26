---
title: Kotlinの正規表現の使い方
tags:
  - Kotlin
  - 正規表現
categories: 技術
featured_image: thumb.png
date: 2020-09-05 22:49:54
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今回はKotlinでの正規表現の使い方を紹介します。

<!-- more -->
## 正規表現クラスの宣言
Kotlinでは<u>`RegEx`クラスを使ってパターンを定義します。</u>

{% codeblock RegEx.kt lang:kotlin %}
// a,b,cのうちいずれかにマッチ
val regex = Regex(pattern = "[abc]")
{% endcodeblock %}

### Raw String
正規表現を使用する時にバックスラッシュなどを
エスケープするのってめんどくさいですよね。

Kotlinでは`"""`（三つのダブルクオーテーション）で囲ったStringは
そのままの文字列（Raw String）として扱われるので、エスケープ無しで使えます。

{% codeblock RegEx.kt lang:kotlin %}
// Raw Stringはエスケープ不要
"""\d"""

// 普通の文字列だとエスケープが必要
"\\d"
{% endcodeblock %}

## パターンが含まれているかチェックする
対象の文字列にパターンが含まれているかどうか
確認する際は`containsMatchIn`を使います。

{% codeblock RegEx.kt lang:kotlin %}
// 文字列に数字が含まれているかチェックする
val target = "1 apple. 2 bananas."
val regex = Regex("""\d""")

val isMatched = regex.containsMatchIn(target)
print(isMatched) 
// 結果：true
{% endcodeblock %}

文字列全体がマッチするかどうかを
確認する時はmatchesを使用します。

{% codeblock RegEx.kt lang:kotlin %}
// 対象の文字列に数字のみが含まれているか確認する
val regex = Regex("""\d+""")

val target = "123"
val isMatched = regex.matches(target)
print(isMatched)
// 結果：true

val target2 = "4 apples"
val isMatched2 = regex.matches(target2)
print(isMatched2)
// 結果：数字以外も含まれているのでfalse
{% endcodeblock %}

## 抽出
マッチした文章を抽出したい時は
find、もしくはfindAllを使用します。

findの返り値は`MatchResult?`型です。
パターンにマッチしない場合はnullを返します。

{% codeblock RegEx.kt lang:kotlin %}
val target = "1 apple. 2 bananas."
val regex = Regex("""\d""")

val match = regex.find(target)
print(match?.value)
// 結果：1

val matches = regex.findAll(target)
matches?.forEach { match -> print("${match.value} ") }
// 結果：1 2 
{% endcodeblock %}


## グループ
パターンの中に（）を使うことでグループが使えます。

グループを抽出したいときは、
`groups`を使用します。
`groups[0]`にマッチした全文が格納されていて、
1,2,3・・・と（）グループの中身が格納されます。

{% codeblock RegEx.kt lang:kotlin %}
val target = "090-1111-2222"
val regex = Regex("""(\d+)-(\d+)-(\d+)""")

val match = regex.find(target)
 
match?.groups?.forEach { group -> println("${group?.value}") }
/* 以下が格納されている
group[0]：090-1111-2222
group[1]：090
group[2]：1111
group[3]：2222
*/
{% endcodeblock %}

## 置換
置換には`replace`を使います。
最初のマッチのみ置換するときは`replaceFirst`を使います。

また、`${数字}`を使うことで、
マッチした文字列を置換後の文字列に入れることができます。
（日本語での説明は難しすぎて諦めました。下の例を見て雰囲気をつかんでください笑）
このときの数字はグループの時と同じで、0を指定するとマッチ全文が入ります。

{% codeblock RegEx.kt lang:kotlin %}
val target = "090-1111-2222"
val regex = Regex("""\d""")
val replaced = regex.replace(target, "x")
print(replaced)
// 結果：xxx-xxxx-xxxx
 
val firstRplaced = regex.replaceFirst(target, "x")
print(replaced)
// 結果：x90-1111-2222

val replacedWithOriginal = regex.replace(target, "$0x")
print(replacedWithOriginal)
// 結果：0x9x0x-1x1x1x1x-2x2x2x2x
{% endcodeblock %}

## まとめ
Kotlinの正規表現についてまとめました。
お役に立てれば幸いです。

最後になりますが、
私は個人開発でアプリを作っています。

クイズ感覚で正規表現が楽しめるアプリ、正規表現クエストを作りました。

こんなKotlinの正規表現なんて
ニッチな記事を閲覧してくれる皆様なら笑
楽しんでいただけると思います。
https://www.regex.bedroomcomputing.com/
{% asset_img regex.png %}


それじゃ今日はこの辺で。

## ところで...
<u>仕事で扱っている技術がレガシーだったり、同じことの繰り返しだったりで</u>
<u>最近、成長してないと感じてませんか？</u>

転職することで、もっと成長できるかもしれません。

いますぐ転職しない人でも、とりあえずエージェントに登録しておいて
<u>案件や年収を眺めるだけでも市場の需要を知ることができ、</u>勉強になります。

ここでエンジニアに人気の転職サイトを紹介します。

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">


## 関連記事
こちらの記事もおすすめ。  

[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)

### PR
<u>Team Geek</u>
エンジニアが会社という組織の中で立ち回っていくために
必要な知識が詰まっています。
タイトルにもある通り、プログラミング大好きな
ギークの方におすすめです。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/873/116/303/20010009784873116303_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank">Ｔｅａｍ　Ｇｅｅｋ Ｇｏｏｇｌｅのギ-クたちはいかにしてチ-ムを作るの  /オライリ-・ジャパン/ブライアン・Ｗ．フィッツパトリック</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F12403745%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F16531577%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873116309%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
