---
title: 年収をあげるためにはPHPをやめたほうがいいのか？
categories: エンジニアライフ
featured_image: thumb.png
date: 2021-10-02 20:48:24
tags: [PHP]
---


## はじめに
この記事は特定の言語・業界・企業・職業をディスるためにものではなく、
PHPerである筆者がエンジニアとしてのキャリアを考えるために調べたものをまとめた記事ですので、
ご理解いただける方のみ先をお読みください。
<!-- more -->
 
## 背景
プログラミングの質問サイトの定番、Stack Overflowがエンジニアに対して
毎年行っているアンケートをご存じでしょうか。
https://insights.stackoverflow.com/survey/2021

その中にプログラミング言語ごとに年収をまとめたグラフがありました。

それがこちらです。
https://insights.stackoverflow.com/survey/2021#section-top-paying-technologies-top-paying-technologies

さあ、PHPは何位でしょうか。
（ランクが縦に長すぎてスクショが三枚になってしまいました。）
{% asset_img 01-rank.png %}

上位陣にはいないみたいですね。
{% asset_img 02-rank.png %}

２枚目にもいないですね。。。

{% asset_img 03-rank.png %}

まさかの下から二位。
<u>
38言語中Dartに続いてワースト二位でした。
</u>
PHP、低くないですか？（半泣き）
 
もちろんこのランキングに入っていない言語もあるでしょうが、
人気のある言語は一通り入っているようです。
 
PHPを仕事で使っている私としては無視できません。
少し泣きました。


(ちなみにWEBフレームワークに限ったランキングでは
https://insights.stackoverflow.com/survey/2021#top-paying-technologies-web-frameworks
一位がRuby on Rails,最下位がLaravelでした。
せっかく覚えたのに。半泣きです。)

今回はこの結果について自分なりに考察してみました。

## PHPは簡単な言語だから安い説
誰でもPHPができるとは言いませんが、PHPは簡単な言語だ、という風潮はあると思います。
<u>簡単な言語だと、経験が浅くて単価の安いエンジニアも多くなり、平均して年収が低くなるのではないでしょうか。</u>
逆に難しい言語であれば、それを習得しているエンジニアは大体経験者として雇われるので、
平均年収が高くなるのでは？という仮説を立てました。
 
この図は先ほどと同じStack Overflowのアンケートから、
これは言語ごとのプログラミング経験年数と年収の中央値をプログラミング言語ごとにプロットした図です。
https://insights.stackoverflow.com/survey/2021#section-top-paying-technologies-top-paying-technologies
{% asset_img 04-income-exp.png %}

経験年数15年以上の右半分くらいにある古めの言語を除けば、
<u>平均経験年数と年収は相関がありそうです。</u>
{% asset_img 05-income-exp2.png %}

ただ、<u>PHPは同じ平均経験年数の言語の中でもかなり安くなっています。</u>
 
どうやらこれだけが原因ではなさそうです。

## 仮説２：PHPの特性によるもの説
プログラミング言語の特性によって、
それを使う業界が限定される、ということがあるかと思います。

先ほどの<u>年収ランキングの上位は関数型言語が多い</u>ことに気づいた人も多いのではないでしょうか。
これにはもちろん理由があります。
関数型言語は金融系やトレーディングのシステムと相性が良く、
そういった企業はざっくりいうと金払いがいい会社が多いからです。

### 求人サイトでの年収の分布
ところで、先ほどのランキングでは、年収の中央値しか知ることが出来ませんでした。

給料の分布をもうちょい知りたかったので、
indeedという求人サイト(indeed.co.uk)で各言語の年収の分布を調べてみました。

PHP以外に比較用の言語として、
- 年収ランキング一位だったClojure
- エンジニアの平均経験年数がPHPと似ているJava

を選びました。
また、求人数をそのまま比べると、Clojureの件数が少なすぎて見づらいため、
その言語の全求人数のうち、何パーセントがどの価格帯に入るかをグラフにしています。
PHPであればPHPの全求人のうち£30000~£40000の求人が60%近い、みたいな見方です。
（イギリスの求人サイトなので、イギリス国内の求人しかないことと、単位がポンドなことにお気をつけください。）
{% asset_img 05-range.png %}

さて、明らかにPHPは安い求人の割合が多いですね。
また、どんなに頑張っても£60,000止まりです。
（高単価の求人がそもそも存在しないんですね汗。存在するならまだ希望があるのですが。。。）

Clojureは高単価の割合が多いというか、そもそもスタートラインが£50,000からなので、全然違いますね。
何でこんなことに。。。

