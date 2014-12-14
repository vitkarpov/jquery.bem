/*
 * # Grock Solarized Side Menu
 *
 * @copyright 2014 Pascal Hertleif
 * @license MIT
 */
(function(){var e,n,t,a,l,r,i,o,c;e=Zepto||jQuery,i=function(e){var n,t,a,l,r,i,o,c,s,d,u,h,f,p;for(o={},d=0,h=e.length;h>d;d++)for(a=e[d],i=a.path.split("/"),l=i.length-1,n=o,t=u=0,f=i.length;f>u;t=++u){if(r=i[t],"file"!==(null!=(p=n[r])?p.type:void 0)&&t===l-1&&a.originalName.match(/index\.(js|coffee)/)){n[r]||(n[r]={}),n[r].path=a.path,n[r].originalName=a.originalName,n[r].originalPath=a.originalPath,n[r].name=a.name,n[r].title=r,n[r].type="file",(c=n[r]).children||(c.children={});break}t===l?(n[r]=a,n[r].type="file"):(n[r]||(n[r]={name:r,type:"folder"}),n=(s=n[r]).children||(s.children={}))}return o},c=function(e){var n,t,a,l,r,i,o;for(t=[],a={},i=0,o=e.length;o>i;i++)n=e[i],l=n.level||(n.level=1),a[l-1]?((r=a[l-1]).children||(r.children=[]),a[l-1].children.push(n)):t.push(n),a[l]=n;return t},n=function(t,a,l){var r;return r=e(a),null==t?(console.warn("No File Tree!"),r):(e.each(t,function(t,a){var i,o,c,s,d;o=e('<li class="'+a.type+'"/>'),"file"===a.type?(c=a===l.currentFile,o.append('<a class="file'+(c?" selected":"")+'" href="'+l.relativeRoot+a.path+'" title="'+(a.originalName||a.name)+'">'+(a.title||a.originalName||a.name)+"</a>")):o.append('<span class="folder">'+a.name+"</span>"),null!=a.children&&(i=e('<ol class="children"/>'),o.append(n(a.children,i,l))),s=(null!=(d=a.originalName)?d.match(/^readme\.(md|txt|rst)/i):void 0)?"prepend":"append",r[s](o)}),r)},t=function(n,a,l){return a=e(a),(null!=n?n.length:void 0)?(e.each(n,function(n,r){var i,o,c;o=e('<li class="headline"/>'),o.append('<a class="label" href="#'+r.slug+'">'+r.title+"</a>"),(null!=(c=r.children)?c.length:void 0)>0&&(i=e('<ol class="children"/>'),o.append(t(r.children,i,l))),a.append(o)}),a):a},r=function(){var n;return n=e('<aside id="side-menu">\n  <nav id="headlines">\n    <details>\n      <summary>This File</summary>\n      <ul class="tools">\n        <li class="search">\n          <input id="search-headlines" type="search" autocomplete="off" placeholder="Search"/>\n        </li>\n      </ul>\n      <ol class="tree" id="headline-tree"></ol>\n    </details>\n  </nav>\n  <nav id="files">\n    <details open>\n      <summary>Files</summary>\n      <ul class="tools">\n        <li class="search">\n          <input id="search-files" type="search" autocomplete="off" placeholder="Search"/>\n        </li>\n      </ul>\n      <ol class="tree" id="file-tree"></ol>\n    </details>\n  </nav>\n</aside>')},l=function(n,t){var a;return a=e('<button type="button" class="toggle-menu">\n  Menu\n</button>'),a.on("click",function(e){return e.preventDefault(),t.toggleClass("open")}),n.prepend(a),n},o=function(n,t){var a,l,r;return l=function(){return function(e,n){var t;return null==n&&(n=100),t&&window.clearTimeout(t),t=window.setTimeout(function(){return t=null,"function"==typeof e?e():void 0},n)}}(),a=function(n,t){return t=t.trim().toLowerCase(),n.find(".matched").removeClass("matched"),""===t?(console.log("stop searching"),void n.removeClass("searching")):(n.addClass("searching"),n.find("a").each(function(n,a){var l;l=e(a),(l.text().toLowerCase().indexOf(t)>-1||l.attr("href").toLowerCase().indexOf(t)>-1)&&(l.addClass("matched"),l.parents("li").children(".label").addClass("matched"))}))},r=null,t.on("keyup search",function(e){var t;t=e.target.value,t!==r&&(2>t&&""!==t||(r=t,l(function(){return a(n,r)})))}),t.on("keydown",function(e){return 27===e.keyCode?""===t.val().trim()?t.blur():t.val(""):void 0})},a=function(a,l){var s,d,u,h,f,p;if(!a)return e("");for(s=r(l),f=0,p=a.length;p>f;f++)if(d=a[f],d.originalPath===l.documentPath){l.currentFile=d;break}return u=i(a),n(u,s.find("#file-tree"),l),o(s.find("#file-tree"),s.find("#search-files")),l.currentFile&&(h=c(l.currentFile.toc||[]),t(h,s.find("#headline-tree"),l),o(s.find("#headline-tree"),s.find("#search-headlines"))),s},e(function(){var n,t;return t={relativeRoot:e('meta[name="groc-relative-root"]').attr("content"),githubURL:e('meta[name="groc-github-url"]').attr("content"),documentPath:e('meta[name="groc-document-path"]').attr("content"),projectPath:e('meta[name="groc-project-path"]').attr("content")},n=a(window.files,t),n.prependTo(e("body")),l(e("#meta"),n),window.listToTree=i,window.tocToTree=c})}).call(this);(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter21389509 = new Ya.Metrika({id:21389509,
                    webvisor:true,
                    clickmap:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");