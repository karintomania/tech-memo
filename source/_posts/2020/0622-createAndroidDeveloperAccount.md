---
title: 【androidアプリ】リリースに向けてGoogle Playデベロッパーアカウントを作成する
tags:
  - android
categories: 技術
featured_image: thumb.png
date: 2020-06-22 08:01:23
---


## 背景
こんにちは。 [karintomania(twitter)](https://twitter.com/karintozuki)です。  

先日、個人開発のandroidアプリをリリースしました。  
[正規表現クエスト](https://www.regex.bedroomcomputing.com/)

アプリをリリースするためには、  
Google Playにデベロッパーアカウントを作成しないといけない。  
今回、それを作成した手順を紹介したい。  

<!-- more -->
## 用意するもの
- Googleアカウント（普通のやつでOK）
- クレジットカード
- メールアドレス
- $25

アプリをリリースするためには<u>登録料$25</u>（円じゃなくてドル。円なら良いのに）がかかる。  
一度支払えばそのあとは、いくつアプリをリリースしても追加料金は発生しないとのこと。  

たくさんアプリ作った方が得かな。  

## デベロッパーアカウント作成手順
### Google Play Consoleにログイン
https://developer.android.com/distribute/console
ここからログイン。  
Googleアカウントでログインする。  
{% asset_img 02_login.png %}

そうすると以下のような画面が出る。  
利用規約に同意するならチェックを入れて、  
支払いに進む。  
{% asset_img 03_convention.png %}

「一応販売と配布が可能な国の確認」というのができるが、  
もちろん日本は販売・配布共に可能。  

もし、特定の国を対象にするアプリをリリースするなら、  
確認した方が良いかもしれない。  

### 登録料の支払い
クレジットカード情報を入力する。  
{% asset_img 05_purchase.png %}

これで登録は完了。  
Googleさんから請求書が届く。  
{% asset_img 08_fee.png %}


### 開発者情報の入力
続いて、開発者情報を入れていく。  

ちなみにGoogle Playでアプリと一緒に表示されるメールアドレスは  
別に記入するところがあるので、このアドレスは非公開なはず。  

ただ、私はアプリと公開する用に新しく作ったアドレスがあったので、  
それを使うことにした。  
<u>
アプリ開発元としてのメールアドレスを持っておくと  
問い合わせなどが埋もれないため取り回しが良い。  
</u>

{% asset_img 06_info.png %}


情報を入力し終わったらコンソールの画面に入れるようになる。  
{% asset_img 07_done.png %}


## まとめ
アプリ公開の始めの一歩、アンドロイド開発者アカウントを作成した。  

最後に宣伝。
[今回、私が作ったアプリ](https://www.regex.bedroomcomputing.com/)では、
正規表現が勉強できるので、  
良かったらDLしていただきたい！  

それじゃ今日はこの辺で。  

## 関連記事
こちらの記事もおすすめです。  
[【androidアプリ】リリース用のBundle(APK)を作成する方法](/2020/06/2020-0622-createApk/)
[【androidアプリ】Google　Play Consoleでアプリをリリースする方法](/2020/06/2020-0622-release/)
