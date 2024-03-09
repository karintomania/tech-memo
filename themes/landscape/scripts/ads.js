/**
* Fancybox tag
*
* Syntax:
*   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
*/

hexo.extend.tag.register('show_ad', function(args){
  var adName = args.shift();

  return `<h1>${adName}</h1>`;
});

