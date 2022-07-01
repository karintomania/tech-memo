---
title: 開発環境でメールをテストするときはsmtp4devが便利
tags:
  - smtp4dev
  - 開発ツール
  - SMTP
categories: 技術
featured_image: thumb.png
date: 2022-07-01 15:47:08
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

Webアプリを開発する際にメールを送る機能をテストすることがありますよね。

そんな時に<u>こういった悩みを持ったことはないですか？</u>

- 開発に使えるSMTPサーバがない
- 開発で使ったメールでInboxがいっぱいになってしまった。
- メールを誤送信してしまった
- 正しい宛先に送れているかテストするためにいくつかフリーメールのアカウントを作った

まだまだあると思いますが、端的にいって面倒くさいですよね笑

そんな悩みを解決してくれるのがsmtp4devです。
<!-- more -->

## smtp4devとは

smtp4devは<u>ローカルなSMTPサーバーのような動きをするツール</u>です。
といっても少しイメージが湧きづらいと思うので、もう少し説明します。

普通にメールを送る機能を開発すると、
1. アプリからSMTPサーバにどんなメールを送るか情報を送る
1. SMTPサーバからメールが送られる
1. 受信者がメールを受信する

といった手順でメールが送られます。

smtp4devを使うと以下の感じになります。
1. アプリから<u>ローカルのsmtp4devに</u>どんなメールを送るか情報を送る
1. smtp4devが<u>メールをローカルに記録する</u>

メールは実際に送られず、ローカルのsmtp4devサーバーからプレビューできる状態で保存されます。

SMTPサーバーのモックと言ったら分かりやすいかもしれません。

メールを実際に送ることはないので誤送信の心配もないですし、
実際のSMTPサーバーと比べて構築もDockerで楽チンです。

それでは実際の使い方を紹介します。

## 使い方

それでは使い方を見ていきましょう。

### インストール方法

インストールですが、以下の二つの方法があります。
- exeファイルとしてインストールする
- Dockerコンテナとして実行する

この記事ではDockerを使った方法を紹介します。

### Githubからプロジェクトをクローン

GitHubにクローンしてそのまま使えるレポジトリを作りました。
https://github.com/karintomania/docker-for-smtp4dev

以下のコマンドを使用してGithubからプロジェクトをクローンします。

{% codeblock %}
`git clone https://github.com/karintomania/docker-for-smtp4dev.git`

{% endcodeblock %}

### docker-compose.ymlを編集

先ほどクローンしたプロジェクトフォルダに入って
コンテナをビルド＆立ち上げをします。

{% codeblock %}
docker-composer up -d

{% endcodeblock %}

### Webの管理画面を開く

http://localhost:8080 をブラウザで開いてみましょう。

以下のような管理画面が見えると思います。

{% asset_img 01_page.png %}

### PHPからメールを送ってみる

それではこのSMTPサーバを使ってメールを送ってみましょう。
PHP Mailerを使って以下のようなコードでメールを送ってみます。

{% codeblock lang:php %}

<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host       = 'host.docker.internal'; // 普通はlocalhostで良い
$mail->Port       = 25;

$mail->setFrom('noreply@bedroomcomputing.com'); // 適当なFromアドレス
$mail->addAddress('test@bedroomcomputing.com'); // 適当なToアドレス

$mail->isHTML(true);
$mail->CharSet = 'UTF-8';
$mail->Subject = 'テストメール';
$mail->Body = 'これは<b>テストメール</b>です。';

$mail->send();

{% endcodeblock %}

もちろんPHP MailerでなくてもSMTP経由でメールを送る実装であれば、
なんでも大丈夫です。

少し注意ですが、FromとToアドレスは実際にメールを送るわけではないので、
適当なアドレスで大丈夫です。

また、Hostに`host.docker.internal`を指定していますが、
これはこのPHPファイルをDocker内から動かしているため、
Docker内からlocalhostを参照するようにこう書いています。

普通にローカルマシンで動いているプログラムならlocalhostを指定して大丈夫です。

### 結果確認

また、http://localhost:8080 にアクセスしてみてください。
以下のように<u>メールが送れたことが確認できますね。</u>

{% asset_img 02_email.png %}

実際に宛先のアドレスにはメールが届かないことにも注意してください。
こうすることで、実在するメールアドレスを使用しても
<u>誤送信を心配しなくてすみますね。</u>

## まとめ

今回はSMTPを使ったメール送信をテストできるsmtp4devを紹介しました。

メール関連の開発は面倒なことも多いですが、こういったツールを使用することで、
快適に開発出来ますね。

是非使ってみてください！

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[AIで凛として時雨をRe:Automationする！（歌詞をAIに自動生成させてみた）](/2022/06/2022-0613-ai-shigure/)

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
