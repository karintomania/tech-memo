---
title: Google Tech Dev Guideのコーディング問題解いてみた〜その３（ついでに日本語訳も）
tags:
  - Google Tech Dev Guide
  - アルゴリズム
categories: 技術
featured_image: thumb.png
date: 2020-11-10 00:26:34
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

この記事は、Googleが提供するコーディング教材Google Tech Dev Guideの解説をする記事の第三弾です。
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## Max span問題
今回の問題はMax Spanと名付けられた問題です。
<!-- more -->

元ネタはこちら(https://codingbat.com/prob/p189576)
> Consider the leftmost and righmost appearances of some value in an array. We'll say that the "span" is the number of elements between the two inclusive. A single value has a span of 1. Returns the largest span found in the given array. (Efficiency is not a priority.)

ざっくり日本語にしてみます。
> 配列の中で同じ数字が一番左（＝最初）に現れる場所と一番右（=最後）に現れる場所を考えます。
> 同じ数字に挟まれた要素の数(挟んでいる数字自体を含む)をスパンと定義します。
> 数字が一回しか現れない場合はスパンは１です。
> 与えられた配列から最大のスパンを返す関数 maxSpan() を作ってください。

原文で最後に(Efficiency is not a priority.)とありますね。
これについては微妙に意図がわかってないのですが、自分なりの解釈を最後に書いてます。

maxSpanの動作は以下のようになります。
maxSpan([1, 2, 1, 1, 3]) → 4
maxSpan([1, 4, 2, 1, 4, 1, 4]) → 6
maxSpan([1, 4, 2, 1, 4, 4, 4]) → 6
maxSpan([5]) → 1
maxSpan([]) → 0
最初の例であれば、最初の1と最後の1に挟まれた数字の数が1,2,1,1と４つなので、
スパンは４、ということですね。
配列が空ならmaxSpanは0を返します。


## 素直に解く
まずは素直に解いてみます。

与えられた配列が
`[1, 2, 1, 1, 3]`だったとします。

まずは頭から配列をみると最初の数字は`1`ですね。
Spanを求めるには最後に登場する`1`を探せば良いので、
配列を後ろからみていけば良さそうです。

その方針で実装すると以下のようになるでしょうか。

{% codeblock MaxSpan.java lang:java %}
public static int maxSpan1(int[] nums){

	int span = 0;
	int maxSpan = 0;

	for(int i = 0; i < nums.length; i ++){
		// 同じ数字を配列の後ろから探す
		int j = nums.length -1;
		while(nums[i] != nums[j]){
			j --;
		}

		// スパンを求める
		span = j - i + 1;

		// maxSpanの更新
		if(maxSpan < span){
			maxSpan = span;
		}

	}

	return maxSpan;

}
{% endcodeblock %}

## 解法１の改良
このままでも大丈夫ですが、
maxSpanと残りの配列の長さを比べることで、
処理を少なくできます。

与えられた配列が`[1, 2, 1]`だったとすると、
はじめに`1`のスパンが3と求まった時点で、配列の長さ自体が3なので、
3がmaxSpanだと分かります。

配列のi番目の数字が取りうるスパンの値の範囲を考えると、
`配列のi番目の数字のスパン <= 配列の長さ-i`なので、
`maxSpan >= 配列の長さ-i`となった際には処理を終了するようにします。


{% codeblock MaxSpan.java lang:java %}
public static int maxSpan2(int[] nums){

	int span = 0;
	int maxSpan = 0;

	for(int i = 0; i < nums.length; i ++){
		// maxSpanが残りの配列の長さより大きかったら終了
		if(maxSpan >= nums.length - i){
			break;
		}

		// 同じ数字を配列の後ろから探す
		int j = nums.length -1;
		while(nums[i] != nums[j]){
			j --;
		}

		// スパンを求める
		span = j - i + 1;

		// maxSpanの更新
		if(maxSpan < span){
			maxSpan = span;
		}

	}

	return maxSpan;

}
{% endcodeblock %}
### 計算量の考察
これらのアルゴリズムの計算量を考えてみます。
`n`を配列の長さとすると、
<u>二重ループになっているので、計算量は`O(n^2)`です。</u>

しかし、この問題では計算量`O(n)`(配列内の数字一個を一回ずつ処理するような)の
もっと良いアルゴリズムがありそうです。

### 計算量の算出
興味があれば読んでみてください。

先ほどのアルゴリズムで一番計算が多くなるパターンは、
[0,1,2,3]のように全要素が一度ずつしか現れない（全スパンが1である）パターンだと思います。

この場合、
最初の0に対しては残りの数字1,2,3をチェック、
次の1に対して残りの数字2,3をチェック、
次の2に対して残りの数字3をチェック
というように計算回数は3+2+1=6回となります。

このように全要素が一度ずつしか現れない配列の長さをnとしたときには、
計算回数は`(n^2)/2 + n/2`となります。

よって計算量はO(n^2)です。
直感的に無駄がある気がしますよね。

次からは全数字を一度ずつチェックすれば
結果がわかるアルゴリズムを考えてみます。

## Mapを使う方法
それでは計算量がO(n)となるようにするにはどうしたら良いでしょうか。

前のアルゴリズムでは、同じ数字を
- 一番右の数字として扱うとき（`nums[i]`として取り出されるとき）
- 一番左の数字を探すとき（`nums[j]`として取り出されるとき）

と複数回見ていたので、処理が増えているようです。

それならば、数字を見る際に
<u>一番右の数字である可能性と
一番左の数字である可能性を考慮して処理すれば、</u>
全ての数字を一度ずつ処理する計算量O(n)のアルゴリズムになりそうです。

今回はそのためにマップを使って、nums[i]の数字を見るときに、
- キーにその数字が存在すれば一番右の数字としてスパンを計算
- キーに数字が存在しなければ一番左の数字としてインデックスを登録

としました。
それでは実装です。

{% codeblock MaxSpan.java lang:java %}
public static int maxSpan3(int[] nums){

	int i = 0;
	int span = 0;
	// 配列が空だった際は0を返す
	int maxSpan = (nums.length > 0) ? 1:0;
	// key: 数字, value:最初に登場するIndexとする
	Map<Integer, Integer> numFirstIndexMap = new HashMap<Integer, Integer>();

	for(int num : nums){

		if(numFirstIndexMap.containsKey(num)){
			// keyが存在すればspanを計算する
			span =  i - numFirstIndexMap.get(num) + 1;
			if(maxSpan < span){maxSpan = span;}

		}else{
			// 初登場のインデックスを登録
			numFirstIndexMap.put(num, i);
		}
		i++;

	}

	return maxSpan;

}
{% endcodeblock %}

この方法も最初のアルゴリズムと同様、配列の長さとmaxSpanを比べて効率化することが可能です。
ただ、最初のアルゴリズムと違い最後の数字を見るまでMaxSpanが確定しないので、
nums[i]の次にnums[nums.lenght-i+1]を見るなどループの順序を工夫する必要があるかと思います。

## 実行時間の計測
実行時間を計測してみました。
単位はマイクロ秒です。
配列の要素の数を変えて計測しています。

解法 | 要素500個 | 要素1000個
--- | --- | --- 
素直 |654 | 1602 
Map |16 |16|

Mapは1000個くらいでは数が変わりませんでした。
要素を500個にしようとしたところエディタが死んでしまいました。。。

こう見るとMapの実装が良さそうですが、
ぶっちゃけどちらの実装でも1ミリ秒前後の話なので、
どっちでも良い感じがします。

これが問題文のEfficiency is not a priority.(訳：効率はそんな大事じゃないよ)の意味だったのかなー、とか
思ったりしました。


## まとめ
今回は配列操作の話でしたね。

それじゃ今日はこの辺で。

## 関連記事
こちらからGoogle Tech Dev Guide関記記事の一覧が読めます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## 【PR】おすすめ技術本
コーディング面接の勉強にはこちらがおすすめです。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/839/960/100/20010009784839960100_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">世界で闘うプログラミング力を鍛える本 コ-ディング面接１８９問とその解法  /マイナビ出版/ゲイル・ラ-クマン・マクダウェル</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB071GN3JN2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>