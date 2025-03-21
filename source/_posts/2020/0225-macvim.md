---
title: Mac Vimを導入してみた
tags: Vim
categories: 技術
date: 2020-02-25 18:22:36
---


## テキストエディタへのこだわり
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
皆さん、突然ですがテキストエディタは何を使っていますか。  
僕は開発の際はVSCodeを使い、それ以外の簡単なテキストはMac標準のテキストエディットを使っていました。 
ある日突然気づきました。 **これってダサいのでは？**  
言うなれば、WindowsでIE使い続けているようなものではないかと。  
Vimを使うしかない、とその時、確信しました。
<!-- more -->
もう少し補足をすると、僕はVSCodeではVimキーバインドの拡張機能を入れていたのでVimのコマンド自体には馴染みがありました。  
しかし、ただのメモをするだけの時などにVSCodeでは重いので、  
サクサク動くテキストエディタを必要としていました。  

業務でWindowsを使うときはサクラエディタがその役目を果たしていたのですが、  
Macで似たようなソフトを見つけられず、テキストエディットに甘んじていたのです。  
あのときなぜVimという選択肢が浮かばなかったのか。。。

## この記事の対象読者
- Vimに興味ある人  
- Macbook使いでテキストエディタに悩んでいる人  

## Vimの何がいいのか
これについてはもっと良い記事がその辺で見つかると思うので、僕の感じていることを少しだけ。  
パソコンで文章を書くメリットの一つとして、書き換えが簡単、ということがあると思います。   
Vimを使うと、この書き換えの作業というのがとても素早くできるってイメージですね。  
例えば、行を入れ替えたいときとかは入れ替えたい行にカーソルを置いてddyと打てばそれで終了です。  
あとはコマンドをひたすら覚えていくのが楽しい、というマニアックな楽しみ方もあります。  
学習コストが高いほど燃えるのがプログラマなのではないでしょうか。  
（それに伴って享受できるメリットが大きければ、という前提はありますが。）  

## インストール
実はMacbookには元々Vimが入っているのですが、今回紹介するのはMacVimという別ものです。  
違いとしてはVimはターミナルからの利用を想定しているに対して、  
MacVimは普通のアプリケーションのように使用できるところです。  
Vimガチ勢の中にはMacVimを邪道と考える人もいるとかいないとか。  


macvim.dmgをここからダウンロードしましょう。

