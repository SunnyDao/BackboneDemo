require([
	'jquery', 
	'underscore', 
	'backbone',
	'service/index/index'
], function ($, _, Backbone,Index){
	var index= new Index();
	index.aaa();
	Index.bbb();
});