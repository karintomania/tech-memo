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
{% row %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://www.rakuten.com/" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/897/978/857/20010009784897978857_1.jpg?_ex=64x64" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://www.rakuten.com/" target="_blank">いきなりはじめるＰＨＰ ワクワク・ドキドキの入門教室 /リックテレコム/谷藤賢一</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://www.rakuten.com/" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://www.amazon.com/" target="_blank">Amazon</a><img src="https://www.rakutenimp.com/" width="1" height="1" style="border:none;"></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
{% endrow %}
## 関連記事
こちらの記事もおすすめです。  

[Gitで最初のコミットを消す方法](/2021/08/2021-0826-git-delete-first-commit/)