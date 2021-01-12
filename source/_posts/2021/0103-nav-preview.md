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

## 関連記事
こちらの記事もおすすめです。  

[androidで角が丸いボタンを作る方法](/2020/12/2020-1227-android-rounded-button/)