define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function s(e){
function s(e){
for(var s=window.location.href,t=s.indexOf("?"),i=s.substr(t+1),_=i.split("&"),a=0;a<_.length;a++){
var n=_[a].split("=");
if(n[0].toUpperCase()==e.toUpperCase())return n[1];
}
return"";
}
var r={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
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
onSuccess:function(){},
onError:function(){}
};
for(var d in e)e.hasOwnProperty(d)&&(r[d]=e[d]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),i({
url:"/mp/getappmsgext?f=json&mock="+s("mock"),
data:{
r:Math.random(),
__biz:r.biz,
appmsg_type:r.appmsg_type,
mid:r.mid,
sn:r.sn,
idx:r.idx,
scene:r.scene,
title:encodeURIComponent(r.title.htmlDecode()),
ct:r.ct,
abtest_cookie:r.abtest_cookie,
devicetype:r.devicetype.htmlDecode(),
version:r.version.htmlDecode(),
is_need_ticket:r.is_need_ticket,
is_need_ad:r.is_need_ad,
comment_id:r.comment_id,
is_need_reward:r.is_need_reward,
both_ad:r.both_ad,
reward_uin_count:r.is_need_reward?r.reward_uin_count:0,
send_time:r.send_time,
msg_daily_idx:r.msg_daily_idx,
is_original:r.is_original,
is_only_read:r.is_only_read,
req_id:r.req_id,
pass_ticket:r.pass_ticket,
is_temp_url:r.is_temp_url,
item_show_type:r.item_show_type,
tmp_version:1,
more_read_type:r.more_read_type,
appmsg_like_type:r.appmsg_like_type,
related_video_sn:r.related_video_sn,
vid:r.vid,
is_pay_subscribe:r.is_pay_subscribe,
pay_subscribe_uin_count:r.pay_subscribe_uin_count,
has_red_packet_cover:r.has_red_packet_cover
},
type:"POST",
dataType:"json",
rtId:r.rtId,
rtKey:r.rtKey,
rtDesc:_,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),t("[Appmsg] success get async data"),
"function"==typeof r.onSuccess&&r.onSuccess(e),e)try{
t("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(s){}else t("[Appmsg] success get async data, async data is empty");
if(!n&&"5"===window.item_show_type){
var i=Date.now()-window.logs.pagetime.page_begin;
if(n=!0,Math.random()>.1)return;
a.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:29,
time:i
}]
}),a.send();
}
},
error:function(){
t("[Appmsg] error get async data, biz="+r.biz+", mid="+r.mid),"function"==typeof r.onError&&r.onError();
}
});
}
var t=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),_=e("rt/appmsg/getappmsgext.rt.js"),a=e("biz_common/utils/wxgspeedsdk.js"),n=void 0;
return{
getData:s
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function n(n){
n=n||window;
var i=n.cgiData;
return i&&2==i.ori_status&&1==i.is_mp_video&&(i.nick_name||i.hit_username)?!0:!1;
}
function i(n){
return n=n||window,!1;
}
function e(){
return-1!=r.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var n;
if(parent==window)n=window;else try{
{
parent.window.__videoDefaultRatio;
}
n=parent.window;
}catch(i){
n=window;
}
var e=n.__videoDefaultRatio||16/9;
return"54"==n.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:i,
showReprint:n,
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
});define("appmsg/pay_read_utils.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js","appmsg/pay_report_utils.js","common/utils.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),a=e("biz_common/dom/event.js"),i=e("biz_wap/utils/mmversion.js"),n=e("appmsg/pay_report_utils.js"),t=e("common/utils.js"),o=function(e){
var r=arguments.length<=1||void 0===arguments[1]?document:arguments[1];
return r.querySelector(e);
},s=document.documentElement&&document.documentElement.clientWidth||window.innerWidth;
try{
var d=o("#img-content");
if(d){
var w=d.getBoundingClientRect();
w.width&&(s=w.width);
}
}catch(_){
console.error(_);
}
var p=32,u=8,c='<div class="pay__tag-reward js_reward"></div>',l={
dom:{
payFee:[o("#js_pay_panel .js_pay_fee"),o("#js_pay_panel_bottom .js_pay_fee")],
wrap:o("#js_pay_wall_wrap"),
payNum:o("#js_pay_num"),
rewardNumWrap:o("#js_pay_reward_num_wrap"),
rewardNum:o("#js_pay_reward_num"),
wall:o("#js_pay_wall")
},
perLine:null,
data:{}
},m=function(e){
e&&(/^http/.test(e)||(e=location.protocol+"//"+location.host+e),e.indexOf("#")<0&&(e+="#wechat_redirect"),
-1!==navigator.userAgent.indexOf("MicroMessenger")&&(i.isIOS||i.isAndroid||i.isWp)?r.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(r){
-1===r.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e);
},f=function(){
var e=l.dom,r=l.data;
e.payNum.innerHTML=r.pay_cnt+(r.is_pay_cnt_cut?"+":""),r.rewardTotal?(e.rewardNum.innerHTML=r.rewardTotal+(r.rewardTotalCut?"+":""),
e.rewardNumWrap.style.display=""):e.rewardNumWrap.style.display="none";
for(var a=3*l.perLine,i="",n=0,t=r.pay_head_imgs.length;t>n;n++){
var o=r.reward_status_list?r.reward_status_list[n]:0;
if(i+='<div class="pay__avatar-wrp"><img src="'+r.pay_head_imgs[n]+'">'+(o?c:"")+"</div>",
n>=a-1)break;
}
e.wall.innerHTML=i;
},y=function(){
var e=l.dom;
a.tap(e.payNum,function(){
m("/mp/paysub?action=evaluate_show_page&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&link="+encodeURIComponent(window.msg_link)+"&from_scene="+window.source+"&from_subscene="+window.subscene+"&is_fans="+window.isFans);
}),a.tap(e.rewardNum,function(){
var e=(Math.ceil((t.getInnerHeight()-188)/42)+1)*Math.floor((s-15)/42);
m("/mp/reward?act=getrewardheads&__biz="+window.biz+"&appmsgid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&offset=0&count="+e+"&source=1");
});
},g=function(e,r,a){
if(window.isPaySubscribe){
var t=l.dom;
if(e=JSON.parse(JSON.stringify(e)),!e.fee||window.isPaid||window.IAPProductInfo||!function(){
var r=Math.floor(e.fee/100);
t.payFee.forEach(function(e){
e.innerHTML="￥"+r+".00",e.parentNode.dataset.ready=1;
});
}(),i.isIOS&&e.fee&&(window.IAPProductInfo?("CNY"!==window.IAPProductInfo.currencyCode&&n.report110809(40),
n.reportOverseaPay(window.IAPProductInfo.currencyCode,100*window.IAPProductInfo.price.toFixed(2),1,window.IAPProductInfo.invokeTime,window.IAPProductInfo.countryCode,0,window.IAPProductInfo.err_msg+(window.IAPProductInfo.err_desc?"__"+window.IAPProductInfo.err_desc:""))):window.oriProductFee=Math.floor(e.fee/100)),
e.pay_cnt){
if(e.is_paid){
e.pay_head_imgs.unshift(e.my_head_img),e.reward_status_list instanceof Array?e.reward_status_list.unshift(e.my_reward_status):e.reward_status_list=[e.my_reward_status];
var o=3*l.perLine;
e.pay_head_imgs.length>o&&(e.pay_head_imgs=e.pay_head_imgs.slice(0,o));
}
e.rewardTotal=r.rewardTotal,e.rewardTotalCut=r.rewardTotalCut,l.data=e,t.wrap.style.height="",
t.wrap.style.marginTop="",t.wrap.style.visibility="visible",f(),!a&&y();
}else t.wrap.style.display="none";
}
},h=function(){
if(!window.isPaySubscribe)return 0;
if(null===l.perLine){
var e=p+u;
l.perLine=Math.floor(.8*s/e),l.dom.wall.parentNode.style.width=l.perLine*e-u+"px";
}
return l.perLine;
};
return{
init:g,
getCountPerLine:h
};
});define("appmsg/reward_utils.js",["biz_wap/ui/weui.js","appmsg/reward_entry.js","biz_wap/utils/mmversion.js","biz_common/dom/class.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var r=e("appmsg/reward_entry.js"),n=e("biz_wap/utils/mmversion.js"),a=e("biz_common/dom/class.js"),i=e("biz_common/dom/event.js"),t=window.navigator.userAgent,d={
perLine:0,
hasBindResize:!1,
hasInit:!1,
pageContainerId:"img-content",
rewardInnerId:"js_reward_inner"
},s=function(e){
return document.getElementById(e);
},o=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.pageContainerId||d.pageContainerId,n=e.rewardInnerId||d.rewardInnerId,a=window.innerWidth||document.documentElement.clientWidth;
try{
var i=s(r).getBoundingClientRect();
i.width&&(a=i.width);
}catch(t){}
var o=36;
d.perLine=Math.floor(.8*a/o);
var w=s(n);
return w&&(w.style.width=d.perLine*o+"px"),d.perLine;
},w=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=e.pageContainerId||d.pageContainerId,a=e.rewardInnerId||d.rewardInnerId;
return e.can_reward&&s(n)&&s(a)?(d.hasBindResize||!function(){
d.hasBindResize=!0;
var n=window.innerWidth;
i.on(window,"resize",function(){
window.innerWidth!==n&&(n=window.innerWidth,o(e),d.hasInit&&r.render(d.perLine));
});
}(),d.perLine||o(e),d.perLine):0;
},_=function(e,o){
d.hasInit=!0;
var _=e.author_id||window.author_id;
e.reward_head_imgs=e.reward_head_imgs||[];
var m=s("js_author_name");
if(o.reward_entrance_enable_for_preview)if(n.isInMiniProgram)n.isInMiniProgram&&m&&a.removeClass(m,"rich_media_meta_link");else{
if(_||n.isAndroid){
var u=s("js_preview_reward_author");
u&&(u.style.display="block");
var p=s("js_preview_reward_author_wording");
o.reward_wording&&p&&(p.innerText=o.reward_wording,p.style.display="block");
var h=s("js_preview_reward_author_link");
h&&i.on(h,"tap",function(e){
e.preventDefault(),window.weui.alert("预览状态下无法操作");
});
}
if(_){
var l=s("js_preview_reward_author_avatar"),c=s("js_preview_reward_author_head");
o.reward_author_head&&l&&c&&(c.setAttribute("src",o.reward_author_head),l.style.display="block");
var v=s("js_preview_reward_link_text");
v&&(v.innerText="喜欢作者");
}else n.isAndroid&&(s("js_preview_reward_author_name").style.display="none");
}else!n.isInMiniProgram&&(t.indexOf("WindowsWechat")>-1||n.isIOS||n.isAndroid)?(r.handle(e,w({
pageContainerId:o.pageContainerId,
rewardInnerId:o.rewardInnerId,
can_reward:1==e.can_reward?!0:!1
})),m&&e.rewardsn&&e.timestamp&&(m.setAttribute("data-rewardsn",e.rewardsn),m.setAttribute("data-timestamp",e.timestamp),
m.setAttribute("data-canreward",e.can_reward)),m&&!e.can_reward&&a.removeClass(m,"rich_media_meta_link")):m&&a.removeClass(m,"rich_media_meta_link");
};
return{
init:_,
getCountPerLine:w
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("biz_common/utils/monitor.js",[],function(){
"use strict";
function t(t,r){
if(null===t)return{};
for(var o={},e=Object.keys(t),n=0;n<e.length;n++){
var i=e[n];
r.indexOf(i)>=0||(o[i]=t[i]);
}
return o;
}
function r(t){
var r=[],o=null;
for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.push(o+"="+encodeURIComponent(t[o]));
return r.join("&");
}
var o=[],e="/mp/jsmonitor?#wechat_redirect",n={};
return window.__monitor?window.__monitor:(n._reportOptions={
idkey:{}
},n.getReportData=function(t){
t=t||{};
var r,e,i=n._reportOptions.idkey||{},p=null;
try{
for(p in i)Object.prototype.hasOwnProperty.call(i,p)&&i[p]&&o.push(p+"_"+i[p]);
}catch(a){
return!1;
}
if(0===o.length)return!1;
try{
var c=n._reportOptions;
if(null!==c&&void 0!==c)for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(r[e]=c[e]);
}catch(a){
r={};
}
return r.idkey=o.join(";"),r.t=Math.random(),t.remove!==!1&&(o=[],n._reportOptions={
idkey:{}
}),r;
},n.setLogs=function(r){
var o=r.id,e=r.key,i=r.value,p=t(r,["id","key","value"]),a=n._reportOptions.idkey||{},c=o+"_"+e;
a[c]?a[c]+=i:a[c]=i,n._reportOptions.idkey=a;
try{
if(null!==p&&void 0!==p)for(var s in p)Object.prototype.hasOwnProperty.call(p,s)&&(n._reportOptions[s]=p[s]);
}catch(u){
console.log(u);
}
return n;
},n.setAvg=function(t,r,o){
var e=n._reportOptions.idkey||{},i=t+"_"+r,p=t+"_"+(r-1);
return e[i]?e[i]+=o:e[i]=o,e[p]?e[p]+=1:e[p]=1,n._reportOptions.idkey=e,n;
},n.setSum=function(t,r,o){
var e=n._reportOptions.idkey,i=t+"_"+r;
return e[i]?e[i]+=o:e[i]=o,n._reportOptions.idkey=e,n;
},n.send=function(t,o){
t!==!1&&(t=!0);
var i=n.getReportData();
i&&(o&&o instanceof Function?o({
url:e,
type:"POST",
mayAbort:!0,
data:i,
async:t,
timeout:2e3
}):(new Image).src=location.origin+"/mp/jsmonitor?"+r(i)+"#wechat_redirect");
},window.__monitor=n,n);
});define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(e){
if(!e)return null;
var t=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return t?t[2]:null;
}
function n(e){
if(window.hasChannelTwoTab&&v.isNewNativePage()){
var t=void 0;
t=document.getElementById("tab").offsetTop-window.minHeight;
var n=document.body.offsetHeight,o=v.getInnerHeight()+t;
if(o>n){
var i=t+v.getInnerHeight()-document.body.offsetHeight,a=document.createElement("div");
a.setAttribute("class","empty_comment_element"),a.style.cssText="height: "+i+"px;",
document.getElementById(e).appendChild(a);
}
window.minMountHeight=o;
}
}
function o(e){
for(var t=window.location.href,n=t.indexOf("?"),o=t.substr(n+1),i=o.split("&"),a=0;a<i.length;a++){
var r=i[a].split("=");
if(r[0].toUpperCase()==e.toUpperCase())return r[1];
}
return"";
}
function i(e,t){
g.invoke("createWebViewForFastLoad",{
scene:1
},function(){
e.forEach(function(e){
g.invoke("downloadPageDataForFastLoad",{
itemList:[{
item_show_type:5,
url:e[t]
}]
},function(e){
console.log(e);
});
});
});
}
function a(e,t,n){
var o=void 0;
return function(){
var i=this,a=arguments,r=function(){
o=null,n||e.apply(i,a);
},c=n&&!o;
clearTimeout(o),o=setTimeout(r,t),c&&e.apply(i,a);
};
}
function r(e){
var t=parseInt(e,10),n=0,o=0;
t>60&&(n=parseInt(t/60,10),t=parseInt(t%60,10),n>60&&(o=parseInt(n/60,10),n=parseInt(n%60,10))),
10>t&&(t="0"+t);
var i=":"+t;
return n>0?(10>n&&(n="0"+n),i=n+i):i="00"+i,o>0&&(0===parseInt(o,10)?o="":10>o&&(o="0"+o),
i=""+o+":"+i),i;
}
function c(e){
var t="";
if(parseInt(e,10)>1e5)t="10万+";else if(parseInt(e,10)>1e4&&parseInt(e,10)<=1e5){
var n=""+parseInt(e,10)/1e4,o=n.indexOf(".");
t=-1===o?n+"万":n.substr(0,o)+"."+n.charAt(o+1)+"万";
}else t=0===parseInt(e,10)?"":e;
return t;
}
function s(e,t){
var n=void 0,o=void 0;
return function(){
var i=this,a=arguments,r=+new Date;
n&&n+t>r?(clearTimeout(o),o=setTimeout(function(){
n=r,e.apply(i,a);
},t)):(n=r,e.apply(i,a));
};
}
function m(){
var e=0,t=0,n=0;
return document.body&&(t=document.body.scrollTop),document.documentElement&&(n=document.documentElement.scrollTop),
e=t-n>0?t:n;
}
function u(){
var e=0,t=void 0,n=void 0;
return document.body&&(t=document.body.scrollHeight),document.documentElement&&(n=document.documentElement.scrollHeight),
e=t-n>0?t:n;
}
function l(){
var e=0;
return e="CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
var p=e("appmsg/appmsg_report.js"),d=e("biz_common/utils/emoji_data.js"),f=e("pages/version4video.js"),h=e("biz_wap/utils/mmversion.js"),g=e("biz_wap/jsapi/core.js"),w=e("biz_common/dom/event.js"),v=e("common/utils.js"),_={
inWechat:f.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,t=d.length;t>e;e++){
var n=d[e];
n.cn&&!_.emojiDataMap[n.cn]&&(_.emojiDataMap[n.cn]={
index:e
}),n.hk&&!_.emojiDataMap[n.hk]&&(_.emojiDataMap[n.hk]={
index:e
}),n.us&&!_.emojiDataMap[n.us]&&(_.emojiDataMap[n.us]={
index:e
});
}
}();
var b=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(_.emojiDataMap[e]&&d[_.emojiDataMap[e].index]){
var t=d[_.emojiDataMap[e].index];
return _.emojiImg.replace("#name#",e).replace("#style#",t.style);
}
return e;
}):e;
},j=function(e,t){
_.inWechat?_.windowWechat||_.macWechat?t===!0?window.parent.open(e):window.parent.location.href=e:g.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(n){
-1==n.err_msg.indexOf("ok")&&(t===!0?window.parent.open(e):window.parent.location.href=e);
}):t===!0?window.open(e):location.href=e;
},y=function(){
!_.inWechat||_.windowWechat||_.macWechat?window.close():g.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},W=function(e){
return document.getElementById(e);
},I=function(e){
return document.getElementsByClassName(e);
},x=function(e){
return e.replace(/^\s+|\s+$/g,"");
},k=function(e,t){
return(t||document).querySelector(e);
},T=function(e,t){
return(t||document).querySelectorAll(e);
},E=function(e){
var n=e.$container;
n&&!h.isInMiniProgram&&w.on(n,"tap",".js_go_profile",function(n){
var o=n.delegatedTarget;
o&&!function(){
var n=o.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(o),1==window.isprofileblock)g.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect");
});else{
var i=o.getAttribute("data-scene")||e.profile_scene||"";
p.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),console.log("channelSessionId"+t("channel_session_id")),g.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:i,
channelSessionId:t("channel_session_id")
},function(){});
}
}();
});
};
return{
jumpUrl:j,
closeWin:y,
trim:x,
getId:W,
qs:k,
qsAll:T,
inWechat:_.inWechat,
windowWechat:_.windowWechat,
macWechat:_.macWechat,
emojiFormat:b,
getParam:t,
go2ProfileEvent:E,
prepareNativePage:i,
debounce:a,
throttle:s,
formatReadNum:c,
formatSeconds:r,
setTwoTabHeight:n,
getByClass:I,
getScrollTop:m,
getScrollHeight:u,
getWindowHeight:l,
getQuery:o
};
});define("tpl/appmsg/loading.html.js",[],function(){
return'<div style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-loading weui-icon_toast"></i>\n    <p class="weui-toast__content js_loading_content"></p>\n  </div>\n</div>';
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});define("common/comm_report.js",["biz_wap/utils/ajax.js","biz_common/utils/comm_report.js"],function(o){
"use strict";
var r=o("biz_wap/utils/ajax.js"),t=o("biz_common/utils/comm_report.js");
return{
report:function(o,i,m){
t.report("wap",r,o,i,m);
}
};
});