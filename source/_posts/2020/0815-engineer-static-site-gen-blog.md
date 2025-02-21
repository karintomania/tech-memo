---
title: エンジニア向けブログの始め方。年間経費1500円で運用している私がその方法を紹介
tags:
  - Hexo
  - Github Pages
categories: エンジニアライフ
featured_image: thumb.png
date: 2020-08-15 19:01:38
---


## はじめに
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

私は現役エンジニアとしてこのブログを運用しています。
一年ほど運用してみて、
私の運用方法は、<u>エンジニアでブログを始めたい人にお勧めできそうだな</u>、と思ったので、
こんな記事を書いてみました。
結論から言うと、
<u>Github Pages + 静的サイトジェネレータ</u>
を利用したブログが最強だと思っています。

特に経費の面では無料〜１５００円程度の運用が可能です。
それでは詳細を紹介していきます。
<!-- more -->

## 想定読者
こういった人に向けて書いています。
- ブログを始めたいエンジニア
- ブログを始めたいけど費用を抑えたい人

## エンジニアがブログを書くメリット
運用方法を紹介する前に私がブログを運用してみて感じた
ブログを書くメリットを紹介しようと思います。

### アウトプットの場になる
エンジニアという職業柄、新しい技術を習得することは付き物ですね。
ただインプットだけするよりアウトプットした方がより勉強になりますし、
他の人が同じことを勉強する際に参考になれるかもしれません。

### 技術力の証明
ブログによって日々学んだことを書いていると、
<u>そのブログを見せるだけで、自分の技術力の証明になります。</u>
（もちろん、内容によりますが。。。）

エンジニアですと、案件によっては作ったサービスなどを
他人に見せられないことも多いですよね。

ですが、<u>案件内で学んだことをブログにアウトプットしておくことで
成果物を見せずとも技術を証明することができます。</u>

当たり前ですが、案件のソースコードを載せるのは
ほとんどの場合NGですので気をつけましょう笑

### ネット上の有名人になれるかも
ブログが人気になれば、あのブログの人ですね、
なんて言われることもあるかもしれません。
私もそれを目指していますが、なかなか先は長そうです。。。

### 副業として
ブログで魅力的なのは、収益化の可能性があることです。
<u>
今回紹介する方法は、無料ブログサービスを使う場合と異なり、
広告を載せることができるので、収益化が可能です。
</u>

また、自分でサービスなどを作る人であれば、
それを告知する場所としても使えるので、一つの武器になります。

## エンジニア向けのブログの始め方
冒頭にもお伝えしたように、
私はエンジニアの方がブログを始める際にはGithub Pagesと静的サイトジェネレータが良いと思っています。
それでは、これらはそもそも何なのかを紹介したいと思います。

### Github Pagesとは
Github Pagesとは、<u>Githubが提供している静的サイトのホスティングサービス</u>です。
エンジニアの方ならGithubを使ったことがあるかもしれません。

このサービスは簡単にいうとGithubのリポジトリにHTMLやCSS、Javascriptを置いておくと、
それがWebページとして読めるようになる（ホスティングしてくれる）サービスです。
こちらはなんと<u>無料</u>で使えてしまいます！
無料で世界中にあなたのWebサイトを公開することができます。

### 静的サイトジェネレータとは
静的サイトジェネレータとは、HTML、CSS、JavaScriptのみで作られたサイトを作れるプログラムです。
ちなみに反対語は動的サイトです。Wordpressなどで使ったサイトはHTMLなどの静的ファイル以外に
PHPやMySQLをサーバ側で動かすことになるので動的サイトになります。

静的サイトジェネレータを使う理由としては、
<u>サイト構築の手間を省き、ブログを書くことに集中するためです。</u>

一般的なブログには以下のような機能やパーツがあると思います。
- カテゴリごとに記事を分ける機能
- タグ付け
- ヘッダやサイドバー
などなど。。。

これらをイチから自分でHTMLを作成していては大変ですよね。
それらの仕事を代わりにやってくれるのが静的サイトジェネレータです。

## Github Pages + 静的サイトジェネレータがおすすめな理由
それではGithub Pages + 静的サイトジェネレータでブログを始めるメリットを紹介します。

### 経費を抑えて始められる
ブログを始めるといえばWordpressが有名ですが、
その場合、<u>レンタルサーバ費が月額1000円くらいかかります。</u>
（1000円くらい良いよ、という人はそれで全然問題ありません笑。）

対して、<u>Github Pagesは無料、静的サイトジェネレータは無料なので、かかる経費は無料です。</u>
独自ドメインにする場合でもドメインの費用は年間１５００円くらいなので、
だいぶ安いですね。

私も最初はお試しで始めたので、独自ドメインなしの無料で始めました。

### Google広告やアフィリエイトができる
静的サイトジェネレータ + Github Pagesでは
Google adsenseやアフィリエイト広告を設置することが可能です。
よほど違法性の高い稼ぎ方をしなければ規約に触れることはないかと思います。

無料ブログサービスなどもありますが、
こちらは広告などのマネタイズが制限される場合が多いため、
収益化も目指したい人にはおすすめです。

### 技術力のアピールにもなる
静的サイトジェネレータとGithubを使うので、最低限のIT知識が必要になります。
Githubはプログラマには必須の知識ですし、
静的サイトジェネレータは様々な言語で実装されています。

<u>自分が勉強している言語で構築することで、
その言語の勉強にもなります。</u>

## デメリット
逆にデメリットを紹介します。

