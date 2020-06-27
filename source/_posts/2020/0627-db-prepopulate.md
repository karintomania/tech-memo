---
title: 【Android開発】Roomを使う際にデータをあらかじめ設定(Prepopulate)する方法
tags:
  - android
  - Room
categories: 技術
featured_image: thumb.png
date: 2020-06-27 14:36:09
---


## 背景
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

Androidアプリを開発していると、
DBにあらかじめデータをセットしておきたいケースが多いと思う。

<!-- more -->
少し調べると、Prepopulateというキーワードで説明が公式にも載っている。
https://developer.android.com/training/data-storage/room/prepopulate

このページ曰く、
> asset/ フォルダにDBファイルを置いて以下のコードを実行すればOK (意訳)
> {% codeblock AppDatabase.kt lang:kotlin %}
Room.databaseBuilder(appContext, AppDatabase.class, "Sample.db")
    .createFromAsset("database/myapp.db")
    .build()
{% endcodeblock %}


ふむふむ、、、わからん。

このままではいかんせん、手の動かしようがない。
- assetフォルダってどこよ？
- myapp.dbはどうやって作るの？
- どうやって初期データを用意するの？

これらをどうにか解決したので、メモを残しておきたい。

## Roomを利用したDBの作成

ここは普通にいろんなサイトで紹介されているので、
割愛するが、一点だけ注意。

<u>versionを2以上にしとかないと後々めんどい。</u>
理由は後述。
{% codeblock versionの設定 lang:kotlin %}
@Database(entities = arrayOf(User::class), version = 2) // versionを2以上にする
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
{% endcodeblock %}

また、冒頭で登場した呪文をDatabaseBuilderでDBを宣言している箇所に記載する。

{% codeblock AppDatabase.kt lang:kotlin %}
Room.databaseBuilder(appContext, AppDatabase.class, "Sample.db")
    .createFromAsset("database/myapp.db") // この一行を追加
    .build()
{% endcodeblock %}

## asset フォルダの作成
まずデータを入れたDBファイルを格納するための、
assetフォルダを作成する。

プロジェクトフォルダを右クリックして、
`New > Folder > Asset Folder`
{% asset_img 01_asset.png %}
次のダイアログは特にこだわりがなければデフォルトでFinishボタンを押すだけ。

これでassetフォルダがプロジェクト内に作成される。

## DBファイルをデバイスから取得する
Roomで作成されたDBファイルを取得するため、Device File Explorerを開く。

各アプリのDBファイルは以下のパスに存在する。
`/data/data/(アプリのパッケージ名)/databases/(DB名)`
{% asset_img 02_data.png %}

これを`右クリック > Save as`して、ローカルPCの適当なフォルダに保存する

## DBにデータを格納
先ほど保存したDBファイルにデータを流し込む。
このファイルはSQLiteなので、SQLクライアントを使うなり何なりでデータを入れることが可能。

ちなみに、私はDBevaerを利用した。
[Macの無料SQLクライアントDBeaverを紹介する](/2020/05/2020-0508-dbeaver/)

## DBファイルの配置
作成したDBファイルをassetフォルダに格納する。
これは普通にコピー＆ペーストすればOK。


## バージョンを更新してDBを初期化する
DBの初期化は、<u>DBクラス内に記載されているバージョンが更新されたタイミング</u>で行われる。

- assetに入れたDBのバージョン
- DBクラスのバージョン
現状、二つのバージョンは同じなので、バージョンを更新してあげないといけない。

またややこしいのが、データが適用されるのは、
`asset内のDBのバージョン > DBクラスのバージョン`
の状態から
`asset内のDBのバージョン <= DBクラスのバージョン`
になった時のみらしい。

なので、とても面倒だが、
<u>DBクラスのバージョンを下げる(例えばv1)→Build→元に戻す(2に戻す)</u>  
といったプロセスを踏ませることで初期化が行われる。

バージョンが1の場合、
`asset内のDBのバージョン > DBクラスのバージョン`
となる状態を作れないために、最初にバージョンを2にする作業が必要だったのだ。

## まとめ
お疲れ様でした。
私はこの方法にたどり着くまで一週間くらいかかってしまった。

にしてもスマートじゃないところがたくさんあるので、
もっと良い方法があれば教えてください。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  
[SQLiteとは？特徴と使い方を解説する](/2020/06/2020-0610-sqlite/)