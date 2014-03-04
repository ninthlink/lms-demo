<?php
/*
 * Qualcomm HTML5 Modules
 * 5 Cool Thing
 *
 * v0.1.10
 */
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>5 Cool Things</title>
		
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes" />
		<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">

		<?php /*
		<link rel="stylesheet" href="../_common/css/jquery.qualcomm-reveal.css">
		*/ ?>
		<link rel="stylesheet" href="css/main.css">

		<script src="../_common/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>

	<body>
		<div id="wrapper">
			<?php // Slide #0 ?>
			<header class="bg-red-grad">
				<div class="inner">
					<h1 class="txtw"><strong>5</strong><span class="cool">Super cool things<br /><span class="thin">about Qualcomm<sup>&reg;</sup><br />Snapdragon<sup>&trade;</sup> Processors</span></span></h1>
					<div class="header-graphic">
						<img id="main-img" src="img/topgraphic.png" />
						<img id="gear1" src="img/gear1.png" />
						<img id="gear2" src="img/gear2.png" />
					</div>
				</div>
			</header>
			
			<div id="content">

				<?php // Slide #1 ?>
				<section id="talking" class="bg-grey-grad block">
        	<div class="triangle"></div>
					<div class="inner">
						<div class="graphic-position">
							<div class="phone"></div>
						</div>
						<div class="text-position">
							<h3 class="center">Can make your phone do <br />things <span class="thick">by talking to it</span></h3>
						</div>

						<span class="stretch"></span>
					</div>
				</section>

				<?php // Slide #2 ?>
				<section id="charge" class="bg-grey-grad block">
					<div class="inner">
						<div class="graphic-position">
							<div class="battery">
              	<div class="fill"></div>
              </div>
						</div>
						<div class="text-position">
							<h3 class="center">Can charge devices <span>up to <span class="thick">75% faster</span> <sup class="sup">*</sup></span></h3>
						</div>

						<span class="stretch"></span>
					</div>
				</section>

				<?php // Slide #3 ?>
				<section id="satellites" class="bg-grey-grad block">
					<div class="inner">
						<div class="graphic-position">
							<div class="satellite">
              	<div class="s1"></div>
              	<div class="s2"></div>
              	<div class="s3"></div>
              </div>
						</div>
						<div class="text-position">
							<h3 class="center">Can access <span class="thick">50 satellites</span></h3>
						</div>

						<span class="stretch"></span>
					</div>
				</section>

				<?php // Slide #4 ?>
				<section id="cool" class="bg-grey-grad block">
					<div class="inner">
						<div class="graphic-position">
							<div class="snow">
              	<div class="s1"></div>
              	<div class="s2"></div>
              </div>
						</div>
						<div class="text-position">
							<h3 class="center">Stays cool under pressure<br /><span class="thick">battery efficient</span></h3>
						</div>

						<span class="stretch"></span>
					</div>
				</section>

				<?php // Slide #5 ?>
				<section id="high-performance" class="bg-grey-grad block">
					<div class="inner">
						<div class="graphic-position">
							<div class="phone">
							  <div class="pin"></div>
							</div>
						</div>
						<div class="text-position">
							<h3 class="center">High performance <span class="thick">graphics</span><br /><span class="l2">with <span class="thick">lower power</span> usage</span></h3>
						</div>

						<span class="stretch"></span>
					</div>
				</section>
				<?php // quiz CTA ?>
        <section id="proceed" class="bg-black block">
        	<div class="inner">
          	<div class="text-position center">
            	<div class="video-button">
								<h2><a href="assessment.html" class="txtw">Proceed to <span class="thick">Assessment</span> <span class="sprite play"></span></a></h2>
							</div>
            </div>
          </div>
        </section>
				<?php // Slide #6 ?>
				<section id="legal" class="bg-red block">
					<div class="inner">
						<div class="graphic-position center">
							<img id="logo" src="img/snapdragon.png" />
						</div>
						<div class="text-position center txtw">
							<p>&copy; <?php date_default_timezone_set('UTC'); echo date('Y'); ?> Qualcomm Technologies, Inc.  All rights reserved.</p>
              <p>* As compared to devices without fast charge technology.</p>
							<p>Qualcomm is a trademark of QUALCOMM Incorporated registered in the United States and other countries. Gobi and Snapdragon are trademarks of Qualcomm Technologies, Inc.<br />Other products and brand names are property of their respective owners.</p>
						</div>
					</div>
				</section>
				
			</div>
	 
		</div>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script><?php /* load CDN or local backup */ ?>
		<script>window.jQuery || document.write('<script src="../_common/js/jquery-1.10.1.min.js"><\/script>')</script>

		<script src="../_common/js/spin.min.js"></script>
		<?php /*
		<script src="../_common/js/jquery.inview.min.js"></script>
		<script src="../_common/js/jquery.qualcomm-reveal.min.js"></script>
		*/?>
		<script src="../_common/js/waypoints.min.js"></script>
		
		<script src="js/animate.js"></script>
<script type="text/javascript"> 
//browser-update.org
var $buoop = {vs:{i:9,f:5,o:12,s:5,n:9},reminder:0,onshow:function(infos) {
	jQuery('#buorg > div').prepend('<strong>This module is built with the latest HTML5 + CSS3 in mind.</strong> ');
	}}; 
$buoop.ol = window.onload; 
window.onload=function(){ 
 try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
 var e = document.createElement("script"); 
 e.setAttribute("type", "text/javascript"); 
 e.setAttribute("src", "//browser-update.org/update.js"); 
 document.body.appendChild(e); 
} 
</script>
	</body>
</html>