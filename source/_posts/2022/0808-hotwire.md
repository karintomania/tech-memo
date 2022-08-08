---
title: JSフレームワークを勉強したくないのでHotwireを使ってサーバーサイドだけでモダンなUIを作ってみた
tags:
  - Hotwire
categories: 技術
featured_image: thumb.png
date: 2022-08-08 14:38:07
---


## 完成品の紹介
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

まずは最初にどんなものを作ったのか完成品をお見せします。

{% asset_img all.gif %}

<!-- more -->
なんてことはないTodoリストなのですが、以下のような実装になっています。

- サーバーとのやりとりにAjaxを使っている
- UIの更新はページ遷移をするのではなく、DOMの一部を更新する

（この記事では、上記のようなUIをモダンなUIと呼ぶことにします。ダイナミックなUIとか好きな呼び方で読み替えてもらって構いません。）

それだけでは別にすごくない、ただのSPAじゃん、と思っているかもしれません。

ポイントは<u>JSを一行も書かずにモダンなUIを実現している</u>ということです。

普通にやばいですよね？モダンなUIを実現するのにJS書かないなんて！！

これはHotwireを使って実装されています。

詳細を見ていきましょう。

## 背景

私はいわゆるサーバーサイドエンジニアなのですが、
正直、<u>JS勉強するのめんどくさくないですか？？</u>

まあ、めんどくさいというとネガティブすぎるのですが、
とにかくJS界隈は技術の進歩が速く、
JSを専門にしているフロントエンドの方ならまだしも、
私のような<u>サーバーサイドエンジニアがキャッチアップしようとすると大変な分野</u>です。

しかし、例えば生のJSやjQueryだけでモダンなUIを組もうとすると
それはそれで大変な作業になってしまいます。

そのような問題意識から出てきたのがHotwireです。

## Hotwireとは

先ほどの背景にも書いたように
<u>Hotwireは学習コストを限りなく少なくしつつもモダンなフロントエンドが書けるようにしようというフロントエンドフレームワークです。</u>

Ruby on Railsの開発者として有名なDHHが開発しています。
誤解されやすいのですが、<u>Hotwireは別にRailsじゃなくても使えます。</u>

（私も誤解していました笑）

それを強調するために今回はLaravelでバックエンドを書いてますが、
PythonでもGoでも好きな言語を使ってください。

Hotwireのもう少し技術よりな話をすると、Hotwireの鍵となる考えは
<u>規則に従った部分的なHTMLをレスポンスとして返すとフレームワークがUIを更新してくれる</u>ということだと思っています。

規則に従った部分的なHTMLというのは以下のような感じです。

```html
<turbo-frame id="message">
	更新されました！
</turbo-frame>
```

詳細は後述しますが、

上記のHTMLをレスポンスとして受け取ると
フレームワークが現在表示しているHTMLから
`id=”message”`というIDを持つ`turbo-frame`タグを探して、
その中身を「更新されました！」という内容に変更してくれます。

そんなに難しくなさそうですよね？

## Hotwireの概要

実はHotwireはいくつかのライブラリを使うことでフロントエンドを実現する技術スタックの名称です。

そのライブラリがTurboとStimulusです。

また、Turboはいくつかの機能を持ち合わせています。

ざっくりと各ライブラリの概要をまとめました。

- Turbo: 普通のHTMLでモダンなUIを実現するためのライブラリ
    * Turbo Drive：　ページ遷移を効率化する
    * Turbo Frame：　HTMLを要素単位で更新する
    * Turbo Stream：　Turbo Frameと似ているが、リアルタイムに更新できたり複数箇所を更新できる
    * Turbo Native　Nativeアプリのためのライブラリ
- Stimulus　Turboで実現できない動きをJSでやるためのフレームワーク

この記事ではモダンなUIを作る上でよく使う

- Turbo Frame
- Turbo Stream

を中心に説明していきます。

先ほどお見せしたTodoリストはこの二つだけを使って実装されています。

## Turboとは

Turboは先ほども書いたように普通のHTMLでモダンなUIを実現するためのライブラリです。

具体的には以下のようなことをやってくれます。

- リンクやフォームの送信をFetch（Ajax）に変換する
- レスポンス内のHTMLに応じてDOMを更新する

それではTurboの機能を見ていきましょう。

## Turbo Drive

<u>Turbo Driveはページ遷移を効率よくする</u>ための機能です。

ページを丸ごと書き換えるのではなく、Bodyだけを書き換えてHeadはうまいことマージしてくれるので、ページ遷移が高速になるそうです。

この記事では使っていないので、詳細は省きますが、
ページ遷移する際にTurboが勝手に最適化してくれるので、基本的にはプログラマ側は何もしなくて良いようです。

## Turbo Frame

Turbo Driveがページ遷移だとしたら、
<u>Turbo FrameはHTMLの要素単位で変換することができます。</u>

以下のGIFを見てください。

