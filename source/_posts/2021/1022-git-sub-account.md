---
title: 特定のレポジトリでGitHubのサブアカウントを使う方法
tags:
  - Git
categories: 技術
featured_image: thumb.png
date: 2021-10-22 22:25:50
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
GitHubは開発者にとって使う機会の多いツールの一つではないでしょうか。
なので、会社用アカウントと個人用アカウントなど、
複数のアカウントを持っている人は多いかと思います。

今回は特定のレポジトリだけでサブアカウントを使うための
Gitの設定を紹介したいと思います。
<!-- more -->

## Git configの変更
サブアカウントを使いたいレポジトリのconfigを設定していきます。

### ユーザの設定
まずはサブアカウントをgitのユーザとして、以下のコマンドで変更します。
```
git config --local user.name {ユーザー名}
git config --local user.email {メールアドレス}
```

これをすることで、コミット履歴に残るユーザ名がサブアカウントのものになります。
会社用のユーザで個人のリポジトリにコミットしてしまう、みたいなことが無くなりますね。

### リモートレポジトリの設定
GithubのレポジトリURLが以下だとします。
https://github.com/username/test-app.git

これにユーザ名とアクセストークンを以下のように追加します。
```
https://{ユーザ名}:{アクセストークン}github.com/username/test-app.git
```

そのURLをgit configでリモートレポジトリのURLとして設定します。
```
git config --local remote.origin.url https://{ユーザ名}:{アクセストークン}github.com/username/test-app.git
```

### 動作確認
以上の設定を行ったうえでgit pullなりpushなりをしてみてください。
サブアカウントでのプッシュが行えたかと思います。

## 注意
お気付きかと思いますが、この方法はアクセストークンを平文で保存することになってしまうので、
とりあえず動かしたいときだけ使うようにしてください。

## まとめ
色々調べたのですが、この方法がとりあえず簡単に動かせるので、
良いのかと思います。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[Gitで最初のコミットを消す方法](/2021/08/2021-0826-git-delete-first-commit/)

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
