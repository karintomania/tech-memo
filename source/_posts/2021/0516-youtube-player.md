---
title: Youtube再生ライブラリで「夜に駆ける」を再生するだけのAndroidアプリを作った
categories: 技術
featured_image: thumb.png
date: 2021-05-16 00:08:40
tags:
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
AndroidでYoutubeの動画を埋め込みたい
[android-youtube-player](https://github.com/PierfrancescoSoffritti/android-youtube-player)
というライブラリがあるので、使ってみました。

<!-- more -->

## 作ったもの
タイトルにあるようにアプリを開くと「夜に駆ける」が再生されます。
それだけですｗ
{% asset_img 01_yoru.jpg %}

念のためですが、
<u>
著作権があるので、もちろんApp Storeでの公開はできません。
</u>
念のため。

## 公式のライブラリはどうなのか？
Youtubeには公式のAndroid用Player APIというものが用意されています。
https://developers.google.com/youtube/android/player

しかし、android-youtube-playerの作者曰く、公式ライブラリはバグがあり、
サポートもしっかりしていないため、プロダクションに使うにはちょっと頼りないとのことです。
また、公式で提供されるAPIはアプリの登録が必要なため
ちょっとめんどくさそうです。

こういった理由から、android-youtube-playerを使用してみることにしました。

## 使い方
GitHubにサンプルプロジェクトのソースをあげていますので、
こちらも参考にしてみてください。
https://github.com/PierfrancescoSoffritti/android-youtube-player

### Dependencyの追加
build.gradleに以下を追加します。

{% codeblock build.gradle lang:gradle %}
dependencies {
  implementation 'com.pierfrancescosoffritti.androidyoutubeplayer:core:10.0.5'
}
{% endcodeblock %}
バージョンは都度最新版を確認して適宜変更してください。

### Viewの追加
Viewを追加します。

{% codeblock acrivity_main.xml lang:xml %}
    <com.pierfrancescosoffritti.androidyoutubeplayer.core.player.views.YouTubePlayerView
        android:id="@+id/youtube_player_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        
        app:videoId="x8VYWazR5mE"
        app:autoPlay="true"
        app:showFullScreenButton="false" />
{% endcodeblock %}

これだけでYoutubeが再生できるようになります。
便利ですね！

### オブザーバーの追加
ViewだけでYoutubeが見られるようになるのですが、オブザーバーを追加すると、
Life cycleに対応して処理を自動でしてくれるようになります。

以下の二行を追加します。

{% codeblock MainActivity lang:kotlin %}
val youTubePlayerView = findViewById<YouTubePlayerView>(R.id.youtube_player_view)
        lifecycle.addObserver(youTubePlayerView);
{% endcodeblock %}


### VideoIdの設定
先ほどの例だと、Viewに動画のIDをベタ書きしていましたが、
プログラム側で制御することも可能です。

コードは以下のようになります。

{% codeblock MainActivity lang:kotlin %}
val youTubePlayerView = findViewById<YouTubePlayerView>(R.id.youtube_player_view)
        lifecycle.addObserver(youTubePlayerView);

        youTubePlayerView.addYouTubePlayerListener(object : AbstractYouTubePlayerListener() {
            override fun onReady(youTubePlayer: YouTubePlayer) {
                val videoId = "S0Q4gqBUs7c"
                youTubePlayer.loadVideo(videoId, 0f)
            }
        })

{% endcodeblock %}


以下のように、
第一引数は動画のID、第二引数には再生開始位置を指定できます。
```
youTubePlayer.loadVideo(videoId, 0f)
```

## まとめ
今回はめちゃくちゃ簡単にYoutubeを埋め込めるライブラリを紹介しました。
動画をアプリに組み込めると幅が広がりますね。

ただしYoutube上の動画を利用する際には
著作権にはお気をつけください！
基本的には自分がアップロードした動画を利用するのが吉かと思われます。

それでは今日はこの辺で。


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
