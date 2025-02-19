---
title: LaravelのMockいろいろ
tags:
  - Laravel
  - PHP
  - Mock
categories: 技術
featured_image: thumb.png
date: 2025-02-14 20:59:33
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

皆さん、テスト書いてますか？テストを書く上でMockは欠かせないですよね。

LaravelではMockを作る方法がいくつかあります。私が働いているプロジェクトでは色々な書き方が混在していたので、それらを整理する意味でもここにMockの方法をまとめていきます。
<!-- more -->

この記事では、LaravelでMockを使用するさまざまな方法を紹介していきます。

コードサンプル内では`Service` という仮のクラスの`run()`関数をモックする例を通じて紹介します。

## 1. mock関数を使う

### mock関数を使ったインスタンスの置き換え

以下の例はmock関数を使った例です。

{% codeblock lang:php %}
// mockを使ってMockを作る
$serviceMock = mock(Service::class);
$serviceMock->shouldReceive('run')->andReturn('Mocked Response')->once();

// MockをServiceクラスにバインドする
app()->instance(Service::class, $serviceMock);

{% endcodeblock %}

ただ上記のコードは`shouldReceive`や`andReturn`の返り値はmock自身ではないことから

- mockを生成する
- mockを設定する
- mockをバインドする

と記述が３行に渡っています。これはなんかすっきりしない、という人（私）もいると思います。

そこで`getMock()`関数を使ってmock生成と設定を一気にやってしまうことができます。
{% codeblock lang:php %}
// ワンライナーで書く
app()->instance(
    Service::class,
    mock(Service::class)
        ->shouldReceive('test')
        ->andReturn('mocked result')
        ->once()
        ->getMock()
    )
);
{% endcodeblock %}


もしくは`mock()`が第２引数に無名関数を取れることを利用してワンライナーっぽく書けます。

{% codeblock lang:php %}
// ワンライナーで書く - その２
app()->instance(
    Service::class,
    mock(
        Service::class,
        fn (MockInterface $mock) => $mock->shouldReceive('test')
            ->andReturn('mocked result')
            ->once()
    ));

{% endcodeblock %}

### Mockery::mockを使う

Mockery::mock()は`mock()`と同じように使えます。
{% codeblock lang:php %}
// Mockを作る
$mock = Mockery::mock(Service::class);
$mock->shouldReceive('run')->andReturn('Mocked Response')->once();

// MockをServiceクラスにバインドする
app()->instance(Service::class, $mock);

{% endcodeblock %}

この方法は正直`mock()`があるのでわざわざ使わないかなと思います。

## 2. $this→mock()を使う

前節ではmockを作ってbindするという手順をふんでいましたが、`$this→mock()`を使うことでどちらもやってくれます。

以下の例は`$this→mock()`を使った例です。
{% codeblock lang:php %}

$this->mock(Service::class, 
    function (MockInterface $mock): void {
        $mock->shouldReceive('run')
            ->andReturn('Mocked Response')
            ->once();
    });

{% endcodeblock %}

`partialMock`関数を使うとpartial mockが作れます。
{% codeblock lang:php %}
$this->partialMock(Service::class, 
    function (MockInterface $mock): void {
        $mock->shouldReceive('run')
            ->andReturn('Mocked Response')
            ->once();
    });

{% endcodeblock %}

## mock()を使うとき

そんな感じで優秀な`$this→mock`なのですが、万能ではありません。

`app()→instance()`のかわりに`app()→bind()`を使いたいときには`mock()`を使う必要があります。

例えば、モックするクラスのインスタンスを作る際に引数を渡したいときなどが該当します。

{% codeblock lang:php %}
app()->bind(
        Service::class,
        function(Application $app, array $params) {
            $mock = mock(Service::class);
            $mock->shouldReceive('run')->andReturn('Mocked Response')->once();
            return $mock;
});

// 引数を渡すときはapp()->instance()が使えない
$serviceMock = app()->make(Service::class, ['param1' => 'test parameter']);

{% endcodeblock %}


私のプロジェクトでは`app()->bind()`も使いたかったので、`$this->mock`と`mock()`が混在しないように`mock()`で統一しようということになりました。

ケースバイケースだったり個人の好みによるところが多いのでチームメンバーと話して決めるのがいいでしょう。

## おまけ
上記の例ではいつも`once()`を呼んでいます。  
これをしないとモックした関数がテスト中に呼ばれなくてもエラーを吐かないので予期せずテストが通ってしまうことがあります。

`shouldReceive`が効いてない！とパニくった実体験が私はあるので、皆さんは気をつけましょう。

## まとめ
Laravelには（良くも悪くも）Mockひとつとっても様々な書き方があります。  
`$this→mock`を使うか`mock`を使うかはケースバイケースなので、  
チームで統一性がとれるルールを選んで使いましょう。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[DockerでLaravel(PHP8)&Apache&MySQLを動かす](2022/12/2022-1204-laravel-docker/)