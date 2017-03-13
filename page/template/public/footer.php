<?php
	if($debug){
		echo '<script src="/lib/require.min.js" data-main="/pc/backbonedemo/app/main" id="requirejs" debug="1" data-page="'.$page.'"></script>';
	}else{
		echo '<script src="'.substr($baseJsUrl,0,strpos($baseJsUrl,'/s')+1 ).'lib/require.min.js" data-main="'.$page.'" id="requirejs" debug="0" data-url="'.$baseJsUrl.'"></script>';
	}
?>
</body>
</html>