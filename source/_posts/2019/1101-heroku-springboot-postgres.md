---
title: HerokuのPostgreSQLにSpringアプリケーションから接続する
tags:
  - Heroku
  - Java
  - Spring Boot
  - PostgreSQL
date: 2019-11-04 22:29:39
---


Spring bootで作成したアプリケーションをHerokuにアップロードする際に、  
データベースを使用したいですよね。  

Herokuで無料で使えるPostgreSQLをSpring bootアプリケーションから使えるようにしてみます。  

<!-- more -->
## 前提
+ LocalにPostgreSQLがダウンロード済み

## Spring Bootプロジェクトの作成
Spring Initializrにて、以下のDependencyを含むプロジェクトを作成します。

+ Spring Web
+ Spring Boot DevTools
+ Thymeleaf
+ PSQL Driver
+ Spring Data JPA

そのままデバッグするとDB接続が設定されていないために警告が出ます。  
application.propertiesで接続情報を設定しましょう。

{% codeblock application.properties%}
# 接続情報
spring.datasource.url=jdbc:postgresql://localhost:5432/接続するDB名
spring.datasource.username=DBのユーザ名
spring.datasource.password=DBのパスワード

# ----以下はお好みで設定してください。----

# 発行されたSQL文をログに残す
spring.jpa.show-sql=true
# テーブルが存在しなかった場合、作成する
spring.jpa.hibernate.ddl-auto=update
{% endcodeblock %}

DB接続を確認するため、簡単なプログラムを組んでみます。
Customerエンティティとそのリポジトリを作成します。

{% codeblock Customer.java lang:java %}
//import省略
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;

    protected Customer() {}

	//getter, setter 省略
}
{% endcodeblock %}


{% codeblock CustomerRepository.java lang:java %}
//import省略
public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
{% endcodeblock %}

それではコントローラを作成してみます。
~~CustomerControllerって不穏なクラス名ですね。~~

{% codeblock CustomerController.java lang:java %}
//import省略

@Controller
public class CustomerController {

	@Autowired CustomerRepository cr;

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView();

		Iterable<Customer> customerList = cr.findAll();
		mav.addObject("customerList", customerList);
		mav.setViewName("customerList");
        return mav;
	}
}
{% endcodeblock %}

テンプレートはこうなります。
{% codeblock customerList.html lang:html %}

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	Hello
	<table>
	<tr th:each="customer: ${customerList}">
		<td th:text="${customer.id}" />
		<td th:text="${customer.firstName}" />
		<td th:text="${customer.lastName}" />
	</tr>
	</table>
</body>
</html>

{% endcodeblock %}

テーブルも用意しておきましょう。
{% codeblock insertCustomer.sql lang:sql %}

CREATE TABLE customer (
	id int8 NOT NULL,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	CONSTRAINT customer_pkey PRIMARY KEY (id)
);

INSERT INTO public.customer (id,first_name,last_name) VALUES 
(1,'田中','一郎')
,(2,'鈴木','次郎')
,(3,'佐藤','マイケル')
;

{% endcodeblock %}

ようやく準備が整いました。  
ローカル環境で実行してみてください。
まあ、しょぼいページですが良いでしょう。
![しょぼいページ](Hello.png)

## Herokuアプリケーションの作成
作成したアプリケーションをHerokuにデプロイします。  
まずは以下のコマンドでデプロイします。

```
# heroku create
# git init
# git remote push https://createしたアプリのgitURL
# git push heroku master
```

このままだとHerokuアプリケーション上にDBが存在しないためエラーが出ます。  
以下のコマンドでDBを作成しましょう。  
```
# heroku addons:create heroku-postgresql:hobby-dev
```
DBができたら接続情報を確認します。

### 注意
公式には以下のようにあります。  
が、自分の環境では設定しないと接続できませんでした。  
とんでもなくハマりました。  
{% blockquote Heroku公式 https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku#connecting-to-a-database
 Deploying Spring Boot Applications to Heroku %}
Once the database add-on has been created, Heroku will automatically populate the environment variables SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, and SPRING_DATASOURCE_PASSWORD. These environment variables should allow your Spring Boot application to connect to the database without any other configuration as long as you add a PostgreSQL JDBC driver to your dependencies like 以下略
**超ざっくり和訳**
DBのURL、ユーザ名、PWは自動生成するからPostgreSQLのJDBC入れるだけで設定はOKやで〜。
{% endblockquote %}


では、接続情報はどこから取得するかと言うと、  
Herokuに作成したアプリケーションのページから取得できます。  
アプリケーションページからPostgresのマークをクリックします。
![アプリケーションページ](psql.png)
その後、Postgresアドオンのページに飛ぶので、  
Setting > Credentialsから以下項目を控えます。  
+ Host
+ Database
+ User
+ Password

![DBのクレデンシャル情報](DB.png)

その内容でapplication.propertiesを編集します。  
{% codeblock application.properties%}
# 接続情報
spring.datasource.url=jdbc:postgresql://{host}:5432/{Database}
spring.datasource.username=User
spring.datasource.password=Password
# 以下略
{% endcodeblock %}

この内容でデプロイしてみてください。  
動作したでしょうか。  


## 環境変数を設定する
先ほどのUser名やPWベタ打ちはわかりやすくはありますが、  
ローカルとHerokuデプロイの際に毎回ファイルを書き換えないといけなかったり、  
セキュリティ面で不安があります。  

そこで環境変数を設定しましょう。  


まずはapplication.propertiesを以下のように編集します。  
${}で囲った部分が環境変数で置き換えられます。
{% codeblock application.properties%}
# 接続情報
spring.datasource.url=${POSTGRES_URL}
spring.datasource.username=${POSTGRES_USER}
spring.datasource.password=${POSTGRES_PASS}
# 以下略
{% endcodeblock %}

それでは環境変数を設定しましょう。  
まずはHerokuです。アプリケーションページの
Settings > Config Varsから
* POSTGRES_URL 
* POSTGRES_USER
* POSTGRES_PASS
の三つを設定してください。  

![環境変数の設定](env_heroku.png)
画像一番上のDATABASE_URLは自動で生成されるようで  
特にいじっていないのですが、用途不明です。  

また、ローカルではどのエディタを使用しているかで  
違うのですが、私が使っているVSCodeを例に紹介します。  
VSCodeにはlaunch.jsonというデバッグ時の設定ファイルがあります。  
サイドメニューからデバッグ(虫みたいなやつ)を開いて、歯車をクリックするとlaunch.jsonが開きます。  
![launch.json](env_vs.png)
その中にjava用の設定箇所があるので、以下のenvの内容を追記します。  
{% codeblock launch.json lang:json%}
	"configurations": [
		{
			"type": "java",
			"name": "Debug (Launch) - Current File",
			"request": "launch",
			"mainClass": "${file}",
			// envを追加
			"env": {"POSTGRES_URL":"jdbc:postgresql://localhost:5432/mydb","POSTGRES_USER":"{ユーザ名}","POSTGRES_PASS":"{パスワード}"}
		},
{% endcodeblock %}

以上で、環境変数が設定されました。  
ローカル、Heroku上どちらでも動作することを確認してみてください。
