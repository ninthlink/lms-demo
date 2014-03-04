/* *******************************
	Javascript Animations
******************************* */

$(document).ready(function() {
	// #1 "talking"
	$('#talking').each(function() {
		$(this).waypoint(function() {
			$(this).find('h3').fadeIn(500, function() {
				$('#talking .graphic-position').fadeIn(500, function() {
					$('#talking h3').children('.thick, sup').show(500);
					$('#talking .phone').addClass('chat');
				});
			});
		}, {
			offset: '50%'
		}).find('.graphic-position, h3, h3 .thick, h3 sup').hide();
	});
	
	// #2 battery charge
	$('#charge').waypoint(function() {
		$(this).find('h3').fadeIn(500, function() {
			$('#charge .graphic-position').fadeIn(500, function() {
				$('#charge h3').children().show(500);
				$('#charge .battery').addClass('charging');
			});
		});
	}, {
		offset: 'bottom-in-view'
	}).find('.graphic-position, h3, h3 > span').hide();
	
	// #3 satellite signal
	var satellite = $('#satellites .satellite');
	var satellitesignals;
	var signalcount = 0;
	var satellitesignal = function() {
		var sdelay = 200;
		signalcount++;
		if ( signalcount > 5 ) {
			signalcount = 0;
		}
		satellite.attr('class', 'satellite slidedown s'+ signalcount);
		
		clearTimeout(satellitesignals);
		satellitesignals = setTimeout(satellitesignal, sdelay);
	};
	$('#satellites').waypoint(function() {
		$(this).find('h3').fadeIn(500, function() {
			clearTimeout(satellitesignals);
			satellite.addClass('slidedown');
			satellitesignals = setTimeout(satellitesignal, 800);
		});
	}, {
		offset: 'bottom-in-view'
	}).find('h3').hide();
	
	// #4 cool :: snow fall
	$('#cool').waypoint(function() {
		$(this).find('.snow').addClass('fall');
		$(this).find('h3').fadeIn(1000, function() {
			$(this).children('.thick, sup').fadeIn(500);
		});
	}, {
		offset: 'bottom-in-view'
	}).find('h3').hide().children('.thick,sup').hide();
	
	// #5 high performance :: text & phone slide
	$('#high-performance').waypoint(function() {
		$(this).find('.phone').addClass('meter');
		$(this).find('h3').fadeIn(500, function() {
			$(this).children('.l2').fadeIn(1000);
		});
	}, {
		offset: 'bottom-in-view'
	}).find('h3').hide().children('.l2').hide();
	
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
					return -( $(this).height() * 0.9 );
				},
				triggerOnce: true
			});
		}
	});
	*/
});