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
