---
title: NeoVimにもworkspace.jsonが欲しい（フォルダ固有の設定をしたい）
categories: 技術
featured_image: thumb.png
date: 2023-11-22 15:29:25
tags: [NeoVim, NeoVimプラグイン]
---

## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
NeoVimを使っていて、プロジェクトごとの設定をしたいときがあったので、私なりの解決方法を共有します。
（完全に自己流ですので、それを承知した上で読み進めてください。）
<!-- more -->

## ユースケース
<u>プロジェクトごとにNeoVimの設定ができると嬉しいことが多いです。</u>
例えば、私はPHPメインで仕事をしているのですが、趣味でPythonを書いたりしていて、どちらのプロジェクトでもコードフォーマットをExコマンドの「:Format」に割り当てています。
ただ、PHPとPythonで内部で呼び出すものが違いますよね。
（PHPならphp-cs-fixer、Pythonならblackを走らせたい）
Exコマンド以外にも、<u>init.vimに書きたいけど、いつも使うわけではなく特定のプロジェクトにだけ適用したい</u>みたいな設定は割とあると思います。

なので、VS codeのworkspace.jsonに倣って、workspace.vimなるものを作ってみました。

## Autocommandを設定する
workspace.vimは特にプラグインとかではなく、Vimスクリプトで実現しています。
まずはinit.vimに以下のvimスクリプトを足します。

{% codeblock init.vim lang:vim %}
autocmd FileType nerdtree exec "call LoadWorkspaceIfExists()"

function! LoadWorkspaceIfExists()
  // workspace.vimの有無を確認
  let l:tree_root = b:NERDTree.root.path.str()
  let l:workspace_file = l:tree_root . "/workspace.vim"

  // workpsace.vimがあれば実行
  if filereadable(l:workspace_file)
    exec "source " . l:workspace_file
  endif
endfunction

{% endcodeblock %}

こうすると、<u>フォルダをNeoVimで開いた際にそのフォルダ内にworkspace.vimファイルがあれば自動で実行してくれます。</u>

私はNERDTreeを使っているのでこんな感じですが、他のプラグインを使っている人も似たようなコードになると思います。

## workspace.vimを試す
それでは実際にworkspace.vimを試してみましょう。
適当な場所にフォルダを作って、そのフォルダ内にworkspace.vimを作成します。

workspace.vim内にはvimスクリプトなら何でもかけます。
私はよくNeoVimで開いているファイルに対して、CLIツールを実行するExコマンドを定義します。

試しに開いているファイルに`wc`を使って、ファイル中に含まれる単語数を表示するExコマンド、「:WordCount」を定義してみます。

{% codeblock init.vim lang:vim %}
function! s:showWordCount()
    " ファイルのフルパスを取得
    let l:path = expand('%:p')
    " 実行するコマンドを生成。wcとawkでファイルの単語数を取得。
    let l:cmd = "wc -w " . l:path . " | awk {'print $1'}"

    " コマンドの実行、改行文字の削除
    let l:result = system(l:cmd)
    let l:wordCount = substitute(l:result, "\n$", "", "")

    " 結果の表示
    echo "このファイルは" . l:wordCount . "個の単語を含んでいます。"
endfunction

" Exコマンドに関数の実行を割り当てる
command! -nargs=0 WordCount call s:showWordCount()

{% endcodeblock %}

そしたらNeoVimでこのフォルダを開いてみてください。
このworkspace.vimが実行され「:WordCount」が定義されているはずです。

何かファイルを開いて「:WordCount」を実行すると単語数が表示されるはずです。
私のPHPプロジェクトでは開いているファイルのフォーマッターを走らせたり、テストを実行するなどのコマンドを定義しています。

もちろんこれ以外でも特定のプラグインをOn/Offしたり、プロジェクト固有のショートカットや変数を宣言したり、できることは無限です。
プロジェクトごとに定義できるので、言語が違うプロジェクトでも共通のコマンドを使うことができるのが良い感じです。

## まとめ
この記事ではプロジェクト固有の設定ができるworkspace.vimの使い方を説明しました。
NeoVimは色々なプラグインがありますが、フォルダ単位で設定を保存するにはこの方法がシンプルでしっくりきました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[NeoVimをアプリとしてFinderから開く](/2023/07/2023-0728-nvim-as-app/)
