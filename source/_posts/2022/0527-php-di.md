---
title: PHP DIでDIを学ぶ
tags:
  - PHP
  - php-di
  - DI
categories: 技術
featured_image: thumb.png
date: 2022-05-27 13:40:32
---


##  背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
この記事ではDI（Dependency Injection: 依存性注入）とは何なのか、を
php-diというDIコンテナを使って説明したいと思います。
<!-- more -->

## DIとは
DIはDependency Injectionの頭文字をとったもので、
日本語にすると、依存性注入と訳せます。

### 依存性とは
何かのクラスAがあったとします。
<u>
クラスAが他のクラスBを使うとき、クラスBはクラスAの依存性です。
クラスAはクラスBに依存しているということもできます。
</u>

これを普通にコードにしてみると以下の感じになると思います。
{% codeblock lang:php %}
<?php
// 依存性注入を使わない例
class ClassA {
	private ClassB $b;
	
	function __construct(){
		$this->b = new ClassB();
	}
}

{% endcodeblock %}

### 依存性注入
先ほどの例では、クラスBをクラスAの中で`new`していました。
<u>
依存性注入では、依存性であるクラスBを外部から「注入」します。
</u>

以下のコードを見てください。
{% codeblock lang:php %}
<?php
// 依存性注入を使う
class ClassA {
	private ClassB $b;
	
	function __construct(ClassB $b){
		$this->b = $b;
	}
}

{% endcodeblock %}

コードから`new`が消えましたね。

これをするメリットは依存性を一か所にまとめることができることです。

**依存性注入を使わずにクラスAを使う場合**
1.アプリケーションがクラスAをnewする
2.クラスAがクラスBをnewする

**依存性注入を使ってクラスAを使う場合**
1.アプリケーションがクラスAに必要なクラスBをnewする
2.アプリケーションがクラスBを渡してクラスAをnewする

依存性注入を使う場合、主語がアプリケーションになっていることが分かるでしょうか。
個別のクラスは依存しているクラスの詳細を知る必要がなく、
アプリケーション一か所にクラスの宣言をまとめることができます。

これとInterfaceを合わせて使うことでクラスAのコードを変更することなく、
クラスBをクラスCに変えるなんてことができるようになります。
（DIとInterfaceについては詳しく後述します。）

### 余談 IoC（Inversion of Control: 制御の反転）
DIの文脈でIoCという言葉も良く出てきます。
これは先ほどの例でいうと、依存性クラスBを制御（new）するのが、
クラスA（アプリケーションから呼び出される側）からアプリケーション（Aを呼び出す側）に
反転しているという意味です。

Dependency Inversionということもあるみたいです。
いわゆるSOLID原則のDはDependency Inversionですね。

## DIコンテナとは
まずはじめに、DIとDIコンテナの違いを説明します。
**DI**
DIはきれいなコードを書くためのテクニックです。

**DIコンテナ**
DIコンテナはDIを簡単に書くためのライブラリでDIを実装する際に便利な機能を有します。 

DIはシンプルにテクニックの名前なので、
DIコンテナを使わなくてもDIを使ったコードは書けます。


### DIコンテナの基本機能
最後にDIコンテナはどんな機能を提供するのか、
それにはどんなメリットがあるのか、具体例を紹介します。

#### DIコンテナphp-diの紹介
この記事ではphp-diというDIコンテナを使っていきます。
他にもDIコンテナはあるのですが、このライブラリが一番使われているようだったので、
php-diをチョイスしました。
何となく使えてしまうというか、直感的に使えるのでおすすめです。

また、LaravelのようなWebフレームワークを使っている方は
元からDIコンテナがフレームワークに組み込まれています。

呼び出し方や設定が違うだけで、根本の考え方は同じなので、
この記事を参考に自分が使っているフレームワークでは
どのような実装になるのか調べてみてください。

####  機能１．宣言を一か所にまとめる
先ほど、DIを使うと主語がアプリケーションになる、という説明をしました。
DIコンテナを使う場合、このアプリケーションに当たるのがDIコンテナです。
そのため、DIコンテナは
- すべてのクラスをどのようにnewするのか、
- どのクラスがなんのクラスに依存しているのか

を知っている必要があります。

この「どのようにnewするのか」をphp-diでは配列として宣言します。

実際のコードで確認してみましょう。
以下のようなプロジェクト構成を想定してください。

{% codeblock %}
project root
├bootstrap.php
└app.php

{% endcodeblock %}

bootstrap.phpでコンテナを設定して、app.phpでそれを使うような構成です。

**注意**
本記事のコードを実際に動かすには
php-diをcomposerなどでダウンロードするなどいくらか設定が必要です。
細かい設定などはphp-diの公式ドキュメントをご覧ください。

以下の例ではMonologを設定しています。
{% codeblock bootstrap.php lang:php %}

<?php

use DI\ContainerBuilder;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Psr\Log\LoggerInterface;
use Psr\Container\ContainerInterface;

