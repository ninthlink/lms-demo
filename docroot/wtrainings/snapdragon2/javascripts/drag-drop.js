/*-----------------------------------------------------------------------------------------------------------------------
	Function for setting up the draggable and droppables items
  @param drag     -- the drag that is going to be set draggable with 
  @param drop     -- the droppable that will be the correct one for the drag
  @param counter  -- the counter object, that will hold the counter, which item to show, & 
                     the number of correct answers to compare against.
                     ** Pass in a "undefined" if you need to pass in nothing **
  @param accept   -- the class or ID for the draggable to accept if needed.

  NOTE: The droppables are set to accept the specified drag passed, class or ID passed in OR a class of .correct 
        This allows for the user to drop either correct drag on either droppable, and still have the counter increment. 
------------------------------------------------------------------------------------------------------------------------*/
	function dragSetUp(drag,drop,counter,accept) {
    var $drag = $(drag);
		var $drop = $(drop);
    var $accept = accept;

		////-- Draggable code --/////
    if($drag.length == 0) {
      $drag.draggable({ disabled: true });
    } 
    else {
      //If the drag does exist, then on "hover" change the cursor to pointer
  		$drag.hover(function() {
  			$(this).css("cursor","pointer");
  		}); 
  		
  		$drag.css("z-index",10);				  //set the draggable's z-index to be above the droppable
  		
      $drag.draggable({
  		  revert: "invalid",					  //sets the reverting of the draggable
  			cursor: "pointer",            //sets cursor to change to pointer when dragging the element
        scroll: false,
        containment: ".section7"
  		});
    } 

		////-- Droppable code --/////
    if($drop.length == 0) {
      $drop.droppable({ disable: true });
    } 
    else {
  		$drop.droppable({
        //accept: $accept,                  //use this if you want the drop to ONLY accept what is passed in for "accept" argument
        //accept: $drag,                    //use this if you want the drop to ONLY accept the drag passed in with it     
  	    accept: ".correct",               //use this if you want to have the drops accept any drags with class of "correct". 
        //tolerance: "fit",                 //use this if you want to have the drags be PERFECT over the drag
        tolerance: "intersect",             //use this if you want to have the drags be over drops by 50% to register (better option)
	
        drop: function(event, ui) {
          //Call the check score only if counter exist
          if(counter != undefined) {
            checkScore(counter);
          }

          //Change the background color of the droppable when the item is dropped
          //$(this).css('background-color','#ee3124');
          $(this).addClass('drop-success');

          //Disable the correct draggable after it's dropped on
          ui.draggable.draggable("disable");

          //Remove the draggablea and move it to the center of the droppable
          ui.draggable.css({ top: 0, left: 0, 'margin' : '0 auto', 'display': 'none'});
          $drop.append(ui.draggable);
          ui.draggable.fadeIn(400);

          ui.draggable.hover(function() {
             $(this).css("cursor","default");
          });
  			}
  		}); //end droppable

    }
  }

/*--------------------------------------------------------------------------------------------
  Function for setting checking the counter object to see if the user has dropped the correct
  amount of item and/or completed the entire drag and drop sequence. If show, then the 
  the showAnswer function is called. 

  @param counter  -- the counter object, that will hold the counter, which item to show, & 
                     the number of correct answers to compare against.
--------------------------------------------------------------------------------------------*/
  function checkScore(counter) {
    if(counter.counter != counter.numofanswers) {
      counter.counter++; 
      
      if(counter.counter == counter.numofanswers) {
        showAnswers(counter.divtoShow);
      }
    }
  }

/*--------------------------------------------------------------------------------------------
  Function for displaying an hidden item
  @param element -- the hidden element on the screen to be displayed
--------------------------------------------------------------------------------------------*/
  function showAnswers(element) {
    //$(element).fadeIn(400);
    $(element).animate({
      opacity: 'show',
      useTranslate3d: true    //use this if you are using the jquery.animate-enchanced.min.js
      //},400, checkprog());  //commented out queue animation b/c no call to quiz
    },400);
  }

/*////////////////////////////////////////////////////////////////////////////////////////////
Old Functions: 
////////////////////////////////////////////////////////////////////////////////////////////*/


  /*------------------------------------------------------------------------------------------
  Function for checking the users interactions that will then 
  show the elements on screen, and show the quiz
  ------------------------------------------------------------------------------------------*/
  function checkprog() {
    progcounter.counter++;  
    if(progcounter.counter == progcounter.interactions) {
      $('#qpanel').animate({
        opacity: 'show',
        useTranslate3d: true
      },400);
      $('#qinstructions').hide();
      $('#quizModal').reveal();
    }
  }




