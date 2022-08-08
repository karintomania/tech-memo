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
