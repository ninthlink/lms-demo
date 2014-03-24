/*=========================================================================================
Author: Tou Lee
Created: 1/16/14
Last Updated: 2/24/14 - 12:59pm
Version: 1.0.2

** This is the file for any javascript animations for the course **

Changelog v1.0.0
  - Created file

Changelog v1.0.1
  - Added panel snapping

Changelog v1.0.2
  - Added the jquery.qualcomm-reveal.js initalization
  - Added new animcounter variable to store the counter retrieved from the $.subscription()
  - Added extra check certain animations (section 2, 4, 6, 7) to only trigger when it is 
    on their slide that is showing to prevent animations for firing too early

==========================================================================================*/
(function($) {
  /* ----------------------------------------------------------------
    Reusuable cached variables
  ---------------------------------------------------------------- */
  var $html = $('html'),
      isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
      animcounter;

  $(document).ready(function() {
    /* ----------------------------------------------------------------
      Qualcomm Reveal Plugin
        - Initalize the plugin
        - Use the counter passed from $.publish('qualcommreveal/reveal-finish')
          to keep track of the items, and make sure animations do not
          fire prematurely
    ---------------------------------------------------------------- */
    //Initalize the plugin
    $('.content-container').qualcommreveal({});

    $.subscribe('qualcommreveal/reveal-finish', function(event, elem, counter) { 
      animcounter = counter; 
    });

    /* ----------------------------------------------------------------
      Section 2: Customer Chat Bubbles
    ---------------------------------------------------------------- */
		$('.s2p1 h1.light').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView) {
		   	if(visiblePartY == 'both') {
		    $(this).off('inview');

		    // console.log(animcounter);
		    // console.log('SECTION 2: inview fired :: chat bubbles');
		
			  var tl = new TimelineMax();
			  tl.from('.speech-bubbles.cust1', 0.8, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '50%'},  ease: 'Back.easeOut'})
		    	.from('.speech-bubbles.cust2', 0.8, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '30%'},  ease: 'Back.easeOut'})
		    	.from('.speech-bubbles.rsa',   0.8, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '-10%'}, ease: 'Back.easeOut'});
		 		}
		 	}
		});


    /* ----------------------------------------------------------------
      Section 4: Technologies Abound
    ---------------------------------------------------------------- */
    $('.s4p1 .icons.pov').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView && animcounter >= 2) {
       	if(visiblePartY == 'both') {
         	$(this).off('inview');

          // console.log(animcounter);
         	// console.log('SECTION 4: inview fired :: technology abound');
	
         	//This is the point of convergence
         	var povOffset = $('.icons.pov').offset();

         	/* 
         	  Loop through each element, and then find their relative position (offset) from the 
         	  point of convergence, and use that to animate them to it 
         	*/
  			  $('.icons').each(function(i) {
  			    var $this = $(this),
  			      thisOffset = $this.offset(),
  			      relativeY = povOffset.top - thisOffset.top,
  			      relativeX = povOffset.left - thisOffset.left;
              //Tween the animation to the point of convergence
	      			TweenMax.to($this, 0.75, { css:{ left: relativeX, top: relativeY, autoAlpha: 0 }, delay: 0.2});
  			 	});

          //Hide the container-icon
          var tl = new TimelineMax({ delay: 0.3 });
          tl.to($('.icons-container'), 1, { css:{ height: 0, autoAlpha: 0, force3D: true }, delay: 0.5 })
            .from($('.tech-phone'), 1, { css:{ autoAlpha: 0, top: '250px', force3D: true }, ease: 'Power4.easeInOut'})
            .staggerFrom($('.tech'), 1, { css:{ autoAlpha: 0, display: 'block', force3D: true }, ease: 'Back.easeOut' }, 0.2, "-=0.75")
            .staggerFrom($('.tech > p'), 0.5, { css:{ autoAlpha: 0, top: '-30px', force3D: true }}, 0.2, "-=1.1");
        }
      }
    });


    /* ----------------------------------------------------------------
      Section 6: Leadership Circles and #1
    ---------------------------------------------------------------- */
    $('.s6p1 div.square-box > h1.subheader').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView && animcounter >= 4) {        
        if(visiblePartY == 'top' || visiblePartY == 'both') {
          $(this).off('inview');

          // console.log(animcounter);
          // console.log('SECTION 6: inview fired :: #1');

          var tl = new TimelineMax({ delay: 0.3 });
          tl.from($(this), 1, { css:{ autoAlpha: 0, fontSize: '0.5em', force3D: true }, ease: 'Power4.easeInOut' })
            .staggerFrom($('.circles'), 1.25, { css:{ autoAlpha: 0, rotationY: 180, top: '-=80px', force3D: true }, ease: 'Back.easeInOut' }, 0.2);
        }
      }
    });


    /* ----------------------------------------------------------------
      Section 7: Snapdragon Family Chips
    ---------------------------------------------------------------- */
    $('.s7p1 .chip-400').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView && animcounter >= 5) {
        if(visiblePartY == 'top' || visiblePartY == 'both') {
          $(this).off('inview');

          // console.log(animcounter);
          // console.log('SECTION 7: inview fired');

          var tl = new TimelineMax();
          tl.staggerFrom($('.chips'), 1.2, { css:{ autoAlpha: 0, right: '-100%', force3D: true }, ease: 'Back.easeOut' }, 0.25)
        }
      }
    });

     
    /* ----------------------------------------------------------------
      Section 8,9,10,11: Chip Features
    ---------------------------------------------------------------- */
    $('.spec-main-img').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView) {
        if(visiblePartY == 'top' || visiblePartY == 'bottom' || visiblePartY == 'both') {
          $(this).off('inview');

          // console.log(animcounter);
          // console.log('SECTION 8,9,10,11 Spec section: inview fired');

          TweenMax.from($(this).find('img.spec-chip-img'), 1.5, { css:{ autoAlpha: 0, marginTop: '-200%', width: '75%', marginLeft: '-37.5%', force3D: true }, ease: 'Power4.easeInOut' });
        }
      }
    });


    /* ----------------------------------------------------------------
      Section 8,9,10,11: Customer Icons
    ---------------------------------------------------------------- */
    $('.cust-main-img').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView) {
        if(visiblePartY == 'top' || visiblePartY == 'bottom' || visiblePartY == 'both') {
          $(this).off('inview');

          // console.log(animcounter);
          // console.log('SECTION 8,9,10,11 Chip section: inview fired');

          //Tween the chip image into the spot
          TweenMax.from($(this).find('img.cust-chip-img'), 1.5, { css:{ autoAlpha: 0, marginTop: '-200%', width: '36%', marginLeft: '-18%', force3D: true }, ease: 'Power4.easeInOut' });

          var tl = new TimelineMax({ repeat: -1, yoyo: true });
          tl.staggerTo($(this).find('.cust-floating-icon'), 0.38, { css:{ marginTop: '5px', force3D: true }, ease: 'Power0.easeInOut' }, 0.1);
        }
      }
    });


  }); //end $(document).ready()
})(jQuery); //end self-invoking anonymous function