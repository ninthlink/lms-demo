/*=========================================================================================
Author: Tou Lee
Created: 10/11/13
Last Updated: 12/6/13 - 10:27am
Version: 1.0.12

Changelog v1.0
  - Updated location fixed position, dynamics. 
  - Updated the changes to the fixed "navigation" and active states
      • Switched to use .toggleClass()
  - moveIndicators(): if-statement, if equal to or less than bottom bound
      • bottom: bottomBound - (d - (w + s)) --> bottomBound

Changelog v1.0.1
  - Updated moveIndicatior(): added tiernary operator to check for how to set bounds if 
    on a touch device or not.

Changelog v1.0.2
  - Added (Chrome) as a check for when to disable the "rtl" foundation stylesheet

Changelog v1.0.3
  - Added new function setLinksSinglePage():
      • For helping moving when the user is on a single page of content 
        (link switching, and highlighting.)
  - Added new if-statement for checking inside the 'goto-assessment' subscription, for 
    if the singlePageNav option is true, and if so, then manually call .trigger() on the 
    '.next-arrow's "click" event. 
      • For some reason, this helps resolve not having to second click it to trigger the 
        assessment coming down.
  - goToByScroll():
      • Added new variables:
        - $html > cache $('html') for use
        - sliderActive > if the horizontal slider is havtive, by checking the html element
          for the class of 'horslider'
        - singlePage > checks the number of elements with '.slide' class, to determine if 
          there is just a single page
      • Added call to setLinksSinglePage(), if there is a single slide
      • Added new condition for if-statement for first statement for when switching between
        slides. 

Changelog v1.0.4
  - goToByScroll():
      • Changed the test for single slide to see if there is a class on html element of
        'single-page-nav' rather than checking the number of slides.

Changelog v1.0.5 
  - moveIndicators():
      • Commeneted out bottomBound terianry operator switch for iPhone iOS7, and just set it to 50px

Changelog v1.0.6
  - handleAJAX():
      • Added if-statement to check if urlLang is available, and if not, then we can just 
        skip the ajax request all together.
  - Added new spinner JS call to use JS to generate spinner instead of animated GIF, which
    freezes during AJAX request.
  - goToByScroll():
      • Added speed argument/parameters

Changelog v1.0.7
  - Added new checkIECompView():
      • Checks if the user is using IE7, or any version of the "Compatability View" in 
        later versions of Internet Explorer
  - Added a call to checkIECompView(), that will fadeIn the element IE alert.

Changelog v1.0.8 
  - Amended check for setting assessment quiz button. 
      • If-condition of urlLang == 2 is too limiting.
      • Changed "urlLang == 2" ==> urlLang >= 2

Changelog v1.0.9
  - Added $.subscription('slider/animation-done') to trigger the moveIndicator's location
    when the sliding animation is finished

Changelog v1.0.10
  - Merged and added all the event bindings for $(window)'s call to moveIndicator();

Changelog v1.0.11
  - hideLoader():
      • Added new if-statements, and animate functions to fade in and then scroll up the 
        body of the content slowly toe the top
  - Added new isMobile check for as a global variable inside the siaf

Changelog v1.0.12
  - Plugin setup inside sublime.ready() block, 
      • added check for sublime.player property so that navigation does not halt/stop 
        when the user clicks next because sublime.player function is not defined

==========================================================================================*/