### 一定の知識が必要
最低限、Githubの知識と、静的サイトジェネレータを使用するための知識は必要です。
テンプレートなどをカスタマイズするにはHTML、CSSの知識もあると良いでしょう。

ただ、エンジニアであればこの辺りはもう習得済みであるケースも多いかと思います。
また、<u>ボタン一つで完成する、といった類のものではないため、
その学習が嫌な人は避けた方が良いでしょう。</u>

### 情報が少ない
現在、ブログを始めるにはWordPressを利用するのが主流であるため、
<u>Wordpressに比べて、静的サイトジェネレータでブログを構築するための情報は少ないです。</u>
必要な情報を取得できるだけのリテラシーが必要と言えるでしょう。


## ブログを始める2ステップ
詳細な始め方を書くと、大変な量になってしまうので、
概要だけ書くことにします。


といっても必要なのは<u>たったの２ステップです。</u>
- 静的サイトジェネレータを選ぶ
- Github Pagesにアップロードする

それでは見ていきましょう。

### 静的サイトジェネレータを選ぶ
まずは利用したい静的サイトジェネレータを選びましょう。

各言語から出ているので、自分が得意な言語が良いかと思いますが、
基本的な操作はコマンドを叩くだけだったりするので、
自分の詳しい言語にこだわらなくても大丈夫です。

各言語での有名な静的サイトジェネレータは以下の感じです。
Jekyllがかなり有名ですが、最近はJavaScript製のものも人気が出ています。

言語| 主要な静的サイトジェネレータ
--- | ---
Ruby|Jekyll
JavaScript|Gatsby, Hexo
Go|Hugo

ちなみにこのブログはJavaScript製のHexoを使用しています。

各ジェネレータでチュートリアルなどがあると思うので、
それらを利用してテンプレートでも良いので、
ブログを生成してみましょう。

ちなみにHexoを使ったブログの作り方を以下の記事で紹介しています。
興味があれば読んでみてください。
[HexoとGithub Pagesを使って簡単にブログを公開する](/2020/11/2020-1123-hexo-github/)

### Github Pagesにて公開
静的サイトジェネレータを選び、サイトを生成したら、
Githubにてレポジトリを新規作成して、Webサイトのソースをアップロードします。

詳細は省きますが、レポジトリの設定からGithub Pagesの項目へ移動し、
公開したいブランチ（基本はMasterかと思います）を選択します。

リポジトリの設定画面を開きます。
{% asset_img 01-setting.png "title" %}

Github Pagesを設定します。
{% asset_img 02-branch.png "title" %}
<u>たったこれだけの設定でサイトの公開が完了します。</u>  
サイトはhttps://{ユーザ名}.github.io/{リポジトリ名}/のアドレスでサイトが公開されます。

しかも、多くの静的サイトジェネレータはGithub Pagesとの連携をサポートしているため、
この設定すらしなくて良いことがほとんどです。

## その他やっておいた方が良いこと
これだけであなたのブログが公開されました。

とはいえ、ブログとして運用していくにはまだまだ設定が必要です。
ここではブログ運用の際にやっておいた方が良いことを紹介します。

### テーマの変更
デフォルトのテーマでも良いですが、
どうせなら好きなテーマを選びましょう。

### Google Search Consoleへの登録
<u>実はGithub Pagesでブログを公開しただけでは、Google検索に引っかかりません。</u>
こちらの記事もご参照ください。

[GitHubPagesで作ったブログをGoogle検索にヒットさせる](/2020/04/2020-0408-googleconsole/)

### Google Analyticsの導入
これをすることで<u>どれくらいの人がブログを見たかを把握することができます。</u>
モチベーション維持に効果絶大です。

### 独自ドメインにする
github.ioドメインもハッカーぽくて良いですが笑
<u>独自ドメインにすることでGoogle Adsenseを貼ることができます。</u>
私はしばらくgithub.ioドメインでしたが、広告を貼るために独自ドメインを取得しました。

ドメイン変更はそれなりに面倒なのとアクセス数に影響があるっぽいので、
なるべく早めにやっておいた方が良いです。


ドメイン取得の際はお名前ドットコムがおすすめです。
{% raw %}
<a href="https://px.a8.net/svt/ejp?a8mat=3BK2F7+C9RNN6+50+2HLB41" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=200810563742&wid=001&eno=01&mid=s00000000018015048000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3BK2F7+C9RNN6+50+2HLB41" alt="">
{% endraw %}

### Google Adsenseやアフィリエイト登録
これはブログを収益化したい人向けになりますが、
<u>収益がある、というのはブログを長く続けるには必要な要素だと思っています。</u>

### 記事を書く
これは当たり前ですね。。。

最初はネタ探しにも苦労すると思いますが、
私のおすすめは、
<u>上記のブログ整備を進めながら、その作業自体を記事にしてしまうこと</u>ですね。
技術ブログを書くに当たって、
どんなふうに書くのかを知るための良い練習になると思います。

## まとめ
いかがでしたか。

エンジニアはすでに必要な知識が身についているので、
WordPress使うよりもこの方法が良いと思っています。

それと個人的には静的サイトジェネレーターのユーザーが増えて
界隈が盛り上がってくれたら良いなーと。

この記事を読んで興味を持ったらぜひ挑戦してみてください。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事ではHexoでブログを構築する方法を紹介しています。
興味があれば読んでみてください。  

[HexoとGithub Pagesを使って簡単にブログを公開する](/2020/11/2020-1123-hexo-github/)