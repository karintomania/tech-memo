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
