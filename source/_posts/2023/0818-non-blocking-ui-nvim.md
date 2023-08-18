---
title: NeoVimでコマンドをUIをブロックせずに非同期に実行する方法
tags:
  - NeoVim
  - Lua
  - NeoVimプラグイン
categories: 技術
featured_image: thumb.png
date: 2023-08-18 08:21:48
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
皆様、NeoVimのプラグイン開発やってますでしょうか。今回はプラグイン開発の上で役立つTipsを紹介します。
<!-- more -->

## 解決したい課題： `os.execute`を使うとUIがブロックされてしまう

NeoVimでターミナルコマンドを実行する際、`os.execute`が使えます。
しかし、これには問題があり、UIがコマンド終了までブロックされてしまいます。

以下のサンプルコードを実行すると、NeovimのUIが3秒間操作を受け付けなくなってしまいます。

{% codeblock sample.lua lang:lua %}
os.execute("sleep 3")
-- 3秒経つまで実行されない、その間UIはブロックされる
vim.print("sleepが終わりました")

{% endcodeblock %}

これではユーザーが他の操作を行うことができず、使い勝手が悪いです。

今回はこの問題を解決する方法を紹介します。

## 解決方法: `vim.loop.spawn`を使う

NeoVimには非同期処理を行うための便利なモジュールである`vim.loop`があります。
次のサンプルコードを見てください。これを実行すると、UIはブロックされずに`sleep`コマンドが実行されます。また、`uv.spawn`以降のコードはコマンドの終了を待たずに実行されます。

{% codeblock sample.lua lang:lua %}
-- 実行するコマンドの引数。ここでは3秒sleepさせるため、3
local options = {"3"}
local handle, pid = uv.spawn("sleep", {
    args = options,
}, function(code, signal) -- コマンド終了時に実行されるコールバック
    vim.print("sleepが終わりました")
end)
vim.print("プロセスID："..pid)

-- 実行結果
-- プロセスID 9999
-- sleepが終わりました

{% endcodeblock %}

このように、`vim.loop.spawn`を使うことで、UIをブロックせずにコマンドの非同期実行が可能になります。コードの実行結果は、コールバック関数内で処理することができます。

## 補足
`vim.loop.spawn`で実行できるのはターミナルで実行するコマンドだけです。

例えば普通のLua関数を定義して、それをUIブロックせずに呼び出す方法は私は見つけられませんでした。
`vim.loop`関連の関数で非同期な関数実行を実現できますが、UIはプログラムが終了するまでブロックされてしまいました。もし、良い方法を知っている人がいたらご連絡ください。

`vim.loop`の公式ドキュメントがとても学びが深いです。

[https://neovim.io/doc/user/lua.html#vim.uv](https://neovim.io/doc/user/lua.html#vim.uv)

ドキュメント内では`vim.uv`として紹介されていますが、私の環境(NVIM v0.9.1)では`vim.loop`としないと動きませんでした。
## まとめ
今日は`vim.loop.spawn`の解説でした。
それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。

[Luaで最小構成のNeoVimのプラグインを作る](2022/12/2022-1222-nvim-plugin/)

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
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZRXQP" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=210117795527&wid=001&eno=01&mid=s00000011866006009000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZRXQP" alt="">

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">
