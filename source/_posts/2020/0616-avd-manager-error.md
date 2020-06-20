---
title: AVD Mangerエラーを解決する
tags: android
categories: 技術
featured_image: 01_thumb.png
date: 2020-06-16 00:11:21
---


## 背景
こんにちは。[karintomania(twitter)](https://twitter.com/karintozuki)です。  

今日はandroid開発中につまづいたエラーを紹介したい。

ある日突然、このエラーが発生した。
<!-- more -->
{% asset_img avd-manager.png %}

なんぞこれ。
メッセージを見ると何かファイルを削除しろと言っているようだ。
```
AVD Manager
AVD Pixel_2_API_R is already running.
If that is not the case, delete the files at 
/User/{user名}/.android/avd/Pixel_2_API_R.avd/*.lock and try again.
```


このエラーが出てアプリが起動しない。
大変困った。

同じエラーが出た人へ。
<u>このメッセージ通りに.lock拡張子のファイルを削除しても何も解決しない！！</u>
私もめちゃめちゃ時間をかけてファイルを削除したり再起動したりしたが解決しなかった。


あなたの時間を無駄にしないために解決方法を紹介しよう。

## 解決方法
色々いじった結果、androidの設定が原因だった。
<u>USBデバッグがオフになっている</u>とこのエラーが出るらしい。
{% asset_img developer-option.png %}

開発者オプションをいじって遊んでいたら、
気づかないうちにオフにしてしまっていたらしい。
なんという時間の無駄。。。

## まとめ
ちょっと間抜けな原因で、  
ググってもすぐに解決できなかった。  

同じように困っている人が救われるといいなと思いながら。

それじゃ今日はこの辺で。


## 関連記事
こちらの記事もおすすめ。  
[Spring BootでLINE Botのサンプルを動かす 〜おうむ返しのその先へ〜](/2020/04/2020-0408-linebot/)