// autoloadの読み込み
require __DIR__.'/../vendor/autoload.php';

// 設定配列の宣言
$def = [
	// ここでLoggerをnewする
	Logger::class => function(){
		$logger = new Logger('DI-App');
		$logger->pushHandler(new StreamHandler(__DIR__.'/app.log'));
		return $logger;
	},
	// LoggerInterfaceにLoggerを設定
	LoggerInterface::class => function(ContainerInterface $c){
		return $c->get(Logger::class);
	}
];

// 設定をもとにコンテナをビルドする
$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions($def);
$container = $containerBuilder->build();

return $container;

{% endcodeblock %}

ちょっと長いですが、`$def`という配列に依存性を宣言しています。

この部分を見てみます。
{% codeblock bootstrap.php lang:php %}
	// ここでLoggerをnewする
	Logger::class => function(){
		$logger = new Logger('DI-App');
		$logger->pushHandler(new StreamHandler(__DIR__.'/app.log'));
		return $logger;
	},

{% endcodeblock %}
ここではシンプルにnewするだけでなく、Monologの初期設定もしています。

DIコンテナを使わない場合、こういった初期設定を
ログを使うすべてのクラスで行わないといけません。

これくらいの設定ならまだいいですが、
設定が10数行に及ぶことはよくあるかと思います。

そういった手間がなくせるのが良いところですね。

それではこのコンテナを使うコードを見てみましょう。

{% codeblock app.php lang:php %}
<?php

use Monolog\Logger;

$container = require __DIR__.'/bootstrap.php';

/** @var Logger $logger */
$logger = $container->get(Logger::class);

$logger->info('ログ');

{% endcodeblock %}

コンテナからクラスを取り出す際はnewを使う代わりにget()メソッドを使用します。

{% codeblock app.php lang:php %}
/** @var Logger $logger */
$logger = $container->get(Logger::class);

{% endcodeblock %}

ちなみに`/** @var Logger $logger */`を記述することで
IDEなどがクラスを認識してくれます。

newの代わりにコンテナからget()しただけだと、
変数がなんのクラスが不明のままになってしまいます。


####  機能２．Constructor Injectionのサポート
それでは先ほど使用したロガーを使うクラスを作ってみます。
Hello.phpというクラスを作ります。
{% codeblock lang:php %}
project root
├bootstrap.php
├app.php
└Hello.php

{% endcodeblock %}


{% codeblock Hello.php lang:php %}

<?php

namespace App;

use Monolog\Logger;

class Hello {
	private Logger $logger;
	function __construct(Logger $logger) { // Constructor Injection
		$this->logger = $logger;
	}

	function sayHello(){
		$this->logger->info("Hello");
	}
}

{% endcodeblock %}


{% codeblock app.php lang:php %}
<?php

use App\Hello;

$container = require __DIR__.'/bootstrap.php';

/** @var Hello $hello */
$hello = $container->get(Hello::class);

$hello->sayHello();

{% endcodeblock %}

ここではコンストラクタインジェクションというテクニックを使用しています。
Hello.phpクラスのコンストラクタを見てみます。
{% codeblock Hello.php lang:php %}
	function __construct(Logger $logger) { // Constructor Injection
		$this->logger = $logger;
	}

{% endcodeblock %}
  

コンストラクタインジェクションは
<u>依存性をコンストラクタの引数として記述し、そのクラスを作成する際に依存性を注入するテクニックです。</u>
こうすることでHelloクラスの中でLoggerクラスをnewすることがなくなります。

DIコンテナはHelloクラスを作るときにLoggerクラスを自動的に作ってくれます。

app.phpのこの部分を見てください。
{% codeblock app.php lang:php %}
/** @var Hello $hello */
$hello = $container->get(Hello::class);

{% endcodeblock %}

もし、コンストラクタインジェクションをphp-diが自動でしてくれなければ、
以下のようにいちいち依存性を自分で注入してあげないといけませんね。
{% codeblock app.php lang:php %}
$logger = new Logger('DI-App');
// $loggerを初期設定
...

$hello = new Hello($logger);

{% endcodeblock %}
DIコンテナはHelloに必要な依存性をConstructorの引数から
自動的に判断して、LoggerクラスをHelloクラスに渡してくれます。

便利ですね。

####  機能３．Autowired
先ほどの例ですが、実はbootstrap.phpの$defを一切変更せずに動きます。

本来であればHelloクラスをどのようにnewするかは$defに記述しなければいけません。
しかし、php-diはそれも自動でやってくれます。

<u>初期設定を必要としないHelloのようなクラスは、
Hello::classをコンテナに渡すことで勝手に作ってくれます。</u>

これは便利ですね。

逆にLoggerのようにシンプルにnewするだけでなく、
設定などをしたいクラスは$defに記述する必要があります。

####  機能4．Interfaceの実装
先ほどの例でLoggerをMonologではなく別のライブラリに変えるような
場面を想定してみます。

