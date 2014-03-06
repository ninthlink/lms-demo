<?php
/*
 * Qualcomm HTML5 Modules : 6 ways smartphones are changing us
 */
$v = '0.1.7';
$qv = '?v='. $v;
?>
<!doctype html>
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>6 ways smartphones are changing us</title>
		
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes" />
		<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">

		<link rel="stylesheet" href="css/main.css<?php echo $qv ?>">
		
		<script src="../_common/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body>
			
		<div class="section hdr">
			<div class="inner">
				<div class="text-position">
					<h1><strong>6</strong> ways smartphones<br />are changing us</h1>
					<p>A result of immediacy, portability, and connectedness</p>
				</div>
				<div class="graphic-position">
					<img src="img/phones.png" alt="phones" />
					<div class="eco circ c1"><i></i></div>
					<div class="eco circ c2"><i></i></div>
					<div class="eco chip"><i></i></div>
				</div>
				<span class="stretch"></span>
			</div>
		</div>

		<div class="section squares">
			<div class="inner">
				<?php
					$squares = array(
						array( 'home', '+70%', "Can't leave home without it" ),
						array( 'games', '80%', "Play games on their phones" ),
						array( 'nav', '80%', "Use phones to navigate" ),
						array( 'face', '+60%', "Access their Facebook site<br />via a mobile device" ),
						array( 'bill', '1 Billion', "Access social networks<br />via a mobile device" ),
						array( 'watch', '1 in 3', "Watch movies on their<br />device at least monthly" ),
					);
					foreach ( $squares as $i => $s ) {
				?>
				<div class="square c<?php echo ($i%2 ? '2' : '1') .' '. $s[0]; ?>">
					<div class="over">
						<div class="txt">
							<img src="img/<?php echo $s[0] .( $s[0]=='face' ? '2' : '' ); ?>.png" alt="<?php echo $s[0]; ?>" />
							<h2><?php echo $s[1]; ?></h2>
							<p><?php echo $s[2]; ?></p>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
		</div>
		<div class="section proceed"><a href="assessment.html" onClick="parent.qelite_taketraining_btn(); return false;">Proceed to quiz</a></div>
		<div class="section ftr">
			<div class="inner">
				<!--p><img src="img/qualcomm.png" alt="Qualcomm" /></p-->
				<p>Sources: Facebook, Jan. '13; SA, Apr. '12; 2012 Snapdragon Consumer Survey; TIME Mobility Poll, in cooperation with QUALCOMM, Aug. '12</p>
				<p>&copy; <?php date_default_timezone_set('UTC'); echo date('Y'); ?> Qualcomm Technologies, Inc. All rights reserved.</p>
				<p>Qualcomm is a trademark of QUALCOMM Incorporated registered in the United States and other countries. Gobi and Snapdragon are trademarks of Qualcomm Technologies, Inc. Other products and brand names are property of their respective owners.</p>
			</div>
		</div>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="../_common/js/jquery-1.10.1.min.js"><\/script>')</script>
		
		<script src="js/animate.js<?php echo $qv ?>"></script>
	</body>
</html>