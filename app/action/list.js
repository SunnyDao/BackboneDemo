require([
	'jquery', 
	'underscore', 
	'backbone',
	'service/list/list'
], function ($, _, Backbone,List){
	var list= new List();
	list.aaa();
	list.bbb();
});