### PHP使う企業って。。。
※ ここからは筆者の私見ですので、反論などあれば教えてください。
思うに、<u>PHPを使う企業ってシステムが本業じゃないというか、非テック企業が多いのではないか</u>と思います。
とりあえずコストをかけずWEBができればいい、という感じかなと。

逆に関数型言語であるとか、Goとかを使う場合って
システムがお金を生む仕組みになっていて、エンジニアに投資することでリターンがあるような企業なのかと思います。

とりあえず動けばいいや、って感じのサイトにGoとかScalaとかあまり使わないですよね。

PHPという言語はとりあえず最速で動くものを作るのに適した言語であるため、
<u>システムに投資をそこまでできない企業が使う　→　平均年収が低い</u>、ということになるのではないでしょうか。
 
PHPの求人を見ると、WordpressやDrupal案件も結構ひっかかります。
これらはまさに、最速・最低コストでサイトを作る仕組みであり、
そういうPHPの特性というか哲学を端的に表しているのではないかなーと思います。

### 余談
言語の特性が給料を決めるってことで、先のランキングを見ると結構面白いです。

例えばDartはFlutterとして、クロスプラットフォームのモバイル開発に使われることが多い言語です。
クロスプラットフォーム、つまり、iPhoneアプリとAndroidアプリの両方が開発できるのですが、
逆にiOSエンジニアとAndroidエンジニア両方を抱えることができない企業が使うことになります。
なので、モバイル版のPHPみたいな立ち位置になるんじゃないかなと思います。
とりあえず両プラットフォームで動くものをリリースしたい！みたいな。

また、Matlabなんかは研究者や学生が使うと思うので、プログラミング経験年数も年収も低めになってます、
とか分析ができますね。

## PHPerが年収を上げるには
先の考察でPHPの年収の低い理由が分かったので、
PHPerとしてはどうやって立ち回るか考えてみようと思います。

### 新しい言語を学んで転職
結局のところこれが一番、現実的でしょうか笑。
Rubyでも始めたらいいのかもしれません。
Ruby on RailsはWebフレームワークの中では年収が一位です。
（ちなみにLaravelは最下位。せっかく習得したのに。。。悲しいです。）

あと、割とGoなんかはほかの言語での経験が十分あれば、未経験でも雇うよ、という求人が多い気がします。
企業側もGo経験者縛りだと雇うのがしんどいんでしょうかね。

今から関数型を学んでフィンテック企業でゴリゴリやる、とかは気合が必要な気がしますね。
 
### マネージャーになる
Stack Overflowのアンケートでは、業種別の年収ランキングはマネージャーが一位でした。
将来的にはPHPerのままでもマネージャーになることはできるかと思います。
なりたいかどうかは別ですが。。。
 
### フリーランスになる
これもなかなか現実的な気がします。
特にPHPならサクッと作ってくれる人を募集してる企業は多そうなので。
企業で働くことにこだわりが無ければいかがでしょうか。
 
### 起業する
とりあえず動くものを作るスピードがPHPの良さなので、
イケてるサービスを個人開発してしまいましょう。
PHPエンジニアとして突き進みたいならこれでどうでしょう。
 
## まとめ
言語の特性が年収に関係するなんて正直考えてなかったのですが、
こうして記事にしてみると当たり前だなーと思います。
言語の特性が使用される業界に影響して、
業界は収入に直結しますからね。

プログラマの姿勢としては、年収で言語を選ぶなんてダメだ！という気もしますが、
次に転職する時はRubyかGoを使う企業に潜り込めないかなーと思ってます笑。

ただ、個人で何かプロダクトをさくっと作る時にはPHPは良い選択肢だと思っていますし、
実際にPHPを選ぶと思います。レンタルサーバーやら何やらPHP動かせる環境は多いですからね。

元も子もないですが、適材適所ってことです。

この分析が皆様のお役に立てれば幸いです。

##  関連記事
こちらの記事もおすすめです。  
収入はともかくLaravel楽しいですよね笑

[まだフロントエンドで消耗してるの？PHPフルスタックフレームワークLivewireを試してみた](/2021/07/2021-0706-livewire/)

## PR
プログラマ必読と評判の書でございます。
いかがでしょうか。
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="//af.moshimo.com/af/c/click?a_id=2385320&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F1777480%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F11356219%2F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/891/004/552/20010009784891004552_1.jpg?_ex=64x64" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="//af.moshimo.com/af/c/click?a_id=2385320&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F1777480%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F11356219%2F" target="_blank">コ-ドコンプリ-ト 完全なプログラミングを目指して 上 第２版/日経ＢＰソフトプレス/スティ-ヴ・マコネル</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="//af.moshimo.com/af/c/click?a_id=2385320&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F1777480%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F11356219%2F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="//af.moshimo.com/af/c/click?a_id=2813487&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F489100455X" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>