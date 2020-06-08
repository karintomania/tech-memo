---
title: Javaで関数型プログラミング
tags:
  - Java
  - 関数型プログラミング
categories: 技術
date: 2020-03-14 12:34:34
---


こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  
Javaでは、関数型プログラミングをするために、様々な機能が用意されています。  
それらの機能を用いた実装を紹介してみます。  

## 関数型プログラミングとは
Java8で関数型っぽい機能が多く導入されました。  
それを利用した実装として、この記事では以下を紹介します。  
- map、reduceの利用
- 関数型インターフェース
- パイプラインパターン
<!-- more -->
## map
mapはListを引数にとって何かしら操作したリストを返します。  
ここではint型のリストに対して二乗した数の配列を求めて見ます。  
まずは普通に実装した場合です。  

 {% codeblock mapなしの場合 lang:java %}
public static void square(){
	List<Integer> nums = Arrays.asList(new Integer[]{0,1,2,3,4});

	List<Integer> sqrs = new ArrayList<Integer>();
	for(Integer num : nums){
		sqrs.add(num * num);
	}

	for(Integer sqr : sqrs){
		System.out.println(Integer.toString(sqr));
	}
}

 // 実行結果
0
1
4
9
16
 {% endcodeblock %}


 一回二乗したリストを作ってそれをループして表示しています。  
 それに対してmapを使った場合はどうでしょうか。  

{% codeblock map使用 lang:java %}
public static void squareFunc(){
	List<Integer> nums = Arrays.asList(new Integer[]{0,1,2,3,4});

	nums.stream().map(x -> x * x)
			.forEach(System.out::println);
}
{% endcodeblock %}
えらくこざっぱりしました。  
少し解説します。  

実質、一行で全てが表現できてしまいます。素敵。  
{% codeblock lang:java %}
nums.stream().map(x -> x * x).forEach(System.out::println);
{% endcodeblock %}

この```stream()```でstream型のオブジェクトを返しています。  
これはmapなどするために必要ってくらいです。(適当)  
次の```map(x -> x * x)```が肝です。  
このmap関数は引数にラムダ式を取ります。  
なんとなく二乗している感じはするけど分かりづらいですね。  
また、ラムダ式とかいう大層な名前からしてとっつきづらいのですが、実体はただの関数です。  
map関数は関数を引数に取ることができるんですね。  
これについては後ほど説明します。  

また、その後にまた謎な記述が出てきます。
```
.forEach(System.out::println);
```
これもSystem.outクラスのprintlnメソッドを引数にしてくれ、という書き方です。  
メソッド参照と呼ばれます。  
このforeach()関数も引数に関数を取れる関数です。  
このような関数を引数にとったり関数を返すような関数を高階関数と呼んだりするようです。  

上記はintからintのListでしたが、違う型のListを返すこともできます。
{% codeblock List<String>からList<Integer>を返す例 lang:java %}
// 名前の長さを取得
public static void nameLengthFunc(){
	List<String> names = Arrays.asList(new String[]{"Mary", "Isla", "Sam"});

	names.stream().map(x -> x.length())
					.forEach(System.out::println);
}
// 出力結果
4
4
3
{% endcodeblock %}
## reduce
次にreduceを見ていきます。  
こちらは集計のような処理をリストにしたい時に使用します。  
シンプルにIntegerリストの合計を求める処理を書いてみます。  
まずはfor文を使ったコードです。  

{% codeblock for文を使ったreduce lang:java %}
public static void reduceSum() {
	List<Integer> nums = Arrays.asList(new Integer[] { 0, 1, 2, 3, 4 });
	int sum = 0;

	for(Integer num : nums){
		sum += num;
	}

	System.out.println(sum);

}
{% endcodeblock %}

reduceを使って書き換えてみます。  
{% codeblock reduce lang:java %}
public static void reduceSum() {
	List<Integer> nums = Arrays.asList(new Integer[] { 0, 1, 2, 3, 4 });
	int sum = nums.stream().reduce(0, (t, x) -> t + x);

	System.out.println(sum);

}
// 出力結果
10
{% endcodeblock %}

少し解説をすると、  
reduce()関数は二つ引数をとっています。  
最初の0は二つ目の引数で使用しているtの初期値です。  
ラムダ式では引数をtとxを入れていますが、このtに合計値が入っていきます。  
0で初期化されたtにList内の数をxとして一つ一つ足していくイメージです。  
```
reduce(0, (t, x) -> t + x)
```

## 関数型インターフェース
関数型プログラミングの上で、この関数を変数として扱う、という考え方が大事だと思います。  
初めてラムダ式を見た時意味わからなかったのですが、関数を変数として使っている、ということを理解すると意外とあっさり理解できた気がします。  
そのための機能に関数型インターフェースがあります。  

少し具体的に説明します。  
mapで利用したコードはFunction型の変数を使ってこうも記載できます。  
{% codeblock 変数に関数を入れる lang:java %}
public static void squareFunc(){
	List<Integer> nums = Arrays.asList(new Integer[]{0,1,2,3,4});

	// 関数をsquare変数に代入
	Function<Integer, Integer> square = (x) -> { return x * x; }; 

	nums.stream().map(square)
				.forEach(System.out::println);

}
{% endcodeblock %}
これなら一般的な関数の定義に少し近い気がします。  
また、このFunction<引数の型, 返り値の型>以外にも、返り値がない場合はConsumer、引数が二つあるときはBiFunctinoなどいくつかの型が用途に合わせて用意されています。  
また、自作することも可能です。  

