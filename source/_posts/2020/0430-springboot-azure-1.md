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


## PR
あなたの会社はあなたの技術を評価してくれていますか？
技術力を高めようと頑張っているのに、
技術が評価されないような会社にいたらそれは良い環境なのでしょうか？
エンジニアとして技術を高めたいのなら環境を選ぶことも大事です。

**レバテックキャリア**
エンジニアとして働いていて実務経験があるなら、
求人数の充実具合からレバテックキャリアがおすすめです。
<u>IT転職ではデファクト・スタンダード</u>ですね。
[▼レバテック　キャリア 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZRIB5 )
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" rel="nofollow">
<img border="0" width="728" height="90" alt="" src="https://www22.a8.net/svt/bgt?aid=210117795527&wid=001&eno=01&mid=s00000011866006030000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" alt="">

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">
