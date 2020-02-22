---
title: VSCodeでJavaのGradleプロジェクトの依存性を更新する方法
tags:
  - Java
  - VS Code
date: 2019-11-20 23:19:08
---

Gradleを変更した際にどうしたら変更がプロジェクトに反映されるのか  
分からずハマったので、解決方法を書きます。  

build.gradleに依存性を追加した時に、そのままではプロジェクトにパッケージが追加されません。  
<!-- more -->

更新の際にはbuildd.gradleファイルを開いて、  
右クリック > Update Project Configurationを押します。   

![Update Project Configuration](update_pj.png)

そうすると、依存性が追加されているはずです。  

短いですが、以上です。  