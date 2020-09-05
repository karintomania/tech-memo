---
title: Linuxのgrepコマンドで複数キーワードをAND検索をする方法
tags:
  - Linux Command
categories: 技術
date: 2020-05-29 08:59:35
---

## 背景
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)と申します。  
Linuxのgrepコマンドで複数キーワードを
AND検索する方法を紹介します。

実はgrepコマンドには、
複数キーワードを検索するようなオプションはなかったんですね。  

そこで複数キーワードを検索する方法を二つ紹介します。  
<!-- more -->

## xargsを使って複数キーワードを検索する
<u>この方法ではxargsを使います。</u>  
fooとbarを含むファイルを検索したいときは以下の通りです。  
`grep -l foo * |xargs grep -l bar`

この方法は二回grepすることで、
以下の処理を実行しています。
- 最初のgrepでfooを含むファイルを検索する
- xargsで最初のgrep結果を2回目のgrepに渡す
- 2回目のgrepでbarを検索する

一つずつ説明します。

`grep -l foo *`
１つ目のgrepについている-lは検索結果にファイル名のみを表示するオプションです。  
fooを含んだファイル名を列挙します。  

`|xargs grep -l bar`
その後に|(パイプ)とxargsを使っています。  
これにより２つ目のgrepの検索対象として、１つ目の検索結果を渡します。  

## 三つ以上のキーワードを検索したいとき
`grep -l foo * | xargs grep -l bar | xargs grep -l baz`
xargs grep以降をつなげてってください。


## 正規表現でやる場合
正規表現でやるバージョンも書いておきます。  
`grep -e foo.*bar *`

`-e`は正規表現のオプションです。  
ただし、<u>同一行にfoo,barの順番で出現する場合でないとヒットしません。</u>  
改行してたりbar fooの順番で出てくるとダメと言うことですね。  

順不同の正規表現を書くこともできますが、
それくらいならxargsを使った方がシンプルな気がします。  

## まとめ
grepで複数キーワードを検索する方法を紹介しました。  

お役に立てたなら幸いです。  
それでは今日はこの辺で。
