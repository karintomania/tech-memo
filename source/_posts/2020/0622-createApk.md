---
title: 【androidアプリ】リリース用のBundle(APK)を作成する方法
tags:
  - android
categories: 技術
featured_image: thumb.png
date: 2020-06-22 08:01:31
---
## 背景
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  

androidアプリの公開を公開する際には、  
公開用にBundleファイル（もしくはapk）を作成する必要がある。  

出てくる用語を解説しながら、(Bundleって何？とか)  
その手順をまとめる。  
<!-- more -->

## 前提条件
- <u>アプリ開発完了していること</u>
まあ、書くまでも無いかもだけど。大事だよね。  

私の環境は以下の通り。  
- OS:Mac
- IDE:android studio

## 作成手順
android studioにて、  
`Build > Generate Signed Bundle / APK`
{% asset_img 01_generate.png %}

### BundleとAPK
Bundle/APK作成用のダイアログが開く。  

どちらかを選んでNextボタンを押す。
この記事ではBundleで進めるけど、APKも同じはず。  
{% asset_img 02_apk.png %}

### そもそもBundle/APKとは
ざっくり調べたところ
- APK
アプリに必要なファイルをインストールできる形式にまとめたもの

- Bundle
基本、APKと同じだが、Budnleにした場合、端末ごとに必要・不要なライブラリ等を、  
自動で判別してくれるため、容量を減らすことができる

要はBundleはAPKの上位互換なので、<u>特別な理由がない限りはBundleを選択しておけばOK。</u>  


### keystoreとkey
次の画面ではkeystoreとkeyを作成する。  

keyというのが鍵でkeystoreがその鍵を格納しておくところらしい。  
観念的にしか説明できず申し訳ない。  

{% asset_img 02_dialog.png %}
以前にkey、keystoreを作成したことがなければ、  
`Create New`をクリックする。  

{% asset_img 03_key.png %}

少し詰まりそうなところだけ解説。  

- keystore path
適当にフォルダを作る。私はAndroid Studioのフォルダ内にkeystoreフォルダを作成した。  
`/Users/karintomania/Documents/AndroidStudio/keystore`
<u>実際にそのフォルダが存在しないとエラーになる</u>ため、事前に作成しておくこと。

- alies
デフォルトのkey0でOK

- Validity
keyの有効期限。  
25年がデフォルトで、いじらなくてもいいらしい。  
まあ、そういうものらしい。  

- Certificate
とりあえず名前だけ入れて作ったが今のところ問題はない。  
項目を律儀に全部入れる必要はないらしい。  

必要事項を埋めたらOKボタンを押す。  

以下の画面でフォルダなどを確認して、問題なければNext。  
Remember Passwordのチェックは入れとくと便利。  
{% asset_img 03_directory.png %}

### variantの選択
{% asset_img 04_release.png %}
releaseかdebugを選ぶのだけれど、  
当然ここはreleaseを選択。  

Finishボタンを押すとビルドが始まる。  

### Bundle(APK)ファイルの確認
無事に終わると以下フォルダにBundleファイル(拡張子aab)が生成される。  
`{プロジェクトフォルダ}/app/release/app-release.aab`

## まとめ
最初やった時は、どこをどうして良いか分からずハマったが、  
慣れてしまえば簡単。  

最後に宣伝だけ。
[今回、私が作ったアプリ](https://www.regex.bedroomcomputing.com/)では、
正規表現が勉強できるので、  
良かったらDLしていただきたい！  

それじゃ今日はこの辺で。  

## 関連記事
こちらの記事もおすすめです。  
[【androidアプリ】リリースに向けてGoogle Playデベロッパーアカウントを作成する](/2020/06/2020-0622-createAndroidDeveloperAccount/)
[【androidアプリ】Google　Play Consoleでアプリをリリースする方法](/2020/06/2020-0622-release/)