ReleaseのところからMacVim.dmgをダウンロードしてきてください。  
https://github.com/macvim-dev/macvim
{% asset_img 01_download.png [Vimのダウンロード %}
インストールは普通のMacアプリと同じ感じです。  


## vimrcの設定
実はVimは設定を多少しないと、デフォルトでは割と使いづらいエディタです。  
これがVim普及の妨げになっているのではないかとも思っているくらいです。  
設定でどのくらい変わるのかというと、  
こいつが
{% asset_img 02_origin.png [見辛いVim] %}
こんな感じになります。
{% asset_img 02_set.png [見やすくなったVim] %}
見た目だけでも大した違いですが、  
キーバインドなどで相当な操作性の違いが出てきます。  
一つ一つ見ていきましょう。  

## vimrcファイルの作成
vimの設定はvimrcファイルというファイルに記述していきます。  
GUIでの設定画面もあるにはあるんですが、わかりづらい上に設定は保存されません。
そんなんだからとっつきづらいんだよなーと思いつつも、  
設定ファイルになっていることで先人の設定をコピペで丸パクリできる、なんてメリットもあります。  

さて、まずはvimrcファイルを作ります。  
root/User/{User名}配下に.vimrcと.gvimrcというファイルを作ってください。  
```
root/User/{User名}
 ┣.vimrc
 ┗.gvimrc
```
このgvimrcはguiに関する設定が入ります。  
root/usr/share/vim配下にもvimrcというファイルがあるのですが、  
~~そいつはフェイクだ！~~編集できません。できるのかも知れませんが、僕はできませんでした。  
無難に自分の権限のあるところでやりましょう。  

## 見た目系の変更
まずは分かりやすい見た目の変更から行きます。  
そのままだとフォントが小さくてみづらいので、フォントを変えます。  
Edit->Font->Show Fontsからフォントがプレビューできます。  
適当に好きなフォントとサイズを選びましょう。  
設定したフォントは以下のコマンドで表示できます。  
```
:echo &guifont
```

フォントの設定が分かったらそれを.gvimrcに記述します。  
```
set guifont=Osaka-Mono:h18
```
フォントは変わったでしょうか。  


ここからは.vimrcファイルの設定に入っていきます。  
見た目系の設定で言うと、以下のあたりを設定すると良い感じに充実してきます。  
ちなみにステータスラインとは、Vimを開いた時に下の方に見えている欄のことです。  

```
" 行番号表示
set number

" Status Line系の充実
" ステータスラインを常に表示
set laststatus=2 
" 現在のモードを表示
set showmode 
" 打ったコマンドをステータスラインの下に表示
set showcmd 
" ステータスラインの右側にカーソルの現在位置を表示する
set ruler 
" メニュー補完
set wildmenu


" 不可視文字の可視化
set list
set listchars=tab:>_,trail:·,eol:↲
```

## カラースキームの設定
また、Vimはカラースキームを設定できます。  
おそらくコードを書く時などはデフォルトもそれなりに使えるかも知れませんが、  
僕の用途は（.txtと言う意味の）テキストを編集することが主な用途なので、  
デフォルトだとちょっと薄暗くて見づらいので変えてみます。

カラースキームを選ぶ際には、こちらのページを参考にしました。  
[vimカラースキームランキング](https://www.slant.co/topics/480/~best-vim-color-schemes)
ここから選びたいスキームの.vimファイルをダウンロードしてきます。  

僕はZenburnというテーマを設定してみました。  
ダウンロードした.vimファイルを
root/User/{User名}/vim/color/フォルダに配置します。  

```
" Color scheme
syntax enable  " シンタックスハイライトを有効にする
colorscheme zenburn  " zenburnをカラースキームに設定
```
これでVimを再起動するとだいぶ良い感じになっているかと思います。  


## テキストエディタとして必要な設定
あとは、おすすめの設定を以下に書いておきます。  
というか、クリップボードやエンコーディングについてはテキストエディタとしてないと使い物にならない系なので、設定しとくことをお勧めします。  

```

" ヤンクやペースト時クリップボードの内容を使用する
set clipboard=unnamed 

" encoding 日本語を編集する際に大事
set encoding=utf-8
set fileencodings=utf-8
set ambiwidth=double  " ◯や◆などの文字が半角の幅で表示されてしまうことを防ぐ

" auto indent
set autoindent
set smartindent

" tab
set tabstop=4  " タブの幅をスペース４つ分にする
set shiftwidth=4

" search
set smartcase  " 大文字が検索文字に含まれていたときは大文字小文字を区別する
set hlsearch   " 検索キーワードをハイライトする

```

## キーバインド
Vimでは自分の好きなショートカットを登録することができます。  
ここでは僕が登録しているキーバインドを紹介します。  
ちなみにMacのcommandボタンとの同時押しは```<D-x>```と表示します。  
Windowsのノリで```<C-x>```で登録するとCtrlキーになってしまいます。  

```
" Key binds
nnoremap <D-Enter> o<ESC>  " Command+Enterで改行
noremap H ^  " Shift+hで行先頭ジャンプ
noremap L $  " Shift+lで行末ジャンプ
remap kj <ESC>  " k+jでEscape
nnoremap <D-]> >>  " Command+]でインデントをふやす
nnoremap <D-[> <<  " 上のやつの逆

vnoremap <D-]> >gv  " Visualモードでのインデント。gvで同じ範囲の再選択
vnoremap <D-[> <gv  " 上に同じ
```

僕はこんな感じでキーバインドをしています。  
参考になれば幸いです。  

それでは今回はこの辺りで。  
Happy text editing!!

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
