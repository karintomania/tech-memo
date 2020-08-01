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