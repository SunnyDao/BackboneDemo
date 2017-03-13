<?php
header("Content-Type: text/html; charset=UTF-8");
$baseCssUrl = '/pc/backbonedemo/.tmp/css/';
$debug = true;
$baseJsUrl = '/';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Gulp构建的Require+Backbone项目</title>
	<meta charset="utf-8"/>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
	<meta name="description" content="seo">
	<link rel="stylesheet" type="text/css" href="<?php echo $baseCssUrl?>public.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $baseCssUrl?><?php echo $cssName?>.css"/>
</head>
<body class="<?php echo !empty($pageName)?$pageName:""?>">

<header class="w-header">
	<div class="navbar-fixed-top">
		<div class="logo nav-handler"><a href="">Oscar's Blog</a></div>
		<div class="mainNav">
			<ul class="clearfix nav-handler">
				<li><a href="">Home</a></li>
				<li><a href="">HTML</a></li>
				<li><a href="">CSS</a></li>
				<li><a href="">JavaScript</a></li>
				<li><a href="">Backbone</a></li>
				<li><a href="">Angular</a></li>
				<li><a href="">React</a></li>
				<li><a href="">ReactNative</a></li>
				<li><a href="">Demo</a></li>
			</ul>
		</div>
		<div class="usserCenter">
			<div class="pic"><img src="./img/source/src/200.jpg"></div>
		</div>
	</div>
</header>