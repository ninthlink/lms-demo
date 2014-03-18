<?php
/*
 * Qualcomm HTML5 Modules
 * Meet Qualcomm® Snapdragon™ Processors
 */
$v = '0.4.10';
$qv = '?v='. $v;
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Meet Snapdragon</title>
		
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes" />
		<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">

		<link rel="stylesheet" href="../wtrainings/_common/css/jquery.qualcomm-reveal.css">
		<link rel="stylesheet" href="css/main.css<?php echo $qv ?>">

		<script src="../wtrainings/_common/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body>
		<div id="content" class="content-container">

			<?php // Slide #1 ?>
			<header class="bg-red-grad block">
				<div class="inner">
					<h1 class="center txtw">Meet Qualcomm<sup>&reg;</sup><br /><span class="thick">Snapdragon</span><sup>&trade;</sup> <span class="thick">Processors</span></h1>
					<div class="header-graphic">
						<img id="header-device" src="img/header-phone.png" />
						<img id="gear1" src="img/gear1.png" />
						<img id="gear2" src="img/gear2.png" />
					</div>
				</div>
			</header>
				
				<?php // Slide #2 ?>
				<section id="loading" class="bg-white block">
					<div class="inner">
						<div class="graphic-position">
							<div id="spinner"></div>
							<div id="spinner-inner" class="txtr">?</div>
						</div>
						<div class="text-position">
							<h3 class="txtb">Have you ever <span class="thick">waited</span> for an app or website to load on your smartphone?</h3>
						</div>
					</div>
				</section>

				<?php // Slide #3 ?>
				<section id="difference" class="bg-grey block">
					<div class="inner">
						<div class="text-position">
							<h2 class="txtr">Learn how Qualcomm Snapdragon devices <br /><span class="thick">can make a difference</span></h2>
							<ul class="txtb">
								<li id="parallax1">Who is Qualcomm?</li>
								<li id="parallax2">The role of the processor in a smartphone</li>
								<li id="parallax3">Why Snapdragon devices offer an exceptional mobile experience</li>
							</ul>
						</div>
						<div class="graphic-position">
							<img id="chip1" src="img/chip218x213.png" />
						</div>
					</div>
				</section>

				<?php // Slide #4 ?>
				<section id="earth" class="bg-black block">
					<div class="inner">
						<div class="text-position">
							<h2 class="txtw">You are here. <span class="thick">Earth.</span></h2>
							<p class="txtg">Qualcomm is shipping <span class="thick">22 MSM chips every second!</span> Since we started we have shipped more than <span class="thick">15 billion chips.</span> That's 2 for each person on <span class="thick">planet earth.</span></p>
						</div>
						<div class="graphic-position">
							<div class="earth"><img src="img/earth.png" /></div>
							<div class="ring wrapper4">
							  <div class="pie spinner"></div>
							  <div class="pie filler"></div>
							  <div class="mask"></div>
							</div>
							<div class="ring wrapper3">
							  <div class="pie spinner"></div>
							  <div class="pie filler"></div>
							  <div class="mask"></div>
							</div>
							<div class="ring wrapper2">
							  <div class="pie spinner"></div>
							  <div class="pie filler"></div>
							  <div class="mask"></div>
							</div>
							<div class="ring wrapper1">
							  <div class="pie spinner"></div>
							  <div class="pie filler"></div>
							  <div class="mask"></div>
							</div>
						</div>
					</div>
				</section>

				<?php // Slide #5 ?>
				<section id="every-phone" class="bg-grey-grad block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtb"><span class="thick">Every smartphone</span> has a processor</h2>
							<p class="txtb">be sure to select a processor with the right features</p>
						</div>
						<div class="graphic-position center multi-col">
							<div class="scrollx">
								<div id="speed_performance" class="three-row">
									<div class="sprite"></div>
									<p class="thick">Speed &amp; Performance</p>
								</div>
								<div id="reliable_connectivity" class="three-row">
									<div class="sprite"></div>
									<p class="thick">Reliable Connectivity</p>
								</div>
								<div id="long_battery_life" class="three-row last">
									<div class="sprite"></div>
									<p class="thick">Long battery life</p>
								</div>
							</div>
							<span class="stretch"></span>
						</div>
					</div>
				</section>

				<?php // Slide #6 ?>
				<section id="processes" class="bg-red-grad-lt block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtw">People expect smartphones to do <span class="thick">everything.</span> Snapdragon processors are at the heart of these processes</h2>
						</div>
						<div class="graphic-position center txtw multi-col">
							<div id="process_text" class="four-row">
								<div class="sprite"></div>
								<p>text</p>
							</div>
							<div id="process_movies" class="four-row">
								<div class="sprite"></div>
								<p>movies</p>
							</div>
							<div id="process_maps" class="four-row">
								<div class="sprite"></div>
								<p>maps</p>
							</div>
							<div id="process_internet" class="four-row">
								<div class="sprite"></div>
								<p>internet</p>
							</div>
							<div id="process_apps" class="four-row">
								<div class="sprite"></div>
								<p>apps</p>
							</div>
							<div id="process_social" class="four-row">
								<div class="sprite"></div>
								<p>social networking</p>
							</div>
							<div id="process_photos" class="four-row">
								<div class="sprite"></div>
								<p>photos</p>
							</div>
							<div id="process_videos" class="four-row">
								<div class="sprite"></div>
								<p>videos</p>
							</div>
							<div id="process_news" class="four-row">
								<div class="sprite"></div>
								<p>gaming</p>
							</div>
							<div id="process_shopping" class="four-row">
								<div class="sprite"></div>
								<p>shopping</p>
							</div>
							<div id="process_emails" class="four-row">
								<div class="sprite"></div>
								<p>emails &amp; calendars</p>
							</div>
							<div id="process_voice" class="four-row">
								<div class="sprite"></div>
								<p>voice</p>
							</div>

							<div class="four-row box-blind"></div>
							<div class="four-row box-blind"></div>
							<div class="four-row box-blind"></div>
							<div class="four-row box-blind"></div>

							<span class="stretch"></span>

						</div>
						<div id="phone-slide">
							<img id="phone-with-chip" src="img/phone-with-chip.png" />
						</div>
					</div>
				</section>

				<?php // Slide #7 ?>
				<section id="delivers" class="bg-grey-rdl block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtr">Snapdragon <span class="thick">delivers</span></h2>
						</div>
						<div class="graphic-position center">
							<div class="left">
								<img id="chip2" src="img/chip223x228.png" />
								<img id="chip-lines" src="img/chip-lines.png" />
							</div>
							<div class="right">
								<ul>
									<li id="delivers1"><strong>4G LTE</strong></li>
									<li id="delivers2">Fast Connections</li>
									<li id="delivers3"><strong>Multimedia and Graphics</strong></li>
									<li id="delivers4">Great Experiences</li>
									<li id="delivers5"><strong>Thinner, Lighter<br />&amp; Cooler</strong></li>
									<li id="delivers6">Longer Battery Life</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<?php // Slide #8 ?>
				<section id="mobile-power" class="block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtw">Extraordinary <span class="thick">mobile power</span></h2>
							<h5 class="txtw">Snapdragon processors pack a huge amount of mobile power into a tiny system on a chip.</h5>
						</div>
					</div>
				</section>

				<?php // Slide #9 ?>
				<section id="single-chip" class="bg-red-grad-lt block">
					<div class="inner">
						<div class="text-position">
							<p class="txtw">Qualcomm designs the key  technology components that connect each of the components into a <span class="thick">single system on a chip</span></p>
						</div>
						<div class="graphic-position">
							<img id="single-phone" src="img/tablet.png" />
							<img id="pop-power" src="img/pop-power.png" />
							<img id="pop-lines" src="img/pop-lines.png" />
						</div>

						<span class="stretch"></span>
					</div>
				</section>

				<?php // Slide #10 ?>
				<section id="multiple-tasks" class="bg-white block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtr">One processor. <span class="thick">Multiple tasks.</span></h2>
							<p class="txtb">Snapdragon processors use multiple mobile engines - each dedicated to a specific task.</p>
						</div>
					</div>
          <div id="qchips">
            <ul class="left">
              <li class="sen"><span class="img"></span>Sensors</li>
              <li class="dsp"><span class="img"></span>DSP</li>
              <li class="cpu"><span class="img"></span>CPU</li>
              <li class="gpu"><span class="img"></span>GPU</li>
              <li class="nav"><span class="img"></span>Navigation</li>
            </ul>
            <ul class="mid">
              <li class="mm onn"><span class="img"></span>Multimedia</li>
            </ul>
            <ul class="right">
              <li class="pwr"><span class="img"></span>Power<br />Management</li>
              <li class="dis"><span class="img"></span>Display</li>
              <li class="cam"><span class="img"></span>Camera</li>
              <li class="sec"><span class="img"></span>Security</li>
              <li class="con"><span class="img"></span>Connectivity</li>
            </ul>
            <div id="qffx"></div>
          </div>
				</section>

				<?php /*
				<?php // Slide #11 ?>
				<section id="cpu-performance" class="bg-black">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtr">Technologies CPU <span class="thick">performace</span> roadmap</h2>
							<p class="txtw">Custom CPUs built from the ground up for mobile with superior performance and power efficiency</p>
						</div>
					</div>
				</section>

				<?php */ // Slide #12 ?>
				<section id="gpu-performance" class="bg-grey-rdl block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtb">Enhanced graphic <span class="thick">performance</span></h2>
							<h3 class="txtb"><span class="thick">Snapdragon 600</span> up to <span class="thick txtr">29X faster performance*</span><br />
              <span class="thick">Snapdragon 800</span> up to <span class="thick txtr">43X faster performance*</span></h3>
						</div>
            <div class="graphic-position">
            	<ul>
              <li class="a200"><span class="fill"></span><span class="name">Adreno 200</span></li>
              <li class="a205"><span class="fill"></span><span class="name">Adreno 205</span></li>
              <li class="a220"><span class="fill"></span><span class="name">Adreno 220</span></li>
              <li class="a225"><span class="fill"></span><span class="name">Adreno 225</span></li>
              <li class="a320 txtw"><span class="fill"></span><span class="name">Adreno 320 / <span class="thick">Snapdragon 600</span></span></li>
              <li class="a330 txtw"><span class="fill"></span><span class="name">Adreno 330 / <span class="thick">Snapdragon 800</span></span></li>
              </ul>
              <p class="center">* Than Adreno 200. Source - QCT Data.</p>
            </div>
					</div>
				</section>
        
				<?php // Slide #13 ?>
				<section id="modem-performance" class="bg-grey-grad block">
					<div class="inner">
						<div class="text-position center">
							<h2 class="txtb">Modem <span class="thick">performance</span></h2>
						</div>
						<div class="graphic-position center">
							<div class="left three-floats">
								<p>Data Download Speeds<br /><b>Up to 150Mbps*</b></p>
							</div>
							<div class="middle three-floats">
								<img id="signal" src="img/modem-signal.png" />
								<img id="spinning-arrows" src="img/spinning-arrows.png" />
							</div>
							<div class="right three-floats">
								<p>Data Upload Speeds<br /><b>Up to 50Mbps*</b></p>
							</div>

							<span class="stretch"></span>
              
            	<p class="center"> *Peak measured data rates, actual speeds will vary. </p>

						</div>
					</div>
				</section>

				<?php // Slide #14 ?>
				<section id="thermal-performance" class="bg-black block">
					<div class="inner">
						<div class="text-position">
							<h2 class="txtw">Better thermal <span class="thick">performance.</span><br />Less wasted energy.</h2>
						</div>
						<div class="graphic-position">
							<img id="thermal-phone" src="img/butter_test.jpg" />
						</div>
						<div class="video-box">
							<div class="video-button">
								<div id="play-video" class="sprite"></div>
								<p>Watch Butter Test</p>
							</div>
						</div>

						<div id="butter-video">
            	<iframe id="buttervid" src="//player.vimeo.com/video/77088565?title=0&amp;byline=0&amp;portrait=0&amp;color=d1252f&amp;api=1&amp;player_id=buttervid" width="960" height="540" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
						</div>

					</div>
				</section>

				<?php // Slide #15 ?>
				<section id="features" class="bg-white block">
					<div class="inner">
						<div class="graphic-position">
							<img src="img/chip381x252.png" />
						</div>
						<div class="text-position">
							<div id="connectivity">
								<h2 class="txtr">Connectivity</h2>
								<p class="txtb">Breakthrough download speed</p>
							</div>
							<div id="performance">
								<h2 class="txtr">Performance</h2>
								<p class="txtb">Up to 2x faster graphics</p>
							</div>
							<div id="longer-battery">
								<h2 class="txtr">Longer Battery</h2>
								<p class="txtb">Always on Always Connected</p>
							</div>
							<div id="speed">
								<h2 class="txtr">Speed</h2>
								<p class="txtb">Up to 2.3Ghz CPU</p>
							</div>
						</div>
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
				<?php // Slide #16 ?>
				<section id="legal" class="bg-red block">
					<div class="inner">
						<div class="text-position txtw">
							<p>&copy;<?php date_default_timezone_set('UTC'); echo date('Y'); ?> Qualcomm Incorporated and/or its subsidiaries. All Rights Reserved.</p>
							<p>References to "Qualcomm" may mean Qualcomm Incorporated, Qualcomm Technologies, Inc. or subsidiaries or business units within the Qualcomm corporate structure, as applicable.</p>
							<p>Qualcomm Incorporated includes Qualcomm's licensing business, QTL, and the vast majority of its patent portfolio. Qualcomm Technologies, Inc., a wholly-owned subsidiary of Qualcomm Incorporated, operates, along with its subsidiaries, substantially all of Qualcomm's engineering, research and development functions, and substantially all of its products and services businesses, including its semiconductor business, QCT.</p>
							<p>Nothing in these materials is an offer to sell any of the components or devices referenced herein.</p>
						</div>
					</div>
				</section>
				
			</div>
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script><?php /* load CDN or local backup */ ?>
		<script>window.jQuery || document.write('<script src="../wtrainings/_common/js/jquery-1.10.1.min.js"><\/script>')</script>

		<script src="../wtrainings/_common/js/spin.min.js"></script>
		<script src="../wtrainings/_common/js/jquery.inview.min.js"></script>
		<script src="../wtrainings/_common/js/jquery.qualcomm-reveal.min.js"></script>
		<script src="../wtrainings/_common/js/jquery.scrollorama.js"></script>
		<script src="../wtrainings/_common/js/waypoints.min.js"></script>
		<script src="../wtrainings/_common/js/swiper.min.js"></script>
		
		<script type="text/javascript" src="http://a.vimeocdn.com/js/froogaloop2.min.js"></script>
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