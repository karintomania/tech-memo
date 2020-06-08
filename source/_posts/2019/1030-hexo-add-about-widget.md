---
title: Hexoでサイドバーにウィジェット(プロフィール)を追加する
tags:
  - Hexo
date: 2019-10-30 17:42:03
categories: 技術
---


こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
Hexoで作ったブログにウィジェットを追加する方法を紹介します。  
サイドバーにこんな感じの著者プロフィールウィジェットを追加してみます。 
landscapeをテーマに使用している前提で記載していますので、別のテーマを使用している場合は適宜読み替えてください。  

{% asset_img about_style.png [著者プロフィール] %}

## ウィジェット用テンプレートの追加
ウィジェットのテンプレートを追加します。
まずはabout.ejsをtheme>landscape>layout>_widget内に追加します。  
他のejsファイルを参考にしつつ、こんな感じにしました。


{% codeblock about.ejs lang:html%}
<div class="widget-wrap">
<h3 class="widget-title">About</h3>
<div class="widget">
	<h3>karintomania</h3>
	<p>私はうんぬんかんぬんかくかくしかじか。。。</p>
</div>
</div>
{% endcodeblock %}

<!-- more -->

そして、widgetを追加するには、_config.ymlをいじる必要があります。  
この_config.ymlは使用しているテーマ内のものなので、プロジェクト全体のものと間違わないようにしてください。  
{% codeblock landscape > _config.yml lang:yaml%}
# Sidebar
sidebar: right
widgets:
- about  # aboutを追加
- category
- tag
- tagcloud
- archive
- recent_posts
{% endcodeblock%}

そしてHexo serverコマンドでサイトをプレビューするとAboutウィジェットが追加されているはずです。  
![Aboutウィジェットが追加された](about_plane.png)

これだけでは技術的にも絵的にも少し物足りないので、  
もう少し工夫します。 

## 設定ファイルから値を取得
まずは著者名は設定ファイルに持っているので、そこから持ってくるようにしましょう。  
プロジェクトのconfig.ymlの値はconfig変数に持っているようです。  


また、テーマのconfig.ymlの内容はtheme変数に持っています。  
説明文用のプロパティをテーマのconfig.ymlに追加して取得させてみます。

{% codeblock landscape>_config.yml lang:yaml%}
# Site
title: ただの技術メモ
subtitle:
description:
keywords:
author: karintomania # 参照元の著者名
....
{% endcodeblock%}

config.yml末尾に新規プロパティを追加します。
{% codeblock theme>_config.yml lang:yaml%}
# about
author_description: "うんぬんかんぬん"  # 新しくauthor_descriptionプロパティを追加
{% endcodeblock%}

about.ejsは以下のようになります。  
<%= 変数 %>で変数を参照することができます。  
また、今回は説明文にマークダウンを使えるようマークダウンヘルパー markdown()を使用しています。  
ヘルパーを使用する際は<%- 関数 %>と%の後にハイフンを続けます。  
単なる変数参照の時と若干記法が違うので気をつけてください。  

{% codeblock about.ejs lang:html%}
<div class="widget-wrap">
<h3 class="widget-title">About</h3>
<div class="widget">
	<h3><%= config.author %></h3>
	<p><%- markdown(theme.author_description) %></p>
</div>
</div>
{% endcodeblock %}

きちんと反映されていますね。


![設定ファイルから内容を参照している](about_setting.png)

## 画像の追加
さて、著者の画像も追加してみます。

![著者画像](author.png)
画像の置き場はtheme/landscape/source/css/images/author.pngとします。  
これもconfig.ymlにプロパティとして持たせておきましょう。

{% codeblock theme>_config.yml lang:yaml%}
# about
author_description: "うんぬんかんぬん"  # 新しくauthor_descriptionプロパティを追加
author_image: "css/images/author.png"
{% endcodeblock%}

これをejsファイルから参照する際には、相対パスは使用できません。  
代わりにurl_for関数を使用します。この関数はURLを自動的に生成してくれます。

{% codeblock about.ejs lang:html%}
<div class="widget-wrap">
	<h3 class="widget-title">About</h3>
	<div class="widget">
		<!-- url_forで著者の画像URLを生成している -->
		<img src="<%- url_for(theme.author_image) %>" alt="著者" class="author_img">
	<h3><%= config.author %></h3>
	<p><%- markdown(theme.author_description) %></p>
	</div>
</div>
{% endcodeblock %}

できました。が、著しくはみ出てますね。  
スタイルも指定できるようにしましょう。  
![画像が追加された](about_image.png)

hexoでは、cssの代わりに.styl形式を使用しているようです。  

theme/landscape/source/css/_partial/about.stylを追加します。  
{% codeblock about.styl lang:styl%}
.author-img
  width: 70%
  border-radius: 1em
  border: 0.2em solid #999
{% endcodeblock %}

また、そのままではこのファイルが読み込まれないので、  
theme/landscape/source/css/style.stylにて、importの設定をします。

{% codeblock style.styl lang:styl%}
@import "_extend"
@import "_partial/header"
@import "_partial/article"
@import "_partial/comment"
@import "_partial/archive"
@import "_partial/footer"
@import "_partial/highlight"
@import "_partial/mobile"
@import "_partial/about"
{% endcodeblock %}

これで画像が表示されるようになりました。  

![ウィジェットが完成しました。](about_style.png)
