---
title: Tabulaを使ってPDFからテーブルを抽出する
tags:
  - 自動化
  - PDF
  - Tabula
categories: 技術
featured_image: thumb.png
date: 2020-11-14 02:54:14
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

皆様、業務自動化してますか。（唐突
ありがちな業務としてPDFの読み取りがあるかと思います。
今日はPDFからテーブルの値を抽出できるTabulaというツールを紹介します。
<!-- more -->

## Tabulaとは？
<u>オープンソースのPDFからテーブルの値を抽出するソフトです。</u>
値を抽出するといってもOCR（画像の読み取り）ではなく、
あくまでもテキストとして認識できるデータを対象としています。

このツールの良いところは、
色々な方法で実行が可能で、要件にそった利用方法を選ぶことができます。

<u>Tabulaの実行方法には以下の三つの方法があります。</u>
- GUI
- コマンドライン
- Java、Pythonなど各種言語のAPI

サクッと一、二枚を抽出するならGUI、
大量のPDFを自動で読み取る際にはコマンドラインからの実行か
Javaなどのプログラミング言語から呼び出して使用できます。

この記事では三つの使用方法をサクッと紹介します。

## GUIでの実行
GUIではブラウザから直感的にテーブルを読み取ることができます。

また、このGUIで作成したテンプレートを、
他の方法でも利用するので、とりあえずこのステップはできるようにしておいてください。

### Tabulaのダウンロード
Tabulaのダウンロード方法です。

Windowsでの方法を書いてますが、
Macでも大差ないかと思います。

以下のリンクからZipをダウンロードします。
https://tabula.technology/

{% asset_img 01-install.png %}

こちらを<u>任意のフォルダに解凍するだけ</u>で
利用可能になります。

簡単ですね。

### Tabulaの利用法
それでは先ほどダウンロードしたTabulaを実行します。

解凍したフォルダにあるtabula.exeを起動します。

{% asset_img 02-exe.png %}
コマンドプロンプトが立ち上がり、
しばらくするとブラウザが立ち上がります。
{% asset_img 03-cmd.png %}


BrowseボタンからローカルにあるPDFファイルを指定します。

{% asset_img 04-gui.png %}
今回はテストとして以下のPDFを使ってみます。
https://github.com/tabulapdf/tabula-java/blob/master/src/test/resources/technology/tabula/20.pdf

importボタン押下でPDFを読み込みます。
{% asset_img 05-import.png %}


読み込みが完了したらテーブルの範囲を指定します。


{% asset_img 06-selection.png %}
Preview & Export Extracted Dataボタン押下で抽出を実行します。
{% asset_img 07-extracted.png %}


読み込めたみたいですね。
この状態からCSVやJSONに出力が可能です。

### Templateの作成
これ以降の操作の下準備として、
<u>今回取得したテーブルの範囲をテンプレートとして保存しておきます。</u>
My Templateタブからダウンロードします。

{% asset_img 08-template.png %}


こんな感じのJSONになっています。
これらのx1,x2,y1,y2をこの後の自動化のステップで使用していきます。
{% codeblock 20.tabula-template.json lang:json %}
[
    {
        "page": 1,
        "extraction_method": "guess",
        "x1": 96.97123842315747,
        "x2": 506.9289932449348,
        "y1": 156.61725479125977,
        "y2": 508.5410624694824,
        "width": 409.9577548217773,
        "height": 351.92380767822266
    }
]
{% endcodeblock %}


## コマンドラインからの実行(tabula-java)
Tabulaはコマンドで実行することも可能です。

コマンドライン用のツールがあるので、
以下からjarファイルをダウンロードします。
https://github.com/tabulapdf/tabula-java/releases


{% asset_img 11-tabulaDL.png %}

適当な場所に配置して以下のコマンドを叩きます。
今回は簡単のためjarとPDFを同じ場所に配置しています。
また、ここで先ほど取得したjsonの座標情報を使用します。
```
java -jar ./jarのパス/tabula-0.9.0-jar-with-dependencies.jar -p all -a $y1,$x1,$y2,$x2 -o {アウトプットのファイルパス} {対象PDFのパス}
// コマンド例
java -jar tabula-1.0.4-jar-with-dependencies.jar -p all -a 156,96,508,506 -o output.csv 20.pdf
```

CSVが出力されます。

{% asset_img 14-output.png %}

