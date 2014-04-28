/*=========================================================================================
Author: Tou Lee
Created: 1/27/14
Last Updated: 3/21/14 - 11:26am
Version: 1.0.2

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

Changelog v1.0.2
  - translateVideoeImage()
      • Updated to have it check if the class of .not-urlLang (.not-ru, .not-zh_cn, etc...)
        is available then don't translate
      • Updated so that there is a .video-change class on there as well if the videos are 
        are to be translated

==========================================================================================*/

(function() {
  'use strict';
  
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
          //sublimeResize();  //activate the subscriptions
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
    - Currently works best with Sublime Player 

  @notes
    - Linking
        • Please have any <img>, <videos> that will be changed over to 
          be linked to "lang/en/....." as the default
    - Classes:
        - ".img-change"
            • Will change the <img> path of the specific language image

        - ".video-change" 
            • Put on <video> if you want them to switch over to a specific 
              language's version

        - ".poster-change"
            • Put on <video> to change the poster of the video
            • Only works of <video> already has class of ".video-change"

        - ".only-[language abbreviation]" > (i.e. .only-ru, .only-zh_cn)
            • This will only change the video or image for that 
              specific language

        - ".not-[language abbreviation]" > (i.e. .not-ru, .not-zh_cn)
            • This will change it for everyother language except for 
              that language specified
  ---------------------------------------------------------------- */
  function translateImageVideo() {
    /* 
      Inner Function: Check for '.only-urlLang'
      - Checks if the element has a class of '.only-urlLang' (i.e .only-ru)
        and if so, then it only will change it for that specific language. 
    */
    var checkIfOnlyLang = function(elem) {
      var $elem = $(elem),
          thisClasses = $elem.attr('class').split(/\s+/);

      for(i in thisClasses) {
        if(thisClasses[i].search('only-') != -1) {          
          return thisClasses[i].substr(thisClasses[i].indexOf('-') + 1);
        }
      }
    },
    
    /*
      Inner Function: Update images
    */
    updateImages = function($elem) {
      var img_src = $elem.attr('src');
      if(typeof img_src != 'undefined') {
        img_src = img_src.replace('/en/', '/'+urlLang+'/');
        $elem.attr('src', img_src);
      }
    },

    /*
      Inner Function: Update the videos and posters
    */
    updateVideos = function($elem) {
      var $video = $elem.children('source'),
          $track = $elem.children('track'),
          vcurrentSrc = $video.attr('src');

      //Replace the /en/ with the new language abbreviation
      vcurrentSrc = vcurrentSrc.replace('/en/', '/'+urlLang+'/');
      
      //Set the video source path
      $video.attr('src', vcurrentSrc);
      $elem[0].src = vcurrentSrc;
      //$(elem)[0].load();

      //Replace the track feature
      if($track.length > 0) {
        var tracksrc = $track.attr('src');
        tracksrc = tracksrc.replace('/en/', '/'+urlLang+'/');
        
        $track.attr({
          'src': tracksrc,
          'srclang': urlLang 
        });
      }

      /* 
      Replace VIDEO POSTERS
        - Change only if the video element has a class of ".poster-change"
        - Change the posters if the element that has .img-change class is of <video>
          if it is then go and do that function of switching the video
          Have to wait until the window.load event fires because for some reason the 
          the sublimevideo code is hot added till then. 
      */
      if($elem.hasClass('poster-change')) {
        if($elem[0].nodeName.toLowerCase() == 'video') {
          //$(window).load(function() {
            img_src = $elem.attr('poster');
            if(typeof img_src != 'undefined') {
              img_src = img_src.replace('/en/', '/'+urlLang+'/');
              $elem.attr('poster', img_src);
            }
          
            var $img_tag = $elem.siblings('img'),
                subimg_src = $img_tag.attr('src');

            if(typeof subimg_src != 'undefined') {
              subimg_src = subimg_src.replace('/en/', '/'+urlLang+'/');
              $img_tag.attr('src', subimg_src);
            }
          //});
        }
      }
    };

    /* 
      Update the Video Source Path
        - Update the files src path on any videos & subtitles that have the class of ".video-change"
          If there is a class of ".not-urlLang" (.not-ru, .not-zh_cn, etc...) then do not update the video 
    */
    $('video.video-change').not('.not-'+urlLang).each(function() {
      var $this = $(this),
          onlylang = checkIfOnlyLang($this);

      if(typeof onlylang != 'undefined') {
        if(onlylang === urlLang) {
          updateVideos($this);
        }
      } 
      else {
          updateVideos($this);
      }

    }); //end VIDEO & VIDEO POSTERS

    /*
      Replace IMAGES
      - Change the images & poster images with class of ".img-change" to the correct language version 
        If they have a class of ".not-urLang" (.not-ru, .not-zh_ch, etc...) then don't update the poster images or image
    */   
    $('.img-change').not('.not-'+urlLang).each(function() {
      var $this = $(this),
          onlylang = checkIfOnlyLang($this);

      if(typeof onlylang != 'undefined') {
        if(onlylang === urlLang) {
          updateImages($this);
        }
      } 
      else {
          updateImages($this);
      }


    }); //end IMAGES

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
    if(agentStr.indexOf("MSIE 7.0") > -1 || document.documentMode && document.documentMode === 7) {
      mode = "IE10"; 
      isCompView = true;
    }
    else { 
      mode = "IE10";
    }
  } 
  //check for IE9 Comp view
  else if (agentStr.indexOf("Trident/5.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1 || document.documentMode && document.documentMode === 7) {
      mode = "IE9";
      isCompView = true;
    }
    else {
      mode = "IE9";
    }
  }
  //check for IE8 Comp view
  else if (agentStr.indexOf("Trident/4.0") > -1) {
    if (agentStr.indexOf("MSIE 7.0") > -1 || document.documentMode && document.documentMode === 7) {
      mode = "IE8";
      isCompView = true;
    }
    else {
      mode = "IE8";
    }
  }
  else if (agentStr.indexOf("MSIE 7.0") > -1 || document.documentMode && document.documentMode === 7) {
    mode = "IE7";
    isCompView = true;
  }
  else {
    isCompView = false;
  }

  return { isCompView: isCompView, mode: mode }; //return boolean if comp view is true

}
