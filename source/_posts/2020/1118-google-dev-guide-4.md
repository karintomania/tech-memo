---
title: Google Tech Dev Guideのコーディング問題解いてみた〜その4（ついでに日本語訳も）
tags:
  - Google Tech Dev Guide
  - アルゴリズム
categories: 技術
featured_image: thumb.png
date: 2020-11-18 23:45:48
---


こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

この記事は、Googleが提供するコーディング教材Google Tech Dev Guideの解説をする記事の第四弾です。
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## Without String問題
今回の問題はWithout Stringと名付けられた問題です。
<!-- more -->
問題はこちらです。（元のサイトはこちら：https://codingbat.com/prob/p192570 ）
> Given two strings, base and remove, return a version of the base string where all instances of the remove string have been removed (not case sensitive). 
> You may assume that the remove string is length 1 or more. Remove only non-overlapping instances, so with "xxx" removing "xx" leaves "x".

和訳です。
> base, removeの二つの文字列が与えられたときにbaseから
> 全てのremove文字列を取り除いた文字列を返す関数をかえすwithoutString関数を作成してください。
> ケースは無視します。（大文字小文字を区別しない。）
> removeは一文字以上の文字列です。
> 重複するぶんは除去しません。"xxx"から"xx"を除去した結果は"x"です。

この関数は以下のような動きをします。

withoutString("Hello there", "llo") → "He there"
withoutString("Hello there", "e") → "Hllo thr"
withoutString("Hello there", "x") → "Hello there"


## 回答
substringとindexOf関数を上手い感じに使うと出来そうです。

{% codeblock WithoutString.java lang:java %}
String result = base;

//base,removeを小文字に直す
String baseLower = base.toLowerCase();
String removeLower = remove.toLowerCase();

int removeStartIndex = 0;

// removeがbaseLowerから見つからなくなるまでループ
while((removeStartIndex = baseLower.indexOf(removeLower)) != -1){

    // baseLower, resultからremoveを削除
    baseLower = baseLower.substring(0, removeStartIndex) + baseLower.substring(removeStartIndex + remove.length(), baseLower.length());
    result = result.substring(0, removeStartIndex) + result.substring(removeStartIndex + remove.length(), result.length());

}

return result;
{% endcodeblock %}


## 再帰を使う
再帰を使うことも可能です。
理屈としては先ほどのコードと同じですが、
whileの代わりに関数内で自信を呼び出すような再起処理になっています。

removeした後のBase文字列にまだremove対象が含まれていれば
関数内から自分自身（withoutString関数）を呼び出します。

{% codeblock WithoutString.java lang:java %}
public static String withoutString(String base, String remove) {
    int removeIndex = base.toLowerCase().indexOf(remove.toLowerCase());

    if(removeIndex == -1){
        // removeが見つからなければbaseか返す
        return base;
    }else{
        // removeが見つかったら除去してもう一度処理
        base = base.substring(0, removeIndex) + base.substring(removeIndex + remove.length(), base.length());
        return withoutString(base, remove);
    }

}
{% endcodeblock %}

こちらの方がスッキリしますが、やや理解が難しいかもしれません。

## replaceAll関数を使う
一応出題者の意図に沿うためみてみぬふりをしていたのですが、
JavaのStringクラスには元々replaceAllという
withoutStringと同じ挙動をする関数が用意されています爆

ただ、この問題のミソとしてケースを無視する、というのがあるかと思いますが、
これは正規表現に(?i)を使うことで実現します。
ignore caseのiですね。

{% codeblock WithoutString.java lang:java %}
public static String withoutString(String base, String remove) {
    return base.replaceAll("(?i)"+remove, "");
}
{% endcodeblock %}

うーん、コーディング面接でこの解答をするかはお任せしますが、
業務で使う際はこちらが正解ですね。

## まとめ
文字列操作は定番の出題なので、
難なくループやSubstringを使いこなせると良いですね。

それじゃ今日はこの辺で。

## 関連記事
コーディング問題の関連記事一覧です。
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
