---
title: GhosttyをUbuntuで使う - ビルドの仕方とビルドがめんどい人向けの方法
categories: 技術
featured_image: thumb.png
date: 2025-04-13 23:49:08
tags:
  - Ghostty
  - Ubuntu
  - ターミナル
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
この記事にたどり着いた人はGhosttyに興味がある、これから使い始めたいという人が多いと思うので、まずは言わせてください。
Ghostty最高です。

まえがきはこのくらいにして、解説を書いていきます。
<!-- more -->

## ビルドがめんどい人へ

GhosttyをUbuntuで使いたいけど、ビルドがめんどい、という人は<u>.debファイルを配布してくれているプロジェクトがある</u>ので、そちらを使うのが良いと思います。

ただし、これは公式ではありません。

また、有志の方によるものなのでGhosttyが更新されてからこのプロジェクトに反映されるまでしばらくかかってしまいます。

[https://github.com/mkasberg/ghostty-ubuntu](https://github.com/mkasberg/ghostty-ubuntu)

## ソースをビルドする

もともとは上記の.debファイルから使っていたのですが、個人的にZigを勉強しはじめたということもあり、ソースからビルドしてみることにしました。

私はUbuntuでやりましたが、他のDistroでも似たような感じと思います。

<u>結論から言うと公式をなぞればOK</u>なんですが、いくつかハマったので共有します。

[https://ghostty.org/docs/install/build](https://ghostty.org/docs/install/build)

## Zigのインストール

公式ドキュメントではZig v0.14を使えと書いてあります。

ですが、<u>執筆時点（Ghostty v1.1.3)ではv.0.13を使わないとビルドが通りませんでした。</u>

おそらくGhostty v1.1.4以降はZig v0.14を使うようになるのではないかと思います。

## 依存性のインストール
以下のコマンドを叩いてください。

{% codeblock lang:bash %}
$ sudo apt update
$ sudo apt install libgtk-4-dev libadwaita-1-dev git blueprint-compiler gettext

{% endcodeblock %}

Ubuntu以外の人は公式サイトに他のDistro用のコマンドがあるので、そちらを参照ください。

[https://ghostty.org/docs/install/build#linux-installation-tips](https://ghostty.org/docs/install/build#linux-installation-tips)

## ビルド

さて、いよいよビルドです。

まずはGitレポジトリをクローンしましょう。

{% codeblock lang:bash %}
$ git clone https://github.com/ghostty-org/ghostty
$ cd ghostty

{% endcodeblock %}

そしたらzigのビルドコマンドを走らせますが、-pオプションでどこにインストールをするか指定できます。

とくにこだわりがなければ`$HOME/.local`を指定すると、`$HOME/.local/bin`内にバイナリを吐いてくれます。

{% codeblock lang:bash %}
$ zig build -p $HOME/.local -Doptimize=ReleaseFast

{% endcodeblock %}

システム全体にインストールしたいときは`/usr`が推奨されています。

{% codeblock lang:bash %}
$ zig build -p /usr -Doptimize=ReleaseFast

{% endcodeblock %}

## まとめ
この記事がGhosttyを試してみたい人の助けになれば幸いです。

それじゃ今日はこの辺で。

{% adv 1 %}

## 関連記事
こちらの記事もおすすめです。  

[yaziのインストール方法](/2025/02/2025-0219-yazi/)
