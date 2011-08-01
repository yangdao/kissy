/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 1 11:46
*/
KISSY.add("switchable/base",function(h,e,p,t){function m(a,c){c=c||{};if(!("markupType"in c))if(c.panelCls)c.markupType=1;else if(c.panels)c.markupType=2;for(var d=this.constructor;d;){c=h.merge(d.Config,c);d=d.superclass?d.superclass.constructor:null}this.container=e.get(a);this.config=c;this.activeIndex=this.completedIndex=c.activeIndex;if(!(this.activeIndex>-1))if(typeof c.switchTo!="number")this.completedIndex=this.activeIndex=0;this._init();this._initPlugins();this.fire(k);this.activeIndex>-1||
typeof c.switchTo=="number"&&this.switchTo(c.switchTo)}function u(a){var c={};c.type=a.originalEvent.type;c.target=a.originalEvent.target||a.originalEvent.srcElement;return{originalEvent:c}}var r=p.Target,k="init";m.getDomEvent=u;m.Config={markupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,activeIndex:-1,activeTriggerCls:"ks-active",steps:1,
viewSize:[]};m.Plugins=[];h.augment(m,r,{_initPlugins:function(){for(var a=this,c=a.constructor;c;){h.each(c.Plugins,function(d){d.init&&d.init(a)});c=c.superclass?c.superclass.constructor:null}},_init:function(){var a=this.config;this._parseMarkup();a.hasTriggers&&this._bindTriggers()},_parseMarkup:function(){var a=this.container,c=this.config,d,l,g=[],o=[];switch(c.markupType){case 0:if(d=e.get("."+c.navCls,a))g=e.children(d);l=e.get("."+c.contentCls,a);o=e.children(l);break;case 1:g=e.query("."+
c.triggerCls,a);o=e.query("."+c.panelCls,a);break;case 2:g=c.triggers;o=c.panels}a=o.length;this.length=a/c.steps;if(c.hasTriggers&&a>0&&g.length===0)g=this._generateTriggersMarkup(this.length);this.triggers=h.makeArray(g);this.panels=h.makeArray(o);this.content=l||o[0].parentNode;this.nav=d||c.hasTriggers&&g[0].parentNode},_generateTriggersMarkup:function(a){var c=this.config,d=e.create("<ul>"),l,g;d.className=c.navCls;for(g=0;g<a;g++){l=e.create("<li>");if(g===this.activeIndex)l.className=c.activeTriggerCls;
l.innerHTML=g+1;d.appendChild(l)}this.container.appendChild(d);return e.children(d)},_bindTriggers:function(){var a=this,c=a.config,d=a.triggers,l,g,o=d.length;for(g=0;g<o;g++)(function(w){l=d[w];p.on(l,"click",function(x){a._onFocusTrigger(w,x)});if(c.triggerType==="mouse"){p.on(l,"mouseenter",function(x){a._onMouseEnterTrigger(w,x)});p.on(l,"mouseleave",function(){a._onMouseLeaveTrigger(w)})}})(g)},_onFocusTrigger:function(a,c){if(this._triggerIsValid(a)){this._cancelSwitchTimer();this.switchTo(a,
t,u(c))}},_onMouseEnterTrigger:function(a,c){var d=this;if(d._triggerIsValid(a)){var l=u(c);d.switchTimer=h.later(function(){d.switchTo(a,t,l)},d.config.delay*1E3)}},_onMouseLeaveTrigger:function(){this._cancelSwitchTimer()},_triggerIsValid:function(a){return this.activeIndex!==a},_cancelSwitchTimer:function(){if(this.switchTimer){this.switchTimer.cancel();this.switchTimer=t}},switchTo:function(a,c,d,l){var g=this,o=g.config,w=g.triggers,x=g.panels,s=g.activeIndex,q=o.steps,y=s*q,A=a*q;if(!g._triggerIsValid(a))return g;
if(g.fire("beforeSwitch",{toIndex:a})===false)return g;if(o.hasTriggers)g._switchTrigger(s>-1?w[s]:null,w[a]);if(c===t)c=a>s?"forward":"backward";g._switchView(s>-1?x.slice(y,y+q):null,x.slice(A,A+q),a,c,d,function(){l&&l.call(g,a);g.completedIndex=a});g.activeIndex=a;return g},_switchTrigger:function(a,c){var d=this.config.activeTriggerCls;a&&e.removeClass(a,d);e.addClass(c,d)},_switchView:function(a,c,d,l,g,o){a&&e.css(a,"display","none");e.css(c,"display","block");this._fireOnSwitch(d,g);o&&o.call(this)},
_fireOnSwitch:function(a,c){this.fire("switch",h.mix(c||{},{currentIndex:a}))},prev:function(a){var c=this.activeIndex;this.switchTo(c>0?c-1:this.length-1,"backward",a)},next:function(a){var c=this.activeIndex;this.switchTo(c<this.length-1?c+1:0,"forward",a)}});return m},{requires:["dom","event"]});
KISSY.add("switchable/aria",function(h,e,p,t){function m(){this.stop&&this.stop()}function u(){this.start&&this.start()}t.Plugins.push({name:"aria",init:function(k){if(k.config.aria){var a=k.container;p.on(a,"focusin",m,k);p.on(a,"focusout",u,k)}}});var r=["a","input","button","object"];return{setTabIndex:function(k,a){k.tabIndex=a;e.query("*",k).each(function(c){var d=c.nodeName.toLowerCase();if(h.inArray(d,r)){e.hasAttr(c,"oriTabIndex")||e.attr(c,"oriTabIndex",c.tabIndex);c.tabIndex=a!=-1?e.attr(c,
"oriTabIndex"):a}})}}},{requires:["dom","event","./base"]});
KISSY.add("switchable/accordion/base",function(h,e,p){function t(m,u){if(!(this instanceof t))return new t(m,u);t.superclass.constructor.apply(this,arguments)}h.extend(t,p,{_switchTrigger:function(m,u){var r=this.config;r.multiple?e.toggleClass(u,r.activeTriggerCls):t.superclass._switchTrigger.apply(this,arguments)},_triggerIsValid:function(m){return this.config.multiple||t.superclass._triggerIsValid.call(this,m)},_switchView:function(m,u,r,k,a,c){var d=u[0];if(this.config.multiple){e.toggle(d);this._fireOnSwitch(r,
a);c&&c.call(this)}else t.superclass._switchView.apply(this,arguments)}});t.Plugins=[];t.Config={markupType:1,triggerType:"click",multiple:false};return t},{requires:["dom","../base"]});
KISSY.add("switchable/accordion/aria",function(h,e,p,t,m){function u(f){var i;h.each(this.triggers,function(z){if(z==f||e.contains(z,f))i=z});return i}function r(f){var i;h.each(this.panels,function(z){if(z==f||e.contains(z,f))i=z});return i}function k(f){var i=u.call(this,f);if(!i){f=r.call(this,f);i=this.triggers[h.indexOf(f,this.panels)]}return i}function a(f){switch(f.keyCode){case w:case x:f.ctrlKey&&!f.altKey&&!f.shiftKey&&f.halt();break;case j:f.ctrlKey&&!f.altKey&&f.halt()}}function c(f){var i=
f.target,z=this.triggers,E=!f.ctrlKey&&!f.shiftKey&&!f.altKey,F=f.ctrlKey&&!f.shiftKey&&!f.altKey;switch(f.keyCode){case v:case n:if((i=u.call(this,i))&&E){this.switchTo(h.indexOf(i,this.triggers));f.halt()}break;case y:case A:if(i=u.call(this,i)){l.call(this,i);f.halt()}break;case C:case b:if(i=u.call(this,i)){g.call(this,i);f.halt()}break;case x:if(F){f.halt();i=k.call(this,i);g.call(this,i)}break;case w:if(F){f.halt();i=k.call(this,i);l.call(this,i)}break;case q:if(E){k.call(this,i);d.call(this,
0,true);f.halt()}break;case s:if(E){k.call(this,i);d.call(this,z.length-1,true);f.halt()}break;case j:if(f.ctrlKey&&!f.altKey){f.halt();i=k.call(this,i);f.shiftKey?l.call(this,i):g.call(this,i)}}}function d(f,i){var z=this.triggers,E=z[f];h.each(z,function(F){if(F!==E){B(F,"-1");e.removeClass(F,"ks-switchable-select");F.setAttribute("aria-selected","false")}});i&&E.focus();B(E,"0");e.addClass(E,"ks-switchable-select");E.setAttribute("aria-selected","true")}function l(f){var i=this.triggers;f=h.indexOf(f,
i);d.call(this,f==0?i.length-1:f-1,true)}function g(f){var i=this.triggers;f=h.indexOf(f,i);d.call(this,f==i.length-1?0:f+1,true)}function o(f){var i=!!(f.originalEvent.target||f.originalEvent.srcElement);f=f.currentIndex;var z=this.panels,E=this.triggers,F=E[f],G=z[f];if(!this.config.multiple){h.each(z,function(D){D!==G&&D.setAttribute("aria-hidden","true")});h.each(E,function(D){D!==F&&D.setAttribute("aria-hidden","true")})}z=G.getAttribute("aria-hidden");G.setAttribute("aria-hidden",z=="false"?
"true":"false");F.setAttribute("aria-expanded",z=="false"?"false":"true");d.call(this,f,i)}var w=33,x=34,s=35,q=36,y=37,A=38,C=39,b=40,j=9,n=32,v=13;h.mix(m.Config,{aria:true});m.Plugins.push({name:"aria",init:function(f){if(f.config.aria){var i=f.container,z=f.activeIndex;e.attr(i,"aria-multiselectable",f.config.multiple?"true":"false");f.nav&&e.attr(f.nav,"role","tablist");var E=f.triggers,F=f.panels,G=0;h.each(F,function(D){if(!D.id)D.id=h.guid("ks-accordion-tab-panel")});h.each(E,function(D){if(!D.id)D.id=
h.guid("ks-accordion-tab")});h.each(E,function(D){D.setAttribute("role","tab");D.setAttribute("aria-expanded",z==G?"true":"false");D.setAttribute("aria-selected",z==G?"true":"false");D.setAttribute("aria-controls",F[G].id);B(D,z==G?"0":"-1");G++});G=0;h.each(F,function(D){var H=E[G];D.setAttribute("role","tabpanel");D.setAttribute("aria-hidden",z==G?"false":"true");D.setAttribute("aria-labelledby",H.id);G++});f.on("switch",o,f);p.on(i,"keydown",c,f);p.on(i,"keypress",a,f)}}});var B=t.setTabIndex},
{requires:["dom","event","../aria","./base"]});
KISSY.add("switchable/autoplay",function(h,e,p,t){h.mix(p.Config,{autoplay:false,interval:5,pauseOnHover:true});p.Plugins.push({name:"autoplay",init:function(m){function u(){a=h.later(function(){m.paused||m.switchTo(m.activeIndex<m.length-1?m.activeIndex+1:0,"forward")},k,true)}var r=m.config,k=r.interval*1E3,a;if(r.autoplay){u();m.stop=function(){if(a){a.cancel();a=t}m.paused=true};m.start=function(){if(a){a.cancel();a=t}m.paused=false;u()};if(r.pauseOnHover){e.on(m.container,"mouseenter",m.stop,
m);e.on(m.container,"mouseleave",m.start,m)}}}});return p},{requires:["event","./base"]});KISSY.add("switchable/autorender",function(h,e,p,t){t.autoRender=function(m,u){m="."+(m||"KS_Widget");e.query(m,u).each(function(r){var k=r.getAttribute("data-widget-type"),a;if(k&&"Switchable Tabs Slide Carousel Accordion".indexOf(k)>-1)try{if(a=r.getAttribute("data-widget-config"))a=a.replace(/'/g,'"');new h[k](r,p.parse(a))}catch(c){}})}},{requires:["dom","json","switchable/base"]});
KISSY.add("switchable/carousel/base",function(h,e,p,t,m){function u(k,a){if(!(this instanceof u))return new u(k,a);u.superclass.constructor.apply(this,arguments)}var r={originalEvent:{target:1}};u.Config={circular:true,prevBtnCls:"ks-switchable-prev-btn",nextBtnCls:"ks-switchable-next-btn",disableBtnCls:"ks-switchable-disable-btn"};u.Plugins=[];h.extend(u,t,{_init:function(){var k=this;u.superclass._init.call(k);var a=k.config,c=a.disableBtnCls;h.each(["prev","next"],function(d){var l=k[d+"Btn"]=
e.get("."+a[d+"BtnCls"],k.container);p.on(l,"mousedown",function(g){g.preventDefault();e.hasClass(l,c)||k[d](r)})});a.circular||k.on("switch",function(d){d=d.currentIndex;d=d===0?k.prevBtn:d===k.length-1?k.nextBtn:m;e.removeClass([k.prevBtn,k.nextBtn],c);d&&e.addClass(d,c)});p.on(k.panels,"click",function(){k.fire("itemSelected",{item:this})})}});return u},{requires:["dom","event","../base"]});
KISSY.add("switchable/carousel/aria",function(h,e,p,t,m){function u(b){var j=b.currentIndex,n=this.activeIndex,v=this.panels,B=v[j*this.config.steps],f=this.triggers;j=f[j];if((b=!!(b.originalEvent.target||b.originalEvent.srcElement))||n==-1){h.each(f,function(i){q(i,-1)});h.each(v,function(i){q(i,-1)});j&&q(j,0);q(B,0);b&&B.focus()}}function r(b){var j;h.each(this.triggers,function(n){if(n==b||e.contains(n,b)){j=n;return false}});return j}function k(b){var j=b.target;switch(b.keyCode){case w:case o:if(j=
r.call(this,j)){j=j;var n=e.next(j),v=this.triggers;n||(n=v[0]);q(j,-1);if(n){q(n,0);n.focus()}b.halt()}break;case g:case l:if(j=r.call(this,j)){j=j;n=e.prev(j);v=this.triggers;n||(n=v[v.length-1]);q(j,-1);if(n){q(n,0);n.focus()}b.halt()}break;case s:case x:if(j=r.call(this,j)){this.switchTo(h.indexOf(j,this.triggers),undefined,y);b.halt()}}}function a(b){var j;h.each(this.panels,function(n){if(n==b||e.contains(n,b)){j=n;return false}});return j}function c(b,j){var n=h.indexOf(b,this.panels),v=this.config.steps,
B=Math.floor(n/v);if(B==this.activeIndex)return 1;if(n%v==0||n%v==v-1){this.switchTo(B,j,y);return 0}return 1}function d(b){var j=b.target;switch(b.keyCode){case w:case o:if(j=a.call(this,j)){j=j;var n=e.next(j),v=this.panels;n||(n=v[0]);q(j,-1);q(n,0);c.call(this,n,A)&&n.focus();b.halt()}break;case g:case l:if(j=a.call(this,j)){j=j;n=e.prev(j);v=this.panels;n||(n=v[v.length-1]);q(j,-1);q(n,0);c.call(this,n,C)&&n.focus();b.halt()}break;case s:case x:if(j=a.call(this,j)){this.fire("itemSelected",{item:j});
b.halt()}}}var l=37,g=38,o=39,w=40,x=32,s=13,q=t.setTabIndex,y={originalEvent:{target:1}},A="forward",C="backward";h.mix(m.Config,{aria:false});m.Plugins.push({name:"aria",init:function(b){if(b.config.aria){var j=b.triggers,n=b.panels,v=b.content,B=b.activeIndex;if(!v.id)v.id=h.guid("ks-switchbale-content");v.setAttribute("role","listbox");var f=0;h.each(j,function(i){q(i,B==f?"0":"-1");i.setAttribute("role","button");i.setAttribute("aria-controls",v.id);f++});f=0;h.each(n,function(i){q(i,"-1");i.setAttribute("role",
"option");f++});b.on("switch",u,b);(j=b.nav)&&p.on(j,"keydown",k,b);p.on(v,"keydown",d,b);j=b.prevBtn;n=b.nextBtn;if(j){q(j,0);j.setAttribute("role","button");p.on(j,"keydown",function(i){if(i.keyCode==s||i.keyCode==x){b.prev(y);i.preventDefault()}})}if(n){q(n,0);n.setAttribute("role","button");p.on(n,"keydown",function(i){if(i.keyCode==s||i.keyCode==x){b.next(y);i.preventDefault()}})}}}})},{requires:["dom","event","../aria","./base"]});
KISSY.add("switchable/effect",function(h,e,p,t,m,u){var r;h.mix(m.Config,{effect:"none",duration:0.5,easing:"easeNone",nativeAnim:true});m.Effects={none:function(k,a,c){k&&e.css(k,"display","none");e.css(a,"display","block");c&&c()},fade:function(k,a,c){var d=this,l=d.config,g=k?k[0]:null,o=a[0];if(d.anim){d.anim.stop();e.css(d.anim.fromEl,{zIndex:1,opacity:0});e.css(d.anim.toEl,"zIndex",9)}e.css(o,"opacity",1);if(g){d.anim=(new t(g,{opacity:0},l.duration,l.easing,function(){d.anim=u;e.css(o,"z-index",
9);e.css(g,"z-index",1);c&&c()},l.nativeAnim)).run();d.anim.toEl=o;d.anim.fromEl=g}else{e.css(o,"z-index",9);c&&c()}},scroll:function(k,a,c,d){var l=this;a=l.config;var g=a.effect==="scrollx",o={};o[g?"left":"top"]=-(l.viewSize[g?0:1]*d)+"px";l.anim&&l.anim.stop();if(k)l.anim=(new t(l.content,o,a.duration,a.easing,function(){l.anim=u;c&&c()},a.nativeAnim)).run();else{e.css(l.content,o);c&&c()}}};r=m.Effects;r.scrollx=r.scrolly=r.scroll;m.Plugins.push({name:"effect",init:function(k){var a=k.config,
c=a.effect,d=k.panels,l=k.content,g=a.steps,o=k.activeIndex,w=d.length;k.viewSize=[a.viewSize[0]||d[0].offsetWidth*g,a.viewSize[1]||d[0].offsetHeight*g];if(c!=="none"){e.css(d,"display","block");switch(c){case "scrollx":case "scrolly":e.css(l,"position","absolute");e.css(l.parentNode,"position")=="static"&&e.css(l.parentNode,"position","relative");if(c==="scrollx"){e.css(d,"float","left");e.width(l,k.viewSize[0]*(w/g))}break;case "fade":var x=o*g,s=x+g-1,q;h.each(d,function(y,A){q=A>=x&&A<=s;e.css(y,
{opacity:q?1:0,position:"absolute",zIndex:q?9:1})})}}}});h.augment(m,{_switchView:function(k,a,c,d,l,g){var o=this,w=o.config.effect;(h.isFunction(w)?w:r[w]).call(o,k,a,function(){o._fireOnSwitch(c,l);g&&g.call(o)},c,d)}});return m},{requires:["dom","event","anim","switchable/base"]});
KISSY.add("switchable/circular",function(h,e,p,t){function m(s,q,y,A,C){var b=this;q=b.config;var j=b.length,n=b.activeIndex,v=q.scrollType===x,B=v?c:d,f=b.viewSize[v?0:1];v=-f*A;var i={},z,E=C===w;if(z=E&&n===0&&A===j-1||C===o&&n===j-1&&A===0)v=u.call(b,b.panels,A,E,B,f);i[B]=v+g;b.anim&&b.anim.stop();if(s)b.anim=(new p(b.content,i,q.duration,q.easing,function(){z&&r.call(b,b.panels,A,E,B,f);b.anim=undefined;y&&y()},q.nativeAnim)).run();else{e.css(b.content,i);y&&y()}}function u(s,q,y,A,C){var b=
this.config.steps;q=this.length;var j=y?q-1:0;s=s.slice(j*b,(j+1)*b);e.css(s,k,a);e.css(s,A,(y?-1:1)*C*q);return y?C:-C*q}function r(s,q,y,A,C){var b=this.config.steps;q=this.length;var j=y?q-1:0;s=s.slice(j*b,(j+1)*b);e.css(s,k,l);e.css(s,A,l);e.css(this.content,A,y?-C*(q-1):l)}var k="position",a="relative",c="left",d="top",l="",g="px",o="forward",w="backward",x="scrollx";h.mix(t.Config,{circular:false});t.Plugins.push({name:"circular",init:function(s){s=s.config;if(s.circular&&(s.effect===x||s.effect===
"scrolly")){s.scrollType=s.effect;s.effect=m}}})},{requires:["dom","anim","./base","./effect"]});
KISSY.add("switchable/countdown",function(h,e,p,t,m,u){h.mix(m.Config,{countdown:false,countdownFromStyle:"",countdownToStyle:"width: 0"});m.Plugins.push({name:"countdown",init:function(r){function k(s){a();x=(new t(g[s],w,l-1)).run()}function a(){if(d){clearTimeout(d);d=null}if(x){x.stop();x=u}}var c=r.config,d,l=c.interval,g=[],o=c.countdownFromStyle,w=c.countdownToStyle,x;if(!(!c.autoplay||!c.hasTriggers||!c.countdown)){h.each(r.triggers,function(s,q){s.innerHTML='<div class="ks-switchable-trigger-mask"></div><div class="ks-switchable-trigger-content">'+
s.innerHTML+"</div>";g[q]=s.firstChild});if(c.pauseOnHover){p.on(r.container,"mouseenter",function(){a();var s=g[r.activeIndex];if(o)x=(new t(s,o,0.2,"easeOut")).run();else e.attr(s,"style","")});p.on(r.container,"mouseleave",function(){a();var s=r.activeIndex;e.attr(g[s],"style",o);d=setTimeout(function(){k(s)},200)})}r.on("beforeSwitch",function(){a();if(g[r.activeIndex])e.attr(g[r.activeIndex],"style",o||"")});r.on("switch",function(s){r.paused||k(s.currentIndex)});r.activeIndex>-1&&k(r.activeIndex)}}});
return m},{requires:["dom","event","anim","./base"]});
KISSY.add("switchable/lazyload",function(h,e,p){var t="beforeSwitch",m="img-src",u="area-data",r={};r[m]="data-ks-lazyload-custom";r[u]="ks-datalazyload-custom";h.mix(p.Config,{lazyDataType:u});p.Plugins.push({name:"lazyload",init:function(k){function a(o){var w=d.steps;o=o.toIndex*w;c.loadCustomLazyData(k.panels.slice(o,o+w),l);a:{if(o=(w=l===m)?"img":l===u?"textarea":""){o=e.query(o,k.container);for(var x=0,s=o.length;x<s;x++){var q=o[x];if(w?e.attr(q,g):e.hasClass(q,g)){w=false;break a}}}w=true}w&&
k.detach(t,a)}var c=h.require("datalazyload"),d=k.config,l=d.lazyDataType,g=r[l];!c||!l||!g||k.on(t,a)}});return p},{requires:["dom","./base"]});KISSY.add("switchable/slide/base",function(h,e){function p(t,m){if(!(this instanceof p))return new p(t,m);p.superclass.constructor.apply(this,arguments)}p.Config={autoplay:true,circular:true};p.Plugins=[];h.extend(p,e);return p},{requires:["../base"]});
KISSY.add("switchable/slide/aria",function(h,e,p,t,m){function u(g){switch(g.keyCode){case c:case a:this.next(d);g.halt();break;case k:case r:this.prev(d);g.halt()}}var r=37,k=38,a=39,c=40;h.mix(m.Config,{aria:false});var d={originalEvent:{target:1}},l=t.setTabIndex;m.Plugins.push({name:"aria",init:function(g){if(g.config.aria){var o=g.panels,w=0,x=g.activeIndex;h.each(g.triggers,function(q){l(q,"-1");w++});w=0;h.each(o,function(q){l(q,x==w?"0":"-1");e.attr(q,"role","option");w++});var s=g.content;
e.attr(s,"role","listbox");p.on(s,"keydown",u,g);l(o[0],0);g.on("switch",function(q){var y=q.currentIndex;q=!!(q.originalEvent.target||q.originalEvent.srcElement);var A=g.completedIndex;A>-1&&l(o[A],-1);l(o[y],0);q&&o[y].focus()})}}})},{requires:["dom","event","../aria","./base"]});KISSY.add("switchable/tabs/base",function(h,e){function p(t,m){if(!(this instanceof p))return new p(t,m);p.superclass.constructor.call(this,t,m);return 0}h.extend(p,e);p.Config={};p.Plugins=[];return p},{requires:["../base"]});
KISSY.add("switchable/tabs/aria",function(h,e,p,t,m,u){function r(b){var j;h.each(this.triggers,function(n){if(n==b||e.contains(n,b))j=n});return j}function k(b){switch(b.keyCode){case d:case l:b.ctrlKey&&!b.altKey&&!b.shiftKey&&b.halt();break;case y:b.ctrlKey&&!b.altKey&&b.halt()}}function a(b){var j=b.target,n=this.triggers,v=!b.ctrlKey&&!b.shiftKey&&!b.altKey,B=b.ctrlKey&&!b.shiftKey&&!b.altKey;switch(b.keyCode){case w:case x:if(r.call(this,j)){this.prev(C(b));b.halt()}break;case s:case q:if(r.call(this,
j)){this.next(C(b));b.halt()}break;case l:if(B){b.halt();this.next(C(b))}break;case d:if(B){b.halt();this.prev(C(b))}break;case o:if(v){this.switchTo(0,undefined,C(b));b.halt()}break;case g:if(v){this.switchTo(n.length-1,undefined,C(b));b.halt()}break;case y:if(b.ctrlKey&&!b.altKey){b.halt();b.shiftKey?this.prev(C(b)):this.next(C(b))}}}function c(b){var j=!!(b.originalEvent.target||b.originalEvent.srcElement),n=this.completedIndex,v=b.currentIndex;if(n!=v){b=this.triggers[n];var B=this.triggers[v];
n=this.panels[n];v=this.panels[v];b&&A(b,"-1");A(B,"0");j&&B.focus();n&&n.setAttribute("aria-hidden","true");v.setAttribute("aria-hidden","false")}}var d=33,l=34,g=35,o=36,w=37,x=38,s=39,q=40,y=9;h.mix(u.Config,{aria:true});u.Plugins.push({name:"aria",init:function(b){if(b.config.aria){var j=b.triggers,n=b.activeIndex,v=b.panels,B=b.container;b.nav&&e.attr(b.nav,"role","tablist");var f=0;h.each(j,function(i){i.setAttribute("role","tab");A(i,n==f?"0":"-1");if(!i.id)i.id=h.guid("ks-switchable");f++});
f=0;h.each(v,function(i){var z=j[f];i.setAttribute("role","tabpanel");i.setAttribute("aria-hidden",n==f?"false":"true");i.setAttribute("aria-labelledby",z.id);f++});b.on("switch",c,b);p.on(B,"keydown",a,b);p.on(B,"keypress",k,b)}}});var A=m.setTabIndex,C=t.getDomEvent},{requires:["dom","event","../base","../aria","./base"]});
KISSY.add("switchable",function(h,e,p,t,m,u,r,k,a,c,d,l,g,o,w,x){h.Switchable=e;p={Accordion:t,Carousel:k,Slide:o,Tabs:x};h.mix(h,p);h.mix(e,p);return e},{requires:["switchable/base","switchable/aria","switchable/accordion/base","switchable/accordion/aria","switchable/autoplay","switchable/autorender","switchable/carousel/base","switchable/carousel/aria","switchable/circular","switchable/countdown","switchable/effect","switchable/lazyload","switchable/slide/base","switchable/slide/aria","switchable/tabs/base",
"switchable/tabs/aria"]});
