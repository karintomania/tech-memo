---
title: Spring Boot + Azure App Engine +Cosmos DBでAPIを無料で爆速開発する - その２
tags:
  - Java
  - Spring Boot
  - Azure
  - Cosmos DB
date: 2020-04-30 22:11:05
---

{% asset_img cosmos.png %}
**この記事はこちらの記事の続きです。**  
[Spring Boot + Azure App Engine +Cosmos DBでAPIを無料で爆速開発する - その１](/tech-memo/2020/04/2020-0430-springboot-azure-1/)

前回はSpring bootで作ったプロジェクトをazureにデプロイするところまで行いました。  

今回はCosmosDBに接続してAPIを完成させます。  
~しかし、ロゴがダさい...~
## 作るもの
改めて、成果物の確認です。  

プログラマに刺さるような名言を教えてくれるAPIを作成します。  
イメージはこんな感じです。  
{% asset_img GET.gif %}
<!-- more -->
## CosmosDBに接続する
まずはcosmos DBをazureポータルから作ります。  
ホーム＞新規作成＞CosmosDBで作成してください。  
{% asset_img cosmos01.png %}

APIは**Core(SQL)**を選んでください。  
他は適当で大丈夫です。  
{% asset_img cosmos02.png %}

次にDBとコンテナを作ります。  
データエクスプローラー画面から作れると思います。  
コンテナというのはRDBでいうテーブルです。  
コンテナの作成画面はこんな感じです。  
{% asset_img new_container.png %}

コンテナidをquoteとしました。  
{% asset_img new_container2.png %}

パーティションキーというのが必須項目ですね。  
これは普通にPrimaryキーとして使うidとは、また別みたいです。  

本来DBをリージョンごとで割りたいとか、  
高度なことができるらしいのですが、今回は良く分からないので（爆）、  
とりあえずquoteIdとしてidと同じ値を入れておくようにします。  

余談ですが、この辺の高度な感じがCosmosDBを名乗る由来で、  
宇宙レベルのアプリが作成できるとかなんとか。  

これでCosmos側の設定は完了です。  

## Spring bootの設定
それではSpring boot側での設定をしていきます。  

### pom.xmlの編集
pomにdependencyを追加します。  
{% codeblock pom.xml lang:xml %}
<dependency>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-cosmosdb-spring-boot-starter</artifactId>
</dependency>
{% endcodeblock %}

### application.properties
application.propertiesを編集して、  
CosmosDBの情報を設定します。  

これらの情報はAzureポータルでDBのページから見ることができます。  
設定＞キーってところです。  
このキーはプライマリーキーを使ってください。  

{% codeblock pom.xml lang:xml %}
# Specify the DNS URI of your Azure Cosmos DB.
azure.cosmosdb.uri=URI

# Specify the access key for your database.
azure.cosmosdb.key=キー

# Specify the name of your database.
azure.cosmosdb.database=DB名
{% endcodeblock %}

## 実装
それでは、DBに名言を追加・取得するような実装をしていきます。  
と言っても大した事はする必要がなく、  
SpringのCRUD Repositoryを継承したRepositoryを作ると、  
基本的なメソッドは実装する必要なく呼び出せてしまいます。  

大変便利ですね。  

### Entity
名言を格納するクラス、Quoteを作成します。  
ここで大事なのはDocumentアノテーションでCollection名を指定する事ですね。  
`@Document(collection = "quote")`
また、PartitionKeyにもアノテーションをつけています。  

Getter ,Setterとかがめんどくさいので、Lombokの`@Data`アノテーションを使用しています。  

{% codeblock Quote.java lang:java %}
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

@Data
@Document(collection = "quote")
public class Quote {

	@Id
	private String id;

	@PartitionKey
	private String quoteId;

	private String author;
	private String content;
}
{% endcodeblock %}

### Repository作る
RepositoryにはCosmosRepositoryを継承したinterfaceを作ります。  
{% codeblock QuoteRepository.java lang:java %}
@Repository
public interface QuoteRepository extends CosmosRepository<Quote, String>{

}
{% endcodeblock %}

### Cotroller作る
PostでRepositoryの`save()`メソッド、  
Getで`findById()`メソッドを使用しています。  
(Getで３をベタうちしているのは見逃してください...)  
{% codeblock QuoteController.java lang:java %}
@RestController
public class QuoteController {

	Random rnd = new Random();

	@Autowired
	QuoteRepository qr;

	@GetMapping("/")
	public Quote get(){
		final int r = rnd.nextInt(3) + 1;
		final String id = Integer.toString(r);
		final Optional<Quote> q = qr.findById(id);
		return q.get();

	}

	@PostMapping("/")
	public Quote post(@RequestBody Quote q){

		qr.save(q);
		return q;

	}

}
{% endcodeblock %}

### ローカルでのテスト
それでは以下のコマンドでまずはローカルから動作確認します。  
`mvn spring-boot:run`

まずはPOSTです
JSONにQuoteの内容を入れてPOSTします。登録された場合、そのQuoteがそのまま返ってきます。  
{% asset_img post.png %}

無事に登録されたようです。  
登録されたデータはazure上のデータエクスプローラから確認できます。  
{% asset_img post2.png %}

あと２件はWEBポータル上でGUIから登録てみます。  
JSONを貼り付けてSaveを押すだけで登録されます。  
{% asset_img insert_gui.png %}
_ridなどのアンダーバーから始まるカラムは自動で生成されます。  
{% asset_img inserted.png %}

簡単ですね。  
今回はこの３つを登録してみました。  
{% codeblock 心に刺さる名言達.json lang:json %}
{
    "id": "1",
    "quoteId": "1",
	"author": "Edward V Berard",
    "content": "Walking on water and developing software from a specification are easy if both are frozen."
}
{
    "id": "2",
    "quoteId": "1",
    "author": "pixadel",
    "content": "Fine, Java MIGHT be a good example of what a programming language should be like. But Java applications are good examples of what applications SHOULDN’T be like."
}
{
    "id": "3",
    "quoteId": "1",
    "author": "Larry Wall",
    "content": "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris."
}
{% endcodeblock %}

それではGETで名言を取得してみましょう。  
こんな感じでランダムに一つQuoteが返ってきます。  
{% asset_img get_local.png %}

## デプロイ
それではこのAPIをデプロイしてみましょう。  
デプロイは`mvn clean package && mvn azure-webapp:deploy`です。  

GETを飛ばしてみます
返ってきました。  
{% asset_img get_cloud.png %}

これでいつでもどこでも先人の名言に触れることができます。  
全く意味がないですが、嬉しかったので、GIFにしてみました。  
{% asset_img GET.gif %}

## 最後に

いかがだったでしょうか。  
このように簡単にAPIが作れるので個人開発が捗りそうですね。  
これを参考にSpring boot界隈が盛り上がったら良いなと思っています。  

## 参考
この記事を書くにあたって、以下を参考にしました。  
Azure公式のSpring Boot関連記事
https://docs.microsoft.com/ja-jp/azure/developer/java/spring-framework/deploy-spring-boot-java-app-with-maven-plugin

Azure公式のCosmos DB記事
https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-cosmos-db

それでは今日はこの辺で。  