<?php
/*
 * Qualcomm HTML5 Modules : Mobile Technology Overview
 */
$v = '0.1.8';
$qv = '?v='. $v;
?>
<!doctype html>
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Mobile Technology Overview</title>
		
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes" />
		<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">
	
	<link rel="stylesheet" href="../_common/css/jquery.qualcomm-reveal.css">
	<link rel="stylesheet" href="../_common/fonts/stylesheet.css">
	<link rel="stylesheet" href="edge_includes/base.css<?php echo $qv ?>">
<!--Adobe Edge Runtime-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="../_common/js/jquery-1.10.1.min.js"><\/script>')</script>
	
	<script src="../_common/js/spin.min.js"></script>
	<script src="../_common/js/jquery.inview.min.js"></script>
	<script src="../_common/js/jquery.qualcomm-reveal.min.js"></script>

<?php
	$edgejs = array('','SixTechnologies_Mobile','Elite_spaceship_Mobile','Elite_Battery_Mobile','DVD','Cars');
	foreach( $edgejs as $s ) {
		$es = ( $s == '' ? '' : $s .'_' );
		echo "\t". '<script src="edge_includes/'. $es .'edgePreload.js'. $qv .'"></script>' ."\n";
	}
?>
<!--Adobe Edge Runtime End-->
</head>
<body
	<div class="content-container">
		<div id="header" class="stagewrapper">
			<h1>Mobile technology.</h1>
			<h2>An amazing achievement.</h2>
			<div class="triangle"></div>
		</div>
		<!-- six technologies -->
		<div id="Stage1wrap" class="stagewrapper"><div id="Stage1" class="EDGE-30503229"></div></div>
		<!-- spaceship -->
		<div id="Stage2wrap" class="stagewrapper"><div id="Stage2" class="EDGE-15320788"></div></div>
		<!-- battery -->
		<div id="Stage3wrap" class="stagewrapper"><div id="Stage3" class="EDGE-58030357"></div></div>
		<!-- dvd -->
		<div id="Stage4wrap" class="stagewrapper"><div id="Stage4" class="EDGE-50043193"></div></div>
		<!-- cars -->
		<div id="Stage5wrap" class="stagewrapper"><div id="Stage5" class="EDGE-15758297"></div></div>
		<?php /*
		<div class="stagewrapper proceed">
		<a href="#quiz">Proceed to quiz</a>
		</div>
		*/ ?>
		<div class="stagewrapper ftr">
			<div class="inner">
				<p><img src="edge_includes/qualcomm.png" alt="Qualcomm" /></p>
				<p>&copy; <?php date_default_timezone_set('UTC'); echo date('Y'); ?> Qualcomm Technologies, Inc. All rights reserved.</p>
<p>1 - Battery holds ~5 watt-hours of energy<br />
2 - on network per month in 2013. Source: Cisco VNI, 2013, A.T. Kearney Analysis<br />
3 - Source: Machina Research, Apr. '13</p>
<p>Qualcomm is a trademark of QUALCOMM Incorporated registered in the United States and other countries. Gobi and Snapdragon are trademarks of Qualcomm Technologies, Inc. Other products and brand names are property of their respective owners.</p>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="edge_includes/animate.js"></script>
</body>
</html>