var Zepto=function(){
function t(t){
return null==t?String(t):J[X.call(t)]||"object";
}
function e(e){
return"function"==t(e);
}
function n(t){
return null!=t&&t==t.window;
}
function r(t){
return null!=t&&t.nodeType==t.DOCUMENT_NODE;
}
function i(e){
return"object"==t(e);
}
function o(t){
return i(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype;
}
function a(t){
return t instanceof Array;
}
function s(t){
return"number"==typeof t.length;
}
function u(t){
return A.call(t,function(t){
return null!=t;
});
}
function c(t){
return t.length>0?T.fn.concat.apply([],t):t;
}
function l(t){
return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase();
}
function f(t){
return t in _?_[t]:_[t]=new RegExp("(^|\\s)"+t+"(\\s|$)");
}
function h(t,e){
return"number"!=typeof e||$[l(t)]?e:e+"px";
}
function p(t){
var e,n;
return Z[t]||(e=L.createElement(t),L.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),
e.parentNode.removeChild(e),"none"==n&&(n="block"),Z[t]=n),Z[t];
}
function d(t){
return"children"in t?P.call(t.children):T.map(t.childNodes,function(t){
return 1==t.nodeType?t:void 0;
});
}
function m(t,e,n){
for(j in e)n&&(o(e[j])||a(e[j]))?(o(e[j])&&!o(t[j])&&(t[j]={}),a(e[j])&&!a(t[j])&&(t[j]=[]),
m(t[j],e[j],n)):e[j]!==E&&(t[j]=e[j]);
}
function v(t,e){
return null==e?T(t):T(t).filter(e);
}
function g(t,n,r,i){
return e(n)?n.call(t,r,i):n;
}
function y(t,e,n){
null==n?t.removeAttribute(e):t.setAttribute(e,n);
}
function x(t,e){
var n=t.className,r=n&&n.baseVal!==E;
return e===E?r?n.baseVal:n:void(r?n.baseVal=e:t.className=e);
}
function b(t){
var e;
try{
return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?T.parseJSON(t):t:e):t;
}catch(n){
return t;
}
}
function w(t,e){
e(t);
for(var n in t.childNodes)w(t.childNodes[n],e);
}
var E,j,T,S,C,N,O=[],P=O.slice,A=O.filter,L=window.document,Z={},_={},$={
"column-count":1,
columns:1,
"font-weight":1,
"line-height":1,
opacity:1,
"z-index":1,
zoom:1
},D=/^\s*<(\w+|!)[^>]*>/,R=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,M=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,k=/^(?:body|html)$/i,z=/([A-Z])/g,q=["val","css","html","text","data","width","height","offset"],F=["after","prepend","before","append"],H=L.createElement("table"),I=L.createElement("tr"),V={
tr:L.createElement("tbody"),
tbody:H,
thead:H,
tfoot:H,
td:I,
th:I,
"*":L.createElement("div")
},U=/complete|loaded|interactive/,B=/^[\w-]*$/,J={},X=J.toString,W={},Y=L.createElement("div"),G={
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
};
return W.matches=function(t,e){
if(!e||!t||1!==t.nodeType)return!1;
var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;
if(n)return n.call(t,e);
var r,i=t.parentNode,o=!i;
return o&&(i=Y).appendChild(t),r=~W.qsa(i,e).indexOf(t),o&&Y.removeChild(t),r;
},C=function(t){
return t.replace(/-+(.)?/g,function(t,e){
return e?e.toUpperCase():"";
});
},N=function(t){
return A.call(t,function(e,n){
return t.indexOf(e)==n;
});
},W.fragment=function(t,e,n){
var r,i,a;
return R.test(t)&&(r=T(L.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(M,"<$1></$2>")),
e===E&&(e=D.test(t)&&RegExp.$1),e in V||(e="*"),a=V[e],a.innerHTML=""+t,r=T.each(P.call(a.childNodes),function(){
a.removeChild(this);
})),o(n)&&(i=T(r),T.each(n,function(t,e){
q.indexOf(t)>-1?i[t](e):i.attr(t,e);
})),r;
},W.Z=function(t,e){
if(t=t||[],window.attachEvent)for(var n in T.fn)t[n]=T.fn[n];else t.__proto__=T.fn;
return t.selector=e||"",t;
},W.isZ=function(t){
return t instanceof W.Z;
},W.init=function(t,n){
var r;
if(!t)return W.Z();
if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&D.test(t))r=W.fragment(t,RegExp.$1,n),
t=null;else{
if(n!==E)return T(n).find(t);
r=W.qsa(L,t);
}else{
if(e(t))return T(L).ready(t);
if(W.isZ(t))return t;
if(a(t))r=u(t);else if(i(t))r=[t],t=null;else if(D.test(t))r=W.fragment(t.trim(),RegExp.$1,n),
t=null;else{
if(n!==E)return T(n).find(t);
r=W.qsa(L,t);
}
}
return W.Z(r,t);
},T=function(t,e){
return W.init(t,e);
},T.extend=function(t){
var e,n=P.call(arguments,1);
return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){
m(t,n,e);
}),t;
},W.qsa=function(t,e){
var n,i="#"==e[0],o=!i&&"."==e[0],a=i||o?e.slice(1):e,s=B.test(a);
return r(t)&&s&&i?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:P.call(s&&!i?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e));
},T.contains=function(t,e){
return t!==e&&t.contains(e);
},T.type=t,T.isFunction=e,T.isWindow=n,T.isArray=a,T.isPlainObject=o,T.isEmptyObject=function(t){
var e;
for(e in t)return!1;
return!0;
},T.inArray=function(t,e,n){
return O.indexOf.call(e,t,n);
},T.camelCase=C,T.trim=function(t){
return null==t?"":String.prototype.trim.call(t);
},T.uuid=0,T.support={},T.expr={},T.map=function(t,e){
var n,r,i,o=[];
if(s(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&o.push(n);else for(i in t)n=e(t[i],i),
null!=n&&o.push(n);
return c(o);
},T.each=function(t,e){
var n,r;
if(s(t)){
for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t;
}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;
return t;
},T.grep=function(t,e){
return A.call(t,e);
},window.JSON&&(T.parseJSON=JSON.parse),T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){
J["[object "+e+"]"]=e.toLowerCase();
}),T.fn={
forEach:O.forEach,
reduce:O.reduce,
push:O.push,
sort:O.sort,
indexOf:O.indexOf,
concat:O.concat,
map:function(t){
return T(T.map(this,function(e,n){
return t.call(e,n,e);
}));
},
slice:function(){
return T(P.apply(this,arguments));
},
ready:function(t){
return U.test(L.readyState)&&L.body?t(T):L.addEventListener("DOMContentLoaded",function(){
t(T);
},!1),this;
},
get:function(t){
return t===E?P.call(this):this[t>=0?t:t+this.length];
},
toArray:function(){
return this.get();
},
size:function(){
return this.length;
},
remove:function(){
return this.each(function(){
null!=this.parentNode&&this.parentNode.removeChild(this);
});
},
each:function(t){
return O.every.call(this,function(e,n){
return t.call(e,n,e)!==!1;
}),this;
},
filter:function(t){
return e(t)?this.not(this.not(t)):T(A.call(this,function(e){
return W.matches(e,t);
}));
},
add:function(t,e){
return T(N(this.concat(T(t,e))));
},
is:function(t){
return this.length>0&&W.matches(this[0],t);
},
not:function(t){
var n=[];
if(e(t)&&t.call!==E)this.each(function(e){
t.call(this,e)||n.push(this);
});else{
var r="string"==typeof t?this.filter(t):s(t)&&e(t.item)?P.call(t):T(t);
this.forEach(function(t){
r.indexOf(t)<0&&n.push(t);
});
}
return T(n);
},
has:function(t){
return this.filter(function(){
return i(t)?T.contains(this,t):T(this).find(t).size();
});
},
eq:function(t){
return-1===t?this.slice(t):this.slice(t,+t+1);
},
first:function(){
var t=this[0];
return t&&!i(t)?t:T(t);
},
last:function(){
var t=this[this.length-1];
return t&&!i(t)?t:T(t);
},
find:function(t){
var e,n=this;
return e="object"==typeof t?T(t).filter(function(){
var t=this;
return O.some.call(n,function(e){
return T.contains(e,t);
});
}):1==this.length?T(W.qsa(this[0],t)):this.map(function(){
return W.qsa(this,t);
});
},
closest:function(t,e){
var n=this[0],i=!1;
for("object"==typeof t&&(i=T(t));n&&!(i?i.indexOf(n)>=0:W.matches(n,t));)n=n!==e&&!r(n)&&n.parentNode;
return T(n);
},
parents:function(t){
for(var e=[],n=this;n.length>0;)n=T.map(n,function(t){
return(t=t.parentNode)&&!r(t)&&e.indexOf(t)<0?(e.push(t),t):void 0;
});
return v(e,t);
},
parent:function(t){
return v(N(this.pluck("parentNode")),t);
},
children:function(t){
return v(this.map(function(){
return d(this);
}),t);
},
contents:function(){
return this.map(function(){
return P.call(this.childNodes);
});
},
siblings:function(t){
return v(this.map(function(t,e){
return A.call(d(e.parentNode),function(t){
return t!==e;
});
}),t);
},
empty:function(){
return this.each(function(){
this.innerHTML="";
});
},
pluck:function(t){
return T.map(this,function(e){
return e[t];
});
},
show:function(){
return this.each(function(){
"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName));
});
},
replaceWith:function(t){
return this.before(t).remove();
},
wrap:function(t){
var n=e(t);
if(this[0]&&!n)var r=T(t).get(0),i=r.parentNode||this.length>1;
return this.each(function(e){
T(this).wrapAll(n?t.call(this,e):i?r.cloneNode(!0):r);
});
},
wrapAll:function(t){
if(this[0]){
T(this[0]).before(t=T(t));
for(var e;(e=t.children()).length;)t=e.first();
T(t).append(this);
}
return this;
},
wrapInner:function(t){
var n=e(t);
return this.each(function(e){
var r=T(this),i=r.contents(),o=n?t.call(this,e):t;
i.length?i.wrapAll(o):r.append(o);
});
},
unwrap:function(){
return this.parent().each(function(){
T(this).replaceWith(T(this).children());
}),this;
},
clone:function(){
return this.map(function(){
return this.cloneNode(!0);
});
},
hide:function(){
return this.css("display","none");
},
toggle:function(t){
return this.each(function(){
var e=T(this);
(t===E?"none"==e.css("display"):t)?e.show():e.hide();
});
},
prev:function(t){
return T(this.pluck("previousElementSibling")).filter(t||"*");
},
next:function(t){
return T(this.pluck("nextElementSibling")).filter(t||"*");
},
html:function(t){
return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){
var n=this.innerHTML;
T(this).empty().append(g(this,t,e,n));
});
},
text:function(t){
return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){
this.textContent=t===E?"":""+t;
});
},
attr:function(t,e){
var n;
return"string"==typeof t&&e===E?0==this.length||1!==this[0].nodeType?E:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:this.each(function(n){
if(1===this.nodeType)if(i(t))for(j in t)y(this,j,t[j]);else y(this,t,g(this,e,n,this.getAttribute(t)));
});
},
removeAttr:function(t){
return this.each(function(){
1===this.nodeType&&y(this,t);
});
},
prop:function(t,e){
return t=G[t]||t,e===E?this[0]&&this[0][t]:this.each(function(n){
this[t]=g(this,e,n,this[t]);
});
},
data:function(t,e){
var n=this.attr("data-"+t.replace(z,"-$1").toLowerCase(),e);
return null!==n?b(n):E;
},
val:function(t){
return 0===arguments.length?this[0]&&(this[0].multiple?T(this[0]).find("option").filter(function(){
return this.selected;
}).pluck("value"):this[0].value):this.each(function(e){
this.value=g(this,t,e,this.value);
});
},
offset:function(t){
if(t)return this.each(function(e){
var n=T(this),r=g(this,t,e,n.offset()),i=n.offsetParent().offset(),o={
top:r.top-i.top,
left:r.left-i.left
};
"static"==n.css("position")&&(o.position="relative"),n.css(o);
});
if(0==this.length)return null;
var e=this[0].getBoundingClientRect();
return{
left:e.left+window.pageXOffset,
top:e.top+window.pageYOffset,
width:Math.round(e.width),
height:Math.round(e.height)
};
},
css:function(e,n){
if(arguments.length<2){
var r=this[0],i=getComputedStyle(r,"");
if(!r)return;
if("string"==typeof e)return r.style[C(e)]||i.getPropertyValue(e);
if(a(e)){
var o={};
return T.each(a(e)?e:[e],function(t,e){
o[e]=r.style[C(e)]||i.getPropertyValue(e);
}),o;
}
}
var s="";
if("string"==t(e))n||0===n?s=l(e)+":"+h(e,n):this.each(function(){
this.style.removeProperty(l(e));
});else for(j in e)e[j]||0===e[j]?s+=l(j)+":"+h(j,e[j])+";":this.each(function(){
this.style.removeProperty(l(j));
});
return this.each(function(){
this.style.cssText+=";"+s;
});
},
index:function(t){
return t?this.indexOf(T(t)[0]):this.parent().children().indexOf(this[0]);
},
hasClass:function(t){
return t?O.some.call(this,function(t){
return this.test(x(t));
},f(t)):!1;
},
addClass:function(t){
return t?this.each(function(e){
S=[];
var n=x(this),r=g(this,t,e,n);
r.split(/\s+/g).forEach(function(t){
T(this).hasClass(t)||S.push(t);
},this),S.length&&x(this,n+(n?" ":"")+S.join(" "));
}):this;
},
removeClass:function(t){
return this.each(function(e){
return t===E?x(this,""):(S=x(this),g(this,t,e,S).split(/\s+/g).forEach(function(t){
S=S.replace(f(t)," ");
}),void x(this,S.trim()));
});
},
toggleClass:function(t,e){
return t?this.each(function(n){
var r=T(this),i=g(this,t,n,x(this));
i.split(/\s+/g).forEach(function(t){
(e===E?!r.hasClass(t):e)?r.addClass(t):r.removeClass(t);
});
}):this;
},
scrollTop:function(t){
if(this.length){
var e="scrollTop"in this[0];
return t===E?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){
this.scrollTop=t;
}:function(){
this.scrollTo(this.scrollX,t);
});
}
},
scrollLeft:function(t){
if(this.length){
var e="scrollLeft"in this[0];
return t===E?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){
this.scrollLeft=t;
}:function(){
this.scrollTo(t,this.scrollY);
});
}
},
position:function(){
if(this.length){
var t=this[0],e=this.offsetParent(),n=this.offset(),r=k.test(e[0].nodeName)?{
top:0,
left:0
}:e.offset();
return n.top-=parseFloat(T(t).css("margin-top"))||0,n.left-=parseFloat(T(t).css("margin-left"))||0,
r.top+=parseFloat(T(e[0]).css("border-top-width"))||0,r.left+=parseFloat(T(e[0]).css("border-left-width"))||0,
{
top:n.top-r.top,
left:n.left-r.left
};
}
},
offsetParent:function(){
return this.map(function(){
for(var t=this.offsetParent||L.body;t&&!k.test(t.nodeName)&&"static"==T(t).css("position");)t=t.offsetParent;
return t;
});
}
},T.fn.detach=T.fn.remove,["width","height"].forEach(function(t){
var e=t.replace(/./,function(t){
return t[0].toUpperCase();
});
T.fn[t]=function(i){
var o,a=this[0];
return i===E?n(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){
a=T(this),a.css(t,g(this,i,e,a[t]()));
});
};
}),F.forEach(function(e,n){
var r=n%2;
T.fn[e]=function(){
var e,i,o=T.map(arguments,function(n){
return e=t(n),"object"==e||"array"==e||null==n?n:W.fragment(n);
}),a=this.length>1;
return o.length<1?this:this.each(function(t,e){
i=r?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null,o.forEach(function(t){
if(a)t=t.cloneNode(!0);else if(!i)return T(t).remove();
w(i.insertBefore(t,e),function(t){
null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML);
});
});
});
},T.fn[r?e+"To":"insert"+(n?"Before":"After")]=function(t){
return T(t)[e](this),this;
};
}),W.Z.prototype=T.fn,W.uniq=N,W.deserializeValue=b,T.zepto=W,T;
}();
window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){
function e(t){
return t._zid||(t._zid=h++);
}
function n(t,n,o,a){
if(n=r(n),n.ns)var s=i(n.ns);
return(v[e(t)]||[]).filter(function(t){
return!(!t||n.e&&t.e!=n.e||n.ns&&!s.test(t.ns)||o&&e(t.fn)!==e(o)||a&&t.sel!=a);
});
}
function r(t){
var e=(""+t).split(".");
return{
e:e[0],
ns:e.slice(1).sort().join(" ")
};
}
function i(t){
return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)");
}
function o(t,e){
return t.del&&!y&&t.e in x||!!e;
}
function a(t){
return b[t]||y&&x[t]||t;
}
function s(n,i,s,u,l,h,p){
var d=e(n),m=v[d]||(v[d]=[]);
i.split(/\s/).forEach(function(e){
if("ready"==e)return t(document).ready(s);
var i=r(e);
i.fn=s,i.sel=l,i.e in b&&(s=function(e){
var n=e.relatedTarget;
return!n||n!==this&&!t.contains(this,n)?i.fn.apply(this,arguments):void 0;
}),i.del=h;
var d=h||s;
i.proxy=function(t){
if(t=c(t),!t.isImmediatePropagationStopped()){
t.data=u;
var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));
return e===!1&&(t.preventDefault(),t.stopPropagation()),e;
}
},i.i=m.length,m.push(i),"addEventListener"in n&&n.addEventListener(a(i.e),i.proxy,o(i,p));
});
}
function u(t,r,i,s,u){
var c=e(t);
(r||"").split(/\s/).forEach(function(e){
n(t,e,i,s).forEach(function(e){
delete v[c][e.i],"removeEventListener"in t&&t.removeEventListener(a(e.e),e.proxy,o(e,u));
});
});
}
function c(e,n){
return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(T,function(t,r){
var i=n[t];
e[t]=function(){
return this[r]=w,i&&i.apply(n,arguments);
},e[r]=E;
}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=w)),
e;
}
function l(t){
var e,n={
originalEvent:t
};
for(e in t)j.test(e)||t[e]===f||(n[e]=t[e]);
return c(n,t);
}
var f,h=(t.zepto.qsa,1),p=Array.prototype.slice,d=t.isFunction,m=function(t){
return"string"==typeof t;
},v={},g={},y="onfocusin"in window,x={
focus:"focusin",
blur:"focusout"
},b={
mouseenter:"mouseover",
mouseleave:"mouseout"
};
g.click=g.mousedown=g.mouseup=g.mousemove="MouseEvents",t.event={
add:s,
remove:u
},t.proxy=function(n,r){
if(d(n)){
var i=function(){
return n.apply(r,arguments);
};
return i._zid=e(n),i;
}
if(m(r))return t.proxy(n[r],n);
throw new TypeError("expected function");
},t.fn.bind=function(t,e,n){
return this.on(t,e,n);
},t.fn.unbind=function(t,e){
return this.off(t,e);
},t.fn.one=function(t,e,n,r){
return this.on(t,e,n,r,1);
};
var w=function(){
return!0;
},E=function(){
return!1;
},j=/^([A-Z]|returnValue$|layer[XY]$)/,T={
preventDefault:"isDefaultPrevented",
stopImmediatePropagation:"isImmediatePropagationStopped",
stopPropagation:"isPropagationStopped"
};
t.fn.delegate=function(t,e,n){
return this.on(e,t,n);
},t.fn.undelegate=function(t,e,n){
return this.off(e,t,n);
},t.fn.live=function(e,n){
return t(document.body).delegate(this.selector,e,n),this;
},t.fn.die=function(e,n){
return t(document.body).undelegate(this.selector,e,n),this;
},t.fn.on=function(e,n,r,i,o){
var a,c,h=this;
return e&&!m(e)?(t.each(e,function(t,e){
h.on(t,n,r,e,o);
}),h):(m(n)||d(i)||i===!1||(i=r,r=n,n=f),(d(r)||r===!1)&&(i=r,r=f),i===!1&&(i=E),
h.each(function(f,h){
o&&(a=function(t){
return u(h,t.type,i),i.apply(this,arguments);
}),n&&(c=function(e){
var r,o=t(e.target).closest(n,h).get(0);
return o&&o!==h?(r=t.extend(l(e),{
currentTarget:o,
liveFired:h
}),(a||i).apply(o,[r].concat(p.call(arguments,1)))):void 0;
}),s(h,e,i,r,n,c||a);
}));
},t.fn.off=function(e,n,r){
var i=this;
return e&&!m(e)?(t.each(e,function(t,e){
i.off(t,n,e);
}),i):(m(n)||d(r)||r===!1||(r=n,n=f),r===!1&&(r=E),i.each(function(){
u(this,e,r,n);
}));
},t.fn.trigger=function(e,n){
return e=m(e)||t.isPlainObject(e)?t.Event(e):c(e),e._args=n,this.each(function(){
"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n);
});
},t.fn.triggerHandler=function(e,r){
var i,o;
return this.each(function(a,s){
i=l(m(e)?t.Event(e):e),i._args=r,i.target=s,t.each(n(s,e.type||e),function(t,e){
return o=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0;
});
}),o;
},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){
t.fn[e]=function(t){
return t?this.bind(e,t):this.trigger(e);
};
}),["focus","blur"].forEach(function(e){
t.fn[e]=function(t){
return t?this.bind(e,t):this.each(function(){
try{
this[e]();
}catch(t){}
}),this;
};
}),t.Event=function(t,e){
m(t)||(e=t,t=e.type);
var n=document.createEvent(g[t]||"Events"),r=!0;
if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];
return n.initEvent(t,r,!0),c(n);
};
}(Zepto),function(t){
function e(e,n,r){
var i=t.Event(n);
return t(e).trigger(i,r),!i.isDefaultPrevented();
}
function n(t,n,r,i){
return t.global?e(n||y,r,i):void 0;
}
function r(e){
e.global&&0===t.active++&&n(e,null,"ajaxStart");
}
function i(e){
e.global&&!--t.active&&n(e,null,"ajaxStop");
}
function o(t,e){
var r=e.context;
return e.beforeSend.call(r,t,e)===!1||n(e,r,"ajaxBeforeSend",[t,e])===!1?!1:void n(e,r,"ajaxSend",[t,e]);
}
function a(t,e,r,i){
var o=r.context,a="success";
r.success.call(o,t,a,e),i&&i.resolveWith(o,[t,a,e]),n(r,o,"ajaxSuccess",[e,r,t]),
u(a,e,r);
}
function s(t,e,r,i,o){
var a=i.context;
i.error.call(a,r,e,t),o&&o.rejectWith(a,[r,e,t]),n(i,a,"ajaxError",[r,i,t||e]),u(e,r,i);
}
function u(t,e,r){
var o=r.context;
r.complete.call(o,e,t),n(r,o,"ajaxComplete",[e,r]),i(r);
}
function c(){}
function l(t){
return t&&(t=t.split(";",2)[0]),t&&(t==j?"html":t==E?"json":b.test(t)?"script":w.test(t)&&"xml")||"text";
}
function f(t,e){
return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?");
}
function h(e){
e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),
!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0);
}
function p(e,n,r,i){
var o=!t.isFunction(n);
return{
url:e,
data:o?n:void 0,
success:o?t.isFunction(r)?r:void 0:n,
dataType:o?i||r:r
};
}
function d(e,n,r,i){
var o,a=t.isArray(n),s=t.isPlainObject(n);
t.each(n,function(n,u){
o=t.type(u),i&&(n=r?i:i+"["+(s||"object"==o||"array"==o?n:"")+"]"),!i&&a?e.add(u.name,u.value):"array"==o||!r&&"object"==o?d(e,u,r,n):e.add(n,u);
});
}
var m,v,g=0,y=window.document,x=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,b=/^(?:text|application)\/javascript/i,w=/^(?:text|application)\/xml/i,E="application/json",j="text/html",T=/^\s*$/;
t.active=0,t.ajaxJSONP=function(e,n){
if(!("type"in e))return t.ajax(e);
var r,i,u=e.jsonpCallback,c=(t.isFunction(u)?u():u)||"jsonp"+ ++g,l=y.createElement("script"),f=window[c],h=function(e){
t(l).triggerHandler("error",e||"abort");
},p={
abort:h
};
return n&&n.promise(p),t(l).on("load error",function(o,u){
clearTimeout(i),t(l).off().remove(),"error"!=o.type&&r?a(r[0],p,e,n):s(null,u||"error",p,e,n),
window[c]=f,r&&t.isFunction(f)&&f(r[0]),f=r=void 0;
}),o(p,e)===!1?(h("abort"),p):(window[c]=function(){
r=arguments;
},l.src=e.url.replace(/=\?/,"="+c),y.head.appendChild(l),e.timeout>0&&(i=setTimeout(function(){
h("timeout");
},e.timeout)),p);
},t.ajaxSettings={
type:"GET",
beforeSend:c,
success:c,
error:c,
complete:c,
context:null,
global:!0,
xhr:function(){
return new window.XMLHttpRequest;
},
accepts:{
script:"text/javascript, application/javascript, application/x-javascript",
json:E,
xml:"application/xml, text/xml",
html:j,
text:"text/plain"
},
crossDomain:!1,
timeout:0,
processData:!0,
cache:!0
},t.ajax=function(e){
var n=t.extend({},e||{}),i=t.Deferred&&t.Deferred();
for(m in t.ajaxSettings)void 0===n[m]&&(n[m]=t.ajaxSettings[m]);
r(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),
n.url||(n.url=window.location.toString()),h(n),n.cache===!1&&(n.url=f(n.url,"_="+Date.now()));
var u=n.dataType,p=/=\?/.test(n.url);
if("jsonp"==u||p)return p||(n.url=f(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),
t.ajaxJSONP(n,i);
var d,g=n.accepts[u],y={},x=function(t,e){
y[t.toLowerCase()]=[t,e];
},b=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,w=n.xhr(),E=w.setRequestHeader;
if(i&&i.promise(w),n.crossDomain||x("X-Requested-With","XMLHttpRequest"),x("Accept",g||"*/*"),
(g=n.mimeType||g)&&(g.indexOf(",")>-1&&(g=g.split(",",2)[0]),w.overrideMimeType&&w.overrideMimeType(g)),
(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&x("Content-Type",n.contentType||"application/x-www-form-urlencoded"),
n.headers)for(v in n.headers)x(v,n.headers[v]);
if(w.setRequestHeader=x,w.onreadystatechange=function(){
if(4==w.readyState){
w.onreadystatechange=c,clearTimeout(d);
var e,r=!1;
if(w.status>=200&&w.status<300||304==w.status||0==w.status&&"file:"==b){
u=u||l(n.mimeType||w.getResponseHeader("content-type")),e=w.responseText;
try{
"script"==u?(1,eval)(e):"xml"==u?e=w.responseXML:"json"==u&&(e=T.test(e)?null:t.parseJSON(e));
}catch(o){
r=o;
}
r?s(r,"parsererror",w,n,i):a(e,w,n,i);
}else s(w.statusText||null,w.status?"error":"abort",w,n,i);
}
},o(w,n)===!1)return w.abort(),s(null,"abort",w,n,i),w;
if(n.xhrFields)for(v in n.xhrFields)w[v]=n.xhrFields[v];
var j="async"in n?n.async:!0;
w.open(n.type,n.url,j,n.username,n.password);
for(v in y)E.apply(w,y[v]);
return n.timeout>0&&(d=setTimeout(function(){
w.onreadystatechange=c,w.abort(),s(null,"timeout",w,n,i);
},n.timeout)),w.send(n.data?n.data:null),w;
},t.get=function(){
return t.ajax(p.apply(null,arguments));
},t.post=function(){
var e=p.apply(null,arguments);
return e.type="POST",t.ajax(e);
},t.getJSON=function(){
var e=p.apply(null,arguments);
return e.dataType="json",t.ajax(e);
},t.fn.load=function(e,n,r){
if(!this.length)return this;
var i,o=this,a=e.split(/\s/),s=p(e,n,r),u=s.success;
return a.length>1&&(s.url=a[0],i=a[1]),s.success=function(e){
o.html(i?t("<div>").html(e.replace(x,"")).find(i):e),u&&u.apply(o,arguments);
},t.ajax(s),this;
};
var S=encodeURIComponent;
t.param=function(t,e){
var n=[];
return n.add=function(t,e){
this.push(S(t)+"="+S(e));
},d(n,t,e),n.join("&").replace(/%20/g,"+");
};
}(Zepto),function(t){
t.fn.serializeArray=function(){
var e,n=[];
return t([].slice.call(this.get(0).elements)).each(function(){
e=t(this);
var r=e.attr("type");
"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=r&&"reset"!=r&&"button"!=r&&("radio"!=r&&"checkbox"!=r||this.checked)&&n.push({
name:e.attr("name"),
value:e.val()
});
}),n;
},t.fn.serialize=function(){
var t=[];
return this.serializeArray().forEach(function(e){
t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value));
}),t.join("&");
},t.fn.submit=function(e){
if(e)this.bind("submit",e);else if(this.length){
var n=t.Event("submit");
this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit();
}
return this;
};
}(Zepto),function(t){
"__proto__"in{}||t.extend(t.zepto,{
Z:function(e,n){
return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e;
},
isZ:function(e){
return"array"===t.type(e)&&"__Z"in e;
}
});
try{
getComputedStyle(void 0);
}catch(e){
var n=getComputedStyle;
window.getComputedStyle=function(t){
try{
return n(t);
}catch(e){
return null;
}
};
}
}(Zepto);