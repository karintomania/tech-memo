---
title: MyBatis Spring Bootを使ってみた
tags:
  - mybatis
  - Java
  - OR Mapper
  - Spring Boot
categories: 技術
date: 2020-03-27 23:55:34
featured_image: mybatislog.png
---

こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
今回はJavaのORマッパー、Mybatisを使ってみます。  

<!-- more -->
## Projectの作成
MybatisはSpring Initializrに採用されているため、簡単に使えます。  
[SpringInitializr](https://start.spring.io/)

Initializrでは以下をDependencyとして入れてください。  
今回はDBとしてH2を使用するので、H2も追加しましょう。  
- web
- jdbc
- mybatis
- H2
ビルドツールはGradleを使いますが、Mavenを使いたい人は適宜、読み替えてください。  
{% asset_img initializr.png %}


build.gradle は以下のようになります。  
{% codeblock build.gradle lang:gradle %}
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-jdbc'
	implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.2'
	runtimeOnly 'com.h2database:h2'
	testImplementation('org.springframework.boot:spring-boot-starter-test') {
		exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
	}
}
{% endcodeblock %}

## 設定
mybatis spring bootを使って驚いたのが、  
<u>その設定の少なさです。</u>  
今日は、何とapplication.propertiesを一行も書かずにコードが動きます。  

Javaだけ書きましょう！  

ただ、テスト用にテーブルを作る必要があるので、  
src/main以下のresourceフォルダにschema.sqlを作成します。  

これもSpring Bootなら空気を読んで、resourceフォルダに置くだけで勝手に実行してくれます。  
超便利。  
{% codeblock schema.sql lang:sql %}
DROP TABLE IF EXISTS BOOK_MASTER;
  
CREATE TABLE BOOK_MASTER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL
);

INSERT INTO BOOK_MASTER (title, author) VALUES ('kokoro','Soseki Natsume');
INSERT INTO BOOK_MASTER (title, author) VALUES ('rashoumon','Ryunosuke Akutagawa');
{% endcodeblock %}

## Entityの定義
BOOK_MASTERに対応するEntityクラスを作ります。  
特にアノテーションとかは不要です。  

{% codeblock Book.java lang:java %}
package com.example.mybatis;

public class Book{

	int id;
	String title;
	String author;

	// getter, setter
}
{% endcodeblock %}

## Mapper定義
次にMapperと呼ばれるクラスを作成します。  
ここに実際のSQLを記載していきます。  
`@Mapper`アノテーションが必要です。  

{% codeblock .java lang:java %}
package com.example.mybatis;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface BookMapper {
	// 1件検索
    @Select("SELECT * FROM BOOK_MASTER WHERE id = #{id}")
	Book findOneById(@Param("id") int id);
	
	// 1件挿入
	@Insert("INSERT INTO BOOK_MASTER (title, author) VALUES (#{title},#{author})")
	// Auto Incrementに対応する
	@Options(useGeneratedKeys=true, keyProperty="id")
	void insert(Book book);

	// 全件選択
    @Select("SELECT * FROM BOOK_MASTER")
	List<Book> findAll();

}
{% endcodeblock %}

@Optionsアノテーションでは、Auto_incrementで生成されたIDを取得するように設定しています。  
idが0のBookクラスを渡しても自動で値を更新してくれます。  

さて、BookMapperを呼び出すControllerを書いてみます。  
<u>GETで検索、POSTで挿入</u>ですね。

BookMapperはAutowiredでDIすることができます。  
{% codeblock .java lang:java %}
package com.example.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
class BookController{
	
	@Autowired
	BookMapper bm;
	

	@GetMapping("/test")
	public Book get(@RequestParam int id){
		return bm.findOneById(id);
	}
	@GetMapping("/test/all")
	public List<Book> getAll(){
		return bm.findAll();
	}
	@PostMapping("/test")
	public Book post(@RequestBody Book book){
		bm.insert(book);
		return book;
	}
}
{% endcodeblock %}

curlコマンドでテストしてみます。  
{% codeblock lang:bash %}
// 全件選択
$ curl -X GET http://localhost:8080/test/all

// 出力結果
[{"id":1,"title":"kokoro","author":"Soseki Natsume"},{"id":2,"title":"rashoumon","author":"Ryunosuke Akutagawa"}]



// idでのSELECT
$ curl -X GET http://localhost:8080/test?id=1

// 出力結果
{"id":1,"title":"kokoro","author":"Soseki Natsume"}



// INSERT
$ curl -X POST -H "Content-Type: application/json" -d '{"title":"ningen shikkaku", "author":"Osamu Dazai"}' http://localhost:8080/test

// 出力結果
{"id":3,"title":"ningen shikkaku","author":"Osamu Dazai"}
{% endcodeblock %}


ちゃんと動きました！！！

## 所感
設定が少なく動作するのがいいですね。  
これまでJPAしか使っていなかったのですが、  
より軽量な代替案として使っていこうと思います。  

それでは今日はこの辺で。

## ところで...
<u>仕事で扱っている技術がレガシーだったり、同じことの繰り返しだったりで</u>
<u>最近、成長してないと感じてませんか？</u>

転職することで、もっと成長できるかもしれません。

いますぐ転職しない人でも、とりあえずエージェントに登録しておいて
<u>案件や年収を眺めるだけでも市場の需要を知ることができ、</u>勉強になります。

ここでエンジニアに人気の転職サイトを紹介します。

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">


## 関連記事
こちらの記事もおすすめです。  
[Macの無料SQLクライアントDBeaverを紹介する](/2020/05/2020-0508-dbeaver/)
[Spring BootでJDBIを使う](/2020/03/2020-0324-jdbiSpring/)


## 【PR】おすすめ技術本

Spring Bootの勉強にはこちらがおすすめです。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/053/479/20010009784798053479_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">Ｓｐｒｉｎｇ　Ｂｏｏｔ２プログラミング入門   /秀和システム/掌田津耶乃</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00rd1d4.2bo114c4.g00rd1d4.2bo126fd%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbooxstore%252Fbk-4798053473%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbooxstore%252Fi%252F12262146%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4798053473%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>
{% endraw %}