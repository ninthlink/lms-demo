/*=========================================================================================
Author: Tou Lee
Created: 1/16/14
Last Updated: 1/16/14 - 12:03pm
Version: 1.0.0

** This is the file for any javascript animations for the course **

Changelog v1.0.0
  - Created

==========================================================================================*/
(function() {
  /* ----------------------------------------------------------------
    Reusuable cached variables
  ---------------------------------------------------------------- */
  var $html = $('html');
  var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);


  /* ----------------------------------------------------------------
    Section 2: Customer Chat Bubbles
  ---------------------------------------------------------------- */
  $('.s2p1 h1.light').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      if(visiblePartY == 'both') {

        //unbind the event
        $(this).off('inview');

        console.log('SECTION 2: inview fired');

        //var tl = new TimelineMax({onComplete: removeInView, onCompleteParams: [this]});
        var tl = new TimelineMax();
        tl.from('.speech-bubbles.cust1', 0.65, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '50%'},  ease: 'Back.easeOut'})
          .from('.speech-bubbles.cust2', 0.65, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '50%'},  ease: 'Back.easeOut'})
          .from('.speech-bubbles.rsa',   0.65, { css:{ force3D: true, autoAlpha: 0, top: '50px', left: '-50%'}, ease: 'Back.easeOut'});
      }
    }
  });


  /* ----------------------------------------------------------------
    Section 4: Customer Chat Bubbles
  ---------------------------------------------------------------- */
  $('.s4p1 .icons.pov').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      if(visiblePartY == 'both') {

        //unbind the event
        $(this).off('inview');

        console.log('SECTION 4: inview fired');

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

          TweenMax.to($this, 0.75, { css:{ left: relativeX, top: relativeY, autoAlpha: 0 }, delay: 0.2});
          //TweenMax.to($this, (i*0.15), { css:{ left: relativeX, top: relativeY, autoAlpha: 0 }, delay: 0.2});
        });

        //Hide the container-icon
        var tl = new TimelineMax();
        tl.to($('.icons-container'), 1, { css:{ height: 0, autoAlpha: 0, force3D: true }, delay: 0.5 })
          .from($('.tech-phone'), 1, { css:{ autoAlpha: 0, top: '250px', force3D: true }, ease: 'Power4.easeInOut' })
          .staggerFrom($('.tech'), 1, { css:{ autoAlpha: 0, display: 'block', rotationX: 90, force3D: true }, ease: 'Back.easeOut' }, 0.2)
          .staggerFrom($('.tech > p'), 0.4, { css:{ autoAlpha: 0, top: '-30px', force3D: true }}, 0.2);
      }
    }
  });


  /* ----------------------------------------------------------------
    Section 6: Leadership Circles and #1
  ---------------------------------------------------------------- */
  $('.s6p1 .square-box').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      if(visiblePartY == 'both') {

        //unbind the event
        $(this).off('inview');

        console.log('SECTION 6: inview fired');

        var tl = new TimelineMax();
        tl.from($(this).children('h1'), 1, { css:{ autoAlpha: 0, force3D: true }, ease: 'Power4.easeInOut' })
          .staggerFrom($('.circles'), 1.25, { css:{ autoAlpha: 0, rotationY: 180, force3D: true, y: '80px' }, ease: 'Back.easeInOut' }, 0.2);
      }
    }
  });


  /* ----------------------------------------------------------------
    Section 7: Snapdragon Family Chips
  ---------------------------------------------------------------- */
  $('.s7p1 h1.subheader').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      if(visiblePartY == 'both') {

        //unbind the event
        $(this).off('inview');

        console.log('SECTION 7: inview fired');

        var tl = new TimelineMax();
        tl.staggerFrom($('.chips'), 1.2, { css:{ autoAlpha: 0, right: '-100%', force3D: true }, ease: 'Back.easeOut' }, 0.25)
      }
    }
  });


  /* ----------------------------------------------------------------
    removeInView
      - Removes the 'inview' event from the object
    @params elem -- the elment have 'inview' event unbound
  ---------------------------------------------------------------- */
  function removeInView(elem) {
    $(elem).off('inview');
    console.log(elem + ' has "inview" event removed');
  }

})(); //end self-invoking anonymous function


/* ----------------------------------------------------------------
Checks if IE is in Compatibility Mode
  - Returns a boolean if the user is in Compatibility Mode
  
@params: 

@return:
  - isCompView -- Boolean if the user if or isn't in comp view
---------------------------------------------------------------- */
function checkIECompView() {
  var agentStr = navigator.userAgent;
  var mode;
  var isCompView = false; 

  //check for IE10 Comp view
  if(agentStr.indexOf('Trident/6.0') > -1 ) {
    if(agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE10 Compatibility View"; 
      isCompView = true;
    }
    else { 
      mode = "IE10";
    }
  } 
  //check for IE9 Comp view
  else if (agentStr.indexOf("Trident/5.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE9 Compatibility View";
      isCompView = true;
    }
    else {
      mode = "IE9";
    }
  }
  //check for IE8 Comp view
  else if (agentStr.indexOf("Trident/4.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE8 Compatibility View";
      isCompView = true;
    }
    else {
      mode = "IE8";
    }
  }
  else if (agentStr.indexOf("MSIE 7.0") > -1) {
    mode = "IE7";
    isCompView = true;
  }
  else {
    isCompView = false;
  }

  return isCompView; //return boolean if comp view is true
}