---
title: コピーしたパスをエクスプローラで開くショートカットを作った話(VBS)
tags:
  - Windows
  - 自動化
  - VBS
categories: 技術
featured_image: thumb.png
date: 2020-12-09 21:44:49
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
いきなりですが、
メールなどで送られてきたファイルパスを
コピーしてエクスプローラで開くとき、ありますよね。
<!-- more -->

あの作業、すごく無駄じゃないですか。
ファイルパスコピーした時点でもう開くって分かり切ってるので。

とはいえ、コピーしたのを検知してフォルダを開くのは
少しやりすぎな感じなので、
ショートカット一発で開く方法を考えました。

実は以前これと同じことをJavaでやったのですが、
Windows機ならデフォルトで動くVBSで書きました。

それでは見ていきましょう。

## VBSの実装
適当なフォルダにopenFolder.vbsファイルを作成して、
お好きなエディタで以下のコードを打ち込んで保存してください。

{% codeblock openFolder.vbs lang:vbs %}
Dim path
' クリップボードからパスを取得する
path = """" & CreateObject("htmlfile").ParentWindow.ClipboardData.Getdata("text") & """"

' エクスプローラでパスを開く
Set shell = CreateObject("Wscript.Shell")
shell.Run "explorer " & path
{% endcodeblock %}
一応パスを””でくくるようにしています。
こうすることでパスに空白が含まれていても安心です。

## ショートカットの作成
次に先ほど作成したopenFolder.vbsファイルを
`右クリック>ショートカットの作成`でショートカットを作ります。
{% asset_img 01-shortcut.png %}

これをデスクトップに配置して、
`右クリック > プロパティ`を開きます。

ショートカットキーを設定できるので、
好きなショートカットを指定しましょう。
私はコピペから即発動できるように
`Ctrl+Alt+c`としました。
{% asset_img 02-hotkey.png %}

以上で設定は完了です。
ショートカットキーが効いているかどうか
確認してみましょう。

## うまくいかないときは
うまく動かない時は、
タスクマネージャの詳細タブを開いて
system settingsを探してみてください。
それが中断状態になっているときは、
system settingsを終了させればOKです。

{% asset_img 05-systemsettings.png %}
## まとめ
こういったちょっとしたタスクでも
自動化するとストレスが減りますね。

まあ、半分開発することが目的になってしまっているところはあるのですが。。。
便利になっているから良いかと思います。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  
Javaで同じことをしています。Javaが好きだって人は見てみてください。

[【Windows】コピーしたファイルパスをエクスプローラーで開くのがめんどくさいので、ショートカット一発にした話](/2020/07/2020-0726-open-folder/)

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
