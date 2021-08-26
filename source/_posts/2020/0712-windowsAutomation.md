---
title: 現役エンジニアが業務を自動化してきた手法７つ+αを紹介【Windows編】
tags:
  - Excel
  - バッチ
  - PowerShell
  - Shell Script
  - マクロ
  - VBS
  - RPA
  - Windows
  - 自動化
categories: 技術
featured_image: thumb.png
date: 2020-07-12 11:53:40
---


## 背景
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

面倒な入力や計算が発生する業務はデスクワーカーなら誰でも経験すると思う。
そんな時にこいつら自動化できないかなと思ったことがあるんではないだろうか。
特にエンジニアであれば、そういった業務を自動化したみたいな経験はあるのではないだろうか。

今回はそんなちょろっと自動化プロジェクトに使える手法を紹介する。
<!-- more -->

私はこんな業務は人がやるべきではない、と思ったものは自動化することを心がけていて、
今、ある程度ノウハウが溜まってきたと自負している。

<u>こんな手法があるんだなっていうのは人に聞いたりしないと気づけない</u>ことが多いので、
これを読んで使えそうなのを習得したりしてもらえればと思う。

## 自動化手法一覧
とりあえず私が使ってきた手法はこんな感じ。
一応、1から難易度順にしたつもり。

1. Excel
1. バッチ or PowerShell
1. Shell Script
1. マクロ
1. VBS
1. 普通にプログラム書く
1. RPA

最後におまけとして、私は未経験だけどこれは良さそう、というのも紹介する。
それでは一個ずつ見てみる。

## Excel
Excelで何を自動化できるのか、と思うかもしれないが、
これがなかなか侮れない。

例をあげると、
`test_01`
みたいなフォルダを01から99まで作りたい時、どうするか。

こんな時は、test_01とエクセルに入力して、
オートフィルでtest_01〜test_99を文字で生成する。

そしたら、
その列の左側に`mkdir`コマンドを入れた列、
その列の右側に`concat`関数を使って、
`mkdir test_01`のようにコマンドを1〜99に対して作る。

あとはこれをコマンドプロンプトに貼り付けるだけで完成。

{% asset_img 01_excel.png %}

この例ではフォルダを作る処理だったけど、
リネームだったり、データファイルの生成だったり、
コマンドでできることならなんでも応用が効く。

この方法は、何回も繰り返しやる処理に対して使うよりは、
一回しかやらないけど、それなりにボリュームがある、みたいな業務に有効かと思う。
繰り返し行う処理なら以降で紹介するような自動化処理を検討した方が良い。


## バッチ、もしくはPowerShell
### バッチ
バッチは、Windowsコマンドを`.bat`拡張子のファイルに記述していくやつ。

これの良いところはポータビリティというか、
<u>基本的にWindowsなら動く</u>という大きなメリットがある。

マクロとかならまだしも、
Pythonで自動化スクリプト組んだので使ってください！とか
非ITの人に言える気がしない。。。。

ただ、個人的には、文法が独特すぎて、
すぐ黒魔術になるイメージがある。  
なので、それなりに簡単な処理にだけ使うようにしている。

### PowerShell
PowerShellについては、正直詳しくないんだけど、
バッチの上位互換ってことになってる。
もうちょっと普通の言語っぽい書き方が可能になっている様子。  

ただ、<u>バッチと違い、Windowsのデフォルトでダブルクリックですぐ実行はできない。</u>
人に共有するときは設定の変更が必要。
まあ設定変えるだけなので、インストールが必要なやつと比べると、まだマシかも。

PowerShellとバッチ、どちらを勉強した方が良いかは、
正直分からない。
PowerShellの方が出来ることは多いとはいえ、
まだまだ普及していない感が否めないので、
汎用性重視のバッチ、新しいの好きならPowerShellといったところか。

<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15482373%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19138197%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/839/965/983/20010009784839965983_1.jpg?_ex=64x64" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15482373%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19138197%252F" target="_blank">ＰｏｗｅｒＳｈｅｌｌ実践ガイドブック クロスプラットフォーム対応の次世代シェルを徹底解説 /マイナビ出版/吉崎生</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15482373%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19138197%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://www.amazon.com/" target="_blank">Amazon</a><img src="//i.moshimo.com/af/i/impression?a_id=*******&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062" width="1" height="1" style="border:none;"></div></div></div><div class="booklink-footer" style="clear: left"></div></div>

## Shell Script
バッチの学習コストを払う気になれないという問題に対する一つの答えがコレだと思う。

エンジニアならGit bashとか入ってる人も多いはず。
その際に一緒にLinuxコマンド群がついてくる。

これらを使うことで、
個人で使うPCはMac(or Linux)だけど、
支給されるPCはWindowsという人が
<u>Windows/Linuxの両方でコマンド覚えるのめんどくさい問題が解決する。</u>

まあ、個人でLinux使う機会ない人でも、
基本的にバッチよりできること多かったりするし、
特にエンジニアだったら覚えておいても損はないと思う。

デメリットは他の人の端末で動かないことか。


