---
title: 【Java】Twitter APIからライブラリを使わずツイート取得してみる
tags:
  - Java
  - Twitter
  - Twitter API
categories: 技術
featured_image: thumb.png
date: 2020-08-23 09:09:46
---


## はじめに
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
今回はTwitter APIをライブラリを使わずに利用してみる記事です。

**注意**
本記事はOAuthの実装の解説に結構ボリュームを割いてるので、
ソースだけ見たい人は最後の方にあるので、そこまで飛ばしちゃってください。

## 圧倒的ネタバレ
ネタバレをすると、
<u>ライブラリを利用した方が圧倒的に生産的です。</u>

OAuthの実装が割と辛いため、時間がかかってしまいます。
Twitter4jなどライブラリの利用をオススメします。
<!-- more -->
また、Twitter4jが対応していないAPIもありますが、
その場合でもOAuthのライブラリはあるので、そちらを使ってみるのが良いかもしれません。
私が調べた中では、
scribejavaというのが良さそうでした。
https://github.com/scribejava/scribejava

「いや、それでもライブラリは使わないぜ」という人は、
この記事を読み進めてください。

## ライブラリを使わない理由
私の場合ですが、ライブラリを使わないで実装してみた理由はこんな感じです。
- Twitter4jが対応していない機能がAPIにあった
- OAuthの実装を経験しておくのもいいかなと思った

実装していてつまづくのはOAuth認証の部分だと思うので、
そこに焦点をおいて解説していきます。

## 今回やったこと
今回は指定したユーザーのツイートを取得する以下のAPIを例にして説明します。
https://api.twitter.com/1.1/statuses/user_timeline.json
メソッドはGETで、パラメータは以下の二つです。
- ユーザを指定する`screen_name`
- ツイートの件数を指定する`count`

また、実装には
- Twitter Developerアカウントの取得
- Java開発環境

が必要です。

## OAuthについて
最初に少しOAuthの説明をしようと思います。
この辺を理解していて実装を早く知りたい人は読み飛ばしてください。


### OAuthの概要
さっきから頻繁に出てくるOAuthってなんだよ、って話だと思います。

OAuth自体の詳細の説明はここではしませんが、
ざっくりいうと、トークンを使った認証です。

アプリケーション（例えばあなたのプログラム）が認証されるには、
Twitterとユーザーの承認をもらってトークンを発行してもらう必要があります。
こうして取得したトークンを使って、APIが使えるようになるわけです。

トークンは自分自身のアカウントからAPIを利用する場合は
承認は不要で、自分のデベロッパーポータルから取得できます。

まだ、トークンを持っていない人は
Twitterデベロッパーポータルから
- トークン
- トークンシークレット
- コンシューマーキー
- コンシューマーシークレット

の４つを入手して先に進んでください。


ここからは無事にトークンを取得したあと、
そのトークンを使ってAPIを使用するところの話です。

概要を説明すると、
- トークンなどの情報からキーとデータを作成する
- キーとデータを使って署名を作成する
- 署名を埋め込んでHTTPリクエストを作成する
の３ステップです。

一つずつ説明します。

### キーとデータを作成
署名を作成するためには
- キー
- データ

という二つの文字列が必要です。

キーについては
- コンシューマーシークレット
- アクセストークンシークレット

の二つから作成されます。

具体的には
`URLエンコードしたコンシューマーシークレット & URLエンコードしたアクセストークンシークレット`
の文字列です。

データについては、以下のような文字列になります。
`①URLエンコードしたリクエストメソッド（今回はGET） & ②URLエンコードしたURL & ③パラメータから生成した文字列`

**①URLエンコードしたリクエストメソッド**
今回はGETを使うので、この値は`GET`になります。
GETはアルファベットなので、
URLエンコードしてもGETのままですね。

**②URLエンコードしたURL**
このURLにはGETパラメータは含めません。
今回の例では、実際にリクエストを送るURLは
https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={username}&count=10
ですが、ここに入るのはパラメータを除いた?より前の部分である
https://apitwitter.com/1.1/statuses/user_timeline.json
をURLエンコードしたものになります。

**③パラメータから生成した文字列**
ここには以下のOAuth用の情報とGETパラメータ（GETの場合）が入ります。

**OAuth用の情報**
OAuth用の情報は以下の6つです。

