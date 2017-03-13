'use strict';

var path   = require('path');
var gulp   = require('gulp');
var colors = require('colors');  
var clean  = require('gulp-clean')
var less   = require('gulp-less');
var	concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var plumber= require('gulp-plumber');
var replace= require('gulp-replace');
var postcss= require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var $      = require('gulp-load-plugins')();
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var minifyCss    = require("gulp-minify-css");
var cleanCss     = require("gulp-clean-css");
var gulpSequence = require('gulp-sequence');
var cssSprite    = require('gulp-css-spritesmith');
var spriter      = require('gulp-css-spriter');
var requirejsOptimize = require('gulp-requirejs-optimize');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


//配置文件路径
var pkg = require('./package.json');
var project=require('./app/config/project.json');
var rPath=require('./app/config/exclude.json');
var cssPath=require('./page/merge.json');
var remPath=require('./static/merge.json');

var FE_PUBLIC_LIB_PATH = "../fe_public_library/";
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var PAGE_PATH = path.resolve(ROOT_PATH, 'page');
var STATIC_PATH = path.resolve(ROOT_PATH, 'static');
var VIEW_PATH = path.resolve(ROOT_PATH, 'view');
var DIST_PATH = path.resolve(ROOT_PATH, '.tmp');

var onError = notify.onError({
  title: 'Gulp',
  subtitle: 'Failure!',
  message: 'Error: <%= error.message %>',
  sound: 'Beep'
});

