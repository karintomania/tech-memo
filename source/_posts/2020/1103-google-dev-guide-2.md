---
title: Google Tech Dev Guideのコーディング問題解いてみた〜その２（ついでに日本語訳も）
tags:
  - Google Tech Dev Guide
  - アルゴリズム
categories: 技術
featured_image: thumb.png
date: 2020-11-03 00:11:23
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

Google Tech Dev Guideは、Googleが公開しているコーディング教材です。
<!-- more -->

その中のコーディングチャレンジに挑戦していこうと思います。
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)
## StringSplosion問題
それでは問題です。

StringSplosionと名付けられています。

> 空白でない文字列を渡した時に、
以下の例のように変換する関数、`stringSplosion`を作ってください。
stringSplosion("Code") → "CCoCodCode"
stringSplosion("abc") → "aababc"
stringSplosion("ab") → "aab"

与えられた単語を一文字ずつ増やして足していく感じですね。

このサイトが元のサイトです。
https://codingbat.com/prob/p117334
Java限定ですが、実際に正しい実装かどうかをテストできるので便利です。


## 解説
一応私がどんなふうに考えて解いたかも添えて
コードを解説します。

### 愚直な方法
とりあえず与えられた文字列はループしたいので、
`chars[]`という`char`の配列にしておきましょう。

一文字ずつ増やしていく、というところから
0から単語の文字数分まで`i`をループ
その内側で`j`を`0`から`i`までループして`chars[j]`を
結果の`result`にくっつけていく実装です。
壊滅的に文章化が下手ですみません汗。。。

コードで書くとこんなんですかね。

{% codeblock StringSplosion.java lang:java %}
// 愚直な解法
public static String stringSplosion1(String str){
	// 文字列をchar配列に
	char[] chars = str.toCharArray();
	// 結果を格納するString
	String result = "";

	for(int i = 0; i < chars.length; i++){
		for(int j = 0; j <= i; j++ ){
			// resultにchars[0]〜[i]まで追加していく
			result += chars[j];
		}
	}

	return result;
}
{% endcodeblock %}

これでも良いのですが、この手の問題は常に計算量を考えるようにしましょう。
この場合の計算量は二重ループなので、`O(N^2)`になります。（Nは与えられた文字列の文字数）。
文字列の長さが二倍になると、計算量はその4倍になってしまいます。

改良していきましょう。

### 改良版
どう頑張っても与えられたN個の文字は処理しないといけないので、
最適な計算量はきっと`O(N)`になるはずです。

一度のループで`result`に追加するべき文字列を`tmpStr`として
これについて考えてみます。
`str = "Code"`だった時に
i = 0→ tmpStr = C
i = 1→ tmpStr = Co
i = 2→ tmpStr = Cod
i = 3→ tmpStr = Code

良く考えると、
`tmpStr`は直前のループの`tmpStr`に次の文字を足しただけですね。
わざわざ一文字目から生成しなくても
前回のループの結果を利用すれば良いわけです。

改良後の実装がこちらです。
{% codeblock StringSplosion.java lang:java %}
// 改良した解法
public static String stringSplosion2(String str){
	char[] chars = str.toCharArray();
	String result = "";
	String tmpStr = "";

	for(char c: chars){
		tmpStr += String.valueOf(c);
		result += tmpStr;
	}

	return result;
}
{% endcodeblock %}

こうすることで`chars[]`の中の文字はそれぞれ一度ずつ見れば良いので、
計算量は`O(N)`になりましたね。
また、ループ中のインデックス変数`i`は別に必要なくなったので、
拡張for文を使っています。すっきりしますね。
```
// 拡張for文
for(char c: chars){
	// 処理
}
```

### StringBuilderを使う
また、文字列の結合にはStringBuidlerを使うことが良いとされます。
Stringは値を変えるときに新しくオブジェクトを生成しているため、
文字を追加するなどの処理をする際に非効率だからです。

詳しく書くと長いので省略しますが、興味がある人は調べてみてください。
StringBuilderを使う実装はこちらです。
{% codeblock StringSplosion.java lang:java %}
public static String stringSplosion3(String str){
	char[] chars = str.toCharArray();
	StringBuilder result = new StringBuilder();
	StringBuilder tmpStr = new StringBuilder();

	for(char c: chars){
		tmpStr = tmpStr.append(String.valueOf(c));
		result.append(tmpStr.toString());
	}

	return result.toString();
}
{% endcodeblock %}


## 実行時間の測定
本当に計算量オーダーが正しいのか確かめるために
計算にかかる時間を計測してみました。

処理対象の文字列を
50文字、100文字、500文字、1000文字にしてみた結果です。
三回実行して平均値を載せています。
単位はミリ秒です。

解法 | 50文字 | 100文字 | 500文字 | 1000文字
--- | --- | --- | --- | ---
愚直 |4.33 |18.3 |2807 |42716
改良版 |0.67 |1.67 |52.6 |271
StringBuilder |0.33|0.67|2.00|4.00

結論としては、StringBuilderすげえ、、、って感じですね。
こんなに差が出るとは思っていなかったです。

## コピペで動かしたい人向けのコード
とりあえコピペで動くのをくれよって人向けに
貼っときます。
`StringSplosion.java`というファイル名で保存して実行してみてください。

{% codeblock StringSplosion.java lang:java %}
class StringSplosion{
	public static void main(String[] args){
		String target = "Code";

		// 実行したい関数をコメント外して実行してください
		String result = stringSplosion1(target);
		// String result = stringSplosion2(target);
		// String result = stringSplosion3(target); 


		System.out.println(result);
	}

	public static String stringSplosion1(String str){
		char[] chars = str.toCharArray();
		String result = "";

		for(int i = 0; i < chars.length; i++){
			for(int j = 0; j <= i; j++ ){
				result += chars[j];
			}
		}

		return result;
	}
	public static String stringSplosion2(String str){
		char[] chars = str.toCharArray();
		String result = "";
		String tmpStr = "";

		for(char c: chars){
			tmpStr += String.valueOf(c);
			result += tmpStr;
		}

		return result;
	}

	public static String stringSplosion3(String str){
		char[] chars = str.toCharArray();
		StringBuilder result = new StringBuilder();
		StringBuilder tmpStr = new StringBuilder();

		for(char c: chars){
			tmpStr = tmpStr.append(String.valueOf(c));
			result.append(tmpStr.toString());
		}

		return result.toString();
	}
}

{% endcodeblock %}

## まとめ
いかがでしたか。

今回紹介したように実装を見直す際には
計算量を意識してみてください。

そして、文字列をたくさん編集する際は
StringBuilderを使いましょう、ということですね。

それでは今日はこの辺で。


## 関連記事
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## 【PR】おすすめ技術本
コーディング面接の勉強にはこちらがおすすめです。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/839/960/100/20010009784839960100_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">世界で闘うプログラミング力を鍛える本 コ-ディング面接１８９問とその解法  /マイナビ出版/ゲイル・ラ-クマン・マクダウェル</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB071GN3JN2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>