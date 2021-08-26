---
title: Spring Boot + Azure App Engine +Cosmos DBでAPIを無料で爆速開発する - その１
tags:
  - Java
  - Spring Boot
  - Azure
  - Cosmos DB
categories: 技術
date: 2020-04-30 22:10:40
featured_image: title.png
---

## 背景
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
今まで個人開発で使ってきたHerokuの無料枠に制限が増えて、  
一日に6時間以上サーバーをスリープさせないといけなくなってしまいました。  

今、ちょうどモバイルアプリのバックエンドを構築しようとしているので、  
一日６時間のダウンタイムは厳しい。というわけで、代替のPaaSを探すことになりました。  

<!-- more -->
## Azureにした理由

クラウド初心者のため、深い理由は特にないのですが、  
+ 永久無料枠が用意されているから。  
+ Springboot関連の資料が多い。  
+ DBにも無料枠がある
ざっくりいうと以上な感じです。  
無料のDBというのが意外とないんですねー。  

## 作るもの
今回は、プログラマ向けの名言を返してくれるAPIを作ってみます。  
以下、要件です。  
- GETでランダムに名言・言った人を一個返す
- POSTで名言を追加できる
それでは始めましょう。  

## 前提条件
以下を前提としています。  
- Spring Boot分かる
- maven入ってる
- Azureのサブスクリプション持ってる

Azureのサブスクリプションがなければ、  
さくっと作成してください。  

クレカと電話番号の登録が必要なので、ご用意をお忘れなく。  

## Spring Initializrでプロジェクト作成
Spring Initializrを使用して新規Spring bootプロジェクトを作成します。  

注意することとしては、 
- Mavenプロジェクトを選ぶ
- 依存性は以下を選択
	- Web
	- Azure support
	- (必要であれば) Lombok
Artifactはquoteapiなどとしてください。  
{% asset_img springini.png [springinitializr] %}

## Azure CLIのインストール

インストールは公式を参考にしてください。  
Mac使っていればBrewで簡単にいけます。  
`brew update && brew install azure-cli`
インストールできたら
`az login`コマンドを叩きます。  
ブラウザが立ち上がってAzureのログイン画面が表示されるので、   
ログインしたら認証完了です。  

## Azureにデプロイする

それでは先ほど作成したSpring bootプロジェクトを設定して、  
Azureにデプロイするところまでいきましょう。  

### POMの編集
pom.xmlを編集します。  
pluginsのところに以下を追加してください。  
 {% codeblock pom.xml lang:xml %}
<plugin>
 <groupId>com.microsoft.azure</groupId>
 <artifactId>azure-webapp-maven-plugin</artifactId>
 <version>1.9.0</version>
</plugin>
 {% endcodeblock %}

追加したら以下のMavenコマンドを叩いてください。  
`mvn azure-webapp:config`
OSとjavaのバージョンを聞かれますので、   
何もなければデフォルトで作成してください。  

コマンドが実行されるとpom.xmlに項目が追加されます。  
さらに設定を追加していきましょう。  
先ほど追記したあたりに以下の項目があるので、値を設定します。  
- resourceGroup
  使用したいresourceGroupがあれば指定。なければデフォルトでも命名しても構わない。  
- appName
  アプリ名です。  
- pricingTier
  F1にすること。そうでないと課金対象です。  
 
{% codeblock pom.xml lang:xml %}
<configuration>
          <schemaVersion>V2</schemaVersion>
          <resourceGroup>YOUR_RESOURCE_GROUPID</resourceGroup>
          <appName>YOUR_APP_NAME</appName>
          <pricingTier>F1</pricingTier>
          <region>centralus</region>
{% endcodeblock %}

また、その少し下に`runtime`タグと`deployment`タグがあるのですが、   
その間に`appSetting`タグを追加して、ポート80を使用するようにします。  

{% codeblock pom.xml lang:xml %}
<runtime>
            <os>linux</os>
            <javaVersion>jre8</javaVersion>
            <webContainer>jre8</webContainer>
          </runtime>
		         <!-- Begin of App Settings  -->
       <appSettings>
          <property>
                <name>JAVA_OPTS</name>
                <value>-Dserver.port=80</value>
          </property>
       </appSettings>
       <!-- End of App Settings  -->
          <deployment>
            <resources>
              <resource>
{% endcodeblock %}
ここまでできたらazure用の設定は完了です。  

### Localでの動作確認
それではAPIのエンドポイントとなるコントローラを作成します。  
現時点ではとりあえず文字列`Hello Azure`を返すものにします。  

{% codeblock QuoteController.java lang:xml %}
@RestController
public class QuoteController {

	@GetMapping("/")
	public Quote get(){
	return "Hello, Azure";
	}
{% endcodeblock %}
特に難しいことやazure固有の実装はありません。  

localで動作確認します
`mvn spring-boot:run`

Getリクエストを出してみましょう。  
{% asset_img get01.png %}
きちんと動作していますね。  

### Azureへデプロイ
それではazureへデプロイします。  
デプロイは以下のコマンドでできます。  
このmvn cleanをしないと変更が反映されないので、  
ご注意下さい。  
`mvn clean package && mvn azure-webapp:deploy`

azureのポータルに行ってアプリができていることを確認しましょう。  
{% asset_img app.png %}
うまくいっていればApp Serviceに新しいサービスが追加されています。  

また、httpsに対応したURLが発行されています。  
PaaSは無料かつ面倒な設定無しでHTTPS対応できることも大きいメリットですね。  
{% asset_img app_page.png %}

無料プランだからなのか、   
デプロイがすぐ反映されないこともあります。 
少し待ったらうまくいったりするので
気長にやりましょう。  

次回はazureのDBサービスCosmosDBに接続して本格的にAPIとしての機能を作っていきます。  

今日はこの辺で。  


## 関連記事
こちらの記事もおすすめです。  
[Spring Boot + Azure App Engine +Cosmos DBでAPIを無料で爆速開発する - その２](/2020/04/2020-0430-springboot-azure-2/)


## 【PR】おすすめ技術本

Spring Bootの勉強にはこちらがおすすめです。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/053/479/20010009784798053479_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">Ｓｐｒｉｎｇ　Ｂｏｏｔ２プログラミング入門   /秀和システム/掌田津耶乃</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4798053473%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
{% endraw %}