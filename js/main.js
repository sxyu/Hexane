// Polyfill

Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1;
});

Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1;
});

Math.log10 || (Math.log10 = function(d) {
    return Math.log(d) /Math.log(10);
});

Math.log2 || (Math.log2 = function(d) {
    return Math.log(d) /Math.log(2);
});

Math.sign || (Math.sign = function(d) {
    if (d > 0) return 1;
    else if (d < 0) return -1;
    return 0;
});

// GET function for conveniently retrieing GET parameters

var GET = function(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
};

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */
!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){v(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},g=function(a){return a.replace(c.regex.minmaxwh,"").match(c.regex.other)};if(c.ajax=f,c.queue=d,c.unsupportedmq=g,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var h,i,j,k=a.document,l=k.documentElement,m=[],n=[],o=[],p={},q=30,r=k.getElementsByTagName("head")[0]||l,s=k.getElementsByTagName("base")[0],t=r.getElementsByTagName("link"),u=function(){var a,b=k.createElement("div"),c=k.body,d=l.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=k.createElement("body"),c.style.background="none"),l.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&l.insertBefore(c,l.firstChild),a=b.offsetWidth,f?l.removeChild(c):c.removeChild(b),l.style.fontSize=d,e&&(c.style.fontSize=e),a=j=parseFloat(a)},v=function(b){var c="clientWidth",d=l[c],e="CSS1Compat"===k.compatMode&&d||k.body[c]||d,f={},g=t[t.length-1],p=(new Date).getTime();if(b&&h&&q>p-h)return a.clearTimeout(i),i=a.setTimeout(v,q),void 0;h=p;for(var s in m)if(m.hasOwnProperty(s)){var w=m[s],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?j||u():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?j||u():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(n[w.rules]))}for(var C in o)o.hasOwnProperty(C)&&o[C]&&o[C].parentNode===r&&r.removeChild(o[C]);o.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=k.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,r.insertBefore(E,g.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(k.createTextNode(F)),o.push(E)}},w=function(a,b,d){var e=a.replace(c.regex.comments,"").replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},i=!f&&d;b.length&&(b+="/"),i&&(f=1);for(var j=0;f>j;j++){var k,l,o,p;i?(k=d,n.push(h(a))):(k=e[j].match(c.regex.findStyles)&&RegExp.$1,n.push(RegExp.$2&&h(RegExp.$2))),o=k.split(","),p=o.length;for(var q=0;p>q;q++)l=o[q],g(l)||m.push({media:l.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:n.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}v()},x=function(){if(d.length){var b=d.shift();f(b.href,function(c){w(c,b.href,b.media),p[b.href]=!0,a.setTimeout(function(){x()},0)})}},y=function(){for(var b=0;b<t.length;b++){var c=t[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!p[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(w(c.styleSheet.rawCssText,e,f),p[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!s||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}x()};y(),c.update=y,c.getEmValue=u,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);

var $ = jQuery;

var Hexane = new function(){

    // Previous answers returned to the user. Shown in the (possibly confusingly named) History section. 
    this.prevAns = [];
    
    // Command history. This needs to be integrated into the GUI.
    this.history = [];

    // Built-in functions. Later we should support user-defined functions.
    this.funcs = {
        // Function for getting and setting sig figs from the front end
        sf: function(a, b) {
            if (b === undefined){
                if (a.constructor == SigNum){
                    return a.sf;
                }
                else return Infinity;
            }
            else if (a.constructor == SigNum){
                return new SigNum(a.value, b); 
            }
            else if (typeof(a) == "number"){
                return new SigNum(a, b); 
            }
            else return NaN;
        },
        
        pow: function(a, b) { return SigNum.pow(a, b); },
        max: function(a, b) { return SigNum.max(a, b); },
        min: function(a, b) { return SigNum.min(a, b); },
        abs: function(a, b) { return SigNum.abs(a, b); },
        log: function(a, b) { if (b === undefined) return SigNum.log10(a); else return SigNum.log2(a) / SigNum.log2(b); },
        // ln: function(a) { return a.ln(); },
        sqrt: function(a) { return SigNum.sqrt(a); },
        cbrt: function(a) { return SigNum.cbrt(a); },
        floor: function(a) { return SigNum.floor(a); },
        ceil: function(a) { return SigNum.ceil(a); },
        trunc: function(a) { return SigNum.trunc(a); },
        round: function(a) { return SigNum.round(a); },
        sin: function(a) { return SigNum.sin(a); },
        cos: function(a) { return SigNum.cos(a); },
        tan: function(a) { return SigNum.tan(a); },
        sinh: function(a) { return SigNum.sinh(a); },
        cosh: function(a) { return SigNum.cosh(a); },
        tanh: function(a) { return SigNum.tanh(a); },
        asin: function(a) { return SigNum.asin(a); },
        acos: function(a) { return SigNum.acos(a); },
        atan: function(a) { return SigNum.atan(a); },
        asinh: function(a) { return SigNum.asinh(a); },
        acosh: function(a) { return SigNum.acosh(a); },
        atanh: function(a) { return SigNum.atanh(a); },
        sign: function(a) { return SigNum.sign(a); },
        
        //chem stuff
        ka: function(a) { return Hexane.funcs.Ka(a); },
        Ka: function(a) { return Hexane.data.ka[a.toString().replace('_', '').replace('{', '').replace('}', '')]; },
        pka: function(a) { return Hexane.funcs.pKa(a); },
        pKa: function(a) { return -SigNum.log10(Hexane.data.ka[a.toString().replace('_', '').replace('{', '').replace('}', '')]); },
		kb: function(a) { return Hexane.funcs.Kb(b); },
        Kb: function(b) { return Hexane.data.kb[b.toString().replace('_', '').replace('{', '').replace('}', '')]; },
        pkb: function(b) { return Hexane.funcs.pKb(b); },
        pKb: function(b) { return -SigNum.log10(Hexane.data.kb[b.toString().replace('_', '').replace('{', '').replace('}', '')]); },
		
        ksp: function(formula) { return Hexane.funcs.Ksp(formula); },
        Ksp: function(formula) { return Hexane.data.ksp[formula.toString().replace('_', '').replace('{', '').replace('}', '')]; },
		
		isacid: function(a) {
			var ka = Hexane.data.ka[a.toString()];
			var kb = Hexane.data.kb[a.toString()];
			return (kb == null && ka != null) || ka > kb;
		},
        
        elemmass: function(ele) { return Hexane.data.mass[ele.toString()]; },
        molmass: function(formula) {
            var tokens = Hexane.tokenizeChemFormula(formula);
            var mass = new SigNum(0, Infinity);

            for (var i=0; i<tokens.length; ++i){
                var t = tokens[i];
                if (t.type == 'element'){
                    mass = mass.plus(Hexane.data.mass[t.name].times(new SigNum(t.count)));  
                }
                else if (t.type == 'polyatomic'){
                    mass = mass.plus(Hexane.funcs.molmass(t.name).times(new SigNum(t.count)));
                }
            }

            return mass;
        },	
		
		charge: function(formula){
			formula = formula.replace('_', '').replace('{', '').replace('}', '');
			var idx = Hexane.data.symbols.indexOf(formula);
			var ret;
			
			if (idx >= 0){
				ret = Hexane.data.charges[idx];
			}
			else{
				ret = Hexane.data.polycharges[formula];
			}
			
			if (ret == null || ret == undefined) return null;
				
			if (ret.length == 1) ret = ret[0];
			return ret;
		},
		
		soluble: function(formula){
			formula = formula.replace('\\left', '').replace('\\right', '').replace('_', '').replace('{', '').replace('}', '');
			var tokens = Hexane.tokenizeChemFormula(formula);
			
			if (tokens.length < 2) return 'unknown';
			
			var n1 = tokens[0].name;
			var n2 = tokens[1].name;
			
			var ct1 = tokens[0].count;
			var ct2 = tokens[1].count;
			
			if (tokens.length > 2) {
				// Compounds with single polyatomic ions like CaOH and NH4OH ( a bit messy :( )
				n1 = ''; n2 = '';
				var l = 0;
				
				if (formula[0] == '('){
					l = formula.indexOf(')') + 1;
					n1 = formula.substring(1, l-1)
				}
				else{
					for (var p in Hexane.data.polycharges){
						if (formula.length >= p.length && formula.substring(0, p.length) == p){
							n1 = p;
							l = p.length;
							break;
						}
					}
					
					if (n1 == '') {
						n1 = formula[0];
						++l;
						while (formula[l] >= 'a' && formula[l] <= 'z'){
							n1 += formula[l];
							++l;
						}
					}
				}
				
				ct1 = null;
				while (formula[l] >= '0' && formula[l] <= '9'){
					if (ct1 == null) ct1 = 0;
					ct1 = ct1 * 10 + Number(formula[l]);
					++l;
				}
				if (ct1 == null) ct1 = 1;		
					
				formula = formula.substring(l);
				l = 0;
				
				if (formula[0] == '('){
					l = formula.indexOf(')') + 1;
					n2 = formula.substring(1, l-1)
				}
				else{
					for (var p in Hexane.data.polycharges){
						if (formula.length >= p.length && formula.substring(0, p.length) == p){
							n2 = p;
							l = p.length;
							break;
						}
					}
					
					if (n2 == '') {
						n2 = formula[0];
						++l;
						while (formula[l] >= 'a' && formula[l] <= 'z'){
							n2 += formula[l];
							++l;
						}
					}
				}
				
				ct2 = null;
				while (formula[l] >= '0' && formula[l] <= '9'){
					if (ct2 == null) ct2 = 0;
					ct2 = ct2 * 10 + number(formula[l]);
					++l;
				}
				if (ct2 == null) ct2 = 1;						
			}
			// console.log([n1,n2,ct1,ct2].join());
			
			var p1 = Hexane.funcs.charge(n1);
			var p2 = Hexane.funcs.charge(n2);
			
			if (p1.constructor != Array) p1 = [p1];
			if (p2.constructor != Array) p2 = [p2];

			if (p1.length == 0 || p2.length == 0 || (p1.length > 1 && p2.length > 1)) return 'unknown';
			
			var c1 = p1[0] + 0;
			var c2 = p2[0] + 0;
			
			if (p1.length > 1 && p2.length == 1){ // multivalent metals
				c1 = -c2 * ct2 / ct1;
			}
			
			else if (p1.length == 1 && p2.length > 1){
				c2 = -c1 * ct1 / ct2;
			}
			
			if (c1 % 1 > 1E-256 || c2 % 1 > 1E-256) return 'unknown'; // found non-integral charge value, stop program
			
			// rules
			if (['Li', 'Na', 'K', 'Rb', 'Cs', 'Fr', 'H', 'NH4'].indexOf(n1) != -1 || ['NO3', 'ClO3', 'ClO4'].indexOf(n2) != -1) return true;
			else if (['Cl', 'Br', 'I'].indexOf(n2) != -1){
				if (n1 == 'Ag' || (n1 == 'Pb' && c1 == 2) || (n1 == 'Cu' && c1 == 1)) return false;
				else return true;
			}
			
			else if (n2 == 'SO4'){
				if (['Ag', 'Ca', 'Sr', 'Ba'].indexOf(n1) != -1 || (n1 == 'Pb' && c1 == 2)) return false;
				else return true;
			}
			
			else if (n2 == 'S'){
				if (['Be', 'Mg', 'Ca', 'Sr', 'Ba'].indexOf(n1) != -1) return true;
				else return false;
			}
			
			else if (n2 == 'OH'){
				if (n1 == 'Sr') return true;
				else return false;
			}
			
			else if (['PO4', 'CO3', 'SO3', 'Cr2O7'].indexOf(n2) != -1){
				return false;
			}
			
			return 'unknown';
		},
		
		balance: function(equation){
			return Hexane.Balance.balance(equation.toString());
		},
        
        random: function(a,b) { if (b === undefined){
                                    if (a === undefined)	return SigNum.random();
                                    else return SigNum.random() * a;
                                }
                                else return SigNum.random() * (b-a) + a; },
                                
        qdtc: function(a,b,c) {
                            if (a.constructor != SigNum) a = new SigNum(a);
                            if (b.constructor != SigNum) b = new SigNum(b);
                            if (c.constructor != SigNum) c = new SigNum(c);

                            if (b.times(b)-a.times(c).times(4) > 0) return [new SigNum((b.times(-1).plus(SigNum.sqrt(b.times(b)-a.times(c).times(4))))/(a.times(2)), Math.min(Math.min(a.sf, b.sf),c.sf)), new SigNum((b.times(-1).minus(SigNum.sqrt(b.times(b)-a.times(c).times(4))))/(a.times(2)), Math.min(Math.min(a.sf, b.sf),c.sf))]; 

                            else if (b.times(b)-a.times(c).times(4).value == 0) return new SigNum ((b.times(-1).plus(SigNum.sqrt(b.times(b)-a.times(c).times(4))))/(a.times(2)), Math.min(Math.min(a.sf, b.sf),c.sf));

                            else return undefined;
                        },
                               
        qdtcp: function(a,b,c) {
                            if (a.constructor != SigNum) a = new SigNum(a);
                            if (b.constructor != SigNum) b = new SigNum(b);
                            if (c.constructor != SigNum) c = new SigNum(c);

                            return new SigNum ((b.times(-1).plus(SigNum.sqrt(b.times(b)-a.times(c).times(4))))/(a.times(2)), Math.min(Math.min(a.sf, b.sf),c.sf));
                     },

        qdtcn: function(a,b,c) {
                            if (a.constructor != SigNum) a = new SigNum(a);
                            if (b.constructor != SigNum) b = new SigNum(b);
                            if (c.constructor != SigNum) c = new SigNum(c);

                            return new SigNum ((b.times(-1).minus(SigNum.sqrt(b.times(b)-a.times(c).times(4))))/(a.times(2)), Math.min(Math.min(a.sf, b.sf),c.sf));
                        },
                                
        // calculate acid [H3O+] or base [OH-] from Ka/Kb (a) and molarity (b)
        qdtcacid: function(a,b){
                            if (a.constructor != SigNum) a = new SigNum(a);
                            if (b.constructor != SigNum) b = new SigNum(b);
                            if (c.constructor != SigNum) c = new SigNum(c);

                            return qdtcp(1, a, a.times(b).times(-1)); 
                         }
    }
    
    this.vars = { 
        'A' : new SigNum(6.022140857e23, 10),
        'Kw' : new SigNum(1e-14, 4)
    }
    
    this.data = new function(){
		this.symbols = [
			'H',
			'He',
			'Li',
			'Be',
			'B',
			'C',
			'N',
			'O',
			'F',
			'Ne',
			'Na',
			'Mg',
			'Al',
			'Si',
			'P',
			'S',
			'Cl',
			'Ar',
			'K',
			'Ca',
			'Sc',
			'Ti',
			'V',
			'Cr',
			'Mn',
			'Fe',
			'Co',
			'Ni',
			'Cu',
			'Zn',
			'Ga',
			'Ge',
			'As',
			'Se',
			'Br',
			'Kr',
			'Rb',
			'Sr',
			'Y',
			'Zr',
			'Nb',
			'Mo',
			'Tc',
			'Ru',
			'Rh',
			'Pd',
			'Ag',
			'Cd',
			'In',
			'Sn',
			'Sb',
			'Te',
			'I',
			'Xe',
			'Cs',
			'Ba',
			'La',
			'Ce',
			'Pr',
			'Nd',
			'Pm',
			'Sm',
			'Eu',
			'Gd',
			'Tb',
			'Dy',
			'Ho',
			'Er',
			'Tm',
			'Yb',
			'Lu',
			'Hf',
			'Ta',
			'W',
			'Re',
			'Os',
			'Ir',
			'Pt',
			'Au',
			'Hg',
			'Tl',
			'Pb',
			'Bi',
			'Po',
			'At',
			'Rn',
			'Fr',
			'Ra',
			'Ac',
			'Th',
			'Pa',
			'U',
			'Np',
			'Pu',
			'Am',
			'Cm',
			'Bk',
			'Cf',
			'Es',
			'Fm',
			'Md',
			'No',
			'Lr',
			'Rf',
			'Db',
			'Sg',
			'Bh',
			'Hs',
			'Mt',
			'Ds',
			'Rg',
			'Cn',
			'Uut',
			'Fl',
			'Uup',
			'Lv',
			'Uus',
			'Uuo',
		]
		
        this.ka = {
            'HClO4': new SigNum(Infinity), 
            'HI': new SigNum(Infinity), 
            'HBr': new SigNum(Infinity), 
            'HCl': new SigNum(Infinity), 
            'HNO3': new SigNum(Infinity), 
            'H2SO4': new SigNum(Infinity), 
            'H3O': new SigNum(1.0, 2), 
            'HIO3': new SigNum(1.7e-1, 2), 
            'H2C2O4': new SigNum(5.9e-2, 2), 
            'H2SO3': new SigNum(1.5e-2, 2), 
            'HSO4': new SigNum(1.2e-2, 2), 
            'H3PO4': new SigNum(7.5e-3, 2), 
            'Fe(H2O)6': new SigNum(6.0e-3, 2), 
            'H3C6H5O7': new SigNum(7.1e-4, 2), 
            'HNO2': new SigNum(4.6e-4, 2), 
            'HF': new SigNum(3.5e-4, 2), 
            'HCOOH': new SigNum(1.8e-4, 2), 
            'Cr(H2O)6': new SigNum(1.5e-4, 2), 
            'C6H5COOH': new SigNum(6.5e-5, 2), 
            'HC2O4': new SigNum(6.4e-5, 2), 
            'CH3COOH': new SigNum(1.8e-5, 2), 
            'H2C6H5O7': new SigNum(1.7e-5, 2), 
            'Al(H2O)6': new SigNum(1.4e-5, 2), 
            'H2CO3': new SigNum(4.3e-7, 2), 
            'HC6H5O7': new SigNum(4.1e-7, 2), 
            'HSO3': new SigNum(1.0e-7, 2), 
            'H2S': new SigNum(9.1e-8, 2), 
            'H2PO4': new SigNum(6.2e-8, 2), 
            'H3BO3': new SigNum(7.3e-10, 2), 
            'NH4': new SigNum(5.6e-10, 2), 
            'HCN': new SigNum(4.9e-10, 2), 
            'C6H5OH': new SigNum(1.3e-10, 2), 
            'HCO3': new SigNum(5.6e-11, 2), 
            'H2O2': new SigNum(2.4e-12, 2), 
            'HPO4': new SigNum(2.2e-13, 2), 
            'H2O': new SigNum(1.0e-14, 2), 
            'OH': new SigNum(0), 
            'NH3': new SigNum(0),
        };
        
        this.kb = {
            'NH2-': new SigNum(Infinity), 
            'O': new SigNum(Infinity), 
            'OH': new SigNum(1.0, 2), 
            'PO4': new SigNum(4.5e-2, 2), 
            'HO2': new SigNum(4.2e-3, 2), 
            'CO3': new SigNum(1.8e-4, 2), 
            'C6H5O': new SigNum(7.7e-5, 2), 
            'CN': new SigNum(2.0e-5, 2), 
            'NH3': new SigNum(1.8e-5, 2), 
            'H2BO3': new SigNum(1.4e-5, 2), 
            'HPO4': new SigNum(1.6e-7, 2), 
            'HS': new SigNum(1.1e-7, 2), 
            'SO3': new SigNum(1.0e-7, 2), 
            'C6H5O7': new SigNum(2.4e-8, 2), 
            'HCO3': new SigNum(2.3e-8, 2), 
            'Al(H2O)5(OH)': new SigNum(7.1e-10, 2), 
            'HC6H5O7': new SigNum(5.9e-10, 2), 
            'CH3COO': new SigNum(5.6e-10, 2), 
            'C2O4': new SigNum(1.6e-10, 2), 
            'C6H5COO': new SigNum(1.5e-10, 2), 
            'Cr(H2O)5(OH)': new SigNum(6.7e-11, 2), 
            'HCOO': new SigNum(5.6e-11, 2), 
            'F': new SigNum(2.9e-11, 2), 
            'NO2': new SigNum(2.2e-11, 2), 
            'H2C6H5O7': new SigNum(1.4e-11, 2), 
            'Fe(H2O)5(OH)': new SigNum(1.7e-12, 2), 
            'H2PO4': new SigNum(1.3e-12, 2), 
            'SO4': new SigNum(8.3e-13, 2), 
            'HSO3': new SigNum(6.7e-13, 2), 
            'HC2O4': new SigNum(1.7e-13, 2), 
            'IO3': new SigNum(5.9e-14, 2), 
            'H2O': new SigNum(1.0e-14, 2), 
            'HClO4': new SigNum(0), 
            'HI': new SigNum(0), 
            'HBr': new SigNum(0), 
            'HCl': new SigNum(0), 
            'HNO3': new SigNum(0), 
            'H2SO4': new SigNum(0),
            'HSO4': new SigNum(0),
        };
		
		this.ksp = {
			'BaCO3': new SigNum(2.6e-9, 2),
			'BaCrO4': new SigNum(1.2e-10, 2),
			'BaSO4': new SigNum(1.1e-10, 2),
			'CaCO3': new SigNum(5.0e-9, 2),
			'CaC2O4': new SigNum(2.3e-9, 2),
			'CaSO4': new SigNum(7.1e-5, 2),
			'CuI': new SigNum(1.3e-12, 2),
			'Cu(IO3)2': new SigNum(6.9e-8, 2),
			'CuS': new SigNum(6.0e-37, 2),
			'Fe(OH)2': new SigNum(4.9e-17, 2),
			'FeS': new SigNum(6.0e-19, 2),
			'Fe(OH)3': new SigNum(2.6e-39, 2),
			'PbBr2': new SigNum(6.6e-6, 2),
			'PbCl2': new SigNum(1.2e-5, 2),
			'Pb(IO3)2': new SigNum(3.7e-13, 2),
			'PbI2': new SigNum(8.5e-9, 2),
			'PbSO4': new SigNum(1.8e-8, 2),
			'MgCO3': new SigNum(6.8e-6, 2),
			'Mg(OH)2': new SigNum(5.6e-12, 2),
			'AgBrO3': new SigNum(5.3e-5, 2),
			'AgBr': new SigNum(5.4e-13, 2),
			'Ag2CO3': new SigNum(8.5e-12, 2),
			'AgCl': new SigNum(1.8e-10, 2),
			'Ag2CrO4': new SigNum(1.1e-12, 2),
			'AgIO3': new SigNum(3.2e-8, 2),
			'AgI': new SigNum(8.5e-17, 2),
			'SrCO3': new SigNum(5.6e-10, 2),
			'SrF2': new SigNum(4.3e-9, 2),
			'SrSO4': new SigNum(3.4e-7, 2),
			'ZnS': new SigNum(2.0e-25, 2),
		};
        
        this.mass = {
            'H': new SigNum("1.008"), 
            'He': new SigNum("4.00"), 
            'Li': new SigNum("6.94"), 
            'Be': new SigNum("9.01"), 
            'B': new SigNum("10.8"), 
            'C': new SigNum("12.01"), 
            'N': new SigNum("14.01"), 
            'O': new SigNum("16.00"), 
            'F': new SigNum("19.0"), 
            'Ne': new SigNum("20.2"), 
            'Na': new SigNum("23.0"), 
            'Mg': new SigNum("24.3"), 
            'Al': new SigNum("27.0"), 
            'Si': new SigNum("28.1"), 
            'P': new SigNum("31.0"), 
            'S': new SigNum("32.1"), 
            'Cl': new SigNum("35.5"), 
            'Ar': new SigNum("39.9"), 
            'K': new SigNum("39.1"), 
            'Ca': new SigNum("40.1"), 
            'Sc': new SigNum("45.0"), 
            'Ti': new SigNum("47.9"), 
            'V': new SigNum("50.9"), 
            'Cr': new SigNum("52.0"), 
            'Mn': new SigNum("54.9"), 
            'Fe': new SigNum("55.8"), 
            'Co': new SigNum("58.9"), 
            'Ni': new SigNum("58.7"), 
            'Cu': new SigNum("63.5"), 
            'Zn': new SigNum("65.4"), 
            'Ga': new SigNum("69.7"), 
            'Ge': new SigNum("72.6"), 
            'As': new SigNum("74.9"), 
            'Se': new SigNum("79.0"), 
            'Br': new SigNum("79.9"), 
            'Kr': new SigNum("83.8"), 
            'Rb': new SigNum("85.5"), 
            'Sr': new SigNum("87.6"), 
            'Y': new SigNum("88.9"), 
            'Zr': new SigNum("91.2"), 
            'Nb': new SigNum("92.9"), 
            'Mo': new SigNum("95.9"), 
            'Tc': new SigNum("99"), 
            'Ru': new SigNum("101.1"), 
            'Rh': new SigNum("102.9"), 
            'Pd': new SigNum("106.4"), 
            'Ag': new SigNum("107.9"), 
            'Cd': new SigNum("112.4"), 
            'In': new SigNum("114.8"), 
            'Sn': new SigNum("118.7"), 
            'Sb': new SigNum("121.8"), 
            'Te': new SigNum("127.6"), 
            'I': new SigNum("126.9"), 
            'Xe': new SigNum("131.3"), 
            'Cs': new SigNum("132.9"), 
            'Ba': new SigNum("137.3"), 
            'La': new SigNum("138.9"), 
            'Ce': new SigNum("140.1"), 
            'Pr': new SigNum("140.9"), 
            'Nd': new SigNum("144.2"), 
            'Pm': new SigNum("147"), 
            'Sm': new SigNum("150.4"), 
            'Eu': new SigNum("152.0"), 
            'Gd': new SigNum("157.3"), 
            'Tb': new SigNum("158.9"), 
            'Dy': new SigNum("162.5"), 
            'Ho': new SigNum("164.9"), 
            'Er': new SigNum("167.3"), 
            'Tm': new SigNum("168.9"), 
            'Yb': new SigNum("173.0"), 
            'Lu': new SigNum("175.0"), 
            'Hf': new SigNum("178.5"), 
            'Ta': new SigNum("180.9"), 
            'W': new SigNum("183.9"), 
            'Re': new SigNum("186.2"), 
            'Os': new SigNum("190.2"), 
            'Ir': new SigNum("192.2"), 
            'Pt': new SigNum("195.1"), 
            'Au': new SigNum("197.0"), 
            'Hg': new SigNum("200.6"), 
            'Tl': new SigNum("204.4"), 
            'Pb': new SigNum("207.2"), 
            'Bi': new SigNum("209.0"), 
            'Po': new SigNum("209"), 
            'At': new SigNum("210"), 
            'Rn': new SigNum("222"), 
            'Fr': new SigNum("223"), 
            'Ra': new SigNum("226"), 
            'Ac': new SigNum("227"), 
            'Th': new SigNum("232.0"), 
            'Pa': new SigNum("231"), 
            'U': new SigNum("238.0"), 
            'Np': new SigNum("237"), 
            'Pu': new SigNum("242"), 
            'Am': new SigNum("243"), 
            'Cm': new SigNum("247"), 
            'Bk': new SigNum("245"), 
            'Cf': new SigNum("251"), 
            'Es': new SigNum("254"), 
            'Fm': new SigNum("253"), 
            'Md': new SigNum("254"), 
            'No': new SigNum("254"), 
            'Lr': new SigNum("257"), 
            'Lw': new SigNum("257"), 
            'Rf': new SigNum("261"), 
            'Db': new SigNum("262"), 
            'Sg': new SigNum("266"), 
            'Bh': new SigNum("264"), 
            'Hs': new SigNum("269"), 
            'Mt': new SigNum("268"), 
            'Ds': new SigNum("269"), 
            'Rg': new SigNum("272"), 
            'Cn': new SigNum("277"), 
            'Uut': new SigNum(NaN), 
            'Fl': new SigNum("289"), 
            'Uup': new SigNum(NaN), 
            'Lv': new SigNum("298"), 
            'Uus': new SigNum(NaN), 
            'Uuo': new SigNum(NaN),
        };
		
		this.charges = [
			[new SigNum(1)], 
			[new SigNum(0)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(-3), new SigNum(3)], 
			[new SigNum(4)], 
			[new SigNum(-3)], 
			[new SigNum(-2)], 
			[new SigNum(-1)], 
			[new SigNum(0)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(4), new SigNum(-4)], 
			[new SigNum(5), new SigNum(3), new SigNum(-3)], 
			[new SigNum(-2), new SigNum(2), new SigNum(4), new SigNum(6)], 
			[new SigNum(-1)], 
			[new SigNum(0)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(4), new SigNum(3)], 
			[new SigNum(2), new SigNum(3), new SigNum(4), new SigNum(5)], 
			[new SigNum(2), new SigNum(3), new SigNum(6)], 
			[new SigNum(2), new SigNum(4), new SigNum(7)], 
			[new SigNum(2), new SigNum(3)], 
			[new SigNum(2), new SigNum(3)], 
			[new SigNum(2)], 
			[new SigNum(1), new SigNum(2)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(-4), new SigNum(2), new SigNum(4)], 
			[new SigNum(-3), new SigNum(3), new SigNum(5)], 
			[new SigNum(-2), new SigNum(4), new SigNum(6)], 
			[new SigNum(-1), new SigNum(1), new SigNum(5)], 
			[new SigNum(0)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(4)], 
			[new SigNum(3), new SigNum(5)], 
			[new SigNum(3), new SigNum(6)], 
			[new SigNum(6)], 
			[new SigNum(3), new SigNum(4), new SigNum(8)], 
			[new SigNum(4)], 
			[new SigNum(2), new SigNum(4)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(2), new SigNum(4)], 
			[new SigNum(-3), new SigNum(3), new SigNum(5)], 
			[new SigNum(-2), new SigNum(4), new SigNum(6)], 
			[new SigNum(-1)], 
			[new SigNum(0)], 
			[new SigNum(1)], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(3), new SigNum(4)], 
			[new SigNum(3)], 
			[new SigNum(3), new SigNum(4)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3), new SigNum(4)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(3)], 
			[new SigNum(4)], 
			[new SigNum(5)], 
			[new SigNum(6)], 
			[new SigNum(2), new SigNum(4), new SigNum(6), new SigNum(7)], 
			[new SigNum(3), new SigNum(4), new SigNum(6), new SigNum(8)], 
			[new SigNum(3), new SigNum(4), new SigNum(6)], 
			[new SigNum(2), new SigNum(4), new SigNum(6)], 
			[new SigNum(1), new SigNum(2), new SigNum(3)], 
			[new SigNum(1), new SigNum(2)], 
			[new SigNum(1), new SigNum(3)], 
			[new SigNum(2), new SigNum(4)], 
			[new SigNum(3)], 
			[new SigNum(2), new SigNum(4)], 
			[], 
			[new SigNum(0)], 
			[], 
			[new SigNum(2)], 
			[new SigNum(3)], 
			[new SigNum(4)], 
			[new SigNum(5)], 
			[new SigNum(3), new SigNum(4), new SigNum(6)], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[], 
			[]
		];

		this.polycharges = { 
			'NH4': new SigNum(1), 
			'H3O': new SigNum(1), 
			'C2H3O2': new SigNum(-1), 
			'CH3COOH': new SigNum(-1), 
			'HCO3': new SigNum(-1), 
			'HSO4': new SigNum(-1), 
			'ClO': new SigNum(-1), 
			'ClO3': new SigNum(-1), 
			'ClO2': new SigNum(-1), 
			'OCN': new SigNum(-1), 
			'CN': new SigNum(-1), 
			'H2PO4': new SigNum(-1), 
			'OH': new SigNum(-1), 
			'NO3': new SigNum(-1), 
			'NO2': new SigNum(-1), 
			'ClO4': new SigNum(-1), 
			'MnO4': new SigNum(-1), 
			'SCN': new SigNum(-1), 
			'BrO3': new SigNum(-1),
			'IO3': new SigNum(-1),
			'CO3': new SigNum(-2), 
			'CrO4': new SigNum(-2), 
			'Cr2O7': new SigNum(-2), 
			'C2O4': new SigNum(-2), 
			'HPO4': new SigNum(-2), 
			'O2': new SigNum(-2), 
			'SO4': new SigNum(-2), 
			'SO3': new SigNum(-2), 
			'S2O3': new SigNum(-2), 
			'BO3': new SigNum(-3), 
			'PO4': new SigNum(-3), 
			'PO3': new SigNum(-3),
		};
	};
};

$(document).ready(function() {
	
	// remove objects from global namespace
    var $ = jQuery;
	jQuery.noConflict();
	
	// get MQ interface
    var MQ = MathQuill.getInterface(2);
	
	var varsLoaded = false;
	
    if (Modernizr.touch) {
        // Disable keyboard by adding readonly attribute to field
        $('#editor textarea').attr('readonly', 'readonly');    
    }
	
	Hexane.DefaultParser = Hexane.Eval;
	Hexane.eval = function(expr) { return Hexane.DefaultParser.parse(expr); };

    var exprFieldSpan = document.getElementById('expr-field');
    var resultSpan = document.getElementById('result-field');
    var latexSpan = document.getElementById('latex');
	var historyList = $('#history');

    var resultField = MQ.StaticMath(resultSpan);
    var resval = undefined;
	
	//  mode = 'latex': 1.0e+10 -> 1.0\\cdot10^10
	//  mode = 'html' 1.0e+10 -> 1.0&8226;10<sup>10</sup>
	//  mode = 'kbd' 1.0e+10 -> 1.0*^10^10
	var eToExp = function(res, mode){
        if (mode === undefined || mode === null) mode = 'latex';
		if (res.indexOf('e') != -1){
			var idx = res.indexOf('e');
			var t1 = res.substring(0, idx);
			var t2 = res.substring(idx+1);
			if (t2.length > 0 && t2[0] == '+'){
				t2 = t2.substring(1);
			}
			if (mode == 'html')
				return t1 + '&#8226;10<sup>' + t2 + '</sup>';
			else if (mode == 'kbd')
				return t1 + '*10^' + t2;
			else
				return t1 + '\\cdot10^{' + t2 + '}';
		}
		return res;
	}
	
	var updateMemoryTitles = function(){
		$('.memory-tile').each(function(idx, ele){
			$this = $(ele);
			var val = Hexane.vars[$this.attr('var')];
			if (val === undefined || val === null){
				$this.prop('title', 'undefined');
			}
			else{
				$this.prop('title', val.toString());
			}
		});
	}
	
	var resval = undefined;
	
	// Evaluate the entered expression
	var evalExpr = function(){
		try{
			if (exprField.latex().trim() == '') {
				resultField.latex('0 = 0 \\cdot 10^0');
				resval = undefined;
			}
			else {
				resval = Hexane.eval(exprField.latex());
				if (resval.constructor == SigNum){
					var res = resval.toExponential();
					res = eToExp(res);
					res = resval.toFullNumber() + ' = '  + res;
					resultField.latex(res);
				}
				else{
					var res = resval.toString();
					if (res.indexOf('e') != -1 && typeof(resval) == "number"){
						var idx = res.indexOf('e');
						var t1 = res.substring(0, idx);
						var t2 = res.substring(idx+1);
						if (t2.length > 0 && t2[0] == '+'){
							t2 = t2.substring(1);
						}
						res = t1 + '\\cdot10^{' + t2 + '}';
					}
					resultField.latex(res);
				}
				
				updateMemoryTitles();
			
				if (varsLoaded){
					try{
						localStorage.setItem("vars", JSON.stringify(Hexane.vars));
					}
					catch (ignore) {};
			}
				}
		}
		catch (err) {
			// var msgs = ["I'm not sure if I understand you.", "This is confusing me!", "Sorry, I'm not sure what you mean.", 
						// "That doesn't seem to be right.", "Error! Please check over what you wrote."];
			// var idx = Math.floor(Math.random() * msgs.length);
			// resultField.latex("\\text{" + msgs[idx] + "}");// + err.message;
			resultField.latex("\\text{Something's not right...}");// + err.message;
		}
	}
	
	/**
	 * If true, the next exprField edit event won't trigger a state change.
	 */
	var ignoreEdit = false;
	
	var timer = null;
	
    var exprField = MQ.MathField(exprFieldSpan, {
        spaceBehavesLikeTab: true,
        charsThatBreakOutOfSupSub: '*/=<>ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        autoCommands: 'pi theta omega alpha beta gamma Theta Omega Alpha Beta Gamma sqrt nthroot',
        autoOperatorNames: 'true false mod log',
        leftRightIntoCmdGoes: 'up',
        handlers: {
            edit: function() {
					if (timer) { clearTimeout(timer); timer = 1; }
					timer = setTimeout(function(){
						// latexSpan.textContent = exprField.latex();
						try{
							localStorage.setItem('exprLatex', exprField.latex());
						}
						catch (ignore) {};
						
						evalExpr();
						
						try{
							if (ignoreEdit)
								ignoreEdit = false;
							else if (exprField.latex() != GET('expr')){
								Hexane.history = Hexane.history.concat([exprField.latex()]).slice(-50);
								history.replaceState(null, 'Scientific Calculator - Hexane', "?expr=" + encodeURIComponent(exprField.latex()));
							}
						}
						catch (ignore) {};
						
						timer = null;
					}, (timer ? 300 : 0));
            },
            enter: function() { // alert(exprField.latex());
				if (resval !== undefined && resval !== null){
					Hexane.prevAns = Hexane.prevAns.concat([resval]).slice(-50); 
					rebuildAnsList();
				}
            },
        }
    });
	
	var saveAnsList = function() {
		var prevAnsTxt = '';
		for (var i=0; i<Hexane.prevAns.length; ++i){
			if (i != 0) prevAnsTxt += ';';
			if (Hexane.prevAns[i].constructor == SigNum){
				prevAnsTxt += Hexane.prevAns[i].value + ':' + Hexane.prevAns[i].sf;
			}
			else{
				prevAnsTxt += Hexane.prevAns[i];
			}
		}
		localStorage.setItem('prevAns', prevAnsTxt);
	}
	
	var rebuildAnsList = function(){
		var txt = '';
		for (var i=0; i<Hexane.prevAns.length; ++i){
			var str = Hexane.prevAns[i].toString();
			var val = str;
			if (Hexane.prevAns[i].constructor == SigNum){
				str = eToExp(str, 'html');
				val = eToExp(val, 'latex');
			}
			txt = txt.concat('<div class="history-tile" position="' + i + '" value="' + val + '" title="Click to enter saved result into textbox">'+
							'<span class="history-text">' + str +
							'</span> <span class="history-delete" title="Delete saved result"></span></div>');
		}
		txt += '\n<p class="history-tip"><strong>Saved Results</strong> &nbsp;|&nbsp; <span class="mobile-hide">Press <kbd>enter</kbd>' +
		       ' in the textbox to save the current result (max 50 results) &nbsp;| </span><a class="history-clear">Clear</a></p>';
		historyList.html(txt);
		
		var histTimer = null;
		
		$('.history-tile').bind('contextmenu', function(e){
			return false;
		});
		
		$('.history-tile').mousedown(function(e){
			
			// enable long tap
			$this = $(this);
			histTimer = setTimeout(function(){onLongTapHist($this);}, 750);
			
		}).on('touchend mouseup', function(event){
			$this = $(this);
			var name =  $this.attr('var');
			
			if (event.button == 0){
				exprField.write($this.attr('value'));
				window.scrollTo(0, document.getElementsByClassName('header-container')[0].offsetHeight);
			}
			else{
				onLongTapHist($this);
			}
			
			histTimer = null;
			
			if (!Modernizr.touch) exprField.focus();
		});
		
		var onLongTapHist = function($this){
			if (!$this) return;
			var name =  $this.attr('var');
			
			Hexane.prevAns.splice(Number($this.attr('position')), 1);
			saveAnsList();
			
			$this.animate({opacity:0}, 500, 'linear',
				function(){
					$this.remove();
					rebuildAnsList();
				}
			);
		}
		
		$('.history-delete').mouseup(function(e){	
			window.event.cancelBubble = true;
			e.stopPropagation();
		});
		
		$('.history-delete').click(function(e){
			var tile = $(this).parent();
			Hexane.prevAns.splice(Number(tile.attr('position')), 1);
			try{
				saveAnsList();
			}
			catch (ignore){}
			
			tile.animate({opacity:0}, 500, 'linear',
				function(){
					tile.remove();
					rebuildAnsList();
				}
			);
			
			window.event.cancelBubble = true;
			e.stopPropagation();
		});

		$('.history-clear').click(function(e){
			Hexane.prevAns = [];
			$('.history-tile').animate({opacity:0}, 400, 'linear');
			setTimeout(
				function(){
					rebuildAnsList();
				}
			, 	1000);
		});
		
		saveAnsList();
	}
	
	var timeoutTracker = 0;

    var evtname = 'mousedown';
    if (Modernizr.touch) evtname = 'touchend';

	// keypad
	
	var $this = null;
	var ct = 0;
	var exec = function(){
		if (ct == 0 || ct > 50 || (ct > 10 && ct % 5 == 0) || (ct < 10 && ct % 10 == 0)){
			if ($this.attr('latex-to-write')){ 
				exprField.write($this.attr('latex-to-write'));
			} 
			if ($this.attr('text-to-add')){ 
				exprField.typedText($this.attr('text-to-add'));
			} 
			if ($this.attr('keys-to-type')){ 
				exprField.keystroke($this.attr('keys-to-type'));
			}
			if ($this.attr('shift')){ 
				var toType = "";
				var shNum = Number($this.attr('shift'));
				if (shNum > 0){
					for (var i=0; i<shNum; ++i){
						toType += "Right ";
					}
				}
				else{
					for (var i=0; i>shNum; --i){
						toType += "Left ";
					}
				}
				exprField.keystroke(toType.trim());
			}
		}
		++ct;
	}
	
	var cancelPress = false;
	
    $('.key, .ptable-key').on(evtname, function(e){
		if (cancelPress) {
			cancelPress = false; 
			return;
		}
		
		ct = 0;
		$this = $(this); 
		exec();
		
		// allow user to hold key & repeat type
    	if (!Modernizr.touch)
    	    timeoutTracker = setInterval(exec, 20);
		else
			document.activeElement.blur();
	});
	
	$('.key, .ptable-key').on('touchmove', function(e){ 
		cancelPress = true;
	});

    if (!Modernizr.touch){
        $('.key, .ptable-key').on('mouseup mouseleave', function() {		
              clearInterval(timeoutTracker);
              exprField.focus();
        });
    }
	
	// disable context menu for memory buttons
	$('.memory-tile').bind('contextmenu', function(e){
		return false;
	});
	
	// memory
	var memTimer;
	
	$('.memory-tile').on('touchstart', function(event){
		
		// enable long tap		
		$this = $(this);
		memTimer = setTimeout(function(){onLongTapMem($this);}, 750);
		
	}).on('touchend mouseup', function(event){
		$this = $(this);
		var name =  $this.attr('var');
		
		if (memTimer){
			clearTimeout(memTimer);
			if (event.button == 0){
				name = $this.attr('latex-to-write') ? $this.attr('latex-to-write') : $this.attr('var');
				exprField.write(name);
				window.scrollTo(0, document.getElementsByClassName('header-container')[0].offsetHeight);
			}
			else{
				onLongTapMem($this);
			}
		}
		
		if (!Modernizr.touch) exprField.focus();
	});
	
	var onLongTapMem = function($this){
		if (!$this) return;
		var name =  $this.attr('var');
		
		if (resval !== undefined && resval !== null){
			Hexane.vars[name] = resval;
			$this.attr('title', resval.toString());
		}
		else{
			Hexane.vars[name] = undefined;
			$this.attr('title', 'undefined');
		}
		
		if (varsLoaded){
			try{
				localStorage.setItem("vars", JSON.stringify(Hexane.vars));
			}
			catch (ignore) {};
		}
		
		if (!Modernizr.touch) exprField.focus();
	};
	
	// config
	$('#config-sf input').change(function(){
		var $this = $(this);
		var val = Number($this.attr('value'));
		
		if (val < 0) SigNum.enableSF = false;
		else{
			SigNum.enableSF = true;
			SigNum.roundingMode = val;
		}
		
		try{
			localStorage.setItem('sfMode', val);
		}
		catch (ignore) {};
		
		evalExpr();
	});
		
	$('#allclear-btn').click(function(){
		exprField.latex('');
		if (! Modernizr.touch) exprField.focus();
	});
	
	$('#enter-btn').click(function(){
		if (resval !== undefined && resval !== null){
			Hexane.prevAns = Hexane.prevAns.concat([resval]).slice(-50); 
			rebuildAnsList();
		}
		if (! Modernizr.touch) exprField.focus();
	});
	
	var ptable = $('#periodic-table');
	
	var ignorePtable = false;
	$('#periodic-btn').on('touchstart', function(){
		ignorePtable = false;
	}).on('touchmove', function(){
		ignorePtable = true;
	}).click(function(){
		if (ignorePtable) return;
		var ptableClose = $('#periodic-table-close');
		
		if (ptable.css('display') == 'block'){
			ptable.animate({'opacity': 0}, 1000, function(){ 
				ptable.css('display', 'none'); 
			});		
		}
		else{
			ptable.css('opacity', 0);
			ptable.css('display', 'block');
			ptableClose.css('top', (ptable.position().top+10) + 'px');
			ptable.animate({'opacity': 1}, 1000);		
		}
		if (!Modernizr.touch) exprField.focus();
	});
	
	$('#periodic-table-close').click(function(){
		var ptable = $('#periodic-table');
		ptable.css('opacity', 1);
		ptable.animate({'opacity': 0}, 1000, function(){ ptable.css('display', 'none'); });		
		if (!Modernizr.touch) exprField.focus();
	});
	
	$(window).resize(function(){
		if (ptable.css('display') == 'block'){
			var ptableClose = $('#periodic-table-close');
			ptableClose.css('top', (ptable.position().top+10) + 'px');
		}
	});
	
	$('#periodic-table td').click(function(){
		var $this = $(this);
		exprField.write($this.children('.elem-name').text());
		
		if (!Modernizr.touch) exprField.focus();
	});
	
        try{
			// Use expression specified in GET parameter or load stored value
            var exprLatex = GET('expr') || localStorage.getItem('exprLatex') || '';
            exprField.latex(exprLatex || '');
			history.pushState(null, 'Scientific Calculator - Hexane', "?expr=" + encodeURIComponent(exprLatex));
			
			window.onpopstate = function() {
				ignoreEdit = true;
				exprField.latex( GET('expr') || localStorage.getItem('exprLatex') || '');
				Hexane.history = Hexane.history.slice(0,-1);
			};
            
            var prevAns = localStorage.getItem('prevAns');
            if (prevAns !== undefined && prevAns !== null && prevAns.trim() != ''){
                Hexane.prevAns = prevAns.split(';');
                for (var i=0; i < Hexane.prevAns.length; ++i){
                    if (Hexane.prevAns[i].indexOf(':') >= 0){
                        var spl = Hexane.prevAns[i].split(':');
                        Hexane.prevAns[i] = new SigNum(Number(spl[0]), Number(spl[1]));
                    }
                    else if (Hexane.prevAns[i] == 'true' || Hexane.prevAns[i] == 'false'){
                        Hexane.prevAns[i] = Boolean(Hexane.prevAns[i]);
                    }
                }
            }
            
            var sfMode = localStorage.getItem('sfMode');
            if (sfMode !== undefined && sfMode !== null && sfMode.trim() != ''){
                if (Number(sfMode) < 0) {
                    SigNum.enableSF = false;
                }
                else{
                    SigNum.enableSF = true;
                    SigNum.roundingMode = Number(sfMode);
                }
                $('#sf-c' + sfMode).attr('checked', true);
            }
            else{
				try{
					localStorage.setItem('sfMode', 2);
				}
				catch (ignore) {};
                SigNum.enableSF = true;
                SigNum.roundingMode = 2;
                $('#sf-c2').attr('checked', true);
            }
            
            var vars = JSON.parse(localStorage.getItem("vars"));
            if (vars !== undefined && vars !== null){
                for (var key in vars){
                    if (typeof(vars[key]) == 'object' && vars[key]['value'] !== undefined){
                        
                        var sf = vars[key]['sf'];
                        if (sf === null) sf = Infinity;
                        
                        Hexane.vars[key] = new SigNum(vars[key]['value'], sf);
                    }
                    else{
                        Hexane.vars[key] = vars[key];
                    }
                }
            }
            
            varsLoaded = true;

            rebuildAnsList();		
            updateMemoryTitles();
        }
        catch (ex) { console.log(ex.message) }
	
	// Fade in page when loaded
    $('.site-container').animate({opacity:1}, 1000);
	$('#loading-spinner').animate({opacity:0}, 1000, function(){ 
		$('#loading-spinner').remove() 
	});
	if (Modernizr.touch){
		setTimeout(function(){
			window.scrollTo(0, document.getElementsByClassName('header-container')[0].offsetHeight);
			$('textarea').attr('readonly', 'readonly');
		}, 1500);	
	};
    exprField.select();
    exprField.focus(); 
});
