---
title: Twitter APIをJavaで触る！Twitter4jを使ってみた
tags:
  - Java
  - Twitter
  - Twitter API
categories: 技術
featured_image: tweet.gif
date: 2020-08-08 23:19:49
---


##  背景
こんにちは。 [karintomania(@karintozuki)](https://twitter.com/karintozuki)です。  

JavaでTwitter APIを触る方法を調べたところ、
<u>Twitter4jというライブラリが良いらしい。</u>
今回はそれを使って、ターミナルからTwitterを触るツールを作ってみたので、
少しソースを解説したいと思う。
<!-- more -->

## 環境・必要事項
- Java8以上
- MacOS

<u>Twitterデベロッパーアカウント</u>が必要。

## 使い方
### プロジェクトをダウンロード
[Githubはこちら。]( https://github.com/karintomania/twitter-cli-java)
適当なフォルダで`git clone`するなり
zipでダウンロードするなりしてほしい。

いくつか初期設定が必要です。
### Consumerキーを設定
`resource/twitter4j.properties`内の以下二つのプロパティを設定する。
これらの値はTwitterデベロッパーアカウントを作成すると取得できる。
{% codeblock twitter4j.properties lang:properties %}
// コンシューマーキーを設定
oauth.consumerKey=put-your-consumer-key
// コンシューマーシークレットを設定
oauth.consumerSecret=put-your-consumer-secret
{% endcodeblock %}


### ユーザ名を変更
ユーザ名(使用したいアカウントの@xxxxのxxxx部分)を
`Authenticator.java`の以下の箇所に入れる。
ソースベタうちでごめんなさい。

{% codeblock Authenticator.java lang:java %}
public void init(){

	// ユーザー名(@xxxのxxx)を適宜変えてください
	Auth auth = ar.getAuth("put-user-name-here");
{% endcodeblock %}


### 起動コマンド
以下コマンドをプロジェクトルートフォルダで実行すると、
ツールが起動する。
`./gradlew run --console=plain`

--console=plainオプションをつけているのは、
Gradleのメッセージがちょっとうるさいから。

起動したら以下のコマンドが使える。
最初はloginコマンドを打ってログインする必要がある。

コマンド|意味
--- | ---
login|ログインできる
tl|タイムラインを５件ずつ表示する。nを押すと次の5件を表示する
tw|ツイートです。素のままだと改行もできないので、実用的じゃない爆
help|ヘルプが申し訳程度に出る

## ソース解説
### Twitter 4jについて
このツールでは<u>Twitter4jというライブラリを使っている。</u>
公式サンプルがだいぶ参考になるので、そちらも合わせてみていただきたい。
http://twitter4j.org/ja/

### OAuthを使ったログイン処理
OAuth処理はAuthenticator.javaで行っている。
`authenticate()`メソッドを少し紹介する。

{% codeblock .java lang:java %}
// OAuth認証
	public void authenticate(){
    // The factory instance is re-useable and thread safe.
    Twitter twitter = TwitterFactory.getSingleton();
	try{
		RequestToken requestToken = twitter.getOAuthRequestToken();
		AccessToken accessToken = null;
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		while (null == accessToken) {
			System.out.println("Open the following URL and grant access to your account:");
			System.out.println(requestToken.getAuthorizationURL());
			System.out.print("Enter the PIN(if aviailable) or just hit enter.[PIN]:");
			String pin = br.readLine();
		try{
			if(pin.length() > 0){
				accessToken = twitter.getOAuthAccessToken(requestToken, pin);
			}else{
				accessToken = twitter.getOAuthAccessToken();
			}
		} catch (TwitterException te) {
			if(401 == te.getStatusCode()){
				System.out.println("Unable to get the access token.");
			}else{
				te.printStackTrace();
			}
		}
		}

		//persist to the accessToken for future reference.
		storeAccessToken(twitter.verifyCredentials().getScreenName(),accessToken);
	}catch(TwitterException te){
		te.printStackTrace();
	}catch(IOException ioe){
		ioe.printStackTrace();
	}

  }
{% endcodeblock %}

実際に動作させると、
以下の流れで成功するとトークンが取得できる。
1. 認証用のURL表示　requestToken.getAuthorizationURL()使用
2. 認証画面をブラウザで開き、コードを取得
3. コードをターミナルに入力してもらい、トークン取得 twitter.getOAuthAccessToken(requestToken, pin);

このGIFをみてもらうと分かりやすいと思う。
{% asset_img login.gif %}

トークンは取得すると、アクセストークンとアクセストークンシークレットが取得できる。
このプログラム内ではMyBatisとSQLiteを使って永続化している。興味があればDTOフォルダ内を参照して欲しい。


### タイムラインの取得
タイムラインの取得はTwitterServiceクラス内のshowTimeLine()メソッドで行っている。
{% codeblock TwitterService.java lang:java %}
// タイムライン表示
	public void showTimeLine(){
		Scanner in = new Scanner(System.in);
		String s = "";
		int page = 1;
		String commandMode = "TimeLine Mode (next:n, back:b, quit:q)>";

		// タイムライン表示
		showPagedTimeLine(page);

		do{
			System.out.print(commandMode);
			s = in.nextLine();
			switch (s){
				// タイムラインを終了
				case "q":
					break;
				//　次のページを表示
				case "n":
					showPagedTimeLine(++page);
					break;
				//　前のページを表示
				case "b":
					showPagedTimeLine((page > 1) ? --page : 0);
					break;
				default: 
					System.out.println(s + " command is not found.");
			}

		}while(!s.equals("q"));

		// Dont close the scanner.
		// It will close the scanner of App.java as well
		// in.close();
	}

	// ツイートを5件ずつ表示
	public void showPagedTimeLine(int page){

		Paging paging = new Paging(page, 5);
		try{
			// タイムライン取得
			List<Status> statuses = twitter.getHomeTimeline(paging);
			statuses.stream().forEach(status -> System.out.println(formatTweet(status)));
		}catch(TwitterException te){
			te.printStackTrace();
		}
	}

	// 表示用に整形
	public String formatTweet(Status s){
		String tweetText = s.getUser().getName() + " :\n\n" + s.getText();
		tweetText += "\n----------------------------";
		return tweetText;
	}
{% endcodeblock %}

`twitter.getHomeTimeline()`メソッドでタイムラインを取得できる。
このメソッドはページネーションに対応しているため、
このプログラム内では５件ずつ取得するようにしている。

こちらも動作イメージとしてGIFを用意した。
{% asset_img timeline.gif %}

### ツイート
ツイートには`twitter.updateStatus()`メソッドを使う。
普通に標準入力を読み込んでメソッドに文字列を渡しているだけ。
{% codeblock TwitterService.java lang:java %}
// ツイートする
	public void tweet(){

		Scanner in = new Scanner(System.in);
		String tweetMode = "Tweet Mode >";
		System.out.print(tweetMode);

		String s = in.nextLine();

		try{
			// ツイートを送信
			twitter.updateStatus(s);
		}catch(TwitterException te){
			te.printStackTrace();
		}

		System.out.println(s);

		// Dont close the scanner.
		// It will close the scanner of App.java as well
		// in.close();

	}

{% endcodeblock %}

こちらも動作イメージとしてGIFを用意した。
{% asset_img tweet.gif %}

## まとめ
Twitter周りの実装は全部Twitter4j任せで簡単にできた。
しかし、<u>利用したいAPIによっては対応していないのもあるようなので、注意が必要。</u>
例えばいいねやインプレッション数が取得できるEngagement APIには対応していないようだった。

また、CLIツールとして動作するようなものを作るのが初めてだったので、
そこに結構苦戦した。

それじゃ今日はこの辺で。

##  関連記事
こちらの記事もおすすめ。  

[Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜](/2020/04/2020-0408-linebot/)


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
