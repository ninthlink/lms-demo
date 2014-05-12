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
		<title>Мобильная технология</title>
		
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
	$edgejs = array('','RU_SixTechnologies_Mobile','RU_Elite_spaceship_Mobile','RU_Elite_Battery_Mobile','RU_DVD','RU_Cars');
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
			<h1>Мобильная технология.</h1>
			<h2>Удивительное достижение.</h2>
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
		<a href="assessment.html" class="txtw" onClick="parent.qelite_taketraining_btn(); return false;">Перейти к <strong>тестированию</strong> <span class="play"></span></a>
		</div>
		<div class="stagewrapper ftr">
			<div class="inner">
							<h3>Сноски</h3>
							<ol>
							<li>Батарея может обеспечить приблизительно 5 Вт*ч энергии</li>
							<li>в сети каждый месяц в 2013 году. Источник: Cisco VNI, 2013, A.T. Kearney Analysis</li>
							<li>Источник: исследование Machina, апр. 2013</li>
							</ol>
							<hr />
							<p>&copy; Qualcomm Incorporated и/или дочерние предприятия компании, 2014. Все права защищены.</p>
							<p>Наименование "Qualcomm" может означать Qualcomm Incorporated, Qualcomm Technologies, Inc. или их дочерние подразделения в корпоративной структуре Qualcomm.</p>
							<p>Qualcomm Incorporated занимается лицензированием Qualcomm, QTL и большей частью патентного портфеля. Компания Qualcomm Technologies, Inc., являющаяся 100-процентной дочерней компанией Qualcomm Incorporated, управляет как своими дочерними компаниями, так и научно-исследовательскими разработками Qualcomm, а также всеми продуктами и услугами, включая производство полупроводниковых устройств, QCT.</p>
							<p>Ничего из данных материалов не является предложением о продаже каких-либо упомянутых здесь компонентов или устройств.</p>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="edge_includes/animate.js"></script>
</body>
</html>