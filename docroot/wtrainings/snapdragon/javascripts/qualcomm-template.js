(function() {
  /* ----------------------------------------------------------------
    Reusuable cached variables
  ---------------------------------------------------------------- */
  var $html = $('html');

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
  if(navigator.userAgent.match(/(Firefox)|(Opera)|(Safari)/i)) {
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
    initPlugin(); //initalize the plugin
    handleAJAX();
  } 
  else if(vl > 0) {
    //console.log('sublime ::> there ARE videos');
    if(typeof sublime != 'undefined') {
      sublime.ready(function() {
        initPlugin(); //initalize the plugin
        handleAJAX();
        sublimeResize();  //activate the subscriptions
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
  $(window).scroll(function(event) {
    var d = $(document).height();                   // height of the document (total height)
        w = $(window).height(),                     // height of the window (visible page)
        s = $(this).scrollTop(),                    // scroll level
        bottomBound = 50,                           // bottom bound - or the width of your 'big footer'
        $fdisplay = $('.footer').css('display'),    // the display property of the footer used as hook
        $location = $('.location-nav');             // the fixed element

    if($fdisplay == 'table') {
      // are we beneath the bottom bound?
      if(d - (w + s) < bottomBound) {
          // if yes, start scrolling our own way, which is the
          // bottom bound minus where we are in the page
          $location.css({ bottom: bottomBound - (d - (w + s)), 'margin-bottom': '0px' });
      } else {
          // if we're beneath the bottom bound, then anchor ourselves
          // to the bottom of the page in traditional footer style
          $location.css({ bottom: 0, 'margin-bottom': '0px' });            
      }
    } else if($fdisplay == 'none') {
        $location.css({ bottom: 0, 'margin-bottom': bottomBound+'px' })
    }

  });

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
  if(urlLang && urlLang.length == 2) {
    $('a.quiz').attr('href', 'assessment.html?lang='+urlLang);
  } else {
    $('a.quiz').attr('href', 'assessment.html?lang=en');
  }

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
  $.subscribe('slider/goto-assessment', function() {
    $('.next-arrow').removeClass('disable').click(function() {
      $("#quizModal").reveal();
    });
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
              url: 'lang/'+urlLang+'/'+urlLang+'.xml',
           });
  }

  /* --------------------------------------------------------------------
    Handles the returned AJAX Request with promise/deferred
      - If fail: then reverts back to english hard-coded
      - If success: then it will call the parseXML to populate new text
  ---------------------------------------------------------------------*/
  function handleAJAX() {
    getXML().fail(function(){
      console.log('ERROR LOADING XML: Falling back to English');
      hideLoader();
      $(document).foundationTooltips(); //initalize tooltips plugin
    }).done(function(data){
      console.log('XML LOADED: Success');
      parseXML(data); //call to parse the xml
      hideLoader();
    });

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
      linearLoop: false,
      locIndicator: true,
      assessment: true
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

@notes:
  - IMPORTANT -- to use the name of the specific slide
---------------------------------------------------------------- */
function goToByScroll(id, horslidepos, offset) {
  var $htmlbody = $('html,body');

  if(offset == undefined) { offset = 0; }
    if( $('html').hasClass('horslider') && horslidepos ) { 
        $.horslideTo(horslidepos);
    } 
    else if(id === 'top') {
      $htmlbody.animate({scrollTop: $htmlbody.offset().top-offset}, 500);
    } 
    else if (id === 'bottom') {
      $htmlbody.animate({scrollTop: $(document).height()-$(window).height()}, 500);
    }
    else {
      $htmlbody.animate({scrollTop: $(id).offset().top-offset}, 500);
    }
}