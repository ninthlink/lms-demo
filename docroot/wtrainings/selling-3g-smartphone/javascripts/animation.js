/*=========================================================================================
Author: Tou Lee
Created: 1/16/14
Last Updated: 4/2/14 - 7:33pm
Version: 1.0.0

** This is the file for any javascript animations for the course **

Changelog v1.0.0
	- Created file

==========================================================================================*/
(function($) {
	/* ----------------------------------------------------------------
		Reusuable cached variables
	---------------------------------------------------------------- */
	var $html = $('html'),
			isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
			isMobileScreen = Modernizr.mq('screen and (max-width: 767px)'),
			isIE8under = ($('html').hasClass('lt-ie9') || document.documentMode <= 8) ? true : false,
			animcounter,
			animelem;

	$(document).ready(function() {
		/* ----------------------------------------------------------------
			Content Slider 
				- Activate the content slider
		---------------------------------------------------------------- */
		var cslider = $('.slider').contentslider({
			animation: 'fade',
			autoTimer: 3500,
			initialPaused: true
		});

		//Make the height equal to the tallest elements
		var csEqualHeight = function() {
			var $cslides = $('.slider > ul'),
			 	 maxH = 0;

			$cslides.children('li').each(function(i) {
				var $this = $(this), oh; 

				if(!$this.is(':visible')) {
					oh = $(this).show().height();
					$this.hide();
				} else {
					oh = $(this).height();
				}

				if(oh > maxH) { maxH = oh; }
			});

			$cslides.css('min-height', maxH);
			maxH = 0;
		};

		/* ----------------------------------------------------------------
			Video Resizing
		---------------------------------------------------------------- */
		var vd = $('#intro');
		if(isMobile || isMobileScreen) {
			vd.attr({
				'width': '250',
				'height': '141'
			});
		}
		
		/* ----------------------------------------------------------------
			Qualcomm Reveal Plugin
				- Initalize the plugin
				- Use the counter passed from $.publish('qualcommreveal/reveal-start')
					to keep track of the items, and make sure animations do not
					fire prematurely
		---------------------------------------------------------------- */
		//Initalize the plugin
		$('.content-container').qualcommreveal({ offset: 10, scrollspeed: 0 });

		$.subscribe('qualcommreveal/reveal-start', function(event, elem, counter) {
			animcounter = counter;
			animelem = elem;
			//console.log(animcounter);
			//console.log(animelem);
		});

		$.subscribe('qualcommreveal/reveal-finish', function(event, elem, counter) { 
			//Section 4: World without Mobile (Video)
			if(elem.is('#section4')) {
				sublime.ready(function() {
					sublime.prepare('intro', function(){
						console.log('Sublime Video Prepared');
						$('.s4p1 div.video-wrapper').css('visibility','visible').animate({'opacity': 1 }, 600);
					});
				});
			}

			/* Section 4: World without Mobile (Video)
					- set the slides height equal to the largest one by calling csEqualHeight()
					- unpause the slider
					- bind csEqualHeight to the window 'resize' event
			*/
			if(elem.is('#section10')) {
				csEqualHeight();
				cslider.contentslider('pause', false); 
				$(window).on('resize', csEqualHeight);
			}
		});

		/* ----------------------------------------------------------------
			Section 1: Title
		---------------------------------------------------------------- */
		if(!isIE8under) {
			$('#section1').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if(isInView) {
					if(visiblePartY == 'both' || visiblePartY == 'top' ) {
						var $this = $(this);
						$this.off('inview');

						TweenMax.from($this.find('h1'), 1, { css: { autoAlpha: 0 }, delay: 1.5 });
					}
				}
			});
		}


		/* ----------------------------------------------------------------
			Section 2: By the end of this module
		---------------------------------------------------------------- */
		$('#section2 .light-bulb').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && !isIE8under && animelem.is('#section2') ) {
				if(visiblePartY == 'both' || visiblePartY == 'top') {
					var $this = $(this),
							$propeller = $this.find('.propeller');

					$this.off('inview');

					TweenMax.to($propeller, 3, { css: { force3D: true, rotationY: 360 }, ease: 'linear', repeat: -1 });

					var tl = new TimelineMax();
					tl.to($this, 1, { css: { autoAlpha: 1}, ease: 'Power3.easeInOut' })
						.staggerFrom($('#section2 ul li'), 0.75, { css: { autoAlpha: 0 }, ease: 'Power3.easeInOut' }, 0.5);

					console.log('SECTION 2 triggered');

				}
			}
		});


		/* ----------------------------------------------------------------
			Section 3: World is Changing
				- IE8 also
		---------------------------------------------------------------- */
		$('#section3 .worldchange-container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && animelem.is('#section3')) {
				if(visiblePartY == 'both' || visiblePartY == 'top') {
					var $this = $(this);
					$this.off('inview');

					TweenMax.staggerFrom($this.find('.worldchange'), 1, { css: { autoAlpha: 0 }, ease: 'Power3.easeInOut' }, 0.5)

					console.log('SECTION 3 triggered');
				}
			}
		});


		/* ----------------------------------------------------------------
			Section 5: What is a 3G Smartphone
		---------------------------------------------------------------- */
		$('#section5 img.speedometer').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && !isIE8under && animelem.is('#section5')) {
				if(visiblePartY == 'both' || visiblePartY == 'bottom') {
					var $this = $(this);
					$this.off('inview');

					TweenMax.staggerTo([$('img.w3gphone'),$('img.speedometer')], 0.7, { css: { autoAlpha: 1 }, ease: 'Power3.easeInOut' }, 0.4)

					console.log('SECTION 5 triggered');

				}
			}
		});


		/* ----------------------------------------------------------------
			Section 6: 3G Connectivity
		---------------------------------------------------------------- */
		$('#section6 .phones2g-container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && !isIE8under && animelem.is('#section6')) {
				if(visiblePartY == 'both' || visiblePartY == 'top') {
					var $this = $(this);
					$this.off('inview');

					if(isMobileScreen) {
						var t = TweenMax.from($('.pointer-circle > img'), 1, { css: { autoAlpha: 0, top: '-2px' }, ease: 'Power4.easeOut'})
					} else {
						var t = TweenMax.from($('.pointer-circle > img'), 1, { css: { autoAlpha: 0, left: '-2px' }, ease: 'Power4.easeOut'})
					}

					var tlcombined = new TimelineMax();
					tlcombined.staggerFrom(['img.touchscreen','img.keypad'], 1, { css: { autoAlpha: 0, left: '-20px' }, ease: 'Power3.easeInOut' }, 0.5)
						 		 .staggerFrom($('.2gicons > img'), 0.75, { css: { autoAlpha: 0, top: '30px'}, ease: 'Power4.easeInOut'}, 0.2)
						 		 .from($('.pointer-circle'), 1, { css: { autoAlpha: 0 }, ease: 'Power4.easeInOut'})
						  		 //.from($('.pointer-circle > img'), 1, { css: { autoAlpha: 0, left: '-2px' }, ease: 'Power4.easeOut'})
						  		 .from($('.phones3g-container > img'), 1, { css: { autoAlpha: 0, left: '-20px' }, ease: 'Power3.easeInOut' })
						 		 .staggerFrom($('.3gicons > *'), 0.75, { css: { autoAlpha: 0, top: '30px'}, ease: 'Power4.easeInOut'}, 0.2)
						 		 .add(t, 3);

					console.log('SECTION 6 triggered');
				}
			}
		});
		
		/* ----------------------------------------------------------------
			Section 7: How is your customer communicating?
		---------------------------------------------------------------- */
		$('#section7 .psection').each(function() {
			var $this = $(this);

			$this.find('div.icons').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if(isInView && !isIE8under && animelem.is('#section7')) {
					if(visiblePartY == 'both' || visiblePartY == 'top') {
						var $inthis = $(this);
						$inthis.off('inview');

						//fade in the phone
						var tl = new TimelineMax();
						tl.from($this.find('.psection-phone-img'), 1, { css: { autoAlpha: 0, left: '-75px'}, ease: 'Power3.easeOut'})
						  .staggerFrom($inthis.find('img'), 1, { css: { autoAlpha: 0, left: '-50px', force3D: true }, ease: 'Power3.easeOut'}, 0.2, '-=1')
						  .from($this.find('h2.subheader > span').eq(1), 0.75, { css: { autoAlpha: 0 }, ease: 'Power3.easeOut'}, '-=1');

						console.log('SECTION 7 triggered');
					}
				}
			});
		});
		

		/* ----------------------------------------------------------------
			Section 8: One Device. Many Features
		---------------------------------------------------------------- */
		$('#section8 h1.subheader + p').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && !isIE8under && animelem.is('#section8')) {
				if(visiblePartY == 'both' || visiblePartY == 'bottom') {
					var $this = $(this);
					$this.off('inview');

					var $circle = $('.devices-container div.circle div.dashed-circle'),
					 	 crotate = TweenMax.from($circle, 20, { css: { rotation: -360, force3D: true }, ease: 'linear', repeat: -1});

					//fade in the phone
					var tl = new TimelineMax();
					tl.from($('.devices-container div.phone img'), 1, { css: { autoAlpha: 0 }, ease: 'Power3.easeInOut'})
					  .from($circle, 1, { css: { autoAlpha: 0, scale: 0.5 }, ease: 'Power3.easeInOut'}, '-=1')
					  .staggerFrom($('div.dicons'), 0.7, { css: { autoAlpha: 0 }, ease: 'linear'}, 0.3)
					  .add(crotate, 1.2);

					console.log('SECTION 8 triggered');

				}
			}
		});


		/* ----------------------------------------------------------------
			Section 11: Cool Things to Do
		---------------------------------------------------------------- */
		$('#section11 .cool-circles').each(function() {
			var $this = $(this);

			$this.siblings('img').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if(isInView && animelem.is('#section11')) {
					if(visiblePartY == 'both' || visiblePartY == 'top') {
						var $inthis = $(this);
						$inthis.off('inview');

						TweenMax.from($this, 1, { css: { autoAlpha: 0, top: '100px' }});

						console.log('SECTION 11 triggered');
					}
				}
			});
		});


		/* ----------------------------------------------------------------
			Section 12: Upgrade to 3G
		---------------------------------------------------------------- */
		$('#section12 img').each(function() {
			var $this = $(this);

			$this.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if(isInView && !isIE8under && animelem.is('#section12')) {
					if(visiblePartY == 'both') {
						$this.off('inview');

						TweenMax.from($this, 1, { css: { autoAlpha: 0, scale: 0.5 }})

						console.log('SECTION 12 triggered');
					}
				}
			});
		});


		/* ----------------------------------------------------------------
			Section 12-5: 3G Data Plan
		---------------------------------------------------------------- */
		$('#data-plan img.cube').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView && !isIE8under && animelem.is('#data-plan')) {
				if(visiblePartY == 'both' || visiblePartY == 'top') {
					var $this = $(this);
					$this.off('inview');

					var tl = new TimelineMax();
					tl.from($this, 0.5, { css: { autoAlpha: 0} })
					  .from($this, 0.5, { css: { top: '-40px' }, ease: 'Bounce.easeOut' }, '-=0.1')
					  .from($this.siblings('img.cube-shadow'), 1, { css: { autoAlpha: 0, scale: 0.5 }, ease: 'Bounce.easeOut' }, '-=0.8')
					  .staggerFrom($('img.cube-icons'), 0.5, { css: { autoAlpha: 0, y: '50px' }}, 0.5);

					console.log('SECTION 12-5 triggered');
				}
			}
		});
		

		/* ----------------------------------------------------------------
			Section 14: Overcoming Objections
		---------------------------------------------------------------- */
		$('#section14 .response .rsa').each(function() {
			var $this = $(this);

			$this.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if(isInView && animelem.is('#section14')) {
					if(visiblePartY == 'both' || visiblePartY == 'top') {
						var $cust = $this.siblings('div.customer');
							 $rsa  = $this;

						$this.off('inview');

						var tl = new TimelineMax();
						tl.from($cust, 0.7, { css: { autoAlpha: 0, left: '-100px' }})
						  .from($cust.find('p'), 1, { css: {}, text: { value: ''}, ease: 'linear' })
						  .from($rsa, 0.7, { css: { autoAlpha: 0, left: '100px' }});
						  //.from($rsa.find('p'), 2, { css: { fontSize: '1em' }, text: { value: ''}, ease: 'linear' });

						console.log('SECTION 14 triggered');
					}
				}
			});
		});

	}); //end $(document).ready()
})(jQuery); //end self-invoking anonymous function
