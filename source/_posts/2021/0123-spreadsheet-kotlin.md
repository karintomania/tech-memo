---
title: androidアプリからGoogle API(Spreadsheet)にアクセスする
categories: 技術
featured_image: thumb.png
date: 2021-01-23 02:08:38
tags:
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

今日はだいぶニッチですが、Googleが提供しているSpreadsheetのAPIに
androidアプリからアクセスする方法を紹介します。

### Google APIにandroidアプリで使ってみる
GoogleはMapやGmailなど様々なサービスを提供していますが、
それぞれにAPIがあったりします。

今回は例としてGoogle DocumentのSpreadsheetにアクセスしますが、
もちろん他のサービスのAPIに対しても使えます。

これらのAPIをうまく使うことで
面白いアプリが作れるかもしれません。

<!-- more -->
## Google APIの設定
まずはSpreadsheetにアクセスするためのGoogle APIを用意します。

### SHA-1ハッシュの取得
APIを利用するに当たって、SHA-1ハッシュというものが必要になります。

Android Studioからterminalを開きます。
以下のコマンドでハッシュを表示します。
```
keytool -list -v \
-alias androiddebugkey -keystore ~/.android/debug.keystore
```
パスワードを聞かれますが、デフォルトのパスワードはandroidです。
表示されたSHA1を控えておいてください。

またGradleのタスクからも呼び出せます。
個人的にはこっちのが簡単です。
`./gradlew signingReport`

その場合は複数表示される中から`Variant: debug`となっているものを使ってください。

### APIの設定
Google API ConsoleからAPI用のプロジェクトを作成します。

https://developers.google.com/identity/sign-in/android/start-integrating
ここのページの真ん中くらいから青いボタンを探してください。
{% asset_img 01-configure-project.png %}

プロジェクトを新規作成します。
{% asset_img 02-NewPj.png %}

プロジェクト名を入力します。
{% asset_img 03-PJ-name.png %}

次にプロダクト名を聞かれます。
{% asset_img 04-ProductName.png %}

ここで指定した名前が
アプリ側でユーザが権限を承認するときに表示されます。
{% asset_img 04-product-name-auth.png %}

タイプはAndroidを指定します。
{% asset_img 05-android.png %}

パッケージ名とSHA1を入力します。
{% asset_img 06-setting.png %}

次にGoogleSpreadsheetにアクセスするために
もう少し設定があるので頑張りましょう。

### Spreadsheet APIの追加
以下のサイトにアクセスします。
https://console.developers.google.com/apis

先ほど作ったプロジェクトのダッシュボードを開きます。
左側のメニューからライブラリを開きます。
{% asset_img 11-dash.png %}

Spreadsheetと検索するとお目当てのAPIが出てきます。
{% asset_img 12-search.png %}

有効にするボタンを押して有効化しましょう。
{% asset_img 13-activate.png %}

これでAPI側の準備は完了です。

ここからはソースをいじっていきます。

## build.gradleで依存性の設定
appレベルのbuild.gradleに以下の依存性を追加します。

API以外にもCoroutineを追加しておきます。

{% codeblock build.gradle lang:gradle %}
dependencies {

    //spreadsheet
    implementation 'com.google.apis:google-api-services-sheets:v4-rev516-1.23.0'
    implementation 'com.google.api-client:google-api-client-android:1.23.0'
    implementation 'com.google.android.gms:play-services-auth:19.0.0'

	// coroutine
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'


}
{% endcodeblock %}

## Manifestoファイル
インターネット利用の権限を追加してください。

{% codeblock AndroidManifest.xml lang:xml %}
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bedroomcomputing.googlespreadsheettest">
	<!--中略-->
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
{% endcodeblock %}

## サインインボタンを作る
サインイン用のボタンを作ります。

他にも先を見据えて読み取り・書き込み・サインアウトボタンを作っておきます。

{% codeblock activity_main.xml lang:xml %}
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.gms.common.SignInButton
        android:id="@+id/sign_in_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="40dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_read"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Read"
        app:layout_constraintBottom_toTopOf="@+id/button_write"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/sign_in_button" />

    <Button
        android:id="@+id/button_write"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Write"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/sign_in_button" />

    <Button
        android:id="@+id/button_signout"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="SignOut"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_write" />
</androidx.constraintlayout.widget.ConstraintLayout>
{% endcodeblock %}

## Googleにサインイン
MainActivityにサインイン処理を書いていきます。
コメントを多めに入れたので、細かい処理は説明しません笑

{% codeblock MainActivity.kt lang:kotlin %}
class MainActivity : AppCompatActivity() {

    lateinit var mGoogleSignInClient: GoogleSignInClient
    lateinit var  credential: GoogleAccountCredential

    // サインイン用intentを識別するためのID。0であることに意味はない
    val RC_SIGN_IN = 0

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // サインインのオプションを設定。Emailの取得とspreadsheetのアクセスを要求する
        val gso= GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestScopes(Scope("https://www.googleapis.com/auth/spreadsheets"))
                .requestEmail()
                .build()

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)
        credential = GoogleAccountCredential.usingOAuth2(this, Collections.singleton("https://www.googleapis.com/auth/spreadsheets"))

        // もし前回起動時にサインインしていたら、サインイン不要
        val account = GoogleSignIn.getLastSignedInAccount(this)
        account?.let{
            Log.i("Main", "${account.displayName}")
            credential?.setSelectedAccount(account.account)
        }

        // サインイン
        findViewById<SignInButton>(R.id.sign_in_button).setOnClickListener{
            signIn()
        }

    }

    private fun signIn() {
        // サインイン用のインテントを呼び出す。onActivityResultに戻ってくる
        val signInIntent: Intent = mGoogleSignInClient.getSignInIntent()
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // サインイン完了時の処理
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    private fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account = completedTask.getResult(ApiException::class.java)

            Log.i("Main", "${account?.displayName}")
            credential?.setSelectedAccount(account?.account)

        } catch (e: ApiException) {
            Log.w("Main", "signInResult:failed code=" + e.statusCode)

        }
    }

}
{% endcodeblock %}

