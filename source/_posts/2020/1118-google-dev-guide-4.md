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

## プログラミング初心者がエンジニアになるには？
プログラミングを仕事にしたいけど、経験がないので不安だ、
と思っている方は多いと思います。

もちろん、プログラミングを勉強するのも大事ですが、
良い就職エージェントを見つけることで
未経験から就職するためのプロのサポートを受けることができます。

DYM就職は未経験からの就職を得意としているエージェントです。
まずは登録して、プロの意見を聞いてみてはいかがでしょうか？

以下のリンクから登録すると無料の面談が受けられますので、
本気でエンジニアを目指している人はチャレンジしてみてください。
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+9CZD6A+3EI0+HZAGX" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=210117795566&wid=001&eno=01&mid=s00000015876003020000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=3H3JXF+9CZD6A+3EI0+HZAGX" alt="">