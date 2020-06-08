---
title: Spring BootでJDBIを使う
tags:
  - Java
  - Spring Boot
  - OR Mapper
categories: 技術
date: 2020-03-24 00:53:54
---


## JDBIとは
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
JDBIはJavaの様々あるORマッパーの一つです。  
軽量かつ直感的な使い勝手が人気だということで、使ってみました。
今回はSpring Bootと一緒に使う方法を紹介します。  
<!-- more -->

この記事で利用しているソースは以下に公開しています。  
https://github.com/karintomania/jdbi-test

## Spring initializer
今日も元気にSpring initializrからスタートです。  
適当なプロジェクト名をつけて、依存性は以下の三つを入れておいてください。  
- Spring web
- JDBC
- H2
もちろんH2以外でも色々なDBにつなげます。  

## Build.Gradle
今回はGradleプロジェクトを使用しました。  
Mavenでも、まあ大差ないのではないでしょうか。
JDBIのライブラリとして、`jdbi3-spring4`を、
プラグインとして、`jdbi3-sqlobject`を依存性に追加します。  

 {% codeblock Buiild.gradle lang:groovy %}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-jdbc'
	implementation 'org.springframework.boot:spring-boot-starter-web'

	// jdbi関連を追加
	implementation 'org.jdbi:jdbi3-spring4:3.9.1'
	implementation 'org.jdbi:jdbi3-sqlobject:3.9.1'

	runtimeOnly 'com.h2database:h2'
	testImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
}

 {% endcodeblock %}

## application.properties
H2の設定をsrc/main/resources/applicaiton.propertiesにしておきます。
ここにDBの接続情報を記述します。  

 {% codeblock application.properties lang:properties %}
# datasource
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:./h2/test
spring.datasource.username=sa
spring.datasource.password=

# h2 for debug tool
spring.h2.console.enabled=true
spring.h2.console.path=/h2
 {% endcodeblock %}

一番下の二行はH2コンソール用の記述です。  
Springアプリケーションを起動した状態で  
http://localhost:8080/h2 にアクセスするとH2を管理する簡易的なアプリが起動します。  
なんというか古き良きJavaって感じのUIで好感が持てますね。
結果などをチラ見するのに便利なので、入れておいて損はないと思います。  
{% asset_img h2-console.png [h2コンソールの画面] %}

また、data.sqlという名前でSQLを`src/main/resources/data.sql`においておくと
勝手に読み込んで実行してくれるので、配置しておきます。  

 {% codeblock data.sql lang:sql %}
DROP TABLE IF EXISTS TBL_EMPLOYEES;
  
CREATE TABLE TBL_EMPLOYEES (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL
);

INSERT INTO TBL_EMPLOYEES (first_name, last_name) VALUES ('tarou','satou');
INSERT INTO TBL_EMPLOYEES (first_name, last_name) VALUES ('jirou','suzuki');
 {% endcodeblock %}

 
## Configurationファイル
さて、ようやくJavaです。  
Configurationファイルにjdbiの設定をします。  
こちらでjdbiインスタンスを生成します。  
このjdbiを呼び出して各処理をしていくイメージです。  
src/main/java/{ドメイン}/configuration/に配置しておきます。  

 {% codeblock JdbiConfig.java lang:java %}
package com.example.jdbitest.configuration;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class JdbiConfig {

	// applications.propertiesのspring.datasourceを読み込んでDatasourceを生成
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource driverManagerDataSource() {
        return new DriverManagerDataSource();
    }

	// TransactionManagerの生成
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
        dataSourceTransactionManager.setDataSource(dataSource);
        return dataSourceTransactionManager;
    }

	// Jdbiインスタンスを生成
    @Bean
    public Jdbi jdbi(DataSource dataSource) {
        return Jdbi.create(dataSource)
				// SqlObjectプラグインを読み込む
                .installPlugin(new SqlObjectPlugin());
    }
}

 {% endcodeblock %}

## Repository
長々と設定が続きましたが、やっと実装っぽい部分に入ります。  
JdbiRepositoryを定義します。  
 {% codeblock EmployeeJdbiRepository.java lang:java %}
package com.example.jdbitest.repository;

import java.util.List;

