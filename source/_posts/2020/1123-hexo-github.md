---
title: HexoとGithub Pagesを使って簡単にブログを公開する
tags:
  - Hexo
  - Github Pages
categories: 技術
featured_image: thumb.png
date: 2020-11-23 01:23:02
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今回は静的サイトジェネレータHexoを使ってブログを作る方法を紹介していきます。
<!-- more -->

今回は趣味で書いている漫画を公開するための
ブログを作ったので、その手順をまとめました。

## 概要
使用する技術は以下の通りです。
Hexo: 静的サイトジェネレータ
Github Pages: サイトのホスティング

### 前提条件
- node.js インストール済み
- Githubのアカウント作成済み
- Googleアカウント作成済み

今回はWindowsでの作成方法を紹介しますが、
Macでもそんなに変わらないと思います。


## Hexoをインストール
まずは下準備として
Hexoのコマンドラインツールをインストールします。

以下のコマンドを打ってください。
```
npm install -g hexo-cli
```

それでは試しにブログを作成していきましょう。

適当なフォルダで以下のコマンドを打ちます。
```
hexo init
```
初期化が完了したら以下のコマンドを打って試しに見てみましょう。
```
hexo server
```
http://localhost:4000 にアクセスすることで試しにアクセスできます。


{% asset_img 01-testServer.png %}
できましたかね。簡単にブログが作れて素敵ですね。

## テーマを選ぶ
それでは好きなテーマを選んでいきます。
デフォルトのテーマでいい人はこの章を飛ばして
先ほど作成したサイトを使ってください。

以下のサイトにテーマがまとめられているので、
好きなテーマを選んでください。
https://hexo.io/themes/

私はbeantechというテーマを選んでみました。

{% asset_img 02-bean.png %}
https://github.com/YenYuHsuan/hexo-theme-beantech

## テーマのダウンロード
大体のテーマではGithubのReadmeに導入方法が書いてあるので、
それを実行しましょう。

今回はBeanTechでのやり方を紹介します。
適当なフォルダの中で以下のコマンドを実行します。

```
git clone https://github.com/YenYuHsuan/hexo-theme-beantech.git ./hexo-beantech
cd hexo-beantech
npm install
```

そしたら以下のコマンドでLiveサーバーを起動してみます。
```
hexo server
```

起動しましたかね。
新しいテーマでのブログが立ち上がりました。

{% asset_img 03-beanblog.png %}

## 見た目をいじる
そのままではさすがに自分のサイトって感じがしませんので、
適当にCSSやらなにやらいじってかっこよくしましょう。

全部を書いてくとキリがないので、ポイントだけ紹介します。

### ヘッダ画像の変更
ヘッダ画像を変えるだけでほぼ違うサイトに見えます笑
これは絶対変えましょう。

### フォント・フォントサイズの変更
英語と中国語が映えるようなフォント設定になっているテーマが多い感じなので、
日本語用のフォントに変更します。
私は以下のfont-familyを利用しています。
```
font-family: "Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;
```

### アイキャッチ画像の追加
私は漫画ブログを作りたかったので、
記事一覧に漫画の一コマも一緒に載せるようにしました。
これには`hexo-featured-image`というプラグインを使用しました。
https://github.com/poacher2k/hexo-featured-image

### サイトタイトル・ファビコンの変更
Chromeとかのタブに表示されるアレです。

このほかにも細かな修正はしました。
例えば、なぜか「ページ上部に戻る」ボタンのアイコンがアイアンマンだったので、
普通の矢印に変えたり。

{% asset_img 06-ironman.png %}
このテーマの作者はアイアンマン大好きみたいですね。
著作権とか大丈夫なんだろうか。。。

それはさておき、
これで大体の見た目が決まりました。
こちらが修正前↓
{% asset_img 04-origin.png %}


こちらが修正後です↓
{% asset_img 05-after.png %}
うん、まあ良いでしょう。

## デプロイ
それではGithubにデプロイしていきます。
これで世界中にあなたのサイトが公開されることになります。
おめでとうございます。

Githubで新規のレポジトリを作成しましょう。
{% asset_img 07-create-repo.png %}
repository nameだけ設定すれば大丈夫です。

レポジトリのURLを控えましょう
{% asset_img 08-url.png %}

次にGithub Pagesの設定をします。
{% asset_img 08-setting.png %}
設定タブからGithub Pagesの設定欄に行きます。
Sourceに`gh-pages`ブランチを設定して`Save`しましょう。
{% asset_img 09-ghpage.png %}

