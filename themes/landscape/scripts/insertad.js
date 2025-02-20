/**
* Fancybox tag
*
* Syntax:
*   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
*/

const ads = [];

ads[0] = `<h2 id="PR"><a href="#PR" class="headerlink" title="PR"></a>PR</h2>
<p> あなたの会社はあなたの技術を評価してくれていますか？<br>
技術力を高めようと頑張っているのに、<br>
技術が評価されないような会社にいたらそれは良い環境なのでしょうか？<br>
エンジニアとして技術を高めたいのなら環境を選ぶことも大事です。
</p>
<p><strong>レバテックキャリア</strong><br>
エンジニアとして働いていて実務経験があるなら、<br>
求人数の充実具合からレバテックキャリアがおすすめです。<br>
<u>IT転職ではデファクト・スタンダード</u>ですね。<br>
<a target="_blank" rel="noopener" href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZRIB5">▼レバテック　キャリア 登録はこちら▼</a><br>
<a target="_blank" href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" rel="nofollow noopener"><br><img border="0" width="728" height="90" alt="" src="https://www22.a8.net/svt/bgt?aid=210117795527&amp;wid=001&amp;eno=01&amp;mid=s00000011866006030000&amp;mc=1"></a><br><a href="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" data-fancybox="gallery" data-caption="">
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3H3JXF+8PRGKY+2JK4+ZWFS1" alt=""></a>
</p>
<p><strong>Tech Clips</strong><br>
Tech Clipsは<u>年収500万以上＆自社サービスを持った会社</u>に特化した求人サイトです。<br>首都圏限定になってはしまいますが、<br>
収入を増やしたい、自社サービスを持った企業への転職をしたい人におすすめです。</p>
<p><a target="_blank" rel="noopener" href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81">▼Tech Clips 登録はこちら▼</a><br><a target="_blank" href="https://px.a8.net/svt/ejp?a8mat=3H3JXF+DE94S2+3SWM+61Z81" rel="nofollow noopener"><br><img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210117795810&amp;wid=001&amp;eno=01&amp;mid=s00000017743001017000&amp;mc=1"></a><br><a href="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" data-fancybox="gallery" data-caption=""><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3H3JXF+DE94S2+3SWM+61Z81" alt=""></a></p>
`
ads[1] = `<p><h2>PR</h2>
エンジニアならドメインのひとつやふたつ、持っておきたいですよね。<br>ドメイン取得にはお名前ドットコムがおすすめです。
<br><br>
<a href="https://px.a8.net/svt/ejp?a8mat=3BK2F7+C9RNN6+50+2HLQJL" rel="nofollow">
<img border="0" width="728" height="90" alt="" src="https://www27.a8.net/svt/bgt?aid=200810563742&wid=001&eno=01&mid=s00000000018015050000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=3BK2F7+C9RNN6+50+2HLQJL" alt="">
</p>`


hexo.extend.tag.register('adv', function(args){
    var i = args.shift();

    if (i >= ads.length || i < 0) {
        i = 0;
    }
  
    return ads[i];
  });
  
  