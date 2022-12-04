# 基本

サーバ起動  
hexo server
hexo server --draft  
hexo generate
hexo deploy

ドラフト作成  
hexo new draft {draft名}  
hexo publish {draft名}    

諸々きれいにする  
hexo clean

まとめてやる
hexo clean && hexo generate && hexo deploy
hexo clean && hexo generate


# タグスクリプト
![](initializr.png) //　トップページでしくじる

{% codeblock docker-compose.yml lang:yaml %}
{% endcodeblock %}

{% asset_img about_style.png [著者プロフィール] %}
{% asset_img about_style.png %}

[ブログ内のリンク](/tech-memo/2020/04/2020-0415-hexoCheatsheet/)

こんにちは。[karintomania](https://twitter.com/karintozuki)です。
[リンク文面](https://orchid.run/wiki/learn )

https://karintomania.github.io/tech-memo/

tags: [Java, PHP, Java script]

テーブル
|
--- | ---
|
|

アフィリリンク用
{% raw %}
{% endraw %}

## 画像
feature は10 x 5くらいでOK

## Git関連
deplo時のエラー
```
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```
`rm -rf .deploy_git`してからエラーメッセージ通りにコマンドを叩く