import com.example.jdbitest.entity.Employee;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Employee.class)
public interface EmployeeJdbiRepository{
	
	// 一件挿入
	// @GetGeneratedKeysをつけると結果に自動生成されたキーを返してくれる
	@GetGeneratedKeys
	// @BindBeanアノテーションでEmployeeクラスのfirstName,lastNameプロパティを
	// @SqlUpdate内のプレースホルダ(:firstName,:lastName)に紐づけている
	@SqlUpdate("insert into TBL_EMPLOYEES (first_name, last_name) values(:firstName, :lastName)")
	int insertEmployee(@BindBean Employee employee);

	// idで検索
	// こちらも@Bindアノテーションでプレースホルダと引数を紐づけている
	@SqlQuery("select * from TBL_EMPLOYEES where id = :id")
	Employee findById(@Bind("id") int id);

	// 全件選択
	// 検索結果とList<Employee>の紐付けは勝手にやってくれてる
	@SqlQuery("select * from TBL_EMPLOYEES")
	List<Employee> findAll();

}
 {% endcodeblock %}

そいつを呼び出すRepositoryクラスを作ります。  
 {% codeblock EmployeeRepository.java lang:java %}
 package com.example.jdbitest.repository;

import java.util.List;

import com.example.jdbitest.entity.Employee;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Component;

@Component
public class EmployeeRepository {

    private EmployeeJdbiRepository ejr;

    public EmployeeRepository(Jdbi jdbi) {
        this.ejr = jdbi.onDemand(EmployeeJdbiRepository.class);
    }

    public int insertEmployee(Employee employee) {
        return ejr.insertEmployee(employee);
    }

    public Employee findById(int id) {
        return ejr.findById(id);
	}
	
    public List<Employee> findAll() {
        return ejr.findAll();
	}
}
 {% endcodeblock %}


これで完成です！
とりあえずコントローラを作って使えるようにしてみます。  

 {% codeblock EmployeeController.java lang:java %}
 package com.example.jdbitest;

import java.util.List;

import com.example.jdbitest.entity.Employee;
import com.example.jdbitest.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emp")
public class EmployeeController{

	@Autowired
	private EmployeeRepository er;

	// Getのときは全従業員リストを返す
	@GetMapping
	public List<Employee> get(){
		
		return er.findAll();
	}

	// Postのときは新規Employeeを登録,登録結果を返す
	@PostMapping
	public Employee post(@RequestBody Employee e){
		
		int id = er.insertEmployee(e);
		return er.findById(id);
	}
}
 {% endcodeblock %}

Curlコマンドで呼び出してみましょう！

 {% codeblock curl実行結果 lang:bash %}
$ curl  -X GET http://localhost:8080/emp

// 実行結果
$ [{"id":1,"firstName":"tarou","lastName":"satou"},{"id":2,"firstName":"jirou","lastName":"suzuki"}]
 {% endcodeblock %}

 続いてPOSTも。
 {% codeblock curl実行結果 lang:bash %}
$ curl -d '{"firstName":"takeshi","lastName":"suzuki"}' -H "Content-Type: application/json" -X POST http://localhost:8080/emp

// 実行結果
$ {"id":3,"firstName":"takeshi","lastName":"suzuki"}
 {% endcodeblock %}

 古き良きJavaアプリケーション（言いたいだけ）H2コンソールでも
 テーブルの状態を確かめてみます。  
{% asset_img result.png [結果確認] %}

しっかり、データが登録されました。

## 所感
恥ずかしながらこのスライドを見るまでORマッパーはJPA一択だと思っていました。  
[Java ORマッパー選定のポイント](https://www.slideshare.net/masatoshitada7/java-or-jsug)
標準だからという理由だけで使っていたJPAですが、  
高機能であるが故に、実装が複雑になりがちなことと、  
SQLが自動生成なので、パフォーマンスの調整が難しくなることがあるので覚悟の上で使ってくれとのこと。  
JDBIはそう言ったこともなさそうですね。ベタ書きですし。    
個人的にはシンプルなものが好きなので、  
このくらいの機能感がちょうど良いのかなと思っています。  


この記事がお役に立てると幸いです。  

それでは今日はこの辺で。