値|説明
--- | ---
コンシューマーキー|アプリケーションのAPIキー
アクセストークン |ユーザのアクセストークン  
署名の種類|HMAC-SHA1を指定する
タイムスタンプ|リクエスト時のUnixタイムスタンプ
nonce|ランダム文字列を指定する
OAuthバージョン|1.0を指定

**GETパラメータ**
必要なGETパラメータは以下の二つです。

値|説明
--- | ---
Count|取得したいTweetの件数を指定します。
Screen Name|@xxxのxxxを指定します。

これらのパラメータを
キー=値&キー=値&・・・
といった調子でアルファベット順にキーと値を並べていきます。
そうしてできた文字列をURLエンコードしたものが
「③パラメータから生成した文字列」です。

### キーとデータから署名を作成する
キーとデータが生成できたら、それを元に認証用の署名を作成します。
具体的にはキーとデータからHMAC -SHA1方式でハッシュ値を生成します。
詳細は後述のソースコードを見た方がわかりやすいです。

### 署名とパラメータをヘッダに埋め込んで送信
無事に署名ができたら、ヘッダに情報を埋め込みます。

必要な情報は先ほど出てきたOAuth用の情報とGETパラメータ、
そして生成した署名を含めます。

それらの値を
`OAuth キー=値,キー=値,・・・`
といった形式で並べてあげます。

これをHeaderにAuthrorizationとして埋め込みます。

以上がOAuthの概要になります。

文字だけの説明ではわかりづらいところも多いと思うので、
これから実際のソースコードを見ていきましょう。

## ソースコードの解説
一応、順を追って説明していますが、
最終的にできるコードを最後の方に掲載しているので、
結果だけ知りたい人はそこまで飛ばしてください。

### キーの作り方
キーを作るときは、以下の文字列を作成します。
`URLエンコードしたコンシューマーシークレット & URLエンコードしたアクセストークン シークレット`


ただ、後の工程でHash値を検索する際には、
`SecretKeySpec`という型でこのキーを保持していないといけません。

なので、今回はこんな関数を作ってみました。

{% codeblock App.java lang:java %}
String accessTokenSecret = "アクセストークンシークレット";
String consumerSecret = "コンシューマーシークレット";	
private static final String HMAC_SHA1 = "HmacSHA1";
// 署名生成する用のキーを生成
public SecretKeySpec generateKeySpec(String consumerSecret, String accessTokenSecret){

	// コンシューマーキーとアクセストークン シークレットを結合した文字列からキーを生成
	String keyString = urlEncode(consumerSecret) + "&" +  urlEncode(accessTokenSecret);
	return new SecretKeySpec(keyString.getBytes(), HMAC_SHA1);

}
{% endcodeblock %}
### データの作り方
データ部分を作ります。
1. OAuthのパラメータとリクエスト用のパラメータを別々に作る
2. 二つのパラメータを一つのMapにしてアルファベット順に、キー=値 &キー=値・・・の形式に並べる
3. リクエストメソッド、URL、パラメータをURLエンコードをし、「&」でつなげる。
の手順でデータを作っていきます。

それでは一つずつ解説していきます。
1. **OAuthのパラメータとリクエスト用のパラメータを別々に作る**

{% codeblock App.java lang:java %}
String consumerKey = "コンシューマーキー";	
String accessToken = "アクセストークン";

String requestUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json" ;	// エンドポイント
String requestMethod = "GET" ;

long timestamp = System.currentTimeMillis() / 1000;
private static final Random RAND = new Random();
long nonce = timestamp + RAND.nextInt();


	// リクエストパラメータ
	Map<String, String> reqParams = new HashMap<String, String>();
	reqParams.put("screen_name", "java");
	reqParams.put("count", "10");

			// データ：OAuthパラメータ
	Map<String, String> OAuthParams = new HashMap<String, String>();
	OAuthParams.put("OAuth_token", urlEncode(accessToken));
	OAuthParams.put("OAuth_consumer_key", urlEncode(consumerKey));
	OAuthParams.put("OAuth_signature_method", "HMAC-SHA1");
	OAuthParams.put("OAuth_timestamp", Long.toString(timestamp));
	OAuthParams.put("OAuth_nonce", Long.toString(nonce));
	OAuthParams.put("OAuth_version", "1.0");
{% endcodeblock %}