普通であればLoggerを使っているクラスすべてを書き換えなければならず、
面倒でバグを生みやすい作業になるのですが、
Interfaceを使うことで解決できます。

MonologはPSR-3 LoggerInterfaceというPHP標準のロガーインターフェースに準拠しています。

bootstrap.phpの$defをもう一度見てみてください。
{% codeblock bootstrap.php lang:php %}
// 設定配列の宣言
$def = [
	// ここでLoggerをnewする
	Logger::class => function(){
		$logger = new Logger('DI-App');
		$logger->pushHandler(new StreamHandler(__DIR__.'/app.log'));
		return $logger;
	},
	// LoggerInterfaceにLoggerを設定
	LoggerInterface::class => function(ContainerInterface $c){
		return $c->get(Logger::class);
	}
];

{% endcodeblock %}

<u>この部分でPHPの標準インターフェースであるLoggerInterfaceにMonologを設定しています。</u>

{% codeblock bootstrap.php lang:php %}
	// LoggerInterfaceにLoggerを設定
	LoggerInterface::class => function(ContainerInterface $c){
		return $c->get(Logger::class);
	}

{% endcodeblock %}

こうすることで、クラス内でLoggerInterfaceを依存性として宣言した場合、
<u>Monologを自動的にインターフェースの実装として使ってくれます。 </u>

それではHelloクラスをMonologに依存しない形に変えてみます。
{% codeblock Hello.php lang:php %}
<?php

namespace App;

use Psr\Log\LoggerInterface;

class Hello {
	private LoggerInterface $logger;
	function __construct(LoggerInterface $logger) {
		$this->logger = $logger;
	}

	function sayHello(){
		$this->logger->info("Hello");
	}
}

{% endcodeblock %}

こうすることで<u>LoggerをほかのPSR-3準拠のLoggerに変更する際に、
Helloクラスを変更する必要がなくなりました。</u>

LoggerやMailerなど標準Interfaceが用意されているものや、
テスト用にMockを使いたい場合などに役立ちますね。

##  アンチパターンなど
最後にアンチパターンやTipsを紹介します。

### Dependency Fetch アンチパターン
基本的に<u>$container->get()を呼び出すのは最小限にするようにしましょう。</u>

すべてのクラスが$container変数を持っているようなコードはDependency Injectionではなく
Dependency Fetchというアンチパターンになってしまいます。

以下のような感じです。
{% codeblock Hello.php lang:php %}
<?php

namespace App;

use Monolog\Logger;

class HelloAnti {

	private Logger $logger;

	function __construct() {
		$container = require __DIR__.'/bootstrap.php'; //直接コンテナを触っている
		$this->logger = $container->get(Logger::class);
	}

	function sayHello(){
		$this->logger->info("Hello Anti");
	}
}

{% endcodeblock %}


コンテナから直接、依存性を取り出すのではなく、
コンストラクタインジェクションや@injectアノテーションを使うことが推奨されています。

#### make()メソッド
php-diを使うときはコンストラクタに依存性を記述しますが、
普通コンストラクタって引数を記述するところですよね。

普通の引数と依存性のための引数を使うクラスの場合、get()ではなく、
make()メソッドを使用します。

例えば、Helloクラスに言語という引数を足してみます。
以下のようなコードです。

{% codeblock HelloMake.php lang:php %}
<?php

namespace App;

use Monolog\Logger;

class HelloMake {
	private Logger $logger;
	private string $lang;

	function __construct(Logger $logger, string $lang) { //引数に言語をとる
		$this->logger = $logger;
		$this->lang = $lang;
	}

	function sayHello(){
		$hello = "hello";
		if($this->lang === 'jp')
			$hello = "こんにちは";

		$this->logger->info($hello);
	}
}

{% endcodeblock %}

このようなクラスを呼ぶ場合はmake()メソッドを使用します。
{% codeblock app.php lang:php %}
<?php

use App\HelloMake;

$container = require __DIR__.'/bootstrap.php';

/** @var HelloMake $hello */
$hello = $container->make(HelloMake::class, ['lang' => 'jp']); //make メソッド

$hello->sayHello();

{% endcodeblock %}
また、このようなクラスを依存性に持つ場合は、
コンストラクタにDI\FactoryInterfaceをとり、そこからmake()を呼び出すことが推奨されています。
これは先ほどのアンチパターン（$containerをクラスが直接持つ）にならないようにするためですね。

##  まとめ
この記事ではphp-diを使ってDIやDIコンテナの使用例を紹介してきました。
DIを知らなかった人やフレームワークに入っているものを何となく使っていた人の
理解が深まると幸いです。

それじゃ今日はこの辺で。

##  関連記事
こちらの記事もおすすめです。  

[Spring Boot + Azure App Engine +Cosmos DBでAPIを無料で爆速開発する - その２](/2020/04/2020-0430-springboot-azure-2/)