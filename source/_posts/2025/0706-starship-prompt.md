---
title: Starship Promptでぼくの考えたさいきょうのターミナルを作る
tags: Starship Prompt, ターミナル
categories: 技術
featured_image: thumb.png
date: 2025-07-06 23:31:57
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

皆さん、プロンプトはご存知でしょうか？

プロンプトとはターミナルを開いたときに左側に出るユーザ名とかマシン名を表示しているあれです。

```bash
karinto@macbook:~$

```
<!-- more -->

突然ですが、~~ぼくの考えたさいきょうのプロンプト~~私のプロンプトをご覧ください。

{% asset_img 01.png [プロンプト] %}

どうでしょうか。

私だけかもしれませんが、カラフルなアイコンと細々した数字が出ているUIに惹かれるんですよね。コクピットみたい、といったら伝わるでしょうか。ターミナルを開くたびに笑顔になってしまいます。

<u>プロンプトをカスタマイズするのがこんなに楽しいことだったとは正直、知りませんでした。</u>

これは私が最高だと思うプロンプトですが、あなたも自分が最高だと思えるプロンプトを作ってみたくなりませんか？

## プロンプトをカスタマイズするには

プロンプトは特にツールを入れなくても`.bashrc`などでカスタマイズできなくはないのですが、そのためにはPS1というクセの強い言語（？）を覚える必要があります。PS1の例は以下のような感じです。

```bash
# PS1の例
PS1='\u@\h:\w \t$ '

```
でもちょっととっつきづらいですよね？

そこで、この記事で紹介するStarship Promptが使います。

<u>Starship PromptはPS１より可読性の高いtomlで設定ができ、PS1にはない機能もたくさんあるプロンプトのカスタマイズに特化したソフトウェアです。</u>またRustで書かれているため高速とのことです。

この記事ではそんなStarship Promptの使い方を紹介していきます。

## インストール

Starship Promptはこの手のツールにしては珍しく（？）日本語対応がしてあります。

多分AI翻訳だと思いますが、ありがたいですね。

[https://starship.rs/ja-JP/](https://starship.rs/ja-JP/)

<u>インストールもこちらのページに従うだけですが、NerdFontが必要です。</u>

私はUbuntuを使っているので、以下のコマンドを実行するだけでした。

```bash
curl -sS https://starship.rs/install.sh | sh

```

## プリセット

<u>いきなりTomlを編集するのはちょっとハードルが高いので、用意されているプリセットから自分が目指すプロンプトに近いものを雛形として選ぶのがかんたんと思います。</u>

こちらのページから好きなものを選んでみたください。

https://starship.rs/ja-JP/presets/

私は基本的にシェルもnvimもcatppuccinのカラーテーマを使うのでcatppuccinのプリセットを使うところから始めました。

## Starship.toml

プリセットで一通り遊んだら自分の好きにプロンプトをカスタマイズしましょう。

`~/.config/starship.toml` に設定ファイルがあります。

この記事では細かい文法などは公式におまかせして、個人的に使っている設定を紹介します。

<u>最近はこういうツールの設定などは割とChatGPTに聞いたらよしなにやってくれるので、どんなことができるのか知るほうが大事かなと思います。</u>

## 自分が使っているフォーマット

設定ファイルの中には`format`というフィールドがあります。

これはPS1と同じコンセプトで、プロンプトに何をどんなスタイルで表示するかを記述したものですが、PS1より読みやすくなっています。

トップレベルのものとモジュール（次に解説します。）レベルのものがあります。

私のトップレベルのフォーマットはこんな感じです。細かいことは覚えなくて大丈夫で、なんとなくこんなこんな雰囲気なんだなーと思ってもらえれば大丈夫です。

それとこの記事全体に言えることですが、NerdFontのアイコンがうまく表示されていません。なるべくコメントをつけようと思います。

```bash
format = """
[ ](mauve)\   # >_みたいなターミナルのアイコンを入れてます。
$sudo\         # sudoパスワードキャッシュの有無
$time\         # 現在時間
$directory\    # 現在のパス
$git_branch\   # Gitブランチ
$git_status\   # Gitステータス
$status\       # 最後に実行したコマンドの結果
$cmd_duration\ # 最後に実行したコマンドの実行時間
$line_break    # 改行
$character"""  # >マークを表示

```

<u>ここで例えば`$time` という行がありますが、これはそのまま時間を表示するモジュールを指しています。他にも`$git_branch`だったらGitのブランチ名を表示する、など割と直感的になっていることが分かると思います。</u>

## おすすめのモジュール

先程もサラッと説明しましたが、Starship Promptはモジュールという概念があります。

<u>ここでは私のおすすめのモジュールを紹介します。</u>

## timeモジュール

`$time` はそのまんまですが、時間を表示します。私は以下のような設定で、`style`にラベンダー色を指定し、フォーマットは`%T`、つまり`00:34:60`のようになります。

```bash
[time]
disabled = false
time_format = "%T"
style = "lavender"
format = '[ $time |]($style)'

```

## directoryモジュール

個人的には必須です。<u>自分が今どのフォルダにいるのかを表示してくれます。</u>

デフォルトでは、もしGitのレポジトリだったら、レポジトリのルートをルートとして表示してくれるようになっています。

自分の設定はこんな感じです。

```bash
[directory]
style = "blue"
format = "[  $path |]($style)"
truncation_length = 3
truncation_symbol = "…/"

```

## Git関連

Git関連のモジュールはいくつかあるのですが、私は`git_branch`と`git_status`を使っています。

`git_branch` は文字通り、自分が今どのブランチを使っているのかを表示します。

<u>`git_status` はローカルの変更状況（untracked, stagedなど）とリモートと比べた状態（ahead, behind, divergedなど)を表示してくれます。</u>