2. **二つのパラメータを一つのMapにしてアルファベット順、キー=値 &キー=値・・・の形式に並べる**
allParamsというMapを宣言して、
puAll関数を使って先ほど作成した二つのMapを格納します。


`convertParamsMapToParamsString`関数では
全てのパラメータが入ったMapであるallParamsを
- keyでソートする
- key=value&key=value・・・形式にする
という操作をstreamを使って実装しています。

{% codeblock App.java lang:java %}
	// データ:OAuthパラメータとリクエストパラメータを結合
	Map<String, String> allParams = new HashMap<String, String>();
	allParams.putAll(reqParams);
	allParams.putAll(OAuthParams);

	// key=val＆key=val・・・の文字列に
	String allParamsStr = convertParamsMapToParamsString(allParams);

// 署名生成時のデータ生成用
public String convertParamsMapToParamsString(Map<String, String> map){
	String result;

	// Mapをkeyでソートして key1=value1&key2=value2&・・・形式の文字列にする
	result = map.entrySet().stream()
				.sorted(Map.Entry.<String, String>comparingByKey())
				.map(entry -> entry.getKey() + "=" + entry.getValue())
				.collect(Collectors.joining("&"));
	return result;
}
{% endcodeblock %}

3. **リクエストメソッド、URL、パラメータをURLエンコードをし、「&」でつなげる**
先ほど作ったパラメータ文字列と、リクエストメソッド（今回はGET）、URLを使用して、
データ文字列を作成します。

{% codeblock App.java lang:java %}
String requestUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json" ;	// エンドポイント
String requestMethod = "GET" ;
	// 署名用データを生成
	StringBuilder OAuthDataSb = new StringBuilder();
	// リクエストメソッド + URL + パラメータ
	OAuthDataSb.append(requestMethod).append("&");
	OAuthDataSb.append(urlEncode(requestUrl)).append("&");
	OAuthDataSb.append(urlEncode(allParamsStr));

	String OAuthBase = OAuthDataSb.toString();
{% endcodeblock %}

### 署名の作り方
キーとデータが揃ったので、署名を作りましょう。
ハッシュ値の計算のために以下の関数を作りました。
計算されたハッシュ値はバイト配列で帰ってくるため、
最後にそれをBase64エンコードします。

{% codeblock App.java lang:java %}
// 署名を作成
public String generateSignature(SecretKeySpec OAuthKeySpec, String OAuthData){

	byte[] byteHMAC = null;
	try {
		Mac mac = Mac.getInstance(HMAC_SHA1);
		mac.init(OAuthKeySpec);

		// byte配列で署名を作成
		byteHMAC = mac.doFinal(OAuthData.getBytes());

	} catch (InvalidKeyException ike) {
		ike.printStackTrace();
	} catch (NoSuchAlgorithmException nsae) {
		nsae.printStackTrace();
	}

	// Base64エンコード
	String signature = Base64.getEncoder().encodeToString(byteHMAC);

	return signature;

}
{% endcodeblock %}

### Header用の文字列の作り方
署名ができたらもうひと踏ん張りです。

全パラメータが含まれるマップに署名を追加します。
そのマップを
`OAuth key=value,key=value・・・`
の形式の文字列に変換します。

今回はデータ文字列を作成したときと異なり、
カンマ区切りであることと、先頭に`OAuth `が含まれることに注意して下さい。

{% codeblock App.java lang:java %}
	// Mapに署名を追加
	allParams.put("OAuth_signature", urlEncode(signature));

	String headerString = convertParamsMapToHeaderString(allParams);

		// ヘッダに埋め込む文字列を生成
public String convertParamsMapToHeaderString(Map<String, String> map){
	String result = "OAuth ";
	result += map.entrySet().stream()
				.sorted(Map.Entry.<String, String>comparingByKey())
				.map(entry -> entry.getKey() + "=" + entry.getValue())
				.collect(Collectors.joining(","));
	return result;
}

{% endcodeblock %}

### リクエスト
これで晴れて必要な情報が全て出揃いましたので、
リクエストを飛ばしましょう。

リクエストを飛ばすのに、今回はHTTPClientを使用します。
Java11以降では標準ライブラリとして入っているのですが、
それ以前のバージョンを使用している人は適当なライブラリに読み替えてください。

