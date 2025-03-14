---
title: AIに負けないプログラマ - 理解によるプログラミングについて
tags:
  - キャリア
  - AI
categories: エンジニアライフ
featured_image: thumb.png
date: 2024-08-20 22:51:46
---


## TLDR;
**AIに知識では勝てなくなるだろうから、人間にしかできない理解をすることが大事。**

## はじめに

どうも。生成AI無しではメールがかけなくなってしまった[かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。

生成AI、使ってますか。聞けば何でも答えてくれるので便利ですよね。便利な反面、**AIが将来ソフトウェアエンジニアの仕事を奪うのでは、という懸念**もあります。

今回はそのことについて考えを書いていきます。
<!-- more -->

## 知識と理解

突然ですが、AIは与えられた質問や、その回答を理解しているのでしょうか？人間ときちんと会話が成り立っているところを見るにAIは私達との受け答えをじゅうぶん理解しているように見えます。

中国語の部屋という思考実験を紹介したいと思います。

知らない人はWikipediaの記事を読んでみてください。

https://ja.wikipedia.org/wiki/中国語の部屋

この部屋の中の人はマニュアルにそって応答しているだけで、まったく意味を理解していません。この観点でいうと、**ChatGPTなどの生成AIもプログラムに沿って回答を生成しているだけで意味は理解していない**と言えます。

このような理解せずに何かをすると言うことはAIに限ったことではありません。ソフトウェアエンジニアにおける次の具体例を見てみてください。

ソフトウェアの開発中にエラーが起きました。

- エンジニアAは先輩エンジニアにエラーが起きたことを伝え、**教えてもらったコマンドchmodを意味がわからないまま実行**して、エラーを解消しました。
- エンジニアBはエラーメッセージを読み、書き込みたいファイルに**適切な権限がないことが分かったのでコマンドchmodを実行**して、エラーを解消しました。

この二人が行ったことはどちらもコマンドを実行してエラーを解消したことですが、理解しているのはどちらかといえば、エンジニアBだけであるのは明白だと思います。

このようなことは意外とプログラムを書く上ではあるあるだと思います。誰でもエラーが起きた際に質問サイトから意味もわからずコピペして対応したということは経験していると思います。私も何もわからずchmod 777を質問サイトからコピペした前科があります。

このように、オンライン上で見つけたサンプルコードなどの知識をあまり理解せず適用して解決を目指すアプローチがあります。この記事内では、このような**理解を伴わずに知識を使うプログラミングを「知識によるプログラミング」、対してきちんと理解を伴ったプログラミングを「理解によるプログラミング」**として話をしていきたいと思います。

知識によるプログラミングの例をもう少し紹介します。

- おまじないとして`public static void main(String[] args)`を書いた
- レポジトリにはインターフェースを使うと良いと言われたのでインターフェースを作った
- git pushでエラーが出たので、グーグル検索して出てきた--forceオプションをつけて実行したらエラーが消えた

このようにあまり害のないものから危険なものまで例を挙げてみました。特に最後のものはエラー以外のものが消えている気がしますね。しかし、理解をせずに知識によるプログラミングをしている以上、何が危険なのかを考えることができません。次の章では知識によるプログラミングのなにが良くないのか詳しく見ていきます。

## 知識によるプログラミングの問題点

それでは知識によるプログラミングはどんな問題があるのでしょうか。

それは、理解によるプログラミングに比べ、**ベストな判断ができない上に効率が悪い**ということです。

理解によるプログラミングをする際は、以下のような手順を無意識に踏んでいると思います。

1. 原因を理解する
2. 解決法をいくつか考える
3. ベストなものを採用する

対して、知識によるプログラミングではこのような手順ではなく以下のような手順になります。

1. 解決法と思われるものを探す（ググる、人に聞くなど）
2. 解決法を試して解決しなければ１に戻る

**この方法は解決方法に到達するまでの時間は運に依存**します。また、一番最初に問題を解決した方法を採用しがちなので、最適ではない方法を選択してしまう可能性もあります。要は当てずっぽうです。

また、似たような問題が起きたときにも、問題の構造を理解していないがために似た問題であることに気づけずに同じプロセスを繰り返すことになってしまいます。

似たような話で「試行錯誤は悪である」というブログポストもぜひ読んでみてください。[試行錯誤は悪である](https://note.com/simplearchitect/n/nbf330ae7770f)

また、理解はプログラミングのことだけに限りません。業務のことを理解していなければそもそもコードを書く必要がないことに気付かず、言われたままを正しいことだと思ってコーディングをしてしまいます。様々な視点から仕事を理解することで効率が違ってきます。

ここでAIがやっていることと知識によるプログラミングを比べてみます。AIは結局、理解はしていないという点で知識によるプログラミングをする人間と変わりません。AIが生成したコードにバグがある、いわゆるハルシネーションが起きるのは知識が正しいか確かめる術がないからです。

しかし、AIと人間との違いはAIはインターネット全体という膨大な知識を持っていることで正しい知識を吐き出す確率を上げています。また、将来的には、AIがプログラミングの実行環境と統合されて、人間を超えるスピードで知識によるプログラミング（課題を解決するまで色々な方法を試す）をするようになるかもしれません。なので、**知識によるプログラミングをするだけのプログラマは、もっと多くの知識を持っているAIに取って代わられてしまう、というのはありえない話ではないと思います。**

## 理解によるプログラミングをする

では、AIに負けないようにするにはどうしたら良いでしょうか？理解によるプログラミングができるようになれば良いというのが私の主張です。それができるようになるにはどうしたら良いでしょうか。はじめになぜ、知識によるプログラミングをしてしまうのかを考えます。

### 知識によるプログラミングが起こる理由

これは**シンプルに理解する、ということが大変**だからです。理解することは単純に知識を適用するよりもかなり多くの知的体力を使います。また、**理解して物事をすすめることは時間がかかります。**そのため、仕事など納期が決まっている際には理解したほうが良いとは分かっていてもそのための時間がないように感じることが多くあります。コスパが悪い、というやつですね。ただ、よく考えれば分かるように理解しないで仕事を進めることほど効率の悪いことはありません。全体感を理解してコードを書くことで、書く量が減る（あるいはそもそも書かなくてよくなる）、書かれたコードを読む負荷が減る、メンテナンスが楽になるなど、**理解したことによって大量に減る時間がある**ためです。その場その場で知識をツギハギしていると後工程でそのツケを払うことになります。

また、真面目な人ほど知識と暗記がいいことだと思っているフシがあります。これは学校のテストなどでは理解をしているか、ということは特にチェックされず、問題に対して1:1対応した知識、答えを知っているかが確認ポイントとなっていることに起因する気がします。

学校で理解を教えないのは理解というのが本人にしか分からない内部状態で、簡単に教えられるものではないからです。AIの回答は、理解している人の回答と一見同じに見えるように、**理解というのは外側からは分からず本人にしか分からない内部状態である**と言えます。そういう意味では感情とか愛とかに近いもののような気もします。実際、中国語の部屋の論文でもそんなことが書いてあります。

加えて**理解する方法は人によって違うので、これができるようになれば理解ができたと言える、これをすれば理解できるようになる、という方法論が成立しません。**（XXXが分かるようになる、とうたう教材を見るたびに、そんなことはないだろうと思ってしまいます。）

まあ、理解を保証することはできないので各自頑張るように、ではあまりにも救いがないので、自分なりにどうしたら良いかを考えてみました。ただし、これから言うことは例えばAIに聞いたらやってくれることなので、これらができたからといって、あなたが何かを理解する保証はありません。理解について考えるきっかけくらいに思ってください。

### 「どうやって」「なんで」「だからなに」を考える

**なにか新しいことに触れたら「どうやって？」「なんで？」「だからなに？」といった質問をすることで理解が深まります。**例えば「Docker」というキーワードに対してだったら「どうやってDockerは動いているのか」「なんでDockerは人気なのか」「Dockerを使ったら何が可能になるのか」といった感じです。また、この類いの質問はチェインすることが可能で、なぜなぜ分析の要領で自分が理解していない深さまで追い込むことで、深く考えることが可能です。

業務で出くわす全ての概念にこれをやっていては仕事が終わらないのでほどほどにすべきですが、いくつか質問して答えを考えるだけで一日仕事をしたのになにも理解が進まなかった、ということはなくなるはずです。

### 評価と創造を意識する

**ブルームタキソノミーという思考を６段階で表したもの**があります。

その六段階は以下の様になっています。

1. 記憶
2. 理解
3. 応用
4. 分析
5. 評価
6. 創造

知識によるプログラミングというのはほとんど一段階目の記憶に頼っている状態とも言えます。

この６段階の面白いところは高いレベルの評価や創造ができれば、勝手にそれ以下の段階もついてくる、というところです。一段階目からひとつずつ上がっていかなければいけないというものでもないみたいです。

なので、**新しい知識を理解したいときは積極的に評価・創造をしてきましょう。**

例えば「関数型プログラミング」というキーワードを理解したいとします。

評価は例えばOOPと比べて、自分が関わっているプロジェクトにどちらを使うべきか考えたりするなど、実際に判断を下せるようになるのが評価です。

創造は実際にコードを書いてみるのがプログラミングにおいては簡単な方法です。技術ブログを書くことも良いと思います。

よく考えてみれば、**理解によるプログラミングをしようとすれば、いろいろな解決方法を評価してベストな方法を実装することになるので自然と評価・創造をすることになりますね。**

重ねてになりますが、分析や評価というのはAIに質問すればもちろん答えてくれます。「XXという課題に対してAを使う場合とBを使う場合のメリットとデメリットを踏まえてどちらを使ったらいいか教えて」といった質問をすればきちんとした分析と評価が返ってきます。ですが、中国の部屋よろしく、AIが理解して評価しているわけではなく統計の計算の結果を返しているにすぎません。もちろん、その統計の結果ここまで精度の高い、思考のようなものが出力されることはシンプルに驚きですが、AIはあくまで理解はしていないということに注意してください。

## まとめ

AIに取って代わられたくない筆者がどうしたらAIに負けないで仕事を続けられるかを考えてみました。きちんと理解するのが大事です、というめちゃくちゃ当たり前な結論になってしまったのですが、意外と見落とされているポイントかなと思います。

プログラミングでは、毎回違った条件のもと仕事をするので、同じ知識を同じように適用することはほぼありません。もし同じことを何回もするのであれば、自動化するのが良いプログラマですから。知識レベルの仕事はAIが高水準でこなすようになった今、人間の仕事は状況を理解し、ベストな選択肢を判断する仕事になります。理解するのって本当に知的体力を使うというか、とにかく大変なんですが、理解できたときの達成感がプログラミングする上での一つの報酬だと思います。頑張っていきましょう。

## 参考
以下はこの記事を書くうえで参考にした記事です。

### Minds, Brains, and Programs
これは中国語の部屋が出てくる論文です。1980年に書かれたにも関わらず今も、というかChatGPTとかが出た今だからこそ、読んで面白かったです。

https://web.archive.org/web/20071210043312/http://members.aol.com/NeoNoetics/MindsBrainsPrograms.html

### The Programmer’s Stone
このサイトではPacker（知識を適用する人）とMapper（マップを作る人）という概念を使ってプログラミングができる人とできない人を説明しています。この記事で言う知識によるプログラミングと理解によるプログラミングに対応しています。

[The Programmer’s Stone](https://www.datapacrat.com/Opinion/Reciprocality/r0/index.html)

### 技術者には試行錯誤は圧倒的に悪であると腹落ちした話
この方の記事はめっちゃ面白いです。

[技術者には試行錯誤は圧倒的に悪であると腹落ちした話](https://note.com/simplearchitect/n/nbf330ae7770f)

### 6 Levels of Thinking Every Student MUST Master
動画ですが、ブルーム・タキソノミーについてわかりやすく説明してくれています。

[6 Levels of Thinking Every Student MUST Master](https://www.youtube.com/watch?v=1xqerXscTsE)


## 関連記事
こちらの記事もおすすめです。

[哲学駆動開発で起業・個人開発のアイデアを出す方法](/2021/02/2021-0207-inventing-on-principle/)