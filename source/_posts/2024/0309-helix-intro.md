---
title: Rust製のエディタHelixを使い始めてNeoVimに戻ってきた話
tags:
  - Helix
  - Vim
  - NeoVim
  - エディタ
categories: 技術
featured_image: thumb.png
date: 2024-03-09 22:19:51
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
Rust製のHelixというテキストエディタをご存知ですか？
<!-- more -->

NeoVimがモダンVimとされているのに対して、Helixはさらに新しいポストモダンを自称しています。
今回は僕が２週間弱使ってみて、私がHelixについて良いなと思ったところ、そしてNeoVimに戻ろうと思った理由について書いていきます。

(2024/03/15追記) 結局なんだかんだで、またHelix使い始めてます。Helix最高〜〜〜！

## **Helixのいいところ**
Helixはその思想がいいなと思いました。詳しく書いていきます。

### ミニマリズムである
Helixはあろうことかプラグインをサポートしていません。
一応、プラグインをそのうち対応するとのことですが、現バージョンでは一切サポートしていません。
それでも大丈夫な理由は、最初からエディタに必要な機能を搭載しているからです。

#### Git
Gitをサポートしています。変更があった行を表示してくれたり、hunkに移動することがデフォルトで可能です。

#### ファジーサーチ
Helixはファジーサーチはかなり強力で、ファイルはもちろんGitに登録されたファイル、バッファ内検索、またはショートカットやコマンドまでファジーサーチできます。コマンドのファジーサーチはVimにも欲しい。。。

#### LSP
LSPの導入もすごく簡単で、設定ファイルにLSPを使いたい言語を足すだけでLSPが使えます。プラグインのインストールなどが不要なので簡単です。

#### TreesSitter　
デフォルトでTreeSitterをサポートしているので、その言語の構造を理解したテキスト編集が可能です。そのため、引数や関数内を選択、またコメントを選択などオブジェクト操作が高性能です。

#### DAP
これは使ってないのでコメントできませんが現時点でのDAP対応はベータ版だそうですデフォルトでデバッグできるのはいいですね。

### ショートカットも必要最低限で覚えやすい
自分でプラグインを入れないのでショートカットの衝突とかを考えないでよかったと思います。Vimに似たキーバインドなのですが、割とそれを一新しようという気概を感じました。

検索とクリップボード周りは`space+<key>`、ファイル内移動は`g<key>`、前後の移動は`[`とか`]`から始まる、など体系的なコマンドになっています。

### セレクトモードの思想が素敵
Helixはノーマルモードとセレクトモードの境界がVimよりも曖昧な印象を受けました。

例えばwを押すとカーソルが動くだけでなく自動で単語を選択してくれます。ここにx(削除)やc(削除してインサートモードに変更)などコマンドを繋げられるのが便利でした。
以下の画像のようにカーソルがjの位置にあるとき、wキーを押すと、jから移動地点(=の手前)までが勝手に選択されます。
{% asset_img 02.png %}

また、マルチカーソルに対応しています。そしてTreeSitterも対応していることから変数の上にカーソルを置いてspace + hとすると変数が使われている箇所全てが選択されるので、そこから普通に書き換えることができます。画像はカーソルが`row`変数にあるときに`space+h`を実行した様子です。
{% asset_img 01.png %}

### ショートカットのガイドを出してくれる
例えばスペースキーを押すとそれに続くコマンドを画面に表示してくれます。これは普通に便利です。Vimにも欲しいですね。
画像はスペースキーを押した後に続きのコマンドを表示してくれている様子です。
{% asset_img 03.png %}

## **Helixをやめようと思った理由**
ここからは私がNeoVimに戻ることになった理由を紹介します。プラグインに対応していない、という特徴が悪く働いてしまったな、と思います。

### ファイラーがない
VimでいうところのNerdTreeのようにプロジェクトをツリー状で見られるようものがないです。
割と皆はファジーサーチがあればいけるという雰囲気でした。
GitHubにissueはあるのですが、公式でサポートする予定はなくプラグインとして実装したいようです。なのでプラグインが実装できるまでお預けでしょうか。

### ターミナルもない
Vimは:terminalコマンドで内蔵のターミナルが開けますが、Helixはそれがありませんし、サポートする予定もないようです。
tmuxとかzellijといったツールで対応するのが普通みたいです。

ちなみに、このために導入したzellijの使用感が私は気に入ったので、NeoVimに戻った今も内蔵のターミナルではなくzellijで新しいPaneとしてターミナルを開くようにしました。

### スクリプトをサポートしていない
Vim ScriptやLuaのようにサクッと回せるスクリプト言語はありません。

私はPHPのDocker内で開発することが多いので、簡単なコマンドをDockerコンテナ内で実行したいことがあります。こういったタスクをNeoVimだとLuaでサクッとかけて、結構便利なのですが、そういったことはHelixではできません。
shell scriptもしくはPython、Goなど好きな言語で実装してね、ということだと思います。実際、Linuxコマンドとの併用は推奨されているようで:pipなど、バッファと標準入出力を繋げるコマンドが重視されています。

### 細かいけど気になったこと
~自分はPythonのLSPの関数に抽出みたいなコードアクションが全然動きませんでした。ちょっと調べても直す方法が出てこなかったので、このレベルの細かいバグをこれからたくさん踏むのかな、という気持ちでNeoVimに帰りたくなってしまいました。もちろんエンジニアとしてコントリビュートできたらいいのですが、、、~
(2024/03/15追記：これはHelix再起動したら動くようになってました笑)

バグじゃないですが、エディタ全体でインデントの設定（タブやスペース）ができません。言語ごとの設定はできるのですが、すべての言語のデフォルトみたいなのができませんでした。

## まとめ
結局新しいエディタなので不具合も色々あるといった感じでした。
私にとってはもっと枯れたNeoVimの方が心地良かったみたいです。
しばらくしてバージョンが上がったらまた挑戦したいです。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[NeoVimをアプリとしてFinderから開く](/2023/07/2023-0728-nvim-as-app/)

## 【PR】おすすめ技術本
ゴリラさんのVim本です。
Vim使いなら要チェックですね。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F16355952%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F20038989%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/844/378/792/20010009784844378792_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F16355952%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F20038989%252F" target="_blank">ＯＤ＞Ｖｉｍが好きになる本   /インプレスＲ＆Ｄ/ゴリラ</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F16355952%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F20038989%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB0899SR52S%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
{% endraw %}