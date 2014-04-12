/*=========================================================================================
Author: Tou Lee
Created: 11/8/13
Last Updated: 4/3/14 - 3:32pm
Version: 1.0.7

Changelog v1.0.0
  	- Created the intial slider styles, and functionality

Changelog v1.0.1 
	- Added new refresh() function that calls the setSize() function to recalculate the 
	  items on a list, and reset the sizing accordingly
	- Initial Plugin Reg:
		• Reworked it to check if the options are a method name of if the user is just initalizing the plugin
		• Removed the Object.create() call, but rather directly calls methods.init()

Changelog v1.0.2
	- setSize():
		• Change the width calculation from getting the li's .css('width') to calling
		  .outerWidth() on the li's instead. 

Changelog v1.0.3 
	- setSize():
		• Changed setting of self.$slideUL and self.$slides to use .children() vs .find()
		• To make sure that we only go one level deep not in search

Changelog v1.0.4
	- Added new slideTo() function that allows the user to move the slider to any slide
	  they wish by passing in the zero-based index of the slide

Changelog v1.0.5
	- Added new options:
		• animation: 'fade' or 'slide'
		• autoTimer: 0 (to turn off)
	- Added new fadeAnimate() - function that contains animation code for when the user wants to fade-in
	  their slides rather than slide them
	- Added new createIndicators() - function that generatees and binds 'click' event for the slide indicators
	- Added new linearRun() - the main function to trigger when the user is clicking next/prev, or if the autoTimer mode is on
	- init():
		• Made new call for to hide all the slides except the first if the user chooses 'fade'
		• Moved code inside self.$arrows 'click' event into linearRun, and calls that instead on click
		• Created new subscription of 'content-slider/animation-start', and moved self.clickReady = false into there
		• Created new variable self.autoRefresh (boolean) that checks if the passed in value is > 0 for autoTimer.
		• Added the check for and code for if the user wants to swipe left or right, and progress accordingly
	- resize():
		• Added new check for if the user is using the 'slide' mode, and if so, then we move back to the slide back to the first section, and set self.current = 0
	- slideTo():
		• Added new condition of 'self.clickReady ===  true' to the '!sameSlide' check before running anything
		• Added new calls to clearTimeout to reset the timer if the self.autoRefresh is set to true, and a call back to 
		  linearRun('next',1) to restart the timer if the self.autoRefresh is true after moving to a specific slide

Changelog v1.0.6 
	- Added new pause() function
		• Function takes in a parameter of boolean that checks if the user wants to stop the timer if the autoTimer option is on
		• If true, then we clear the timer
		• If false, then we restart the timer, by calling self.linearRun('next')
	- slideTo()
		• Changed restart timer code from:
			- self.linearRun('next',1) ---> self.linearRun('next')
	- Added new option: initialPaused : boolean
		• This option works with the autoTimer option, which if set to "true" will prevent the inital run of linearRun('next')
	- Init()
		- Changed the way that we do NOT select the first element to set CSS 'display: none' when the animation is set 'fade'
			- changed from .not(':first') to .slice(1)

Changelog v1.0.7 
	- fadeAnimate()
		• Changed from .animate('opacity', 'hide') to fadeOut(...) when fading out the current slide
		• Added self.options.speed, as the first argument to the fadeIn(..) when fading in the next element

———————————————————————————————————————————————————————————————————————————————————————————
jquery.contentslider.js 
	- This script is used to create a content slider 

Options: 
	- speed  	  [ default = 400 ] ------ Number: The speed of the sliding and fading animations 
	- easing 	  [ default = 'swing' ] -- String: The type of easing to be applied to the animations 
	- animation   [ default = 'slide' ] -- String: The type of animation. Only two options: 'slide' or 'fade'
	- autoTimer   [ default = 0 ] -------- Number: The MS to automatically progress the slider. Use 0 to disable
										 
Conditions: 
	- DOM setup requirement below
		<div class="slider-name">
			<ul>
				<li>content...</li>
				<li>content...</li>
			</ul>
		</div>

Dependencies: 
	- Include "jQuery" library
	- Include "jquery.content-slider.css" in the html file that you want to use this in
	- Include "jquery.animate-enhanced.min.js" in the file to leverage CSS3
	- Include "jquery.easing.1.3.js" if you want to use different easing options
		- List of Easing Options can be tested here: 
			* http://matthewlein.com/experiments/easing.html
	- Include "jquery.touchSwipe.min.js" if you want to use the touchswiping options
———————————————————————————————————————————————————————————————————————————————————————————
Issues to resolve: 
	- 

Features to add: 
	- 'y' vertical slide scrolling 
	- resize removes to the closes slide
	- create fallback for places w/o javascript
	- auto-slide by itself (done)
	- option for dots, and make them clickable (done)
	- refresh() so if user adds new slides dynamically, to recalculate sizing (done)
		• Need to recreate the indicators to match if anything is added

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
	var attributes = {
		isRTL: null		//boolean if the page is RTL
	}
	
	var methods = {
		/*
			Initalization Function
		*/
		init: function(options, elem) {
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);
			self.current = 0;
			self.clickReady = true;

			//merge objects to override the defaults options with those the user passes in
			self.options = $.extend( {}, $.fn.contentslider.defaultsOptions, options);

			//check if we should use auto refresh the slides
			self.autoRefresh = (self.options.autoTimer > 0) ? true : false;

			//register subscriptions
			self.subscriptions();

			//create the wrapper to encase the slider
			self.createWrapper();

			//create the navgiation for the slider
			self.createNav();

			//set the sizing
			self.setSize();

			//initalize the window resizing
			self.resize();

			//store the arrows for later use
			self.$arrows = self.$nav.children('.content-nav');

			//create the indicators
			self.createIndicators();

			//hide all the slides if the user is using 'fade' mode
			if(self.options.animation === 'fade') {
				//self.$slides.not(':first').css('display', 'none');
				self.$slides.slice(1).css('display', 'none');
			}
			
			//set and bind the 'click' event to the prev/next arrows
			self.$arrows.on('click', function() {
				var $this = $(this),
					 dir  = $this.data('dir');

				//clear out the timer, then call it again starting the timer at 1ms
				clearTimeout(self.timer);
				self.linearRun(dir,1);
			});

			//run the inital loop
			if(self.autoRefresh && !self.options.initialPaused) { 
				self.linearRun('next');
			}

			//Check if the touchSwipe.min.js plugin is available, and if so, then we can set the 
			//swipe events for left and right
			if(typeof $.fn.swipe !== 'undefined') {
				self.$elem.swipe({
					swipeLeft: function(event, direction, distance, duration, fingerCount) {		
						clearTimeout(self.timer);
						self.linearRun('next',1);
					},
					swipeRight: function(event, direction, distance, duration, fingerCount) {
						clearTimeout(self.timer);
						self.linearRun('prev',1);
					}
				});
			}
		},

		/*
			Main function to run with linear navigation and autotimer 
				- Has a timer that will call this function again if timer is set to true
		*/
		linearRun: function(dir, length) {
			var self = this;

			self.timer = setTimeout(function() {
				//check if the user is ready to click, to prevent rapid clicking
				if(self.clickReady) {
					$.publish('content-slider/animation-start');
					self.setCurrent(dir);
					(self.options.animation === 'slide') ? self.slideAnimate() : self.fadeAnimate();
				}

				if(self.autoRefresh) {
					self.linearRun('next');
				}

			}, length || self.options.autoTimer );
		},

		/*
			Set the main subscriptions for the animations
				- animation-done - fires when the animation is finished or when that event is triggered
				- animation-start - fires when the animation is started or when the event is triggered
		*/
		subscriptions: function() {
			var self = this;

			$.subscribe('content-slider/animation-done', function()  {
				self.clickReady = true;
				//set the current indicator
				self.$indicators.eq(self.current).addClass('active');
			});

			$.subscribe('content-slider/animation-start', function()  {
				self.clickReady = false;
				//remove the current indicator with class of active
				$('.content-slider-indicators > div.indicator.active').removeClass('active');
			});
		},

		/*
			Create the wrapper for the slider
				- Creates the wrapper around the sections so we can hide the position to relative
		*/
		createWrapper: function() {
			var self = this;
			//wrap the passed in element with the slider wrapper
			self.$elem.wrapAll('<div class="content-slider-wrapper"></div>');
			//store reference to the wrapper
			self.$sliderWrapper = $('div.content-slider-wrapper');
		},

		/*
			Create Slider Navigation
				- Creates the slider navigation and appends it to the sliders wrapper
		*/
		createNav: function() {
			var self = this,
				 navHTML = '<div class="content-slider-nav">\
									<div class="content-nav content-prev-arrow" data-dir="prev"></div>\
									<div class="content-nav content-next-arrow" data-dir="next"></div>\
								</div>';

			//append the slider's navigation to the wrapper, so outside of slider 
			self.$sliderWrapper.append(navHTML);

			//store the navigation for later use
			self.$nav = $('.content-slider-nav');
		},

		/*
			Create the indicators for the slides
				- Creates the indicators based on the number of slides available
		*/
		createIndicators: function() {
			var self = this,
				idwrap = '<div class="content-slider-indicators">';

			//loop through the necessary amounts of indicators to match the total amounts of slides
			for(var i = 0; i < self.$slides.length; i++) {
				idwrap += '<div class="indicator"></div>';
			}

			//close the string
			idwrap += '</div>';

			//append to the slide wrapper
			self.$sliderWrapper.append(idwrap);

			//store reference to the indicators
			self.$indicators = $('.content-slider-indicators > div.indicator');

			//set the first one to active
			self.$indicators.first().addClass('active');

			//bind the click event on the indicators, so when the user clicks on one
			//they can go to any slide they want
			self.$indicators.each(function() {
				var $this = $(this);
				$this.on('click', function() {
					var index = $(this).index();
					self.slideTo(index);
				});
			});

		},

		/*
			Sets the size for the slider ul, and the slides within it
				- UL size is calculated by (100% * number of slides)
						i.e: 5 slides means parent total size is 500%
				- Li size is calculated by (100 / number of slides) 
						i.e: 5 slides means each one is 20% of parent
		*/
		setSize: function() {
			var self = this;

			//store the slides dom elements
			self.$slidesUL = self.$elem.children('ul');
			self.$slides = self.$slidesUL.children('li');

			//store the number of slides
			self.length  = self.$slides.length;

			//set the parent's width
			self.$slides.parent('ul').css('width', (self.length*100)+'%');

			//set the slides width
			self.$slides.css('width', (100/this.length)+'%');

			//get the width to move items by
			//self.width = parseInt(self.$slides.css('width'));
			self.width = parseInt(self.$slides.outerWidth());
		},

		/*
			Transition to animate the slides
				- Move the slides according the width margin-left or right of the slides
		*/
		slideAnimate: function(coords) {
			var self = this;
			
			//check if the page is RTL (if HTML element has class of  ".rtl")
			if(!attributes.isRTL) {
				self.$slidesUL.animate({
					'margin-left' : coords || -(self.current * self.width) 
				}, self.options.speed, self.options.easing, function() {
					$.publish('content-slider/animation-done');
				});
			} else {
				self.$slidesUL.animate({
					'margin-right' : coords || -(self.current * self.width)
				}, self.options.speed, self.options.easing, function() {
					$.publish('content-slider/animation-done');
				});
			}
		},

		/*
			Transition the animation of the slides when the fade mode is set
				- We fade out the current visible slide, and then fade in the one we passed in
				- Takes in slideNum (for slideTo()), and uses that to calculate which slide to fade in
					• If linear, then we fade in the slide corresponding to self.current or we fade in the one we passed in
		*/
		fadeAnimate: function(slideNum) {
			var self   	  = this,
				 curslide  = self.$slides.filter(':visible').index(),
				 nextslide = (typeof slideNum !== 'undefined') ? slideNum : self.current;

			self.$slides.eq(curslide).fadeOut(self.options.speed, self.options.easing, function() {
				//fade in the next slide
				self.$slides.eq(nextslide).fadeIn(self.options.speed, self.options.easing, function() {
					$.publish('content-slider/animation-done');
				});
			});
		},

		/*
			Set the current position
				- We set the current position, and increments, the self.current attirbute to be used 
				  in calculations on how to and where to animate the slides.
		*/
		setCurrent: function(direction) {
			var self = this,
				 pos = self.current;

			//we add to 1 to the current position if we're going next
			//otherwise, we subtract 1 if we're going to the previous
			//NOTE:( ~~ converts truthy value to interger [1=true, 0=false] )
			pos += ( ~~(direction === 'next') || -1);

			//set the current, if the position is greater than the last one,
			//then we go back to the first slide, otherwise, go to the slide
			self.current = (pos < 0) ? self.length - 1 : pos % self.length;

			return pos;
		},

		/*
			Recalculate the widths when everything resizes
				- Recalculate the sizing
				- If it is a sliding animation mode, then...
					• Set the current back to zero
					• Animate the slides back to the first slide
		*/
		resize: function() {
			var self = this;

			$(window).resize(function() {
				self.setSize();
				
				if(self.options.animation === 'slide') {
					$.publish('content-slider/animation-start');
					self.current = 0;
					self.slideAnimate('0px');
				}

			});
		},


		/*
			Recalculate the widths, if something new is added
				- The user can call this function directly from the plugin
					• i.e: $('.slider').contentsldier('refresh');
		*/
		refresh: function() {
			var self = this;
			self.setSize();
		},


		/*
			Slide directly to a certain slide
				- Slider will not move if user is already on the same slide or if the clickReady is not set to true yet
					• Do this to prevent rapid clicking of slides, that could affect positioning, etc...
				- Zero-based (0 is first slide)
		*/
		slideTo: function(slideNum) {
			var self 	 = this,
				slideNum  = Math.abs(slideNum), 
				dir 	  	 = (slideNum > self.current) ? 'next' : 'prev',
				sameSlide = (self.current === slideNum) ? true : false,
				coords 	 = -(slideNum * self.width)+'px';

			//if already on the same slide
			if(!sameSlide && self.clickReady === true) {

				//clear the timer first if autotimer is on
				if(self.autoRefresh) { clearTimeout(self.timer); }

				$.publish('content-slider/animation-start');
				(self.options.animation === 'slide') ? self.slideAnimate(coords) : self.fadeAnimate(slideNum);
				self.current = slideNum;

				//restart the timer if auto timer is on
				if(self.autoRefresh) { self.linearRun('next'); }
			}
		},

		/*
			Pause or play the slider
				- This function should pause or play the slider 
				- Works only if the slider has the autoTimer on
		*/
		pause: function(bool) {
			var self = this;

			if(self.autoRefresh) {
				if(bool) {
					clearTimeout(self.timer);
				} else if (!bool) {
					self.linearRun('next');
				}
			}

		}


	} //end "methods object"

	/*
		Plugin declaration
	*/
	$.fn.contentslider = function(options) {

		/*
			Check if the options passed in is a function call or rather to initalize the plugin
				- Error will be thrown if there is no such method
				- Init is called if there is an object passed (user defined options, or if empty)
		*/
		if(methods[options]) {
			//call the plugin method
			return methods[options].apply(methods, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof options === 'object' || !options) {
			//default 'init'
			return this.each(function() {
				methods.init(options, this);
			});
		} 
		else {
			$.error('Method "' + options + '" does not exist in jQuery.contentslider');
		}

		//keep if statement inside to keep chainability
		// return this.each(function() {
		// 	attributes.slider = Object.create(methods); 		
		// 	attributes.slider.init(options, this);	
		// });
	}

	/*
		Plugin default options
	*/
	$.fn.contentslider.defaultsOptions = {
		speed: 400, 
		easing: 'swing',
		animation: 'slide',
		autoTimer: 0,
		initialPaused: false
	};

})(jQuery, window, document); 