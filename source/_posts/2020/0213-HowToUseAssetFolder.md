---
title: HexoでAssetFolderを有効にする
tags:
  - Hexo
categories: 技術
date: 2020-02-13 08:32:39
---

Hexoで写真などを使いたい時は、source/imagesフォルダを使うこともできますが、  
ページごとに管理したい時があるかと思います。  
その時にする設定です。   
<!-- more -->
## config.ymlの設定
設定としては、config.ymlのpost_asset_folderプロパティをtrueにするだけです。  

```
post_asset_folder: true
```

こうすると、次回以降 hexo new などでページを生成する際に同階層にAssetフォルダも作成されます。  
Assetフォルダ内のファイルはリンクが可能です。  
例として、sample.pngをフォルダ内に配置したら、以下のように参照できます。  
```
![サンプル画像](sample.png)
```
ちなみにこの書き方だと、トップページにアーカイブとして  
表示される時リンク切れになってしまいます。  
そこで以下のタグスクリプトを使います。  

```
{% asset_img sample.png サンプル画像 %}
```

こうすることでリンク切れの心配がありません。  


今日はこの辺で。
