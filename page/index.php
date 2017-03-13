<?php
	$pageName='p-index';
	$cssName='index';
	require 'template/public/header.php';
?>

<div class="w-wrapper">
	<?php
		require 'template/public/sidebar.php';
	?>
	<div class="w-main">
		<div class="w-page">
			<div class="w-pageTitle">
				这是第一篇文章
			</div>
			<div class="w-pageContent">
				<div class="pageCon thin-scroll">
					<div style="height:800px;">这是文章正文</div>
				</div>
			</div>
			<div class="w-pageFooter">
				这是文章页脚
			</div>
		</div>
	</div>
</div>


<?php
	$page='index';
	require 'template/public/footer.php';
?> 