公開されるURLが取得できるので、
これを確認します。
https://{ユーザ名}.github.io/{レポジトリ名}/といった形式になっているでしょうか。


{% asset_img 10-url.png %}
config.ymlを設定します。
以下の項目に先ほど取得したURLを設定します。
URLの項目にはGithub PagesのURLを設定してください。
Deployの項目にはレポジトリのURLを設定してください。
```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://{ユーザ名}.github.io/
root: /{レポジトリ名}
permalink: :year/:month/:day/:title/
permalink_defaults:

# 中略

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: {GithubレポジトリのURL}
  branch: gh-page
```

`source/CNAME`ファイルにもGithub PagesのURLを指定します。
```
{Github PagesのURL}
```

以上で設定は完了です。

以下のコマンドを打つことで
ブログがGithubにデプロイされます。

```
hexo clean && hexo generate && hexo deploy
```

アクセスして確認してみてください。
サイトが表示されたでしょうか。

## masterブランチの利用
前のステップで公開用のソースはGithub上に挙げられますが、
CSSやHTMLテンプレートの変更もGithubで管理したいですよね。
その場合は普通にMasterブランチにソースをpushすればOKです。

gitignoreはこんな感じにしています。
```
node_modules/
public/
.deploy_git/
```

以下のコマンドでmasterブランチをpushしましょう。

```
git init
git add .
git commit -m "first commit" 
git remote add origin  https://github.com/karintomania/karintouManga.git
git push origin master
```

## ドメインの変更
このままだとドメインがgithub.ioのままですね。
もちろんこのままでもいいのですが、ブログとして運用したい場合は
独自ドメインで行ったほうが何かと都合が良いです。

というわけで変更していきましょう。

もしドメインをこれから取得するなら
お名前ドットコムが有名どころです。
{% raw %}
<a href="https://px.a8.net/svt/ejp?a8mat=3BK2F7+C9RNN6+50+2HLB41" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=200810563742&wid=001&eno=01&mid=s00000000018015048000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3BK2F7+C9RNN6+50+2HLB41" alt="">
{% endraw %}

### Githubでの設定
Custom Domain欄にドメイン名を設定します。
また、HTTPSも有効にしておきます。
{% asset_img 12-custom-domain.png %}


### ドメイン登録サービス側の設定
ドメインを取得したサービス側でCNAMEを設定します。
サービスにより違うと思うので、やり方は調べてみてください。

私の場合はこんな感じでした。
{% asset_img 13-cname.png %}


### Hexoの設定
config.ymlにてurlを新しいURLに直します。

```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://www.manga.bedroomcomputing.com/ # Note: don't forget to modify the CNAME file to your url
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```

以上でサイトが独自ドメインで公開されたはずです。

## Google Analyticsの反映
Google Analyticsに登録します。
これでアクセス数などが確認できます。

{% asset_img 14-create-property.png %}

プロパティを作成するとトラッキングコードが取得できるので、
config.ymlに設定します。
```
# Analytics settings
# Baidu Analytics
# ba_track_id: 4cc1f2d8f3067386cc5cdb626a202900
# Google Analytics
ga_track_id: 'UA-161452704-5'          # Format: UA-xxxxxx-xx
ga_domain: 
```

自分でアクセスしてみて
アクセスが監視できているか確認してみてください。

{% asset_img 16-user.png %}

## Search Consoleへの登録
Google search consoleへ登録します。
これをすることでGoogle検索に引っかかるようになります。

サイトに自分のドメインを登録します。
{% asset_img 17-satchico.png %}


また、サイトマップを登録します。
サイトマップはページとURLを教えてくれるXMLファイルです。

私が使っているテーマでは、自動でsitemapを生成してくれるので、
そのURLを登録します。
{% asset_img 18-sitemap.png %}

テーマがsitemapに対応していなくても生成してくれるプラグインを利用することで
sitemap.xmlを生成できます。
https://github.com/hexojs/hexo-generator-sitemap

何日か待つとGoogleの検索に出てくるようになります。
Google検索にヒットするかどうかを判定するためには
Googleで「site:{サイトのURL}」で検索してヒットすれば
無事に登録されています。

## まとめ
長い道のりですが、
ブログを公開するまでにはこんな感じです。

楽しいブログライフを！
それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[エンジニア向けブログの始め方。年間経費1500円で運用している私がその方法を紹介](/2020/08/2020-0815-engineer-static-site-gen-blog/)