サインインボタンを押すとログイン用のダイアログが開きます。
{% asset_img 07-dialog.png %}


## 読み込み
それでは読み込み処理を作っていきます。

onCreateメソッド内でクリックリスナーを設定します。
ネットワーク通信を行うので、coroutineを使用します。

{% codeblock MainActivity.kt lang:kotlin %}
	// 読み込み。ネットワーク通信なので、coroutine内で行う。
	findViewById<Button>(R.id.button_read).setOnClickListener{
		MainScope().launch{
			withContext(Dispatchers.Default){
				read()
			}
		}
	}
{% endcodeblock %}

そしてreadメソッドを追加します。

{% codeblock MainActivity.kt lang:kotlin %}
    fun read(){
        val sheetsService = Sheets.Builder(AndroidHttp.newCompatibleTransport(), JacksonFactory.getDefaultInstance(), credential)
                // アプリケーション名を指定するのだが、適当でいいっぽい
                .setApplicationName("Test Project2")
                .build();

        // 値取得
        val response = sheetsService
                .spreadsheets().values()
                // Spreadsheet idはURLのhttps://docs.google.com/spreadsheets/d/xxxx/...のxxx部分
                .get("1XoRcqhbAkhYB8zh_k4_VTh3_V6TrJLeTz9NfW5mTY_8", "Sheet1!A1")
                .execute()

        val values = response.getValues()

        // Stringにキャストする
        val a1 =  values[0][0] as String

        Log.i("MainActivity", a1)
    }
{% endcodeblock %}

読み込めたでしょうか？

## 書き込み
書き込みも同様です。

クリックリスナーを指定します。

{% codeblock MainActivity.kt lang:kotlin %}
	// 書き込み。ネットワーク通信なので、coroutine内で行う。
	findViewById<Button>(R.id.button_write).setOnClickListener{
		MainScope().launch{
			withContext(Dispatchers.Default){
				write()
			}
		}
	}
{% endcodeblock %}


関数を追加します。

{% codeblock MainActivity.kt lang:kotlin %}
     fun write(){
        val sheetsService = Sheets.Builder(AndroidHttp.newCompatibleTransport(), JacksonFactory.getDefaultInstance(), credential)
                // アプリケーション名を指定するのだが、適当でいいっぽい
                .setApplicationName("Test Project2")
                .build();

         // 二次元配列で書き込む値を保持
        val values: List<List<Any>> = Arrays.asList(
                Arrays.asList("A","B") ,
                Arrays.asList("C","D") // Additional rows ...
        )
        val body = ValueRange().setValues(values)

         // 書き込み。
         val result: AppendValuesResponse =
                sheetsService.spreadsheets().values()
                        // appendは一番下の行に追加していってくれる
                        .append("1XoRcqhbAkhYB8zh_k4_VTh3_V6TrJLeTz9NfW5mTY_8", "Sheet1!A:B", body)
                        // RAWを指定すると値がそのまま表示される。USER_ENTEREDだと数字や日付の書式が手入力時と同じになるらしい
                        .setValueInputOption("RAW")
                        .execute()

    }
{% endcodeblock %}

うまく動くとこんな感じでボタンを押すとSpreadsheetに
データが書き込まれます。
{% asset_img write.gif %}

## サインアウト
ついでにサインアウトの機能をつけておきます。

クリックリスナー追加

{% codeblock MainActivity.kt lang:kotlin %}
	// サインアウト
	findViewById<Button>(R.id.button_signout).setOnClickListener{
		signOut()
	}
{% endcodeblock %}

関数を追加します。

{% codeblock MainActivity.kt lang:kotlin %}
    private fun signOut() {
        mGoogleSignInClient.signOut()
                .addOnCompleteListener(this) {
                }
    }
{% endcodeblock %}

これは簡単ですね。

## まとめ
今日はGoogle Spreadsheetへのアクセスを例に
Google APIにアクセスする方法を紹介しました。

GoogleAPIを利用したアプリを作成するときは参考にしてみてください。
ちなみに今回作成したプロジェクトはGitHubからダウンロードできます。
https://github.com/karintomania/GoogleSpreadsheetTest

それじゃ今日はこの辺で。

## ところで...
<u>仕事で扱っている技術がレガシーだったり、同じことの繰り返しだったりで</u>
<u>最近、成長してないと感じてませんか？</u>

転職することで、もっと成長できるかもしれません。

いますぐ転職しない人でも、とりあえずエージェントに登録しておいて
<u>案件や年収を眺めるだけでも市場の需要を知ることができ、</u>勉強になります。

ここでエンジニアに人気の転職サイトを紹介します。

**Tech Clips**
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。
首都圏限定になってはしまいますが、
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。

[▼Tech Clips 登録はこちら▼](https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81)
<a href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&wid=001&eno=01&mid=s00000017743001017000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt="">

## 関連記事
こちらの記事もおすすめです。  

[アプリ未経験エンジニアが独学で個人開発Androidアプリを公開するまでにやったこと](/2020/08/2020-0801-android-selftaught/)