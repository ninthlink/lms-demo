/* *******************************
	Javascript Animations
******************************* */

$(document).ready(function() {
	$('.main-navigation, .content-container').hide();
	$('#proceed a').click(function() {
		$("#content").hide();
		$('.main-navigation, .content-container').show();
		$('html').addClass('quizgo');
		return false;
	});
	
	// Loading rotator
	var opts = {
		lines: 12, // The number of lines to draw
		length: 44, // The length of each line
		width: 12, // The line thickness
		radius: 46, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('spinner');
	var spinner = new Spinner(opts).spin(target);

	// default animation offset for each section (variance from top of <section>)
	var offsetDefault = '20%';

	// all <h2> will fade in???
	$('.block h2').each(function(){
		$(this).addClass('fade-in');
	});
	
	var qmodresize = function() {
		var qwh = $(window).height();
		var hdr = $('header');
		hdr.css('padding',0);
		var hh = hdr.height();
		var dif = qwh - hh;
		if ( dif > 0 ) hdr.css('padding', (Math.floor(dif/2) + 'px 0'));
	}
	var qmodresizer;
	$(window).bind('resize.qmod', function() {
		//throttle
		clearTimeout(qmodresizer);
		qmodresizer = setTimeout(qmodresize, 100);
	}).trigger('resize.qmod');
	
	// qualcommreveal
	$('#content').qualcommreveal({
      targets: '.block',
	  scrollspeed: 0,
    });
	$.subscribe('qualcommreveal/reveal-finish', function(event, elem, counter) {
		elem.trigger('qinview');
	});
	
	/* waypoints and other such mayhem */
	// #2 "Loading" :: fade in h3 and rotator
	$('#loading').on('qinview', function() {
		$(this).waypoint(function(){ 
			$('#loading .graphic-position').fadeIn( 500, function() {
				$('#loading .text-position h3').fadeIn( 500 );
			} );
		}, {
			offset: '50%'
		});
	});
	// #3 "Difference" :: parallax <li> text; fade in graphic
	$('#difference').on('qinview', function() {
		$(this).waypoint(function(){ 
			$('#difference #parallax1').animate({
				top: "0px",
				opacity: "1",
			}, 400 );
			$('#difference #parallax2').animate({
				top: "50px",
				opacity: "1",
			}, 500 );
			$('#difference #parallax3').animate({
				top: "100px",
				opacity: "1",
			}, 600 );
		}, {
			offset: offsetDefault
		});

		$(this).waypoint(function(){
			$('#difference .graphic-position').animate({
				right: 0,
				opacity: 1,
			}, 800 );
		}, {
			offset: offsetDefault
		});
	});
	// #4 "Earth" :: flicker in Earth image, then rings around it
	$('#earth').on('qinview', function() {
		$(this).waypoint(function(){
			$('#earth .earth').animate({
				opacity: ".5",
			}, 500, 'easeInElastic', function() {
				$('#earth .earth').animate({
					opacity: "1",
				}, 1000, 'easeInElastic');
			});
			$('#earth .ring').delay(1000).each(function(e){
				$(this).delay(250*e).fadeTo( 500, 1, 'easeInElastic');
			});
		}, {
			offset: offsetDefault
		});
	});
	// #5 "Every Phone" :: load icons one-by-one
	$('#every-phone').on('qinview', function() {
		$(this).waypoint(function(){
			$('#every-phone .text-position').fadeTo( 400, 1, 'easeInOutSine' );
		}, { offset: 200 });
		$(this).waypoint(function(){
			$('#every-phone .graphic-position .three-row').each(function(e){
				$(this).delay(300*e).fadeTo( 300, 1, 'easeInOutElastic' );
			});
		}, {
			offset: offsetDefault
		});
	});

	// #6 "Processes" :: loadicons one-by one, then slide in phone when scroll low enough
	$('#processes').on('qinview', function() {
		$(this).waypoint(function(){
			$('#processes .graphic-position .four-row').each(function(e){
				$(this).delay(250*e).fadeTo( 200, 1, 'easeInExpo');
			});
		}, {
			offset: offsetDefault
		});
	});

	$('#processes').on('qinview', function() {
		$(this).waypoint(function(){
			$('#phone-with-chip').animate({
				top: "0px",
			}, 800, 'easeInOutSine' );
		}, {
			offset: function() {
				return -( $(this).height() - 750 );
			}
		});
	});

	// #7 "Delivers" :: fade in graphic, then slide in <li> text from behind graphic
	$('#delivers').on('qinview', function() {
		$(this).waypoint(function(){
			$('#delivers .graphic-position ul').delay(500).animate({
				left: "0px",
				opacity: "1"
			}, 900, 'easeInOutBounce' );
		}, {
			offset: offsetDefault
		});
	});
	// #8 "Mobile Power" ::

	// #9 "Single Chip" :: slide phone to side (large screen) or bottom (small screen), then pop in icons and fade in text
	$('#pop-power, #pop-lines').css('width',0);
	$('#single-chip .graphic-position').css('left','-100%');
	$('#single-chip').on('qinview', function() {
		$(this).waypoint(function(){
			$('#single-chip .graphic-position').animate({
				left: "0",
			}, 600, 'easeInOutSine');
			
			$('#single-chip .text-position').fadeTo( 2000, 1, 'easeInOutCubic' );
		
			$('#pop-lines').delay(600).animate({
				width: "61px",
			}, 400, 'easeInOutElastic', function() {
				$('#pop-power').delay(10).animate({
					width: "42px",
				}, 400, 'easeInOutElastic' );
			});
		}, {
			offset: offsetDefault,
			triggerOnce: true,
		});
	});

	// #10 "Multiple Taks" :: slide chips across frame revealing red image, one at a time
	var startr = $('#multiple-tasks #red-scroll').css('left');
	var startg = $('#multiple-tasks #grey-scroll').css('left');
	var slide = function(count) {
		count = count - 1;
		$('#frame').css('cursor', 'auto');
		$('#red-scroll').delay(500).animate({
			left: "-=277px",
		}, 500, function() {
			$('#red-scroll').delay(1000).animate({
				left: "-=277px",
			}, 500, function() {
				$('#red-scroll').delay(1000).animate({
					left: "-=277px",
				}, 500, function() {
					$('#red-scroll').delay(1000).animate({
						left: "-=277px",
					}, 500, function() {
						$('#red-scroll').delay(1000).animate({
							left: startr,
						}, 500 );
					});
				});
			});
		});
		$('#grey-scroll').delay(500).animate({
			left: "-=277px",
		}, 500, function() {
			$('#grey-scroll').delay(1000).animate({
				left: "-=277px",
			}, 500, function() {
				$('#grey-scroll').delay(1000).animate({
					left: "-=277px",
				}, 500, function() {
					$('#grey-scroll').delay(1000).animate({
						left: "-=277px",
					}, 500, function() {
						$('#grey-scroll').delay(1000).animate({
							left: startg,
						}, 500, function() {
							if ( count > 0 ) {
								slide(count);
							}
							$('#frame').css('cursor', 'pointer');
						});
					});
				});
			});
		});
	};
	
	var qchips = $('#qchips');
	var qchipl = qchips.children('.left');
	var qchipm = qchips.children('.mid');
	var qchipr = qchips.children('.right');
	
	var qchipscroll = function() {
		var onn = $('#qchips .onn');
		onn.clone().removeClass('onn').appendTo(qchipl);
		var nex = qchipr.children(':first');
		nex.clone().css({'margin-left':0,'left':'266px'}).appendTo(qchipm);
		qchipl.children(':first').animate({
			'margin-left': '-240px'
		}, 900, function() {
			qchipl.children(':first').appendTo(qchipr).css('margin-left','10px');
		});
		qchipr.children(':first').animate({
			'margin-left': '-240px'
		}, 900, function() {
			$(this).remove();
		});
		qchipm.children().animate({
			'left': '-=248px'
		},900, function() {
			onn.remove();
			qchipm.children().addClass('onn').removeAttr('style');
		});
		setTimeout(qchipscroll, 2000);
	};
	
	$('#multiple-tasks').on('qinview', function() {
		$(this).waypoint(function(){
			qchipscroll();
		}, { 
			offset: offsetDefault,
			triggerOnce: true,
		});
	});

	$('#frame').click(function(){
		if ( $('#multiple-tasks #grey-scroll').css('left') == "585px" ) {
			slide(1);
		};
	});

	// #12 "GPU Performance" ::
	var gpuwidths = [ 3.3, 6.4, 12.5, 16.2, 78.8, 100 ];
	var gpustep = function(count) {
		if ( count < gpuwidths.length ) {
			$('#gpu-performance li:eq('+count+')').each(function() {
				$(this).fadeIn(200)
					.children('.fill').animate({
						width: gpuwidths[count] + '%'
					}, 500, function() {
						newcount = count + 1;
						gpustep(newcount);
					});
			});
		}
		if ( count == gpuwidths.length ) {
			$('#gpu-performance p').fadeIn(3000);
		}
	};
	$('#gpu-performance').on('qinview', function() {
		$(this).waypoint(function(){
			gpustep(0);
		}, {
			offset: offsetDefault
		});
	});

	// #13 "Modem Performance" :: slide in side text from outside frame (arrows rotate via CSS)
	$('#modem-performance').on('qinview', function() {
		$(this).waypoint(function(){
			$('#modem-performance .graphic-position .left p').animate({
				"left": "0px",
				opacity: 1, 
			}, 1000, 'easeInOutBack' );
			$('#modem-performance .graphic-position .right p').animate({
				"right": "0px",
				opacity: 1, 
			}, 1000, 'easeInOutBack', function() {
				$('#modem-performance p:last').fadeIn(900);
			});
		}, {
			offset: offsetDefault
		});
	}).find('p:last').hide();
	// #14 "Thermal Performance" :: fade in image
	$('#thermal-performance').on('qinview', function() {
		$(this).waypoint(function(){
			$('#thermal-performance .graphic-position').animate({
				opacity: "1",
			}, 1200, 'easeInOutBounce' );
			
			
			
		}, {
			offset: offsetDefault
		});
	});
	
	var bready = function(player_id) {
		var bplayer = $f(player_id);
		
		$('#thermal-performance .video-button').unbind('click').click(function() {
			jQuery('#butter-video').show().siblings().hide();
			bplayer.api('play');
		});
		
		bplayer.addEvent('finish', function(data) {
			jQuery('#butter-video').hide().siblings().show();
		});
	};
	$f(document.getElementById('buttervid')).addEvent('ready', bready);
	// pause video when off screen
	$('#thermal-performance').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView) {
			//mm
		} else {
			$f('buttervid').api('pause');
		}
	});
	// #15 "Features" :: text slides in looped "n" times
	$('#features').on('qinview', function() {
		$(this).waypoint(function(){
			var slidein = function(count) {
				var s = "600px";
				count = count - 1;
				$('#connectivity').delay(800).animate({
					left: "0px",
					opacity: "1",
				}, 1500, function(){
					$('#connectivity').fadeTo(800, 0).delay(800).css('left', s);
					$('#performance').delay(500).animate({
						left: "0px",
						opacity: "1",
					}, 1500, function(){
						$('#performance').fadeTo(800, 0).delay(800).css('left', s);
						$('#longer-battery').delay(500).animate({
							left: "0px",
							opacity: "1",
						}, 1500, function(){
							$('#longer-battery').fadeTo(800, 0).delay(800).css('left', s);
							$('#speed').delay(500).animate({
								left: "0px",
								opacity: "1",
							}, 1500, function(){
								$('#speed').fadeTo(800, 0).delay(800).css('left', s);
								if ( count > 0 ) {
									slidein(count);
								};
							});
						});
					});
				});
			};
			slidein(100);
		}, {
			offset: '50%',
			triggerOnce: true,
		});
	});
	// #16 "Legal" :: No animations in footer area
	/*
	// ALL :: slide section to top at specific interval
	$('header').waypoint(function(direction) {
		if ( direction == 'down') {
			$('html, body').animate({
				scrollTop: $(this).waypoint('next').offset().top + 10
			}, 1000);
		}
	}, {
		offset: function() {
			return -( $(this).height() * 0.75 );
		}
	});

	$('section').each(function(){
		if ( $(this).attr('id') != 'legal' ) {
			$(this).waypoint(function(direction) {
				if ( direction == 'down') {
					$('html, body').animate({
        				scrollTop: $(this).waypoint('next').offset().top + 10
					}, 1000);
				}
			}, {
				offset: function() {
					return -( $(this).height() * 0.75 );
				},
				triggerOnce: true
			});
		}
	});
	*/
});