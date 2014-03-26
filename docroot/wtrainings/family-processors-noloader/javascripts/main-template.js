/*=========================================================================================
Author: Tou Lee
Created: 1/27/14
Last Updated: 2/12/14 - 11:06am
Version: 1.0.1

** QUALCOMM :: Simplified, non-slider version **

Changelog v1.0.0
  - Updated RTL stylesheet insert. Rather than just having it be disabled, and enabled
      • We are going to just insert it right after the foundtion.css file
  - Removed anything related to the horslider plugin, including all calls to any
      • $.publish events for 'slider'
      • initPlugin() --> and removed any calls to it
      • movedIncidators() --> and calls to it
      • Removed main-navigation stuff
  - sublimeResize() 
      • Removed entirely
  - hideLoader()
      • Reverted to the old version, that just starts at the top
      • Deleted all other functions
  - Removed ".return-top-link" settting
  - Removed assessment.html URLlang appending
  - handleAJAX()
      •  Removed calls to $(document).foundationTooltips(), and $.publish()
  - fixCourseTitle() -->  removed
  - setLinksSinglePage() --> removed

Changelog v1.0.1
  - checkIECompView()
      • Updated to return object with mode (string), and isCompView (boolean)
  - Updated minor variable declarations to make them into one var x, y, z
  - Call "spinner.stop()" as callback after the div.loader has been faded out

==========================================================================================*/

(function() {
  /* ----------------------------------------------------------------
    Reusuable cached variables
  ---------------------------------------------------------------- */
  var $html = $('html'),
      isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

  /* ----------------------------------------------------------------s
    Check for IE Compatible View
  ---------------------------------------------------------------- */
  if(checkIECompView().isCompView) { $('.ie-alert').fadeIn(); } 

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
    },
    target = document.getElementById('loader-spinner'),
    spinner = new Spinner(opts).spin(target);

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
  if( (urlLang == 'ar' || urlLang == 'he') ) {
    $html.addClass('rtl');

    var $link = $('link[href="stylesheets/foundation.min.css"]'),
        rtl  = '<link rel="stylesheet" href="stylesheets/foundation.min-rtl.css">';

    $(rtl).insertAfter($link);
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
    if(urlLang) { translateImageVideo(); }
    handleAJAX();
  } 
  else if(vl > 0) {
    //update the video and images to change the path to appropriate language
    if(urlLang) { translateImageVideo(); }
    
    if(typeof sublime != 'undefined') {
      sublime.ready(function() {
        handleAJAX();

        if(sublime.hasOwnProperty('player') === true) {
          sublimeResize();  //activate the subscriptions
        }

      });
    } else {
      handleAJAX();
    }
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

      }).done(function(data){
        console.log('XML LOADED: Success');
        parseXML(data); //call to parse the xml
        hideLoader();
      });
    } 
    else {
      console.log('NO TRANSLATION: Skipped AJAX Request');
      hideLoader();
    }

  }

  /* ----------------------------------------------------------------
  Hides the loader, and scrolls page up.
    - Page is initally scroll down to a certain point on the page 
      before the loader is faded out.
    - During last moments of the fade-in the content is scrolled up
      to the top. 
        • If-statmeent conditions check for if the viewport is 
          smaller than ~655, then start from the bottom.
        • Otherwise, if on a desktop, go 1/4 of the way down 
          the page initially, then scroll up.
        • Lastly, if on mobile, then go 1/5 of the way down the page
    - Fades out the div.loader and it's contents to display: none
  ---------------------------------------------------------------- */
  function hideLoader() {
    $('div.loader').fadeOut(1000, function() {
        spinner.stop(); //stop the spinner after fade-in
    });
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
  var $htmlbody = $('html,body'),
      $html = $('html'),
      sliderActive = $html.hasClass('horslider'),
      singlePage = $html.hasClass('single-page-nav'),
      speed = (speed != undefined) ? speed : 600;

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
Checks if IE is in Compatibility Mode
  - Returns a boolean if the user is in Compatibility Mode
  
@params: 

@return:
  - isCompView -- Boolean if the user if or isn't in comp view
---------------------------------------------------------------- */
function checkIECompView() {
  var agentStr = navigator.userAgent;
  var mode = null;
  var isCompView = false; 

  //check for IE10 Comp view
  if(agentStr.indexOf('Trident/6.0') > -1 ) {
    if(agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE10"; 
      isCompView = true;
    }
    else { 
      mode = "IE10";
    }
  } 
  //check for IE9 Comp view
  else if (agentStr.indexOf("Trident/5.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE9";
      isCompView = true;
    }
    else {
      mode = "IE9";
    }
  }
  //check for IE8 Comp view
  else if (agentStr.indexOf("Trident/4.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1) {
      mode = "IE8";
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

  return { isCompView: isCompView, mode: mode }; //return boolean if comp view is true

}
