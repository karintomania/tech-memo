---
title: androidで角が丸いボタンを作る方法
tags:
  - android
categories: 技術
featured_image: thumb.png
date: 2020-12-27 10:54:02
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
Android開発でデフォルトのボタンを使うとこんな感じです。
ちょっとダサいですよね。
{% asset_img 00-default.png %}
<!-- more -->

今回はこんな感じのボタンの作り方を紹介します。

{% asset_img 01-rounded.png %}

それに加えてこんな感じでボーダーのみの場合も紹介します。
{% asset_img 02-border.png %}

## 角が丸いボタン
<u>androidのボタンには角の丸みといったプロパティが存在しない</u>ので
バックグラウンド画像に角丸の画像を指定することで実現します。

ちょっとめんどくさいですね笑

### 背景画像の作成
プロジェクトから
`app > res > drawable`を右クリックして、
`New > Drawable Resource File`を実行します。
{% asset_img 03-new.png %}

適当な名前を付けましょう。
ここではbtn_roundとしました。
{% asset_img 04-name.png %}

ファイルの中身はこんな感じです。
{% codeblock btn_round.xml lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_enabled="false">
        <shape android:shape="rectangle"  >
            <corners android:radius="20dp" />
            <solid android:color="#B5B5B5"/>
        </shape>
    </item>
    <item android:state_pressed="true" >
        <shape android:shape="rectangle"  >
            <corners android:radius="20dp" />
            <solid android:color="#2572E5"/>
        </shape>
    </item>
    <item android:state_focused="true">
        <shape android:shape="rectangle"  >
            <corners android:radius="20dp" />
            <solid android:color="#2572E5"/>
        </shape>
    </item>
    <item >
        <shape android:shape="rectangle"  >
            <solid android:color="#3987FD"/>
            <corners android:radius="20dp" />
        </shape>
    </item>
</selector>
{% endcodeblock %}

セレクタを使うことで状態によって色を変えています。

名前|説明
--- | ---
state_enabled|=falseで、ボタンがdisableの時の状態を指します。今回はグレーアウトするようにしました。
state_pressed|ボタンが押された時の状態です。
state_focused|ボタンがフォーカスされている時です。

state_focusedについてですが、キーボードやトラックデバイスを使用した時はボタンにフォーカスを当てることができます。
android studioのデバイスエミュレータを使っていれば、タブキーなどを使ってボタンにフォーカスできます。

stateを付けていない最後のitemがデフォルトの状態になります。

### ボタンプロパティの変更
見た目を変更したいボタンのbackgroundプロパティに
先ほど作成した画像を指定してあげます。
`android:background="@drawable/btn_round"`

他にもテキストの色を白にしたり、ボタンの高さを調整したりする(minHeightプロパティ)と
最終的にこんな感じになります。

{% codeblock sample_button.xml lang:xml %}
<Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="@drawable/btn_round"
            android:minHeight="0dp"
            android:paddingTop="4dp"
            android:paddingBottom="4dp"
            android:text="Button"
            android:textColor="#FFFFFF" />

{% endcodeblock %}

## ボーダーの場合
次はこんな感じの枠線だけのボタンを作ってみます。
{% asset_img 02-border.png %}
先ほどとほぼ流れは同じですが、今回はボタン押下時に文字色を変える必要があります。
下の画像のように押された時は青→白に文字色を変えるため、
文字の色用にdrawableをもう一つ作成します。
{% asset_img 05-focused.png %}

### 背景画像の作成
先ほどと同じように画像を作ります。
中身はこんな感じです
名前はbtn_round_border.xmlとしました。
{% codeblock btn_round_border.xml lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
        <item android:state_enabled="false">
            <shape android:shape="rectangle"  >
                <corners android:radius="20dp" />
                <solid android:color="#B5B5B5"/>
            </shape>
        </item>
        <item android:state_pressed="true" >
            <shape android:shape="rectangle"  >
                <corners android:radius="20dp" />
                <solid android:width="1dp" android:color="#2572E5"/>
            </shape>
        </item>
        <item android:state_focused="true">
            <shape android:shape="rectangle"  >
                <corners android:radius="20dp" />
                <solid android:width="1dp" android:color="#2572E5"/>
            </shape>
        </item>
        <item >
            <shape android:shape="rectangle"  >
                <stroke android:width="1dp" android:color="#2572E5"/>
                <corners android:radius="20dp" />
            </shape>
        </item>
</selector>
{% endcodeblock %}

strokeプロパティを指定することでボーダーを表現できます。
state_focusedとstate_pressedの際は
青と白を逆転するためshapeを描画するようにしています。

### 文字色の作成
文字もボタンの状態によって色を変えなければいけません。
文字色用の新しいdrawableを作成します。

ファイル名はbutton_stroke_text_color.xmlとしました。
{% codeblock button_stroke_text_color.xml lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:state_focused="true"
        android:color="#ffffff" />

    <item
        android:state_pressed="true"
        android:color="#ffffff" />

    <item android:color="#2572E5" />

</selector>

{% endcodeblock %}
### ボタンプロパティの変更
それではボタンにこれらを適用しましょう。
{% codeblock sample_button.xml lang:xml %}
<Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="@drawable/btn_round_border"
            android:minHeight="0dp"
            android:paddingTop="4dp"
            android:paddingBottom="4dp"
            android:text="Button"
            android:textColor="@drawable/button_stroke_text_color"
	/>
{% endcodeblock %}

ボーダーのボタンが表示できたでしょうか。

## まとめ
androidではボタンの見た目を変えるのも一苦労ですね。。。
HTMLみたいにCSSで一発で変えられるようなシステムにならないもんでしょうか。

とはいえ、ボタンを変えるだけでだいぶそれっぽい見た目になるので、
ぜひ試してみてください。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)

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
