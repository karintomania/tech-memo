---
title: 【Windows】コピーしたファイルパスをエクスプローラーで開くのがめんどくさいので、ショートカット一発にした話
tags:
  - Windwos
  - 自動化
  - Java
categories: 技術
date: 2020-07-26 13:19:27
featured_image: thumb.png
---


## 背景
こんにちは。Javaで便利ツールつくるおじさんの [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

<u>ファイルパスを開くのが面倒だ</u>、と感じたことはないだろうか。
<!-- more -->
例えば、メールで共有フォルダのパスが送られてきた時、
それを開くためには、
1. リンクをコピー
1. エクスプローラーを開く
1. リンクをペースト

という手順を踏むと思う。

これがだるいのだ。
一応Win+Eボタンでエクスプローラを開く、というショートカットを使っていたが、
それでも最近だるくなってきた。

というわけで<u>ショートカット一発でクリップボードにあるフォルダを開く</u>ようにしてみた。

余談だけど、OneNoteとかTeamsとかのマイクロソフト製品がファイルパスのリンクに対応してくれていないのは、何故なんだろう。
OneNoteは対応していると見せかけてクリックするとエラーを吐いてくる。
リンクを作成しても
{% asset_img 01-onenote.png %}
エラーが出る
{% asset_img 02-error.png %}

## 追記
Javaが動く環境がない場合もあると思うので、
VBSで同じことをする記事を描いています。
[コピーしたパスをエクスプローラで開くショートカットを作った話(VBS)](/2020/12/2020-1209-open-folder-vbs/)

## 構成
基本はJavaなのだが、ショートカット一発で起動させるために、  
Javaを起動するバッチにWindowsショートカットを割り当てるということをしている。

登場人物は以下の通り。
1. Java
1. Javaを実行するためのバッチ
1. バッチをショートカットから起動するためのショートカット

ちょっとややこしそうだが、解説していく。

## Javaの実装
元々コマンドプロンプトで実装するつもりだった。
クリップボードから値をとることなんて、
コマンドプロンプトで余裕でできると思っていたが、
どうも簡単にはできないらしかったので、Javaで実装してしまった。

### ソース

{% codeblock ClipboardDemo.java lang:java %}
import java.awt.datatransfer.*;
import java.awt.*;

public class ClipboardDemo {

    public static void main(String args[])throws Exception {

            // クリップボードから値を取得
            Clipboard c=Toolkit.getDefaultToolkit().getSystemClipboard();
            String dist = (String)c.getData(DataFlavor.stringFlavor);

            // ダブルクオーテーション、改行コードを削除
            dist = dist.replace("\"", "");
            dist = dist.replace("\n", "");

            // ファイル名が含まれていたら削除 *1
            dist = dist.replaceAll("\\\\[^\\\\\\\\]+\\..*$", "");

            // ダブルクオーテーションで囲む
            dist = "\"" + dist + "\"";

            // エクスプローラ起動してパスを開く
            Runtime.getRuntime().exec("Explorer.exe " + dist);

    }
}

{% endcodeblock %}
*1
私はパスにファイル名が入っていた時は、ファイル名を除いてフォルダを開くことが多いので、
このような処理を入れているけど、直接ファイルを開きたい人は不要。

### 動作確認

何かしらのファイルパスをクリップボードに入れた状態で、
以下コマンドを叩いて動作確認してみる。

```javac ClipboardDemo.java && java ClipboardDemo```

## Javaを実行するためのバッチ
さっきのJavaクラスファイルを実行するためには同じフォルダにバッチを作る。
{% codeblock lang:bat %}
java ClipboardDemo
{% endcodeblock %}
特に解説なし。

## バッチをショートカットから登録するためのショートカット
これが大事。
今回やりたいのはコピーしてからすぐフォルダを開くこと。
そのためには<u>Javaを実行するバッチのショートカットを作成して、そのショートカットを起動するショートカットを登録する</u>必要がある。

ややこしいな。
混乱を避けるため、
ショートカット→何かのファイルへのショートカットファイル
ホットキー→キー操作という意味でのショートカット
と記載することにする。

まず先ほど作ったバッチファイルのショートカットを作成する。

{% asset_img 03-shortcut.png %}

それをデスクトップに配置して、
`右クリック→プロパティ→ショートカットキー`
で起動のためのホットキーを設定できる。

{% asset_img 04-hotkey.png %}
私はコピーしてからスムーズにホットキーを押せるよう、
Ctrl＋Alt＋Cとした。

これで晴れて完成。
設定したホットキーを押して動作確認してみよう。

## うまく動かない時
うまく動かない時は、
タスクマネージャの詳細タブを開いて、system settingsが中断状態になっているときがある。
もし、そうなっていたらsystem settingsを終了させればOK。

{% asset_img 05-systemsettings.png %}
## まとめ
こんなことをしたい人がどれだけいるのかわからないけど、
個人的にはこの数クリックがなくなってストレスが減った。
QOLを高めたい人はぜひ。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[現役エンジニアが業務を自動化してきた手法７つ+αを紹介【Windows編】](/2020/07/2020-0712-windowsAutomation/)

## おすすめの本
業務の自動化に興味があれば以下の本はいかがでしょうか。
仕事を自動化・効率化するためのいろいろなテクニックが載っています。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/822/295/950/20010009784822295950_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank">エクセル仕事の自動化が誰でもできる本   /日経ＢＰ/渡部守</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F53e71415752d30c3aaa8993b57def440%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F18962107%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4822295958%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>