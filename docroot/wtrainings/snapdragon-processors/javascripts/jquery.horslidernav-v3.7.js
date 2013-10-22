/*=========================================================================================
Author: Tou Lee
Created: 2/04/13
Last Updated: 10/11/13 - 11:00pm
Version: 3.7.3

Changelog v1.4 
	- Changed references of div.section to div.slide

Changelog v1.5 
	- Moved "slider" object to be part of attributes object
	- Changed references to "slider" to "attributes.slider"

Changelog v1.6
	- Added "amt" argument to "setPositions" function
	- Added ternary operation to setting the $next, and $prev that checks for if amt is 
	  undefined or not, and if not do default of going one over, or else go exaclty to 
	  that spot in the slides list
	- Created $.fn.horslidernav.slideTo() = $.HorSlideTo() function

Changelog v1.7
	- Added skipSlideCheck() to return a jQuery object that fileters out divs with slides 
	  that a user wants to skip
	- Changed var sections variable to in setPositions() to be equal to object returned 
	  from skipSlideCheck()

Changelog v1.8
	- Added "scrollTop: 0" to the previous or next slide to animate in so that when the 
	  when those slides animate in they are at the top of that section.

Changelog v1.9
	- Extended the users options early in the plugin call
	- Changed self.options in init() method to equals passed in extended options object

Changelog v2.0
	- Edited the animate() function, and added $('html, body') to animate to first 
	  scrollTop to the top first before sliding in new content.

Changelog v2.1 
	- Added, desktop, and tablet switches as options. 
	- Added sniffer for desktop (isDesktop)
	- Added $slides to attributes object to cache $('.slides'), and replaced instances of
	  $('div.slides') with new "attributes.$slides"

Changelog v2.2
	- Moved device detection inside the return .each() statement to retain chainability
	- Removed "else" clause from skipSlideCheck() if-statement. Added ".slide-skip" in
	  with all statements, as it's a global class. 
	- Changed if-statment conditions (tablet, and mobile) to check if it's not explicit
	  on a desktop, and also check the screen size.
	- Switched fadeIn() default values for arrow-navigation, first-slide, and if disabled
	  to the value of 400.

Changelog v2.3 
	- Added the fix for RTL langauges to the navigation with previous arrow floating not 
	  in the correct location. Added class of "rtl" to it if the HTML or BODY tag contains
	  the attribute of dir and it's value is "rtl".
	- Updated the HTML scrollTop speed to 300.

Changelog v2.4
	- Added plugin option of "fade", if the user wants the slide to fade in and slide in
	  or not. 
	- Removed the RTL class and the if-statement to append it to prev-arrow. In CSS file 
	  just declared left: 0 as default

Changelog v2.5
	- Added an if-statement to the animate to first check if the viewport is already at 
	  the top, and if it is not then scroll up, else just animate the slide over. This
	  fixes the small delay in the animation when the user is already at the top. 

Changelog v2.6 
	- Changed the public slide-to function from $.HorSlideTo() to $.horslideTo()

CHangelog v2.7 
	- Added new options for "fullHeight", to allow the user to have the slides be 100% 
	  height to the container. Default for this is "true"
	- Added new "setHeight" function (inconjunction with fullHeight optoin) 
	  call to resize the ".slides" when the window is resized. 
	- Added "fade" to the set of default options

Changelog v2.8 
	- Moved self.createNav() call to after the self.storeAndHide() [storage of slides]
	  so that we the "attributes.storage" will be populated then, so we can check for # 
	  of slides.
	- Added number of check of number of slides inside self.createNav(): if there are less
	  than 1 slide then don't show the navigation arrows. 

Changelog v2.9 
	- Added new functions to the methods object
		• linearNavInit()
		• subscriptions()
		• setNav()
		• enableNav()
		• disableNav()
		• checkSlide()
		• checkWindowLocation()
		• getDocHeight()
	- Added new observer pattern API (publish/subscription model)
	- Added new option to plugin --> "linearNav". This allows for the user to enable the
	  linear navigation.
	- Added setClick method that acts as the main event handler for the "click" event on 
	  the "a.nav-buttons"

Changelog v3.0 
	- Added new functions
		• setVisitBoolean()
	- Added code to turn the "visitBoolean" to true inside checkWindowLocation()
	- Added code inside checkSlide() to re-enable the "next" button as well if they've 
	  already visited it.	

Changelog v3.1
	- Added new option "linearLoop": allows the user to enable or disable if the user can 
	  loop through the slides from first-to-last, or last-to-first
	- Added new if-statment for check for last-slide in checkSlide()
	- Added new attribute to "attributes" object: "totalVisitCounter" to keep track of the
	  slides that have been visited by the user.

Changelog v3.2 
	- enableNav(), disableNav(): replaced .css() call with .addClass()/.removeClass() to 
	  add/remove the ".disable" class from the stylesheet.
	- $.horslideTo(): added new check for if "linearNav" is enabled, and if so the user can
	  not go to that particular slide unless they've already visited it.
	- Added new function "setSlideVisit": it does the logic and check for setting the slides
	  visitedCounter, and incrementing the totalVisitCounter
	- Moved the set visit logic from inside checkWindowLocation()'s resize() resize to the 
	  new "setSlideVisit()" function.
	- Added new subscription and event called "slider/slide-visited"
		• Event is published on "slider/animation-done"'s subscription callback function
		• Event triggers the "setSlideVisit()" function"
	- Publish "slider/slide-visited" right away in linearNavInit() to have the first-slide 
	  set it's visitCounter accordingly
	- $.horslideTo(): published "slider/animation-start" to have the fade out of nav items
	  on the animation start trigger

Changelog v3.3 
	- createNav(): added new mobile HTML DOM elements to the navigation
		• <div class="return-top"><a class="return-top-link">Back to Top</a></div>
	- init(): added on('click') event for the "a.return-to-top" link in the navigation
	- init(): add a class of "horslider" to the html so that we can target specifically when
	  the navigation is enabled or if it is not.

Changelog v3.4 
	- added new property called 'iOSextra' that is needed to calculate the correct bottom
	  for checking when the user gets to the bottom of the screen on a mobile Safari (iPhone)
	  device.

Changelog v3.5
	- Moved the event setting for the "Back to Top" link's into it's own function called 
	  setTopLink();
	- [null] Added option of "useTranslate3d: true" to the slideOver() function
	- Changed speed of slide top from 300 --> 400
	- Removed references to "useTranslate3d: true" since the plugin will determine it 
	  automatically.
	- setHeight(): added a call to update attributes.containWidth ('left') value to slide 
	  over the slide when the user resizes their browser window.
	- Removed creation of "attributes.methodsObj"
	- Commented out the call to "self.checkMobileSafari", helped to reduce the lag, and 
	  crashing on mobile Safari.
	- Switched "fade" plugin option default to "false"

Changelog v3.6
	- subscriptions(): under the subscription to 'slider/page-bottom', added if-statment to
	  check when all the pages have been visited at the point, and if so, then publish an 
	  event called 'slider/visited-all', that user's can react to when they want.
	- setHeight(): added new variable to grab the slide's padding-bottom. This allows us to
	  set the height of the slide-padding, to get the slide to fit perfectly into the window's
	  frame. [this has been commented out]
	- New function: setSlideComplete() --> sets the slide as being completed, and publishes
	  the "page-bottom" event.

Changelog v3.7
	- Added new function: createIndicators()
		- This function creates the indicators and also set subscribes to the two events:
			1. slider/animation-start --> removes the class of ".active"
			2. slider/animation-done --> adds the class of ".active" to the indicator that
			   matches the current slide that is active. 
	- Added new option: "locIndicator" with default of "true"
	- Added new option: "assessment" with default of "true" --> this allows the user to
	  check if they want to have the user beable to go to the assessment from the last slide
	- checkSlide(): Added inner-if statement to check for publish an event if the user is 
	  on the last page, and want go to the assessment

Changelog v3.7.1
	- Added new check for iOS7 Mobile Safari, to make new change for the fullscreen mode
		1. If it less than iOS7 > attributes.iOSextra = 60
		2. If it is iOS7 > attributes.iOSextra = 69

Changelog v3.7.2
	- Added option "linearProg", this works in conjunction with the "linearNav" option, but 
	  is the trigger for it the user has to slide to the bottom of the page to view go to
	  the next slide.
	- linearNavInit(): put a if-statment to check for "linearProg", if on, then we can call
	  to check the user's location, otherwise, we don't.
	  	• if(self.options.linearProg) { self.checkWindowLocation(); }
	- setNav(): Added if-statement to check or "linearProg", and if it is on, then disable 
	  both the nav arrows, otherwise, just disable the previous arrow.
	- checkSlide(): (middle slide if-statement)
		• Added && linearProg to the if-statement, on whether to turn on the next arrow or not
			- if($slideDOM.visitCounter && $slideDOM.slideComplete && self.options.linearProg) {...}
		• Otherwise, if linearProg is false/off, then just turn on the next arrow
	- subscriptions(): on subscription to (slider/animation-done)
		• checkSlide(), and $.publish('slider/visited') class were switched around, with call 
		  first to $.publish('slider/visited'), then, to checkSlide(), so that the call in
		  checkSlide() for enabling the next arrow if 'linearLoop' was on would trigger
		  	• Slide's 'visitCounter' would have been set to 'true' before checkSlide() for it to 
		  	  trigger the enable of next arrow.

Changelog v3.7.3
	- slideTo(): Changed the check from "linearNav" to "linearProg"
		• Also, published --> $.publish('slider/animation-start'); when there linearProg 
		  is set to 'false' also, and so indicators move accordingly.

———————————————————————————————————————————————————————————————————————————————————————————
jquery.horslidernav.js 
	- This script is used to create a horizontal sliding navigation. 
	- Users can click the arrows and slide to the next section of the course

Options: 
	- speed  	  [ default = 400 ] ----- Number: The speed of the sliding and fading animations 
	- easing 	  [ default = 'swing'] -- String: The type of easing to be applied to the animations 
	- desktop: 	  [ default = true ] ---- Boolean: to enable sliding on desktop devices
	- tablet: 	  [ default = true ] ---- Boolean: to enable/disable on tablet devices
	- mobile: 	  [ default = true ] ---- Boolean: to enable/disable on mobile devices
	- fade: 	  [ default = false ] --- Boolean: to enable/disable fadeing in or out of slides
	- fullHeight: [ default = true ] ---- Boolean: to enable full height scaling for objects
	
	- linearNav:  [ default = false ] --- Boolean: to force linear navigation, user can't loop around
	- linearProg  [ default = false ] --- Boolean: to force users to have to scroll to the bottom of the page to enable
										  		   the next arrow to proceed forward. 
										  		   		• You must have "linearNav" enabled for this option to take effect
	- linearLoop: [ default = true ] ---- Boolean: to enable/disable the user loop back to front and vice-versa, 
												   if they've visited all the slides
	             						  				• You must have "linearNav" enabled for this option to take effect

	- locIndicator: [ default = true ] -- Boolean: This addes the indicators to indicate to the user what slide
										  		   they are currently on of the total slide
	- assessment: [ default = true ] ---- Boolean: This checks of the user wants to allow the user to go to the 
										  		   assessment of the course.
										 
Conditions: 
	- DIVs that are to be slide have the class of "slide"
	- Invoke the plugin on the outermost containing element

Dependencies: 
	- Include "jQuery" library
	- Include "jquery.horslidernav.css" in the html file that you want to use this in
	- Include "jquery.animate-enhanced.min.js" in the file to leverage CSS3
	- Include "jquery.easing.1.3.js" if you want to use different easing options
		- List of Easing Options can be tested here: 
			* http://matthewlein.com/experiments/easing.html
———————————————————————————————————————————————————————————————————————————————————————————
Issues to resolve: 
	- Major: Fix webkit flickering animation on iPad
	- [fixed] Miniscule: Fix if they want height: 100% 
	- [fixed] Add check for if there is only one slide, then don't show the arrows.
	- [fixed] Add counters so that the user doesn;t have to go to the bottom of a page they've already
	  visit to continue. 
	- [fixed] Add check for final slide, to prevent user from going around in loop
	- [fixed] Update horslider if linear navigation is enabled to only allow the user to go to the 
	  slides where "visitCounter" == true;
	- Major: crashing on iOS iPhone!!

Features to add: 
	- Possible "left" and "right" arrow keypress navigation
	- Possible resizing will remove the mobile if false, similar to CSS Media Queries 
	  w/o the need to refresh the page for the action to take place.
	- [added[ Linear Nav: add option for user to say if they want to page to circle around or not
	- Make "linearNav" option work outside of "linearNav" option

Notes: 
	- Mobile: min-device-width: 320px, max-device-width: 768px
	- Tablet: min-device width: 768px, max-device-width: 1280px;
==========================================================================================*/

