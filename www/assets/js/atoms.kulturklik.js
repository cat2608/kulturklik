/* kulturklik v1.0.0 - 2014/6/30
   https://twitter.com/soyjavi
   Copyright (c) 2014 @soyjavi - Licensed  */
(function(){"use strict";var __schedule,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1};__.Entity.Category=function(_super){function Category(){return Category.__super__.constructor.apply(this,arguments)}return __extends(Category,_super),Category.fields("id","name","count"),Category.prototype.parse=function(){return{text:this.name,info:this.count,style:"category_"+this.id}},Category}(Atoms.Class.Entity),__.Entity.Event=function(_super){function Event(){return Event.__super__.constructor.apply(this,arguments)}return __extends(Event,_super),Event.fields("id","title","description","image","category","tags","type","price","address","position","started_at","finished_at","schedule","created_at"),Event.prototype.parse=function(){return{image:this.image,text:this.title,description:this.address,info:__schedule(this.schedule),style:"category_"+this.category.id}},Event}(Atoms.Class.Entity),__schedule=function(value){return null!=value&&":"===value.substr(2,1)?value.substr(0,5):""},Atoms.Organism.Event=function(_super){function Event(){Event.__super__.constructor.apply(this,arguments),this.render()}return __extends(Event,_super),Event.scaffold("assets/scaffold/event.json"),Event.prototype.show=function(entity){var tag,_i,_len,_ref,_ref1;for(this.entity=entity,Atoms.Url.path("event/info"),this._reset(),this.el.attr("data-category",this.entity.category.id),this.header.category.refresh({value:this.entity.category.name}),this.info.image.refresh(this.entity.image?{url:this.entity.image}:{url:"http://"}),this.info.summary.title.refresh({value:this.entity.title}),this.entity.schedule&&(this.info.summary.extra.schedule.refresh({value:this.entity.schedule}),this.info.summary.extra.schedule.el.show()),this.entity.price&&(this.info.summary.extra.price.refresh({value:this.entity.price}),this.info.summary.extra.price.el.show()),_ref=this.entity.tags.slice(1,5),_i=0,_len=_ref.length;_len>_i;_i++)tag=_ref[_i],-1===tag.indexOf(" ")&&this.info.tags.appendChild("Atom.Label",{value:tag});return 2===(null!=(_ref1=this.entity.position)?_ref1.length:void 0)&&(this.info.map.el.show(),setTimeout(function(_this){return function(){var position,_ref2,_ref3,_ref4,_ref5;return position={latitude:_this.entity.position[0],longitude:_this.entity.position[1]},null!=(_ref2=_this.info.map)&&_ref2.clean(),null!=(_ref3=_this.info.map)&&_ref3.center(position),null!=(_ref4=_this.info.map)&&_ref4.zoom(16),null!=(_ref5=_this.info.map)?_ref5.marker(position):void 0}}(this),500)),this.info.summary.address.refresh({value:this.entity.address}),this.info.description.el.html(this.entity.description)},Event.prototype._reset=function(){return this.info.summary.extra.schedule.el.hide(),this.info.summary.extra.price.el.hide(),this.info.tags.destroyChildren(),this.info.map.el.hide(),this.info.summary.schedule.started_at.el.hide(),this.info.summary.schedule.finished_at.el.hide()},Event}(Atoms.Organism.Article),new Atoms.Organism.Event,Atoms.Organism.Main=function(_super){function Main(){return Main.__super__.constructor.apply(this,arguments)}return __extends(Main,_super),Main.scaffold("assets/scaffold/main.json"),Main.prototype.fetching=!1,Main.prototype.render=function(){return Main.__super__.render.apply(this,arguments),this.__resetPagination(),this.context="today",this.fetch()},Main.prototype.fetch=function(page,category,destroy){var background,parameters,_ref;return null==page&&(page=0),this.category=null!=category?category:void 0,null==destroy&&(destroy=!1),this.fetching=!0,this.category||(this.category=null!=(_ref=__.Entity.Category.all()[0])?_ref.id:void 0),destroy&&(__.Entity.Event.destroyAll(),this.__resetPagination()),0===page&&(this.page[this.context]=0),this.page[this.context]++,parameters={started_at:this.date[this.context],page:this.page[this.context]},this.category&&(parameters.category=this.category),this.el.attr("data-category",this.category),background=0===parameters.page?!1:!0,KulturKlik.proxy("GET","search",parameters,background).then(function(_this){return function(error,response){var append,events,result;return events=function(){var _i,_len,_ref1,_results;for(_ref1=response.results,_results=[],_i=0,_len=_ref1.length;_len>_i;_i++)result=_ref1[_i],_results.push(__.Entity.Event.create(result));return _results}(),_this[_this.context].list.entity(events,append=!0),32===response.results.length&&(_this.fetching=!1),_this[_this.context].refresh()}}(this))},Main.prototype.onContext=function(event,dispatcher){return this.context=dispatcher.attributes.path.split("/").pop(),0===this.page[this.context]?this.fetch(0,this.category):void 0},Main.prototype.onEvent=function(){var atom,dispatcher,hierarchy;return atom=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],__.Article.Event.show(atom.entity)},Main.prototype.onSectionScroll=function(event){return Main.__super__.onSectionScroll.apply(this,arguments),!this.fetching&&event.down&&event.height-event.scroll<128?this.fetch(this.page[this.context],this.category):void 0},Main.prototype.__resetPagination=function(){return this.page={today:0,tomorrow:0,likes:0},this.date={today:moment().format("YYYY/MM/DD"),tomorrow:moment().add("days",1).format("YYYY/MM/DD")}},Main}(Atoms.Organism.Article),new Atoms.Organism.Main,Atoms.Organism.Menu=function(_super){function Menu(){return Menu.__super__.constructor.apply(this,arguments)}var ALL_LABEL,UNALVAILABLE_CATEGORIES;return __extends(Menu,_super),Menu.scaffold("assets/scaffold/menu.json"),ALL_LABEL="Todas",UNALVAILABLE_CATEGORIES=["artes visuales","museos"],Menu.prototype.render=function(){var promise;return Menu.__super__.render.apply(this,arguments),promise=new Hope.Promise,KulturKlik.proxy("GET","categories").then(function(){return function(error,response){var category,_i,_len,_ref,_ref1;for(__.Entity.Category.create({name:ALL_LABEL}),_ref=response.categories,_i=0,_len=_ref.length;_len>_i;_i++)category=_ref[_i],_ref1=category.name.toLowerCase(),__indexOf.call(UNALVAILABLE_CATEGORIES,_ref1)<0&&__.Entity.Category.create(category);return promise.done(null,!0)}}(this)),promise},Menu.prototype.onCategory=function(){var atom,category,destroy,dispatcher,hierarchy;return atom=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],category=null!=atom.entity.id?atom.entity.id||"":void 0,__.Article.Main.fetch(0,category,destroy=!0),__.Article.Main.aside(this.attributes.id),atom.el.addClass("active").siblings().removeClass("active")},Menu}(Atoms.Organism.Aside),new Atoms.Organism.Menu,Atoms.Organism.Session=function(_super){function Session(){return Session.__super__.constructor.apply(this,arguments)}return __extends(Session,_super),Session.scaffold("assets/scaffold/session.json"),Session.prototype.render=function(){return Session.__super__.render.apply(this,arguments),Appnima.key=__.key.appnima},Session.prototype.get=function(){return Appnima.User.session()},Session.prototype.onSuccess=function(){return Atoms.Url.path("main/today")},Session.prototype.onAppnimaSessionError=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?__slice.call(arguments,2):[],console.log("onAppnimaSessionError",event)},Session}(Atoms.Organism.Article),new Atoms.Organism.Session,window.KulturKlik=function(){var _proxy;return _proxy=function(type,method,parameters,background){var promise,session,token;return null==parameters&&(parameters={}),null==background&&(background=!1),promise=new Hope.Promise,background||__.Modal.Loading.show(),session=__.Article.Session.get(),token=null!=session?session.token:null,$$.ajax({url:""+__.key.host+method,type:type,data:parameters,contentType:"application/x-www-form-urlencoded",dataType:"json",headers:{Authorization:token},success:function(response){return background||__.Modal.Loading.hide(),promise.done(null,response)},error:function(){return function(xhr,error){return background||__.Modal.Loading.hide(),error={code:error.status,message:error.response},console.error("Atoms.Ide.proxy [ERROR "+error.code+"]: "+error.message),promise.done(error,null)}}(this)}),promise},Atoms.$(function(){return __.Aside.Menu.render().then(function(){return Atoms.Url.path("main/today")})}),{proxy:_proxy}}(),__.key={host:"http://devcast.co/culture/",appnima:"NTM2YTZlZWYxZWFkMTZjMzQzOWE1NzM3OkljbjRFRHdiQ252b0JkdXBxdThvdHpiV2phbVRpOG8="}}).call(this);