(function() {
  /* ----------------------------------------------------------------
    Reusuable cached variables
  ---------------------------------------------------------------- */
  var $html = $('html');
  var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

  /* ----------------------------------------------------------------
    Check for IE Compatible View
  ---------------------------------------------------------------- */
  if (checkIECompView()) { $('.ie-alert').fadeIn(); } 

  /* ----------------------------------------------------------------
    AJAX Spinner --> Doesn't freeze on AJAX request
  ---------------------------------------------------------------- */
    var opts = {
      lines: 13, // The number of lines to draw
      length: 0, // The length of each line
      width: 10, // The line thickness
      radius: 35, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#FFF', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };

    var target = document.getElementById('loader-spinner');
    var spinner = new Spinner(opts).spin(target);

  /* ----------------------------------------------------------------
    RTL: Right-to-Left language switch 
      - Inject the RTL stylesheet after the original foundation so 
        it overrides those styles, BUT not the .rtl class found inside
        "qualcomm-template.css"
      - Then disable the original "foundation.min.css" file so there
        are not overlapping style conflicts
      - Activate the RTL version afterwards, rather than injecting it
        which can cause CSS override issues in IE.
      - Firefox/Opera do not act upon "disabled" if it is enabled right
        away, but they do act upon manual triggering of the attribute. 
        So we have to detect if it's Firefox or Opera, and manually 
        trigger the disabled state for the RTL stylesheet
  ---------------------------------------------------------------- */
  if(navigator.userAgent.match(/(Firefox)|(Opera)|(Safari)|(Chrome)/i)) {
    var $rtl  = $('link[href="stylesheets/foundation.min-rtl.css"]');
    $rtl[0].disabled = true;
  }
  
  if( (urlLang == 'ar' || urlLang == 'he') ) {
  	$html.addClass('rtl');
    var $link = $('link[href="stylesheets/foundation.min.css"]');
    var $rtl  = $('link[href="stylesheets/foundation.min-rtl.css"]');
    $link[0].disabled = true;	//disable the original
    $rtl[0].disabled = false; //enable the rtl version
  }

  /* ----------------------------------------------------------------
    Set up the Horizontal Slider 
      - Set ths slider up before ANY $.subscribe calls because 
        the subscription API isn't set yet until the creation and
        inclusion of this plugin. 
      - If there are NO videos in the course then...
          • Simply initalize the plugin by calling initPlugin();
      - If there are videos in the course then...
          • Wait until the sublime API is ready then prepare the videos 
            before activating the plugin his ensures that all videos 
            are resized according to the screen
  ---------------------------------------------------------------- */
  var vl = $('video.sublime').length;

  if(vl === 0) {
    //console.log('sublime ::> there NO videos');
    if(urlLang) { translateImageVideo(); }
    initPlugin(); //initalize the plugin
    handleAJAX();
  } 
  else if(vl > 0) {
    //update the video and images to change the path to appropriate language
    if(urlLang) { translateImageVideo(); }
    //console.log('sublime ::> there ARE videos');
    if(typeof sublime != 'undefined') {
      sublime.ready(function() {
        initPlugin(); //initalize the plugin
        handleAJAX();

        if(sublime.hasOwnProperty('player') === true) {
          sublimeResize();  //activate the subscriptions
        }

      });
    } else {
      initPlugin(); //initalize the plugin
      handleAJAX();
    }
  }

  /* ----------------------------------------------------------------
  Sets the location of the "indicators"
    - Sets the location of the indicators bar
    - Desktop: it is sticky when in the desktop view.
    - Mobile: it is fixed just above the navigation
  ---------------------------------------------------------------- */
  moveIndicators(); //call it once to initially set the position

  // $(window).on('touchmove',moveIndicators);
  // $(window).scroll(moveIndicators);
  $(window).on('touchmove scroll resize', moveIndicators);

  //subscribe to changes, so the position is updated as well on animation-done (sliding)
  $.subscribe('slider/animation-done', function() { moveIndicators(); });

  /* --| Function to move the location of the fixed indicators */
  function moveIndicators() {
    var d = $(document).height(),                   // height of the document (total height)
        w = $(window).height(),                     // height of the window (visible page)
        s = $(this).scrollTop(),                    // scroll level
        bottomBound = 50,
        //bottomBound = (navigator.userAgent.match(/(iPhone);.*CPU.*OS 7_\d/i)) ? 119 : 50, // bottom bound - or the width of your 'big footer'
        $location = $('.location-nav');             // the fixed element

      //--| are we beneath the bottom bound?
      if(d - (w + s) <= bottomBound) {
          // if yes, start scrolling our own way, which is the
          // bottom bound minus where we are in the page
          ($html.hasClass('touch')) ?  
            $location.css({ bottom: bottomBound, 'margin-bottom': '0px' }) :
            $location.css({ bottom: bottomBound - (d - (w + s)), 'margin-bottom': '0px' });
      } else {
          // if we're beneath the bottom bound, then anchor ourselves
          // to the bottom of the page in traditional footer style
          $location.css({ bottom: 0, 'margin-bottom': '0px' });
      }
  }

  /* ----------------------------------------------------------------
    Add data-lang="top" attribute for return to top  link
      - Set this so the translated text can override the default 
  ---------------------------------------------------------------- */
  $('.return-top-link').attr('data-lang','top');

  /* ----------------------------------------------------------------
    Set up assessment button's href link
      - Concat on the 'urlLang' so that the assessment page can read 
        it correctly and retrieve the correct assessment.xml
      - If the urlLang length is larger than 2, then it's obviously 
        not a language abbreviation 
  ---------------------------------------------------------------- */
  if(urlLang && urlLang.length >= 2) {
    $('a.quiz').attr('href', 'assessment.html?lang='+urlLang);
  } else {
    $('a.quiz').attr('href', 'assessment.html?lang=en');
  }

  /* --------------------------------------------------------------
  Enable the links as the user gets to that slide
    - Each link starts with the ".disable" class to show that it
      is not clickable until the user goes there on the slide.
    - When the user is on a current slide the navigation will
      indicate that as well by adding the class of ".active"
  --------------------------------------------------------------- */
  /* --- USE THIS IF LINEAR PROGRESSION IS: ON */
  // $.subscribe('slider/animation-done', function() {
  //   var index = $('.slide').filter(':visible').index();
  //   var $link = $('.top-bar ul.dropdown li a').eq(index+1);

  //   //enable the link once the user goes to that slide
  //   if($link.hasClass('disable')) { $link.removeClass('disable'); }
  //   //add the active class to the current slide that is showing
  //   $link.addClass('active');
  // });

  // $.subscribe('slider/animation-start', function() {
  //   $('.top-bar ul.dropdown li a.active').removeClass('active');
  // });
  
  /* --- USE THIS IF LINEAR PROGRESSION IS: OFF */
  $.subscribe('slider/animation-done', function() {
    var index = $('.slide').filter(':visible').index();
    var $link = $('.top-bar ul.dropdown li a').eq(index+1);
    $link.toggleClass('active'); 
  });

  $.subscribe('slider/animation-start', function() {
    $('.top-bar ul.dropdown li a').removeClass('active');
  });

  /* ----------------------------------------------------------------
    Show Quiz when have the slider active
      - When the user has visited all the slide then show the 
        quiz button. 
      - Only when the slider mode is active

    Update:
      - When the user gets to the last slide, and clicks on the
        next arrow, we show modal asking if they are ready to go 
        to the quiz, and if yes, then they can click button to
        go to the quiz, if not then we close. 
      - They can always hit hit the next arrow again to down down
        the modal to proceed to the quiz.

    * Requirements:
      - The slider plugin options should be set like this: 
          • linearNav: true,
            linearLoop: false,
            assessment: true
  ---------------------------------------------------------------- */
  $.subscribe('slider/goto-assessment', function(e, singlePageNav) {
    $('.next-arrow').removeClass('disable').off('click').on('click', function() {
      $("#quizModal").reveal();
    });

    if(singlePageNav) { 
      $('.next-arrow').trigger('click');
    }
  });

  /* ----------------------------------------------------------------
    Sublime Video Fix with Horizontal Slider
      - Remove all classes of ".sublime" on the videos by using 
        sublime.unprepare()
      - Prepare them when the user gets to that slide so they 
        autoresize to their parent's container
  ---------------------------------------------------------------- */
  function sublimeResize() {
    sublime.ready(function() {
      //Resize the videos if they haven't been resized
      $.subscribe('slider/animation-done', function() {
        var $visibleslide = $('.slide').filter(':visible');    
        var videos = $visibleslide.find('video.sublime');
        if(videos.length != 0) {
          for(var i = 0; i < videos.length; i++) { 
            sublime.unprepare(videos[i])  //unparepare the videos
            sublime.prepare(videos[i]);   //prepare them again so they can resize
          }
        }
      });

      //Stop the videos that are playing when the user moves to another slide
      $.subscribe('slider/animation-start', function() {
        var $visibleslide = $('.slide').filter(':visible');    
        var videos = $visibleslide.find('video.sublime');
        if(videos.length != 0) {
          for(var i = 0; i < videos.length; i++) { 
            sublime.player(videos[i]).stop();
          }
        }
      });
    }); //end sublime.ready()
  }

  /* --------------------------------------------------------------------
    Makes an AJAX request to get the correct XML
      - Returns the object to be used by the promise
  ---------------------------------------------------------------------*/
  function getXML() {
    return $.ajax({
              type: 'GET', 
              dataType: 'xml',
              url: 'lang/'+urlLang+'/'+urlLang+'.xml'
           });
  }

  /* --------------------------------------------------------------------
    Handles the returned AJAX Request with promise/deferred
      - If fail: then reverts back to english hard-coded
      - If success: then it will call the parseXML to populate new text
  ---------------------------------------------------------------------*/
  function handleAJAX() {
    if(urlLang) {
      getXML().fail(function(){
        console.log('ERROR LOADING XML: Falling back to English');
        hideLoader();
        $(document).foundationTooltips(); //initalize tooltips plugin

        $.publish('ajax/parse-xml-done');
      }).done(function(data){
        console.log('XML LOADED: Success');
        parseXML(data); //call to parse the xml
        hideLoader();

        $.publish('ajax/parse-xml-done');
      });
    } 
    else {
      console.log('NO TRANSLATION: Skipped AJAX Request');
      hideLoader();
      $(document).foundationTooltips(); //initalize tooltips plugin
      $.publish('ajax/parse-xml-done');
    }

  }

  /* ----------------------------------------------------------------
  Build Slides 
    - Calls the horizontal slider plugin to build out the plug-in
  ---------------------------------------------------------------- */
  function initPlugin() {
    $('.content-container').horslidernav({
      speed: 400,
      easing: 'swing', //easeInOutQuart
      mobile: true,
      tablet: true,
      desktop: true,
      fade: false,
      fullHeight: true,
      linearNav: true,
      linearProg: false,
      linearLoop: false,
      locIndicator: true,
      assessment: true,
      singlePageNav: false
    }); 
  }

  /* ----------------------------------------------------------------
  Hides the loader
    - Fades out the div.loader and it's contents to display: none
  ---------------------------------------------------------------- */
  function hideLoader() {
    $('div.loader').fadeOut(1000);
  }

  /* ----------------------------------------------------------------
  Fixes the Course Title
    - Removes any <br> tags
  ---------------------------------------------------------------- */
  function fixCourseTitle() {
    var $title = $('.course-name a'),
        str = $title.html().replace(/<br>/g, ' ');
    $title.html(str);
  }

  /* ---------------------------------------------------------------
  Update links and references to the language specific media (images
  and videos) by updating any paths that point to them.
    - Concatinating language prefix to video file so that it 
      references the appropriate language files
  ---------------------------------------------------------------- */
  function translateImageVideo() {
    //--| Update the files src path for any subtitles and such
    $('video').each(function() {
      var $this = $(this),
          $video = $this.children('source'),
          $track = $this.children('track'),
          vcurrentSrc = $video.attr('src');

      //replace the /en/ with the new language abbreviation
      vcurrentSrc = vcurrentSrc.replace('/en/', '/'+urlLang+'/');
      
      //set the video source path
      $video.attr('src', vcurrentSrc);
      $this[0].src = vcurrentSrc;
      //$(this)[0].load();

      //replace the track feature
      if($track.length > 0) {
        var tracksrc = $track.attr('src');
        tracksrc = tracksrc.replace('/en/', '/'+urlLang+'/');
        
        $track.attr({
          'src': tracksrc,
          'srclang': urlLang 
        });
      }
    });

    //--| Change the images & poster images with class of ".img-change" to the correct language version 
    $('.img-change').each(function() {
      var $this = $(this);
      //--| Change IMAGES
      var img_src = $this.attr('src');
      if(img_src != undefined) {
        img_src = img_src.replace('/en/', '/'+urlLang+'/');
        $this.attr('src', img_src);
      }
      
      //--| Update VIDEO POSTERS
      //change the posters if the element that has .img-change class is of <video>
      //if it is then go and do that function of switching the video
      //Have to wait until the window.load event fires because for some reason the 
      //the sublimevideo code is hot added till then.
      if($this[0].nodeName.toLowerCase() == 'video') {
        //$(window).load(function() {
          img_src = $this.attr('poster');
          if(img_src != undefined) {
            img_src = img_src.replace('/en/', '/'+urlLang+'/');
            $this.attr('poster', img_src);
          }
        
          var $img_tag = $this.siblings('img');
          var subimg_src = $img_tag.attr('src');

          if(subimg_src != undefined) {
            subimg_src = subimg_src.replace('/en/', '/'+urlLang+'/');
            $img_tag.attr('src', subimg_src);
          }
        //});
      }
    });
  } //end translateImageVideo()

})(); //End self-invoking function

/* ----------------------------------------------------------------
Scroll Function for Nav
  - Scroll function for the navigation, when they click on a link 
    it scrolls to the defined id
  - If the horizontal slider plugin is active, then it will use the
    $.horslide() function from the plugin, othewise, it will just 
    slide down the page to that particular section.
  - If the user enters "top" then go to the top of the page.
  - If the user enters "bottom" then go to the bottom of the page 
  
@params: 
  id ----------- this is the id in which to go towards 
  horslidepos -- the slide to slide to when horizontal slider is
                 active on the course
  offset ------- insert and offset 
  speed -------- the speed that we want to slide

@notes:
  - IMPORTANT -- to use the name of the specific slide
---------------------------------------------------------------- */
function goToByScroll(id, horslidepos, offset, speed) {
  var $htmlbody = $('html,body');
  var $html = $('html');
  var sliderActive = $html.hasClass('horslider');
  var singlePage = $html.hasClass('single-page-nav');
  var speed = (speed != undefined) ? speed : 600;

  if(offset == undefined) { offset = 0; }
  
  if(sliderActive && horslidepos && !singlePage) { 
      $.horslideTo(horslidepos);
  } 
  else if(id === 'top') {
    $htmlbody.animate({scrollTop: $htmlbody.offset().top-offset}, speed);
  } 
  else if (id === 'bottom') {
    $htmlbody.animate({scrollTop: $(document).height()-$(window).height()}, speed);
  }
  else {
    $htmlbody.animate({scrollTop: $(id).offset().top-offset}, speed);
  }

  //set the links for the page if there is only one slide
  if(sliderActive && singlePage) {
    setLinksSinglePage(id, horslidepos);
  }
}

/* ----------------------------------------------------------------
Scroll Link Setting (Single Page) 
  - Sets the positioning, and highlighting of the menu items when 
    there is only a single page of content. 
  
@params: 
  id --- this is the id in which to go towards 
  pos -- this is the "horslidepos" number that is passed when the
         the user sent something in. 

@notes:
  - IMPORTANT -- to use the name of the specific slide
---------------------------------------------------------------- */
function setLinksSinglePage(id, pos) {
  var $link = $('.top-bar ul.dropdown > li').eq(0).nextUntil('li.divider').find('a'),
      $linkActive = $('.top-bar ul.dropdown li a.active'),
      temp = $link.get(pos-1);

  $linkActive.removeClass('active');

  if(id === 'top') {
    temp = $link.get(0);
  } else if(id === 'bottom') {
    temp = $link[$link.length-1];
  }

  //add the .active class to the item clicked on
  $(temp).addClass('active');
}

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
