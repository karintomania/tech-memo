---
title: Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜
tags:
  - Java
  - Spring Boot
  - LINE Bot
categories: 技術
date: 2020-04-08 07:52:27
featured_image: spring.png
---


## 目的
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
JavaでLine Botを作る記事を検索したときに、  
Herokuデプロイボタン押させて、  
はい、オウム返しBotができました！！みたいな記事が多かったので、  
いや、そっから先はどうしたらいいんだよ、という試行錯誤を記事にしました。  



<!-- more -->
公式リポジトリでは三種類のサンプルが公開されています。
- echo (おうむ返し)
- echo kotlin(おうむ返しのkotlinによる実装)
- Kitchen Sink(全機能のサンプル)  

この記事通りに進めばKitchenSinkと名付けられた（命名の由来は謎）サンプルを動かせるようになります。  


このKitchenSink Bot君は色んなメッセージの返信方法（画像やボタンなど）を一通り実装してくれています。  
例えばimageとメッセージを送信すると画像を送信してくれます。  
他にもbuttonsと送信するとボタンが送られてくるのですが、  
ボタンを押すと、rice=米という謎のメッセージが発信されるという、  
粋なギミックがあったりします。  

{% asset_img rice.png [rice=米という粋なメッセージ] %}
##  LINE Dev登録
LINE Botを作る下準備として、Bot用のアカウント(=チャネル)が必要です。  
チャネルの作り方は公式が丁寧なので、そちらに譲ります。  
https://developers.line.biz/ja/docs/messaging-api/getting-started/#%E3%83%81%E3%83%A3%E3%83%8D%E3%83%AB%E3%81%AE%E4%BD%9C%E6%88%90


チャネルができたらチャネルシークレットとチャネルトークンを控えておいてください。  
また、Auto-replyを無効にしておかないとBotのメッセージではなく、デフォルトの自動返信メッセージが送信されてしまうので、  
こちらをDisableにしておきます。  
{% asset_img channelsecret.jpg [チャネルシークレット] %}
{% asset_img channelsecret.jpg [チャネルトークン] %}


## 開発
ここからは開発です。  
大まかな流れとしては、  
- 公式のGithubからサンプルをコピーしてくる
- Spring Bootのプロジェクトを作る
- サンプルのファイル類をコピーする
- ngrokで実行
となります。  

SpringBootのプロジェクトを作って、そこにソース類をコピーするという
少々回りくどいやり方になっています。  

**なぜそんなことをしているか（弁明）**
実際、Githubからクローンしてきた段階で  
KitchenSinkサンプルが動くは動くのですが、  
そのままだとライブラリ自体のソースや他のサンプルソースも同梱された状態で  
サンプルをベースに開発する際の邪魔になるので、  
このような手法を取りました。  
誰かもっといい方法を知っていたら教えていただきたいです。  

## 公式リポジトリをクローン
git hubから公式リポジトリをクローンしてきます。  
git cloneなりダウンロードするなりでソースを手に入れてください。
今回はこの中のsample-spring-boot-kitchensinkフォルダの中身だけ使います。
https://github.com/line/line-bot-sdk-java
このステップでは、ローカルにソースがダウンロードできたらOKです。
   
## Spring bootのプロジェクトを作る
Spring initializrとか使ってください。(適当)
今回はGradleプロジェクトを作成しますので、Mavenを使う人は適宜読み替えてください。  
https://start.spring.io/

dependencyですが、
- Web
- Lombok
を追加してください。  
Lombokが必要なことに注意してください。

## LINE Bot SDKの追加
先のステップで作ったプロジェクトの
build.gradleにLine bot sdkを追加します。
最終的なBuild.gradleは以下の感じになります。  
{% codeblock build.gradle lang:gradle %}
plugins {
	id 'org.springframework.boot' version '2.2.6.RELEASE'
	id 'io.spring.dependency-management' version '1.0.9.RELEASE'
	id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	// LINE SDK
	implementation 'com.linecorp.bot:line-bot-spring-boot:3.5.0'
	// project lombok
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
}

test {
	useJUnitPlatform()
}

{% endcodeblock %}
   
## 公式リポジトリからソースのコピー
sample-spring-boot-kitchensink内のjavaファイルを先ほど作ったSpringプロジェクトにコピーします。

sample-spring-boot-kitchensink/src/main/java/com/example/bot/spring/
- ExampleFlexMessageSupplier.java
- KitchenSinkWebMvcConfigurer.java
- KitchenSinkApplication.java
- MessageWithQuickReplySupplier.java
- KitchenSinkController.java

また、static以下の画像ファイルたちもコピーします。
sample-spring-boot-kitchensink/src/main/resources/static

## application.properties
src/main/resources/application.propertiesに先ほど取得したchannel-secretとchannel-tokenを記載します。  
また、メッセージを受け取るURLを指定できるので、ここではcallbackとしておきます。  

 {% codeblock application.properties lang:properties %}
line.bot.channel-token=ここにtokenを入力
line.bot.channel-secret=ここにsecretを入力
line.bot.handler.path=/callback
 {% endcodeblock %}


##  ngrokでテスト
さて、プロジェクトを実行してみましょう。
僕はVS Codeを利用しているので、Debug実行(F5)をするだけです。
他のIDEを使っている人もSpring boot実行用の操作があるはずなので、  
実行してみてください。  
{% asset_img spring.png [Springが起動した] %}
動きました！

とはいえ、このままだと全然LINEと関係ないので、  
ngrokで公開したいと思います。  
ngrokはローカルホストをhttpsで公開できるようにしてくれるツールです。  
LINE botを開発するならめちゃくちゃオススメです。  
Macであればbrewでインストールできるらしいのですが、  
僕の環境ではなぜかbrewできなかったので、npmからインストールしました。
インストールできたら以下のコマンドで実行します。  
```ngrok http 8080```
{% asset_img ngrok.png [ngrok] %}

このhttpsのアドレスをLINE Botの設定ページでWebhook URLとして指定してあげます。
{% asset_img webhook.png [webhook urlの設定] %}
**注意**
URLの末尾に/callbackを入れるのを忘れないようにしてください。  
Verifyボタンからテストもできるので、Localhostとつながっている事を確認しましょう。  

## 動作確認
さて、ここまでできたらLINE Botが使えるようになっているはずです。  
何かメッセージを送ってみましょう。  
このBotは送信したメッセージで分岐していて、  
imageなど打つとimageのサンプルが返ってきます。
{% asset_img kitchensink.png [Kitchen Sink Botの動作イメージ] %}

実装が確認できるメッセージ一覧
- profile
- bye
- confirm
- buttons
- carousel
- image_carousel
- imagemap
- imagemap_video
- flex
- quickreply
- no_notify
- icon

色々試してみてLineBotのイメージをつかんでみてください。  
次回はJsonを使ってメッセージのレイアウトを自由に設定できる  
FlexMessageを解説してみたいと思います。  
最後まで読んでいただきありがとうございました。  
では、今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

この記事の続き→[LINE BotでFlex Messageを使う (with Spring Boot)](/2020/04/2020-0415-flexMessage/)
[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)

## 【PR】おすすめ技術本

Spring Bootの勉強にはこちらがおすすめです。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/053/479/20010009784798053479_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">Ｓｐｒｉｎｇ　Ｂｏｏｔ２プログラミング入門   /秀和システム/掌田津耶乃</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4798053473%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
{% endraw %}