(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{299:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return s})),n.d(e,"i",(function(){return r})),n.d(e,"f",(function(){return c})),n.d(e,"g",(function(){return l})),n.d(e,"h",(function(){return u})),n.d(e,"b",(function(){return h})),n.d(e,"e",(function(){return p})),n.d(e,"k",(function(){return d})),n.d(e,"l",(function(){return f})),n.d(e,"c",(function(){return m})),n.d(e,"j",(function(){return v}));n(24),n(97),n(161),n(166),n(65),n(42),n(301),n(66),n(317),n(100);var i=/#.*$/,a=/\.(md|html)$/,s=/\/$/,r=/^[a-z]+:/i;function o(t){return decodeURI(t).replace(i,"").replace(a,"")}function c(t){return r.test(t)}function l(t){return/^mailto:/.test(t)}function u(t){return/^tel:/.test(t)}function h(t){if(c(t))return t;var e=t.match(i),n=e?e[0]:"",a=o(t);return s.test(a)?t:a+".html"+n}function p(t,e){var n=decodeURIComponent(t.hash),a=function(t){var e=t.match(i);if(e)return e[0]}(e);return(!a||n===a)&&o(t.path)===o(e)}function d(t,e,n){if(c(e))return{type:"external",path:e};n&&(e=function(t,e,n){var i=t.charAt(0);if("/"===i)return t;if("?"===i||"#"===i)return e+t;var a=e.split("/");n&&a[a.length-1]||a.pop();for(var s=t.replace(/^\//,"").split("/"),r=0;r<s.length;r++){var o=s[r];".."===o?a.pop():"."!==o&&a.push(o)}""!==a[0]&&a.unshift("");return a.join("/")}(e,n));for(var i=o(e),a=0;a<t.length;a++)if(o(t[a].regularPath)===i)return Object.assign({},t[a],{type:"page",path:h(t[a].path)});return console.error('[vuepress] No matching page found for sidebar item "'.concat(e,'"')),{}}function f(t,e,n,i){var a=n.pages,s=n.themeConfig,r=i&&s.locales&&s.locales[i]||s;if("auto"===(t.frontmatter.sidebar||r.sidebar||s.sidebar))return function(t){var e=m(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map((function(e){return{type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}}))}]}(t);var o=r.sidebar||s.sidebar;if(o){var c=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(var n in e)if(0===(i=t,/(\.html|\/)$/.test(i)?i:i+"/").indexOf(encodeURI(n)))return{base:n,config:e[n]};var i;return{}}(e,o),l=c.base,u=c.config;return u?u.map((function(t){return function t(e,n,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if("string"==typeof e)return d(n,e,i);if(Array.isArray(e))return Object.assign(d(n,e[0],i),{title:e[1]});var s=e.children||[];return 0===s.length&&e.path?Object.assign(d(n,e.path,i),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:s.map((function(e){return t(e,n,i,a+1)})),collapsable:!1!==e.collapsable}}(t,a,l)})):[]}return[]}function m(t){var e;return(t=t.map((function(t){return Object.assign({},t)}))).forEach((function(t){2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)})),t.filter((function(t){return 2===t.level}))}function v(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},300:function(t,e,n){t.exports=n.p+"assets/img/wingman.b3ca3baf.png"},302:function(t,e,n){},304:function(t,e,n){},305:function(t,e,n){},306:function(t,e,n){},307:function(t,e,n){},308:function(t,e,n){},309:function(t,e,n){},310:function(t,e,n){},311:function(t,e,n){},312:function(t,e,n){},313:function(t,e,n){},314:function(t,e,n){},315:function(t,e,n){},330:function(t,e,n){"use strict";n.r(e);n(160);var i=n(299),a={name:"SidebarGroup",components:{DropdownTransition:n(331).a},props:["item","open","collapsable","depth"],beforeCreate:function(){this.$options.components.SidebarLinks=n(330).default},methods:{isActive:i.e}},s=(n(351),n(41)),r=Object(s.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?n("RouterLink",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[n("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?n("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):n("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[n("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?n("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),n("DropdownTransition",[t.open||!t.collapsable?n("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,"sidebar-depth":t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null).exports;n(352),n(65);function o(t,e,n,i,a){var s={props:{to:e,activeClass:"",exactActiveClass:""},class:{active:i,"sidebar-link":!0}};return a>2&&(s.style={"padding-left":a+"rem"}),t("RouterLink",s,n)}function c(t,e,n,a,s){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;return!e||r>s?null:t("ul",{class:"sidebar-sub-headers"},e.map((function(e){var l=Object(i.e)(a,n+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[o(t,n+"#"+e.slug,e.title,l,e.level-1),c(t,e.children,n,a,s,r+1)])})))}var l={functional:!0,props:["item","sidebarDepth"],render:function(t,e){var n=e.parent,a=n.$page,s=(n.$site,n.$route),r=n.$themeConfig,l=n.$themeLocaleConfig,u=e.props,h=u.item,p=u.sidebarDepth,d=Object(i.e)(s,h.path),f="auto"===h.type?d||h.children.some((function(t){return Object(i.e)(s,h.basePath+"#"+t.slug)})):d,m="external"===h.type?function(t,e,n){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[n,t("OutboundLink")])}(t,h.path,h.title||h.path):o(t,h.path,h.title||h.path,f),v=[a.frontmatter.sidebarDepth,p,l.sidebarDepth,r.sidebarDepth,1].find((function(t){return void 0!==t})),g=l.displayAllHeaders||r.displayAllHeaders;return"auto"===h.type?[m,c(t,h.children,h.basePath,s,v)]:(f||g)&&h.headers&&!i.d.test(h.path)?[m,c(t,Object(i.c)(h.headers),h.path,s,v)]:m}};n(353);function u(t,e){return"group"===e.type&&e.children.some((function(e){return"group"===e.type?u(t,e):"page"===e.type&&Object(i.e)(t,e.path)}))}var h={name:"SidebarLinks",components:{SidebarGroup:r,SidebarLink:Object(s.a)(l,void 0,void 0,!1,null,null,null).exports},props:["items","depth","sidebarDepth"],data:function(){return{openGroupIndex:0}},watch:{$route:function(){this.refreshIndex()}},created:function(){this.refreshIndex()},methods:{refreshIndex:function(){var t=function(t,e){for(var n=0;n<e.length;n++){var i=e[n];if(u(t,i))return n}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup:function(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive:function(t){return Object(i.e)(this.$route,t.regularPath)}}},p=Object(s.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.items.length?n("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(e,i){return n("li",{key:i},["group"===e.type?n("SidebarGroup",{attrs:{item:e,open:i===t.openGroupIndex,collapsable:e.collapsable||e.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(i)}}}):n("SidebarLink",{attrs:{"sidebar-depth":t.sidebarDepth,item:e}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=p.exports},331:function(t,e,n){"use strict";var i={name:"DropdownTransition",methods:{setHeight:function(t){t.style.height=t.scrollHeight+"px"},unsetHeight:function(t){t.style.height=""}}},a=(n(342),n(41)),s=Object(a.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"dropdown"},on:{enter:this.setHeight,"after-enter":this.unsetHeight,"before-leave":this.setHeight}},[this._t("default")],2)}),[],!1,null,null,null);e.a=s.exports},335:function(t,e,n){"use strict";var i=n(302);n.n(i).a},341:function(t,e,n){"use strict";var i=n(304);n.n(i).a},342:function(t,e,n){"use strict";var i=n(305);n.n(i).a},343:function(t,e,n){"use strict";var i=n(306);n.n(i).a},344:function(t,e,n){"use strict";var i=n(307);n.n(i).a},345:function(t,e,n){"use strict";var i=n(308);n.n(i).a},346:function(t,e,n){"use strict";var i=n(309);n.n(i).a},348:function(t,e,n){"use strict";var i=n(310);n.n(i).a},349:function(t,e,n){"use strict";var i=n(311);n.n(i).a},350:function(t,e,n){"use strict";var i=n(312);n.n(i).a},351:function(t,e,n){"use strict";var i=n(313);n.n(i).a},353:function(t,e,n){"use strict";var i=n(314);n.n(i).a},354:function(t,e,n){"use strict";var i=n(315);n.n(i).a},376:function(t,e,n){"use strict";n.r(e);var i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-cover"},[e("img",{staticClass:"card-cover-image",attrs:{src:n(300),alt:"logo"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-cover"},[e("img",{staticClass:"card-cover-image",attrs:{src:n(300),alt:"logo"}})])}],a=(n(160),n(92),n(332),n(299)),s={name:"NavLink",props:{item:{required:!0}},computed:{link:function(){return Object(a.b)(this.item.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(e){return e===t.link})):"/"===this.link},isNonHttpURI:function(){return Object(a.g)(this.link)||Object(a.h)(this.link)},isBlankTarget:function(){return"_blank"===this.target},isInternal:function(){return!Object(a.f)(this.link)&&!this.isBlankTarget},target:function(){return this.isNonHttpURI?null:this.item.target?this.item.target:Object(a.f)(this.link)?"_blank":""},rel:function(){return this.isNonHttpURI?null:this.item.rel?this.item.rel:this.isBlankTarget?"noopener noreferrer":""}},methods:{focusoutAction:function(){this.$emit("focusout")}}},r=n(41),o=Object(r.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isInternal?n("RouterLink",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(e){return t.focusoutAction(e)}}},[t._v("\n  "+t._s(t.item.text)+"\n")]):n("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.target,rel:t.rel},on:{focusout:t.focusoutAction}},[t._v("\n  "+t._s(t.item.text)+"\n  "),t.isBlankTarget?n("OutboundLink"):t._e()],1)}),[],!1,null,null,null).exports,c={name:"Home",components:{NavLink:o},methods:{routeTo:function(t){this.$router.push({path:t})}},mounted:function(){"http:"===window.location.protocol&&"localhost"!==window.location.hostname&&(window.location.href="https://www.frontendwingman.com")},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}}}},l=(n(335),Object(r.a)(c,(function(){var t=this,e=this,i=e.$createElement,a=e._self._c||i;return a("main",{staticClass:"home",attrs:{"aria-labelledby":"main-title"}},[a("header",{staticClass:"hero"},[a("div",{staticClass:"text"},[a("h1",{staticClass:"header-title"},[e._v(e._s(this.data.heroText))]),e._v(" "),a("p",{staticClass:"lead-slogan"},[e._v(e._s(this.data.slogan))]),e._v(" "),a("div",{staticClass:"button button-rotate",on:{click:function(){return e.routeTo(t.data.actionLink)}}},[a("span",[e._v(e._s(this.data.actionText))])])]),e._v(" "),a("img",{staticClass:"logo",attrs:{src:n(300),alt:"wingman"}}),e._v(" "),a("img",{staticClass:"mb-logo",attrs:{src:n(300),alt:"wingman"}})]),e._v(" "),a("section",{staticClass:"content-container"},[a("div",{staticClass:"card-list"},e._l(this.data.Books_A,(function(t){return a("div",{staticClass:"card-container",on:{click:function(n){return e.routeTo(t.path)}}},[e._m(0,!0),e._v(" "),a("div",{staticClass:"card-content"},[a("p",{staticClass:"card-title"},[e._v(e._s(t.title))]),e._v(" "),a("div",{staticClass:"card-slogan"},[e._v(e._s(t.details))])])])})),0),e._v(" "),a("div",{staticClass:"card-list"},e._l(this.data.Books_B,(function(t){return a("div",{staticClass:"card-container",on:{click:function(n){return e.routeTo(t.path)}}},[e._m(1,!0),e._v(" "),a("div",{staticClass:"card-content"},[a("p",{staticClass:"card-title"},[e._v(e._s(t.title))]),e._v(" "),a("div",{staticClass:"card-slogan"},[e._v(e._s(t.details))])])])})),0)]),e._v(" "),a("Content",{staticClass:"theme-default-content custom"}),e._v(" "),e.data.footer?a("div",{staticClass:"footer"},[e._v(e._s(e.data.footer))]):e._e()],1)}),i,!1,null,null,null).exports),u=n(374),h=(n(341),Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[n("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[n("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null).exports),p=(n(172),n(65),n(320),n(42),n(93),n(301),n(66),n(39)),d=n(331),f=n(174),m=n.n(f),v={name:"DropdownLink",components:{NavLink:o,DropdownTransition:d.a},props:{item:{required:!0}},data:function(){return{open:!1}},computed:{dropdownAriaLabel:function(){return this.item.ariaLabel||this.item.text}},watch:{$route:function(){this.open=!1}},methods:{setOpen:function(t){this.open=t},isLastItemOfArray:function(t,e){return m()(e)===t}}},g=(n(343),{name:"NavLinks",components:{NavLink:o,DropdownLink:Object(r.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[n("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":t.dropdownAriaLabel},on:{click:function(e){return t.setOpen(!t.open)}}},[n("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),n("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),n("DropdownTransition",[n("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"nav-dropdown"},t._l(t.item.items,(function(e,i){return n("li",{key:e.link||i,staticClass:"dropdown-item"},["links"===e.type?n("h4",[t._v(t._s(e.text))]):t._e(),t._v(" "),"links"===e.type?n("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(e.items,(function(i){return n("li",{key:i.link,staticClass:"dropdown-subitem"},[n("NavLink",{attrs:{item:i},on:{focusout:function(n){t.isLastItemOfArray(i,e.items)&&t.isLastItemOfArray(e,t.item.items)&&t.setOpen(!1)}}})],1)})),0):n("NavLink",{attrs:{item:e},on:{focusout:function(n){t.isLastItemOfArray(e,t.item.items)&&t.setOpen(!1)}}})],1)})),0)])],1)}),[],!1,null,null,null).exports},computed:{userNav:function(){return this.$themeLocaleConfig.nav||this.$site.themeConfig.nav||[]},nav:function(){var t=this,e=this.$site.locales;if(e&&Object.keys(e).length>1){var n=this.$page.path,i=this.$router.options.routes,a=this.$site.themeConfig.locales||{},s={text:this.$themeLocaleConfig.selectText||"Languages",ariaLabel:this.$themeLocaleConfig.ariaLabel||"Select language",items:Object.keys(e).map((function(s){var r,o=e[s],c=a[s]&&a[s].label||o.lang;return o.lang===t.$lang?r=n:(r=n.replace(t.$localeConfig.path,s),i.some((function(t){return t.path===r}))||(r=s)),{text:c,link:r}}))};return[].concat(Object(p.a)(this.userNav),[s])}return this.userNav},userLinks:function(){return(this.nav||[]).map((function(t){return Object.assign(Object(a.j)(t),{items:(t.items||[]).map(a.j)})}))},repoLink:function(){var t=this.$site.themeConfig.repo;return t?/^https?:/.test(t)?t:"https://github.com/".concat(t):null},repoLabel:function(){if(this.repoLink){if(this.$site.themeConfig.repoLabel)return this.$site.themeConfig.repoLabel;for(var t=this.repoLink.match(/^https?:\/\/[^/]+/)[0],e=["GitHub","GitLab","Bitbucket"],n=0;n<e.length;n++){var i=e[n];if(new RegExp(i,"i").test(t))return i}return"Source"}}}}),b=(n(344),Object(r.a)(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.userLinks.length||t.repoLink?n("nav",{staticClass:"nav-links"},[t._l(t.userLinks,(function(t){return n("div",{key:t.link,staticClass:"nav-item"},["links"===t.type?n("DropdownLink",{attrs:{item:t}}):n("NavLink",{attrs:{item:t}})],1)})),t._v(" "),t.repoLink?n("a",{staticClass:"repo-link",attrs:{href:t.repoLink,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n    "+t._s(t.repoLabel)+"\n    "),n("OutboundLink")],1):t._e()],2):t._e()}),[],!1,null,null,null).exports);function _(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var k={name:"Navbar",components:{SidebarButton:h,NavLinks:b,SearchBox:u.a,AlgoliaSearchBox:{}},data:function(){return{linksWrapMaxWidth:null}},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}},mounted:function(){var t=this,e=parseInt(_(this.$el,"paddingLeft"))+parseInt(_(this.$el,"paddingRight")),n=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};n(),window.addEventListener("resize",n,!1)}},C=(n(345),Object(r.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"navbar"},[n("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),n("RouterLink",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?n("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$site.themeConfig.slogan?n("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.slogan}},[t._v(t._s(t.$site.themeConfig.slogan))]):t._e()]),t._v(" "),n("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?n("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?n("SearchBox"):t._e(),t._v(" "),n("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null).exports),$=n(321),x=n.n($),L={name:"PageEdit",computed:{lastUpdated:function(){return this.$page.lastUpdated},lastUpdatedText:function(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink:function(){var t=x()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,e=this.$site.themeConfig,n=e.repo,i=e.docsDir,a=void 0===i?"":i,s=e.docsBranch,r=void 0===s?"master":s,o=e.docsRepo,c=void 0===o?n:o;return t&&c&&this.$page.relativePath?this.createEditLink(n,c,a,r,this.$page.relativePath):null},editLinkText:function(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink:function(t,e,n,i,s){return/bitbucket.org/.test(t)?(a.i.test(e)?e:t).replace(a.a,"")+"/src"+"/".concat(i,"/")+(n?n.replace(a.a,"")+"/":"")+s+"?mode=edit&spa=0&at=".concat(i,"&fileviewer=file-view-default"):(a.i.test(e)?e:"https://github.com/".concat(e)).replace(a.a,"")+"/edit"+"/".concat(i,"/")+(n?n.replace(a.a,"")+"/":"")+s}}},w=(n(346),Object(r.a)(L,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"page-edit"},[t.editLink?n("div",{staticClass:"edit-link"},[n("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),n("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?n("div",{staticClass:"last-updated"},[n("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),n("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null).exports),y=n(347),O=n.n(y),S={name:"PageNav",props:["sidebarItems"],computed:{prev:function(){return N(j.PREV,this)},next:function(){return N(j.NEXT,this)}}};var j={NEXT:{resolveLink:function(t,e){return E(t,e,1)},getThemeLinkConfig:function(t){return t.nextLinks},getPageLinkConfig:function(t){return t.frontmatter.next}},PREV:{resolveLink:function(t,e){return E(t,e,-1)},getThemeLinkConfig:function(t){return t.prevLinks},getPageLinkConfig:function(t){return t.frontmatter.prev}}};function N(t,e){var n=e.$themeConfig,i=e.$page,s=e.$route,r=e.$site,o=e.sidebarItems,c=t.resolveLink,l=t.getThemeLinkConfig,u=t.getPageLinkConfig,h=l(n),p=u(i),d=x()(p)?h:p;return!1===d?void 0:O()(d)?Object(a.k)(r.pages,d,s.path):c(i,o)}function E(t,e,n){var i=[];!function t(e,n){for(var i=0,a=e.length;i<a;i++)"group"===e[i].type?t(e[i].children||[],n):n.push(e[i])}(e,i);for(var a=0;a<i.length;a++){var s=i[a];if("page"===s.type&&s.path===decodeURIComponent(t.path))return i[a+n]}}var T=S,I=(n(348),Object(r.a)(T,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.prev||t.next?n("div",{staticClass:"page-nav"},[n("p",{staticClass:"inner"},[t.prev?n("span",{staticClass:"prev"},[t._v("\n      ←\n      "),"external"===t.prev.type?n("a",{staticClass:"prev",attrs:{href:t.prev.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n        "),n("OutboundLink")],1):n("RouterLink",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v(t._s(t.prev.title||t.prev.path))])],1):t._e(),t._v(" "),t.next?n("span",{staticClass:"next"},["external"===t.next.type?n("a",{attrs:{href:t.next.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n        "),n("OutboundLink")],1):n("RouterLink",{attrs:{to:t.next.path}},[t._v(t._s(t.next.title||t.next.path))]),t._v("→\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null).exports),A={name:"LockedContent",props:["token","pageName"],mounted:function(){this.cutDom()},watch:{$route:{handler:function(t,e){t.path!==e.path&&this.$nextTick((function(){this.cutDom()}))},deep:!0}},methods:{cutDom:function(){for(var t=document.getElementsByClassName("locked-content")[0],e=Math.floor(2*t.childElementCount/3);t.childElementCount>e;)t.removeChild(t.lastElementChild)},routeToWhy:function(){this.$router.push({path:"/ReasonForCharge/"})}}},P=(n(349),{components:{PageEdit:w,PageNav:I,LockedContent:Object(r.a)(A,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("Content",{ref:"lockedContent",staticClass:"theme-default-content locked-content"}),t._v(" "),n("div",{staticStyle:{display:"block","text-align":"center"}},[n("div",{staticClass:"mask"}),t._v(" "),n("div",{staticClass:"info",staticStyle:{"font-size":"1rem"}},[n("div",[n("p",{staticClass:"text-center"},[t._v("\n          "+t._s(t.$themeConfig.lockerConfig.scanAction)+"\n          "),n("span",{staticStyle:{color:"#3eaf7c","font-weight":"bold","letter-spacing":"0.1rem","font-size":"1.5rem"}},[t._v(t._s(t.$themeConfig.lockerConfig.wechatAccountName))])]),t._v(" "),n("div",{staticClass:"text-center"},[n("img",{staticClass:"code-img",staticStyle:{width:"15rem"},attrs:{src:t.$themeConfig.lockerConfig.posterImageUrl}})]),t._v(" "),n("p",{staticClass:"text-center"},[n("span",[t._v("在公众号对话框，发送")]),t._v(" "),n("span",{staticClass:"token",staticStyle:{color:"#3eaf7c","font-weight":"bold","font-size":"17px","margin-bottom":"45px"}},[t._v(t._s(t.token))])]),t._v(" "),t._m(0),t._v(" "),n("p",[t._v("内容包括 「"+t._s(t.$themeConfig.lockerConfig.bookNameA)+"」(持续更新)，以及「"+t._s(t.$themeConfig.lockerConfig.bookNameB)+"」（即将上线）")]),t._v(" "),n("div",{staticClass:"why",on:{click:t.routeToWhy}},[n("span",[t._v("为什么我需要关注？")])])])])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[this._v("\n          关注期间\n          "),e("span",{staticStyle:{color:"#3eaf7c","font-weight":"bold"}},[this._v("无限制")]),this._v("\n          浏览本站全部内容\n        ")])}],!1,null,"10ca8396",null).exports},props:["sidebarItems","locked","token","open"]}),D=(n(350),Object(r.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"page"},[t._t("top"),t._v(" "),t.open||t.locked?n("Content",{staticClass:"theme-default-content"}):n("LockedContent",{attrs:{token:t.token,pageName:t.$route.name}}),t._v(" "),t._m(0),t._v(" "),n("PageEdit"),t._v(" "),n("PageNav",t._b({},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom")],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right-group"},[e("div",{staticClass:"item"},[e("span",{staticClass:"title"},[this._v("加入读者交流群")]),this._v(" "),e("span",{staticClass:"desc"},[this._v("\n        扫描二维码回复\n        "),e("span",{staticClass:"inner"},[this._v("Chrome")])]),this._v(" "),e("img",{attrs:{width:"120",src:"https://wingman-1300536089.file.myqcloud.com//static/qrcode_white.png"}})])])}],!1,null,"6be89bc8",null).exports),B={name:"Sidebar",components:{SidebarLinks:n(330).default,NavLinks:b},props:["items"]},R=(n(354),Object(r.a)(B,(function(){var t=this.$createElement,e=this._self._c||t;return e("aside",{staticClass:"sidebar"},[e("NavLinks"),this._v(" "),this._t("top"),this._v(" "),e("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null).exports),U=n(355),H=n.n(U),W=n(372),G=n.n(W),M=n(417),z={name:"Layout",components:{Home:l,Page:D,Sidebar:R,Navbar:C},data:function(){return{locked:!1,isSidebarOpen:!1,token:""}},computed:{shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems:function(){return Object(a.l)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted:function(){var t=this,e="";G.a.get("s_id")?e=G.a.get("s_id"):(e=Object(M.a)(),G.a.set("s_id",e,{expires:30}));var n=e.substr(e.length-6);this.token=n,setInterval((function(){H.a.get("https://www.frontendwingman.com/api/getSubscribedStatus?token=".concat(n)).then((function(e){t.locked!==e.data.locked&&(t.locked=e.data.locked)})).catch((function(t){console.log(t)}))}),4e3),this.$router.afterEach((function(){t.isSidebarOpen=!1}))},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart:function(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd:function(t){var e=t.changedTouches[0].clientX-this.touchStart.x,n=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(n)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},q=Object(r.a)(z,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?n("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),n("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),n("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),t.$page.frontmatter.home?n("Home"):n("Page",{attrs:{"sidebar-items":t.sidebarItems,locked:t.locked,token:t.token,open:!!t.$page.frontmatter.open},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.default=q.exports}}]);