---
title: GitHub Pagesで作ったブログをGoogle検索にヒットさせる
tags:
  - Hexo
  - Github Pages
categories: 技術
date: 2020-04-08 07:44:35
---


## 背景
このブログはGitHub Pagesにホスティングしているのですが、  
なかなかGoogle検索に表示されるようにならず、悩んでいました。
色々調べた結果今は検索で出るようになったので、  
その時、試した事を紹介します。  


## TL;DR
Google Search Consoleに登録するだけではダメみたいです。  
<!-- more -->
**サイトマップを登録しましょう。**  
私の場合、１ヶ月何ともなかったのに、サイトマップを登録したら次の日には検索に引っかかるようになりました。  

## Google Search Consoleへの登録
そもそも、自分のサイトが登録されているかは  
site:{サイトのURL}で検索する事で確認できます。  
このサイトであれば、
`site:https://karintomania.github.io/tech-memo`
となります。  
僕の場合はこれでも表示されなかったので、  
次の方法を試しました。  
- Google Analyticsへの登録
- Google Search Consoleへの登録
- Site mapの登録

一つずつ紹介していきます。  

## Google Analyticsへの登録
Google Analytics（長いので以下GA）は必須ではないのですが、  
次のGoogle Search Console(以下GSC)の登録時に使うのと  
どうせBlogするなら登録したほうがいいと思うので、  
やっておいてください。  

細かい説明は省略しますが、  
使用しているThemeがGAに対応していれば  
theme/_config.ymlにgoogle analyticsのコードを記載する項目があるはずです。  
GAで指定されたコードをそこに設定することでサイトが認識されます。  

## Google Search Consoleへの登録
さて、GAへの登録ができたら、
GSCへ登録しましょう。  
https://search.google.com/search-console/welcome

**注意**
もし自分で用意したドメインではなく、  
github.ioで終わるドメインを使っている場合は、
最初の画面でURLプレフィックスを選択しましょう。
{% asset_img URLprefix.png [URLプレフィックス] %}

GAのアカウントと同一のGoogleアカウントであれば、  
自動的にサイトの所有権が認識されるはずです。  

## Site mapの登録
最後にこれが一番大事です。  
サイトマップとはざっくり説明すると、サイト内のページとURLが書いてあるXMLです。  


今回は私が使用しているHexoでの手順を説明しますが、  
他のブログジェネレータを使用している人も類似の手順かと思います。  


ありがたいことにsite mapを生成するプラグインをどなたかが開発してくださっているので、  
それを使います。  
https://github.com/hexojs/hexo-generator-sitemap
READMEにあるように、Hexoのプロジェクト配下で以下のコマンドを実行します。  
```npm install hexo-generator-sitemap --save ```
上手くいけば、/node_moduleフォルダにこのプラグインが追加されているはずです。  

その後、_config.ymlに以下を追記します。  
 {% codeblock _config.yml lang:yaml %}
sitemap:
    path: sitemap.xml
    template: ./sitemap_template.xml
    rel: false
 {% endcodeblock %}

そして、テンプレート用のXMLを先ほどのリポジトリからダウンロードしてきて、プロジェクトフォルダ直下におきます。  
[サイトマップテンプレート](https://github.com/hexojs/hexo-generator-sitemap/blob/master/sitemap.xml )


今回はプロジェクト直下におきますが、  
変更したい場合は_config.ymlのtemplateの設定値を変更してください。  


これらの変更を反映させるため、一回 hexo generate && hexo deployしてください。  
これでHexo側の設定は終わりです。　


GSC側の設定としては、サイトマップの送信が必要です。  
送信といってもURLを教えてあげるだけです。  
サイドバーのサイトマップから以下のような設定画面に移動してください。
{% asset_img sitemap.png [サイトマップの登録] %}
もし私と同じ設定にしてあれば、  
{サイトURL}/sitemap.xmlとなっているはずです。  
送信ボタンを押して送信された旨のメッセージが出れば完了です。

## 所感
せっかくブログを書いていてもGoogle検索に出なければ
誰にも読まれないですよね。  
果たしてGithubのドメインを使っていて、  
本当に検索できるんだろうか、とか色々考えたのですが、  
結果できました。  

自分のようにGoogle検索にかからず困っていた人の助けになれれば幸いです。  
それでは本日はこの辺で。  