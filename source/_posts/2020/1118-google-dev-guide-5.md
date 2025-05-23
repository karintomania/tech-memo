---
title: Google Tech Dev Guideのコーディング問題解いてみた〜その5（ついでに日本語訳も）
tags:
  - Google Tech Dev Guide
  - アルゴリズム
categories: 技術
featured_image: thumb.png
date: 2020-11-18 23:45:55
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

この記事は、Googleが提供するコーディング教材Google Tech Dev Guideの解説をする記事の第五弾です。
こちらから関連記事がまとめて見られます。
[Google Tech Dev Guideのコーディング問題解いてみた 記事一覧](/tags/Google-Tech-Dev-Guide/)

## Sum Numbers問題
今回の問題はSum Numbersと名付けられた問題です。
<!-- more -->
問題はこちらです。（元のサイトはこちら：https://codingbat.com/prob/p121193 ）

> Given a string, return the sum of the numbers appearing in the string, ignoring all other characters.
> A number is a series of 1 or more digit chars in a row. 
> (Note: Character.isDigit(char) tests if a char is one of the chars '0', '1', .. '9'. Integer.parseInt(string) converts a string to an int.)

和訳です。
> 与えられた文字列に存在する数字の合計を求めなさい。他の文字は無視します。
> 数字は一桁以上の連続した数字です。
> (注意：Character.isDigit(char)でcharが0～9の数字かどうかをテストできます。Integer.parseInt(String)でStringをintに変換できます。)

この関数は以下のような動きをします。
数字が二個以上連続して出現するとき、
例えば二連続の数字は二つの一桁の数字ではなく、二桁の数字としてカウントされます。

sumNumbers("abc123xyz") → 123
sumNumbers("aa11b33") → 44
sumNumbers("7 11") → 18


## 回答
まずは正攻法でCharacter.isDigit(char)とInteger.parseInt(String)を使って
解いてみます。
シンプルに一文字ずつ確認して、
連続で数字が出る場合は別にwhileループを回して、
複数桁の数字に対応します。

{% codeblock SumNumbers.java lang:java %}
public static int sumNumbers(String str) {
    char[] strChars = str.toCharArray();
    int result = 0;


    for(int i = 0; i < strChars.length; i ++){

        // charが数字だった場合、次の文字が数字かどうかを判別する
        if(Character.isDigit(strChars[i])){
            // 文字列内に出現する数字を文字列として格納する
            String number = "";
            
            // 数字以外の文字が出現する or すべての文字をチェックしきる、までループする
            while(i < strChars.length && Character.isDigit(strChars[i])){
                number += Integer.parseInt(String.valueOf(strChars[i]));
                i++;
            }

            // resultに出現した数字を足す
            result += Integer.parseInt(number);
            i--;
        }
    }
    return result;
}

{% endcodeblock %}


## 正規表現を使う
ちょっと裏技っぽいのですが、
この問題のポイントは数字を抜き出してくることだと思います。

文字列から特定の条件を満たす文字列を抽出するのは
正規表現が使えます。

数字は`\d`、直前の文字の1回以上の繰り返しは`+`が使えますので、
1回以上の数字の繰り返しは`\d+`となります。

{% codeblock SumNumbers.java lang:java %}
public static int sumNumbers2(String str) {
    // 一回以上繰り返す数字
    String pattern = "\\d+";
    Pattern p = Pattern.compile(pattern);

    int result = 0;

    Matcher m = p.matcher(str);

    // 出現した数字を合計する
    while(m.find()){
        result += Integer.parseInt(m.group());
    }
    return result;
}
{% endcodeblock %}

シンプルにまとめることができました。

## まとめ
出題者の気持ちに寄り添うのであれば最初の回答のほうが良い気がしますが、
正規表現を使えるようになると応用の幅が広いので、
どちらも知っておくことが大事な気がしますね。

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