---
ここから後半戦。

ここから紹介する手法は、いわゆるプログラミングになるので、
学習コストという意味ではそれなりになると思うが、
できることの幅は増えていく。

## マクロ
実行したい業務がExcel上で完結するならマクロが良い。
他の人の端末でも、Excelさえ入っていれば問題なく動く。

~Windows使いならとりあえず覚えておいて損はない。~
↑今から勉強するのであれば後述のJavascript api for officeも検討したようが良さげ！

マクロではないんだけど、最近のExcelはWebスクレイピング的な機能も持っていて、
Webサイトのテーブルをそのまま表として持ってくるみたいなこともできたりする。

Excelの処理は後述するプログラムやRPAでできないことはないが、
書式やら細かい指定は大変だったり、そもそもできないこともある。

デメリットは、ちょっと書き方が古めかしいとかか。

## VBS
VBSはこの中だとかなりマイナーだと思う。
Windowsが作ったJavaScriptみたいなイメージだろうか。
動的型付けなVBAみたいな感じ。

私も先輩に教えてもらうまで自動化みたいな使い方ができるのを知らなかったけど、
何気にRPAツールであるWinActorで採用されてたりする。

この方法の一番のメリットは<u>GUI操作ができること</u>だと思う。
このSendKeysコマンドを使うと、
`WshShell.SendKeys`
アクティブなウィンドウを掴んでキー入力送るみたいな感じ。   

デメリットとしては、
<u>言語としての将来性はほぼない</u>こと。

MicrosoftがIEでVBSを動かす機能をデフォルトではなくしたというのもあり、数年後には消えてしまっているかもしれない。
https://www.howtogeek.com/437372/what-is-vbscript-and-why-did-microsoft-just-kill-it/

あとは、やっぱり古めかしい感じの文法。
これはマクロとかと同じかと思う。

## 普通にプログラム書く
<u>バッチでは物足りないけどVBSなんて言語は使いたくない</u>
という人はもうプログラムを書いてしまおう。

今、業務自動化でアツい言語はPythonとかだろうか。
Pythonに限らず、テキスト処理、Excel、メール、Webの参照なんかはそれなりの言語であれば問題ない。

デメリットはGUI操作はどうしても苦手なことと、
他の人の環境で動作させるために工夫が必要なことだろうか。

Web操作であればseleniumというテストツールを使って自動化するのが定石っぽいけど、
やったことないので、今後やることがあれば追記する。

## RPA
今、流行りの技術で、Robotic Process Automationの略語。  

他の技術では手に負えないようなGUI操作もやってのける。
そのため、基本的に人がやっているPC操作なら大抵自動化できる。

私は1年以上このRPA開発をしていた経験があるが、
特にUiPathは完成度が非常に高いためおすすめ。
他にも二つくらいツールを触ったことがあるが、UiPathの完成度は異常。

デメリットとしては、
現状、オープンソースのRPAツールというのも選択肢が少ないため、
予算が必要になることが大半かと思う。
会社、あるいは部署で取り組むことになるだろう。

## その他もろもろ
この記事を書きながら発見したものや、これから勉強していきたいものを書いてみる。

### Google App Script
GASと呼ばれたりする。G Suiteにおけるマクロみたいなイメージだが、
JavaScriptで書けるのがよろしい。
Office使わない職場ならこっちのが良い。

### Google Chrome拡張
これは全く触っていないんだけど、ちょっと勉強したい。
これもHTMLとJavascriptで作る感じ。
Web操作のみの自動化だったら、これが割といい仕事するんじゃないかと思っている。
今後、勉強したら追記する。

### Javascript api for office
この記事を書く調査の段階で知ったけど、結構気になっている。
JavascriptとHTMLでさくっとOfficeの拡張機能が作れるようになるらしい。

普通にHTMLとJavascriptなので、
Web版のExcelで使えたりするので、Macから実行とかも普通に出来るらしい。
今からマクロやVBS覚えるくらいならこっちやった方がいいのでは？と思うくらい。

## 最後に
少し、自動化スキルセットみたいなのを考えてみた。

とにかくどんな環境でも動かしたい、ということを重視する人はこんな感じ。
SIerとかだとインストールできるソフトも制限があったりするので、
それらに引っかからずにやるならこれらかと思う。

自動化対象|技術  
--- | ---
Excel  |  マクロ  
Web|VBSで頑張る
ファイル操作|バッチ


技術で尖りたいならこんな感じだろうか。

自動化対象|技術  
--- | ---
Excel|Javascript api for office + プログラミング
Web|Chrome 拡張 + プログラミング
ファイル操作系|PowerShell + プログラミング

これ、プログラミング言語にJavascriptを選べば、
全部Javascriptでやることも可能だったりする。コスパ高い。

改めてまとめて見ると、
SIerで育ったせいか、レガシーな感じの技術が多くてちょっと残念。
もっとイケイケなのを知っている人は教えてください。

それでは今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[UiPathでCookie Clickerに挑戦する](/2020/02/2020-0222-CookieByUiPath/)