{% codeblock App.java lang:java %}
try{

	// ベースURLとパラメータからURIを生成
	URI uri = new URI(createUrlString(requestUrl, reqParams));

	// リクエストを生成する
	HttpRequest request = HttpRequest.newBuilder()
	.uri(uri)
	.header("Authorization", headerString) // ヘッダにAuthorizationを設定
	.GET()
	.build();
	
	// レスポンスを取得
	HttpResponse<String> response = HttpClient.newBuilder()
	.build()
	.send(request,  HttpResponse.BodyHandlers.ofString());

	// レスポンスボディを文字列にしてreturn
	String res = response.body();

	return res;

}catch(URISyntaxException urie){
	urie.printStackTrace();
}catch(IOException ioe){
	ioe.printStackTrace();
}catch(InterruptedException ie){
	ie.printStackTrace();
}

return null;

{% endcodeblock %}
	
HTTPClientについて少し補足すると、
- HttpRequest
- HttpClient
- HttpResponse
という三つのクラスが１セットになっています。

とてもざっくりとした解説をすると
HttpRequestでリクエスト内容を定義して、
HttpClientがリクエストを送信して、
返ってきた値をHttpResponseが保持している、
みたいな感じだと思います。適当ですみません。

## ソース全文
以上をまとめるとこんな感じになります。

以下の例ではJavaの公式Twitterのツイートを取得しています。

{% codeblock App.java lang:java %}
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;


public class App {

	String consumerKey = "コンシューマーキー" ;
	String consumerSecret = "コンシューマーシークレット" ;
	String accessToken = "アクセストークン" ;
	String accessTokenSecret = "アクセストークンシークレット" ;

	String requestUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json" ;	// エンドポイント
	String requestMethod = "GET" ;

	long timestamp = System.currentTimeMillis() / 1000;
	private static final Random RAND = new Random();
	long nonce = timestamp + RAND.nextInt();

	private static final String HMAC_SHA1 = "HmacSHA1";


    public static void main(String[] args) throws Exception {
		App app = new App();
		String res = app.sendGetRequest();
        System.out.println(res);
	}


	// GETリクエストを送信する
	public String sendGetRequest(){

		// リクエストパラメータ
		Map<String, String> reqParams = new HashMap<String, String>();
		reqParams.put("screen_name", "java");
		reqParams.put("count", "10");

		// ヘッダに設定する文字列を取得
		String headerString = generateHeaderString(reqParams);

		try{

			// ベースURLとパラメータからURIを生成
			URI uri = new URI(createUrlString(requestUrl, reqParams));

			// リクエストを生成する
			HttpRequest request = HttpRequest.newBuilder()
			.uri(uri)
			.header("Authorization", headerString) // ヘッダにAuthorizationを設定
			.GET()
			.build();
			
			// レスポンスを取得
			HttpResponse<String> response = HttpClient.newBuilder()
			.build()
			.send(request,  HttpResponse.BodyHandlers.ofString());

			// レスポンスボディを文字列にしてreturn
			String res = response.body();
		
			return res;

		}catch(URISyntaxException urie){
			urie.printStackTrace();
		}catch(IOException ioe){
			ioe.printStackTrace();
		}catch(InterruptedException ie){
			ie.printStackTrace();
		}

		return null;

	}


	// HeaderのAuthorizationに設定する文字列を生成
	public String generateHeaderString(Map<String, String> reqParams){

		// 署名用キー生成
		SecretKeySpec secretKeySpec = generateKeySpec(consumerKey, accessTokenSecret);

		// データ：OAuthパラメータ
		Map<String, String> OAuthParams = new HashMap<String, String>();
		OAuthParams.put("OAuth_token", urlEncode(accessToken));
		OAuthParams.put("OAuth_consumer_key", urlEncode(consumerKey));
		OAuthParams.put("OAuth_signature_method", "HMAC-SHA1");
		OAuthParams.put("OAuth_timestamp", Long.toString(timestamp));
		OAuthParams.put("OAuth_nonce", Long.toString(nonce));
		OAuthParams.put("OAuth_version", "1.0");


		// データ:OAuthパラメータとリクエストパラメータを結合
		Map<String, String> allParams = new HashMap<String, String>();
		allParams.putAll(reqParams);
		allParams.putAll(OAuthParams);

		// key=val＆key=val・・・の文字列に
		String allParamsStr = convertParamsMapToParamsString(allParams);

		// 署名用データを生成
		StringBuilder OAuthDataSb = new StringBuilder();
		// リクエストメソッド + URL + パラメータ
		OAuthDataSb.append(requestMethod).append("&");
		OAuthDataSb.append(urlEncode(requestUrl)).append("&");
		OAuthDataSb.append(urlEncode(allParamsStr));

		String OAuthBase = OAuthDataSb.toString();


		String signature = generateSignature(secretKeySpec, OAuthBase);
		// Mapに署名を追加
		allParams.put("OAuth_signature", urlEncode(signature));

		String headerString = convertParamsMapToHeaderString(allParams);

		return headerString;

	}

