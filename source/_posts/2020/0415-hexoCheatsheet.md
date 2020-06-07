---
title: 私流hexoチートシート
tags:
  - Hexo
categories: 技術
date: 2020-04-15 20:56:38
---

## 背景
普段Hexoを使ってこのブログを書いているのですが、  
よく使うコマンドをいちいち調べるのがめんどくさいので、  
ここにまとめます。  
{% asset_img hexo.png [hexo_logo] %}
<!-- more -->
## ライブサーバ系
サーバ起動  
`hexo server`

ドラフトも表示させる場合  
`hexo server --draft`

## サイト生成・デプロイ
サイト生成  
`hexo generate`

デプロイ  
`hexo deploy`

サイトをきれいにする  
`hexo clean`

上記三つをまとめてやる  
`hexo clean && hexo generate && hexo deploy`

## ページ生成系
ドラフト生成  
`hexo new draft {draft名}` 

ドラフトのパブリッシュ  
`hexo publish {draft名}` 

## タグスクリプトなど
コードブロック(Javaの場合)
```
{% codeblock Hello.java lang:java %}
{% endcodeblock %}
```

画像表示  
```
{% asset_img title.png [代替テキストをここに記入] %}
```

リンク  
`[リンク文面](https://example.com/ )`

## 番外編
タグの付け方  
`tags: [Java, PHP, Java script]`
これはよく忘れるので。。。


今日はこの辺です。  