/*-----------------------------------------------------------------------------------------
Polyfill for Object.create for browsers that don't support Object.create function
------------------------------------------------------------------------------------------*/
if(typeof Object.create !== 'function') {
	Object.create = function(object) {
		function F() {}; 
		F.prototype = object; 
		return new F();
	};
}

/*-----------------------------------------------------------------------------------------
Extend the Array prototype to provide new functions
	- first() -- returns the first element in the array
	- last()  -- returns the last element in the array
------------------------------------------------------------------------------------------*/
Array.prototype.first = function() {
	return this[0];
}

Array.prototype.last = function() {
	return this[this.length-1];
}

/*-----------------------------------------------------------------------------------------
Observer Pattern API
	- Create custom function names on the jQuery namespace that map to existing functions  
------------------------------------------------------------------------------------------*/
;(function($) {
	var o = $( {} );

	$.each({
		on: 'subscribe',
		trigger: 'publish',
		off: 'unsubscribe'
	}, function( key, api ) {
		$[api] = function() {
			o[key].apply( o, arguments );
		}
	});
})(jQuery);

/*-----------------------------------------------------------------------------------------
Plugin starts here
	- The ";" before the anonymous function is there for safety net for any other scripts
	and/or plugins that have not been closed properly.
------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Plugin attributes
	var attributes = {
		slider: null,      	 	//holds the object that extends from the methods prototype main object (plugin logic)
		storage: [],		 	//array to hold the div.slide
		current: 0,			 	//the default starting position
		containWidth: 0,	 	//the width of the container to slide
		totalSect: 0,		 	//total number of sections
		clickReady: true,	 	//a boolean value to prevent animation queue up and rapid clicking
		$slides: $('.slide'),	//cache of jquery object for slides
		windowWidth: document.documentElement.clientWidth,
		isDesktop: !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
		totalVisitCounter: 0,
		iOSextra: 0 			//extra pixels added to scrollTop needed for mobile Safari iOS
	}; //End "attributes"

	//Plugin methods 
	var methods  = { 
		//initalizing function
		init: function( options, elem ) {
			var self   = this;
			self.elem  = elem; 
			self.$elem = $(elem);

			//add class of ".horslider" to html tag so can target specific
			$('html').addClass('horslider');

			//check if the userAgent is mobile safari, and if it is add the "-webkit-backface-visibility: hidden" to the slide children
			//self.checkMobileSafari();

			//store the container element's width (padding included)
			attributes.containWidth = self.$elem.outerWidth();
			
			//merge objects to override the defaults options with those the user passes in
			self.options = options;

			//create the wrapper container 
			self.createWrapper(self.$elem);

			//create store the elements and hide them
			self.storeAndHide();

			//create the navigation elements
			self.createNav();

			//create the dots indicator - if the option is set to true
			if(self.options.locIndicator) { self.createIndicators(); }

			//set the height of the slides
			if(self.options.fullHeight) { self.setHeight(); }

			//attach the click events, and main run the main interactions of the plugin
			$('a.nav-arrow').on('click', function(e) {
				self.setClick.call(self, e, this);
			});

			//attache the scrollTop even to the "Back to Top" link for tablet/mobile
			self.setTopLink();

			//check if the user has enabled to check the limited progression mode
			if(self.options.linearNav) { self.linearNavInit( self.elem ); }
		},

		//set the return to top link's action
		setTopLink: function() {
			$('a.return-top-link').on('click', function(e) {
				e.preventDefault();
				var $this = $(this);

				$('html,body').animate({
					scrollTop: 0,
					//scrollTop: $this.offset().top, 
					//useTranslate3d: true,
				}, 400);
			});
		},

		//sets the click event on the nav-arrow elements
		setClick: function(e, elem) {
			var self = this;

			if(attributes.clickReady == true) {
				$.publish('slider/animation-start');
				self.clickHandler(elem, e);
			}
		},

		//set the size of the slide to full height of screen
		setHeight: function() {
			var self	  = this,
				$window   = $(window),
				winHeight = $window.height(),
				slidePos  = attributes.$slides.position(),
				finHeight = winHeight - slidePos.top;
				//padding   = parseInt(attributes.$slides.css('padding-bottom'));

			$window.resize(function() { 
				attributes.$slides.css('min-height', winHeight);	//set the min heights
				//attributes.$slides.css('min-height', winHeight-padding);	//set the min heights so that it matches exactly the height [currently causes issues]
				attributes.containWidth = self.$elem.outerWidth();	//update the "left" property to slide over
			});

			$window.resize();  //call the resize to update the slide
		},

		//create the navigation to hold the arrows
		createNav: function() {
			var body = $('body'),
				navHTML = '<div class="slider-nav">\
							<a class="nav-arrow prev-arrow" data-dir="prev"></a>\
							<a class="nav-arrow next-arrow" data-dir="next"></a>\
							<div class="return-top">\
								<a class="return-top-link">Back to Top</a>\
						   	</div>\
						   </div>';
			
			//append the HTML string of the navigation to the body			
			body.append(navHTML);

			//check to see if there are more than 1 slide, if so then fade in the navigation
			if(attributes.storage.length > 1) {
				$('div.slider-nav').fadeIn(400);
			};
		},

		//create the indicators to show the user where they are in terms of the slides
		createIndicators: function() {
			var body = $('body'),
				dotHTML = '<div class="location-nav">';

			//loop through the necessary amounts of indicators to match the total amounts of slides
			for(var i = 0; i < attributes.storage.length; i++) {
				dotHTML += '<div class="indicator"></div>';
			}

			dotHTML += '</div>';

			//append the indicator to the body
			body.append(dotHTML);

			//make the first item active
			var $indicator = $('.indicator');
			$indicator.first().addClass('active');

			//set the subscriptions --> remove the .active class
			$.subscribe('slider/animation-start', function() {
				$indicator.removeClass('active');
			});

			//set the subscriptions --> add the .active class to the current one
			$.subscribe('slider/animation-done', function() {
				var index = $('.slide').filter(':visible').index();
				var $indicator = $('.location-nav').children().eq(index);
				$indicator.addClass('active');
			});
		},

		//creates the wrapper around the sections so we can hide the overflow-x (scrollbar)
		createWrapper: function(elem) {
			elem.children('.slide').wrapAll('<div class="slide-wrapper"></div>');
		},

		//store all the divs with class of .slide
		storeAndHide: function() {
			var self = this,
				sections = self.skipSlideCheck();
			
			sections.each(function(i) {
				var $this = $(this);

				//fade in the first element, since they're already hidden
				if(i == 0) {
					$this.fadeIn(400);
				}

				//apply the relative positions, top, and left, attributes so we can use to animate
				$this.css({
					position: 'relative',
					left: 0,
					top: 0
				});

				//store the div's into the array for future usage
				attributes.storage[i] = this; 
			});

			//store the total length of the array into the totalSect variable
			attributes.totalSect  = attributes.storage.length;
		},

		//Create jQuery object of div.slide that do not contain the '.slide-skip' or '.slide-skip-mobile' classes
		//if they do then filter out those and hide them, and return jQuery object without those elements
		skipSlideCheck: function() {
			var self = this,
				temp; 

			if(!attributes.isDesktop && attributes.windowWidth < 768) {
				temp = attributes.$slides.filter('.slide-skip-mobile, .slide-skip').hide().end().not('.slide-skip-mobile, .slide-skip');
			
			} else if(!attributes.isDesktop && attributes.windowWidth >= 768) {
				temp = attributes.$slides.filter('.slide-skip-tablet, .slide-skip').hide().end().not('.slide-skip-tablet, .slide-skip');
			
			} else if(attributes.isDesktop) {
				temp = attributes.$slides.filter('.slide-skip-desktop, .slide-skip').hide().end().not('.slide-skip-desktop, .slide-skip');
			}

			return temp;
		},

		//run the main clicking code that makes the slider run
		clickHandler: function(elem, e) {
            e.preventDefault();
            e.stopPropagation();

            var self  = this,
            	$elem = $(elem),
            	dir   = $(elem).data('dir');

            //set the click ready to false
            attributes.clickReady = false;

            //call the move function and pass arrow that was pressed: previous, or next
			self.setPositions(dir);
		},

		//animating the movement, and the slides
		setPositions: function(direction, amt) {
			var self = this,
				$current = $(attributes.storage[attributes.current]),
				$prev    = $(attributes.storage[(amt == undefined) ? attributes.current-1 : amt]),
				$next    = $(attributes.storage[(amt == undefined) ? attributes.current+1 : amt]);

			if(direction == 'next') {
				
				if(attributes.current == attributes.totalSect-1) {
					$next = $(attributes.storage.first());
				}

				//animate: slide out current, and fade out
				self.animateSlide(direction, $current, $next);
			} 
			else if(direction == 'prev') {
				
				if(attributes.current == 0) {
					$prev = $(attributes.storage.last());
				}

				//animate: slide out current, and fade out
				self.animateSlide(direction, $current, $prev);
			}

			//Update current position: if the direction is next, then increment the current position, otherwise, decrement since they'll be hitting previous
        	(direction == 'next') ? attributes.current++ : attributes.current--;

        	//set the current appropriate to loop back around
        	if(attributes.current >= attributes.totalSect) {
        		attributes.current = 0;
        	} 
        	else if(attributes.current < 0) {
        		attributes.current = attributes.totalSect-1;
        	}
		},

		//animate the path slides
		animateSlide: function(direction, current, dirobject) {
			var self = this,
				top  = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);

			//set the previous or next object in position
			dirobject.css('left', (direction == 'next') ? attributes.containWidth : -attributes.containWidth);

			// 1. check if the viewport is at the top of the page first
			// 2. if not, then animate the current slide over and out of view
			// 3. else, then animate the slides.
			if(top > 0) {
				$('html, body').animate({
					scrollTop: 0
				}, 400, slideOver);
			} else {
				slideOver();
			}

			//inner function that is used to slide over the slides. 
			function slideOver() {
				current.animate({
					opacity: (self.options.fade) ? 'hide': 1,
					left: (direction == 'next') ? -attributes.containWidth : attributes.containWidth,
					//useTranslate3d: true
				}, self.options.speed, self.options.easing, function() {

					//if the fade option isn't there then manually show and and hide the current and previous objects
					if(!self.options.fade) {
						current.hide();
						dirobject.show();
					}

					dirobject.animate({
						opacity: (self.options.fade) ? 'show': 1,
						left: 0,
						//useTranslate3d: true
					}, self.options.speed, self.options.easing, function() {
						attributes.clickReady = true;
						$.publish('slider/animation-done');
					});
				});
			}
		},

		//check the if you're on the mobile safari, and if the yare add the "-webkit-backface-visibility: hidden"
		//to prevent counteract the issues with tabs, and drag and droppables
		checkMobileSafari: function() {
			if(navigator.userAgent.match(/(iPad)|(iPhone)/i)) {
				$('.slide *').css('-webkit-backface-visibility', 'hidden');
			}
		},

		/*----------------------------------------------------------------------------------------------------------
		Linear Navigation Logic:
			- Inner object that contains methods to check for when the user wants to check for the user having to 
			  go through the page before they can proceed ==> forcing a linear navigation
		----------------------------------------------------------------------------------------------------------*/
		//initalizing function
		linearNavInit: function ( elem ) {
			var self 	 = this; 
			self.elem 	 = elem; 
			self.$elem 	 = $(elem);

			//cache the core navigation items need for linaer navigation for easy use
			self.nav = {
				$arrows: $('a.nav-arrow'),
				$next: 	 $('a.next-arrow'),
				$prev: 	 $('a.prev-arrow'),
			};

			//set mobile iOS extra
			if(navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
				attributes.iOSextra = 69;
			}
			else if (navigator.userAgent.match(/(iPhone)/)) {
				attributes.iOSextra = 60;
			}

			//set the event subscriptions 
			self.subscriptions();

			//create visit booleans for each slide
			self.setVisitBoolean();

			//set the initial states of the navigation
			self.setNav();

			//check the user's location
			if(self.options.linearProg) { self.checkWindowLocation(); }

			//set the first slide as visited already
			$.publish('slider/slide-visited');
		},

		//create a visitCounter and slideComplete properties for each slide 
		setVisitBoolean: function() {
			for(i in attributes.storage) {				
				if(typeof attributes.storage[i] !== 'function') {
					attributes.storage[i]['visitCounter'] = false;
					attributes.storage[i]['slideComplete'] = false;
				}
			}
		},

		//set the subscriptions for events
		subscriptions: function() {
			var self  = this,
				$slide; 
			
			$.subscribe('slider/page-bottom', function() {
				//console.log('subscribe --> at page bottom');
				$slide = $('.slide').filter(':visible')[0];

				if($slide === attributes.storage.last() && !self.options.linearLoop) {
					self.checkSlide();
				} else {
					self.enableNav(self.nav.$next);
				}

				// check if all the slides have been visited then publish the event 'slider/visited-all' so that
				// users can do what they want with the event
				if(attributes.totalVisitCounter === attributes.storage.length) {
					$.publish('slider/visited-all');
				}
			});

			$.subscribe('slider/animation-start', function() {
				//console.log('subscribe --> animation started');
				self.disableNav(self.nav.$arrows);
			});

			$.subscribe('slider/animation-done', function() {
				//console.log('subscribe --> animation finished');
				//self.checkSlide();
				$.publish('slider/slide-visited'); //publish event to set the slide as visited
				self.checkSlide();
			});

			$.subscribe('slider/slide-visited', function() {
				//console.log('subscribe --> slide visited');
				self.setSlideVisit();
			});
		},

		//set the navigation to enable it or disable it in a linear fashion
		//if linearProg option is available then disable both arrows
		//else if not, then just disable the previous arrow
		setNav: function() {
			var self = this;

			if(self.options.linearProg) {
				self.disableNav(self.nav.$arrows);
			} else {
				self.disableNav(self.nav.$prev);
			}
		},

		//set the status of the slides "visitCounter" to true if they've been visited by the user
		setSlideVisit: function() {
			var $slideDOM = $('.slide').filter(':visible')[0];

			if((attributes.totalVisitCounter != attributes.storage.length) && !$slideDOM.visitCounter) {
				$slideDOM.visitCounter = true;
				attributes.totalVisitCounter++;
			}
		},

		//enable the nav item, and reattach the click event
		enableNav: function() {
			var self = this;

			for(i in arguments) {
				arguments[i].removeClass('disable').on('click', function(e) {
					self.setClick.call(self, e, this);
				});
			}
		},

		//disable the nav item, and remove the click event
		disableNav: function() {
			for(i in arguments) {
				arguments[i].addClass('disable').off('click');
			}
		},

		//check the current slide
		checkSlide: function() {
			var self = this,
				$slide = $('.slide').filter(':visible');
				$slideDOM = $slide[0];

			if( $slide.hasClass('slide-first') ) {
				//console.log('checkSlide --> First slide!');
				self.enableNav(self.nav.$next);

				if(attributes.totalVisitCounter === attributes.storage.length && self.options.linearLoop) {
					self.enableNav(self.nav.$prev);
				}
			} 
			else if($slideDOM === attributes.storage.last()) {
				//console.log('checkSlide --> Last slide!');
				self.enableNav(self.nav.$prev);

				if(!self.options.linearLoop) {

					//check if the user set the "assessment" option to true, AND the linear loop is off, we 
					//publish the event to "slider/go-to-assessment" to anybody who wants to use that event
					if(self.options.assessment && $slideDOM.visitCounter === true) {
						$.publish('slider/goto-assessment');
					} 
					else {
						self.disableNav(self.nav.$next);
					}
				}
				else if($slideDOM.visitCounter === true) {
					self.enableNav(self.nav.$next);
				}
			}
			else {
				//console.log('checkSlide --> Middle slide!');
				self.enableNav(self.nav.$prev);

				//if the linearProg option is turned on then they must have visited the slide, and completed the slide to 
				//enable the next arrow. Otherwise, if linearProg is off, then we can just turn on the next arrow
				if($slideDOM.visitCounter && $slideDOM.slideComplete && self.options.linearProg) {
					self.enableNav(self.nav.$next);
				} 
				else if(!self.options.linearProg) {
					self.enableNav(self.nav.$next);	
				}
			}
		},

		//check if the user is at the bottom of the screen, and if they publish the event
		checkWindowLocation: function() {
			var self = this,
				$window = $(window);

			$window.scroll(function() {
				if( ($window.scrollTop() + attributes.iOSextra) + $window.height() >= self.getDocHeight() ) {
					// var	$slideDOM = $('.slide').filter(':visible')[0];
					// $slideDOM.slideComplete = true;
					// $.publish('slider/page-bottom');
					self.setSlideComplete();
				}
			});
		},

		//set whethe the slide has been completed
		setSlideComplete: function() {
			var self = this,
				$slideDOM = $('.slide').filter(':visible')[0];
				
				$slideDOM.slideComplete = true;		//set the slides' slideComplete attribute to true
				$.publish('slider/page-bottom');	//call the event that the page is the bottom
		},

		//get the height of the document to be checked against the user's location
		getDocHeight: function() {
    		var D = document;
    		return Math.max(
		        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    		);
		}

	}; //End "methods"

	//Plugin declaration
	$.fn.horslidernav = function(options) {
		//extend the user's default options with ours
		var options = $.extend( {}, $.fn.horslidernav.defaultsOptions, options);

		//keep if statement inside to keep chainability
		return this.each(function() {
			//if they are all true, then run it
			if(options.desktop && options.tablet && options.mobile ) {
				run.call(this);
			//if they are not on a desktop, tablet is set to true, and width is >= 768, run it
			} else if(!attributes.isDesktop && options.tablet && attributes.windowWidth >= 768) {
				run.call(this);
			//if they are not on a desktop, mobile is set to true, and width is < 768, run it
			} else if(!attributes.isDesktop && options.mobile && attributes.windowWidth < 768 ) {
				run.call(this);
			//if they are on a desktop, desktop is set to true, run it
			} else if(attributes.isDesktop && options.desktop) {
				run.call(this);
			//else, either were all false, and fade in the .slides
			} else {
				attributes.$slides.fadeIn(400);
			}
		});

		function run() {
			attributes.slider = Object.create(methods); 		
			attributes.slider.init(options, this);		
		}
	}

	//Public function to allow links to slide to any slide when they enter the slide number (zero-based)
	$.fn.horslidernav.slideTo = $.horslideTo = function(slideNum) {
		//subtract 1 from the passed in number, so that it is zero-based
		slideNum -= 1;

		//set so that the passed in number NEVER exceeds the total amount and doesn't go there
		if(slideNum < 0) {
			slideNum = 0;
		} else if(slideNum > attributes.totalSect-1) {
			slideNum = attributes.totalSect-1;
		}

		//if the passed in slide is the same as the current slide then don't run it
		//also if the slide to visit hasn't been visited yet (when linearNav is true), then don't go to it
		if(slideNum != attributes.current) {
			var $slideDOM = attributes.storage[slideNum]

			if(attributes.slider.options.linearProg && $slideDOM.visitCounter) {
				$.publish('slider/animation-start');
				attributes.slider.setPositions( ((slideNum > attributes.current) ? 'next' : 'prev'), slideNum)
				attributes.current = slideNum; 
			} 
			else if(!attributes.slider.options.linearProg) {
				$.publish('slider/animation-start');
				attributes.slider.setPositions( ((slideNum > attributes.current) ? 'next' : 'prev'), slideNum)
				attributes.current = slideNum; 
			}
		}
	}

	//Plugin default options
	$.fn.horslidernav.defaultsOptions = {
		speed: 400, 
		easing: 'swing',
		desktop: true,
		tablet: true,
		mobile: true,
		fade: false,
		fullHeight: true,
		linearNav: false,
		linearProg: false,
		linearLoop: true,
		locIndicator: true,
		assessment: true
	};

})(jQuery, window, document); 