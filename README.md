# 悟空找房－wap

### 环境配置
> cnpm install

注意：`先安装`[Node.js](https://nodejs.org/zh-cn/)。


### 目录结构
> 暂定

```js
wap_fe
    ├──.tmp//编译代码目录
    │    ├──css
    │    ├──img
    │    └──js
    │
    ├──app
    │    ├──action//入口文件，一般与页面一一对应，是对象的集合
    │    │   ├──index.js
    │    │   ├──page1.js
    │    │   ├──page1.js
    │    │   ├──   ...
    │    │   └──pagex.js
    │    │
    │    ├──config//配置文件，r.js文件,和项目配置文件
    │    │    ├──exclude.json
    │    │    ├──merge.json
    │    │    └──project.json
    │    │
    │    ├──lib//第三方插件放在这里，或者所有项目通用插件也放在这里
    │    │
    │    ├──service//逻辑业务处理层，每个模块下面有该页面的具体业务js  尽量拆分的细一些，方便维护，返回对象
    │    │    ├──index-Module
    │    │    ├──page1-Module
    │    │    ├──page2-Module
    │    │    ├──...
    │    │    ├──pagex-Module
    │    │    └──base.js //所有模块都用的到的一个全局模块，比如懒加载啊，可以放这里
    │    │
    │    ├──test //测试数据，测试代码   test.json test.js可以放这里
    │    │
    │    ├──util //编写的一些项目公用 代码  放这里，比如public.js之类的
    │    │
    │    └──main.js //requirejs的 main文件
    │
    ├──page
    │    ├──css //less样式文件
    │    │    ├──index
    │    │    ├──page1
    │    │    ├──page2
    │    │    ├──page3
    │    │    ├──...
    │    │    └──pagex
    │    ├──font//字体图标库，用于本地调试，后端那边要有一份
    │    ├──img//图片白发位置
    │    │    ├──source//每个页面的图片，应该是index页面的图片放在一个index文件夹下面，以此类推
    │    │    └──sprite//雪碧图
    │    ├──template//php公共模板
    │    │    ├──public//公共模版  header  footer之类的
    │    │    └──list//列表公共模板   比如每一列的结构之类的
    │    ├──test//调试样式的文件
    │    ├──merge.json//grunt 编译less的路径文件   是一个json
    │    ├──index.php
    │    ├──page1.php
    │    ├──page2.php
    │    ├──page3.php
    │    ├──...
    │    └──pagex.php
    ├──csscomb.json //css 规范文件
    ├──.gitignore 
    ├──.jshintrc //js规范检查文件
    ├──gruntfile.js //grunt文件
    ├──package.json//npm init文件
    └──readme.md//介绍文件
```

### 开发流程
> 以需求版本2.11.0为例


1. 从*develop*分支切出*feature*分支wap2.11.0
1. 前端初步开发完成后代码合并到 *release/develop* 与后端联调 *feature从此不再维护*
```js
grunt dev -----编译开发代码，push之后merge,后端即可在dev01.fe.wkzf查看资源
```
3. 联调完成后，将编译代码推送到*release/test*分支送测
```js
grunt build -----编译测试代码，push之后merge,由测试构建发布
```
4. 在*release/test* 分支上修改前端BUG
```js
//如果需要把代码给后端看，联调之类的
//可以切到release/develop分支，然后把release/test代码合并
//也可以直接在release/test修改，方法是执行 grunt dev
grunt dev --- 编译开发代码，push merge之后， bamboo会自动发布到到开发环境
```
5. 测试通过 测试通知-运维发布
1. 将*release/test* 合并到 *develop* 分支

注意：`develop分支要过滤编译代码的提交`


### 发布方式
```js
grunt dev          编译生成开发代码

grunt build        生成线上代码


grunt release:css  //本地less编译调试	
grunt clear	       //清除文件
```
	