var banner = [
'/**',
' * <%= pkg.title || pkg.name %>-<%= pkg.description %>',
' * @version V<%= pkg.version %>',
' * @timer <%= year%>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

colors.setTheme({  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    warn: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
});

//清除文件
gulp.task('clear', function() {  
    return gulp.src([DIST_PATH], {read: false})
      .pipe(clean());
});

//复制图片
gulp.task('copy:img',function(){
    return gulp.src([
        PAGE_PATH+'/img/**/*.*',
        STATIC_PATH+'/img/**/*.*'
    ])
    .pipe(gulp.dest(DIST_PATH+'/img'))
})
//复制插件js库
gulp.task('copy:libjs',function(){
    return gulp.src(FE_PUBLIC_LIB_PATH+'lib/ui/**/*.*')
        .pipe(gulp.dest(APP_PATH+'/lib/ui'))
})
//复制插件样式库
gulp.task('copy:libcss',function(){
    return gulp.src(FE_PUBLIC_LIB_PATH+'lib/css/**/*.*')
        .pipe(gulp.dest(PAGE_PATH+'/css/lib/css'))
        .pipe(gulp.dest(STATIC_PATH+'/css/lib/css'))
})
//复制字体
gulp.task('copy:font',function(){
  return gulp.src(STATIC_PATH+'/font/*')
    .pipe(gulp.dest(DIST_PATH+'/font'))
})
//复制html和php
gulp.task('copy:html',function(){
    return gulp.src([
        PAGE_PATH+'/*.php',
        PAGE_PATH+'/*.html',
        PAGE_PATH+'/**/*.php',
        '!'+PAGE_PATH+'/test/**/*.php',
        VIEW_PATH+'/*.php',
        VIEW_PATH+'/*.html',
        VIEW_PATH+'/**/*.php'
    ])
    .pipe(gulp.dest(DIST_PATH))
})

gulp.task('copy:main',['copy:font','copy:img','copy:libcss','copy:libjs'],function(){
    return console.log('Copy Success!!!')
})
gulp.task('copy:dev',['copy:font','copy:img','copy:html','copy:libcss','copy:libjs'],function(){
    return console.log('Copy:dev Success!!!')
})
gulp.task('copy:build',['copy:img','copy:libcss','copy:libjs'],function(){
    return console.log('Copy:build Success!!!')
})

//编译less
gulp.task('less',function(){
    for(var i in cssPath){
        gulp.src(cssPath[i])
        .pipe(plumber({
            errorHandler:function(error){
                console.log('[错误警告:]'.error+error.message.warn)
                this.emit('end')
            }
        }))
        .pipe(less({
            paths:['page/css']
        }))
        .pipe(concat(i))
        .pipe(gulp.dest('./'))
    };
})
gulp.task('less:rem', function() {
    var processors = [px2rem({remUnit: 75})];
    for(var i in remPath){
        gulp.src(remPath[i])
        .pipe(plumber({
            errorHandler:function(error){
                console.log('[错误警告:]'.error+error.message.warn)
                this.emit('end')
            }
        }))
        .pipe(less())
        .pipe(concat(i))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./'))
    };
});
//雪碧图编译
gulp.task('autoSprite', function() {
    var TMP_PATH = DIST_PATH+'/';
    gulp.src(DIST_PATH+'/**/*.css').pipe(cssSprite({
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: 'tmp/img/sprite/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'tmp/img/',
        // 替换后的背景路径，默认 ../images/
        spritepath: null,
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: true,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true,
        // 默认使用二叉树最优排列算法
        algorithm: 'binary-tree'
    }))
    .pipe(gulp.dest(DIST_PATH));
});


//编译requireJs
gulp.task("rjs", function () { 
  return gulp.src('app/action/*.js')
    .pipe(plumber({
        errorHandler:function(error){
            console.log('[错误警告:]'.error+error.message.warn)
            this.emit('end')
        }
    }))
    .pipe(requirejsOptimize(function(file) {
        var fileName=file.relative.replace(/\.js$/, '');
        return {
            baseUrl: 'app',
            optimize: 'none',
            mainConfigFile: 'app/main.js',
            paths:rPath,
            name:'action/'+fileName,
            include:['main']
        };
    }))
    .pipe(gulp.dest(".tmp/js"))
});

//替换
gulp.task('replace:dev',function(){
    return gulp.src([
        DIST_PATH+'/**/*.php',
        DIST_PATH+'/**/*.html'
    ])
    .pipe(replace(/=\"\/?(img\/.*\.(?:css|jpg|gif|png|js|ico){1})/g,'=\"'+project.static.devUrl+'/'+project.slotDev+project.package+'/$1'))
    .pipe(replace(/data-main=(?:\'|\")(\'.\$\w+.\')(?:\'|\")/g,'data-main=\"'+project.static.devUrl+'/'+project.slotDev+project.package+'/js/$1.js?v='+pkg.version+'\"'))
    .pipe(replace(/\$debug\s?=\s?true/g,'$debug=false'))
    .pipe(replace(/(\$baseCssUrl\s?=\s?)'(\w|\/|\.)*'/g,"$1'"+project.static.devUrl+"/"+project.slotDev+project.package+"/css/'"))
    .pipe(replace(/(\$baseFontUrl\s?=\s?)'(\w|\/|\.)*'/g,"$1'"+project.static.devUrl+"/"+project.slotDev+project.package+"/font/'"))
    .pipe(replace(/(\$baseJsUrl\s?=\s?)'(\w|\/)*'/g,"$1'"+project.static.devUrl+"/"+project.slotDev+"'"))
    .pipe(gulp.dest(DIST_PATH))
})
gulp.task('replace:devcss',function(){
    return gulp.src(DIST_PATH+'/**/*.css')
        .pipe(replace(/url\(\s?(?:\"|\')?(\.)*\/img\/((?:\w+\/)*(?:\w|\-|\_)+\.(?:jpg|png|ico|svg|gif){1})\s?(?:\"|\')?\)/g,'url("'+project.static.devUrl+'/'+project.slotDev+project.package+'/img/$2?v='+pkg.version+'")'))
        .pipe(gulp.dest(DIST_PATH))
})
gulp.task('replace:css',function(){
    var timer= new Date().getTime();
    return gulp.src(DIST_PATH+'/**/*.css')
        .pipe(replace(/url\(\s?(?:\"|\')?(\.)*\/img\/((?:\w+\/)*(?:\w|\-|\_)+\.(?:jpg|png|ico|svg|gif){1})\s?(?:\"|\')?\)/g,'url("'+project.static.proUrl+'/'+project.slotPro+project.package+'/img/$2?v='+timer+'")'))
        .pipe(gulp.dest(DIST_PATH))
})
gulp.task('replace:js',function(){
    return gulp.src(DIST_PATH+'/**/*.js')
        .pipe(replace(/\s*define\(\"\w+\".*function\(\)\{\}\)\;/g,""))
        .pipe(gulp.dest(DIST_PATH))
})

//压缩
function getTime(){
    return new Date().toISOString().replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\w+/,'$1-$2');
}
gulp.task('uglify:js',function(){
    var year = getTime();
    return gulp.src(DIST_PATH+'/**/*.js')
    .pipe(uglify())
    .pipe(header(banner,{
        year:year,
        pkg:pkg
    }))
    .pipe(gulp.dest(DIST_PATH))
});
gulp.task('uglify:css',function(){
    var year = getTime();
    return gulp.src(DIST_PATH+'/**/*.css')
    .pipe(minifyCss())
    .pipe(header(banner,{
        year:year,
        pkg:pkg
    }))
    .pipe(gulp.dest(DIST_PATH))
});

gulp.task('uglify',function(cb){
    gulpSequence('uglify:js','uglify:css',cb)
})



//监听变动
gulp.task('watch', function () {
    gulp.watch(PAGE_PATH+'/css/**/*.less', ['less']);
    gulp.watch(STATIC_PATH+'/css/**/*.less', ['less:rem']);
    gulp.watch(APP_PATH+'/**/*.js', ['rjs']);
});

gulp.task('less-watch', ['less'], browserSync.reload);
gulp.task('less:rem-watch', ['less:rem'], browserSync.reload);
gulp.task('rjs-watch', ['rjs'], browserSync.reload);


//默认执行
gulp.task('default',['watch']);
gulp.task('release:css',gulpSequence('clear','copy:main','less','less:rem','autoSprite'));
gulp.task('dev',gulpSequence('clear','copy:dev','less','less:rem','rjs','replace:dev','replace:devcss','replace:js'));
gulp.task('build',gulpSequence('clear','copy:build','less','less:rem','rjs','replace:css','replace:js','uglify'));
gulp.task('server',gulpSequence('clear','copy:main','less','less:rem','rjs'));
gulp.task('serve', ['server'], function () {
    browserSync.init({
        proxy: "http://127.0.0.1"
    });
    gulp.watch([
        'page/*.php',
        'page/*.html',
        'view/**/*.php',
        'view/**/*.html'
    ]).on('change', reload);
    gulp.watch(PAGE_PATH+'/css/**/*.less', ['less-watch']);
    gulp.watch(STATIC_PATH+'/css/**/*.less', ['less:rem-watch']);
    gulp.watch(APP_PATH+'/**/*.js', ['rjs-watch']);
});

