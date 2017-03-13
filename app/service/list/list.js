define([
	'jquery',
	'underscore', 
	'backbone'
],function ($,_,Backbone){
	var List =  Backbone.Model.extend({
		'aaa':function(){
			console.log("这里是list实例方法")
		}
	},{
		bbb:function(){
			this.ccc();
		},
		ccc:function(){
			console.log("这里是list静态方法")
		}
	});
	return List;
})
