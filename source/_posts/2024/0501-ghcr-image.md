---
title: GitHubのコンテナレジストリにイメージをアップロードする
categories: 技術
featured_image: thumb.png
date: 2024-05-01 14:39:55
tags: ["Kubernetes", "GitHub", "GitHub Container Registry"]
---

## 背景
こんにちは。 [かりんとうマニア(@karintozuki)](https://twitter.com/karintozuki)です。  

開発していると、Dockerイメージをどこかにアップロードしたいときがありますよね。
そんなときはGitHubのコンテナレジストリ(以下、ghcrとします)が便利です。
今日はその使い方を説明します。
<!-- more -->
## GitHubのClassic Tokenを作る
ghcrはTokenでの認証を必要とします。それもClassicのTokenだけが使えるみたいです。
GitHubのアカウント設定から作ってください。

Tokenがクラシックであることと、パッケージの書き込み・読み取り権限を付与することを忘れないでください。

{% asset_img 01_token.png %}

参考：[https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)

## Dockerでログインする

Tokenを生成したらそれを控えて以下のコマンドを実行することで、Dockerにクレデンシャルを登録します。
```shell

export CR_PAT=YOUR_TOKEN // {YOUR_TOKEN}を先ほど生成したものに変えてください
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin //USERNAMEをGitHubのユーザ名に変えてください
```

これであなたのローカルのPCからghcrにイメージをプッシュすることができるはずです。

参考：[https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic)

## イメージをプッシュする

### Dockerfile内でレポジトリを指定する
もしGithub Actionなどでイメージをプッシュするならこの工程は必要ありません。
手動でイメージをプッシュする際はそのイメージがどのレポジトリのイメージなのかを指定する必要があります。

Dockerfile内に以下の行を追加してください。

```Dockerfile
LABEL org.opencontainers.image.source=レポジトリのURL
```

それではDockerイメージを作ってプッシュしてみましょう。

### イメージのビルド & プッシュ
イメージをビルドしていきます。`-t`オプションを利用してタグを以下のようにつけてください。
タグ名は`gchr.io/githubのuser名`で始めるようにしてください。イメージの名前とバージョンは自由です。

```bash
docker build --target production -t ghcr.io/username/image-name:version-name
```

私の例だと以下のようになります。

```bash
docker build --target production -t ghcr.io/karintomania/visahack_scrape:0.2
```

以下のコマンドでイメージをプッシュします。

```bash
docker push ghcr.io/username/image-name:0.2
```

そうするとGitHubのレポジトリにパッケージが追加されているはずです。

{% asset_img 02_package.png %}

## おまけ：Kubernetesからghcrのパッケージを利用する
最後にアップロードしたパッケージをk8sから使う方法も書いておきます。
以下のコマンドで生成したTokenを`ghcr-io-cred`という名前のCredentialとして登録します。名前は別に好きなもので大丈夫です。

```bash
kubectl create secret docker-registry ghcr-io-cred \
--docker-server=[ghcr.io](http://ghcr.io/) \
--docker-username=USERNAME \
--docker-password=TOKEN \
[--docker-email=](mailto:--docker-email=your-email@example.com)EMAIL

// USERNAME, TOKEN, EMAILをそれぞれGitHubのものに変更してください

```

そしてこのクレデンシャルをYamlファイルで`imagePullSecrets`として指定します。

```yaml
spec:
  containers:
  - name: my-private-container
    image: ghcr.io/USERNAME/IMAGE:VERSION
  imagePullSecrets:
  - name: ghcr-io-cred

```

### おまけのおまけ
私はminikubeを使っているので以下のアドオンを有効にする必要がありました。

```shell
minikube addons enable registry-creds
```

## まとめ
GitHubにサクッとイメージを上げられるのは嬉しいですね。
DockerHubとかのサービスもありますが、ソースとイメージを一箇所に集めたかったので、GitHubレジストリがあって助かりました。

それじゃ今日はこの辺で。

## 関連記事
こちらの記事もおすすめです。

[Minikubeにリモートのkubectlから接続する](/2024/04/2024-0411-minikube-ssh/)