---
title: コピーしたパスをエクスプローラで開くショートカットを作った話(VBS)
tags:
  - Windwos
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


## おすすめの本
業務の自動化に興味があれば以下の本はいかがでしょうか。
仕事を自動化・効率化するためのいろいろなテクニックが載っています。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/822/295/950/20010009784822295950_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank">エクセル仕事の自動化が誰でもできる本   /日経ＢＰ/渡部守</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4822295958%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>