---
title: Zellijのアップデートでセッションが消えてしまったとき
categories: 技術
featured_image: thumb.png
date: 2024-08-02 15:17:47
tags: zellij
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
この間、zellijをアップデートしたら全てのセッションが消えてしまいました。
その復旧方法を調べたので書き留めておきます。
<!-- more -->

## 復旧手順
zellijのセッションは`~/Library/Caches/org.Zellij-Contributors.Zellij`（MacOSはここですが、Linuxなら`~/.cache/zellij/`です）にバージョンごとのファイルが作られており、その中に入っています。

私は`0.39.2`から`0.40.1`にアップデートしたので、`~/Library/Caches/org.Zellij-Contributors.Zellij`の中に二つのバージョン用のフォルダが作られています。

あとは古いバージョンのフォルダの中身を新しい方のフォルダにコピーすれば、元のバージョンのセッションが使えるようになります。新しいバージョンのフォルダにはもうファイルが作られていたのですが、コピーする前に全部消してしまって大丈夫です。

## まとめ
この記事はこちらのGitHubのイシューを参考にしました。
https://github.com/zellij-org/zellij/issues/3371

それじゃ今日はこの辺で。
