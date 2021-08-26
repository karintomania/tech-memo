---
title: Google Tech Dev Guideのコーディング問題解いてみた〜その5（ついでに日本語訳も）
categories: 技術
featured_image: thumb.png
date: 2020-12-10 17:20:56
tags:
  - Google Tech Dev Guide
  - アルゴリズム
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
<!-- more -->
この記事は、Googleが提供するコーディング教材Google Tech Dev Guideの解説をする記事の第6弾です。
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## canBalance問題
今回の問題はcanBalanceと名付けられた問題です。

問題はこちらです。（元のサイトはこちら：https://codingbat.com/prob/p158767 ）
> Given a non-empty array, return true if there is a place to split the array so that the sum of the numbers on one side is equal to the sum of the numbers on the other side.

和訳です。

> 与えられた配列に対して、
左側にある数字の合計と右側にある数字の合計が等しくなるような位置が存在するかどうかを判定する関数を作ってください

この関数は以下のような動きをします。
canBalance([1, 1, 1, 2, 1]) → true
canBalance([2, 1, 1, 2, 1]) → false
canBalance([10, 10]) → true

最初の例だと、左側が1+1+1 = 3, 右側が2+1 = 3で、左右の合計が等しくなる位置があるので、
Trueを返しています。

## 解答
シンプルに左から一つずつ数字を足していって、合計が等しくなる点を探します。
計算量はnを配列の長さとするとo(2n)ですかね。

最初に配列全体の合計を出して、奇数だった場合はfalseを返すようにして
効率を上げています。

{% codeblock CanBalance.java lang:java %}
public static boolean canBalance2(int[] nums) {
    int leftSum = 0;
    int rightSum = 0;

    for(int num : nums){
        rightSum += num;
    }

    // 合計が奇数だったらfalse
    if(rightSum % 2 != 0) return false;

    // numsの左側の数字から一つずつleftSumに足していく
    int i = 0;
    while(i < nums.length && leftSum != rightSum){
        leftSum += nums[i];
        rightSum -= nums[i];
        i++;
    }

    return (leftSum == rightSum);

    
}
{% endcodeblock %}

## o(n)になる方法
一番左、一番右の数を端から一つずつ足していく方法です。
この際、毎回左の合計と右の合計を比べて、
少なかったほうに足していきます。

この方法だと計算量はo(n)となりますが、
負の数が含まれている場合はうまくいかないので、
今回の問題では不適ですが、そのような条件があるときは
こちらの方が良い気がします。

{% codeblock CanBalance.java lang:java %}
public static boolean canBalance(int[] nums) {

    
    int leftSum = 0;
    int rightSum = 0;
    int leftIndex = 0;
    int rightIndex = nums.length - 1;

    while(leftIndex <= rightIndex){
        // leftSumがrightSumより小さかったらleftSumを増やす
        // 逆の場合はrightSumを増やす
        if(leftSum <= rightSum){
            leftSum += nums[leftIndex];
            leftIndex++;

        }else{
            rightSum += nums[rightIndex];
            rightIndex--;
        }
    }

    return (leftSum == rightSum);
}
{% endcodeblock %}
## まとめ
配列の中から条件を満たす位置を探す問題でした。

良い配列操作の練習になったかと思います。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## 【PR】おすすめ技術本
コーディング面接の勉強にはこちらがおすすめです。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/839/960/100/20010009784839960100_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">世界で闘うプログラミング力を鍛える本 コ-ディング面接１８９問とその解法  /マイナビ出版/ゲイル・ラ-クマン・マクダウェル</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F14398407%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F18144152%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB071GN3JN2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>