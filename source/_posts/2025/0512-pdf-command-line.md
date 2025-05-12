---
title: コマンドラインでPDF関連の処理（一つにまとめる、サイズを圧縮する）
tags:
  - ターミナル
  - PDF
categories: 技術
featured_image: thumb.png
date: 2025-05-12 09:13:48
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
PDF関連の処理をたまにするんですが、オンラインの知らないサービスにファイルをアップロード・ダウンロードするのはセキュリティ的に少し怖いですよね。

今回はコマンドラインから起動できてオフラインで使えるPDFコマンドを紹介します。
<!-- more -->

## 複数のPDFファイルをまとめる
### pdfunite
複数のPDFファイルをまとめたいときは`pdfunite`コマンドが使えます。

私のUbuntuには標準で入っていました。

使い方は以下の感じです。

```shell
pdfunite pdf_1.pdf pdf_2.pdf pdf_3.pdf output.pdf

```
結合したいファイルをいくつでもつなげることが可能です。

**注意** 引数の最後に出力ファイルの名前を指定するのを忘れないでください。
以下のようなコマンドを実行すると引数の最後のファイル(pdf_3.pdf)が上書きされてしまいます。

```shell
pdfunite pdf_1.pdf pdf_2.pdf pdf_3.pdf // pdf_3.pdfが上書きされる

```

### GhostScript

GhostScriptはPostScriptというPDFを操作するためのスクリプト言語の実行環境です。
スクリプトとはいっていますが、普通にCLIコマンドとして考えて大丈夫です。
インストールしてもいいですし、私はDockerから使うのが簡単でいいと思っています。

ファイルの結合は以下のコマンドです。（gsコマンドがインストールされている際はDockerの部分を省いてください。）

```shell
docker run --rm -v "$(pwd):/app" --workdir /app minidocks/ghostscript gs \
  -dNOPAUSE \
  -sDEVICE=pdfwrite \
  -sOUTPUTFILE=combine.pdf \
  -dBATCH pdf_1.pdf pdf_2.pdf

```

## PDFのサイズ圧縮

PDFのサイズ圧縮にもGhostScriptが便利です。

以下をコピペして使ってください。

```shell
docker run --rm -v "$(pwd):/app" --workdir /app minidocks/ghostscript gs \
  -sDEVICE=pdfwrite \
  -dCompatibilityLevel=1.4 \
  -dNOPAUSE \
  -dBATCH \
  -sOutputFile=test_compressed.pdf \
  -dPDFSETTINGS=/ebook \
  /app/test.pdf

```

## まとめ
GhostScriptの存在を知らなかったのですが、意外とコマンドラインでできることって多いんですね。
また何か他の使いみちを見つけたら追記していこうと思います。

それじゃ今日はこの辺で。

{% adv 0 %}

## 関連記事
こちらの記事もおすすめです。  
一番イケてる（主観です）ターミナル、GhosttyをUbuntuで使う方法です。

[GhosttyをUbuntuで使う - ビルドの仕方とビルドがめんどい人向けの方法](/2025/04/2025-0413-build-ghostty/)