{% asset_img edit.gif %}

タスクをクリックすると、タスクの編集画面に切り替わります。

それではタスクを表示しているHTMLを見てみましょう。

```html
<!-- ① タスクの表示フレーム -->
<turbo-frame id="task_1">
	<div class="w-full flex mb-2">
		<!-- ② 編集画面へのリンク -->
		<a class="block w-2/3" href="{{route('tasks.edit', ['task' => $task->id])}}"># {{$task->task}}</a>
		<!-- ③ 削除フォーム -->
		<form class="w-1/3" class="inline"
			method="delete"
			action="{{route('tasks.destroy', ['task' => $task])}}"
			target="showTask"
			>
			@csrf
			<x-common.img-submit :src="asset('img/done.svg')" :id="'deleteTask_'.$task->id"></x-common.img-submit>
		</form>
	</div>
</turbo-frame>

```

① タスクの表示フレーム という箇所を見てみます。

```html

<!-- ① タスクの表示フレーム -->
<turbo-frame id="task_1">
	<!-- 省略 -->
</turbo-frame>
```

これがTurbo Frameです。

一見、ただのHTMLタグですね。
気をつけるのは、<u>Frame内のリンクとフォームはこのFrame内の更新に使われるということです。</u>

② 編集画面へのリンクを見てみましょう。

```html
<!-- ② 編集画面へのリンク -->
<a class="block w-2/3" href="{{route('tasks.edit', ['task' => $task->id])}}"># {{$task->task}}</a>

```

このリンクをクリックした時のレスポンスは以下のような感じです。

```html
<turbo-frame id="task_7">
	<div class="mb-2">
		<!-- 編集用のフォーム -->
		<form class="w-full " method="put" action="{{route('tasks.update', ['task' => $task->id])}}" target="_top">
			<div class="flex">
				<div class="w-2/3">
					# <input class="outline-0  border-b border-black" name="task" type="text" value="{{$task->task}}">
				</div>
				<x-common.img-submit :src="asset('img/save.svg')" :id="'updateTask_'.$task->id"></x-common.img-submit>
			</div>
		</form>
	</div>
</turbo-frame>

```

こちらも同じ`id=”task_7”`というIDを持ったTurbo Frameです。
このようなレスポンスを返してあげると、`<turbo-frame>`タグの中身がそのまま更新されます。

ここで使っているのは普通のHTML操作なので、
お好きなフレームワークのテンプレートエンジンで実装できます。

<u>JSを書かずにHTMLだけでDOMを更新することに成功しました！</u>

まとめると、以下のような感じでしょうか。

- Turbo Frameは`<turbo-frame>`タグで囲ったHTMLを更新できる
- `<turbo-frame>`タグ内のフォームとリンクはFrame内の更新に使用される
- そのフォームとリンクのレスポンスは、同じIDを持った`<turbo-frame>`タグで囲われたHTMLを返す
- Turbo Frameはレスポンスの内容でFrame内のHTMLを書き換える

## Turbo Stream

StreamはFrameに似ていますが、できることが増えます。

Frameでは対応できないケースとして、以下の二つが挙げられます。

- 複数箇所を更新したいが、それらが一つのFrame内に存在しない
- 更新だけではなく、追加や削除をしたい

これらを可能にするのがTurbo Streamです。

以下のGIFを見てください

{% asset_img done.gif %}

タスク完了ボタンが押された時の画面更新は以下の二つです。

- タスクをリストから削除
- タスクのカウントを減らす (2 tasks→1 taskに変わっているところです)

複数箇所の更新をしたいので、Streamを使って実装します。

（実はこの実装はStreamを使わなくても可能です。タスクのカウントとリストをひとつの親Frameに入れて全体を更新するような実装です。どちらが良いかはケースバイケースです）

タスク完了ボタンを押したときのレスポンスは以下の感じです。

```html
<!-- タスクの削除 -->
<turbo-stream
    target="task_7"
    action="remove"
></turbo-stream>

<!-- カウントの更新 -->
<turbo-stream
    target="taskCount"
    action="replace">
    <template>
        <div id="taskCount" >
            1 task
        </div>
    </template>
</turbo-stream>
```

<u>`<turbo-stream>`というタグが二つ、タスクの削除とカウントの更新用にあるのが分かるでしょうか。</u>
詳細を見ていきます。

### Turbo Streamタグ

Turbo Streamタグは`target`と`action`という属性を持っています。

- `target` には更新したいDOMのID
- `action`には実行したいアクション

をそれぞれ指定します。

`target` は別にTurbo Frameでなくても良く、idがついてるHTMLタグならなんでも指定できます。

また、タグ内にHTMLを記載する場合は`<template>`タグを使う必要があります。

`action`には以下の７種類があります。