	// ベースURLとパラメータからURIを生成
	public String createUrlString(String baseUrl, Map<String, String> params){
		String paramString = params.entrySet().stream()
								.map(entry -> entry.getKey() + "=" + entry.getValue())
								.collect(Collectors.joining("&"));
		return baseUrl + "?" + paramString;

	}

	// 署名生成する用のキーを生成
	public SecretKeySpec generateKeySpec(String consumerKey, String accessTokenSecret){

		// コンシューマーキーとアクセストークン シークレットを結合した文字列からキーを生成
		String keyString = urlEncode(consumerSecret) + "&" +  urlEncode(accessTokenSecret);
		return new SecretKeySpec(keyString.getBytes(), HMAC_SHA1);

	}

	// 署名を作成
	public String generateSignature(SecretKeySpec OAuthKeySpec, String OAuthData){

		byte[] byteHMAC = null;
		try {
			Mac mac = Mac.getInstance(HMAC_SHA1);
			mac.init(OAuthKeySpec);

			// byte配列で署名を作成
			byteHMAC = mac.doFinal(OAuthData.getBytes());

		} catch (InvalidKeyException ike) {
			ike.printStackTrace();
		} catch (NoSuchAlgorithmException nsae) {
			nsae.printStackTrace();
		}

		// Base64エンコード
		String signature = Base64.getEncoder().encodeToString(byteHMAC);

		return signature;

	}

	// 署名生成時のデータ生成用
	public String convertParamsMapToParamsString(Map<String, String> map){
		String result;

		// Mapをkeyでソートして key1=value1&key2=value2&・・・形式の文字列にする
		result = map.entrySet().stream()
					.sorted(Map.Entry.<String, String>comparingByKey())
					.map(entry -> entry.getKey() + "=" + entry.getValue())
					.collect(Collectors.joining("&"));
		return result;
	}

	// ヘッダに埋め込む文字列を生成
	public String convertParamsMapToHeaderString(Map<String, String> map){
		String result = "OAuth ";
		result += map.entrySet().stream()
					.sorted(Map.Entry.<String, String>comparingByKey())
					.map(entry -> entry.getKey() + "=" + entry.getValue())
					.collect(Collectors.joining(","));
		return result;
	}


	// URL エンコーディング
	public String urlEncode(String value){
		String encoded = null;
		try {
			encoded = URLEncoder.encode(value, "UTF-8");
		} catch (UnsupportedEncodingException ignore) {
		}
		StringBuilder buf = new StringBuilder(encoded.length());
		char focus;
		for (int i = 0; i < encoded.length(); i++) {
			focus = encoded.charAt(i);
			// 特殊文字をフォロー
			// *変換
			if (focus == '*') {
				buf.append("%2A");
			// +変換
			} else if (focus == '+') {
				buf.append("%20");
			// %7E ~ 変換
			} else if (focus == '%' && (i + 1) < encoded.length()
					&& encoded.charAt(i + 1) == '7' && encoded.charAt(i + 2) == 'E') {
				buf.append('~');
				i += 2;
			} else {
				buf.append(focus);
			}
		}
		return buf.toString();
	}
}

{% endcodeblock %}

### 改善したいところ
上記のコードを実際に動かすとわかるのですが、
Tweet内容がUnicodeエスケープされた状態で取得されます。

普通の文字列に直す方法があるはずなので、
今度調べて更新するかもしれません。

## まとめ
まとめると、
- ライブラリを使えるときは使おう
- OAuthはキーとデータから署名を作成してHeaderにねじ込む
って感じですね。

この記事がお役に立てれば幸いです。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめ。  

[Twitter APIをJavaで触る！Twitter4jを使ってみた](/2020/08/2020-0808-java-twitter-cli-tool/)