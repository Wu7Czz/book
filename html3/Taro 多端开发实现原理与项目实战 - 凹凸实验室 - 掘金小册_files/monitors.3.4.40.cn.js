var monitors=function(t){"use strict";var d=function(){return(d=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function v(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function u(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}(arguments[e]));return t}function c(t){return"object"==typeof t&&null!==t&&!a(t)}function o(t){return"function"==typeof t}function l(t){return"[object String]"===Object.prototype.toString.call(t)}function a(t){return"[object Array]"===Object.prototype.toString.call(t)}function m(t){return"number"==typeof t}function s(t,e){if(c(t))for(var n in t)r=t,i=n,Object.prototype.hasOwnProperty.call(r,i)&&e.call(null,n,t[n]);var r,i}function n(){if("fetch"in window)try{return new Headers,new Request(""),new Response,1}catch(t){return}}function e(){return!!c(window)}function i(){return!(!e()||!c(window.performance))}function p(){return!(!i()||!c(window.performance.timing))}function f(){return!(!i()||!o(window.performance.getEntries))}function r(){return!(!o(requestAnimationFrame)||!o(cancelAnimationFrame))}function h(){return!(!window.setTimeout||!o(setTimeout))}function y(){return e()&&"function"==typeof window.PerformanceObserver}function g(){return y()&&o(window.PerformanceLongTaskTiming)}function b(){return y()&&o(window.PerformanceResourceTiming)}function w(){if(y()){var t=window.PerformanceObserverEntryList;return o(t)&&o(t.prototype.getEntries)}}function T(t){var n,e=function(t){if(!c(t))return{};var n={};return s(t,function(t,e){c(e)||a(e)?n[t]=JSON.stringify(e):n[t]=e}),n}(t),r=(n={},s(e,function(t,e){n[encodeURIComponent(t)]=encodeURIComponent(e)}),n),i=[];return s(r,function(t,e){i.push(t+"="+e)}),i.join("&")}function S(t){var e=document.createElement("a");e.href=t;var n=e.pathname||"/";return"/"!==n[0]&&(n="/"+n),{href:e.href,protocol:e.protocol.slice(0,-1),hostname:e.hostname,host:e.host,search:e.search,pathname:n,hash:e.hash}}function k(){}function L(e,n){o(e)&&(o(window.addEventListener)&&(window.addEventListener("unload",e),window.addEventListener("beforeunload",e),window.addEventListener("pagehide",e)),o(document.addEventListener)&&document.addEventListener("visibilitychange",function(t){o(n)?n(t):"hidden"===document.visibilityState&&e(t)}))}function M(){return(new Date).getTime()}var P=(E.post=function(t,e,n){var r,i,o=null!==(r=null==n?void 0:n.success)&&void 0!==r?r:k,s=null!==(i=null==n?void 0:n.fail)&&void 0!==i?i:k,a=new XMLHttpRequest;a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify(e)),a.onload=function(){try{var t;this.responseText?(t=JSON.parse(this.responseText),o(t)):o({})}catch(t){s()}},a.onerror=function(){s()},a.onabort=function(){s()}},E.get=function(t,e){var n,r,i,o,s=null!==(n=null==e?void 0:e.success)&&void 0!==n?n:k,a=null!==(r=null==e?void 0:e.fail)&&void 0!==r?r:k,u=null!==(i=null==e?void 0:e.getResponse)&&void 0!==i?i:k,c=null!==(o=null==e?void 0:e.getResponseText)&&void 0!==o?o:k,l=new XMLHttpRequest;l.open("GET",t),l.send(),l.onload=function(){u(null==this?void 0:this.response),c(this.responseText);try{var t;this.responseText?(t=JSON.parse(this.responseText),s(t)):s({})}catch(t){a()}},l.onerror=function(){a()},l.onabort=function(){a()}},E.prototype.getCommonParams=function(){return{timestamp:Date.now()}},E);function E(t){var r=this;this.postEvent=function(t){var e=d(d({},t),r.getCommonParams());E.post(r.url,e)},this.getEvent=function(t){var e=T(d(d({},t),r.getCommonParams())),n=r.url+"?"+e;E.get(n)},this.getURL=function(){return r.url},this.options=t,this.url=this.options.reportURL}function C(){return o(Date)?Math.round(Date.now()/1e3):0}function R(t,n){if(!c(t))return{};if(!o(n))return{};var r={};return s(t,function(t,e){n(e)&&(r[t]=e)}),r}function I(t){var e,n,r,i,o,s,a,u=null;return c(t)&&("timer"===t.type&&(u=c(e=t.event)&&l(e.name)&&m(e.value)?{metrics_type:"timer",event_name:"default",metrics:((n={})[e.name]=e.value,n),category:R(e.tags,l),timestamp:C()}:{}),"counter"===t.type&&(u=c(r=t.event)&&l(r.name)&&m(r.value)?{metrics_type:"counter",event_name:"default",metrics:((i={})[r.name]=r.value,i),category:R(r.tags,l),timestamp:C()}:{}),"log"===t.type&&(u=c(o=t.event)&&l(o.value)?{metrics_type:"log",event_name:"default",log_content:o.value,log_level:null!==(s=o.level)&&void 0!==s?s:"info",category:R(o.tags,l),timestamp:C()}:{}),"custom"===t.type&&(u=c(a=t.event)&&l(a.event_name)?{metrics_type:"custom",event_name:a.event_name,metrics:R(a.metrics,m),category:R(a.tags,l),timestamp:C()}:{})),u}function F(){return Date.now()}var O=(_.prototype.begin=function(){this.currentTime=F(),this.beginTime=F(),this.frames=0},_.prototype.frame=function(){return this.currentTime=F(),this.currentTime-this.beginTime},_.prototype.end=function(){var t;return this.frames++,this.currentTime=F(),this.currentTime>=this.beginTime+this.duration&&(t=this.frames*this.duration/(this.currentTime-this.beginTime),this.beginTime=this.currentTime,this.frames=0),t},_);function _(t){this.beginTime=F(),this.frames=0,this.duration=null!=t?t:1e3,this.currentTime=F()}var x,q,A=1e3;(q=x=x||{}).once="once",q.repeat="repeat",q.frame="frame";var N="FPSMonitor",J=(H.prototype.setup=function(t){r()&&(this.fpsInstance=new O(A),this.callback=t||k,this.fpsInstance.begin(),this.mode!==x.repeat?this.mode!==x.frame?this.mode===x.once&&this.animateOnce():this.animateId=requestAnimationFrame(this.animateFrame.bind(this)):this.animateRepeat())},H.prototype.animateRepeat=function(){var t;r()&&(void 0!==(t=this.fpsInstance.end())&&(this.fpsList.push(t),this.sendFps(t)),this.animateId=requestAnimationFrame(this.animateRepeat))},H.prototype.animateOnce=function(){if(r()){var t=this.fpsInstance.end();if(void 0!==t)return this.fpsList.push(t),this.sendFps(t),void(this.fpsList.length>=Math.floor(this.onceTime/A)&&cancelAnimationFrame(this.animateId));this.animateId=requestAnimationFrame(this.animateOnce)}},H.prototype.animateFrame=function(){var t;!r()||void 0!==(t=this.fpsInstance.frame())&&(this.sendFrame(t),cancelAnimationFrame(this.animateId))},H.prototype.sendFps=function(t){o(this.callback)&&this.callback({name:this.name,type:"post",event:{ev_type:"fps",fps:t}})},H.prototype.sendFrame=function(t){o(this.callback)&&this.callback({name:this.name,type:"post",event:{ev_type:"frame_duration",frame:t}})},H.monitorName=N,H);function H(t){var e,n,r=this;this.name=N,this.callback=k,this.fpsInstance=null,this.animateId=0,this.fpsList=[],this.mode="once",this.onceTime=A,this.getFps=function(){return r.fpsList},t&&(this.mode=null!==(e=t.mode)&&void 0!==e?e:x.once,this.onceTime=null!==(n=t.onceTime)&&void 0!==n?n:A)}function B(t){try{for(var e,n=t,r=[],i=0,o=0,s=" > ".length;n&&i++<5&&!("html"===(e=function(t){var e,n,r,i,o=t,s=[];if(!o||!o.tagName)return"";s.push(o.tagName.toLowerCase()),o.id&&s.push("#"+o.id);var a=o.className;if(a&&l(a))for(e=a.split(/\s+/),i=0;i<e.length;i++)s.push("."+e[i]);var u=["type","name","title","alt"];for(i=0;i<u.length;i++)n=u[i],(r=o.getAttribute(n))&&s.push("["+n+'="'+r+'"]');return s.join("")}(n))||1<i&&80<=o+r.length*s+e.length);)r.push(e),o+=e.length,n=n.parentNode;return r.reverse().join(" > ")}catch(t){return"<unknown>"}}var D="FPSJankTimesMonitor",j=(U.prototype.setup=function(t){void 0===t&&(t=k),h()&&(this.callback=t,this.start())},U.prototype.getHistoryFrameList=function(){return this.historyFrameList},U.prototype.start=function(){this.fpsMonitor.setup(this.getFrameList.bind(this))},U.prototype.getFrameList=function(t){var e=this,n=t.event.frame,r=100<n,i=this.frameList.length,o={frame:n,isJank:r,timestamp:M()};this.historyFrameList.push(o),this.historyFrameList.length>(this.options.maxFrameListCount||30)&&this.historyFrameList.shift();var s=this.frameList[i-1]||{},a=!o.isJank&&s.isJank,u=!o.isJank&&!s.isJank;o.isJank&&!s.isJank||a||o.isJank&&s.isJank?this.frameList.push(o):u&&(this.frameList=[o]),a&&(this.report(),this.frameList=[o]),this.timerId=window.setTimeout(function(){e.start()},100)},U.prototype.shouldReport=function(t){for(var e=0,n=0;n<t.length;n++){var r=t[n];if(200<r.frame)return!0;if(r.isJank&&e++,3<=e)return!0}return!1},U.prototype.report=function(){var t,e,n,r,i;this.shouldReport(this.frameList)&&(i={name:this.name,type:"post",event:{ev_type:"fps_jank_times",list:this.frameList,breadcrumbs:null!==(e=null===(t=this.breadcrumbMonitor)||void 0===t?void 0:t.getBreadcrumbs())&&void 0!==e?e:[],memory:null!==(r=null===(n=this.memoryRecordMonitor)||void 0===n?void 0:n.getMemoryQueue())&&void 0!==r?r:[]}},this.callback(i))},U.monitorName=D,U);function U(t){var n=this;this.name=D,this.historyFrameList=[],this.callback=k,this.onLeave=function(){var t,e;h()&&(1<n.frameList.length&&(n.report(),null!==(e=(t=n.options).report)&&void 0!==e&&e.call(t)),n.frameList=[],window.clearTimeout(n.timerId))},this.onShow=function(){h()&&(n.historyFrameList=[],n.frameList=[],n.start())},this.visibilityChange=function(){"hidden"===document.visibilityState&&n.onLeave(),"visible"===document.visibilityState&&n.onShow()},t.breadcrumbMonitor&&(this.breadcrumbMonitor=t.breadcrumbMonitor),t.memoryRecordMonitor&&(this.memoryRecordMonitor=t.memoryRecordMonitor),this.options=null!=t?t:{},this.fpsMonitor=new J({mode:"frame"}),this.frameList=[],this.timerId=0,L(this.onLeave,this.visibilityChange)}var z="FIDMonitor",Q=(V.prototype.setup=function(t){var u=this;if(y()&&PerformanceObserver.supportedEntryTypes&&PerformanceObserver.supportedEntryTypes.includes("first-input")&&w()){this.callback=t,this.observer=new PerformanceObserver(function(t,e){var n,r;try{for(var i=v(t.getEntries()),o=i.next();!o.done;o=i.next()){var s=o.value,a=s.processingStart-s.startTime;u.callback({name:u.name,fid:Math.round(a)})}}catch(t){n={error:t}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}e.disconnect()});try{this.observer.observe({type:"first-input",buffered:!0})}catch(t){this.observer.observe({entryTypes:["first-input"]})}}},V.monitorName=z,V);function V(){this.name=z,this.callback=k}var X="MPFIDMonitor",W=(K.prototype.setup=function(){var e,t,n,r,s=this;if(g()&&w()){if(!this.props.isAsync){var i=null!==(r=null===(n=this.props.preLongTaskObserver)||void 0===n?void 0:n.precollect)&&void 0!==r?r:[];if(i&&0<i.length)try{for(var o=v(i),a=o.next();!a.done;a=o.next()){var u=a.value;"longtask"===u.entryType&&this.list.push(u)}}catch(t){e={error:t}}finally{try{a&&!a.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}}this.observer=new PerformanceObserver(function(t){var e,n;try{for(var r=v(t.getEntries()),i=r.next();!i.done;i=r.next()){var o=i.value;s.list.push(o)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}}),this.observer.observe({entryTypes:["longtask"]})}},K.prototype.getMPFID=function(){var e,t;if(g()&&w()){this.observer&&this.observer.disconnect();var n=0;try{for(var r=v(this.list),i=r.next();!i.done;i=r.next()){var o=i.value;n<o.duration&&(n=o.duration)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return this.formatEvent(Math.round(n))}},K.prototype.formatEvent=function(t){return{name:this.name,mpfid:t}},K.monitorName=X,K);function K(t){this.name=X,this.list=[],this.props=t}var G=[],Y="ResourcePerformanceMonitor",Z=($.prototype.setup=function(){f()&&"function"==typeof performance.clearResourceTimings&&this.isAsync&&window.performance.clearResourceTimings()},$.prototype.getPerformance=function(){if(f()&&"function"==typeof performance.clearResourceTimings){var t=this.getParams();return{name:this.name,type:"post",event:t}}},$.prototype.getParams=function(){return{ev_type:"resource_performance",resources:this.getResources()}},$.prototype.getResources=function(){return window.performance.getEntriesByType("resource").filter(function(t){return!function(t,e){if(a(t)&&0!==t.length)for(var n=0;n<t.length;){if(t[n]===e)return 1;n++}}(G,t.initiatorType)})},$.monitorName=Y,$);function $(t){var e=this;void 0===t&&(t=0),this.name=Y,this.getResourcePerformance=function(){var t;return null!==(t=e.getPerformance())&&void 0!==t?t:{}},this.isAsync=t}function tt(){}var et=!1,nt=!1,rt={uniqueId:0,originals:{},proxies:{},patchXMLHTTPRequest:function(o){this.originals.send=XMLHttpRequest.prototype.send,XMLHttpRequest.prototype.send=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=rt.uniqueId++;o.beforeCb(r);var i=this.onreadystatechange;return this.onreadystatechange=function(t){null!=i&&i.call(e,t),4===e.readyState&&o.afterCb(r)},rt.originals.send.apply(this,t)},this.proxies.send=XMLHttpRequest.prototype.send},patchFetch:function(i){var o;n()&&(o=window.fetch,this.originals.fetch=o,window.fetch=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return new Promise(function(e,n){var r=rt.uniqueId++;i.beforeCb(r),o.apply(void 0,u(t)).then(function(t){i.afterCb(r),e(t)},function(t){i.afterCb(r,t),n(t)})})},this.proxies.fetch=window.fetch)},observeResourceFetchingMutations:function(s){if(e()&&"function"==typeof window.MutationObserver){var a=["img","script","iframe","link","audio","video","source"],t=new MutationObserver(function(t){var e,n;try{for(var r=v(t),i=r.next();!i.done;i=r.next()){var o=i.value;("childList"===o.type&&function t(e,n){var r,i;try{for(var o=v(e),s=o.next();!s.done;s=o.next()){var a=s.value;if(n.includes(a.nodeName.toLowerCase())||a.children&&t(a.children,n))return 1}}catch(t){r={error:t}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(r)throw r.error}}}(o.addedNodes,a)||"attributes"===o.type&&a.includes(o.target.nodeName.toLowerCase()))&&s(o)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}});return t.observe(document,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["href","src"]}),t}},resetOriginals:function(){this.originals.send&&XMLHttpRequest.prototype.send===this.proxies.send&&(et=!1,XMLHttpRequest.prototype.send=this.originals.send),this.originals.fetch&&fetch===this.proxies.fetch&&(nt=!1,window.fetch=this.originals.fetch)}},it="TTIMonitor",ot=(st.prototype.setup=function(){},st.prototype.startSchedulingTimerTasks=function(){this.scheduleTimerTasks=!0;var t=0<this.longTasks.length?this.longTasks[this.longTasks.length-1].end:0,e=this.computeLastKnownNetwork2Busy(this.incompleteRequestStarts,this.networkRequests);this.rescheduleTimer(Math.max(e+5e3,t))},st.prototype.registerListeners=function(){et||(rt.patchXMLHTTPRequest(this.proxyConfig),et=!0),nt||(rt.patchFetch(this.proxyConfig),nt=!0),this.registerPerformanceObserver(),this.useMutationObserver&&(this.mutationObserver=rt.observeResourceFetchingMutations(this.mutationObserverCallback.bind(this)))},st.prototype.mutationObserverCallback=function(t){this.rescheduleTimer(performance.now()+5e3)},st.prototype.beforeJSInitiatedRequestCallback=function(t){this.incompleteJSInitiatedRequestStartTimes[t]=performance.now()},st.prototype.afterJSInitiatedRequestCallback=function(t){this.incompleteJSInitiatedRequestStartTimes[t]=void 0},st.prototype.registerPerformanceObserver=function(){var a=this;this.performanceObserver=new PerformanceObserver(function(t){var e,n,r=t.getEntries();try{for(var i=v(r),o=i.next();!o.done;o=i.next()){var s=o.value;"resource"===s.entryType&&a.networkRequestFinishedCallback(s),"longtask"===s.entryType&&a.longTaskFinishedCallback(s)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}});try{this.performanceObserver.observe({type:"longtask"}),this.performanceObserver.observe({type:"resource",buffered:!0})}catch(t){this.performanceObserver.observe({entryTypes:["longtask","resource"]})}},st.prototype.networkRequestFinishedCallback=function(t){this.networkRequests.push({start:t.fetchStart,end:t.responseEnd}),this.rescheduleTimer(this.computeLastKnownNetwork2Busy(this.incompleteRequestStarts,this.networkRequests)+5e3)},Object.defineProperty(st.prototype,"incompleteRequestStarts",{get:function(){for(var t=Object.keys(this.incompleteJSInitiatedRequestStartTimes),e=[],n=0;n<t.length;n++){var r=this.incompleteJSInitiatedRequestStartTimes[t[n]];"number"==typeof r&&e.push(r)}return e},enumerable:!1,configurable:!0}),st.prototype.longTaskFinishedCallback=function(t){var e=t.startTime+t.duration;this.longTasks.push({start:t.startTime,end:e}),this.rescheduleTimer(e+5e3)},st.prototype.rescheduleTimer=function(t){var e=this;this.scheduleTimerTasks&&(this.timerActivationTime>t||(clearTimeout(this.timerId),this.timerId=window.setTimeout(function(){e.checkTTI()},t-performance.now()),this.timerActivationTime=t))},st.prototype.checkTTI=function(){var t=this.computeLastKnownNetwork2Busy(this.incompleteRequestStarts,this.networkRequests),e=this.getFirstPaintTime()||performance.timing.domContentLoadedEventEnd-performance.timing.navigationStart,n=this.getMinValue(),r=performance.now();null===n&&this.rescheduleTimer(Math.max(t+5e3,r+1e3));var i=this.computeTTI(e,n,t,r,this.longTasks);i?(this.callback&&"function"==typeof this.callback&&this.callback(Math.round(i)),this.disable()):this.rescheduleTimer(performance.now()+1e3)},st.prototype.getMinValue=function(){if(this.minValue)return this.minValue;if(performance.timing.domContentLoadedEventEnd){var t=performance.timing;return t.domContentLoadedEventEnd-t.navigationStart}return null},st.prototype.getFirstPaintTime=function(){if("PerformancePaintTiming"in window){var t=performance.getEntriesByType("paint")[0];return t?t.startTime:0}return 0},st.prototype.disable=function(){clearTimeout(this.timerId),this.scheduleTimerTasks=!1,this.unregisterListeners(),this.snippetObserver&&this.snippetObserver.disconnect(),this.snippetEntries&&this.snippetEntries.splice(0,this.snippetEntries.length)},st.prototype.unregisterListeners=function(){this.performanceObserver&&this.performanceObserver.disconnect(),this.mutationObserver&&this.mutationObserver.disconnect(),rt.resetOriginals(),this.proxyConfig&&(this.proxyConfig.beforeCb=tt,this.proxyConfig.afterCb=tt)},st.prototype.computeLastKnownNetwork2Busy=function(t,e){var n,r,i,o;if(2<t.length)return performance.now();var s=[];try{for(var a=v(e),u=a.next();!u.done;u=a.next()){var c=u.value;s.push({timestamp:c.start,type:"requestStart"}),s.push({timestamp:c.end,type:"requestEnd"})}}catch(t){n={error:t}}finally{try{u&&!u.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}try{for(var l=v(t),m=l.next();!m.done;m=l.next()){var p=m.value;s.push({timestamp:p,type:"requestStart"})}}catch(t){i={error:t}}finally{try{m&&!m.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}s.sort(function(t,e){return t.timestamp-e.timestamp});for(var f=t.length,h=s.length-1;0<=h;h--){var d=s[h];switch(d.type){case"requestStart":f--;break;case"requestEnd":if(2<++f)return d.timestamp;break;default:throw Error("Internal Error: This should never happen")}}return 0},st.monitorName=it,st);function st(t){var e,n,r,i,o,s,a=this;if(this.name=it,this.callback=tt,this.useMutationObserver=!0,this.minValue=null,this.isAsync=0,this.longTasks=[],this.networkRequests=[],this.incompleteJSInitiatedRequestStartTimes={},this.timerActivationTime=-1/0,this.scheduleTimerTasks=!1,this.proxyConfig={beforeCb:this.beforeJSInitiatedRequestCallback.bind(this),afterCb:this.afterJSInitiatedRequestCallback.bind(this)},this.getTTI=function(t){a.callback=t,g()&&b()&&w()?a.startSchedulingTimerTasks():a.callback&&"function"==typeof a.callback&&a.callback()},this.computeTTI=function(t,e,n,r,i){if(r-n<5e3)return null;var o=0===i.length?t:i[i.length-1].end;return r-o<5e3?null:Math.max(o,e)},g()&&b()&&w()){if(this.useMutationObserver=!!t.useMutationObserver,this.minValue=null!==(r=t.minValue)&&void 0!==r?r:null,this.isAsync=null!==(i=t.isAsync)&&void 0!==i?i:0,this.snippetEntries=null===(o=null==t?void 0:t.preLongTaskObserver)||void 0===o?void 0:o.precollect,this.snippetObserver=null===(s=null==t?void 0:t.preLongTaskObserver)||void 0===s?void 0:s.observer,!this.isAsync&&this.snippetEntries&&0<this.snippetEntries.length)try{for(var u=v(this.snippetEntries),c=u.next();!c.done;c=u.next()){var l=c.value;"longtask"===l.entryType?this.longTasks.push({start:l.startTime,end:l.startTime+l.duration}):"resource"===l.entryType&&this.networkRequests.push({start:l.fetchStart,end:l.responseEnd})}}catch(t){e={error:t}}finally{try{c&&!c.done&&(n=u.return)&&n.call(u)}finally{if(e)throw e.error}}this.registerListeners()}}var at={ev_type:"perf",isAsync:0,dns:0,tcp:0,request:0,response:0,processing:0,blank:0,domready:0,load:0,has_resource:0,domparse:0,resource:0,ttfb:0,redirect:0,tti:0,upload_reason:"sample",network_type:"",timing:{},navigation_timing:{},navigation:{},resources:[]},ut="PerformanceMonitor",ct=(lt.prototype.setup=function(t){var e,n,r=this;p()&&(this.callback=t,e=function(){r.hasLoaded=!0,r.performanceAuto&&setTimeout(function(){r.perfLog()},200)},"complete"!==document.readyState?window.addEventListener("load",function(){setTimeout(function(){e()},0)},!1):e(),this.sendParams=d({},at),this.staticPerformanceMonitor=new Z,this.staticPerformanceMonitor.setup(),(new Q).setup(this.hasFID),this.mpfidMonitor=new W({isAsync:0,preLongTaskObserver:this.props.preLongTaskObserver}),this.mpfidMonitor.setup(),this.ttiMonitor=new ot({isAsync:0,preLongTaskObserver:this.props.preLongTaskObserver}),this.ttiMonitor.setup(),n=this.syncPerfLog.bind(this),L(n))},lt.prototype.performanceNow=function(){var t,e;return null!==performance&&void 0!==performance&&performance.now?performance.now():(Date.now?Date.now():+new Date)-(null!==(e=null===(t=performance.timing)||void 0===t?void 0:t.navigationStart)&&void 0!==e?e:0)},lt.prototype.getBounced=function(){return!this.hasLoaded},lt.prototype.getPaintTime=function(e){if(f()){var t=performance.getEntriesByType("paint");if(a(t)){var n=t.filter(function(t){return t.name===e});return n.length&&n[0]&&c(n[0])&&n[0].startTime||0}}return 0},lt.monitorName=ut,lt);function lt(t){var s=this;this.name=ut,this.callback=k,this.sendParams=d({},at),this.finalSendParams=this.sendParams,this.hasLoaded=!1,this.initStart=0,this.hasSentInitPerf=!1,this.initFlag=!0,this.performanceAuto=!0,this.send=function(){s.initFlag&&s.hasLoaded&&(s.sendParams.isAsync&&(s.sendParams.load=Math.round(s.performanceNow()-s.initStart)),setTimeout(function(){s.perfLog()},200))},this.initAsync=function(){var t,e;s.hasSentInitPerf&&(s.sendParams=d({},at),s.sendParams.isAsync=1,s.initFlag=!0,s.initStart=s.performanceNow(),s.staticPerformanceMonitor=new Z(1),s.staticPerformanceMonitor.setup(),s.mpfidMonitor=new W({isAsync:1,preLongTaskObserver:s.props.preLongTaskObserver}),s.mpfidMonitor.setup(),s.ttiMonitor=new ot({minValue:Math.round(s.performanceNow()),isAsync:1,preLongTaskObserver:s.props.preLongTaskObserver}),s.ttiMonitor.setup(),null!==(e=null===(t=s.fmpMonitor)||void 0===t?void 0:t.setup)&&void 0!==e&&e.call(t,k))},this.getPerformance=function(){return s.finalSendParams.tti||("complete"===document.readyState?s.perfLog():s.perfLog(!0)),s.buildParams(s.finalSendParams)},this.buildParams=function(t){return{name:s.name,type:"post",event:t}},this.perfLog=function(t){if(void 0===t&&(t=!1),p()){if(s.initFlag=!1,s.finalSendParams=d({},s.sendParams),!s.sendParams.isAsync){var e=s.getBounced();if(e)return s.finalSendParams.bounced=e,void s.invokeCallback(0,s.buildParams(s.finalSendParams));s.finalSendParams=d(d({},s.finalSendParams),s.getParams())}var n=s.getStaticResources(),r=s.getFMP(),i=s.getMPFID();n&&(s.finalSendParams.resources=n,s.finalSendParams.has_resource=1),r&&(s.finalSendParams.fmp=Math.round(r)),r&&s.finalSendParams.fcp&&s.finalSendParams.fmp<s.finalSendParams.fcp&&(s.finalSendParams.fmp=s.finalSendParams.fcp),i&&(s.finalSendParams.mpfid=i),o(s.callback)&&(!t&&s.ttiMonitor&&o(s.ttiMonitor.getTTI)?s.ttiMonitor.getTTI(function(t){t&&0<t&&(s.finalSendParams.tti=s.finalSendParams.isAsync?Math.round(t-s.initStart):t),s.invokeCallback(s.finalSendParams.isAsync,s.buildParams(s.finalSendParams))}):s.invokeCallback(s.finalSendParams.isAsync,s.buildParams(s.finalSendParams)))}},this.invokeCallback=function(t,e){if(!t){if(s.hasSentInitPerf)return;s.hasSentInitPerf=!0}s.callback(e)},this.getStaticResources=function(){var t;if(s.staticPerformanceMonitor&&o(s.staticPerformanceMonitor.getResourcePerformance)){var e=s.staticPerformanceMonitor.getResourcePerformance();if(null!==(t=null==e?void 0:e.event)&&void 0!==t&&t.resources)return e.event.resources||[]}},this.getFMP=function(){var t,e,n,r;return s.fmpMonitor?(s.fmpMonitor.disconnect(),s.sendParams.isAsync?(null===(t=null==(r=s.fmpMonitor.getFmp())?void 0:r.event)||void 0===t?void 0:t.fmp)||0:o(s.fmpMonitor.getLoadFmp)?1!==s.props.renderType?2===s.props.renderType?s.getPaintTime("first-contentful-paint"):0:null!==(n=null===(e=(r=s.fmpMonitor.getLoadFmp()||{}).event)||void 0===e?void 0:e.fmp)&&void 0!==n?n:0:0):0},this.getMPFID=function(){if(s.mpfidMonitor&&o(s.mpfidMonitor.getMPFID)){var t=s.mpfidMonitor.getMPFID();if(t)return t.mpfid}},this.syncPerfLog=function(){var t,e;s.hasSentInitPerf||(s.perfLog(!0),null!==(e=(t=s.props).report)&&void 0!==e&&e.call(t))},this.hasFID=function(t){s.sendParams.fid=t.fid},this.getParams=function(){if(p()){var t={},e=window.performance.timing;t.dns=e.domainLookupEnd-e.domainLookupStart,t.tcp=e.connectEnd-e.connectStart,t.request=e.responseStart-e.requestStart,t.response=e.responseEnd-e.responseStart,t.processing=e.domComplete-e.domLoading,t.blank=e.responseEnd-e.navigationStart,t.domready=e.domInteractive-e.navigationStart,t.load=e.loadEventEnd-e.navigationStart,e.secureConnectionStart&&(t.ssl=e.connectEnd-e.secureConnectionStart),t.domparse=e.domInteractive-e.responseEnd,t.resource=e.loadEventStart-e.domContentLoadedEventEnd,t.ttfb=e.responseStart-e.requestStart,t.redirect=e.redirectEnd-e.redirectStart;var n=s.getPaintTime("first-paint"),r=s.getPaintTime("first-contentful-paint");n&&(t.fp=Math.round(n)),r&&(t.fcp=Math.round(r));var i=function(){if(!f())return null;var t=window.performance.getEntriesByType("navigation");return a(t)&&0!==t.length?t[0]:null}(),o=p()?window.performance.timing:null;return(i||o)&&(t.navigation=null!=i?i:o),o&&(t.timing=o),i&&(t.navigation_timing=i),t}},t.fmpMonitor&&(this.fmpMonitor=t.fmpMonitor);var e=t.performanceAuto;this.performanceAuto=void 0===e||e,this.props=null!=t?t:{}}var mt="StaticErrorMonitor",pt=(ft.prototype.setup=function(t){e()&&(this.callback=t,window.addEventListener("error",this.staticErrorLog.bind(this),!0))},ft.prototype.getSrc=function(t){return"link"===t.tagName.toLowerCase()?ht(t,"href"):ht(t,"src")},ft.prototype.getParams=function(t,e){var n={ev_type:"static",st_type:e},r=S(t);return n.st_src=t,n.st_protocol=r.protocol,n.st_domain=r.hostname,n.st_path=r.pathname,n},ft.monitorName=mt,ft);function ft(){var a=this;this.name=mt,this.callback=k,this.buildEvent=function(t){var e,n,r,i=t||window.event||{};try{r=null!==(n=null!==(e=i.target)&&void 0!==e?e:i.srcElement)&&void 0!==n?n:{}}catch(i){return}var o=r.tagName;if(o&&l(o)){o=o.toLowerCase();var s=a.getSrc(r);if(s&&s!==window.location.href)return{name:a.name,type:"get",event:a.getParams(s,o)}}},this.staticErrorLog=function(t){var e=a.buildEvent(t);e&&a.callback(e)}}function ht(t,e){var n,r;return t.getAttribute&&o(t.getAttribute)?null!==(n=t.getAttribute(e))&&void 0!==n?n:"":null!==(r=t[e])&&void 0!==r?r:""}var dt="StaticSRIErrorMonitor",vt=(yt.prototype.setup=function(t){e()&&(this.callback=t,window.addEventListener("error",this.staticSRIErrorLog,!0))},yt.prototype.getSrc=function(t){return t&&o(t.getAttribute)?t.getAttribute("src"):t.src||t.href||""},yt.prototype.checkHasIntegrity=function(t){return t&&o(t.getAttribute)?!!t.getAttribute("integrity"):!(null==t||!t.integrity)},yt.prototype.getSourceData=function(t){var e=t.errorFileSize,n=t.realFileSize,r=t.errorFileContext,i=t.src;return{ev_type:"static_sri",sri:{error_file_size:e,real_file_size:n,error_file_context:r,static_file_src:i,static_file_url:S(i).href||""}}},yt.monitorName=dt,yt);function yt(t){var e,u=this;this.name=dt,this.callback=k,this.onError=k,this.staticSRIErrorLog=function(t){var e,n,r,i,o,s,a=t||window.event||{};try{i=null!==(n=null!==(e=a.target)&&void 0!==e?e:a.srcElement)&&void 0!==n?n:{}}catch(a){return}u.checkHasIntegrity(i)&&(o=u.getSrc(i),s=(null===(r=i.tagName)||void 0===r?void 0:r.toLowerCase())||"",o&&s&&o!==window.location.href&&u.loadScript(o))},this.loadScript=function(s){var t;n()&&"Promise"in window&&o(Promise.all)&&Promise.all([fetch(s,{cache:"force-cache"}).then(function(t){return t.ok?t:new Response}),(t=s+"?vt="+Date.now(),fetch(t,{cache:"no-store"}).then(function(t){return t.ok?t:new Response}))]).then(function(t){var i=t[0],o=t[1];return 200===i.status&&200===o.status?Promise.all([i.text(),o.text()]).then(function(t){var e=t[0]||i.status+","+o.status,n=e.length,r=t[1].length;return u.getSourceData({errorFileSize:n,realFileSize:r,errorFileContext:e,src:s})}):{}}).then(function(t){return null!=t.sri&&(null!=t&&t.sri.error_file_context&&(null==t?void 0:t.sri.error_file_size)!==t.sri.real_file_size?(u.callback({name:u.name,type:"get",event:t}),!0):void 0)}).catch(function(t){u.onError(t)})},this.onError=null!==(e=t.onError)&&void 0!==e?e:k}var gt="MemoryRecordMonitor",bt=(wt.prototype.reportInternal=function(){var t=window.performance.memory;this.add({jsHeapSizeLimit:t.jsHeapSizeLimit,totalJSHeapSize:t.totalJSHeapSize,usedJSHeapSize:t.usedJSHeapSize,timestamp:M()})},wt.prototype.start=function(){this.reportInternal()},wt.prototype.add=function(t){this.memoryQueue.length>=this.maxQueue&&this.memoryQueue.shift(),this.memoryQueue.push(t),this.emit&&this.emit()},wt.monitorName=gt,wt);function wt(t){var e,n,r=this;this.name=gt,this.emit=null,this.timeInstance=null,this.isUnavailable=function(){return!(i()&&window.performance.memory&&h())},this.setup=function(){r.isUnavailable()||(r.timeInstance=window.setInterval(function(){r.start()},r.timeout))},this.report=function(){return r.memoryQueue.map(function(t){return d({},t)})},this.getMemoryQueue=function(){return r.memoryQueue},this.onLeave=function(){r.isUnavailable()||(r.timeInstance&&(window.clearInterval(r.timeInstance),r.timeInstance=null),r.memoryQueue=[])},this.onShow=function(){r.isUnavailable()||(r.memoryQueue=[],r.timeInstance=window.setInterval(function(){r.start()},r.timeout))},this.visibilityChange=function(){"hidden"===document.visibilityState&&r.onLeave(),"visible"===document.visibilityState&&r.onShow()},this.timeout=null!==(e=null==t?void 0:t.interval)&&void 0!==e?e:1e3,this.maxQueue=null!==(n=null==t?void 0:t.maxQueue)&&void 0!==n?n:10,this.memoryQueue=[],L(this.onLeave,this.visibilityChange)}var Tt="EmitMonitor",St=(kt.prototype.setup=function(t){this.callback=t||k},kt.prototype.buildCustomTimeLog=function(t,e,n){return function(t){var e=t.name,n=t.tag,r=t.value;if(e&&r){var i={ev_type:"custom",cm_name:e=o(e.toString)?e.toString():"",cm_type:"time",cm_value:r=+r};return n&&(n=o(n.toString)?n.toString():"",i.cm_tag=n),{name:"SentCustomTime",type:"get",event:i}}}({name:t,tag:e,value:n})},kt.prototype.buildCustomCountLog=function(t,e){return function(t){var e=t.name,n=t.tag;if(e){var r={ev_type:"custom",cm_name:e=o(e.toString)?e.toString():"",cm_type:"count"};return n&&(n=o(n.toString)?n.toString():"",r.cm_tag=n),{name:"SentCustomCount",type:"get",event:r}}}({name:t,tag:e})},kt.prototype.buildEmitSingleEvent=function(t){var e=I(t);if(e&&(!e||e.event_name))return{name:this.name,type:"post",event:{ev_type:"flexible",flexible_data_list:[e]}}},kt.monitorName=Tt,kt);function kt(){var o=this;this.name=Tt,this.callback=k,this.handOut=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=o.buildEvent.apply(o,u(t));o.callback(n)},this.buildEvent=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("sendCustomCountLog"===t[0])return o.buildCustomCountLog(t[1],t[2]);if("sendCustomTimeLog"===t[0])return o.buildCustomTimeLog(t[1],t[2],t[3]);if("send"===t[0]){if("count"===t[1])return o.buildCustomCountLog(t[2].category,t[2].action);if("timing"===t[1])return o.buildCustomTimeLog(t[2].category,t[2].action,t[2].value)}if("emit"===t[0]){if(!t[1]||!t[2])return;var n={type:t[1],event:t[2]};return o.buildEmitSingleEvent(n)}},this.send=function(t,e,n){var r=n.action,i=n.value;"count"===t&&o.sendCustomCountLog(e,r),"timing"===t&&o.sendCustomTimeLog(e,r,i)},this.sendCustomTimeLog=function(t,e,n){var r=o.buildCustomTimeLog(t,e,n);o.callback(r)},this.sendCustomCountLog=function(t,e){var n=o.buildCustomCountLog(t,e);return o.callback(n),n},this.emitEvent=function(t){var e=o.buildEmitSingleEvent(t);o.callback(e)}}var Lt="BreadcrumbMonitor",Mt=(Pt.prototype.setup=function(){this.instrumentDOM()},Pt.prototype.instrumentDOM=function(){var t;"document"in window&&(t=this,window.document.addEventListener("click",t.domEventHandler("click",t.triggerHandlers.bind(t,"dom")),!1),window.document.addEventListener("keypress",t.keypressEventHandler(t.triggerHandlers.bind(t,"dom")),!1))},Pt.prototype.domEventHandler=function(e,n,r){var i=this;return void 0===r&&(r=!1),function(t){i.keypressTimeout=void 0,t&&i.lastCapturedEvent!==t&&(i.lastCapturedEvent=t,i.debounceTimer&&clearTimeout(i.debounceTimer),r?i.debounceTimer=setTimeout(function(){n({event:t,name:e})}):n({event:t,name:e}))}},Pt.prototype.triggerHandlers=function(t,e){if(t)try{this.domBreadcrumb(e)}catch(t){}},Pt.prototype.keypressEventHandler=function(r){var i=this;return function(t){var e;try{e=t.target}catch(t){return}var n=e&&e.tagName;n&&("INPUT"===n||"TEXTAREA"===n||e.isContentEditable)&&(i.keypressTimeout||i.domEventHandler("input",r)(t),clearTimeout(i.keypressTimeout),i.keypressTimeout=window.setTimeout(function(){i.keypressTimeout=void 0},i.debounceDuration))}},Pt.prototype.domBreadcrumb=function(t){var e;try{e=t.event.target?B(t.event.target):B(t.event)}catch(t){e="<unknown>"}0!==e.length&&this.addBreadcrumb({category:"ui."+t.name,message:e})},Pt.monitorName=Lt,Pt);function Pt(){var r=this;this.name=Lt,this.breadcrumbs=[],this.getBreadcrumbs=function(){return r.breadcrumbs},this.addBreadcrumb=function(t,e){var n=d(d({},t),{timestamp:M()});return r.breadcrumbs=void 0!==e&&0<=e?u(r.breadcrumbs,[n]).slice(-e):u(r.breadcrumbs,[n]),r},this.debounceDuration=1e3,this.debounceTimer=0,this.breadcrumbs=[]}function Et(t,e){if(!c(t)||!c(e))return{};var n=d({},t||{});return n.event=d(d({},(null==t?void 0:t.event)||{}),e||{}),n}function Ct(t,e){var n;return t.forEach(function(t){t.name===e&&(n=t)}),n}var Rt=function(r){void 0===r&&(r=window);var i=0;return{setSchedule:function(t,e){var n=this;i=r.setTimeout(function(){t(),n.setSchedule(t,e)},e)},clearSchedule:function(){r.clearTimeout(i)},getTimer:function(){return i}}}(),It="WorkerMonitor",Ft=(Ot.prototype.setup=function(){o(window.Worker)&&this.loadWorker()},Ot.prototype.loadWorker=function(){var n=this;P.get(this.options.workerLink,{getResponseText:function(t){var e=new Worker(window.URL.createObjectURL(new Blob([t],{type:"text/javascript"})));n.worker=e,document.addEventListener("visibilitychange",function(){n.sendVisibilityChange({worker:e,visibilityState:document.visibilityState})}),Rt.setSchedule(function(){n.heartBeat({worker:e,reportURL:n.options.reportURL,commonParams:n.options.commonParams})},2e3)}})},Ot.prototype.sendVisibilityChange=function(t){var e=t.worker,n=t.visibilityState;e.postMessage({type:"visibilityChange",visibilityState:n})},Ot.prototype.heartBeat=function(t){var e,n,r,i,o,s,a,u,c,l,m,p=t.worker,f=t.reportURL,h=t.commonParams;null===(e=window.performance)||void 0===e||e.memory;p.postMessage({type:"heartBeat",reportURL:f,commonParams:d(d({},h||{}),{url:window.location.href}),breadcrumbs:null!==(o=null===(i=null===(r=null===(n=this.options)||void 0===n?void 0:n.breadcrumbMonitor)||void 0===r?void 0:r.getBreadcrumbs)||void 0===i?void 0:i.call(r))&&void 0!==o?o:[],memory:null!==(u=null===(a=null===(s=this.options.memoryRecordMonitor)||void 0===s?void 0:s.getMemoryQueue)||void 0===a?void 0:a.call(s))&&void 0!==u?u:[],frames:null!==(m=null===(l=null===(c=this.options.fpsJankTimesMonitor)||void 0===c?void 0:c.getHistoryFrameList)||void 0===l?void 0:l.call(c))&&void 0!==m?m:[]})},Ot.monitorName=It,Ot);function Ot(t){this.name=It,this.options=t,this.worker=null}var _t=(xt.prototype.setup=function(){var e=this;this.options.sendEvent&&this.monitors.forEach(function(t){(e.installedMonitors[t.name]=t).setup(e.options.sendEvent)})},xt);function xt(t){var c=this;this.getInstalledMonitors=function(){return c.installedMonitors},this.init=function(){var t,e,n,r=c.options.config,i=new Mt,o=new bt;r.flags.enableStaticError&&c.monitors.push(new pt),r.flags.enablePerformance&&c.monitors.push(new ct({fmpMonitor:c.options.fmpMonitor,performanceAuto:r.commonParams.performanceAuto,renderType:r.monitors.BaseMonitor.appTypeSetting.renderType,report:function(){return c.options.report()},preLongTaskObserver:{precollect:null!==(e=null===(t=window.Slardar.lt)||void 0===t?void 0:t.e)&&void 0!==e?e:[],observer:null===(n=window.Slardar.lt)||void 0===n?void 0:n.o}})),r.flags.enableMemoryRecord&&c.monitors.push(new bt),r.flags.enableFPSJankTimesMonitor&&c.monitors.push(new j({breadcrumbMonitor:i,memoryRecordMonitor:o,report:function(){return c.options.report()}})),c.monitors.push(new St),r.flags.enableBreadcrumb&&c.monitors.push(new Mt),c.monitors.push(new vt({onError:function(t){c.options.captureException(t)}})),c.monitors.push(new Ft({reportURL:r.commonParams.reportURLSingle,commonParams:r.commonParams,workerLink:"https://s3a.pstatp.com/growth/slardar/sdk/plugins/browser/worker.3.4.40.cn.js",breadcrumbMonitor:Ct(c.monitors,"BreadcrumbMonitor"),memoryRecordMonitor:Ct(c.monitors,"MemoryRecordMonitor"),fpsJankTimesMonitor:Ct(c.monitors,"FPSJankTimesMonitor")})),c.setup(),c.handlePreCollect()},this.handlePreCollect=function(){var t,e,n=c.options.collect,r=null!==(t=null==n?void 0:n.emit)&&void 0!==t?t:[];a(r)&&r.forEach(function(t){var e,n,r,i,o,s,a;t&&null!=t&&t.event&&null!=t&&t.params&&(i=t.event,o=t.params,a=Et(null!=(s=null===(e=Ct(c.monitors,"EmitMonitor"))||void 0===e?void 0:e.buildEvent.apply(e,u(null!=i?i:{})))?s:{},o),null!==(r=(n=c.options).sendEvent)&&void 0!==r&&r.call(n,a))});var i=null!==(e=null==n?void 0:n.staticError)&&void 0!==e?e:[];a(i)&&i.forEach(function(t){var e,n,r,i,o,s,a,u;t&&null!=t&&t.event&&null!=t&&t.params&&(o=t.event,s=t.params,u=Et(null!=(a=null===(e=Ct(c.monitors,"StaticErrorMonitor"))||void 0===e?void 0:e.buildEvent(o||{}))?a:{},s),null!==(r=(n=c.options).sendEvent)&&void 0!==r&&r.call(n,u),null!==(i=Ct(c.monitors,"StaticSRIErrorMonitor"))&&void 0!==i&&i.staticSRIErrorLog(o))})},this.options=t,this.monitors=[],this.installedMonitors={}}return window.Slardar&&(window.Slardar.SetMonitors=_t),t.SetMonitors=_t,t}({});
