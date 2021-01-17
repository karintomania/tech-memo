---
title: KotlinでTwitter4jを使ってTwitterのOauthログインを実装する
tags:
  - android
  - Twitter4j
  - Twitter API
categories: 技術
featured_image: login.gif
date: 2020-11-18 09:10:03
---

## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

Twitter4jを使ったTwitterのログイン機能をアプリに組み込む方法を紹介します。
冒頭のGIFのように、Dialogが開いて
ログイン・認証をするような挙動が実装できます。

<!-- more -->
ちなみに本記事、こちらの記事をだいぶ~~~パクリ~~~参考にしています。
https://johncodeos.com/how-to-add-twitter-login-button-to-your-android-app-using-kotlin
（ほぼ同じなのですが、この記事ではFragmentから実行しています。）

## Twitter Appの設定
Twitter Developer Portalからアプリの設定をします。
https://developer.twitter.com/en/portal/dashboard

アプリを作成していない人は作成しておいてください。
{% asset_img 00-app.png %}

作成したアプリの設定画面から
Authentication settings > 3-legged OAuth is enabledを有効にしてください
{% asset_img 01-oauth.png %}


このときcallback urlを設定します。
`callback://`を指定します。
{% asset_img 02-callbk.png %}


また、アプリのConsumer (API) Key と Consumer (API) Secretも使うので、
控えておいてください。

{% asset_img 02-key.png %}

## プロジェクトの作成
Android Studioからプロジェクトを作成します。
Basic Activityを選択してください。
{% asset_img 11-project.png %}

プロジェクト名などは適当に決めてください。
{% asset_img 12-projectname.png %}



## 依存パッケージの指定
appレベルのbuild.gradleに以下を追加します。
{% codeblock build.gradle lang:groovy %}
dependencies {
   // 中略
    implementation 'org.twitter4j:twitter4j-core:4.0.7'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.5'

}
{% endcodeblock %}

## 権限の追加
AndroidManifest.xmlに権限を追加します。
`<uses-permission android:name="android.permission.INTERNET" />`
manifestタグの中に描きます。
{% codeblock AndroidManifest.xml lang:xml %}
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bedroomcomputing.logintest">
    <application>
	<!--中略-->
    </application>
    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
{% endcodeblock %}

## ログイン画面の作成
basicプロジェクトを選択した場合、
fragment_first.xmlがあると思います。
このボタンをログインボタンにしていきます。

ボタンとTextViewのテキストだけ
それっぽいものに変えておきます。
{% codeblock fragment_first.xml lang:xml %}
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".FirstFragment">

    <TextView
        android:id="@+id/textview_first"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Twitter Login" // ここを変更
        app:layout_constraintBottom_toTopOf="@id/button_first"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_first"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Login" // ここを変更
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/textview_first" />
</androidx.constraintlayout.widget.ConstraintLayout>
{% endcodeblock %}

## 接続情報Objectクラスの作成
APIキーやCallbackURLを保持するためのObjectクラスを作成します。
`New > Kotlin File/Class`
{% asset_img 13-new.png %}

`Object`を選択します。
{% asset_img 14-object.png %}

ファイルの中身には先ほど控えたAPIキーとAPIシークレットを格納します。
{% codeblock TwitterConstants.kt lang:kotlin %}
object TwitterConstants {

    var CONSUMER_KEY = "MY_CONSUMER_KEY"
    var CONSUMER_SECRET = "MY_CONSUMER_SECRET"
    var CALLBACK_URL = "MY_CALLBACK_URL"

}
{% endcodeblock %}

## Fragmentの実装
まずはRequestTokenを取得します。
ボタンのクリックリスナーに`getRequestToken`を追加します。

{% codeblock FirstFragment.kt lang:kotlin %}
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<Button>(R.id.button_first).setOnClickListener {
            getRequestToken();
        }
    }
{% endcodeblock %}

getRequestToken()関数を実装します。
注意する点としては、Coroutineを使って、次のWebView生成の関数を呼んでいるところです。

{% codeblock FirstFragment.kt lang:kotlin %}
	lateinit var twitter: Twitter

    private fun getRequestToken(){
        viewLifecycleOwner.lifecycleScope.launch(Dispatchers.Default){

            // twitterインスタンスにConsumer keyとConsumer Secretを設定
            val builder = ConfigurationBuilder()
                .setDebugEnabled(true)
                .setOAuthConsumerKey(TwitterConstants.CONSUMER_KEY)
                .setOAuthConsumerSecret(TwitterConstants.CONSUMER_SECRET)

            val config = builder.build()
            val factory = TwitterFactory(config)

            // twitter インスタンスを生成
            twitter = factory.instance

            try{
                // リクエストトークンを取得
                val requestToken = twitter.oAuthRequestToken
                withContext(Dispatchers.Main){
                    setupTwitterWebviewDialog(requestToken.authorizationURL)
                }
            } catch (e: IllegalStateException) {
                Log.e("ERROR: ", e.toString())
            }

        }
    }

