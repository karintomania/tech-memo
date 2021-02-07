---
title: 【android】NavigationグラフのPreview Unavailableを解決する方法
tags:
  - android
categories: 技術
featured_image: thumb.png
date: 2021-01-03 09:25:42
---


## navigationでプレビューが表示されない
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

android studioでnavigation graphを使用している際に、
画像のようにプレビューが表示されない時があります。
{% asset_img 01-unavailable.png %}

<!-- more -->
今回はその解決方法を紹介します。

## 解決方法
NavigationグラフのCodeを開いて、
プレビューが表示されないFragmentのプロパティに
`tools:layout="@layout/main_fragment"`を追加します

コードは以下のようになります。
{% codeblock nav_graph.xml lang:xml %}
<fragment
    android:id="@+id/mainFragment"
    android:name="com.bedroomcomputing.example.ui.main.MainFragment"
    android:label="MainFragment" 
    tools:layout="@layout/main_fragment"
    />
{% endcodeblock %}

これを追加すると、プレビューが表示されるようになります。
{% asset_img 02-solved.png %}

## まとめ
簡単に解決するのですが、
地味に調査に時間がかかったので、メモとして残しておきました。
短いですが、今回は以上です。

それじゃ今日はこの辺で。

## ところで...
<u>仕事で扱っている技術がレガシーだったり、同じことの繰り返しだったりで</u>
<u>最近、成長してないと感じてませんか？</u>

転職することで、もっと成長できるかもしれません。

いますぐ転職しない人でも、とりあえずエージェントに登録しておいて
<u>案件や年収を眺めるだけでも市場の需要を知ることができ、</u>勉強になります。

ここでエンジニアに人気の転職サイトを紹介します。

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


## 関連記事
こちらの記事もおすすめです。  

[androidで角が丸いボタンを作る方法](/2020/12/2020-1227-android-rounded-button/)