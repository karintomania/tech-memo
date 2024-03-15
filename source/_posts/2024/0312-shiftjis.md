---
title: いろんなテキストエディタでShift JIS開いてみた
categories: 技術
featured_image: thumb.png
date: 2024-03-12 17:01:44
tags:
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。
今回は色んなエディタでShift  JISを開いたらどうなるのかを検証してみました。
<!-- more -->
ことの発端はこちらのドキュメントです。
[Helix Vision](https://github.com/helix-editor/helix/blob/master/docs/vision.md)
Helixというエディタがいくつか達成したいゴールを掲げているのですが、そのうちの一つにこんな部分があります。
> Whether it's a 200 MB XML file, a megabyte of minified javascript on a single line, or Japanese text encoded in ShiftJIS, you should be able to open it and edit it without problems. 
（筆者訳：200MBのXMLだろうと、1行にミニファイされた1MBのJSだろうと、ShitJISでエンコードされた日本語のテキストだろうと、問題なく開けて編集できるべきである）

なんかShiftJISが編集しづらいテキストの代表例みたいに扱われているんですね。
最近は全部UTF-8で統一されているけど、確かに以前ShiftJIS絡みで苦戦したことがあるような。。。

というわけでこのHelixも含めて、いろいろなテキストエディタがShiftJISをちゃんと開けるのかを検証してみました。

##  そもそもShift JISとは

IT用語辞典によると以下のような説明がされています。（https://e-words.jp/w/Shift_JIS.html）
> Shift JIS（シフトJIS）とは、JIS規格として標準化された日本語を含む様々な文字を収録した文字コードの一つ。正確には「Shift_JIS」と間にアンダーバーを挟んで表記する。MS-DOSやWindowsが標準の日本語文字コードとして採用したことから広く普及した。

Shift JISは文字コードの一種です。
マイクロソフトによって日本語の文字コードとして採用されたので広く使われるようになったようです。
日本語だけならこれでもよかったんですが、他の言語も表せるということで、今はUTF-8で統一する方向にざっくり落ち着いているみたいです。

## 実験対象のエディタ
今回は以下のエディタで検証してみます。
検証はMacBookを使っています。

- Word
- VS Code
- Vim
- NeoVim
- Emacs
- Helix

サクラエディタとか秀丸とかも試したかったのですが、Macで検証したため、これらのエディタは検証できず。。。
でも多分、日本製のエディタなだけあって、問題なく開けると思います！

VS CodeでShift JISでエンコードされた日本語ファイルを作って、これを色んなエディタで開いてみようと思います。
{% asset_img 02_save_as_sjis.png %}

## Word
まずはみんな大好きOfficeです。ShiftJISを推していたマイクロソフトなので問題なく開けるんじゃないでしょうか。
早速、開いてみましょう。
ポップアップでどのエンコードを使うか聞かれました。
{% asset_img word.png %}
`Japanese (Mac OS)`というのが最初から選択されています。どうやらShift JISを認識してくれているみたいですね。
普通に開けました。
{% asset_img word_open.png %}

というわけで、一応の確認はされるものの、普通に開く事ができるようです。

## VS Code
それでは同じMicrosoft製のIDE、VS Codeを試してみます。
どうなるでしょうか。

{% asset_img 03_vs.png %}
だめでした。
UTF-8として開いてしまっているようです。

ただ、一応文字コードのメニューを開くとShift JISが選択されています。
{% asset_img 03_vs_fix.png %}

ShiftJISとして開き直すと、ちゃんとファイルを開く事ができました。

{% asset_img 02_vs_fixed.png %}

## Vim
Vimです。かなり歴史のあるエディタなので、ShiftJISにも対応しているのではないでしょうか？
それでは以下のコマンドでファイルを開いてみます。

{% asset_img vim_command.png %}

えいや！（Enterキー、ッターン！）

{% asset_img vim.png %}
だめでした。

ただし、vimは設定をちゃんとすることでShiftJISを開くことが可能です。
`.vimrc`（Vimの設定ファイル）に以下の設定を追加します。
`set fileencodings=utf-8,sjis`
そうすることでutf-8ではないファイルをShift JISとして開いてくれるようになります。
{% asset_img vim.png %}
ちゃんと開けました。

{% asset_img vim_fix.png %}
(ちなみに日本語のフォントがカスなのは僕のMacBookの設定のせいでvimのせいとかではないです。念の為。)

## NeoVim
NeoVimはVimをもうちょっと新しくしようぜっていうコンセプトのエディタです。
VimになかったShift JIS対応は改善されているのでしょうか。
{% asset_img nvim_command.png %}

せい！（Enterキー、ッターン！）

{% asset_img nvim.png %}
だめでした。。。。
まあ、vimにできないのにNeoVimでできるってこともないですね。

対応策はvimと同じで`fileencodings`に`sjis`を追加してあげるだけですね。
{% asset_img nvim_fix.png %}
ちゃんと開けました。

## Emacs
Emacsはよくvimのライバル的な位置付けにされる事が多いので、ShiftJISの扱いでvimに差をつけることはできるのでしょうか。

ちなみにこの検証のためだけに生まれて初めてEmacsをインストールしました。
{% asset_img emacs_install.png %}

それではいきます！（Enterキー、ッターン！）
{% asset_img emacs.png %}

開けました！！なんの設定も無しに初期状態で開けました。これはすごい。

関係ないですけど、EmacsってGUIなんですね。vimと同じCLIで動く系だと思ってました。

## Helix
さて、今回の検証の発端となったエディタHelixです。GoalでShiftJISを名指ししているだけあって期待が高まります。
また個人的にも2024年推していきたいエディタなので、うまく開いて欲しいものです。

{% asset_img heli_command.png %}
いけ！（Enterキー、ッターン！）
{% asset_img heli.png %}
うわあーーー！！

設定なしでは開けませんでした。
まあ、vimみたいになんか設定があるだろう。

（Google検索中。。。）

<u>**対応策見つかりませんでした。**</u>

これは僕のGoogle力が甘いのかもしれませんし、Helix自体ドキュメント化されていない機能が結構あったりするのですが、Shift JISを開く方法は僕には見つけられませんでした。

マジかよHelix。。。

## まとめ
今回の検証の結果を以下の表にまとめました。
{% asset_img mato.png %}
いやあ、Emacsがデフォルトで開けたのと、HelixはShiftJISを開くための設定すら無かったことに驚きました。
皆さんはどう思いましたか？
それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[Rust製のエディタHelixを使い始めてNeoVimに戻ってきた話](/2024/03/2024-0309-helix-intro/)