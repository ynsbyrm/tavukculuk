/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojs/ojcomponentcore"],function(a,g){(function(){a.ab("oj.ojTrain",g.oj.baseComponent,{version:"1.0.0",defaultElement:"\x3cdiv\x3e",widgetEventPrefix:"oj",options:{steps:[],selected:"",selectedStep:"",beforeDeselect:null,deselect:null,beforeSelect:null,select:null},Sk:0,zc:null,_ComponentCreate:function(){this._super();this.aka()},aka:function(){var a=this.options,b=a.steps;this.Sk=b.length;this.Vk=g("\x3cdiv class\x3d'oj-train-wrapper'\x3e\x3c/div\x3e");this.Vk.appendTo(this.element);
this.oM=g("\x3cdiv class\x3d'oj-train-connector-wrapper'\x3e\x3c/div\x3e");this.oM.appendTo(this.Vk);var d=this.element.attr("class");(this.yka=null!=d&&0<=d.indexOf("oj-train-stretch"))&&this.oM.css("padding","0 "+100/(2*this.Sk)+"%");this.Raa=g("\x3cdiv class\x3d'oj-train-connector'\x3e\x3c/div\x3e");this.Raa.appendTo(this.oM);this.jh=g("\x3cul\x3e");this.jh.addClass("oj-train-step-list");this.AW=g("\x3cdiv class\x3d'oj-train-connector-fill'\x3e\x3c/div\x3e");this.AW.appendTo(this.oM);this.DMa();
this.Jj=this.GN(a.selectedStep||a.selected);-1===this.Jj&&b[0]&&b[0].id&&(this.Jj=0,a.selectedStep=b[0].id,a.selected=b[0].id);for(a=0;a<this.Sk;a++)b=g("\x3cli\x3e").addClass("oj-train-step-list-item").attr({id:this.zc[a][1]}),d=this.zc[a][4],"confirmation"===d?b.addClass("oj-confirmation"):"info"===d?b.addClass("oj-info"):"error"===d||"fatal"===d?b.addClass("oj-invalid"):"warning"===d&&b.addClass("oj-warning"),b.appendTo(this.jh),this.OAa(a),this.RAa(a),this.NAa(a),this.MAa(a),this.SAa(a),this.PAa(a),
this.yka&&b.css("width",100/this.Sk+"%");this.AW.css({width:(this.Sk-1===this.Jj?100:100/(2*(this.Sk-1))+this.Jj/(this.Sk-1)*100)+"%"});this.jh.appendTo(this.Vk);this.element.addClass("oj-train")},DMa:function(){var a=this.options;this.zc=[];for(var b=0;b<this.Sk;b++){var d=a.steps[b];this.zc[b]=Array(5);this.zc[b][0]=d.label?d.label:null;this.zc[b][1]=d.id?d.id:null;this.zc[b][2]=d.disabled?!0:!1;this.zc[b][3]=d.visited?!0:!1;this.zc[b][4]=d.messageType?d.messageType:null}},MAa:function(a){var b=
g("\x3cdiv/\x3e").addClass("oj-train-button"),d=g("\x3cspan/\x3e"),e=this,f="";if(this.zc[a]){var h=this.zc[a][3],k=this.zc[a][2];this.Jj===a?(b.addClass("oj-selected"),f=" current "):h&&!k?(b.addClass("oj-visited"),f=" visited "):h||k?b.addClass("oj-disabled"):(b.addClass("oj-default"),f=" not visited ");this.zc[a][2]||this.Jj===a||(this.Yf(b),this.pk(b),b.on("click"+this.eventNamespace,function(a){e.IX(this.parentNode.parentNode.id,a);e.refresh()}));h=this.jh.children().eq(a).find(".oj-train-button-connector");
1<=h.length&&h.children().remove();h.append(b);d.text(f);d.addClass("oj-helper-hidden-accessible");this.jh.children().eq(a).find("a").append(d)}},PAa:function(a){if(this.zc[a]&&this.zc[a][4]){var b=g("\x3cdiv/\x3e").addClass("oj-train-icon oj-component-icon").attr("aria-hidden","true"),d=g("\x3cspan/\x3e"),e="",f=this,h=this.zc[a][4];"confirmation"===h?(b.addClass("oj-confirmation"),e=" Confirmation "):"info"===h?(b.addClass("oj-info"),e=" Info "):"error"===h?(b.addClass("oj-error"),e=" Error "):
"fatal"===h?(b.addClass("oj-error"),e=" Error "):"warning"===h&&(b.addClass("oj-warning"),e=" Warning ");var k=this.jh.children().eq(a).find(".oj-train-button");2<=k.children().length&&k.children()[1].remove();if(!this.zc[a][2]&&this.Jj!==a)b.on("click"+this.eventNamespace,function(a){f.IX(this.parentNode.parentNode.parentNode.id,a);f.refresh()});null!=h&&(d.text(e),d.addClass("oj-helper-hidden-accessible"),this.jh.children().eq(a).find("a").append(d),k.append(b))}},Bca:function(a,b,d){var e={fromStep:this.getStep(a),
toStep:this.getStep(b),optionMetadata:{writeback:d?"shouldWrite":"shouldNotWrite"}};!1!==this._trigger("beforeDeselect",d,e)&&!1!==this._trigger("beforeSelect",d,e)&&(a=this.GN(a),-1!==a&&(this.options.steps[a].visited=!0),this._trigger("deselect",d,e),this.options.selectedStep&&this.option("selectedStep",b,{_context:{originalEvent:d,kb:!0}}),this.options.selected&&this.option("selected",b,{_context:{originalEvent:d,kb:!0}}),this._trigger("select",d,e))},SAa:function(a){var b=g("\x3cdiv/\x3e").addClass("oj-train-button-text");
b.append((a+1).toString());this.jh.children().eq(a).find(".oj-train-button").append(b)},NAa:function(a){if(a!=this.Sk-1){var b=g("\x3cdiv/\x3e").addClass("oj-train-step-individual-connector");this.jh.children().eq(a).prepend(b)}},RAa:function(a){var b=g("\x3cdiv/\x3e");b.addClass("oj-train-button-connector");this.zc[a]&&(a<=this.Jj&&b.addClass("oj-train-fill"),a=this.jh.children().eq(a).children(),b.insertBefore(a))},OAa:function(a){var b=this;if(this.zc[a]){var d=g("\x3cdiv/\x3e").addClass("oj-train-label-wrapper"),
e=g("\x3ca\x3e");e.text(this.zc[a][0]);var f=this.zc[a][2];d.append(e);e.addClass("oj-train-label");a===this.Jj?e.addClass("oj-selected"):this.zc[a][3]&&!f?e.addClass("oj-visited"):f&&e.addClass("oj-disabled");f||(e.attr("href","#"),this.Yf(e),this.pk(e),e.on("click keydown"+this.eventNamespace,function(a){if(a.keyCode===g.ui.keyCode.ENTER||"click"===a.type)a.preventDefault(),b.IX(this.parentNode.parentNode.id,a),b.refresh(),a.keyCode===g.ui.keyCode.ENTER&&b.im(this.parentNode.parentNode.id)}));e=
this.jh.children().eq(a).children();2<=e.length&&e[1].remove();this.jh.children().eq(a).append(d)}},GN:function(a){for(var b=0;b<this.Sk;b++)if(this.zc[b]&&this.zc[b][1]===a)return b;return-1},getStep:function(a){for(var b=0;b<this.Sk;b++)if(this.zc[b]&&this.zc[b][1]===a)return g.extend({},this.options.steps[b]);return null},nextSelectableStep:function(){return this.getNextSelectableStep()},previousSelectableStep:function(){return this.getPreviousSelectableStep()},getNextSelectableStep:function(){for(var a=
this.Jj;a<this.Sk;a++)if(a+1<this.Sk&&this.zc[a+1]&&!this.zc[a+1][2])return this.zc[a+1][1];return null},getPreviousSelectableStep:function(){for(var a=this.Jj;0<=a;a--)if(this.zc[a-1]&&!this.zc[a-1][2])return this.zc[a-1][1];return null},setStep:function(a){a.id&&this.updateStep(a.id,a)},updateStep:function(a,b){if(a){var d=this.getStep(a),e=this.GN(a);-1!==e&&(e=this.options.steps[e],b.label&&(d[0]=b.label,e.label=b.label),"string"===typeof b.id&&(d[1]=b.id,e.id=b.id),"boolean"===typeof b.disabled&&
(d[2]=b.disabled,e.disabled=b.disabled),"boolean"===typeof b.visited&&(d[3]=b.visited,e.visited=b.visited),b.messageType&&(d[4]=b.messageType,e.messageType=b.messageType),this.refresh())}},_setOptions:function(a){this._super(a);this.refresh()},_setOption:function(a,b,d){("selectedStep"==a||"selected"==a)&&this.zc&&this.zc[this.Jj]?b!=this.zc[this.Jj][1]&&this.Bca(this.zc[this.Jj][1],b,null):this._super(a,b,d)},refresh:function(){this._super();this._destroy();this.aka()},_destroy:function(){this.jh.children().each(function(){g(this).remove()});
this.element.removeClass("oj-train");this.element.find(".oj-train-wrapper").remove();this.element.find(".oj-train-connector-wrapper").remove();this.element.find(".oj-train-step-list").remove();this.element.find(".oj-train-step-list").remove();this._super()},IX:function(a,b){var d=this.zc[this.Jj][1];d!=a&&this.Bca(d,a,b)},im:function(a){a=this.GN(a);this.jh.children().eq(a).find(".oj-train-label").focus()},getNodeBySubId:function(a){if(null===a)return this.element?this.element[0]:null;var b=a.index;
if("number"!==typeof b||0>b||b>=this.Sk)return null;switch(a.subId){case "oj-train-step":return this.jh.children().eq(b)[0];case "oj-train-button":return this.jh.children().eq(b).find(".oj-train-button")[0];case "oj-train-button-connector":return this.jh.children().eq(b).find(".oj-train-button-connector")[0];case "oj-train-connector":return this.Raa;case "oj-train-connector-fill":return this.AW;case "oj-train-icon":return this.jh.children().eq(b).find(".oj-train-icon")[0];case "oj-train-label":return this.jh.children().eq(b).find(".oj-train-label")[0]}return null},
getSubIdByNode:function(a){for(var b=this.zc?this.zc.length:0,d=0;d<b;d++){var e={subId:"oj-train-step",index:d};if(a===this.getNodeBySubId(e))return e}return null}})})();a.U.qb("oj-train","baseComponent",{properties:{selectedStep:{type:"string",writeback:!0},steps:{type:"Array\x3cobject\x3e"}},methods:{getStep:{},getNextSelectableStep:{},getPreviousSelectableStep:{},refresh:{},updateStep:{}},extension:{nb:"ojTrain"},events:{select:{},deselect:{},beforeDeselect:{},beforeSelect:{}}});a.U.register("oj-train",
{metadata:a.U.getMetadata("oj-train")})});