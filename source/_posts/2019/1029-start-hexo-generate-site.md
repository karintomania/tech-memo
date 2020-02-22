---
title: Dockerコンテナ上でHexoを導入してGithubPagesにデプロイする〜②サイト生成編〜
date: 2019-10-29 19:45:15
tags: [Docker, Hexo, Github Pages]
---



## Hexoサイト生成
前回でコンテナが準備できたので  
以下のコマンドを実行してサイトを生成しましょう。

```
/app # hexo init test && cd test
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
Cloning into '/app/test'...
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
(中略)
Done in 51.11s.
INFO  Start blogging with Hexo!
/app/test # 
```

<!-- more -->
githubから雛形をクローンしてるみたいですね。  

これでローカルに何やらフォルダができたはずです。  
```
test
-node_modules   // nodeの色々が入ってる。触らないのが吉
-public         // 実際の静的サイトのソースがここに入る
-scaffolds      // 謎です笑。要調査。
-source
  -_drafts      // 下書きがここに入ります。
  -_posts       // 投稿した記事はここに入ります。

-themes         // テーマがここに入ります。デフォルトから変えたいときはここをいじります。
_config.yml     // 設定ファイル。これから色々いじるはずです。
```

この状態ですでにサイトをプレビューできます。
以下のコマンドを実行して http://localhost:4000 にアクセスしてみます。
```
/app/test # hexo server
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```

![プレビュー画面](sitePreview.png)

## 記事の追加
記事を追加するには以下のコマンドを叩きます。  
hexo new {記事の種類} [タイトル名]

```
hexo new draft test
```

これでテストというタイトルの記事が作成されました。  
source>_drafts>test.mdが作成されたはずです。
_draft内の記事は下書きとして扱われ、Hexoサーバ起動時にはプレビューされません。
下書きを編集する際にはdraftオプションをつけてサーバを起動します。

```
/app/test # hexo server --draft
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```
testが追加されていますね。

![test記事が追加されたはず](draft.png)

testはMarkdownで好きに編集してください。  
ちなみにTitleはファイル名と同じじゃなくても問題ないみたいです。
ファイル名（hexo newコマンドで指定したもの)はURLとか内部的に使う、  
Titleは記事内とか人が見るものに使う、って理解でいいのかなと思います。  
また、そのままだとホーム画面に表示された時に全文が表示されてしまうので、以下のmoreを使います。  
```
<!-- more -->
```

そうすることでRead moreボタンが表示されるようになります。  

```
---
title: 旨いラーメンとは
tags:
---

自由にMarkdownの編集をしてくださいな。
## 章立ては＃で行う

## スープ
箇条書きとかは+,*,-らへん。個人的にはキーボードのポジション的に楽なので、＋をよく使う。
+ コシ
+ 太さ
+ ちぢれ or ストレート
+ 変わり種
	- 箇条書きのネスト
	- 川幅うどん
	- ビャンビャン麺
	- 刀削麺
	
<!-- more -->
## スープ
テーブルも作成可能
|系統名|こってり度|好き|
|---|---|---|
|家系|★★|★★★|
|二郎系|★★★|★★★|
|つけ麺|★★★|★★★|
|あっさりおしゃれ|★|★|

```

さて、Draftをプレビューしてこれで行くぜって状態になったら、パブリッシュです。  
hexo publish (ドラフト内の記事タイトル)でドラフトからpostへ移動できます。  

```
/app/test # hexo publish test
INFO  Published: /app/test/source/_posts/test.md
```

hexo serberコマンドでpostに移動されているか確認してみましょう！  
できましたか？？

次回はこのサイトをGithub Pageにデプロイしてみたいと思います。
