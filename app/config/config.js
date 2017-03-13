var lesssrc = "page/css"; 
var fontsrc= "page/font"
var jssrc= "app"    
var dest = ".tmp";

module.exports = {
	less: {
		all:lesssrc+"/**/*.less",
		src: lesssrc + "/*.less",	  	//需要编译的less
		dest: dest + "/css",		  			//输出目录
		settings: {					  			//编译less过程需要的配置，可以为空
		}
	},
	js:{
		all:[jssrc+"**/*.js",jssrc+"**/**/*.js"],
		main:jssrc+"main.js"
	},
	clean:{
		src: dest
	},
	copy: {
		font:fontsrc+"/*",
		fontdest:dest+"/font"
	}
}