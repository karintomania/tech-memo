---
title: 自分はコードに触らずにAIにPR一本仕上げさせた所感
tags:
  - AI
  - Cline
categories: 技術
featured_image: thumb.png
date: 2025-03-10 22:26:22
---


こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。

今回は、[Cline](https://github.com/cline/cline)を使って、自分はコードに触らない縛りでAIにPRを一本まるまる任せてみた結果についてお話しします。

<!-- more -->
## ルール
以下のルールを自分で決めてPRを全部やりました。
- AIにだけコードを書かせる。AIが吐いたコードの編集も禁止
- なるべくすべてAIにやらせるためにできる限りClineを使う。うまく行かなければcopilot chat。最終手段はChatGPTのWeb版からコピー＆ペースト
- Lintなどのコマンドを自分で回すのはOKにしました。（AIにやらせることもできますが、結局プロンプトに実行したいコマンドを入れるので、自分で実行したほうが早いため）

AIにやらせるタスクとしては、開発者によって記述方法が異なっていたmockの実装をコードベース全体で統一するようなリファクタ的なタスクを選びました。

## 環境
素のClineのVS Code拡張を使いました。
モデルは以下の２つを試しました。
- vscode-lm:copilot/gpt-4
- vscode-lm:copilot/gpt-4o

コードベースは平均的なLaravelアプリです。

## ポジティブだったこと
### 本当にコードに触らずにPRが仕上がった。
コードに一切触れずに、プロンプトだけで作業が完了しました。これはCopilotとは異なる体験で、プロンプトを一度書けばAIがすべてを処理してくれます。

### 単純にコード書く以外のタスクもできる
Clineにはただコードを読み書きするだけでなく様々なタスクを任せることができました。

以下のようなことを頼みました。
- ripgrepを使うことでリファクタリング箇所を探す
- テストを実行して書いたコードが正しいか確認・間違っていたら修正
- コードを一貫したスタイルに整える
- Gitのコミットとコメント、PRの説明文をgit diffから生成する

これらのテクニックは普通に今後の開発でも使っていこうと思います。

### Copilotモデルなら定額で安心
他のモデルとは異なり、Clineから利用する際もCopilotモデルは固定料金なので、トークンの使用量を気にせずAIをぶん回していました。

## ネガティブだったこと
一番のネガティブな点としては、正直、自分でコードを書く方が早い・楽だと思いました。

### まだAIがそんなに賢くない
今回のタスクは書き方がバラバラなmockを統一するという比較的簡単なタスクだったのですが、AIがプロンプトの意図や既存のコードの意図を汲み取るのにかなり苦労していました。全然関係のない箇所を修正したり、エラーメッセージを誤解するようなことが多くありました。

それと無限ループに陥ることが多々あり、同じエラーとその修正を繰り返してしまうことが良くありました。

またMockの正しい書き方はプロンプト内にサンプルコードを書く必要がありました。これは多くのPHPコードがテストなしで書かれているためかもしれません笑。

### プロンプトエンジニアリングが大変
上記に関連してAIにどのようなタスクをしてほしいのか正しく伝えるためのプロンプトエンジニアリングが必要です。
使用したプロンプトを以下に共有しますが、長いし、そうとう具体的に書かれています。
最終版にたどり着くまでに試行錯誤が必要でした。
正直、このプロンプトにたどり着くまでの時間で自分でタスクを終わらせられそうだなと正直思いました。

簡単に日本語訳を入れてますが、実際には英語のみです。
{% codeblock lang:markdown %}
# Prompt
In ./tests/ folder, I want to unify how mocking is implemented.（./tests/フォルダ内でモックの実装方法を統一したい。）

# Rules
- There are instances of using mock(), Mockery::mock or $this->mock.（mock()、Mockery::mock、$this->mockを使用する場合がある。）
- Don't change anything apart from mock(), Mockery::mock(), $this->mock() even if you find an error or improvments.（エラーや改善点が見つかっても、mock()、Mockery::mock()、$this->mock()以外は変更しない。）

## mock()
- Keep mock if it only has a first argument.（最初の引数だけがある場合はmockを保持する。）
- if it has an anonymous function to make assertions for the second arguemnt, remove the second argument and add lines to do the equivelant.
  （2番目の引数にアサーションを行う無名関数がある場合は、2番目の引数を削除し、同等の行を追加する。）
- The mock should look like below without comments:（以下のように実装する。ただしコメントは除く）
"""
$mock = mock(UserRepository::class); // create mock. Only use first argument（モックを作成。第一引数のみ使用）

$mock->shouldReceive('function name') // insert function name to mock（モックに関数名を挿入）
->with('expected input') // insert expected args if applicable（該当する場合は予想される引数を挿入）
->andReturn('expected output') // insert expected output if applicable（該当する場合は予想される出力を挿入）
->once();
"""

## Mockery::mock()
- Change it to use mock() and do the same for mock()（mock()を使用するように変更し、mock()と同じことを行う）

## $this->mock()
- change it to use mock()（mock()を使用するように変更）
- add app()->instance()/app()->bind() to bind the mock to the mocked class（モックをモックされたクラスにバインドする）
- Prefer to use app()->instance(). But when instantiation needs to pass arguements, use app()->bind() and pass anonymous function for the second argument.
（app()->instance()をできるだけ使用する。ただし、インスタンス化に引数を渡す必要がある場合は、app()->bind()を使用し、2番目の引数に匿名関数を渡す）

# Contexts
- This is a Laravel app and using pest as a testing library.（これはLaravelアプリで、テストライブラリとしてpestを使用しています。）
- It uses Mockery for mocking.（モックにはMockeryを使用しています。）
- You can verify if the test passes or not by running `make test-unit && make test-feature`（`make test-unit && make test-feature`を実行してテストが通るかどうか確認できます。）
- You can check the use of $this->mock or Mockery::mock by running these commands:（これらのコマンドを実行して$this->mockやMockery::mockの使用箇所を確認できます。）
+ rg '\$this->mock' tests/
+ rg Mockery::mock tests/

{% endcodeblock %}

### コードの生成が遅い
GPT-4を使用する場合、実際のコードの差分が提示されるまでに結構待ちました。GPT-4oはGPT-4に比べると速いですが、それでも時々コードの生成が止まる、といったことが起きました。
また、ファイル自体が大きい場合には、例え一行の変更でも全体を生成しようとするため、500行以上あるファイルを編集しようとしたところ、失敗しました。
そのため、サイズが大きなファイルの一部だけを変更する場合はCopilot Chatを使うほうが早いことがありました。

こういった点はまだまだ普通のコーディングに比べるともどかしいところですが、これらは将来的にモデルが良くなることで解決されると思います。

## おまけ
便利だったプロンプトをいくつか紹介します。
### コミットを作成
{% codeblock lang:markdown %}
Read the staging changes by running `git --no-pager diff --staged` and commit it with an appropreate message.
Make the first line concise and add details after a newline if necessary

{% endcodeblock %}
gitコマンドの結果をClineに読ませるときは`--no-pager`オプションを付けないと自分でスクロールする羽目になるので--no-pagerを付けましょうう。

### PRの詳細を作成
GitHubとかでPRを作るときにプロジェクトでテンプレートが決まっていると思いますが、それも自動で書いてくれます。
{% codeblock lang:markdown %}
Compare the diff between the current branch and master branch and fill this template for PR.
# Title
Title for this PR

# Motivation

The motivation of this PR

# Description

Details of the PR.

{% endcodeblock %}

## まとめ
思ったより使えるな、というのが全体的な感想です。
辛いところもこれから高速かつ賢いモデルが出てくれば本当にAIコーディングがメインストリームになるかもしれないと思いました。

それじゃ今日はこの辺で。

{% adv 1 %}