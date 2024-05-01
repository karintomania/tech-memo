---
title: Minikubeにリモートのkubectlから接続する
tags:
  - Minikube
  - Kubernetes
  - SSH
categories: 技術
featured_image: thumb.png
date: 2024-04-11 07:58:58
---


## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  
Minikubeを自宅のサーバーに建てています。勉強目的なので本家k8sより構築が楽なMinikubeを使ってます。

今回はローカルで使っているPCからkubectlでサーバー上のMinikubeを管理する方法を紹介します。
<!-- more -->
Minikubeが走っているマシンにSSHを繋げられるようになっていることが前提です。

## サーバーから.kube/configを取得

サーバー上でMinikubeが問題なく動いているなら、`~/.kube/config`ファイルが設定されているはずです。
これはサーバー上のkubectlがMinikubeに接続する際の情報です。（たしか、Minikubeをインストールする際に自動的に設定されているはずです。）

ローカルのKubectlからMinikubeへの接続を設定する際に参考にするので、このファイルをローカルマシンにコピーしてきてください。

こんな中身になっていると思います。

{% codeblock .kube/config lang:yaml %}
apiVersion: v1
clusters:
    - cluster:
        certificate-authority: /home/remote-user/.minikube/ca.crt
        extensions:
            - extension:
                last-update: Wed, 10 Apr 2024 08:54:02 BST
                provider: minikube.sigs.k8s.io
                version: v1.32.0
              name: cluster_info
        server: https://192.168.49.2:8443
      name: minikube
contexts:
    - context:
        cluster: minikube
        extensions:
            - extension:
                last-update: Wed, 10 Apr 2024 08:54:02 BST
                provider: minikube.sigs.k8s.io
                version: v1.32.0
              name: context_info
        user: minikube
      name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
    - name: minikube
      user:
        client-certificate: /home/remote-user/.minikube/profiles/minikube/client.crt
        client-key: /home/remote-user/.minikube/profiles/minikube/client.key

{% endcodeblock %}

## 認証ファイルのコピー
先ほどのconfigファイルに`client.key`, `client.crt`, `ca.crt`というファイルのパスが記載されているのが分かるでしょうか。これらはkubectlがMinikubeに接続する際に認証で使うファイルです。

この３種類のファイルをサーバーからローカルにコピーしてきます。

私は`kube/minikube-remote`というフォルダに配置しました。これはローカルマシンの中のどこにあっても問題ないです。

```
~/.kube/minikube-remote
├── ca.crt
├── client.crt
└── client.key

```

## ローカルの.kube/configの編集

今度はローカルにある.kube/configに、サーバー上のMinikubeにつなぐ設定を足していきます。

リモートからコピーしてきた`.kube/config`をローカルで編集していきます。

まずは先ほどの三つの認証ファイルのパスをローカルのパスに直します。

また、cluster.serverを`https://localhost:8443`に変更します。（ポートはなんでもいいです。）

私の場合はローカルのPCにもMinikubeが入っているので、名前が被らないようにminikube-remoteと名前も変えています。

編集後のファイルはこんな感じです。

{% codeblock .kube/config lang:yaml %}
- cluster:
    certificate-authority: /Users/local-user/.kube/minikube-remote/ca.crt
    extensions:
        - extension:
            last-update: Wed, 10 Apr 2024 08:54:02 BST
            provider: minikube.sigs.k8s.io
            version: v1.32.0
          name: cluster_info
    server: https://localhost:8443
  name: minikube-remote
- context:
    cluster: minikube-remote
    extensions:
        - extension:
            last-update: Wed, 10 Apr 2024 08:54:02 BST
            provider: minikube.sigs.k8s.io
            version: v1.32.0
          name: context_info
    user: minikube-remote
  name: minikube-remote

- name: minikube-remote
  user:
    client-certificate: /Users/local-user/.kube/minikube-remote/client.crt
    client-key: /Users/local-user/.kube/minikube-remote/client.key

{% endcodeblock %}
あとはこのYamlを既存の.kube/configに足していくだけです。すでにローカルでkubectlを使っていれば、ほかのClusterの設定があると思うので、`cluster`, `context`, `name` のセクションにそれぞれコピーしていってください。

私は手動でマージしたのですが、もっといい方法があるかもです。

## SSHトンネルを開く
もう一つやることがあります。先ほど、cluster.serverを`https://localhost:8443`に変更しましたが、これはSSHでポートフォーワーディングをすることで`8443`ポートをサーバー上のMinikubeのKubernetes APIのポートに繋いでいきます。
リモートの`.kube/config`のcluster.serverを見てください。

`server: https://192.168.49.2:8443`
このアドレスはリモートサーバー内からのみアクセス可能なKubernetes APIのアドレスです。
Minikubeはこれを<サーバーのアドレス>:<ポート番号>のかたちでアクセスできるようにDockerのポートを設定しています。

リモートマシンの中で`docker ps`を実行して、Minikubeのportを見てみてください。

`127.0.0.1:32772->22/tcp, 127.0.0.1:32771->2376/tcp, 127.0.0.1:32770->5000/tcp, 127.0.0.1:32769->8443/tcp`

いくつかポートの設定がありますが、Kubernetes APIの`8443`は`32769`にマッピングされているようです。ポート開けるのに抵抗がないよって人は直接この32769ポートを開けてしまってもいいと思います。

私はローカルマシンからポートフォワーディングを使ってトンネルで繋げるようにしました。
`ssh -L 8443:localhost:32769 <リモートのアドレス>@user` 

こうすることでローカルマシンの`https://localhost:8443`がリモートマシンの`https://192.168.49.2:8443` につながりました。

## 疎通確認
以下のコマンドで接続を試してみます。

```shell
$kubectl config use-context minikube-remote // contextを入れ替える

$kubectl version // k8sのバージョンを表示させる

Client Version: v1.29.2
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.28.3
```

無事にMinikubeにつながったようです。

## まとめ
今回はサーバー上のMinikubeにローカルのKubectlからアクセスしました。
おそらくきちんとやるならローカルマシン用に別の認証ファイルを生成するのですが、とりあえず簡単に繋ぐ方法を紹介しました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。  

[英語を学びたいプログラマが知るべき一冊の本](/2023/09/2023-0926-book-programmer-should-know/)

## PR
自分のサーバーが欲しいとき、ドメインが欲しいときお名前.comで！
{% raw %}
<a href="https://px.a8.net/svt/ejp?a8mat=3BK2F7+C9RNN6+50+2HLB41" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=200810563742&wid=001&eno=01&mid=s00000000018015048000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3BK2F7+C9RNN6+50+2HLB41" alt="">
{% endraw %}
