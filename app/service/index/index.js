define([
	'jquery',
	'underscore', 
	'backbone'
],function ($,_,Backbone){
	var Index =  Backbone.Model.extend({
		'aaa':function(){
			console.log("这里是实例方法")
		}
	},{
		bbb:function(){
			this.ccc();
		},
		ccc:function(){
			console.log("这里是静态方法")
		}
	});
	return Index;
})
