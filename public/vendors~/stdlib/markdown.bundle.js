(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{128:function(e,t){const s=/[&<>"']/,n=/[&<>"']/g,r=/[<>"']|&(?!#?\w+;)/,i=/[<>"']|&(?!#?\w+;)/g,l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a=e=>l[e];const o=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e){return e.replace(o,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const c=/(^|[^\[])\^/g;const p=/[^\w:]/g,u=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;const g={},d=/^[^:]+:\/*[^/]*$/,f=/^([^:]+:)[\s\S]*$/,k=/^([^:]+:\/*[^/]*)[\s\S]*$/;function m(e,t){g[" "+e]||(d.test(e)?g[" "+e]=e+"/":g[" "+e]=b(e,"/",!0));const s=-1===(e=g[" "+e]).indexOf(":");return"//"===t.substring(0,2)?s?t:e.replace(f,"$1")+t:"/"===t.charAt(0)?s?t:e.replace(k,"$1")+t:e+t}function b(e,t,s){const n=e.length;if(0===n)return"";let r=0;for(;r<n;){const i=e.charAt(n-r-1);if(i!==t||s){if(i===t||!s)break;r++}else r++}return e.substr(0,n-r)}e.exports={escape:function(e,t){if(t){if(s.test(e))return e.replace(n,a)}else if(r.test(e))return e.replace(i,a);return e},unescape:h,edit:function(e,t){e=e.source||e,t=t||"";const s={replace:(t,n)=>(n=(n=n.source||n).replace(c,"$1"),e=e.replace(t,n),s),getRegex:()=>new RegExp(e,t)};return s},cleanUrl:function(e,t,s){if(e){let e;try{e=decodeURIComponent(h(s)).replace(p,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!u.test(s)&&(s=m(t,s));try{s=encodeURI(s).replace(/%25/g,"%")}catch(e){return null}return s},resolveUrl:m,noopTest:{exec:function(){}},merge:function(e){let t,s,n=1;for(;n<arguments.length;n++)for(s in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},splitCells:function(e,t){const s=e.replace(/\|/g,(e,t,s)=>{let n=!1,r=t;for(;--r>=0&&"\\"===s[r];)n=!n;return n?"|":" |"}).split(/ \|/);let n=0;if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(/\\\|/g,"|");return s},rtrim:b,findClosingBracket:function(e,t){if(-1===e.indexOf(t[1]))return-1;const s=e.length;let n=0,r=0;for(;r<s;r++)if("\\"===e[r])r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1},checkSanitizeDeprecation:function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}}},129:function(e,t){function s(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1},getDefaults:s,changeDefaults:function(t){e.exports.defaults=t}}},130:function(e,t,s){const{defaults:n}=s(129),{cleanUrl:r,escape:i}=s(128);e.exports=class{constructor(e){this.options=e||n}code(e,t,s){const n=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,n);null!=t&&t!==e&&(s=!0,e=t)}return n?'<pre><code class="'+this.options.langPrefix+i(n,!0)+'">'+(s?e:i(e,!0))+"</code></pre>\n":"<pre><code>"+(s?e:i(e,!0))+"</code></pre>"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,s,n){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+n.slug(s)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,s){const n=t?"ol":"ul";return"<"+n+(t&&1!==s?' start="'+s+'"':"")+">\n"+e+"</"+n+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const s=t.header?"th":"td";return(t.align?"<"+s+' align="'+t.align+'">':"<"+s+">")+e+"</"+s+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,s){if(null===(e=r(this.options.sanitize,this.options.baseUrl,e)))return s;let n='<a href="'+i(e)+'"';return t&&(n+=' title="'+t+'"'),n+=">"+s+"</a>",n}image(e,t,s){if(null===(e=r(this.options.sanitize,this.options.baseUrl,e)))return s;let n='<img src="'+e+'" alt="'+s+'"';return t&&(n+=' title="'+t+'"'),n+=this.options.xhtml?"/>":">",n}text(e){return e}}},131:function(e,t,s){const{noopTest:n,edit:r,merge:i}=s(128),l={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:n,table:n,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};l.def=r(l.def).replace("label",l._label).replace("title",l._title).getRegex(),l.bullet=/(?:[*+-]|\d{1,9}\.)/,l.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,l.item=r(l.item,"gm").replace(/bull/g,l.bullet).getRegex(),l.list=r(l.list).replace(/bull/g,l.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+l.def.source+")").getRegex(),l._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",l._comment=/<!--(?!-?>)[\s\S]*?-->/,l.html=r(l.html,"i").replace("comment",l._comment).replace("tag",l._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),l.paragraph=r(l._paragraph).replace("hr",l.hr).replace("heading"," {0,3}#{1,6} +").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",l._tag).getRegex(),l.blockquote=r(l.blockquote).replace("paragraph",l.paragraph).getRegex(),l.normal=i({},l),l.gfm=i({},l.normal,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),l.pedantic=i({},l.normal,{html:r("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",l._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:n,paragraph:r(l.normal._paragraph).replace("hr",l.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",l.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const a={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:n,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:n,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"};a.em=r(a.em).replace(/punctuation/g,a._punctuation).getRegex(),a._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,a._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,a._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,a.autolink=r(a.autolink).replace("scheme",a._scheme).replace("email",a._email).getRegex(),a._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,a.tag=r(a.tag).replace("comment",l._comment).replace("attribute",a._attribute).getRegex(),a._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,a._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,a._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,a.link=r(a.link).replace("label",a._label).replace("href",a._href).replace("title",a._title).getRegex(),a.reflink=r(a.reflink).replace("label",a._label).getRegex(),a.normal=i({},a),a.pedantic=i({},a.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:r(/^!?\[(label)\]\((.*?)\)/).replace("label",a._label).getRegex(),reflink:r(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",a._label).getRegex()}),a.gfm=i({},a.normal,{escape:r(a.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),a.gfm.url=r(a.gfm.url,"i").replace("email",a.gfm._extended_email).getRegex(),a.breaks=i({},a.gfm,{br:r(a.br).replace("{2,}","*").getRegex(),text:r(a.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()}),e.exports={block:l,inline:a}},132:function(e,t){e.exports=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}}},133:function(e,t,s){const n=s(130),{defaults:r}=s(129),{inline:i}=s(131),{findClosingBracket:l,escape:a}=s(128);e.exports=class e{constructor(e,t){if(this.options=t||r,this.links=e,this.rules=i.normal,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=i.pedantic:this.options.gfm&&(this.options.breaks?this.rules=i.breaks:this.rules=i.gfm)}static get rules(){return i}static output(t,s,n){return new e(s,n).output(t)}output(t){let s,n,r,i,o,h,c="";for(;t;)if(o=this.rules.escape.exec(t))t=t.substring(o[0].length),c+=a(o[1]);else if(o=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(o[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(o[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(o[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0])&&(this.inRawBlock=!1),t=t.substring(o[0].length),c+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0];else if(o=this.rules.link.exec(t)){const n=l(o[2],"()");if(n>-1){const e=(0===o[0].indexOf("!")?5:4)+o[1].length+n;o[2]=o[2].substring(0,n),o[0]=o[0].substring(0,e).trim(),o[3]=""}t=t.substring(o[0].length),this.inLink=!0,r=o[2],this.options.pedantic?(s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r),s?(r=s[1],i=s[3]):i=""):i=o[3]?o[3].slice(1,-1):"",r=r.trim().replace(/^<([\s\S]*)>$/,"$1"),c+=this.outputLink(o,{href:e.escapes(r),title:e.escapes(i)}),this.inLink=!1}else if((o=this.rules.reflink.exec(t))||(o=this.rules.nolink.exec(t))){if(t=t.substring(o[0].length),s=(o[2]||o[1]).replace(/\s+/g," "),s=this.links[s.toLowerCase()],!s||!s.href){c+=o[0].charAt(0),t=o[0].substring(1)+t;continue}this.inLink=!0,c+=this.outputLink(o,s),this.inLink=!1}else if(o=this.rules.strong.exec(t))t=t.substring(o[0].length),c+=this.renderer.strong(this.output(o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.em.exec(t))t=t.substring(o[0].length),c+=this.renderer.em(this.output(o[6]||o[5]||o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.code.exec(t))t=t.substring(o[0].length),c+=this.renderer.codespan(a(o[2].trim(),!0));else if(o=this.rules.br.exec(t))t=t.substring(o[0].length),c+=this.renderer.br();else if(o=this.rules.del.exec(t))t=t.substring(o[0].length),c+=this.renderer.del(this.output(o[1]));else if(o=this.rules.autolink.exec(t))t=t.substring(o[0].length),"@"===o[2]?(n=a(this.mangle(o[1])),r="mailto:"+n):(n=a(o[1]),r=n),c+=this.renderer.link(r,null,n);else if(this.inLink||!(o=this.rules.url.exec(t))){if(o=this.rules.text.exec(t))t=t.substring(o[0].length),this.inRawBlock?c+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0]):c+=this.renderer.text(a(this.smartypants(o[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else{if("@"===o[2])n=a(o[0]),r="mailto:"+n;else{do{h=o[0],o[0]=this.rules._backpedal.exec(o[0])[0]}while(h!==o[0]);n=a(o[0]),r="www."===o[1]?"http://"+n:n}t=t.substring(o[0].length),c+=this.renderer.link(r,null,n)}return c}static escapes(t){return t?t.replace(e.rules._escapes,"$1"):t}outputLink(e,t){const s=t.href,n=t.title?a(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(s,n,this.output(e[1])):this.renderer.image(s,n,a(e[1]))}smartypants(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e}mangle(e){if(!this.options.mangle)return e;const t=e.length;let s,n="",r=0;for(;r<t;r++)s=e.charCodeAt(r),Math.random()>.5&&(s="x"+s.toString(16)),n+="&#"+s+";";return n}}},134:function(e,t){e.exports=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}text(e){return e}link(e,t,s){return""+s}image(e,t,s){return""+s}br(){return""}}},135:function(e,t,s){const n=s(136),r=s(137),i=s(130),l=s(134),a=s(133),o=s(132),{merge:h,checkSanitizeDeprecation:c,escape:p}=s(128),{getDefaults:u,changeDefaults:g,defaults:d}=s(129);function f(e,t,s){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(s||"function"==typeof t){s||(s=t,t=null),t=h({},f.defaults,t||{}),c(t);const i=t.highlight;let l,a,o=0;try{l=n.lex(e,t)}catch(e){return s(e)}a=l.length;const p=function(e){if(e)return t.highlight=i,s(e);let n;try{n=r.parse(l,t)}catch(t){e=t}return t.highlight=i,e?s(e):s(null,n)};if(!i||i.length<3)return p();if(delete t.highlight,!a)return p();for(;o<l.length;o++)!function(e){"code"!==e.type?--a||p():i(e.text,e.lang,(function(t,s){return t?p(t):null==s||s===e.text?--a||p():(e.text=s,e.escaped=!0,void(--a||p()))}))}(l[o])}else try{return t=h({},f.defaults,t||{}),c(t),r.parse(n.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||f.defaults).silent)return"<p>An error occurred:</p><pre>"+p(e.message+"",!0)+"</pre>";throw e}}f.options=f.setOptions=function(e){return h(f.defaults,e),g(f.defaults),f},f.getDefaults=u,f.defaults=d,f.Parser=r,f.parser=r.parse,f.Renderer=i,f.TextRenderer=l,f.Lexer=n,f.lexer=n.lex,f.InlineLexer=a,f.inlineLexer=a.output,f.Slugger=o,f.parse=f,e.exports=f},136:function(e,t,s){const{defaults:n}=s(129),{block:r}=s(131),{rtrim:i,splitCells:l,escape:a}=s(128);e.exports=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||n,this.rules=r.normal,this.options.pedantic?this.rules=r.pedantic:this.options.gfm&&(this.rules=r.gfm)}static get rules(){return r}static lex(t,s){return new e(s).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.token(e,!0)}token(e,t){let s,n,o,h,c,p,u,g,d,f,k,m,b,x,_,w;for(e=e.replace(/^ +$/gm,"");e;)if((o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e)){const t=this.tokens[this.tokens.length-1];e=e.substring(o[0].length),t&&"paragraph"===t.type?t.text+="\n"+o[0].trimRight():(o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?o:i(o,"\n")}))}else if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2]?o[2].trim():o[2],text:o[3]||""});else if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if((o=this.rules.nptable.exec(e))&&(p={type:"table",header:l(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},p.header.length===p.align.length)){for(e=e.substring(o[0].length),k=0;k<p.align.length;k++)/^ *-+: *$/.test(p.align[k])?p.align[k]="right":/^ *:-+: *$/.test(p.align[k])?p.align[k]="center":/^ *:-+ *$/.test(p.align[k])?p.align[k]="left":p.align[k]=null;for(k=0;k<p.cells.length;k++)p.cells[k]=l(p.cells[k],p.header.length);this.tokens.push(p)}else if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,t),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),h=o[2],x=h.length>1,u={type:"list_start",ordered:x,start:x?+h:"",loose:!1},this.tokens.push(u),o=o[0].match(this.rules.item),g=[],s=!1,b=o.length,k=0;k<b;k++)p=o[k],f=p.length,p=p.replace(/^ *([*+-]|\d+\.) */,""),~p.indexOf("\n ")&&(f-=p.length,p=this.options.pedantic?p.replace(/^ {1,4}/gm,""):p.replace(new RegExp("^ {1,"+f+"}","gm"),"")),k!==b-1&&(c=r.bullet.exec(o[k+1])[0],(h.length>1?1===c.length:c.length>1||this.options.smartLists&&c!==h)&&(e=o.slice(k+1).join("\n")+e,k=b-1)),n=s||/\n\n(?!\s*$)/.test(p),k!==b-1&&(s="\n"===p.charAt(p.length-1),n||(n=s)),n&&(u.loose=!0),_=/^\[[ xX]\] /.test(p),w=void 0,_&&(w=" "!==p[1],p=p.replace(/^\[[ xX]\] +/,"")),d={type:"list_item_start",task:_,checked:w,loose:n},g.push(d),this.tokens.push(d),this.token(p,!1),this.tokens.push({type:"list_item_end"});if(u.loose)for(b=g.length,k=0;k<b;k++)g[k].loose=!0;this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0]});else if(t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),o[3]&&(o[3]=o[3].substring(1,o[3].length-1)),m=o[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[m]||(this.tokens.links[m]={href:o[2],title:o[3]});else if((o=this.rules.table.exec(e))&&(p={type:"table",header:l(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},p.header.length===p.align.length)){for(e=e.substring(o[0].length),k=0;k<p.align.length;k++)/^ *-+: *$/.test(p.align[k])?p.align[k]="right":/^ *:-+: *$/.test(p.align[k])?p.align[k]="center":/^ *:-+ *$/.test(p.align[k])?p.align[k]="left":p.align[k]=null;for(k=0;k<p.cells.length;k++)p.cells[k]=l(p.cells[k].replace(/^ *\| *| *\| *$/g,""),p.header.length);this.tokens.push(p)}else if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2].charAt(0)?1:2,text:o[1]});else if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens}}},137:function(e,t,s){const n=s(130),r=s(132),i=s(133),l=s(134),{defaults:a}=s(129),{merge:o,unescape:h}=s(128);e.exports=class e{constructor(e){this.tokens=[],this.token=null,this.options=e||a,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new r}static parse(t,s){return new e(s).parse(t)}parse(e){this.inline=new i(e.links,this.options),this.inlineText=new i(e.links,o({},this.options,{renderer:new l})),this.tokens=e.reverse();let t="";for(;this.next();)t+=this.tok();return t}next(){return this.token=this.tokens.pop(),this.token}peek(){return this.tokens[this.tokens.length-1]||0}parseText(){let e=this.token.text;for(;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)}tok(){let e="";switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,h(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":{let t,s,n,r,i="";for(n="",t=0;t<this.token.header.length;t++)n+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(i+=this.renderer.tablerow(n),t=0;t<this.token.cells.length;t++){for(s=this.token.cells[t],n="",r=0;r<s.length;r++)n+=this.renderer.tablecell(this.inline.output(s[r]),{header:!1,align:this.token.align[r]});e+=this.renderer.tablerow(n)}return this.renderer.table(i,e)}case"blockquote_start":for(e="";"blockquote_end"!==this.next().type;)e+=this.tok();return this.renderer.blockquote(e);case"list_start":{e="";const t=this.token.ordered,s=this.token.start;for(;"list_end"!==this.next().type;)e+=this.tok();return this.renderer.list(e,t,s)}case"list_item_start":{e="";const t=this.token.loose,s=this.token.checked,n=this.token.task;if(this.token.task)if(t)if("text"===this.peek().type){const e=this.peek();e.text=this.renderer.checkbox(s)+" "+e.text}else this.tokens.push({type:"text",text:this.renderer.checkbox(s)});else e+=this.renderer.checkbox(s);for(;"list_item_end"!==this.next().type;)e+=t||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(e,n,s)}case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:{const e='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(e);console.log(e)}}}}}}]);