- `append` / `prepend`: HTMLを`target`内の一番最初/最後に追加します。
- `before` / `after`: HTMを`target`の前/後に追加します。(targetの外側に追加されます。)
- `replace`: `target`に指定された要素を更新します。
- `update`: `target`に指定されたタグはそのままに、その中身を`<template>`内のHTMLで更新します。
- `remove`: `target`に指定された要素を削除します。

それではもう一度タスク完了時のレスポンスを見てみます。

```html
<!-- タスクの削除 -->
<turbo-stream
    target="task_7"
    action="remove"
></turbo-stream>

<!-- カウントの更新 -->
<turbo-stream
    target="taskCount"
    action="replace">
    <template>
        <div id="taskCount" >
            1 task
        </div>
    </template>
</turbo-stream>

```

最初のタスクの削除のために`remove`を使っていますね。削除なので、`<template>`はありません。

二番目は更新後のカウントを表示するHTMLを`replace`がついたStreamで囲っています。

これによってカウントが更新されるわけですね。

ひとつのレスポンスには`<turbo-stream>`タグを好きなだけ書くことができます。

これでFrameの問題だった以下のようなケースに対応できました。

- 複数箇所を更新したいが、それらが一つのFrame内に存在しない
- 更新だけではなく、追加や削除をしたい

### Turbo StreamとSocketについて

Turbo Streamのもうひとつの大事な機能に
<u>Web Socketと併用することでリアルタイムにUIを更新できる</u>というものがあります。

このTodoリストでは実装していませんが、Socketを使うことで他の人がリストを更新したのを
自分のブラウザでもリアルタイムで見るなんてことが可能です。

## Turbo Native

これは使ってないので、細かい説明は省略です。

基本的にはiOS, Androidのネイティブ向けの便利機能になるようです。

## StimulusとAlpine js

FrameとStreamで大体のことはできるのですが、
<u>それ以上のことがしたい、あるいはそのUIのためだけにいちいちサーバー/クライアント間の通信をするのはもったいない、というときのためにStimulusというJSフレームワークが用意されています。</u>

モーダルの表示とかがいい例でしょうか。
別にサーバー側のデータを触るわけではないので、サーバーに問い合わせるまでもなく、純粋にJSだけで実装したいですよね。

Hotwire自体はStimulusを使うことが前提なのですが、個人的には似たような経緯で開発されたAlpine jsを推していきたいです。
Stimulusはなんかややこしそうなのに対し、Alpine jsはとてもシンプルなので。。。

この記事では特にどちらも説明しませんが、以下に公式ドキュメントのリンクを貼っておきます。
好きな方を使ってみたらいいと思います。

[Stimulus公式](https://stimulus.hotwired.dev/handbook/origin)
[Alpine js公式](https://alpinejs.dev/)

## 開発Tips
Turbo (Drive, Frame, Stream)とStimulusと色々あるので、
どれを使えばいいのか分かりづらいですよね。

基本的には
- Driveはページ遷移
- Frameはひとつの要素内の更新
- Streamは複数要素の更新や追加・削除、またはリアルタイムなアプリケーション
- StimulusはTurboではできないことやサーバーとのやりとりではなくJSだけでやりたいこと

というのが目安になると思います。

学習・実装コストは少ない順にFrame、Stream、Stimulus、
できることの自由度は逆になります。

なので、<u>なるべく簡単な手法で済ませることが推奨されています。</u>

このTodoリストもタスクの追加、削除はStreamを使っていますが、
ぶっちゃけリストごとFrameで更新してしまってもあまりパフォーマンスは変わりません。

ケースバイケースですね。

## サーバーサイドの実装について
ここまで話してきたことは<u>サーバーサイドに依存しません。</u>

使っているのはただのHTMLなので、
好きな言語の好きなフレームワークを使ってください。

私はLaravelを使っています。

LarabelにはTurboを使うための便利なパッケージがあるのでそれを使いました。

[https://github.com/tonysm/turbo-laravel](https://github.com/tonysm/turbo-laravel)

別にRailsだけのものではないということを知ってほしいです。

## まとめ

<u>Hotwire(というかTurbo)を使うことでJSを一行も書かずにモダンなUIが作れました！</u>

今回はシンプルなTodoリストでしたが、もっと複雑なアプリケーションも作れそうです。

ちなみにこの記事で作ったプロジェクトはGithubにあげてあります。
https://github.com/karintomania/Laravel-turbo-test

ほとんどのエンジニアがJSについて語っている中、
ひっそりと盛り上がっているHotwire界隈にぜひ触れてみてください！

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[AIで凛として時雨をRe:Automationする！（歌詞をAIに自動生成させてみた）](/2022/06/2022-0613-ai-shigure/)

## PR
技術力を高めようとしているのに、技術が評価されない会社にいたら難しいですよね？
きちんとした技術を持ったエンジニアを評価する会社を探しませんか？

エンジニア転職ならレバテックキャリアがおすすです。

<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZQFQ9" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=210117795527&wid=001&eno=01&mid=s00000011866006002000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZQFQ9" alt="">
