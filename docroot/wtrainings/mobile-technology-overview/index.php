<?php
/*
 * Qualcomm HTML5 Modules : Mobile Technology Overview
 */
$v = '1.0.1';
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
	<script src="edge_includes/jquery.min.js"></script>
	
	<script src="../_common/js/spin.min.js"></script>
	<script src="../_common/js/jquery.inview.min.js"></script>
	<script src="../_common/js/jquery.qualcomm-reveal.min.js?v=1.0.3"></script>

<?php
	$edgejs = array('','SixTechnologies_Mobile','Elite_spaceship_Mobile','Elite_Battery_Mobile','DVD','Cars');
	foreach( $edgejs as $s ) {
		$es = ( $s == '' ? '' : $s .'_' );
		echo "\t". '<script src="edge_includes/'. $es .'edgePreload.js'. $qv .'"></script>' ."\n";
	}
?>
<!--Adobe Edge Runtime End-->
</head>
<body>
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
		<div class="stagewrapper proceed">
		<a href="assessment.html" class="txtw" onClick="parent.qelite_taketraining_btn(); return false;">Proceed to <strong>Assessment</strong> <span class="play"></span></a>
		</div>
		<div class="stagewrapper ftr">
			<div class="inner">
							<h3>Footnotes</h3>
							<ol>
							<li>Battery holds ~5 watt-hours of energy</li>
							<li>on network per month in 2013. Source: Cisco VNI, 2013, A.T. Kearney Analysis</li>
							<li>Source: Machina Research, Apr. '13</li>
							</ol>
							<hr />
							<p>&copy;<?php date_default_timezone_set('UTC'); echo date('Y'); ?> Qualcomm Incorporated and/or its subsidiaries. All Rights Reserved.</p>
							<p>References to "Qualcomm" may mean Qualcomm Incorporated, Qualcomm Technologies, Inc. or subsidiaries or business units within the Qualcomm corporate structure, as applicable.</p>
							<p>Qualcomm Incorporated includes Qualcomm's licensing business, QTL, and the vast majority of its patent portfolio. Qualcomm Technologies, Inc., a wholly-owned subsidiary of Qualcomm Incorporated, operates, along with its subsidiaries, substantially all of Qualcomm's engineering, research and development functions, and substantially all of its products and services businesses, including its semiconductor business, QCT.</p>
							<p>Nothing in these materials is an offer to sell any of the components or devices referenced herein.</p>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="edge_includes/animate.js"></script>
</body>
</html>