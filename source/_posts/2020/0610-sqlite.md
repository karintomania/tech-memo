---
title: sqliteとは？特徴と使い方を解説する
tags:
  - sqlite
  - OSS
  - DB
categories: 技術
date: 2020-06-10 00:36:24
featured_image: logo.gif
---

## 背景
android開発を始めた際に、  
DBとしてSQLiteが使用されている、  
ということでSQLiteとの付き合いが始まった。  

何となく使っているのもあれなので、調べてみることにした。  

<!-- more -->

## SQLiteとは
Liteというだけあって、軽量のSQLらしい。  

何がすごいかはこの公式サイトに存分にアピールされている。  
https://www.sqlite.org/features.html

とはいえ、英語読むのとかだるいと思うので、調べた範囲で少し紹介したい。  

### 軽量
サイズが異常に少ない。  
600KB。  

うちの会社でプロジェクト管理しているエクセルですら数MBだというのに。  
設定でもっと削ることもできるらしい。  

### 一つのファイルに全部コミコミ (self-contained)
SQLiteはソフトウェアとしてインストールされるというよりは、  
DB自体が一つのファイルとして存在している。  

実際、androidの中にはこのSQLiteのDBファイルが存在していて、  
開いてデータを見たりできる。  

また、そのファイル内にほとんど必要なものが入っている
= 外部のライブラリへの依存性が究極に少ないから、  
クロスプラットフォームで動くようになっているとのこと。  

### サーバレス
ファイルで存在してるからDBサーバとかそういう次元の話じゃない。  
ファイルの読み書き権限があればOK。  

### 設定不要。 (zero-configuration)
インストールとかしなくても動く。  
プロセスとしてstart, stopしないといけない、とかもない。  
初期設定とかもいらない。  

これはDBとしてはとても画期的なのでは。  

### 高い信頼性。  
テストカバレッジが100%
ブランチカバレッジという、分岐の全ての条件を一度は通るようなテストで
カバレッジ100%。ブランチカバレッジの100%はかなり難しいらしい。  

テストは全然ライトじゃない。  

### フル機能のDB
いくら軽量で設定不要でもDBとして使えなければ意味がない。  
SQLiteはDBとして必要な機能は一通り揃えているよう。  

機能も全然ライトじゃない。  

### 余談
ちなみに公式サイトはすごくライト。  
画像もロゴくらいしか使われていない。  
{% asset_img page.png %}

## 使ってみよう
少し使いたくなってきません？  
導入は本当に簡単で５分くらいしか掛からなかった。  
興味があれば、ぜひ。  

以下、導入方法。  

### SQLite3のインストール
SQLite自体は前述の通り、インストール不要。  

ただ、そのDBファイルを作ったり、設定したりする際に、  
SQLite3というコマンドラインツールが必要らしい。  

macユーザならbrewで入れられる。Windowsの人もexeファイルをDLするだけ。  
```
brew install sqlite3
```

### DB作成
で、適当なフォルダの中で以下のコマンドを実行。  
今回は何となく.dbと拡張子を付けたけど、  
好きな拡張子でいいし、別になくてもいい。  

```
sqlite3 test.db
```

はい、DB完成です。おめでとうございます。  
もはや不安になる早さと手軽さ。  

### もう少し試してみる。  

テーブル作りーの、  
{% codeblock テーブル作成 lang:sql %}

sqlite> create table tbl1(id smallint, name varchar(20));                     
{% endcodeblock %}

データインサートしーの、  
{% codeblock insert lang:sql %}
sqlite> insert into tbl1 values(1,'tanaka');
sqlite> insert into tbl1 values(2,'suzuki');
{% endcodeblock %}

セレクトかけーの、  
{% codeblock select lang:sql %}
sqlite> select * from tbl1;

// 出力結果
1|tanaka
2|suzuki
{% endcodeblock %}

普通に動く。  
新卒の時に研修でMySQLの初期設定にかけた数時間はなんだったんだろうか。  

ちなみに一通り遊んで、止めたいときは以下のコマンド。  
```
.exit
```
管理系のコマンドは.(ドット)から始まるらしい。  

同じフォルダで`ls`を打つと、DBファイルができてることが分かる。  
-lhオプションでファイルサイズも表示させよう。  
```
ls -lh
-rw-------  1     12K  6  9 23:13 test.db
```
12KB。。。まさかの二桁KB。  
このサイズにフル機能のDBが詰まっていると思うと胸が熱い。  

## 余談
DBeaverを使うとGUIで中身が見られる。  
{% asset_img dbeaver.png %}

この記事も参考になるかも。
[Macの無料SQLクライアントDBeaverを紹介する](/2020/05/2020-0508-dbeaver/)

## まとめ
個人的に軽量と名がつくものが結構好きで、  
例えば、PHPのフレームワークだったらLaravelよりCodeIgniter派、みたいな。  

個人開発でDB周りだるいなと思うことが多かったので、  
これでもっと高速化できるかも。  

それじゃあ、今日はこの辺で。  

### PR
おすすめ技術本
<table cellpadding="0" cellspacing="0" border="0" style=" border:1px solid #ccc; width:300px;"><tr style="border-style:none;"><td style="vertical-align:top; border-style:none; padding:10px; width:108px;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F27968133639f313d9536a671c6bf6a97%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F14605511%252F" rel="nofollow"><img border="0" alt="" src="http://thumbnail.image.rakuten.co.jp/@0_mall/rakutenkobo-ebooks/cabinet/3763/2000003223763.jpg?_ex=128x128" /></a></td><td style="font-size:12px; vertical-align:middle; border-style:none; padding:10px;"><p style="padding:0; margin:0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00reb44.2bo11755.g00reb44.2bo12ad3%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Frakutenkobo-ebooks%252F27968133639f313d9536a671c6bf6a97%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Frakutenkobo-ebooks%252Fi%252F14605511%252F" rel="nofollow">徹底攻略ORACLE MASTER Bronze DBA 12c問題集［1Z0-065］対応【電子書籍】[ 株式会社クロノス　高山智史 ]</a></p><p style="color:#666; margin-top:5px line-height:1.5;"></p></td></tr></table>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT" alt="">