{% codeblock 変数に関数を入れる lang:java %}
public static void useOriginalFunc(){
	// 実際のoriginalFuncの実装
	originalInterface originalImplement = (str1, str2, str3) -> {return str1+str2+str3;}; 

	System.out.println(originalImplement.originalFunc("Hello ", "World", "!"));
}
// 自作の関数型インターフェース
@FunctionalInterface
public interface originalInterface{
	// String三つを引数に取る関数を持つ
	public String originalFunc(String str1, String str2, String str3);
}
{% endcodeblock %}

## パイプラインパターン
これらを使ったデザインパターンとしてパイプラインパターンというものがあります。  
実装をみてもらったほうが早いと思うので、例を紹介します。  
結成年代とボーカルが登録されたリストから、
2010年以降結成のものをBand名順でソートして返すようにします。  
Bandクラスの定義は以下になります。  

{% codeblock Band.java lang:java %}
public class Band {
	String name;
	String vocal;
	int startYear;

	Band( String name, String vocal, int startYear){
		this.name=name;
		this.vocal=vocal;
		this.startYear=startYear;
	}
	@Override
	public String toString(){
		return this.name + " :" + this.vocal  + " :" + Integer.toString(this.startYear);
	}
}
{% endcodeblock %}

まずは従来の実装で書いて見ます。  


{% codeblock lang:java %}
public static void printBandsAfter2000VocalSorted(List<Band> bands){
	List<Band> result = new ArrayList<Band>();
	// 2000年以降結成のバンドをフィルター
	for(Band band :bands){
		if(band.startYear >= 2000){
			result.add(band);
		}
	}

	Comparator<Band> comparatorByName = new Comparator<Band>() {
		public int compare(Band band1, Band band2){
			return band1.name.compareTo(band2.name);
		}
	};
	// ソート
	Collections.sort(result,comparatorByName);

	// 出力
	for(Band band : result){
		System.out.println(band.toString());
	}

}
{% endcodeblock %}

実行させてみます。  
（リスト内のバンド名は実在のバンドとは一切関係ありませんので、ご注意を。）  
{% codeblock lang:java %}
public static void run(){
	List<Band> bands = Arrays.asList(new Band[]{
							new Band("Lin to Shite Samidare", "PK", 2039),
							new Band("Bump Of Beef", "Fujisan", 1998),
							new Band("Gesu no Kiwami Oyaji", "Yamatani Enoki", 2005),
							new Band("Creep pipe pattern", "Ozaki Datsuryokukan", 2008),
							new Band("Osaka Jihen", "Shina Lemon", 1980),
							});
	printBandsAfter2000VocalSorted(bands);
}

// 実行結果
Creep pipe pattern :Ozaki Datsuryokukan :2008
Gesu no Kiwami Oyaji :Yamatani Enoki :2005
Lin to Shite Samidare :PK :2039
{% endcodeblock %}

printBandsAfter2000VocalSortedは、少し冗長な感じがしますね。  
それではこれを関数型っぽく書いてみます。  

{% codeblock lang:java %}
public static void printBandsAfter2000VocalSortedFunc(List<Band> bands){
	bands.stream()
		.filter(band -> band.getStartYear() >= 2000)
		.sorted(Comparator.comparing(Band::getName))
		.forEach(System.out::println);
}
}
{% endcodeblock %}
そうです。ワンライナーです。  
これは嬉しいですね。  
パイプラインパターンはこんな感じで実行する関数をつなげていく実装です。  
またこちらの方がリストに対して何をしているのか、読みやすいのではないでしょうか。  

この```.sorted(Comparator.comparing(Band::getName))```は```Comparator.comparing()```を使用しています。
このcomparingはソートするキーを取得するメソッドを受け取って、適切なcomparatorを返してくれるメソッドです。  
従来は自分で定義していたのが、この一文で済むのが嬉しいですね。  
ちなみにマメですが、```sorted(Comparator.comparing(Band::getName).reversed())```とすると逆順で並べてくれます。便利。  

## 所感
関数型プログラミングが流行っているので、調べてみました。  
副作用だ、なんだとか色々言っているのですが、  
Javaに関していうならば、関数型を利用するメリットは、コードがこざっぱりするというのが、大きいのではないでしょうか。  
もっと詳しい人からしたら色々あるのかも知れませんが、僕的にはこれでも十分使用する理由になります。
皆様も取り入れてみてはいかがでしょうか。  


## 参考
この記事は以下の記事に触発されて書きました。
ですが、この記事は英語とPythonで書かれているため、  
日本語とJavaでどうなるか確かめて見た次第です。  
[An introduction to functional programming]()

また、こちらもパイプラインパターンについて、
もっと詳しく教えてくれています。  
for文のデメリットみたいなことが分かりやすいです。  
[Function composition and the Collection Pipeline pattern]()
