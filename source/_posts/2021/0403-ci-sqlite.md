---
title: Code Igniter4 & SQLiteでサイトを作って遊ぶ
tags:
  - PHP
  - code igniter
  - SQLite
categories: 技術
featured_image: thumb.png
date: 2021-04-03 18:27:55
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

軽量って響きが好きです。
Code IgniterはPHPの軽量なフレームワークです。
また、SQLiteも名前にLiteと入ってるくらいなので、軽量なDBです。

今回はその二つを使うサイトを作ってみたので、
その際の知見を書いておきます。
<!-- more -->

## 作ったもの
ポスッターという心の叫びをポストできる、というサイトを想定しました。
勉強目的に作ったサイトなので、細かいところはあまり突っ込まないで欲しいですが、
フォームに名前と内容を入力して送信すると、
それが一覧に追加される、というシンプルな機能を持っています。
{% asset_img postter.png %}

T○itterみたいなのにする予定だったのですが、
どちらかというと5○hみたいになってますね。

GitHubにソースをあげたので、適宜見てみてください。
https://github.com/karintomania/postter

## SQLiteとの接続
CodeIgniterから接続するための設定をしていきます。

### 接続情報の設定
Database.phpの$defaultという変数に接続情報を設定します。
デフォルトのSQLiteのDBファイル配置場所はプロジェクトフォルダ内のwritableファルダです。
writableフォルダ内にdbファイルがある場合、
databaseプロパティはファイル名を指定するだけでOKです。


{% codeblock app/Config/Database.php lang:php %}
	public $default = [
		'DSN'      => '',
		'hostname' => '',
		'username' => '',
		'password' => '',
		'database' => 'post.db',
		'DBDriver' => 'SQLite3',
		'DBPrefix' => '',
		'pConnect' => false,
		'DBDebug'  => (ENVIRONMENT !== 'production'),
		'charset'  => 'utf8',
		'DBCollat' => 'utf8_general_ci',
		'swapPre'  => '',
		'encrypt'  => false,
		'compress' => false,
		'strictOn' => false,
		'failover' => [],
		'port'     => '3306',
	];
{% endcodeblock %}
### 権限の確認
SQLiteは普通のDBと違いユーザなどによる認証がありません。
ですが、dbファイルに書き込むことでデータを保存しているので、
普通のファイルと同じくファイルへの書き込み権限が必要です。

Apacheなどを利用している場合は、実行ユーザが
dbファイルに書き込み権限を持っていることを確認しましょう。

これでめちゃくちゃハマりました。皆様はお気をつけください。

## Model
Modelを定義します。

{% codeblock PostModel.php lang:php %}
<?php

namespace App\Models;

use CodeIgniter\Model;

class PostModel extends Model
{
    protected $table = 'post';
	protected $allowedFields = ['post', 'name', 'posted'];

	public function getPosts(){
        return $this->orderBy('posted', 'desc')
					->findAll();
	}
}
{% endcodeblock %}

若干解説をすると、
`$table`には言わずもがな、テーブル名を定義します。

`$allowedFields`には、save()メソッドを使う際の更新対象カラムを定義します。
saveメソッドはinsertとupdateをよしなにやってくれるメソッドです。
saveメソッドは自分で実装する必要がありません。

`getPosts()`メソッドの中では、
$this->findAll();で全件検索ができるので、それを利用しています。
新規ポストを上に持っていきたいので、orderBy()を追加しています。

## Controller
特に変わったことはしていません。

{% codeblock Home.php lang:php %}
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Home extends BaseController
{
	public function index()
	{
		$model = new PostModel();

		$post = $this->request->getVar('post');
		if(!empty($post)){
			$new_post['post'] = $this->request->getVar('post');
			$new_post['name'] = $this->request->getVar('name');
			$new_post['posted'] = time();

			$model->save($new_post);
		}

		$data['posts'] = $model->getPosts();

		return view('post', $data);
	}
}
{% endcodeblock %}

`$model->save($new_post);`
ここでsaveメソッドを利用していますね。

## まとめ
権限で盛大にハマった以外はサクサクっと開発を進めることができました。

SQLiteは他のDBよりも気楽に使えるので大好きです。
皆様もぜひ何かサービスを作ってみてください。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[VS Codeで複数バージョンのPHPに対してXdebugを利用する](/tech-memo/2021/01/2021-0112-debug-multi-php/)

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