結構便利です。

```bash
[git_branch]
symbol = ""
style = "sapphire"
format = '[ $symbol $branch ]($style)'

[git_status]
style = "sapphire"
format = '[$conflicted$deleted$renamed$modified$staged$untracked$ahead_behind |]($style)'
up_to_date = '✓'

```

## cmd_durationモジュール

これはコマンドの実行にかかった時間を表示、または通知を送ってくれます。

<u>表示と通知それぞれに閾値を設定できて、私は700ms以上のコマンドは実行時間を表示、45秒以上かかったコマンドは通知を送るように設定しています。</u>

```bash
[cmd_duration]
show_milliseconds = true
format = "[ 󰾆 $duration ]($style)"
style = "fg:rosewater"
disabled = false
show_notifications = true
min_time_to_notify = 45000
min_time = 700

```

## statusモジュール

これは実行したコマンドの返り値を表示します。

<u>私は成功したら✅、エラーなら❌と終了コード、終了コードの意味（Command not foundなど）を表示させています。</u>

```bash
[status]
style = "fg:green"
format = '[$symbol]($style)'
disabled = false
success_symbol = "[  ]($style)"
symbol = "[  $status $common_meaning](bold fg:red)"

```

## sudoモジュール

これはシンプルで`sudo`コマンドのパスワードがキャッシュされていたら🔒マークを表示させています。地味に便利です。

## 言語のバージョン

私は有効にしていませんが、プロジェクトの設定ファイル、例えばJSならpackage.jsonなどを見てその言語のバージョンを表示するなども設定できます。

## おまけ

私のstarship.tomlの全文はこちらから見られます。

記事内にコピペしてもいいのですが、Nerdfontがうまく表示できないので、GitHubからダウンロードして開いてもらったらいいと思います。

[https://github.com/karintomania/dotfiles/blob/main/.config/starship.toml](https://github.com/karintomania/dotfiles/blob/main/.config/starship.toml)

## まとめ
<u>少しでもStarship Promptの楽しさが伝わったでしょうか。</u>この記事で紹介した以外にもたくさんの機能・モジュールがありますので、ぜひ試してみてください！

それじゃ今日はこの辺で。

{% adv 0 %}

## 関連記事
こちらの記事もおすすめです。  

[コマンドラインでPDF関連の処理（一つにまとめる、サイズを圧縮する）](/2025/05/2025-0512-pdf-command-line/)