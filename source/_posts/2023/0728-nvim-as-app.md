---
title: NeoVimをアプリとしてFinderから開く
tags:
  - NeoVim
categories: 技術
featured_image: thumb.png
date: 2023-07-28 15:29:25
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

NeoVimをメインのエディタとして使っています。
基本的に文句はないのですが、一つだけ気になるのがGUIから起動できないことです。
<!-- more -->

MacならFinder、WindowsならExplorerなどGUIのファイラーがあると思いますが、
何かファイルをファイラーからポチッとNeoVimで開くみたいなことはデフォルトではできません。

これをなんとかしようと思ってなんとかしてみました。

## 解決方法

Macの場合、Automatorを使ってAppleScriptからVimを起動するScriptをアプリケーションとして使えるみたいです。

もし、TerminalでVimを使っているなら、このレポジトリに載っている方法でいけるとのこと。

https://github.com/yongrenjie/osx-vim-app

## 問題点

私はターミナルアプリとしてHyperを使っています。

[https://hyper.is/](https://hyper.is/)

フロントエンドのホスティングでお馴染みのVercelが作ってるアプリです。

問題は上記の方法がHyperに対しては使えないことです。
(iTermを使っている人のためのスクリプトもこの記事の最後に紹介しています。)

### Hyper用にScriptを書く
なので、ChatGPTに聞きながら以下のようなApple Scriptを書きました。

(こうゆう使ったことのないスクリプト言語を書かなければいけないときなどにChatGPTはとても便利ですね。)

{% codeblock NeoVimApp.scpt lang:applescript%}
on run {input, parameters}
    # パスを受け取る
	try
		set filePath to POSIX path of input
	on error errMsg
		set filePath to ""
	end try
	
    # Hyperがすでに開いてたら新しいWindowを開く
	if application "Hyper" is running then
		tell application "Hyper"
			activate
			tell application "System Events" to tell process "Hyper"
				keystroke "n" using command down
			end tell
		end tell
	end if
	
	# nvim "filepath" コマンドを打つ
	tell application "Hyper"
		activate
		tell application "System Events" to tell process "Hyper"
		    # ちょっと待つ
            delay 0.3
			keystroke "nvim " & quote & filePath & quote & return
		end tell
	end tell
end run

{% endcodeblock %}

ちょっと待つとかkeystrokeとか怪しいことをしてるのは見逃して欲しいです笑

Hyperに対してWrite textが使えなかったのです。公式repoにissueがありますね。

[https://github.com/vercel/hyper/issues/540](https://github.com/vercel/hyper/issues/540)

 Issueはあるものの直っていないのにクローズされているので、
  AppleScriptへの対応は今後も期待しない方がいいと思います。

### ScriptをAutomatorでアプリケーションとして保存する
あとはこれをAutomatorに登録するだけです。
Automatorを開いてApplicationを選択します。

{% asset_img 01.png %}

ActionsからRun AppleScriptを選択して先ほどのスクリプトを貼り付けます。

{% asset_img 02.png %}

そしたらそれをApplicationsフォルダ内に保存します。このとき保存する名前がアプリ名になります。

私はNeoVimAppとしました。

そこまでできたらアプリケーションが追加されているはずです。

{% asset_img 03.png %}

### アイコンを変える

私はせっかくなのでアイコンを変えました。

アイコンの変え方は、まずアイコンにしたい画像をコピーします。

私はここからもらいました。本当にブラウザから画像をクリップボードにコピーするだけです。

[https://www.iconarchive.com/show/papirus-apps-icons-by-papirus-team/nvim-icon.html](https://www.iconarchive.com/show/papirus-apps-icons-by-papirus-team/nvim-icon.html)

アプリケーションを右クリックして、Get Infoを開きます。

左上にデフォルトのアイコンが表示されるので、それをクリックし、Command + Vするとアイコンが変わります。

### デフォルトで開くようにする

例えば.phpファイルをNeoVimで開きたい、というときは以下の手順でデフォルトで開くアプリを変えます。

- PHPファイルを右クリック
- Get Info
- Open WithをNeoVimにする
- Change All…ボタンをクリック
  

{% asset_img 04.png %}

## まとめ
実はこのスクリプト、不安定な動きをするので今度改良版を出せたら良いなと思っています。
特に日本語入力がオンになっているとうまく動作しないのは良くないですね。
HyperはElectronでできているのでAppleScriptとうまく合わない部分があるようです。

またもっと良い方法をご存知の方は教えてください。

最後まで読んでいただきありがとうございました。
それじゃ今日はこの辺で。

## 追記(2023/08/01)
Hyperでやるのは不安定すぎたのでiTerm版を書きました。

こちらはkeystrokeの代わりにwrite textが使えるので、日本語入力がオンになっていても動作します。

{% codeblock NeoVimApp.scpt lang:applescript %}
on run {input, parameters}
	# パスを受け取る
	try
		set filePath to POSIX path of input
	on error errMsg
		set filePath to ""
	end try
	
	
	# nvim "filepath" コマンドをiTermで実行
	tell application "iTerm"
		set newWindow to (create window with default profile)
		if filePath is "" then
			tell current session of newWindow
				write text "nvim"
			end tell
			activate
		else
			tell current session of newWindow
				write text "nvim " & quote & filePath & quote & ""
			end tell
			activate
		end if
	end tell
end run

{% endcodeblock %}
## 関連記事
こちらの記事もおすすめです。  

[Luaで最小構成のNeoVimのプラグインを作る](/2022/12/2022-1222-nvim-plugin/)
