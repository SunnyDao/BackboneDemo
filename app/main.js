(function(){

	var obj = document.getElementById('requirejs');
	var isDebug=0;

	var config = {
	    paths: {
	        jquery: '/lib/jquery-1.11.2.min',
	        underscore:'/lib/underscore.min',
	        backbone: '/lib/backbone.min'
	    },
	    shim: {
	        jquery: {
	            deps: [],
	            exports: '$'
	        },
	        underscore:{
	        	deps: [],
	            exports: '_'
	        },
	        backbone: {
	            deps: ['underscore'],
	            exports: 'backbone'
	        }
	    }
	};

	require.config(config);

	//require(['action/index'])
	if (obj) {
        isDebug = parseInt(obj.getAttribute('debug'), 10) || 0;
        var page = obj.getAttribute('data-page');

        if (isDebug && typeof(page) ==='string' && page!='' ) {
            require([page.indexOf('/')<0?'action/' + page:page]);
        }
    }
})()