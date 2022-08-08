---
title: PHP $_SESSIONの背後で起こっていること
tags:
  - PHP
  - セッション
categories: 技術
featured_image: thumb.png
date: 2022-06-26 17:19:42
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

Sessionって便利ですよね。（唐突）

そもそもHTTPはステートレスですが、
Webアプリを作るうえでは、セッションにステートを持たせたい場面がよくあります。
そのため、サーバーにセッションを使ってステートを保存できるようになっています。

今日はそのSessionの背後で何が起こっているのか
確かめてみることにしました。
<!-- more -->

## Sessionの利用

PHPでSessionを利用するときは
ご存じのように`$_SESSION`変数を使います。
`$_SESSION`はスコープがセッションであること以外は普通の配列として使えます。

今回はテストとして以下のようなコードを使用します。

{% codeblock index.php lang:php %}
<?php
session_start();

$_SESSION['count'] = ++$_SESSION['count'] ?? 1; //　セッションのcountをインクリメント
print('カウント： '.$_SESSION['count'] ?: '');

{% endcodeblock %}

ページを表示するとこのように表示した回数を表示します。
ブラウザを更新するとカウントが増えていきます。

{% asset_img 0_count.png %}

## Sessionの保存先

結論から言うとPHPでは<u>cookieとファイルでSessionを実現しています。</u>

Cookieを使用して各Sessionを判別し、
セッション内のデータはファイルに保存されます。

それだけではわかりづらいと思うので、
以下で詳しく説明していきます。

## Cookie
先ほどのコードをもとに説明します。

{% codeblock index.php lang:php %}

<?php
session_save_path(**DIR**); //　セッションの保存先をカレントディレクトリに変更
session_start();

$_SESSION['count'] = ++$_SESSION['count'] ?? 1; //　セッションのcountをインクリメント
print('カウント： '.$_SESSION['count'] ?: '');

{% endcodeblock %}

このページを開いてChromeのデベロッパーツールを開いてみます。

すると以下のように<u>PHPSESSIDという値が格納されている</u>のが確認できます。

これがセッションIDです。

{% asset_img 1_cookie.png %}

このIDをCookieに入れることで、リクエストを受け取ったときに
ほかのリクエストと混ざったりすることなくセッションを特定することができます。

また、このCookieは期限がSessionに設定されています。
（当たり前ですね。）

Cookieの期限にSessionが指定されている場合、
- PCであればブラウザを閉じる、
- スマートフォンであればアプリを終了する

などすることで
Cookieは削除されます。

## File

先ほどのコードに少し変更を加えてみます。

{% codeblock index.php lang:php %}

<?php
session_save_path(__DIR__); //　セッションの保存先をカレントディレクトリに変更
session_start();

$_SESSION['count'] = ++$_SESSION['count'] ?? 1; //　セッションのcountをインクリメント
print('カウント： '.$_SESSION['count'] ?: '');

{% endcodeblock %}

`session_save_path(__DIR__)`という関数を最初に実行しています。

これにより、セッションを保存するディレクトリをindex.phpがあるフォルダに変更しています。

デフォルトでは保存先が`/tmp`などになっているのですが、
単純にファイルが見やすいように保存フォルダを変えているだけです。

それではページを表示してみましょう。

{% asset_img 2_file.png %}

sess_{session ID}というファイルが生成されています。

中身を見てみましょう。

{% codeblock sess_xxxx %}

count|i:8;

{% endcodeblock %}


これを分かりやすく分解すると以下のようになります。
- セッションのキー（＝count）
- 型（ここではi、つまりinteger）
- 値（＝８）

また、文字列型の値をセッションに格納してみましょう。

最後の行に以下のコードを追加します。

{% codeblock index.php lang:php %}

$_SESSION['string'] = '文字列';  //文字列を格納

{% endcodeblock %}

セッションが保存されているファイルを開くとこのようになっていました。

{% codeblock sess_xxxx %}

count|i:2;string|s:9:"文字列";

{% endcodeblock %}

文字列に関しては文字列の長さも記録されるみたいですね。

## セッションファイルの削除

それでは先ほど説明したファイルはいつまで保存されるのでしょうか。
それはphp.iniの値、<u>session.gc_maxlifetime（gc：ガベージコレクション）</u>によります。

[https://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime](https://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime)

これはデフォルトだと1440秒（＝24分）に設定されています。

新しいセッションが始まるたびにこのガベージコレクションが実行され、
最終更新時間が24分より前のセッションファイルが削除されるようになっています。

セッション周りの設定はたくさんあるので、公式ドキュメントを読んでみるのも面白いと思います。

[https://www.php.net/manual/en/session.configuration.php](https://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime)

## まとめ

いかがでしたか。

セッションを調べてみるとCookieとファイルを使って実装しているということが分かりました。

セッションとCookieって割と学ぶときは同列に学ぶことが多いと思うのですが、
実装的にはセッションがCookieを利用しているというのが少し面白かったです。

また、ほかのWEBフレームワーク、特にほかの言語がどのようにセッションを扱っているのかも気になりました。

もしいい記事があれば教えてください笑

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[PHP DIでDIを学ぶ](/2022/05/2022-0527-php-di/)


## PR
技術力を高めようとしているのに、技術が評価されない会社にいたら難しいですよね？
きちんとした技術を持ったエンジニアを評価する会社を探しませんか？

エンジニア転職ならレバテックキャリアがおすすです。

<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZQFQ9" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=210117795527&wid=001&eno=01&mid=s00000011866006002000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZQFQ9" alt="">
