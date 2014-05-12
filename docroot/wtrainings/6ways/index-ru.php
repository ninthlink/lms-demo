<?php
/*
 * Qualcomm HTML5 Modules : 6 ways
 */
$v = '1.2.1';
$qv = '?v='. $v;
?>
<!doctype html>
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>6 примеров того, как смартфоны меняют нашу жизнь</title>
		
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
					<h1><strong>6</strong> примеров того, как смартфоны меняют нашу жизнь</h1>
					<p>Ваше мобильное устройство всегда с вами и нужная информация всегда под рукой</p>
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
						array( 'home', '+70%', "Не могут выйти из дома без него" ),
						array( 'games', '80%', "Играют в игры на своих телефонах" ),
						array( 'nav', '80%', "Используют телефоны для навигации" ),
						array( 'face', '+60%', "Заходят в Facebook с мобильного устройства" ),
						array( 'bill', '1 <span style="font-size:0.6em">миллиард</span>', "Заходят в социальные сети с мобильного устройства" ),
						array( 'watch', '1 в 3', "Смотрят фильмы на своем мобильном устройстве не реже одного раза в месяц" ),
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
		<div class="section proceed"><a href="assessment.html" onClick="parent.qelite_taketraining_btn(); return false;">Перейти к тестированию</a></div>
		<div class="section ftr">
			<div class="inner">
				<h3>Сноски</h3>
				<ol>
				<li>Источники: Facebook, янв. 2013; SA, апр. 2012; Исследование мнения пользователей, посвященное процессорам Snapdragon в 2012 году; Опрос TIME Mobility в сотрудничестве с QUALCOMM, авг. 2012</li>
				</ol>
				<hr />
				<p>&copy; Qualcomm Incorporated и/или дочерние предприятия компании, 2014. Все права защищены.</p>
				<p>Наименование "Qualcomm" может означать Qualcomm Incorporated, Qualcomm Technologies, Inc. или их дочерние подразделения в корпоративной структуре Qualcomm.</p>
				<p>Qualcomm Incorporated занимается лицензированием Qualcomm, QTL и большей частью патентного портфеля. Компания Qualcomm Technologies, Inc., являющаяся 100-процентной дочерней компанией Qualcomm Incorporated, управляет как своими дочерними компаниями, так и научно-исследовательскими разработками Qualcomm, а также всеми продуктами и услугами, включая производство полупроводниковых устройств, QCT.</p>
				<p>Ничего из данных материалов не является предложением о продаже каких-либо упомянутых здесь компонентов или устройств.</p>
			</div>
		</div>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="../_common/js/jquery-1.10.1.min.js"><\/script>')</script>
		
		<script src="js/animate.js<?php echo $qv ?>"></script>
	</body>
</html>