{% endcodeblock %}
次にDialogとWebViewを定義します。
{% codeblock FirstFragment.kt lang:kotlin %}
lateinit var twitterDialog: Dialog
    var accToken: AccessToken? = null

    // Dialogの設定
    private suspend fun setupTwitterWebviewDialog(url: String){
        twitterDialog = Dialog(requireContext())
        val webView = WebView(requireContext())

        webView.isVerticalScrollBarEnabled = false
        webView.isHorizontalScrollBarEnabled = false
        webView.webViewClient = TwitterWebViewClient()
        webView.settings.javaScriptEnabled = true
        webView.loadUrl(url)
        twitterDialog.setContentView(webView)
        twitterDialog.show()

    }

    // WebViewの設定
    inner class TwitterWebViewClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(
            view: WebView?,
            request: WebResourceRequest?
        ): Boolean {
            if (request?.url.toString().startsWith(TwitterConstants.CALLBACK_URL)) {
                Log.d("Authorization URL: ", request?.url.toString())
                handleUrl(request?.url.toString())

                // 認証が完了したらダイアログを閉じる
                if (request?.url.toString().contains(TwitterConstants.CALLBACK_URL)) {
                    twitterDialog.dismiss()
                }
                return true
            }
            return false
        }

{% endcodeblock %}
OAuthトークンとユーザ情報を取得してみます。

{% codeblock FirstFragment.kt lang:kotlin %}
// OAuthのトークン取得
        private fun handleUrl(url: String) {
            val uri = Uri.parse(url)
            val oauthVerifier = uri.getQueryParameter("oauth_verifier") ?: ""
            viewLifecycleOwner.lifecycleScope.launch(Dispatchers.Default) {
                val accToken = withContext(Dispatchers.IO) {
                    twitter.getOAuthAccessToken(oauthVerifier)
                }
                Log.i("token", accToken.token)
                Log.i("token secret", accToken.tokenSecret)
                getUserProfile()
            }
        }

        // ユーザ情報取得
        private suspend fun getUserProfile(){
            val usr = withContext(Dispatchers.IO){ twitter.verifyCredentials() }

            Log.i("twitter", usr.name)
            Log.i("twitter", usr.screenName)
        }
    }
{% endcodeblock %}

ここで取得できるTokenとTokenSecretを使うことで
次回からのダイアログを開いて認証する必要がなくなります。

動作としては以下の感じになります。
ボタンを押すと
{% asset_img 21-firstfragment.png %}


Dialogが開きます。
{% asset_img 22-dialog.png %}


ログインしてアプリを承認すると、トークンが取得できます。
{% asset_img 23-logresult.png %}


## まとめ
いかがでしたか。
TwitterのログインはOAuthやらなんやらでややこしいのですが、
Androidでやろうとするとなおややこしいですね。

GitHubに今回のプロジェクトを上げていますので、
興味がある方は見てみてください。
https://github.com/karintomania/twitterLoginTest

この記事がお役に立てれば幸いです。

それじゃ今日はこの辺で。

## ところで...
<u>仕事で扱っている技術がレガシーだったり、同じことの繰り返しだったりで</u>
<u>最近、成長してないと感じてませんか？</u>

転職することで、もっと成長できるかもしれません。

いますぐ転職しない人でも、とりあえずエージェントに登録しておいて
<u>案件や年収を眺めるだけでも市場の需要を知ることができ、</u>勉強になります。

ここでエンジニアに人気の転職サイトを紹介します。
### Tech Clips
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">


## 関連記事
こちらの記事もおすすめです。  

[Twitter APIをJavaで触る！Twitter4jを使ってみた](/2020/08/2020-0808-java-twitter-cli-tool/)

## PR
Android開発を学ぶならこんな本もあります。
{% raw %}
<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank"><img src="https://thumbnail.image.rakuten.co.jp/ran/img/2001/0009/784/798/160/443/20010009784798160443_1.jpg?_ex=320x320" style="border: none;"></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">基礎＆応用力をしっかり育成！Ａｎｄｒｏｉｄアプリ開発の教科書Ｋｏｔｌｉｎ対応 なんちゃって開発者にならないための実践ハンズオン  /翔泳社/齊藤新三</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="display:inline;margin-right:5px"><a href="https://rpx.a8.net/svt/ejp?a8mat=3BK2F7+C8KSFM+2HOM+BWGDT&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q0724.2bo11c45.g00q0724.2bo12179%2Fa20081060992_3BK2F7_C8KSFM_2HOM_BWGDT%3Fpc%3Dhttp%253A%252F%252Fitem.rakuten.co.jp%252Fbook%252F15930874%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fbook%252Fi%252F19638886%252F" target="_blank">楽天市場</a></div><div class="shoplinkamazon" style="display:inline;margin-right:5px"><a href="https://px.a8.net/svt/ejp?a8mat=3BK5JU+7IW90Y+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F479816044X%2F%3Ftag%3Da8-affi-307152-22" target="_blank">Amazon</a></div></div></div><div class="booklink-footer" style="clear: left"></div></div>

{% endraw %}