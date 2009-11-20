/*
Copyright (c) 2009, Kissy UI Library. All rights reserved.
MIT Licensed.
http://kissy.googlecode.com/

Date: 2009-11-20 14:54:16
Revision: 263
*/
var KISSY=window.KISSY||{};(function(s){var d=YAHOO.util,c=d.Dom,v=d.Event,e=YAHOO.lang,g=document.getElementsByTagName("head")[0],n=YAHOO.env.ua.ie,h=(n===6),o="KISSY.Suggest.callback",k="suggest-style",a="suggest-container",u="suggest-key",b="suggest-result",m="selected",t="suggest-bottom",q="suggest-close-btn",r="suggest-shim",j="beforeDataRequest",i="onDataReturn",f="beforeShow",p="onItemSelect",l={containerClass:"",containerWidth:"auto",resultFormat:"\u7ea6%result%\u6761\u7ed3\u679c",showCloseBtn:false,closeBtnText:"\u5173\u95ed",useShim:h,timerDelay:200,autoFocus:false,submitFormOnClickSelect:true};s.Suggest=function(x,y,w){this.textInput=c.get(x);this.dataSource=y;this.JSONDataSource=e.isObject(y)?y:null;this.returnedData=null;this.config=e.merge(l,w||{});this.container=null;this.query="";this.queryParams="";this._timer=null;this._isRunning=false;this.dataScript=null;this._dataCache={};this._latestScriptTime="";this._scriptDataIsOut=false;this._onKeyboardSelecting=false;this.selectedItem=null;this._init()};e.augmentObject(s.Suggest.prototype,{_init:function(){this._initTextInput();this._initContainer();if(this.config.useShim){this._initShim()}this._initStyle();this.createEvent(j);this.createEvent(i);this.createEvent(f);this.createEvent(p);this._initResizeEvent()},_initTextInput:function(){var w=this;this.textInput.setAttribute("autocomplete","off");v.on(this.textInput,"focus",function(){w.start()});v.on(this.textInput,"blur",function(){w.stop();w.hide()});if(this.config.autoFocus){this.textInput.focus()}var x=0;v.on(this.textInput,"keydown",function(y){var z=y.keyCode;switch(z){case 27:w.hide();w.textInput.value=w.query;break;case 13:w.textInput.blur();if(w._onKeyboardSelecting){if(w.textInput.value==w._getSelectedItemKey()){w.fireEvent(p,w.textInput.value)}}w._submitForm();break;case 40:case 38:if(x++==0){if(w._isRunning){w.stop()}w._onKeyboardSelecting=true;w.selectItem(z==40)}else{if(x==3){x=0}}break}if(z!=40&&z!=38){if(!w._isRunning){w.start()}w._onKeyboardSelecting=false}});v.on(this.textInput,"keyup",function(){x=0})},_initContainer:function(){var w=document.createElement("div"),x=this.config.containerClass;w.className=a;if(x){w.className+=" "+x}w.style.position="absolute";w.style.visibility="hidden";this.container=w;this._setContainerRegion();this._initContainerEvent();document.body.insertBefore(w,document.body.firstChild)},_setContainerRegion:function(){var z=c.getRegion(this.textInput);var A=z.left,x=z.right-A-2;x=x>0?x:0;var y=document.documentMode;if(y===7&&(n===7||n===8)){A-=2}else{if(YAHOO.env.ua.gecko){A++}}this.container.style.left=A+"px";this.container.style.top=z.bottom+"px";if(this.config.containerWidth=="auto"){this.container.style.width=x+"px"}else{this.container.style.width=this.config.containerWidth}},_initContainerEvent:function(){var w=this;v.on(this.container,"mousemove",function(y){var z=v.getTarget(y);if(z.nodeName!="LI"){z=c.getAncestorByTagName(z,"li")}if(c.isAncestor(w.container,z)){if(z!=w.selectedItem){w._removeSelectedItem();w._setSelectedItem(z)}}});var x=null;this.container.onmousedown=function(y){y=y||window.event;x=y.target||y.srcElement;w.textInput.onbeforedeactivate=function(){window.event.returnValue=false;w.textInput.onbeforedeactivate=null};return false};v.on(this.container,"mouseup",function(y){if(!w._isInContainer(v.getXY(y))){return}var z=v.getTarget(y);if(z!=x){return}if(z.className==q){w.hide();return}if(z.nodeName!="LI"){z=c.getAncestorByTagName(z,"li")}if(c.isAncestor(w.container,z)){w._updateInputFromSelectItem(z);w.fireEvent(p,w.textInput.value);w.textInput.blur();w._submitForm()}})},_submitForm:function(){if(this.config.submitFormOnClickSelect){var x=this.textInput.form;if(!x){return}if(document.createEvent){var w=document.createEvent("MouseEvents");w.initEvent("submit",true,false);x.dispatchEvent(w)}else{if(document.createEventObject){x.fireEvent("onsubmit")}}x.submit()}},_isInContainer:function(x){var w=c.getRegion(this.container);return x[0]>=w.left&&x[0]<=w.right&&x[1]>=w.top&&x[1]<=w.bottom},_initShim:function(){var w=document.createElement("iframe");w.src="about:blank";w.className=r;w.style.position="absolute";w.style.visibility="hidden";w.style.border="none";this.container.shim=w;this._setShimRegion();document.body.insertBefore(w,document.body.firstChild)},_setShimRegion:function(){var w=this.container,x=w.shim;if(x){x.style.left=(parseInt(w.style.left)-2)+"px";x.style.top=w.style.top;x.style.width=(parseInt(w.style.width)+2)+"px"}},_initStyle:function(){var x=c.get(k);if(x){return}var w=".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}";x=document.createElement("style");x.id=k;x.type="text/css";g.appendChild(x);if(x.styleSheet){x.styleSheet.cssText=w}else{x.appendChild(document.createTextNode(w))}},_initResizeEvent:function(){var x=this,w;v.on(window,"resize",function(){if(w){clearTimeout(w)}w=setTimeout(function(){x._setContainerRegion();x._setShimRegion()},50)})},start:function(){s.Suggest.focusInstance=this;var w=this;w._timer=setTimeout(function(){w.updateData();w._timer=setTimeout(arguments.callee,w.config.timerDelay)},w.config.timerDelay);this._isRunning=true},stop:function(){s.Suggest.focusInstance=null;clearTimeout(this._timer);this._isRunning=false},show:function(){if(this.isVisible()){return}var w=this.container,y=w.shim;w.style.visibility="";if(y){if(!y.style.height){var x=c.getRegion(w);y.style.height=(x.bottom-x.top-2)+"px"}y.style.visibility=""}},hide:function(){if(!this.isVisible()){return}var w=this.container,x=w.shim;if(x){x.style.visibility="hidden"}w.style.visibility="hidden"},isVisible:function(){return this.container.style.visibility!="hidden"},updateData:function(){if(!this._needUpdate()){return}this._updateQueryValueFromInput();var w=this.query;if(!e.trim(w).length){this._fillContainer("");this.hide();return}if(typeof this._dataCache[w]!="undefined"){this.returnedData="using cache";this._fillContainer(this._dataCache[w]);this._displayContainer()}else{if(this.JSONDataSource){this.handleResponse(this.JSONDataSource[w])}else{this.requestData()}}},_needUpdate:function(){return this.textInput.value!=this.query},requestData:function(){if(!n){this.dataScript=null}if(!this.dataScript){var w=document.createElement("script");w.type="text/javascript";w.charset="utf-8";g.insertBefore(w,g.firstChild);this.dataScript=w;if(!n){var x=new Date().getTime();this._latestScriptTime=x;w.setAttribute("time",x);v.on(w,"load",function(){this._scriptDataIsOut=w.getAttribute("time")!=this._latestScriptTime},this,true)}}this.queryParams="q="+encodeURIComponent(this.query)+"&code=utf-8&callback="+o;this.fireEvent(j,this.query);this.dataScript.src=this.dataSource+"?"+this.queryParams},handleResponse:function(C){if(this._scriptDataIsOut){return}this.returnedData=C;this.fireEvent(i,C);this.returnedData=this.formatData(this.returnedData);var A="";var y=this.returnedData.length;if(y>0){var B=document.createElement("ol");for(var z=0;z<y;++z){var x=this.returnedData[z];var w=this.formatItem(x.key,x.result);w.setAttribute("key",x.key);B.appendChild(w)}A=B}this._fillContainer(A);if(y>0){this.appendBottom()}if(e.trim(this.container.innerHTML)){this.fireEvent(f,this.container)}this._dataCache[this.query]=this.container.innerHTML;this._displayContainer()},formatData:function(A){var x=[];if(!A){return x}if(e.isArray(A.result)){A=A.result}var w=A.length;if(!w){return x}var z;for(var y=0;y<w;++y){z=A[y];if(e.isString(z)){x[y]={key:z}}else{if(e.isArray(z)&&z.length>=2){x[y]={key:z[0],result:z[1]}}else{x[y]=z}}}return x},formatItem:function(y,x){var w=document.createElement("li");var A=document.createElement("span");A.className=u;A.appendChild(document.createTextNode(y));w.appendChild(A);if(typeof x!="undefined"){var z=this.config.resultFormat.replace("%result%",x);if(e.trim(z)){var B=document.createElement("span");B.className=b;B.appendChild(document.createTextNode(z));w.appendChild(B)}}return w},appendBottom:function(){var w=document.createElement("div");w.className=t;if(this.config.showCloseBtn){var x=document.createElement("a");x.href="javascript: void(0)";x.setAttribute("target","_self");x.className=q;x.appendChild(document.createTextNode(this.config.closeBtnText));w.appendChild(x)}if(e.trim(w.innerHTML)){this.container.appendChild(w)}},_fillContainer:function(w){if(w.nodeType==1){this.container.innerHTML="";this.container.appendChild(w)}else{this.container.innerHTML=w}this.selectedItem=null},_displayContainer:function(){if(e.trim(this.container.innerHTML)){this.show()}else{this.hide()}},selectItem:function(y){var x=this.container.getElementsByTagName("li");if(x.length==0){return}if(!this.isVisible()){this.show();return}var w;if(!this.selectedItem){w=x[y?0:x.length-1]}else{w=c[y?"getNextSibling":"getPreviousSibling"](this.selectedItem);if(!w){this.textInput.value=this.query}}this._removeSelectedItem();if(w){this._setSelectedItem(w);this._updateInputFromSelectItem()}},_removeSelectedItem:function(){c.removeClass(this.selectedItem,m);this.selectedItem=null},_setSelectedItem:function(w){c.addClass((w),m);this.selectedItem=(w)},_getSelectedItemKey:function(){if(!this.selectedItem){return""}return this.selectedItem.getAttribute("key")},_updateQueryValueFromInput:function(){this.query=this.textInput.value},_updateInputFromSelectItem:function(){this.textInput.value=this._getSelectedItemKey(this.selectedItem)}});e.augmentProto(s.Suggest,d.EventProvider);s.Suggest.focusInstance=null;s.Suggest.callback=function(w){if(!s.Suggest.focusInstance){return}setTimeout(function(){s.Suggest.focusInstance.handleResponse(w)},0)}})(KISSY);
