---
title: まだフロントエンドで消耗してるの？PHPフルスタックフレームワークLivewireを試してみた
tags:
  - PHP
  - Laravel
  - Livewire
categories: 技術
featured_image: thumb.png
date: 2021-07-06 23:18:37
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今日はPHPのフルスタックフレームワークであるLivewireを紹介します。

## Web開発、複雑すぎ問題
<u>Web開発って覚えなきゃいけないこと多すぎませんか？</u>
モダンなダイナミックな動きのついたWebを作ろうと思ったら、
サーバサイドとフロントエンドと大きく分けて開発をすることになるかと思います。
<!-- more -->

大きな会社やプロジェクトならそのように分担して作るのも良いかもしれませんが、
もし小さなチームや一人でそのような構成でサイトを作ろうと思ったらどうでしょうか。

ちょっと大変ですよね。
かといって、従来のHTMLとjQueryを使ったシンプルなWebサイトでは、
少し物足りないかもしれません。

ざっくりですが、そのような問題意識のもとに生まれたのが、
このLivewireです。

## Livewireとは
PHPフルスタックフレームワークの名の通り、
<u>PHPでバックエンドからフロントエンドまで対応できるフレームワークです。</u>

ReactやVueのようなJSフレームワークを使う代わりにPHPでHTMLに動きをつけることができます。
そうすることで以下のようなメリットがあります。
- PHPで書けるのでJSを学習するコストがいらない
- フロント～サーバー間のデータ交換のために一度JSONに変換する必要がない（フロント側でPHPの変数がそのまま使える）

良い感じですよね？
そんなLivewireはPHPフレームワークのLaravelで使用することができます。

それでは次の章から実際に触っていきましょう。

## 実装してみる
### 要件
今回はLaravel8で試してみます。
Composerが入っている前提で進めていきます。

### Laravelプロジェクトを作成する
Laravelプロジェクトを作成しましょう。
```
composer create-project laravel/laravel livewire-demo
```

プロジェクトが作成されたか確認しておきましょう。
{% asset_img 01-laravel.png %}

### Composerでパッケージ追加
プロジェクトにLivewireのパッケージを追加します。
```
composer require livewire/livewire
```


### Componentを作る
それでは早速Livewireのコンポーネントを作っていきます。
コンポーネントはLivewireクラスとBladeテンプレートがセットになったようなものです。
以下のコマンドを実行してください。
```
php artisan make:livewire demo
```

以下のファイルが作成されます。
- app/Http/Livewire/Demo.php
- resources/views/livewire/demo.blade.php

それぞれ中身はこんな感じですね。

`app/Http/Livewire/Demo.php`
renderという関数を持ったクラスです。
{% codeblock app/Http/Livewire/Demo.php lang:php %}
<?php

namespace App\Http\Livewire;

use Livewire\Component;

class Demo extends Component
{
    public function render()
    {
        return view('livewire.demo');
    }
}
{% endcodeblock %}


`resources/views/livewire/demo.blade.php`
こちらのファイルはちょっと変更して、以下のようにしましょう
{% codeblock resources/views/livewire/demo.blade.php lang:php %}
<div>
    Demo!
</div>
{% endcodeblock %}

### Livewireコンポーネントを表示する
プロジェクトを作成したときにできたwelcom.blade.phpを以下のように編集してください。
{% codeblock resources/views/welcom.blade.php lang:php %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Demo</title>
    @livewireStyles
</head>
<body>
<livewire:demo >
@livewireScripts
</body>
</html>
{% endcodeblock %}

ポイントとしては、 
`@livewireStyles`を<head>内につけることと、
`@livewireScripts`を<body>内の一番下につけることです。

また、Livewireコンポーネントを呼び出すために、
`<livewire:demo >`
と書きます。

これで一度サイトを開いてみましょう。

Demoと表示されていれば、成功です。
{% asset_img 02-demo.png %}

ただ、これだけだとただのBladeテンプレートと同じなので、
もっとリアルタイムに動く例にしてみましょう。


## リアルタイムなコンポーネント
先ほどのapp/Http/Livewire/Demo.phpにpublic変数を追加します。
{% codeblock app/Http/Livewire/Demo.php lang:php %}
<?php

namespace App\Http\Livewire;

use Livewire\Component;

class Demo extends Component
{

    public $text; // 追加
    public function render()
    {
        return view('livewire.demo');
    }
}
{% endcodeblock %}

Componentクラスのpublic変数は対応するテンプレートの中から参照することができ、
しかも変更されるたびに更新されます。

テンプレート側には$textを設定するためのテキストボックスと
$textの値を表示しましょう。
{% codeblock resources/views/livewire/demo.blade.php lang:php %}
<div>
    <input type="text" wire:model="text" >
    {{$text}}
</div>
{% endcodeblock %}

サイトを表示して、何か文字を入力してみてください。
{% asset_img 03-realtime.gif %}

ページをリロードすることなく、リアルタイムに画面が更新されていきますね。
JSに一切触ることなくダイナミックなWebができました。ちょっと感動です笑

## まとめ
今日はLivewireの紹介でした。

イマドキなWebを作りたいけど、
JS フレームワークをイチから覚えて使うのは学習コスト的にも実装コスト的にもしんどい。。。
と思っていたところ、この技術を知りました。

サクサク書けるので、楽しいですよ。
それでは今日はこの辺で。

## 参考記事
### 公式ドキュメント｜
公式ドキュメントは英語ですが、コードサンプルがあるので、
それなりにわかりやすいと思います。
https://laravel-livewire.com/docs/2.x/quickstart

ちなみにキャラクターのクラゲはsquishyという名前らしいです。

### The Future of Web Software Is HTML-over-WebSockets
以下の記事はJSフレームワークを使ったWeb開発のデメリットと
Web socketを使用した新しいアプローチが書かれたものです。
英語ですが、興味があればご一読ください。
（JSディスりがちょっと面白いです。）
https://alistapart.com/article/the-future-of-web-software-is-html-over-websockets/#section5

この記事で紹介されているのはHotwireというRuby on Rails上の実装ですが、
これをPHPで似たようなことをやっているのが、Livewireです。

## 関連記事
こちらの記事もおすすめです。  

[Code Igniter4 & SQLiteでサイトを作って遊ぶ](/2021/04/2021-0403-ci-sqlite/)