## Javaライブラリ(tabula-java)の利用
tabulaはJavaのプログラムからも使用できます。
今回はGradleなどを使ったプロジェクトからライブラリを呼び出す場合を紹介します。

### Gradle
repositoryにmavenCentralを追加します。
```
repositories {
    jcenter()
    mavenCentral()
}
```

dependenciesにtabulaを追加します。

```
dependencies {
    // This dependency is used by the application.
    implementation 'com.google.guava:guava:29.0-jre'
    
    implementation 'technology.tabula:tabula:1.0.4'

    // Use JUnit test framework
    testImplementation 'junit:junit:4.13'
}
```

### 実装
以下の関数でpdfを抽出してCSVに出力できます。

{% codeblock App.java lang:java %}
    public void extractPdf(){
        // PDFのパス
        String path = "src\\main\\resources\\20.pdf";
        // 出力先CSVのパス
        String outputPath = "src\\main\\resources\\output.csv";

        // PDF内のテーブルの座標
        float top = 156f;       // y1
        float left = 96f;       // x1
        float bottom = 508f;    // y2
        float right = 506;      // x2

        try{
            // PDFの取得
            Page page = Utils.getAreaFromFirstPage(path, top, left, bottom, right);

            // 読み込み用のクラス
            BasicExtractionAlgorithm sea = new BasicExtractionAlgorithm();
            
            // テーブルの抽出
            List<Table> tables = (List<Table>) sea.extract(page);

            StringBuilder sb = new StringBuilder();
            (new CSVWriter()).write(sb, tables);

            // CSVの書き込み
            PrintWriter pw = new PrintWriter(new File(outputPath));
            pw.write(sb.toString());
            pw.close();

            System.out.println(sb.toString());

        }catch(IOException e ){
            e.printStackTrace();
        }

    }
{% endcodeblock %}

PDFを読み込むアルゴリズムには、
BasicExtractionAlgorithmと
SpreadsheetExtractionAlgorithmがあります。

<u>BasicExtractionAlgorithmは余白をみる、
SpreadsheetExtractionAlgorithmは罫線をみることで</u>
テーブルを認識しているそうです。

GUI版では以下の箇所に対応しているので、どちらのメソッドが良いかは
GUIで試してみると良いと思います。
{% asset_img 21-extractmethod.png %}

この例ではCSVに出力したいので、`CSVWriter`クラスを利用していますが、
他にもJSONでの出力用に`JSONWriter`クラスなども用意されています。

また、PDFのテーブル範囲を指定する処理をUtilとして
別クラスに切り出しています。

こちらは本家のテスト用Utilクラスを参考にしました。
https://github.com/tabulapdf/tabula-java/blob/master/src/test/java/technology/tabula/UtilsForTesting.java
{% codeblock Utils.java lang:java %}
package tablajava;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;

import technology.tabula.ObjectExtractor;
import technology.tabula.Page;

public class Utils {
        public static Page getAreaFromFirstPage(String path, float top, float left, float bottom, float right) throws IOException {
        return getAreaFromPage(path, 1, top, left, bottom, right);
    }

    public static Page getAreaFromPage(String path, int page, float top, float left, float bottom, float right) throws IOException {
        return getPage(path, page).getArea(top, left, bottom, right);
    }

    public static Page getPage(String path, int pageNumber) throws IOException {
        ObjectExtractor oe = null;
        try {
            PDDocument document = PDDocument
                    .load(new File(path));
            oe = new ObjectExtractor(document);
            Page page = oe.extract(pageNumber);
            return page;
        } finally {
            if (oe != null)
                oe.close();
        }
    }
    
}
{% endcodeblock %}

実際に動かしてみたい人は以下のレポジトリに
ソースを格納したので、使ってみてください。
https://github.com/karintomania/JavaTabulaDemo

## まとめ
今回はTabulaの使い方を紹介しました。

PDFを自動で読み取りたい要件があったときには
使ってみてください。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[現役エンジニアが業務を自動化してきた手法７つ+αを紹介【Windows編】](/2020/07/2020-0712-windowsAutomation/)

## おすすめ書籍
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/621/066/089/20010009784621066089_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">人月の神話   /丸善出版/フレデリック・フィリップス・ブルックス</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qtaz4.2bo11387.g00qtaz4.2bo1245a%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fhmvjapan%252F5742463%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fhmvjapan%252Fi%252F17491470%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:none!important;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB07QL464C2%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>