---
title: Dockerコンテナ上でHexoを導入してGithubPagesにデプロイする〜③デプロイ編〜
date: 2019-10-29 19:44:48
tags: [Docker, Hexo, Github Pages]
categories: 技術
---



こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
めんどくさそうなデプロイですが、  
Hexoならコマンド一発で楽勝です。  

## Gitの設定
デプロイにはGitを使うので、  
設定を済ませてしまいましょう。  
以下のコマンドでユーザ設定をします。  
```
/app/test # git config --global user.name "Your Name"
/app/test # git config --global user.email "you@example.com"
```
<!-- more -->
## _config.ymlの設定
_config.ymlの設定をします。  
その前に、対象リポジトリのURLを調べておきましょう。  
GithubでWebサイト用に作成したリポジトリの Clone or Downloadボタンをクリックすると、  
コミット用URLが表示されます。
![コミット用URL](git_url.png)

URLを取得したら_config.ymlを以下のように編集します。

{% codeblock _config.yml lang:yaml%}

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://{githubのusername}.github.io/{リポジトリ名}/
root: /{リポジトリ名}/
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing index.html from permalinks


# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: {先ほど取得したURLをここに貼り付ける}
  branch: gh-pages
	
{% endcodeblock %}

設定ができたら以下のコマンドでデプロイします。

```
/app/test # hexo deploy
```
デプロイできたらGithubPagesへアクセスして確認してみましょう。  
https://{githubのusername}.github.io/{リポジトリ名}/

できたでしょうか。  
これでサイトができました！！おめでとうございます。  


ちなみにこのやり方だと、gh-pagesブランチに公開用ソースを格納して、  
Masterブランチは使用しません。  
なので、Masterブランチに下書きも含めたフォルダ全体を管理するリポジトリにしてしまうのがいいのかなと思います。  