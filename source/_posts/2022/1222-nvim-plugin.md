---
title: Luaで最小構成のNeoVimのプラグインを作る
tags:
  - NeoVim
  - Lua
  - NeoVimプラグイン
categories: 技術
featured_image: thumb.png
date: 2022-12-22 08:10:31
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

最近NeoVimを触っています。
色々なプラグインでカスタマイズできるのが魅力ですが、自分でプラグインを作れたら楽しいと思います。
<!-- more -->

今回は最小構成で作るNeoVimプラグインを紹介します。
この記事で紹介しているソースを見たい人はGitHubを見てみてください。
[https://github.com/karintomania/simple-nvim-plugin](https://github.com/karintomania/simple-nvim-plugin)

## 作るもの
とりあえずHello worldするプラグインを作ってみます。

作業環境は以下の通りです。

- Mac OS Monteray
- NeoVim v0.8.1

## プロジェクト構成
プロジェクトのフォルダ構成は以下の通りです。

```
/simple-nvim-plugin
└── lua
    ├── simple-nvim-plugin
    │   └── testModule.lua
    ├── simple-nvim-plugin.lua
    └── run.lua

```

細かく説明していきます。

## luaフォルダ

### lua/simple-nvim-plugin.lua
<u>このファイルがプラグインのメインのファイルになります。</u>
本当に最小限の構成にするならこのファイルだけで完結します。

ただ、実際のプラグイン作成では次の章で解説するモジュール読み込みを使って
ファイルを分割するのがおすすめです。

ファイルの中身はこんな感じです。

```lua
-- テーブルを宣言する
local M = {}

-- モジュールの読み込み
local testModule = require('simple-nvim-plugin/testModule')

-- 関数宣言
function M.test()
	print('hello world');
end

-- モジュールの関数を呼び出す
function M.callModule(str)
	testModule.test(str)
end

-- テーブルを返す
return M
```

Mというテーブルを作り、そこに関数を生やしていって最後にMをリターンしています。慣例的にMという変数名を使うようです。おそらくModuleのことだと思います。
テーブルはLuaのデータ構造でJSでいうところのオブジェクトです。

### lua/simple-nvim-pluginフォルダ
このフォルダにはモジュールを切っていきます。
testModuleという引数をオウム返しするだけのモジュールを作ってみました。
ファイルの中身はこんな感じです。

```lua
local M = {}

function M.test(str)
	if str ~= '' then
		print(str)
	else
		print('input string!')
	end
end

return M
```

大体メインのファイルと同じ流れで、
テーブル宣言→関数宣言→リターン
という流れです。

<u>モジュールをわざわざ`/simple-nvim-plugin`というフォルダを一階層増やして作っているのは他のプラグインに同名のモジュールがあった際のエラーを無くすためです。</u>

フォルダ名を`/simple-nvim-plugin`とすることで`test`という名前のモジュールを読み込む際、
`requrie(’simple-nvim-plugin/test)`となるので他のプラグインが`test`というモジュール名を持っていても大丈夫です。

名前空間みたいな感じです。

### lua/run.lua
このファイルは必須ではないですが、<u>開発中にプラグインをデバッグするためのファイルです。</u>

```lua
-- キャッシュされたモジュールを削除
package.loaded['simple-nvim-plugin'] = nil
package.loaded['simple-nvim-plugin/testModule'] = nil

-- モジュールを呼び出す
local simple = require('simple-nvim-plugin')

-- 関数呼び出し
simple.test()
simple.callModule('test')
simple.callModule('')
```

ファイルの先頭でキャッシュの削除をしています。

<u>Luaは読み込んだモジュールをキャッシュするので、それを削除しないとモジュール内のコードの変更が毎回反映されないため、このようにしています。</u>

関数呼び出しのところでテストしたい関数を呼びます。

assert()関数などを使うことでユニットテストを書くことも可能です。

## 実行
開発中はrun.luaファイルをNeoVimから実行することでデバッグを行います。
そのためのコマンドは以下になります。

```
:luafile run.lua
```

また、luaをさくっと実行するには以下のコマンドが使えます。

```
:lua print('hello')
```

## NeoVimでプラグインを読み込む
 無事にプラグインができたら、それをNeoVimで読み込んでみましょう。
init.vimに設定を書き込んでいきます。

Plugを使っていればローカルのプラグインは以下のように読み込めます。
パスはDocuments配下にプロジェクトがあることを想定しているので、適宜書き換えてください。

```
Plug '~/Documents/simple-nvim-plugin'

```

もちろんGitHubにソースをアップロードしているなら普通のプラグインのようにインストールできます。

## プラグインにキー・コマンドを割り当てる

プラグインを読み込んだだけでは何もしないので、
キーマップやコマンド割当をinit.vimに追記します。

```
nnoremap <F9> <Cmd>lua require('simple-nvim-plugin').test()<CR>
command! -nargs=? Simple lua require('simple-nvim-plugin').callModule(<q-args>)

```

一行目はキーマップの割当でF9を押すとtest()関数を実行するようにしています。

また二行目では`:Simple xxx`というExコマンドでcallModule()関数を実行できるようにしています。

引数ありのコマンドの参考にしてみてください。

## Luaを覚える

最後にLuaを使ってプラグインを書く際に役立ったLuaという言語についての情報を書いてきます。

基本的な文法を覚えるには以下のリンクがおすすめです。
とりあえずソースの部分をざっくり読むだけでも大体の雰囲気がつかめると思います。

[https://learnxinyminutes.com/docs/lua/](https://learnxinyminutes.com/docs/lua/)

[Notes/Lua_Quick_Guide.ipynb at main · medwatt/Notes](https://github.com/medwatt/Notes/blob/main/Lua/Lua_Quick_Guide.ipynb)

## Vim固有のLua
NeoVim上でLuaを動かす際に役立つ書き方を紹介します。
vim変数を使ってapiやvimの関数、コマンドにアクセスすることが可能です。

### vim.api

`vim.api.xxxx`　と書くことでNeoVimのAPIが使えます。

```
:lua print(vim.api.nvim_get_current_buf())
// 現在のバッファハンドルが表示される

```

上記のコードは現在のバッファのハンドル（IDみたいなもの）を取得できます。
バッファ上で何か操作したいときに使えます。

どのようなAPIがあるかは`:help API`を実行してみてください。

### vim.fn

`[vim.fn.xxx](http://vim.fn.xxx)` と書くことでVimscriptの関数が使えます。
例えば`strlen`関数を実行したい場合は以下のようになります。 

```
:lua print(vim.fn.strlen('abc'))

// 実行結果
3

```

こちらもVimscriptにたくさん関数があるので、それらを使いたいときに良いです。

Luaがシンプルな言語なこともあって、やりたいことがLuaですっきりとできない際にVimscript標準の関数に助けられることもあります。

関数の一覧が`help function-list`コマンドで見ることができます。

### vim.cmd

Exコマンドを実行できます。
例えば新しいバッファを開く`:enew`コマンドを実行したい場合は以下のようになります。

```
:lua vim.cmd('enew')
// 新しいバッファが開く

```

ちなみに普通のキーストロークは`:normal`コマンドを使うことで実現できます。

```
:lua vim.cmd('normal j')
// カーソルが一行下に移動する

```

### Lua API

`vim.api` / `vim.fn` / `vim.cmd`はNeoVim、またはVimscriptの仕組みをLuaから使うためのものでした。
それ以外の`vim.*`　はLuaの標準ライブラリとしてのVimモジュールとして定義されています。

例としては`vim.pretty_print()`があり、 `print()` ではちゃんと表示できないテーブルをデバッグしたいときに使えます。

```
:lua vim.pretty_print({x=1})
//実行結果
{                                                                                                                                                            
  x = 1
}

//ただのプリントではうまくデバッグできない
:lua print({x=1})
//実行結果
table: 0x0102b11260
```

APIの一覧はこちらからどうぞ。

[https://neovim.io/doc/user/lua.html#lua-stdlib](https://neovim.io/doc/user/lua.html#lua-stdlib)

## もっと詳しく知りたい人は…

もっと詳しく知りたい人のために勉強になるリンクを紹介します。

[https://github.com/nanotee/nvim-lua-guide](https://github.com/nanotee/nvim-lua-guide)

NeoVimのLuaガイドです。NeoVimでLuaを動かすために必要な知識が一通り書いてあります。
全部読むというよりリファレンスとして使うのが良いかもしれません。

[How to Write a Neovim Plugin with Lua](https://www.linode.com/docs/guides/write-a-neovim-plugin-with-lua/)

Linodeが出しているプラグインの作り方です。
実際にプラグインを作理ながら解説してくれているので実践的な内容になっています。

[https://github.com/karintomania/nvim-ai-chat](https://github.com/karintomania/nvim-ai-chat)

手前味噌ですが、私が開発したプラグインです。
実際のプラグインを見て勉強したい人は開いて見ください。
大して複雑なことをしていないので笑、簡単に読めると思います。

OpenAIのAPIにVimから直接質問できるプラグインで、そこそこ便利なので興味があれば使ってみてください。

## まとめ
いかがでしょうか。

 Vimのプラグイン開発やLuaの情報は日本語のものがまだ少ないのでこのブログでも少しずつ取り上げて行けたら良いなと思っています。
プラグイン開発のハードルが少しでも下がってコミュニティが盛り上がって欲しいです。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[Mac Vimを導入してみた](/2020/02/2020-0225-macvim/)

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
