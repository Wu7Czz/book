define("biz_wap/jsapi/leaveReport.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/log.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=l?"1":"0",t.f="json",f.join(e,t);
}
function o(e){
return e&&"object"==typeof e;
}
function n(e,t){
if(o(e)&&o(t))for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
function r(e){
u("[leaveReport 1]"),console.log("[leaveReport 1]");
var r={};
for(var i in y){
r[i]||(r[i]={});
for(var a=0;a<y[i].length;a++){
var p=y[i][a];
"function"==typeof p?n(r[i],p(e)):o(p)&&n(r[i],p);
}
}
u("[leaveReport getDataFunc.length "+_.length+"]"),console.log("[leaveReport getDataFunc.length "+_.length+"]");
for(var a=0;a<_.length;a++){
var s=_[a](e);
o(s)&&g.push(s);
}
for(var a=0;a<g.length;a++)g[a].reportUrl&&(g[a].reportUrl=t(g[a].reportUrl));
return r.data={
requestList:g
},r;
}
function i(e){
"function"==typeof e?_.push(e):o(e)&&g.push(e);
}
function a(e,t){
y[e]||(y[e]=[]),y[e].push(t);
}
function p(e){
var t=r(!0);
c.invoke("handleMPPageAction",{
action:"reportByLeaveForMPGateway",
reportData:t
},function(o){
if(o&&o.err_msg&&-1!==o.err_msg.indexOf(":ok"))_=[],y={},"function"==typeof e&&e(o);else{
_=[];
var n=t.data.requestList.length;
t.data.requestList.forEach(function(t){
t.reportUrl&&s({
type:t.method||"GET",
url:t.reportUrl,
data:t.reportData,
async:!1,
success:function(t){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:ok",
fallback:!0,
resp:t
});
},
error:function(t,o){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:fail",
fallback:!0,
err:o
});
}
});
});
}
});
}
var s=e("biz_wap/utils/ajax.js"),c=e("biz_wap/jsapi/core.js"),f=e("biz_common/utils/url/parse.js"),u=e("biz_wap/utils/log.js"),l=-1!=navigator.userAgent.indexOf("TBS/"),d={},v=!1;
try{
d=top.window.document;
}catch(w){
v=!0;
}
if(!v&&top.window.__leaveReport)return top.window.__leaveReport;
if(window.__leaveReport)return window.__leaveReport;
var _=[],g=[],y={};
c.on("reportOnLeaveForMP",function(){
return r(!1);
});
var h={
reportNow:p,
addReport:i,
addSpecificReport:a
};
return window.__leaveReport=h,h;
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=-1!=navigator.userAgent.indexOf("WindowsWechat"),i=function(e,i){
if(n)return location.href=e,!1;
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=window.user_uin||0,s=0!==t&&Math.floor(t/100)%1e3<o;
return s?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1,
scene:i.scene||"",
bizUsername:i.user_name||""
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_wap/utils/jsmonitor_report.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=r.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],a=0;a<l.length;a++){
var w=[l[a].bizuin||window.biz||"",l[a].mid||"",l[a].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var p=c[n.index].getBoundingClientRect(),h="fans_read_cnt="+l[n.index].fans_read_cnt,g={
act:n.action||0,
bizuin:window.biz||"",
msgid:window.mid||"",
idx:window.idx||"",
scene:window.source||"",
sub_scene:window.subscene||"",
get_a8_key_scene:window.ascene||"",
screen_height:i,
screen_width:e,
screen_num:Math.ceil(t/i),
action_screen_num:Math.ceil((p.top+p.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:h,
session_id:u
};
o({
url:"/mp/appmsgreport?action=more_read",
type:"POST",
data:g,
timeout:2e3,
async:!1,
mayAbort:!0
});
var b=1===n.action?4:5;
d.setSum(110809,b,1);
}
function e(){
if(l){
for(var n=0,t=r.getInnerHeight(),o=0;o<c.length;o++)if(c[o].dataset.show)n++;else{
var s=c[o].getBoundingClientRect();
s.top+s.height<t&&(c[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=c.length&&a.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),a=n("biz_common/dom/event.js"),d=n("biz_wap/utils/jsmonitor_report.js"),r=n("common/utils.js"),l=null,c=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return a.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
},!1),c=n.getElementsByClassName("more_read_link");
for(var o=0;o<c.length;o++)a.on(c[o],"click",function(n){
return function(){
window.__second_open__?m.openUrlWithExtraWebview(l[n].link.htmlDecode()):window.location.href=l[n].link.htmlDecode(),
i({
action:2,
index:n
});
};
}(o));
n.style.display="";
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);
}
return e;
};
define("appmsg/comment.js",["biz_common/utils/string/html.js","biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","appmsg/retry_ajax.js","biz_common/dom/offset.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","common/utils.js","appmsg/emotion/selection.js","appmsg/i18n.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/dom.js","pages/utils.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/position.js","appmsg/set_font_size.js","biz_wap/utils/jsmonitor_report.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js","appmsg/comment_tpl.html.js","appmsg/comment_pc_tpl.html.js","appmsg/friend_comment_tpl.html.js"],function(e,t,n,o){
"use strict";
function i(e){
var t=document.getElementById(e);
t.parentNode.removeChild(t);
}
function d(e,t){
e&&(e.style.display=t||"block");
}
function l(e){
e&&(e.style.display="none");
}
function a(e,t){
for(;e&&e.tagName&&"BODY"!==e.tagName.toUpperCase();){
if(e===t)return!0;
e=e.parentNode;
}
return!1;
}
function s(e){
var t=jt.getScrollTop(),n=e.offsetTop;
return t+jt.getInnerHeight()>n&&n>=t?!0:!1;
}
function m(){
ln.mylist.children.length?(d(ln.mylist.parentNode),Bn||"none"===ln.mine.style.display||_t.removeClass(document.body,kn)):(l(ln.mylist.parentNode),
Bn||"none"===ln.mine.style.display||_t.addClass(document.body,kn));
}
function r(){
var e=0,t=ln.mylist.getElementsByClassName("js_comment_item");
if(t&&t.length)for(var n=0;n<t.length;n++){
var o=t[n];
e++,e>2?l(o):d(o);
for(var i=o.getElementsByClassName("js_reply_item"),a=0;a<i.length;a++){
var s=i[a];
e++,e>2?l(s):d(s);
}
var m=o.getElementsByClassName("js_reply_div").length>0?o.getElementsByClassName("js_reply_div")[0]:null;
m&&(e>2?l(m):d(m));
}
yn=!1;
}
function c(){
var e=ln.mylist.getElementsByClassName("js_comment_item");
if(e&&e.length)for(var t=0;t<e.length;t++){
var n=e[t];
d(n);
for(var o=n.getElementsByClassName("js_reply_item"),i=0;i<o.length;i++)d(o[i]);
var l=n.getElementsByClassName("js_reply_div").length>0?n.getElementsByClassName("js_reply_div")[0]:null;
l&&d(l);
}
yn=!0;
}
function _(e){
ln.el_alertContent.innerHTML=e,ln.el_alertPanel.style.display="";
}
function p(){
Bn?(_t.removeClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide"),
setTimeout(function(){
_t.addClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide");
},750)):(setTimeout(function(){
d(ln.toast);
},750),setTimeout(function(){
l(ln.toast);
},1500));
}
function u(e){
var t=a(e,ln.mylist),n=t?750:2e3;
document.getElementById("js_reply_success_pc_content").innerHTML=t?"已回复":"已回复，被精选后可见",
_t.removeClass(document.getElementById("js_reply_success_pc"),"weui-transition_opacity-hide"),
setTimeout(function(){
_t.addClass(document.getElementById("js_reply_success_pc"),"weui-transition_opacity-hide");
},n);
}
function g(e){
return e.toString().replace(/^\s+|\s+$/g,"");
}
function y(e,t){
if(!(Math.random()<.999)){
var n=9;
"https:"===window.location.protocol&&(n=18),ut.saveSpeeds({
uin:window.uin,
pid:n,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),ut.send();
}
}
function f(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];
if("undefined"!=typeof e)if(Wt.idkey)Nt.setSum(Wt.idkey,e,1);else{
var n=new Image,o=Math.random();
n.src="/mp/jsreport?key="+e+"&content="+t+"&r="+o;
}
}
function w(e){
var t=e.actiontype,n=void 0===t?0:t,o=e.personalCommentId,i=void 0===o?0:o,d=e.num,l=void 0===d?0:d;
Ht.report(19462,_extends({
PersonalCommentId:parseInt(i,10)||0,
CommentId:parseInt(Zt,10)||0,
actiontype:n,
wording:"余下N条",
number:parseInt(l,10)||0,
devicetype:Bn?1:2
},Ut));
}
function h(){
for(var e=document.getElementsByClassName("js_extend_comment"),t=0;t<e.length;t++){
var n=e[t],o=n.getAttribute("data-my-id");
s(n)&&hn.indexOf(o)<=-1&&(w({
actiontype:1,
personalCommentId:o,
num:n.getAttribute("data-num")
}),hn.push(o));
}
}
function C(){
Qt||(Qt=!0,new gt({
comment_id:Zt,
appmsgid:window.appmsgid,
idx:window.idx,
item_show_type:window.item_show_type||0,
biz:window.biz
}),h());
}
function j(){
try{
var e=ln.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<jt.getInnerHeight()&&en&&t&&(Nt.setLogs({
id:28307,
key:45,
value:1,
lc:1,
log0:""
}),It.off(window,"scroll",j));
}catch(n){
console.error(n);
}
}
function v(){
var e=ln.showAll,t=jt.getScrollTop(),n=Lt.getY(e,"js_article");
return 0===e.clientHeight?!1:(e.clientHeight+n>=t+e.clientHeight/2&&e.clientHeight+n<=t+e.clientHeight/2+jt.getInnerHeight()&&(Ht.report(18832,_extends({
Actiontype:1,
Type:3,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Pos:0
},Dt)),Nt.setSum(110809,26,1),It.off(window,"scroll",v)),!0);
}
function b(e){
Ht.report(19462,_extends({
CommentId:parseInt(Zt,10)||0,
actiontype:e,
wording:yn?"收起我的留言":"展开我的留言",
number:gn,
devicetype:1
},Ut));
}
function I(){
s(ln.expandAndFoldPC)&&(b(1),It.off(window,"scroll",I));
}
function B(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,i=n/1e3-e,d=new Date(n).getFullYear(),l=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>i?Math.floor(o/60/60)+"小时前":172800>i?"昨天":604800>i?Math.floor(i/24/60/60)+"天前":l.getFullYear()===d?l.getMonth()+1+"月"+l.getDate()+"日":l.getFullYear()+"年"+(l.getMonth()+1)+"月"+l.getDate()+"日";
}
function E(e){
Pt.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=Hn.encode(e.innerHTML);
});
}
function k(e){
return e.replace("‮","");
}
function T(e,t,n){
var o=void 0,i=void 0,d="",l="",a=!Jt&&!pn||Jt&&Gt||pn&&un,s=document.createElement("div");
"elected"===n?l=0:"friend"===n&&(l=1),cn={};
for(var m=0,r=0;r<e.length;r++){
if(m=0,i=e[r],i.isWxWork=In,i.type=n,i.time=B(i.create_time),i.status="",i.logo_url=i.logo_url||Ln,
i.logo_url=-1!==i.logo_url.indexOf("wx.qlogo.cn")?i.logo_url.replace(/\/132$/,"/96"):i.logo_url,
i.content=i.content.htmlDecodeLite().htmlEncodeLite(),i.nick_name=i.nick_name.htmlDecodeLite().htmlEncodeLite(),
i.nick_name=k(i.nick_name),i.like_num_format=parseInt(i.like_num,10)>=1e4?(i.like_num/1e4).toFixed(1)+"万":i.like_num,
"en"===window.LANG&&(i.like_num_format=bt.dealLikeReadShow_en(i.like_num)),i.is_from_friend="friend"===n?0:i.is_from_friend||0,
i.is_from_me="mine"===n?1:i.is_from_me||0,i.reply_new=i.reply_new||{
reply_list:[]
},i.is_mine=!n,i.is_elected="elected"===n||"friend"===n?1:i.is_elected,i.is_top="friend"===n?0:i.is_top,
i.report_elected=i.is_elected||0,i.report_friend=i.is_from_friend||0,i.scene=l,i.supportReply=Tn&&i.is_from_me&&a&&!In,
i.reply_new.reply_list.length>0)for(var c=0;c<i.reply_new.reply_list.length;c++){
var _=i.reply_new.reply_list[c];
"elected"!==n&&"friend"!==n||_.reply_is_elected?(_.time=B(_.create_time),_.content=(_.content||"").htmlEncodeLite(),
_.reply_like_status=_.reply_like_status||0,_.reply_like_num=_.reply_like_num||0,
_.reply_like_num_format=parseInt(_.reply_like_num,10)>=1e4?(_.reply_like_num/1e4).toFixed(1)+"万":_.reply_like_num,
"en"===window.LANG&&(_.reply_like_num_format=bt.dealLikeReadShow_en(_.reply_like_num)),
_.reply_is_elected=_.reply_is_elected,_.is_from_me=""!==_.openid&&i.is_from_me?1:0,
_.is_from_author=""===_.openid?1:0,c>0&&_.openid===i.reply_new.reply_list[c-1].openid&&(_.is_same=1),
m++):(i.reply_new.reply_list.splice(c,1),c--);
}
i.replyListCount=m,i.new_appmsg=window.new_appmsg,d+=Et.tmpl(pt,i,!1);
try{
var p=i.nick_name+i.content,u=!1,g=Wt.repeatContentID;
cn[p]&&(u=!0,g=Wt.repeatContent),an.indexOf(i.content_id)>-1&&(u=!0,g=Wt.repeatContentID),
an.push(i.content_id),cn[p]=!0,u&&f(g,encodeURIComponent(JSON.stringify({
comment_id:Zt,
content_id:i.content_id,
offset:$t,
length:e.length,
url:bn
})));
}catch(y){
console.error(y);
}
}
for(s.innerHTML=d,E(s);s.children.item(0);)o=s.children.item(0),t.appendChild(o);
}
function x(e){
var t=void 0,n=void 0,o=Date.now(),i=e.resp,a=e.loadTime,s=e.forceRefresh,m=document.createDocumentFragment(),r=document.createDocumentFragment();
if(Jt=i.only_fans_can_comment,f(Wt.handleList,encodeURIComponent(JSON.stringify({
comment_id:Zt,
offset:$t,
url:bn
}))),1!==i.enabled?(xn&&(xn.style.display="none"),Pn&&l(Pn),i.elected_comment=[],
i.friend_comment=[],i.elected_comment_total_cnt=0,i.friend_comment_total_cnt=0):(xn&&(xn.style.display="block"),
Pn&&d(Pn)),0===$t){
if(tn=i.logo_url,mn=i.nick_name,s&&(an=[]),t=i.elected_comment,t&&t.length){
if(T(t,m,"elected"),s&&(ln.list.innerHTML=""),ln.list.appendChild(m),d(ln.main),
In||(pn&&0===un?(document.getElementById("js_cmt_nofans1").innerHTML="作者已设置关注3天后才可留言",
d(document.getElementById("js_cmt_nofans1"),"block")):Jt&&0===i.is_fans?(document.getElementById("js_cmt_nofans1").innerHTML="作者已设置关注后才可以留言",
d(document.getElementById("js_cmt_nofans1"),"block")):Rt&&(Bn?(d(ln.commentPC),d(ln.inputPC)):d(ln.addCmtBtn1))),
i.elected_comment_total_cnt<=10&&(d(document.getElementById("js_cmt_statement")),
d(document.getElementById("js_cmt_qa"))),!Xt&&"5"===window.item_show_type){
var c=Date.now()-window.logs.pagetime.page_begin;
Xt=!0,Math.random()<.1&&(ut.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:27,
time:c
}]
}),ut.send());
}
}else l(ln.main),pn&&0===un?(document.getElementById("js_cmt_nofans2_inner").innerHTML="作者已设置关注3天后才可留言",
d(document.getElementById("js_cmt_nofans2"),"block")):Jt&&0===i.is_fans?(document.getElementById("js_cmt_nofans2_inner").innerHTML="作者已设置关注后才可以留言",
d(document.getElementById("js_cmt_nofans2"),"block")):Rt&&(Bn?(d(ln.commentPC),d(ln.inputPC)):d(ln.addCmtBtn2));
n=i.friend_comment,T(n,r,"friend"),n&&0===n.length&&l(Pn),s&&(ln.fdlist.innerHTML=""),
ln.fdlist&&ln.fdlist.appendChild(r),n&&n.length?(d(ln.fdmain),(!Jt||Jt&&1===i.is_fans)&&(Bn||(l(ln.addCmtBtn1),
l(ln.addCmtBtn2),Rt&&d(ln.addCmtBtn3)))):l(ln.fdmain);
var _=document.getElementById("js_cmt_area");
location.href.indexOf("scrolltodown")>-1&&_&&_.offsetTop&&window.scrollTo(0,_.offsetTop-25);
}else t=i.elected_comment,t&&t.length&&(T(t,m,"elected"),ln.list.appendChild(m));
0===i.elected_comment_total_cnt?($t=-1,l(document.getElementById("js_cmt_loading")),
l(document.getElementById("js_cmt_statement")),l(document.getElementById("js_cmt_qa"))):$t+vn>=i.elected_comment_total_cnt?($t=-1,
l(document.getElementById("js_cmt_loading")),d(document.getElementById("js_cmt_statement")),
d(document.getElementById("js_cmt_qa"))):$t+=i.elected_comment.length,window.ipados13_font_scale&&Mt.setFontSize(ln.main,window.ipados13_font_scale/100);
var p=5;
if(window.user_uin%2===0&&(p=8),t.length>p&&window.has_related_article){
var u=0;
d(ln.showAll),l(document.getElementById("js_cmt_statement"));
for(var g=ln.list.querySelectorAll("li.js_comment_item"),w=0;p>w;w++){
var h=window.getComputedStyle(g[w]);
u+=g[w].getBoundingClientRect().height+parseFloat(h.paddingTop)+parseFloat(h.paddingBottom)+parseFloat(h.borderTopWidth)+parseFloat(h.borderBottomWidth)+parseFloat(h.marginTop)+parseFloat(h.marginBottom);
}
ln.listContainer.style.height=u+"px",ln.showAllWording.innerText="查看更多%s条留言".replace("%s",t.length-p);
var j=function(){
if("none"!==ln.showAll.style.display){
for(var e=0,t=ln.list.querySelectorAll("li.js_comment_item"),n=0;p>n;n++){
var o=window.getComputedStyle(t[n]);
e+=t[n].getBoundingClientRect().height+parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth)+parseFloat(o.marginTop)+parseFloat(o.marginBottom);
}
ln.listContainer.style.height=e+"px";
}
};
window.addEventListener("resize",j),window.ipados13_font_scale&&(Mt.setFontSize(ln.showAllWording,window.ipados13_font_scale/100),
Mt.onFontScaleChange(j)),Nt.setSum(110809,25,1);
}
C(),At.setTwoTabHeight("js_comment_content"),a&&y(a,Date.now()-o);
}
function P(e){
if(Zt=window.comment_id,0!==Number(Zt)){
var t=e.forceRefresh,n=e.cb;
t=t===!0,t&&($t=0);
var o=jt.getScrollTop(),i=document.documentElement.scrollHeight;
if(!(en||-1===$t||$t>0&&i-o-jt.getInnerHeight()>500)){
if("number"==typeof Yt&&0===Yt&&!t)return void x({
resp:{
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:Jt,
is_fans:Gt,
logo_url:tn,
nick_name:mn
}
});
var a=ht.join("/mp/appmsg_comment",{
action:"getcomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
offset:$t,
limit:vn,
send_time:window.send_time
},!0),s=+new Date;
en=!0,l(ln.tips),d(ln.loading);
try{
on++,t&&(dn=[]),on>1&&!t&&f(Wt.moreList,encodeURIComponent(a)),dn.indexOf(a)>-1&&f(Wt.repeatList,encodeURIComponent(a)),
dn.push(a);
}catch(m){
console.error(m);
}
Sn&&console.info("[图文评论] 开始请求评论数据:",a),Tt("[Appmsg comment] start get comment data, url:"+a),
Bt({
url:a,
dataType:"json",
success:function(e){
var o=e.base_resp&&e.base_resp.ret;
0===o?n&&n({
resp:e,
forceRefresh:t,
loadTime:Date.now()-s
}):f(Wt.errList,"type:resperr;url:"+encodeURIComponent(a)+";ret="+o),Tt("[Appmsg comment] get comment success");
},
error:function(){
f(Wt.errList,"type:ajaxerr;url:"+encodeURIComponent(a)),Tt("[Appmsg comment] get comment ajax error");
},
complete:function(){
en=!1,l(ln.loading),It.off(window,"scroll",j);
}
});
}
}
}
function A(){
2>=gn?l(ln.expandAndFoldPC):(d(ln.expandAndFoldPC),yn?(_t.addClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="收起我的留言"):(_t.removeClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="展开我的留言"));
}
function S(){
ln.list.children.length?ln.fdlist.children.length?(Rt&&d(ln.addCmtBtn3),l(ln.addCmtBtn1),
l(ln.addCmtBtn2),l(ln.addCmtBtn4)):(Rt&&d(ln.addCmtBtn1),l(ln.addCmtBtn2),l(ln.addCmtBtn3),
l(ln.addCmtBtn4)):ln.fdlist.children.length?(Rt&&d(ln.addCmtBtn3),l(ln.addCmtBtn4),
l(ln.addCmtBtn1),l(ln.addCmtBtn2)):(Rt&&d(ln.addCmtBtn2),l(ln.addCmtBtn3),l(ln.addCmtBtn1),
l(ln.addCmtBtn4)),Bn&&(l(ln.addCmtBtn1),l(ln.addCmtBtn2),l(ln.addCmtBtn3));
}
function H(e,t){
var n=document.createDocumentFragment(),o={
content:t,
nick_name:mn,
create_time:Date.now()/1e3|0,
is_elected:0,
logo_url:tn,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:e.my_id,
content_id:e.content_id,
reply_new:{
reply_list:[]
}
};
p(),T([o],n,"mine"),ln.mylist.insertBefore(n,ln.mylist.firstChild),m(),Bn?(ln.input.innerHTML="",
ln.inputHolder.style.display="",ln.containerPC.style.display="none",ln.inputPC.style.display="",
gn++,yn=!0,wn.unshift(o),c(),A()):ln.input.value="",S();
}
function L(e,t){
var n=t.filter(function(t){
return parseInt(t.my_id,10)===parseInt(e,10);
});
return n&&n.length>0?n[0]:null;
}
function M(e,t,n,o){
u(o),ln.input.innerHTML="",ln.inputHolder.style.display="",gn++;
var i=document.createDocumentFragment(),d=document.getElementById("cid"+t),s=d.nextSibling;
ln.mylist.removeChild(d);
var m=L(t,wn);
m&&(m.reply_new&&m.reply_new.reply_list&&0!==m.reply_new.reply_list.length||(m.reply_new={
reply_list:[]
}),m.reply_new.reply_list.push({
content:n,
nick_name:mn,
create_time:Date.now()/1e3|0,
reply_is_elected:0,
reply_del_flag:0,
reply_like_status:0,
reply_like_num:0,
uin:Ft,
reply_id:e.reply_id
}),a(o,ln.list)?(l(ln.containerPC),T([m],i,"mine"),ln.mylist.insertBefore(i,s),yn?c():r()):(T([m],i,"mine"),
ln.mylist.insertBefore(i,s),yn=!0,c())),A();
}
function N(e){
var t=ln.containerPC.getAttribute("data-my-id"),n=g(sn).replace(/<br\/>/g,"").replace(/\n/g,"")||"",o=document.getElementById("activity-name");
if(ln.submit.disabled!==!0){
if(n.length<1)return void _("留言不能为空");
if(n.length>600)return void _("字数不能多于600个");
ln.submit.disabled=!0;
var i=ht.join("/mp/appmsg_comment",{
action:"addcommentreply",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
sn:window.sn
},!0);
Bt({
url:i,
data:{
content:n,
title:o&&g(o.innerText),
head_img:tn,
nickname:mn,
client_id:_n,
my_id:t
},
type:"POST",
dataType:"json",
success:function(o){
switch(+o.ret){
case 0:
M(o,t,n,e);
break;

case-6:
_("你留言的太频繁了，休息一下吧");
break;

case-7:
_("你还未关注该公众号，不能参与留言");
break;

case-10:
_("字数不能多于600个");
break;

case-15:
_("留言已关闭");
break;

default:
_("系统错误，请重试");
}
},
error:function(){}
});
}
}
function R(e){
var t=e.delegatedTarget||e.srcElement;
if(Bn&&fn)return void N(t);
Pt.log("tag1");
var n=void 0,o=ht.join("/mp/appmsg_comment",{
action:"addcomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
sn:window.sn
},!0);
if(n=Bn?g(sn).replace(/<br\/>/g,"").replace(/\n/g,"")||"":g(ln.input.value),Pt.log("tag2"),
!_t.hasClass(ln.submit,"btn_disabled")&&ln.submit.disabled!==!0){
if(Pt.log("tag3"),n.length<1)return void _("留言不能为空");
if(Pt.log("tag4"),n.length>600)return void _("字数不能多于600个");
Bn&&(n=sn),Pt.log("tag5"),Bn?ln.submit.disabled=!0:_t.addClass(ln.submit,"btn_disabled"),
Pt.log("tag6");
var i=document.getElementById("activity-name");
Pt.log("tag7"),Vt!==n&&(_n=Date.now()),Bt({
url:o,
data:{
content:n,
title:i&&g(i.innerText),
head_img:tn,
nickname:mn,
client_id:_n
},
type:"POST",
dataType:"json",
success:function(e){
switch(Pt.log("tag8"),Bn||jn.hidePannel(),+e.ret){
case 0:
H(e,n);
break;

case-6:
_("你留言的太频繁了，休息一下吧");
break;

case-7:
_("你还未关注该公众号，不能参与留言");
break;

case-10:
_("字数不能多于600个");
break;

case-15:
_("留言已关闭");
break;

default:
Vt=n,_("系统错误，请重试");
}
0!==Number(e.ret)&&f(Wt.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+e.ret);
},
error:function(e){
Pt.log("shit;"+e.status+";"+e.statusText),f(Wt.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!==ln.input.value&&_t.removeClass(ln.submit,"btn_disabled");
}
});
}
}
function D(e){
if(e&&e.length>0)for(var t=0;t<e.length;t++){
var n=e[t];
gn++,n.reply_new&&n.reply_new.reply_list&&(gn+=n.reply_new.reply_list.length);
}
}
function z(e){
D(e),r(),gn>2&&(ln.expandAndFoldPC.innerHTML="展开我的留言",d(ln.expandAndFoldPC),yn=!1,
b(1));
}
function F(){
var e=document.getElementById("js_mycmt_loading"),t=ht.join("/mp/appmsg_comment",{
action:"getmycomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt
},!0);
m(),0===rn&&(rn=1,d(e),Bt({
url:t,
dataType:"json",
success:function(e){
var n=e.base_resp&&e.base_resp.ret;
if(0===n){
var o=e.my_comment;
wn=o;
var i=document.createDocumentFragment();
o&&o.length&&(Bn&&(d(ln.myareaPC),d(ln.mylist)),T(o,i,"mine"),ln.mylist.appendChild(i),
Bn&&z(o)),rn=2;
}else rn=0,f(Wt.errComment,"type:resperr;url:"+encodeURIComponent(t)+";ret="+n);
},
error:function(){
rn=0,f(Wt.errComment,"type:ajaxerr;url:"+encodeURIComponent(t));
},
complete:function(){
l(e),m();
}
}));
}
function O(){
return St.isWechat?yt.os.ipad?!1:St.isInMiniProgram?!1:St.isIOS&&St.gtVersion("7.0.8")?!0:St.isAndroid&&St.gtVersion("7.0.8")?!0:jt.isNativePage()&&(St.isIOS||St.isAndroid)?!0:!1:!1;
}
function q(){
var e=document.getElementById("activity-name");
return O()?(Ct.invoke("handleMPPageAction",{
action:"writeComment",
title:e&&g(e.innerText),
comment_id:Zt,
style:"white"
}),!0):!1;
}
function U(){
return St.isWechat?yt.os.ipad?!1:St.isInMiniProgram?!1:St.isIOS&&St.gtVersion("7.0.12",!0)?!0:St.isAndroid&&St.gtVersion("7.0.13",!0)?!0:jt.isNativePage()&&(St.isIOS||St.isAndroid)?!0:!1:!1;
}
function W(e){
return Kt=jt.getScrollTop(),O()&&e?void q():(Bn||l(ln.article),d(ln.mine),ln.deletePanel=document.getElementById("js_delete_panel_mobile"),
ln.deleteConfirm=document.getElementById("js_delete_confirm_mobile"),ln.deleteCancel=document.getElementById("js_delete_cancel_mobile"),
window.__second_open__&&yt.os.ios&&d(ln.fakebar),window.scrollTo(0,0),F(),void(e||Pt.later(function(){
ln.input.focus();
})));
}
function G(){
"1"===ht.getQuery("js_my_comment")&&W(!0);
}
function Y(){
l(ln.mine),d(ln.article),ln.deletePanel=document.getElementById("js_delete_panel"),
ln.deleteConfirm=document.getElementById("js_delete_confirm"),ln.deleteCancel=document.getElementById("js_delete_cancel"),
window.scrollTo(0,Kt),ln.input.blur(),_t.removeClass(document.body,En),_t.removeClass(document.body,kn);
}
function V(e){
var t=_t.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=parseInt(n.getAttribute("data-num")||0,10),i=n.getAttribute("data-like");
t===("1"===i)&&(t?o--:o++),0===o&&(o=""),"en"===window.LANG?n.innerHTML=bt.dealLikeReadShow_en(o):-1===n.innerHTML.indexOf("万")&&(n.innerHTML=o),
t?(_t.removeClass(e,"praised"),e.dataset.status=0):(_t.addClass(e,"praised"),e.dataset.status=1);
}
function Q(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(_t.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status,10),i=0===o?1:0,d=n.dataset.contentId,l=n.dataset.scene,a=document.querySelectorAll('.js_comment_praise[data-content-id="'+d+'"]'),s=0;s<a.length;s++)V(a[s]);
if(ft({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:i,
appmsgid:window.appmsgid,
comment_id:Zt,
content_id:d,
item_show_type:window.item_show_type||0,
scene:l
}
}),Bn){
var m=n.dataset.myId,r=L(m,wn);
r&&(r.like_status=i,r.like_num=i?r.like_num++:r.like_num--);
}
}
}
function J(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status,10),o=n?0:1,i=t.dataset.contentId,d=t.dataset.replyId,l=t.dataset.scene,a=document.querySelectorAll('.js_reply_praise[data-content-id="'+i+'"][data-reply-id="'+d+'"]'),s=0;s<a.length;s++)V(a[s]);
if(Bt({
url:"/mp/appmsg_comment?action=like_reply",
type:"post",
data:{
comment_id:Zt,
content_id:i,
reply_id:d,
like:o,
scene:l,
item_show_type:window.item_show_type||0
}
}),Bn){
var m=t.dataset.myId,r=L(m,wn);
r&&r.reply_new.reply_list.forEach(function(e){
e.reply_id===parseInt(d,10)&&(e.reply_like_status=o,e.reply_like_num=o?e.reply_like_num++:e.reply_like_num--);
});
}
}
function X(e,t){
e.parentNode.removeChild(e),_t.addClass(ln.deletePanel,"weui-transition_opacity-hide");
for(var n=document.querySelectorAll(".cid"+t),o=0;o<n.length;o++)n[o].parentNode.removeChild(n[o]);
if(ln.list.children.length?ln.fdlist.children.length||l(ln.fdmain):(l(ln.main),l(document.getElementById("js_cmt_statement")),
l(document.getElementById("js_cmt_qa")),ln.fdlist.children.length||l(ln.fdmain)),
m(),S(),Bn){
var i=L(t,wn);
i&&(gn=gn-i.reply_new.reply_list.length-1),wn=wn.filter(function(e){
return e.my_id!==parseInt(t,10);
}),yn?c():r(),A();
}
}
function Z(e){
var t=void 0,n=e.delegatedTarget,i=n.getAttribute("data-my-id"),d=ht.join("/mp/appmsg_comment",{
action:"delete",
scene:Wt.scene,
appmsgid:window.appmsgid,
my_id:i,
comment_id:Zt
},!0);
_t.removeClass(ln.deletePanel,"weui-transition_opacity-hide"),It.on(ln.deleteConfirm,"click",function(){
t!==i&&(t=i,Bt({
url:d,
dataType:"json",
success:function(e){
var t=n;
if(0===e.ret){
for(;t&&(t.nodeType!==t.ELEMENT_NODE||"li"!==t.tagName.toLowerCase());)t=t.parentNode;
t&&X(t,i);
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
}));
}),It.on(ln.deleteCancel,"click",function(){
t!==i&&(t=i,_t.addClass(ln.deletePanel,"weui-transition_opacity-hide"));
});
}
function $(e,t,n){
l(ln.deleteReplyPanel);
var o=document.querySelectorAll('.discuss_message_content[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),i=document.querySelectorAll('.js_reply_del[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),d=document.querySelectorAll('.js_reply_praise[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),a=document.querySelectorAll('.js_reply_elect_status[data-my-id="'+t+'"][data-reply-id="'+n+'"]');
if(o.length===i.length){
for(var s=0;s<o.length;s++)o[s].innerHTML="此回复已被删除",_t.addClass(o[s],"discuss_message_del"),
i[s].style.display="none";
if(d.forEach(function(e){
e.style.display="none";
}),a.forEach(function(e){
e.style.display="none";
}),Bn){
var m=L(t,wn);
m&&m.reply_new.reply_list.forEach(function(e){
e.reply_id===parseInt(n,10)&&(e.reply_del_flag=1,e.reply_is_elected=0);
});
}
}
}
function K(e){
var t=void 0,n=e.delegatedTarget,i=n.getAttribute("data-my-id"),a=n.getAttribute("data-reply-id"),s=ht.join("/mp/appmsg_comment",{
action:"deletecommentreply",
scene:Wt.scene,
appmsgid:window.appmsgid,
my_id:i,
reply_id:a,
comment_id:Zt
},!0);
d(ln.deleteReplyPanel),It.on(ln.deleteReplyConfirm,"click",function(){
t!==a&&(t=a,Bt({
url:s,
dataType:"json",
success:function(e){
var t=n;
if(0===e.ret){
for(;t&&(t.nodeType!==t.ELEMENT_NODE||"li"!==t.tagName.toLowerCase());)t=t.parentNode;
t&&$(t,i,a);
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
}));
}),It.on(ln.deleteReplyCancel,"click",function(){
t!==a&&(t=a,l(ln.deleteReplyPanel));
});
}
function et(){
ln.input.innerHTML="",ln.input.focus(),Cn=null,ln.submit.disabled=!0;
}
function tt(e){
var t=e.delegatedTarget||e.srcElement,n=t.getAttribute("data-my-id"),o=document.getElementById("activity-name"),i=t.parentNode.parentNode,a=void 0,s="";
if(i){
var m=i.getElementsByClassName("js_reply_content"),r=m.length;
if(r>0)for(var c=m.length-1;c>=0;c--){
var _=m[c];
if(!_t.hasClass(_,"discuss_message_del")){
a=_;
break;
}
}
a||(a=i.getElementsByClassName("js_comment_content").length>=1?i.getElementsByClassName("js_comment_content")[0]:null);
}
return s=a?a.getAttribute("data-content"):"",U()?(Ct.invoke("handleMPPageAction",{
action:"writeCommentReply",
title:o&&g(o.innerText),
comment_id:Zt,
style:"white",
personal_comment_id:n,
reply_content:s
}),!0):(Bn?(ln.containerPC.parentNode.removeChild(ln.containerPC),i.appendChild(ln.containerPC),
ln.containerPC.setAttribute("data-my-id",n),ln.inputHolder.innerHTML="留言的回复被公众号精选后，将对所有人可见",
ln.inputHolder.style.display="",ln.submit.innerText="回复",l(ln.emotionPanel),"none"===ln.inputPC.style.display&&d(ln.inputPC),
d(ln.containerPC),et(),fn=!0):(d(ln.updateDialog),Nt.setSum(110809,51,1),It.on(ln.updateCancel,"click",function(){
l(ln.updateDialog);
}),It.on(ln.updateConfirm,"click",function(){
Nt.setSum(110809,52,1),St.isIOS?At.jumpUrl(Nn,!0):St.isAndroid&&At.jumpUrl(Rn,!0);
})),!1);
}
function nt(e){
for(var t=e.delegatedTarget||e.srcElement,n=t.getAttribute("data-my-id"),o=ln.list.querySelectorAll('.reply_result[data-my-id="'+n+'"]'),i=ln.list.querySelectorAll('.js_reply_div[data-my-id="'+n+'"]'),a=t.getAttribute("data-num"),s=0;s<o.length;s++)d(o[s]);
1===i.length&&d(i[0]),l(t),w({
actiontype:2,
personalCommentId:n,
num:a
});
}
function ot(e){
e&&e.preventDefault(),Y(),l(ln.fakebar);
}
function it(e,t){
return q()?void Ht.report(19048,_extends({
EventType:1,
IsFans:Gt,
CommentPageType:2
},qt)):(jt.isNativePage()||_t.addClass(document.body,En),t?(Sn&&console.log("FakeHash on comment"),
void W()):(e.preventDefault(),window.__second_open__&&yt.os.ios?W():(Sn&&console.log("push comment"),
kt.push("comment")),void Ht.report(19048,_extends({
EventType:1,
IsFans:Gt,
CommentPageType:1
},qt))));
}
function dt(e){
window.scrollTo(0,window.scrollY+e.getBoundingClientRect().height);
}
function lt(e){
return e.getBoundingClientRect().top+e.getBoundingClientRect().height>=jt.getInnerHeight()?!0:!1;
}
function at(){
kt.on("comment",function(){
it(null,!0);
}),kt.on("article",function(){
Sn&&console.log("FakeHash on article"),Y();
}),kt.on(function(e){
"comment"===e&&Y();
});
}
function st(){
It.on(ln.input,"input",function(e){
if(Bn){
var t=ln.input.innerHTML;
""===t||"<br>"===t?(ln.inputHolder.style.display="",ln.input.innerHTML=""):ln.inputHolder.style.display="none";
}
var n=g(ln.input.value||ln.input.innerHTML);
n.length<1?_t.addClass(ln.submit,"btn_disabled"):_t.removeClass(ln.submit,"btn_disabled"),
yt.os.ios&&e.data&&Mn.indexOf(e.data)>-1&&(nn=!0);
}),It.on(ln.input,"click",function(){
yt.os.ios&&nn&&(ln.input.blur(),ln.input.focus(),nn=!1);
}),It.on(ln.el_alertConfirm,"click",function(){
ln.el_alertPanel.style.display="none";
}),Bn&&It.on(ln.input,"click",function(){
l(document.getElementById("js_emotion_panel_pc"));
}),It.on(ln.list,"click",".js_comment_praise",Q),It.on(ln.mylist,"click",".js_comment_praise",Q),
It.on(ln.fdlist,"click",".js_comment_praise",Q),It.on(ln.list,"click",".js_reply_praise",J),
It.on(ln.fdlist,"click",".js_reply_praise",J),It.on(ln.mylist,"click",".js_reply_praise",J),
It.on(ln.list,"click",".js_del",Z),It.on(ln.mylist,"click",".js_del",Z),It.on(ln.fdlist,"click",".js_del",Z),
It.on(ln.mylist,"click",".js_reply_del",K),It.on(ln.list,"click",".js_reply_del",K),
It.on(ln.list,"click",".js_comment_reply",tt),It.on(ln.mylist,"click",".js_comment_reply",tt),
It.on(ln.list,"click",".js_extend_comment",nt),jt.listenMpPageAction(function(e){
if("deleteComment"===e.action&&X(document.getElementById("cid"+e.personal_comment_id),e.personal_comment_id),
"deleteCommentReply"===e.action&&(console.log("deleteCommentReply",e.personal_comment_id,e.replyId),
$(document.getElementById("cid"+e.personal_comment_id),e.personal_comment_id,e.replyId)),
"praiseComment"===e.action){
console.log("praiseComment",e.personal_comment_id,e.reply_id,e.is_like);
var t=[];
t=document.querySelectorAll(e.reply_id&&0!==e.reply_id?'.js_reply_praise[data-my-id="'+e.personal_comment_id+'"][data-reply-id="'+e.reply_id+'"]':'.js_comment_praise[data-my-id="'+e.personal_comment_id+'"]');
var n=!0,o=!1,i=void 0;
try{
for(var d,l=t[Symbol.iterator]();!(n=(d=l.next()).done);n=!0){
var a=d.value;
_t.hasClass(a,"praised")===!e.is_like&&V(a);
}
}catch(s){
o=!0,i=s;
}finally{
try{
!n&&l.return&&l.return();
}finally{
if(o)throw i;
}
}
}
}),It.on(ln.list,"click",".js_del",function(e){
e.preventDefault();
}),It.on(ln.mylist,"click",".js_del",function(e){
e.preventDefault();
}),It.on(ln.fdlist,"click",".js_del",function(e){
e.preventDefault();
}),It.on(ln.submit,"click",R),It.on(ln.submit,"click",function(e){
e.preventDefault();
}),ln.goback&&(It.on(ln.goback,"click",ot),It.on(ln.goback,"click",ot)),window.__second_open__&&yt.os.ios&&!function(){
It.on(ln.input,"click",function(){
l(ln.fakebar);
}),It.on(ln.input,"blur",function(){
"none"!==ln.mine.style.display&&d(ln.fakebar);
});
var e=null,t=null;
It.on(window,"orientationchange",function(){
"none"!==ln.fakebar.style.display&&(clearTimeout(e),e=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(ln.fakebar).width)&&(clearTimeout(t),
ln.mine.style.height=jt.getInnerHeight()+"px",window.scrollBy&&window.scrollBy(0,1),
t=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),ln.mine.style.height="";
},100));
},50));
});
}(),It.on(window,"scroll",j),window.hasRelatedArticleInfo&&It.on(window,"scroll",v),
Bn&&It.on(window,"scroll",I),It.on(window,"scroll",h),It.on(document.getElementById("js_cmt_write1"),"click",function(e){
it(e);
}),It.on(document.getElementById("js_cmt_write2"),"click",function(e){
it(e);
}),It.on(document.getElementById("js_cmt_write3"),"click",function(e){
it(e);
}),It.on(document.getElementById("js_cmt_write4"),"click",function(e){
it(e);
}),It.on(ln.inputPC,"click",function(){
l(ln.inputPC),ln.containerPC.parentNode.removeChild(ln.containerPC),ln.inputHolder.style.display="",
ln.inputHolder.innerHTML="留言被公众号精选后，将对所有人可见",ln.submit.innerText="留言",document.getElementById("js_cmt_panel_pc").appendChild(ln.containerPC),
fn=!1,d(ln.containerPC),lt(ln.containerPC)&&dt(ln.containerPC),et();
}),It.bindVisibilityChangeEvt(function(e){
e&&jt.getScrollTop()<wt.getOffset(ln.cmtContainer).offsetTop-jt.getInnerHeight()&&P({
forceRefresh:!0,
cb:x
});
}),It.on(ln.showAllWording,"tap",function(e){
e.preventDefault(),l(ln.showAll),d(document.getElementById("js_cmt_statement")),
ln.listContainer.style.height="auto",Ht.report(18832,_extends({
Actiontype:2,
Type:3,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Pos:0
},Dt)),Nt.setSum(110809,27,1);
});
}
function mt(){
function e(){
var e=document.createElement("div"),t="";
e.innerHTML=ln.input.innerHTML;
for(var n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,d=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
d=!0),i){
var l=d?document.createTextNode(i):i;
e.replaceChild(l,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
return t=e.innerHTML;
}
function t(){
Cn=vt.getRange();
}
function n(){
if(Cn){
var e=vt.getSelection();
if(e.addRange)e.removeAllRanges(),e.addRange(Cn);else{
var t=vt.getRange();
t.setEndPoint&&(t.setEndPoint("EndToEnd",Cn),t.setEndPoint("StartToStart",Cn)),t.select();
}
}
}
function o(){
ln.input.focus(),ln.input.scrollTop=ln.input.scrollHeight,n();
}
function i(){
var e=g(sn).replace(/<br\/>/g,"").replace(/\n/g,"").length;
h.innerText=e,e>600?(w.style.display="",_t.addClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!0):1>e?(w.style.display="none",_t.removeClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!0):(w.style.display="none",_t.removeClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!1);
}
function s(e,t){
var n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],o=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"],i=void 0;
i=t?o:n;
for(var d=0;d<i.length;d+=2)e=e.replace(new RegExp(i[d],"g"),i[d+1]);
return e;
}
function m(){
document.execCommand("AutoUrlDetect",!1,!1);
var t=e();
t=s(t),sn=Hn.textFilter(t),i();
}
function _(e){
o();
var n=vt.getRange();
if(n){
if(n.createContextualFragment){
e+='<img style="width:1px;height:1px;"></img>';
var i=n.createContextualFragment(e),d=i.lastChild,l=vt.getSelection();
n.deleteContents(),n.insertNode(i),n.setStartBefore(d),n.setEndAfter(d),l.removeAllRanges(),
l.addRange(n),document.execCommand("Delete",!1,null);
}else n.pasteHTML&&e&&(n.pasteHTML(e),n.select(),n.collapse&&n.collapse(!1));
t(),m();
}
}
function p(e){
var t=e.currentTarget,n=t.getAttribute("data-index"),o=f[n].name,i='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"\n      class="icon_emotion_single '+o+'" alt="mo-'+f[n].title+'"></img>';
_(i),Hn.emotionPanelMove();
}
function u(){
for(var e=ln.input,t=void 0,n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,d=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
d=!0),i){
var l=d?document.createTextNode(i):i;
t||(t=l),e.replaceChild(l,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
vt.setCursorToEnd(t);
}
var y=void 0;
Cn=vt.getRange();
var f=Hn.edata,w=document.getElementById("js_length_notice_pc"),h=document.getElementById("js_word_length_pc");
yt.os.Mac&&(window.onblur=function(){
ln.input&&"none"!==ln.input.display&&""!==ln.input.innerHTML&&ln.input.blur();
}),It.on(ln.input,"keyup",function(){
t(),m();
}),It.on(ln.input,"keydown",function(e){
return 13===e.keyCode?(t(),_("<br/>"),t(),!1):void 0;
}),It.on(ln.input,"mouseup",function(){
t(),m();
}),It.on(ln.input,"paste",function(){
y&&clearTimeout(y),y=setTimeout(function(){
return u(),t(),m(),!1;
},10);
}),It.on(document,"click",function(e){
var t=e.srcElement||e.delegatedTarget,n=document.getElementById("js_emotion_panel_pc");
if((!fn&&!a(t,ln.addbtnPC)||fn&&!a(t,ln.containerPC))&&"none"!==ln.containerPC.style.display){
var o=ln.input.innerHTML;
""===g(o)&&(l(ln.containerPC),d(ln.inputPC),l(n));
}
a(t,n)||a(t,ln.emotionSwitchPC)||"none"===n.style.display||l(n);
},!1),It.on(ln.expandAndFoldPC,"click",function(){
yn?(b(2),_t.removeClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="展开我的留言",r(),yn=!1,b(1)):(b(2),_t.addClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="收起我的留言",c(),yn=!0,b(1));
}),Pt("li.js_emotion_item").on("click",p);
}
function rt(t){
if(Jt=t.only_fans_can_comment,mn=t.nick_name,Gt=t.is_fans,tn=t.logo_url,Yt=t.comment_count,
pn=t.only_fans_days_can_comment,un=t.is_fans_days,window._has_comment=!0,console.log("inwechat",Tn,"commentid",Zt),
!Tn||0===Number(Zt))return void(window._has_comment=!1);
if(xn){
var n=e("appmsg/comment_tpl.html.js"),o=e("appmsg/comment_pc_tpl.html.js");
xn.innerHTML=Et.tmpl(n,{
new_appmsg:window.new_appmsg,
isWxWork:In
},!1),An.insertAdjacentHTML("afterbegin",Et.tmpl(o,{
new_appmsg:window.new_appmsg
},!1));
}
if(Pn){
var d=e("appmsg/friend_comment_tpl.html.js");
Pn.innerHTML=Et.tmpl(d,{
new_appmsg:window.new_appmsg
},!1);
}
var l="";
1*window.item_show_type===10&&(l=document.getElementById("js_text_content").innerHTML.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,""));
var a=document.createElement("div");
a.innerHTML=Et.tmpl(xt,{
new_appmsg:window.new_appmsg,
isIos:yt.os.ios,
textPageTitle:l
},!1),document.body.appendChild(a),Bn?(i("js_cmt_mine"),document.getElementById("js_avatar_pc").src=tn,
_t.addClass(document.body,"pages_skin_pc")):i("js_cmt_addbtn_pc"),ln={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
goback:document.getElementById("js_cmt_goback"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById(Bn?"js_cmt_mylist_pc":"js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt"),
fakebar:document.getElementById("js_fake_bar"),
showAll:document.getElementById("js_cmt_show_all"),
showAllWording:document.getElementById("js_cmt_show_all_wording"),
listContainer:document.getElementById("js_cmt_list_container"),
cmtContainer:document.getElementById("js_cmt_container"),
inputPC:document.getElementById("js_cmt_input_pc"),
containerPC:document.getElementById("js_cmt_container_pc"),
commentPC:document.getElementById("js_comment_pc"),
addbtnPC:document.getElementById("js_cmt_addbtn_pc"),
myareaPC:document.getElementById("js_cmt_myarea_pc"),
emotionSwitchPC:document.getElementById("js_emotion_wrp_pc"),
expandAndFoldPC:document.getElementById("js_expand_and_fold_pc"),
deletePanel:document.getElementById("js_delete_panel"),
deleteConfirm:document.getElementById("js_delete_confirm"),
deleteCancel:document.getElementById("js_delete_cancel"),
inputHolder:document.getElementById("js_cmt_input_holder"),
emotionPanel:document.getElementById("js_emotion_panel_pc"),
el_alertPanel:document.getElementById("js_alert_panel"),
el_alertContent:document.getElementById("js_alert_content"),
el_alertConfirm:document.getElementById("js_alert_confirm"),
addCmtBtn1:document.getElementById("js_cmt_addbtn1"),
addCmtBtn2:document.getElementById("js_cmt_addbtn2"),
addCmtBtn3:document.getElementById("js_cmt_addbtn3"),
addCmtBtn4:document.getElementById("js_cmt_addbtn4"),
updateDialog:document.getElementById("js_update_dialog"),
updateCancel:document.getElementById("js_update_cancel"),
updateConfirm:document.getElementById("js_update_confirm"),
deleteReplyPanel:document.getElementById("js_delete_reply_panel"),
deleteReplyConfirm:document.getElementById("js_delete_reply_confirm"),
deleteReplyCancel:document.getElementById("js_delete_reply_cancel")
},window.__second_open__&&yt.os.ios&&(ln.mine.style.marginBottom=getComputedStyle(ln.fakebar).height),
!t.notAutoGetComment&&P({
forceRefresh:!0,
cb:x
}),G(),Bn&&F(),st(),Bn?(Hn.init(),mt()):jn=new Hn.Emotion({
emotionPanel:Pt("#js_emotion_panel"),
inputArea:Pt("#js_cmt_input"),
emotionPanelArrowWrp:Pt("#js_emotion_panel_arrow_wrp"),
emotionSwitcher:Pt("#js_emotion_switch"),
emotionSlideWrapper:Pt("#js_slide_wrapper"),
emotionNavBar:Pt("#js_navbar"),
submitBtn:Pt("#js_cmt_submit")
});
}
function ct(){
at();
}
e("biz_common/utils/string/html.js");
var _t=e("biz_common/dom/class.js"),pt=e("appmsg/cmt_tpl.html.js"),ut=e("biz_common/utils/wxgspeedsdk.js"),gt=e("appmsg/comment_report.js"),yt=e("biz_wap/utils/device.js"),ft=e("appmsg/retry_ajax.js"),wt=e("biz_common/dom/offset.js"),ht=e("biz_common/utils/url/parse.js"),Ct=e("biz_wap/jsapi/core.js"),jt=e("common/utils.js"),vt=e("appmsg/emotion/selection.js"),bt=e("appmsg/i18n.js"),It=e("biz_common/dom/event.js"),Bt=e("biz_wap/utils/ajax.js"),Et=e("biz_common/tmpl.js"),kt=e("biz_wap/utils/fakehash.js"),Tt=e("appmsg/log.js"),xt=e("appmsg/my_comment_tpl.html.js"),Pt=e("appmsg/emotion/dom.js"),At=e("pages/utils.js"),St=e("biz_wap/utils/mmversion.js"),Ht=e("common/comm_report.js"),Lt=e("biz_wap/utils/position.js"),Mt=e("appmsg/set_font_size.js"),Nt=e("biz_wap/utils/jsmonitor_report.js"),Rt=!window.isPaySubscribe||window.isPaySubscribe&&window.isPaid,Dt={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0,
Useruin:1*window.user_uin
},zt=0,Ft=1*window.user_uin;
try{
zt=1*window.atob(window.biz);
}catch(Ot){}
var qt={
BizUin:zt,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0
},Ut={
bizuin:zt,
msgid:window.parseInt(window.mid,10)||0,
itemidx:window.parseInt(window.idx,10)||0,
scene:window.parseInt(window.source,10)||0
},Wt={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},Gt=void 0,Yt=void 0,Vt=void 0,Qt=void 0,Jt=void 0,Xt=void 0,Zt=window.comment_id,$t=0,Kt=void 0,en=!1,tn="",nn=!1,on=0,dn=[],ln={},an=[],sn="",mn="我",rn=0,cn={},_n=Date.now(),pn=void 0,un=void 0,gn=0,yn=!1,fn=!1,wn=[],hn=[],Cn=void 0,jn=void 0,vn=100,bn=location.href,In=St.is_wxwork,Bn=yt.os.pc&&!In,En="comment_editing",kn="my_comment_empty_data",Tn=navigator.userAgent.indexOf("MicroMessenger")>-1,xn=document.getElementById("js_cmt_area"),Pn=document.getElementById("js_friend_cmt_area"),An=document.getElementById("js_cmt_container"),Sn=bn.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1,Hn=e(Bn?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js"),Ln="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",Mn=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],Nn=window.location.protocol+"//itunes.apple.com/cn/app/id414478124?mt=8&ls=1",Rn=window.location.protocol+"//weixin.qq.com/d";
return window.pageCommentReportData&&window.pageCommentReportData.idkey&&(Sn&&console.log("init reportData"),
Wt=window.pageCommentReportData),"undefined"!=typeof window.comment_id?Zt=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(Zt=window.cgiData.comment_id),
Tn||(xn&&(xn.style.display="none"),Pn&&(Pn.style.display="none"),Zt=0),Sn&&console.info("[图文评论] 评论ID:",Zt),
ct(),{
initComment:rt,
getCommentData:P,
renderComment:x
};
});define("appmsg/like_and_share.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","pages/utils.js","appmsg/retry_ajax.js","biz_wap/utils/ajax.js","appmsg/set_font_size.js","common/comm_report.js","common/utils.js","biz_wap/utils/device.js","pages/similar_video_utils.js"],function(i,e,o,t){
"use strict";
var s=i("biz_common/dom/event.js"),n=i("biz_common/dom/class.js"),m=i("biz_wap/jsapi/core.js"),a=i("pages/utils.js"),l=a.formatReadNum,r=i("appmsg/retry_ajax.js"),d=(i("biz_wap/utils/ajax.js"),
i("appmsg/set_font_size.js")),w=i("common/comm_report.js"),p=i("common/utils.js"),_=i("biz_wap/utils/device.js"),u=(i("pages/similar_video_utils.js"),
function(i){
return document.getElementById(i);
}),c=function(i){
i.style.display="block";
},k={
likeNum:0,
isLike:0,
likeDom:u("like_old"),
likeNumDom:u("likeNum_old"),
shareDom:u("js_bottom_share"),
oprRightDom:u("js_bottom_opr_right"),
shareBottomBtn:u("js_bottom_share_btn"),
likeBottomBtn:u("js_bottom_zan_btn"),
similarZanCard:u("js_similar_video_card"),
overflowFontScale:1
},h=function(){
var i=0;
try{
i=1*window.atob(window.biz);
}catch(e){}
var o={
BizUin:i,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
EventType:4
};
w.report(19048,o);
},g=function(i){
n.removeClass(k.oprRightDom,"sns_opr_overflow");
var e=k.oprRightDom.getBoundingClientRect().width,o=k.oprRightDom.querySelectorAll(".js_media_tool_meta"),t=0;
if(o&&o.length)for(var s=0;s<o.length;s++)t=t+o[s].getBoundingClientRect().width+parseFloat(window.getComputedStyle(o[s]).marginLeft)+parseFloat(window.getComputedStyle(o[s]).marginRight);
t>=e?(i&&i.fontScale&&(k.overflowFontScale=i.fontScale),n.addClass(k.oprRightDom,"sns_opr_overflow")):n.removeClass(k.oprRightDom,"sns_opr_overflow");
},j=function(){
n.addClass(k.likeDom,"praised"),k.likeNum++;
var i=k.likeNumDom.innerHTML;
("10万+"!==i||"100k+"!==i)&&(k.likeNumDom.innerHTML=l(k.likeNum)),k.likeNumDom.style.display="";
},v=function(){
n.removeClass(k.likeDom,"praised"),k.likeNum--;
var i=k.likeNumDom.innerHTML;
k.likeNum>=0&&"10万+"!==i&&"100k+"!==i&&(k.likeNumDom.innerHTML=l(k.likeNum)),0===k.likeNum&&(k.likeNumDom.style.display="none");
},b=function(){
k.isLike=k.isLike?0:1,k.isLike?j():v(),r({
url:"/mp/appmsg_like?__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&like="+k.isLike+"&f=json&appmsgid="+window.appmsgid+"&itemidx="+window.itemidx,
data:{
scene:window.source,
appmsg_like_type:1,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
is_temp_url:window.is_temp_url||0,
style:0
},
type:"POST"
});
};
s.on(k.likeDom,"click",function(){
return k.likeBottomBtn&&k.likeBottomBtn.disabled===!0?void 0:window.is_temp_url?void("5"!==window.item_show_type||!p.isNativePage()||_.os.pc?window.weui.alert("预览状态下无法操作"):t("预览状态下无法操作")):void b();
}),s.on(k.shareDom,"click",function(){
k.shareBottomBtn&&k.shareBottomBtn.disabled===!0||(h(),m.invoke("handleMPPageAction",{
action:"share"
}));
});
var D=function(){
g(),d.onFontScaleChange(g),window.addEventListener("resize",g);
},f=function(i){
var e=i.shareShow,o=i.likeShow,t=i.likeNum,s=i.isLike,m=i.shareGray,a=i.likeGray;
k.likeNum=t,k.isLike=s,e&&k.shareDom&&c(k.shareDom),m&&k.shareBottomBtn&&(k.shareBottomBtn.disabled=!0),
o&&k.likeDom&&c(k.likeDom),a&&k.likeBottomBtn&&(k.likeBottomBtn.disabled=!0),o&&k.likeNumDom&&0!==t&&(k.likeNumDom.innerHTML=l(k.likeNum),
k.likeNumDom.style.display="",s&&n.addClass(k.likeDom,"praised")),D();
};
return{
initLikeShareDom:f
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js","appmsg/loading.js","biz_wap/utils/device.js","appmsg/pay_report_utils.js","pages/utils.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,i){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:i||"success"
});
}
function initLikeEvent(opt){
function show(e){
e.style.display="";
}
function hide(e){
e.style.display="none";
}
function vShow(e){
e.style.visibility="visible";
}
function vHide(e){
e.style.visibility="hidden";
}
function clear(e){
e.value="";
}
function showLoading(){
commonUtils.isNativePage()?showAppToast("发送中","loading"):Loading.show("发送中");
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):Loading.hide();
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function alert2(e){
"5"!==window.item_show_type||!commonUtils.isNativePage()||Device.os.pc?window.weui.alert(e):alert(e);
}
function failAlert(e){
return e&&e.length>maxLikeCommentWord?void alert2("想法不可以超过%s字".replace("%s",maxLikeCommentWord)):void alert2("网络异常，请稍后重试");
}
function isAppCommentAvailable(){
return mmversion.isWechat?Device.os.ipad?!1:mmversion.isInMiniProgram?!1:mmversion.isIOS&&mmversion.gtVersion("7.0.8")?!0:mmversion.isAndroid&&mmversion.gtVersion("7.0.8")?!0:commonUtils.isNativePage()&&(mmversion.isIOS||mmversion.isAndroid)?!0:!1:!1;
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,haokanLock=!1,startY,jumpWowLock=!1,el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_toastMsg=qs("js_toast_msg"),el_likeEducate=qs("js_like_educate"),el_friend_like=qs("js_friend_like_area"),el_go_wow=qs("js_go_wow"),el_likeComment=qs("js_like_comment"),el_bcommentPanel2=qs("js_comment_panel"),el_likeCommentShare=qs("js_like_comment_share"),el_likeCommentText=qs("js_comment_text"),el_commentCancel=qs("js_comment_cancel"),el_commentConfirm=qs("js_comment_confirm"),el_commentErrorMsg=qs("js_like_comment_msg"),el_commentCurrentCount=qs("js_like_current_cnt"),el_commentArea=qs("js_comment_area"),el_panelLikeTitle=qs("js_panel_like_title"),el_wowClosePanel=qs("wow_close_inform"),el_wowCloseAck=qs("wow_close_ack"),el_alertPanel=qs("js_alert_panel"),el_alertContent=qs("js_alert_content"),el_alertConfirm=qs("js_alert_confirm");
if(el_like&&el_likeNum){
window.appmsg_like_type&&2===window.appmsg_like_type?jsmonitorReport.setSum(114217,0,1):window.appmsg_like_type&&1===window.appmsg_like_type&&jsmonitorReport.setSum(114217,1,1);
var like_report=function(){
var e=el_like.getAttribute("like"),i=el_likeNum.innerHTML,t=parseInt(e)?parseInt(e):0,o=t?0:1,n=parseInt(i)?parseInt(i):0,s=opt.appmsgid||opt.mid,l=opt.itemidx||opt.idx;
if(t){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),n>0&&"100000+"!==i&&(el_likeNum.innerHTML=n-1==0?"赞":n-1);
}else if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==i&&(el_likeNum.innerHTML=n+1);else if(2===appmsg_like_type)return void initRecommendPanel();
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+o+"&f=json&appmsgid="+s+"&itemidx="+l,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
action_type:o?1:2,
device_type:window.devicetype
},
type:"POST"
});
},initRecommendPanel=function(){
sendRecommendAjax(1,"",1);
},isBeenUnvisible=function(e){
function i(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
}
return e.offsetTop+el_likeComment.offsetHeight-i()>=commonUtils.getInnerHeight()?!0:!1;
},disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var i=e.target;
"TEXTAREA"!==i.tagName&&"BUTTON"!==i.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var i=e.targetTouches||[];
if(i.length>0){
var t=i[0]||{};
startY=t.clientY;
}
},preventText=function(e){
var i=!1,t=e.changedTouches,o=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(t.length>0){
var l=t[0]||{},a=l.clientY;
i=a>startY&&0>=o?!1:startY>a&&o+n>=s?!1:!0,i||e.preventDefault();
}
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},validataComment=function(e,i){
var t=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,t,i);
},showEducatePanel=function(e,i,t){
show(el_likeComment);
var o=window.source||window.cgiData&&window.cgiData.source||0;
return o&&(o=parseInt(o,10),94===o)?void(e&&5===e&&hide(el_likeComment)):void(i||(show(el_likeEducate),
t&&t>0&&(el_friend_like.innerHTML="%s位朋友也在看,".replace("%s",t),document.getElementById("js_friend_like_word").innerText="前往“发现”-“看一看”浏览",
show(el_friend_like)),1===showType&&(hide(el_go_wow),hide(el_likeCommentShare)),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment),educateExpose()));
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"10万+"!==e&&(el_likeNum.innerHTML=formatReadNum(realLikeNum));
},setLike2Status=function(e,i,t){
var o="在看";
switch(showType){
case 1:
switch(prompted){
case 0:
showEducatePanel(e,i,t),show(el_likeComment),prompted=1;
break;

case 1:
hide(el_likeEducate),showToast(o);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),clear(el_likeCommentText),prompted){
case 0:
showEducatePanel(e,i,t),5===e&&hide(el_likeCommentShare);
break;

case 1:
(4===e||5===e)&&showToast(4===e?"已发送":o);
}
5!==e&&(4===e&&"none"!==el_likeEducate.style.display?hide(el_likeCommentShare):4===e?hide(el_likeComment):(show(el_commentArea),
show(el_likeCommentShare),1===prompted&&hide(el_likeEducate),show(el_likeComment),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment))),4!==e&&setBtnLike(),
prompted=1;
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
}),log("[Appmsg] zaikan set like success");
},unsetLike2Status=function(e){
1===e?setTimeout(function(){
alert2(" 已取消，想法已同步删除");
},20):showToast("已取消"),2===showType&&isShow(el_likeComment)&&hide(el_likeComment);
var i=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_likeComment&&hide(el_likeComment),
realLikeNum-=1,realLikeNum>=0&&"10万+"!==i&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),
log("[Appmsg] zaikan set unlike success");
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType){
if(!haokanLock){
log("[Appmsg] prepare to send appmsg like request"),showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
like?(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(12),action_type=type):(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(13),
action_type=2),ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
comment:comment?comment:"",
prompted:1,
style:clientType||showType,
action_type:action_type,
passparam:window.passparam,
request_id:(new Date).getTime(),
device_type:window.devicetype
},
type:"POST",
success:function success(res){
haokanLock=!1;
var data=eval("("+res+")");
hideLoading(),log("[Appmsg] success send appmsglike like "+like+" return value is "+JSON.stringify(res)),
0==data.base_resp.ret?(like?setLike2Status(type,data.is_eu_user,data.friend_like_num):unsetLike2Status(data.has_comment),
connectWithApp(like,comment,clientType)):failAlert(comment);
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
};
JSAPI.on("menu:haokan",function(e){
var i=0===parseInt(e.recommend)?0:1;
if(0===i)sendRecommendAjax(i,"",2,clientShowType);else{
var t="";
t=e.comment;
var o=1===e.scene?4:5;
sendRecommendAjax(i,t,o,clientShowType);
}
});
var connectWithApp=function(e,i){
var t={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:i?i:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(t)
},function(e){
console.log("handleHaokanAction",e);
}),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
});
},goWoW=function(){
jumpWowLock||(jumpToWowClickReport(),jumpWowLock=!0,JSAPI.invoke("handleHaokanAction",{
action:"jumpToWow",
extParams:JSON.stringify({
autoDropLoad:!0
})
},function(e){
jumpWowLock=!1,console.log("jumpToWow",e),e.err_msg&&"handleHaokanAction:fail_entrance_not_open"===e.err_msg?show(el_wowClosePanel):"handleHaokanAction:fail  action not support"===e.err_msg||"handleHaokanAction:fail, action not support"===e.err_msg?alert2("微信版本过低，暂不支持该操作"):"handleHaokanAction:ok"===e.err_msg&&hide(el_likeComment),
JSAPI.invoke("handleHaokanAction",{
action:actionString,
server_data:JSON.stringify({
origin:"mp",
autoDropLoad:!0
})
},function(e){
console.log("sendAutoDropLoad",e);
});
}));
},likeClickReport=function(){
ajax({
url:"/mp/appmsgreport?action=appmsglikeclickcomment&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
});
},likeExpose=function e(){
var i=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,t=qs("like3").offsetTop,o=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
i+commonUtils.getInnerHeight()>t&&t>=i&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+o+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
},educateExpose=function i(){
var e=(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,
opt.appmsgid||opt.mid),t=opt.itemidx||opt.idx,o=window.item_show_type,n=window.enterid||window.cgiData&&window.cgiData.enterid||"";
el_likeEducate&&"none"!=el_likeEducate.style.display&&commonUtils.getInnerHeight()>el_likeEducate.getBoundingClientRect().top&&el_likeEducate.getBoundingClientRect().top+el_likeEducate.getBoundingClientRect().height>0&&(ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,t,window.source,window.subscene,1,o,sessionid,n]
},
async:!1,
timeout:2e3
}),DomEvent.off(window,"scroll",i));
},jumpToWowClickReport=function(){
var e=opt.appmsgid||opt.mid,i=opt.itemidx||opt.idx,t=window.enterid||window.cgiData&&window.cgiData.enterid||"";
ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,i,window.source,window.subscene,2,window.item_show_type,sessionid,t]
},
async:!1,
timeout:2e3
});
};
DomEvent.on(el_alertConfirm,"click",function(){
el_alertPanel.style.display="none";
}),DomEvent.on(el_like,"click",function(e){
if(el_likeBtn.disabled!==!0){
if(window.is_temp_url)return void alert2("预览状态下无法操作");
var i=el_like.getBoundingClientRect();
return log("[Appmsg zaikan location] top: "+i.top+" left: "+i.left+" bottom: "+i.bottom+" right: "+i.right),
log("[Appmsg zaikan click] clientX: "+e.clientX+" clientY: "+e.clientY),e.currentTarget.classList.contains("js_disabled")?!1:(like_report(e),
!1);
}
}),DomEvent.on(el_wowCloseAck,"click",function(){
hide(el_wowClosePanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_commentConfirm,"mousedown",function(){
validataComment(el_likeCommentText,4);
}),DomEvent.on(el_commentCancel,"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_likeCommentShare,"click",function(){
return commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,1*window.item_show_type===10&&(el_panelLikeTitle.innerHTML=window.msg_title.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,"")),
show(el_bcommentPanel2),el_likeCommentText.focus(),el_commentConfirm.setAttribute("disabled","disabled"),
disableMove(),void likeClickReport());
}),DomEvent.on(el_likeCommentText,"focus",function(){}),DomEvent.on(el_likeCommentText,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose),DomEvent.on(window,"scroll",educateExpose),
DomEvent.on(el_go_wow,"click",goWoW);
var scrollToShow=function(e){
e.scrollIntoView(!1);
};
DomEvent.on(el_likeCommentText,"input",function(e){
var i=el_likeCommentText.value.replace(/^\s+|\s+$/g,"");
i.length>maxLikeCommentWord?(el_commentCurrentCount.innerHTML=i.length,vShow(el_commentErrorMsg)):vHide(el_commentErrorMsg),
i.length>0&&i.length<=maxLikeCommentWord?el_commentConfirm.removeAttribute("disabled"):el_commentConfirm.setAttribute("disabled","disabled"),
Device.os.ios&&e.data&&doubleInputChar.indexOf(e.data)>-1&&(focusTag=!0);
}),DomEvent.on(el_likeCommentText,"click",function(){
Device.os.ios&&focusTag&&(el_likeCommentText.blur(),el_likeCommentText.focus(),focusTag=!1);
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,o=i.likeNumDom,n=document.getElementById("js_like_btn");
t&&(t.style.display=i.likeAreaDisplayValue,t.style.visibility="",i.liked&&(1===appmsg_like_type?Class.addClass(t,i.className):Class.addClass(n,i.className)),
t.setAttribute("like",i.liked?"1":"0"),i.likeGray&&(n.disabled=!0));
var s=1===appmsg_like_type?"赞":"";
realLikeNum=i.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
o&&(o.innerHTML=realLikeNum)):2===appmsg_like_type&&(o.innerHTML=formatReadNum(realLikeNum));
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),Base64=require("biz_common/base64.js"),jsmonitorReport=require("biz_wap/utils/jsmonitor_report.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),Loading=require("appmsg/loading.js"),realLikeNum,clientShowType=5,Device=require("biz_wap/utils/device.js"),payReportUtils=require("appmsg/pay_report_utils.js"),_require=require("pages/utils.js"),formatReadNum=_require.formatReadNum,maxLikeCommentWord=200,focusTag=!1,doubleInputChar=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"];
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum
};
});define("appmsg/read.js",["pages/utils.js","biz_wap/utils/device.js"],function(e){
"use strict";
function i(e){
var i=e||{},n=1586325600,d="undefined"!=typeof window.ct?parseInt(window.ct,10):0;
if(i.show){
var s=i.readAreaDom,o=i.readNumDom;
s&&(s.style.display=i.readAreaDisplayValue);
var r=i.readNum||1,w=window.ori_send_time||window.cgiData&&window.cgiData.ori_send_time||0,p=/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),m=1566025200,u=1565971200,_=a.os.ios||p?m:u;
parseInt(w,10)>_&&window.item_show_type&&"5"===window.item_show_type&&(n>d?("en"!==window.LANG&&(document.getElementById("readTxt").innerText="播放"),
r=i.videouv||0):("en"!==window.LANG&&(document.getElementById("readTxt").innerText="观看"),
r=i.readNum||0)),1===window.appmsg_like_type?(parseInt(r,10)>1e5?r="100000+":"",
o&&(o.innerHTML=r)):2===window.appmsg_like_type&&(o.innerHTML=t(r),""===o.innerHTML&&(o.innerHTML="0"));
}
}
var n=e("pages/utils.js"),t=n.formatReadNum,a=e("biz_wap/utils/device.js");
return{
showReadNum:i
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("appmsg/related_article.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/related_article_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","common/utils.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","appmsg/i18n.js","common/comm_report.js","appmsg/related_article_feedback.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/set_font_size.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function t(){
return document.documentElement.scrollTop||document.body.scrollTop;
}
function i(e){
var t=document.createElement("div");
return t.innerHTML=e,t.childNodes;
}
function n(){
A.setSum(110809,24,1),h.report(18832,_extends({
Actiontype:2,
Type:2,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Mmversion:M,
Pos:0
},J));
}
function o(){
n();
var e="https://mp.weixin.qq.com/mp/relatedarticle?action=page&begin=0&article_url="+window.encodeURIComponent(location.href)+"&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sessionid="+(window.enterid||"")+"&enterid="+parseInt(Date.now()/1e3,0)+"&scene_from="+window.source+"&subscene_from="+window.subscene+"#wechat_redirect";
return v.isWechat?_.openUrlWithExtraWebview(e):window.open(e),!1;
}
function s(e){
e?(R.style.display="none",S.style.display=""):(R.style.display="",S.style.display="none");
}
function r(e){
L=!0,e&&(P.style.display=""),S.style.display="none",R.style.display="none";
}
function a(e){
var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=arguments.length<=2||void 0===arguments[2]?F:arguments[2];
u({
url:"/mp/relatedarticle?action=getlist&count="+n+"&begin="+t+"&article_url="+window.encodeURIComponent(location.href)+"&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx,
type:"GET",
dataType:"json",
success:function(s){
s&&s.list&&s.list.length>0&&(window.has_related_article=!0);
var a=function(){
if(s&&s.base_resp&&1*s.base_resp.ret===0)if(O=s.article_size||0,0===s.list.length)H?r(0!==t):y.addClass(E,"hide");else{
x.style.display="block";
var e=s.list.map(function(e){
if("en"===window.LANG)e.read_num_wording=f.dealLikeReadShow_en(e.read_num);else if(window.parseInt(e.read_num)>1e5)e.read_num_wording="10万+";else if(window.parseInt(e.read_num)>1e4&&window.parseInt(e.read_num)<=1e5){
var t=""+window.parseInt(e.read_num)/1e4,i=t.indexOf(".");
e.read_num_wording=-1===i?t+"万":t.substr(0,i)+"."+t.charAt(i+1)+"万";
}else e.read_num_wording=0===window.parseInt(e.read_num)?"":e.read_num;
var n=parseInt(e.pay_cnt,10);
return e.pay_cnt_wording=n>=1e4||1*e.is_pay_cnt_cut===1?"en"===window.LANG?"10k+":"1万+":n+"",
e;
});
k&&window.WX_BJ_REPORT.BadJs.report("list.length","list.length:"+e.length,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
isPc:H
},
uin:window.user_uin
}),e.length!==n&&window.WX_BJ_REPORT.BadJs.report("list is no match","list.length:"+e.length+"|count:"+n,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
list:e,
isPc:H
},
uin:window.user_uin
});
for(var a=c.tmpl(p,{
list:e,
reason:N,
begin:t
},!1),d=i(a),l=0;l<d.length;l++)B.appendChild(d[l].cloneNode(!0));
H?(s.list.length<n||s.article_size<=t+n)&&r(0!==t):s.article_size===n?(W=!1,y.addClass(E,"hide")):s.article_size>n&&(W=!0,
y.removeClass(E,"hide"),w.on(E,"click",o)),window.ipados13_font_scale&&I(B,window.ipados13_font_scale/100);
}
};
"function"==typeof e?e("sucess",a):a();
},
error:function(){
"function"==typeof e&&e("error");
}
});
}
function d(){
for(var e=document.getElementsByClassName("js_related_item"),i=t(),n=0;n<e.length;n++){
var o=e[n];
1*o.getAttribute("data-hasreport")!==1&&o.clientHeight+o.offsetTop>=i+o.clientHeight/2&&o.clientHeight+o.offsetTop<=i+o.clientHeight/2+g.getInnerHeight()&&!function(e,t){
var i=e.getAttribute("data-url"),n=e.getAttribute("data-time"),o=e.getAttribute("data-recalltype"),s=e.getAttribute("data-isreaded");
e.setAttribute("data-hasreport",1),A.setSum(110809,21,1),h.report(18832,_extends({
Actiontype:1,
Type:1,
Bizuin:b.getQuery("__biz",i),
Msgid:window.parseInt(b.getQuery("mid",i),10)||0,
Itemidx:window.parseInt(b.getQuery("idx",i),10)||0,
Sendtimestamp:window.parseInt(n)||0,
Pos:t+1,
Recalltype:1*o,
Mmversion:M,
Isreaded:1*s
},J));
}(o,n);
}
O>1&&1*E.getAttribute("data-hasreport")!==1&&E.clientHeight+E.offsetTop>=i+E.clientHeight/2&&E.clientHeight+E.offsetTop<=i+E.clientHeight/2+g.getInnerHeight()&&!function(e){
e.setAttribute("data-hasreport",1),A.setSum(110809,22,1),h.report(18832,_extends({
Actiontype:1,
Type:2,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Mmversion:M,
Pos:0
},J));
}(E);
}
function l(){
n(),s(!0),Q+=F,a(function(e,t){
s(!1),"sucess"===e&&t();
},Q);
}
function m(){
w.on(B,"click",".js_related_item",function(e){
var t=e.delegatedTarget,i=t.getAttribute("data-url"),n=t.getAttribute("data-time"),o=t.getAttribute("data-recalltype"),s=t.getAttribute("data-isreaded"),r=(1*t.getAttribute("data-idx")||0)+1;
A.setSum(110809,23,1),h.report(18832,_extends({
Actiontype:2,
Type:1,
Bizuin:b.getQuery("__biz",i),
Msgid:window.parseInt(b.getQuery("mid",i),10)||0,
Itemidx:window.parseInt(b.getQuery("idx",i),10)||0,
Sendtimestamp:window.parseInt(n)||0,
Pos:r,
Recalltype:1*o,
Isreaded:1*s,
Mmversion:M
},J)),v.isWechat?_.openUrlWithExtraWebview(i):window.open(i);
}),w.on(B,"touchstart",".js_related_item",function(e){
e.stopPropagation();
var t=e.delegatedTarget;
y.addClass(t,"card_custom_active");
},!1),w.on(B,"touchend",".js_related_item",function(e){
e.stopPropagation();
var t=e.delegatedTarget;
y.removeClass(t,"card_custom_active");
},!1),w.on(window,"scroll",d),H&&(w.on(R,"click",l),w.on(C,"click",function(){
C.style.display="none",l();
})),j.init({
container:B,
biz:window.biz,
mid:window.mid,
idx:window.idx,
dislikeCb:function(e){
1===B.children.length&&(H&&!L?(R.style.display="none",C.style.display=""):!H&&W?(B.style.display="none",
E.style.display="none",T.style.display="",w.off(E,"click",o),w.on(T,"click",o)):x.style.display="none"),
e.parentNode.removeChild(e);
}
});
}
e("biz_common/utils/string/html.js");
var c=e("biz_common/tmpl.js"),u=e("biz_wap/utils/ajax.js"),p=e("appmsg/related_article_tpl.html.js"),_=e("biz_wap/utils/openUrl.js"),w=e("biz_common/dom/event.js"),g=e("common/utils.js"),y=e("biz_common/dom/class.js"),b=e("biz_common/utils/url/parse.js"),f=e("appmsg/i18n.js"),h=e("common/comm_report.js"),j=e("appmsg/related_article_feedback.js"),v=e("biz_wap/utils/mmversion.js"),z=e("biz_wap/utils/device.js"),I=e("appmsg/set_font_size.js").setFontSize,A=e("biz_wap/utils/jsmonitor_report.js"),x=document.getElementById("js_related_area"),B=document.getElementById("js_related"),E=document.getElementById("js_related_load_more"),T=document.getElementById("js_more_article"),R=document.getElementById("js_related_load_more_pc"),S=document.getElementById("js_related_loading_pc"),C=document.getElementById("js_more_article_pc"),P=document.getElementById("js_related_all_pc"),k=100*Math.random()<1;
k&&window.WX_BJ_REPORT.BadJs.report("relatedArticleFlag","value:"+window.relatedArticleFlag,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var H=z.os.ipad||!v.isIOS&&!v.isAndroid,M=0;
v.isIOS?M=1:v.isAndroid&&(M=2);
var O=0,W=!1,J={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0
},N=[{
name:"内容质量低",
value:1
},{
name:"不看此公众号",
value:2
}],F=1;
if(H)F=3;else if(window.user_uin){
var U=Number((window.user_uin+"").slice(-5,-2));
F=U>=50&&150>U?3:1;
}else F=1;
k&&window.WX_BJ_REPORT.BadJs.report("RELATED_ARTICLE_COUNT","count:"+F,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var L=!1,Q=0;
return H&&(document.getElementById("js_related_opr").style.display="none",document.getElementById("js_related_opr_pc").style.display=""),
m(),a;
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function t(e){
function t(e){
for(var t=window.location.href,i=t.indexOf("?"),s=t.substr(i+1),_=s.split("&"),n=0;n<_.length;n++){
var a=_[n].split("=");
if(a[0].toUpperCase()==e.toUpperCase())return a[1];
}
return"";
}
var o={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
album_id:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
more_read_type:0,
rtId:"",
rtKey:"",
appmsg_like_type:1,
related_video_sn:"",
vid:"",
is_pay_subscribe:0,
pay_subscribe_uin_count:0,
has_red_packet_cover:0,
related_video_num:4,
album_video_num:5,
onSuccess:function(){},
onError:function(){}
};
for(var d in e)e.hasOwnProperty(d)&&(o[d]=e[d]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),s({
url:"/mp/getappmsgext?f=json&mock="+t("mock"),
data:{
r:Math.random(),
__biz:o.biz,
appmsg_type:o.appmsg_type,
mid:o.mid,
sn:o.sn,
idx:o.idx,
scene:o.scene,
title:encodeURIComponent(o.title.htmlDecode()),
ct:o.ct,
abtest_cookie:o.abtest_cookie,
devicetype:o.devicetype.htmlDecode(),
version:o.version.htmlDecode(),
is_need_ticket:o.is_need_ticket,
is_need_ad:o.is_need_ad,
comment_id:o.comment_id,
is_need_reward:o.is_need_reward,
both_ad:o.both_ad,
reward_uin_count:o.is_need_reward?o.reward_uin_count:0,
send_time:o.send_time,
msg_daily_idx:o.msg_daily_idx,
is_original:o.is_original,
is_only_read:o.is_only_read,
req_id:o.req_id,
pass_ticket:o.pass_ticket,
is_temp_url:o.is_temp_url,
item_show_type:o.item_show_type,
tmp_version:1,
more_read_type:o.more_read_type,
appmsg_like_type:o.appmsg_like_type,
related_video_sn:o.related_video_sn,
related_video_num:o.related_video_num,
vid:o.vid,
is_pay_subscribe:o.is_pay_subscribe,
pay_subscribe_uin_count:o.pay_subscribe_uin_count,
has_red_packet_cover:o.has_red_packet_cover,
album_id:0x11fd1c7c75070000,
album_video_num:o.album_video_num
},
type:"POST",
dataType:"json",
rtId:o.rtId,
rtKey:o.rtKey,
rtDesc:_,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),i("[Appmsg] success get async data"),
"function"==typeof o.onSuccess&&o.onSuccess(e),e)try{
i("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else i("[Appmsg] success get async data, async data is empty");
if(!a&&"5"===window.item_show_type){
var s=Date.now()-window.logs.pagetime.page_begin;
if(a=!0,Math.random()>.1)return;
n.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:29,
time:s
}]
}),n.send();
}
},
error:function(){
i("[Appmsg] error get async data, biz="+o.biz+", mid="+o.mid),"function"==typeof o.onError&&o.onError();
},
complete:function(){
"function"==typeof o.onComplete&&o.onComplete();
}
});
}
var i=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),_=e("rt/appmsg/getappmsgext.rt.js"),n=e("biz_common/utils/wxgspeedsdk.js"),a=void 0;
return{
getData:t
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function i(i){
i=i||window;
var n=i.cgiData;
return n&&2==n.ori_status&&1==n.is_mp_video&&(n.nick_name||n.hit_username)?!0:!1;
}
function n(i){
return i=i||window,!1;
}
function e(){
return!1;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var i;
if(parent==window)i=window;else try{
{
parent.window.__videoDefaultRatio;
}
i=parent.window;
}catch(n){
i=window;
}
var e=i.__videoDefaultRatio||16/9;
return"54"==i.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:n,
showReprint:i,
getRatio:o
};
});define("pages/create_txv.js",["biz_wap/utils/jsmonitor_report.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function o(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
n(e);
});
}
function n(e){
var o=function(){},n=function(){};
"function"==typeof e.onSuccess&&(n=e.onSuccess),"function"==typeof e.onError&&(o=e.onError),
r.Load({
url:a.jsUrl,
version:a.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,c=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(c=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1))):(c=!1,
0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1))),
c){
var d=t({
win:u,
options:e
});
n({
player:d
});
}else r.ClearCache({
win:u,
version:a.jsVersion,
url:a.jsUrl
}),o();
},
onError:function(o){
0==o.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==o.code?i.setSum("64728","119",1):52==o.code?i.setSum("64728","120",1):53==o.code&&i.setSum("64728","121",1)),
s(e);
}
});
}
function t(e){
var o=e.win||window,n=e.options,t=new o.Txp.Player({
containerId:n.containerId,
vid:n.vid,
width:n.width,
height:n.height,
autoplay:n.autoplay===!0?!0:!1,
allowFullScreen:n.allowFullScreen===!0?!0:!1,
chid:17
});
return t;
}
function s(e){
var o=function(){},n=function(){};
"function"==typeof e.onSuccess&&(n=e.onSuccess),"function"==typeof e.onError&&(o=e.onError);
var s=a.jsUrl;
s+=-1==s.indexOf("?")?"?"+a.customerParam+"="+a.jsVersion:"&"+a.customerParam+"="+a.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1);
var r=t({
win:e.win,
options:e
});
n({
player:r
});
}else i.setSum("64728","123",1),o();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
a.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
a.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
a.jsLoadState=6,i.setSum("64728","127",1);
}
o();
}
});
}
var i=e("biz_wap/utils/jsmonitor_report.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),a={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return{
createTxVideo:n,
createGlobalFunc:o
};
});