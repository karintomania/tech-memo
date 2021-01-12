---
title: VS Codeで複数バージョンのPHPに対してXdebugを利用する
tags:
  - PHP
  - Xdebug
  - VS Code
categories: 技術
featured_image: thumb.png
date: 2021-01-12 18:56:41
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

仕事でVS CodeでPHPの開発をしているのですが、
PHP5とPHP7のシステム両方の保守をしています。

普通にコーディングをする際は特に困らないのですが、
Xdebugを利用する際に設定をする必要があったので、
そのメモを残します。
<!-- more -->

## 前提
XdebugがPHP5、PHP7どちらにも適用されていることが条件です。
Xdebugが入っているかどうかはphpinfo()から確認できます。

## プロジェクトの作成
VS CodeでXdebugを使う際は、
launch.jsonという設定ファイルにデバッグ用の設定を作成する必要があります。

launch.jsonはプロジェクトごとに作られる（＝プロジェクトフォルダ内に/.vscode/launch.jsonが作成される）ので、
PHP5を使いたいプロジェクトとPHP7を使いたいプロジェクトがそれぞれ最低一個ずつある状態で
この記事を進めてください。

ちなみにプロジェクトをVS Codeで開く際は左上の`File > Open Folder`で開くこともできますが、
フォルダをドラッグ＆ドロップで開くことも可能です。

{% asset_img 00-drag-drop.png %}

## PHP Debugのインストール
Xdebugを使用するには拡張機能を入れる必要があります。
PHP Debugという拡張機能を入れてください。
https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug

似たような拡張機能がありますが、私は説明文が英語のものを入れています。

{% asset_img 00-php-debug.png %}

説明文が中国語のやつもあるのですが、私は良く分かりません。
{% asset_img 00-php-debug-china.png %}


## PHP7の設定
この記事ではPHP7をデフォルトとして設定しますが、
PHP5のほうが良く使う、という場合は、
5と7を適宜逆にして読み替えてください。

それでは、PHP7を使用したいプロジェクトをVS Codeで開いてください。
### settings.json
settings.jsonを設定します。

`Ctrl + ,`で設定を開きます。

PHPで検索して、`Edit in settings.json`をクリックして、
settings.jsonを開きます。
{% asset_img 01-php7-settings.png %}

以下の項目を末尾に追加します。
{% codeblock settings.json lang:json %}
  "php.validate.executablePath": "C:/PHP7.3/php.exe",
  "intelephense.environment.phpVersion": "7.3.12",
{% endcodeblock %}

`settings.json`
{% asset_img 02-settings-json-7.png %}

### launch.json
launch.jsonを作成します。
サイドバーのデバッグタブ（虫のアイコン）から
launch.jsonを作ることができます。
`create a launch.json file`をクリックしてlaunch.jsonを作成します。
{% asset_img 03-create-launch.png %}
その際に言語を聞かれるので、PHPを選択してください。


以下のようなlaunch.jsonファイルが生成されると思います。

{% codeblock launch.json lang:json %}
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9000
        },
    ]
}
{% endcodeblock %}

### Xdebugの確認
ここまでできたらまずはPHP7のXdebugが動作するかを確認しましょう。
サイドバーのデバッグタブから再生ボタンを押すと
VS CodeがXdebugのリッスンを始めます。
適当な場所にブレイクポイントをおいてPHPのプロジェクトにアクセスしてみてください。

## PHP5の設定
PHP5もほぼ同じようなことをしますが、若干注意が必要です。
その一つとしてXdebugで使用するポートをPHP7で使用するものと変える必要があります。

### php.iniの設定
Xdebugで使用するポートを変更します。
php.iniで<u>PHP7のXdebugのportとかぶらないように9000から変えてください</u>
私は9005にしました。
{% codeblock php.ini lang:json %}
[Xdebug]
zend_extension = "C:\PHP5.6\ext\php_Xdebug-2.5.5-5.6-vc11-nts-x86_64.dll"
Xdebug.remote_port="9005"
{% endcodeblock %}

### settings.json
PHP7の場合とほぼ同じですが、
settings.jsonを入れる際に<u>Workspaceを選びます。</u>

それでは、PHP5を使用したいプロジェクトをVS Codeで開いて
設定画面を開いてください。
{% asset_img 04-php5-settings.png %}

PHP7と同じようにPHP5のパスを指定します。
{% codeblock settings.json lang:json %}
{
  "php.validate.executablePath": "C:/PHP5.6/php.exe",
  "intelephense.environment.phpVersion": "5.6.4",
}
{% endcodeblock %}

今回はプロジェクトフォルダ内で
`プロジェクトフォルダ/.vscode/settings.json`が生成されたと思います。

### launch.json
PHP7と同様に`create a launch.json file`からlaunch.jsonを作成します。
{% asset_img 03-create-launch.png %}

その中でXdebugのポートの項目があるので、
これも9005にします。
{% codeblock launch.json lang:json %}
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9005
        },
    ]
}
{% endcodeblock %}


### Xdebugの確認
こちらも同様にPHPP5のXdebugが動作するかを確認しましょう。
うまく動作したでしょうか。


## まとめ
今回はPHPの複数バージョンでXdebugを利用する方法を紹介しました。
今回はPHPですが、他の言語でも似たような方法で
複数バージョンに対応できそうですね。

受託開発をしていると扱うシステムによって
バージョンが違うとかは良くあることなので、
この記事がお役に立てれば幸いです。

それじゃ今日はこの辺で。


## 関連記事
こちらの記事もおすすめです。  

[現役エンジニアが業務を自動化してきた手法７つ+αを紹介【Windows編】](/2020/07/2020-0712-windowsAutomation/)