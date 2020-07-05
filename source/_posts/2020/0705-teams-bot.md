---
title: 【Microsoft Teams】Botもどきをnode.jsを使って30分で実装する
tags:
  - node.js
  - Bot
  - node
categories: 技術
featured_image: thumb.png
date: 2020-07-05 12:31:09
---


## 背景
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

Miccrosoft Teamsを職場で使っている。  

<u> こういったコミュニケーションツールを見ると、</u>  
<u>Botを作ってみたくなるのは開発者の性である。</u>

今回はそんな記事。  

<!-- more -->

この記事ではnode.jsを使ったが、POSTさえできれば何でもいいので、  
色々なサービスと組み合わせて遊べる気がする。  

**注意**
今回作るのはBotではなく、Botもどき。  
（ちなみにBotもどきという言葉は多分ない。私が勝手に言っているだけ）

何が違うかというと、<u>こいつができるのは一方的な通知のみである。</u>  
人間からのメッセージを取得して、それを処理するとかはできない。  

それでも、それなりに使い方はあるかと思う。  
・他のプログラムと組み合わせて、処理完了/エラーを通知
・Webスクレイピングと組み合わせて、毎日、最新情報を教えてくれる


## 前提条件
- Teamsがインストール済み
- node.js インストール済み

今回の記事ではこの２点が必要。  
ただし、繰り返しになるけども、nodeである必要はない。  

## 大まかな流れ
Teamsの作業と実装の2パートがある。  

Teams側では、Connectorを作成する。  
これはBotが発言するためのガワとなるアカウントみたいなもの。  

実装は、Teamsで作ったConnectorにPOSTを投げる処理を実装する。  

それでは一つずつ解説する。  

## Connectorを作る

Botを作りたいチームの設定ボタンを押して、  
Connectorsを選択。  
{% asset_img 01_connector.png %}

Connectorの中から、  
incoming webhookを選択。  
{% asset_img 02_incommingwebhook.png %}

設定画面が開くので、Botの名前と画像を設定する。  
設定したらCreateボタンを押す。  
{% asset_img 03_settings.png %}


作成できたら、<u>URLが表示されるので控えておく。</u>  
{% asset_img 04_callbackUrl.png %}

これでTeams側の設定は完了。  
多分10分くらいしか経っていないかと思う。  


## 実装
実装も実装で簡単に終わる。  

適当なフォルダ作って、フォルダ内で以下コマンドを実行。  
一応だけどコマンドプロンプトで実行ってことね。  
```
npm init -y
```

-yオプションは設定とか諸々すっとばすオプション。（と私は思っている）  
ちゃんとしたい人はちゃんと設定してあげてください。  

今回はHTTPリクエストを飛ばすのに、axiosというライブラリを使う。  
引き続き、同じフォルダ内で以下のコマンドを実行。  
```
npm install axios
```

次に、フォルダにindex.jsというファイルを作成する。  

中身はこんな感じで実装する。まあシンプルにHTTPリクエストを送信しているだけ。  

{% codeblock index.js lang:javascript %}
const axios = require('axios') 

axios.post('ここに先ほどのURLをいれる',
{
  title: 'From Bot',
  text: 'Hello, world!!'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})

{% endcodeblock %}


特に解説すべきところはない笑

メッセージはjsonで記述するのだけど、  
<u>今回はシンプルにtextとtitleだけとした。</u>  
もちろんtextだけでもOK。  

本当はもっとキラキラしたメッセージも送れるみたいだから、  
興味ある人は調べてみるといいかも。  


さて、index.jsファイルが完成したら、おもむろに実行する。  
```
node index.js
```

うまく実装できていれば、Botから通知が来るはず。  

{% asset_img 05_send.png %}

すごく簡単。  
何ならちょっと感動したくらい簡単。  

このままだと記事としてそっけないので、  
開発時に知っておくと良いことを追記しておく。  

## 通知をしたい
<u>@を使用したメンションは今のところ使えない</u>とのこと。  

Bot専用のTeamを作って、通知をAll activityにするくらいしかなさそう。  
{% asset_img 06_notification.png %} 

## 絵文字を使いたい
絵文字を使いたい時は文字コードを利用する。  

コードはここで確認できる。  
https://unicode.org/emoji/charts/full-emoji-list.html

Codeの欄を見て、`U+`を抜いた文字列を&#x{コード};って感じにすると使える
ニコニコマークを付けたければ、こんな感じ。  
```
{
  title: 'From Bot',
  text: 'Hello, world&#x1F600;!!'
}
```

絵文字を使った例: 
{% asset_img 07_emoji.png %} 

## 定期実行したい
Windowsであれば、タスクスケジューラを使うのがおすすめ。  

タスクとして実行させるためにこんな感じのbatファイルを作っておく。

{% codeblock bot.bat lang:shell %}
cd "index.jsのあるフォルダパス"
node index.js
{% endcodeblock %}

1分おきに起動するようにしたら怖い感じになった。  
9割アイコンのせいだけども。  
{% asset_img 08_task.png %} 

## まとめ
このアイデアは、職場である業務を自動化したくて調べ始めたのがきっかけ。  

自動化自体のスクリプトはできたけど、通知を実装しておらず、  
処理が完了しているかどうかは、ログを見ないと分からないという、  
自動なんだか手動なんだか分からない状態だった。  

とはいえ、メール処理書くのはだるいなーと思ってTeamsならどうかと調べたところ、  
簡単だったので、今回その部分だけ記事にしてみた。  

実は業務では、同僚のPCでも余計なインストールなしで動くように、VBScriptを使用しての実装だった。  
ただ、VBSは言語仕様が古くてつらいことと、VBSでやっても需要ないだろうから爆
ブログ記事ではnodeでやってみた。  

nodeは素敵なライブラリがあるので助かる。  

それじゃ今日はこの辺で。  

## 関連記事
こちらの記事もおすすめ。  

[Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜](/2020/04/2020-0408-linebot/)