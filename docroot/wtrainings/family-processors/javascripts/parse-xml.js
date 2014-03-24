/*=============================================================================================================================
Author: Tou Lee
Created: 7/26/13
Last Updated: 3/21/14 - 10:26pm
Version: 1.5.1

Changelog v1.0.0
	- updated the @param and @returns in the function definitions
	- created new function getSections(): that returns the children sections of the main section inside assoc. array.
	- created new function setTextFromAttr(): searches and places text according to the "field [XML]" and "data-field [HTML]" 

Changelog v1.1.0
	- setTextFromAttr(): 
		• added a new version 1 type function where we search for the HTML elements first and then use those 
	  	  to find the XML nodes that match. 
		• renamed first code to version 2 where we search for the XML then find the HTML elements that match

Changelog v1.2.0
	- setTextFromAttr(): 
		• added new feature to version 1 to allow for the search for multiple "field" attributes
		• removed the inner for-in loop that split and checked each value individually, but used single .indexOf call instead. 
		• added check so that any data-field attribute without any value would not get pushed to the array
	
Changelog v1.3.0
	- added new function updateTags(): updates the <i>, <br>, <b>, and removes the <font> tag.
	- depreciated findTag()
	- depreciated convertToHtmlString()
	- depreciated convertToHtmlStringClone()
	- depreciated setText()
	- created new function setLangText(): that searchs the HTML document and fills the text matched from the "lang" object
	- updated setBouquetText():
		• removed the extra array, it seems CDATA works well with Foundation's tooltip and title attribute
		• used html() instead of text() on the mobile set up

Changelog v1.4.0
	- added new for-in loop to loop through all the sections and set their text (except "container" and "container-loader");
	- depreciated createTableFromXML()

Changelog v1.5.0
	- updateTags(): changed the check for <font> tag from indexOf('<font') to indexOf('</font>')
	- setTooltips(): updated call from Foundation 2 to Foundation 3
		• F2: $(document).tooltips();
		• F3: $(document).foundationTooltips();
	- Removed check for if "section != 'container', since I need to use it for the navigation, so we won't skip container
	  when loading in the text from the XML file.
	- updateTags(): added new check for "®" (register) to have it superscripted when brought in
	- setToolTips(): added new function to actually set the title attribute of the any element that is going to have tooltips
	- parseXML(): removed the video changing functions for sublime video
	- Removed setBouquet() function, since it was replaced with setToolTips();

Changelog v1.5.1
	- parseXML() 
		• Added new check for sections[i] !== 'langstyles' to skip when setting text with call to setTextFromAttr()
	- setTooltips()
		• Added new if statment for $tip.length > 0
		• Checks to see if there are actually any tips on the course, and if not, don't run the code
	- Added setLangSpecificStyles() function
		• This function checks append the <langstyles> XML tag to the end of the <head> element so we can target specific 
		  elements
	- Added setHTMLTitle()
		• This function sets the <title> tag text equal to that of the <course-name> tag found in the <container> tag

———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
parse_xml.js
	- This file contains functions that are helpful in parsing and setting text from XML sheets for courses.

Conditions: 
	-

Dependencies: 
	- Include jQuery
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
Issues to resolve: 
	- [Resolved] Multiple XML "field" attribute values cause issue in setTextFromAttr();

Features to add: 
	- [Added] Add in feature for the setting of attribute values 
	- [Added] setTextFromAttr(): Have check to replace any tags with new updated ones

Notes: 

============================================================================================================================*/
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CORE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*---------------------------------------------------------------------------------------------------------------------------
Main function that runs through the XML and parses it into the appropriate places. 
	@param xml -- the XML document returned from AJAX call to be parsed  
---------------------------------------------------------------------------------------------------------------------------*/
function parseXML(xml) {
	//set the passed in XML into a variable 
	var $xml 	 = $(xml); 
	var $course  = $xml.children('course');		//holds the root "course" node
	var right    = $course.attr("right");		//holds the right attribute
	var language = $course.attr('language');	//holds the language attribute
	var sections = getSections($course);		//get the all the sections
 	var lang 	 = (language == undefined || language == "") ? nonXMLPhrases('en') : nonXMLPhrases(language);

	/*-------------------------------------------------------------------------
	Setting RTL attribute & Language attribute
		- Checks if the language is a right-to-left (RTL) language, and if so 
		  then add the 'dir' attribute with value of 'rtl' to set the browser 
		  page accordingly for those languages
	--------------------------------------------------------------------------*/
 	var $html = $('html');
 	$html.attr('lang', language);
 	if(right == "true") { $html.attr({ dir: 'rtl'}); }

 	/*--------------------------------------------------------------------------
	Set Text in to the appropriate spots
		- Use for-in loop to loop through all the sections
		and set their text by calling the setTextFromAttr() 
	--------------------------------------------------------------------------*/
	// console.time('timer');
	for(i in sections) {
		if(sections[i] !== 'container-loader' || sections[i] !== 'langstyles') {
			setTextFromAttr(sections[i]);
		}
	}
	// console.timeEnd('timer');

	/*-----------------------------------------------------------
	Set extra text not from the XML using the "lang" object
	------------------------------------------------------------*/
	setLangText(lang);

	/*-----------------------------------------------------------
	Set the custom styles to the parent
	------------------------------------------------------------*/
	setLangSpecificStyles(sections['langstyles']);

	/*-----------------------------------------------------------
	Set the title page
	------------------------------------------------------------*/
	setHTMLTitle(sections['container']);

	/*-----------------------------------------------------------
	Set up the tooltips
	------------------------------------------------------------*/
	setTooltips(sections);


} //end parseXML


/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SPECIFIC COURSE FUNCTIONS --- These functions are specific to the course
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*---------------------------------------------------------------------------------------------------------------------------
Sets the <title> tag of the element to be equal to that of the course's name and title found in the title_text

@param:
	- Takes in the <container> tag

@notes: 
---------------------------------------------------------------------------------------------------------------------------*/
function setHTMLTitle(section) {
	var str = $(section).find('course-name').text();
	document.title = str;
}

/*---------------------------------------------------------------------------------------------------------------------------
Appends the custom language styles to the end of the head tag. This allows us to target specific elements or add changes to 
a specific language if need be. 

@param:
	- Takes in the <langstyles> tag

@notes: 
---------------------------------------------------------------------------------------------------------------------------*/
function setLangSpecificStyles(section) {
	var $section = $(section),
		str = $section.text().replace('<![CDATA[', '').replace(']]>', '');
	$('head').append(str);

}
/*---------------------------------------------------------------------------------------------------------------------------
Searches for the elements with the class of (.has-tip), so they are tool tips, and then find the parent who has a data-context
attribute to use as the base for the search. Then match up the "data-field" (HTML) and the "field" (XML) and set the text to
the tooltips. 

Calling the foundation.js tooltip initilization function

@param:
	- Takes in the collected section, so that it can find the one that matches

@notes: 
	- Commented out of the "app.js" so that it doesn't initalize the tooltips until AFTER the 
  	  tooltip's title attribute's are changed
  	 - If the user has the class of ".tip-no-innertext" then that item's text will be cleared.
  	 - If the item doesn't have a anything set for the data-field, or field attributes then nothing is loaded into the 
  	   tooltip
---------------------------------------------------------------------------------------------------------------------------*/
function setTooltips(sections) {
	var $tips = $('.has-tip'),
		parentcontext = $tips.parents('[data-context]').attr('data-context'),
		xmlsection = sections[parentcontext];

		if($tips.length > 0) {
			$tips.each(function() {
				var $this = $(this),
					field = $this.attr('data-field'),
					xmlText = $(xmlsection).children('[field="'+field+'"]').text();

				if(field != '' && xmlText != '') {
					$this.attr('title', xmlText);
					if($this.hasClass('tip-no-innertext')) { $this.text(''); }
				}
			});

			// $(document).tooltips();
			$(document).foundationTooltips();
		}
}

/*---------------------------------------------------------------------------------------------------------------------------
These phrases aren't in the XML document, and are really only needed for the Tablet/mobile
version of the course. Pass in a language attribute and search the switch statement for
the case that define the parameters of the object, and return an object with those 
phrases set as attributes. 

@param 
	- language -- Language "two letter abbreviation" to search switch statement for

@return 
	- lang -- Object containing phrases as string values 
---------------------------------------------------------------------------------------------------------------------------*/
function nonXMLPhrases(language) {
	//language object
	var lang = {};

	switch(language) {
		case 'ar':
			lang.dashboard  = "العودة إلى لوحة المعلومات",
			lang.nav 		= "قائمة الطعام",
			lang.top		= "عودة إلى الأعلى",
			lang.quiz		= "المتابعة إلى التقييم"
			return lang;
			break;
		case 'en':
			lang.dashboard  = "Return to dashboard",
			lang.nav 		= "Menu", 
			lang.top 		= "Back to top",
			lang.quiz		= "Proceed to Assessment"
			return lang;
			break;
		case 'uk':
			lang.dashboard  = "Return to dashboard",
			lang.nav 		= "Menu", 
			lang.top 		= "Back to top",
			lang.quiz		= "Proceed to Assessment"
			return lang;
			break;
		case 'es':
			lang.dashboard  = "Volver al panel",
			lang.nav 		= "Menú", 
			lang.top 		= "Volver al principio",
			lang.quiz		= "Continuar con la evaluación"
			return lang;
			break;
		case 'es_xl':
			lang.dashboard  = "Volver al tablero",
			lang.nav 		= "Menú", 
			lang.top 		= "Volver al principio",
			lang.quiz		= "Ir a la evaluación"
			return lang;
			break;
		case 'de':
			lang.dashboard  = "Zurück zum dashboard",
			lang.nav 		= "Menü", 
			lang.top 		= "Zurück zum anfang",
			lang.quiz		= "Weiter zum Test"
			return lang;
			break;
		case 'fr': 
			lang.dashboard  = "Retour au tableau de bord",
			lang.nav 		= "Menu", 
			lang.top 		= "Haut de la page",
			lang.quiz		= "Commencer l'évaluation"
			return lang;
			break;
		case 'id':
			lang.dashboard  = "Kembali ke dasbor",
			lang.nav 		= "Menu", 
			lang.top 		= "Kembali ke atas",
			lang.quiz		= "Lanjutkan ke Penilaian"
			return lang;
			break;
		case 'it':
			lang.dashboard  = "Torna alla dashboard",
			lang.nav 		= "Menu", 
			lang.top 		= "Torna a inizio pagina",
			lang.quiz		= "Passa alla valutazione"
			return lang;
			break;
		case 'ja':
			lang.dashboard  = "ダッシュボードに戻る",
			lang.nav 		= "メニュー", 
			lang.top 		= "先頭へ戻る",
			lang.quiz		= "評価テストに進む"
			return lang;
			break;
		case 'ko':
			lang.dashboard  = "대시보드로 돌아가기",
			lang.nav 		= "메뉴",
			lang.top		= "처음으로 돌아 가기",
			lang.quiz		= "평가세션으로 이동"
			return lang;
			break;
		case 'pt_br':
			lang.dashboard  = "Retornar ao painel",
			lang.nav 		= "Menu", 
			lang.top 		= "Voltar ao topo",
			lang.quiz		= "Prosseguir para a avaliação"
			return lang;
			break;
		case 'pl':
			lang.dashboard  = "Powrót do panelu sterowania",
			lang.nav 		= "Menu",
			lang.top 		= "Powrót do góry",
			lang.quiz		= "Przejdź do formularza oceniającego"
			return lang;
			break;
		case 'ru':
			lang.dashboard  = "Вернуться в информационную панель",
			lang.nav 		= "меню", 
			lang.top 		= "Наверх",
			lang.quiz		= "Перейти к тестированию"
			return lang;
			break;
		case 'th':
			lang.dashboard  = "กลับไปแดชบอร์ด",
			lang.nav 		= "เมนู", 
			lang.top 		= "ขึ้นไปข้างบน",
			lang.quiz		= "ดำเนินการประเมินผล"
			return lang;
			break;
		case 'tr':
			lang.dashboard  = "Tabloya dön",
			lang.nav 		= "Mönü", 
			lang.top 		= "Başa geri dön",
			lang.quiz		= "Değerlendirmeye Geç"
			return lang;
			break;	
		case 'vi':
			lang.dashboard  = "Trở về Bảng điều khiển",
			lang.nav 		= "Thực đơn", 
			lang.top 		= "Lên trên",
			lang.quiz		= "Vào Bài đánh giá"
			return lang;
			break;
		case 'zh_cn':
			lang.dashboard  = "返回至仪表板",
			lang.nav 		= "菜单", 
			lang.top 		= "返回顶部",
			lang.quiz		= "继续进行评估"
			return lang;
			break;
	}
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TEXT SETTING -- Functions that set the text from the XML
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*---------------------------------------------------------------------------------------------------------------------------
Searchs the XML for the "field" value based on a context, then fines the HTML element with the same "id" as the context
and searches within that to find the DOM element where the "data-field" matches up with the "field" attribute.

@param
	- context -- the context of where to search for the element

@requirements
	- data-context: need this attribute on the parent nodes that encompass the sections
	- data-field: need this attribute labeling the areas where text will go
---------------------------------------------------------------------------------------------------------------------------*/
function setTextFromAttr(context) {
	var $context = $(context);
	var contextName = $context.attr('name');
	var $htmlContext = $('*[data-context="'+contextName+'"]');
	var htmlElements = [];

	/* search the context descendants for elements that have the "data-field" attr, if so push 
	   into the array only if the attribute value actually contains something */
	$htmlContext.find('*[data-field]').each(function() {
		var $this = $(this); 

		if($this.data('field')) {
			htmlElements.push( {elem: this, field: $this.attr('data-field')} );
		}
	});

	//console.log(htmlElements);

	//find the XML elements that have the same field and set their text values into the HTML element
	for(i in htmlElements) {
		var search = htmlElements[i].field;
		var $xmltemp;

		//multiple field values: need to field value and then map through it.
		$context.find('*[field]').each(function() {
			var $this = $(this);
			var fattr = $(this).attr('field');

			if (fattr === search || fattr.indexOf(search) !== -1) {
				$xmltemp = $this;
				return false;
			}
		});

		/* If nothing is found then don't set any text, but if not null then set the text, and clear the variable afterwards. 
		   Also call updateTags to update any tags and remove the <font> tag*/
		if($xmltemp != null) {
			var text = $xmltemp.text();
			text = updateTags(text);
			$(htmlElements[i].elem).html(text);
			$xmltemp = null;
		}
	}
}

/*---------------------------------------------------------------------------------------------------------------------------
Set the text that aren't included in the XML, that are defined in the lang object. The function searches the HTML sheet for 
elements that have the "data-lang" attribute, and then uses that attribute to match up to the language property and set the
text according to the match up. 

@notes
	- "data-lang" attribute value MUST match the "lang" attribute 
	- i.e. data-lang="dashboard" ==== lang.dashboard

@param
	- lang -- the language object that contains the extra text not found in the XML sheet
---------------------------------------------------------------------------------------------------------------------------*/
function setLangText(lang) {
	$('*[data-lang]').each(function() {
		var $this = $(this); 
		var attr = $this.data('lang');
		$this.text(lang[attr]);
	});
}

/*---------------------------------------------------------------------------------------------------------------------------
Loops through all the pages children of the context tag and store them into an associative array
using the "name" attribute as the default them to search for and to use as the key value

@param
	- context -- the context in which to search for the children nodes
	- attr ----- the attribute value to filter the search against and make the key value

@return 
	- array -- returns an associative array containing the children
---------------------------------------------------------------------------------------------------------------------------*/
function getSections(context, attr) {
	if(!(context instanceof jQuery)) { context = $(context); }
 	var attrKey = (attrKey != undefined) ? attr : 'name',
 		array = {};
 	
 	context.children().each(function() {
 		var $this = this;
 		var key = $(this).attr(attrKey);
 		if(key != undefined) { array[key] = $this; }
 	});

 	return array;
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HELPER FUNCTIONS -- Help to perform small task such as stripping tags, etc...
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*---------------------------------------------------------------------------------------------------------------------------
Subtracts str2 from str1, and returns the new string. 

@param
	- str1 -- Base string (string to be subtracted from) 
	- str2 -- String to be removed from str1

@returns 
	- result -- The new string from the subtraction.
---------------------------------------------------------------------------------------------------------------------------*/
function stringSubtract(str1, str2) {
	//get the starting index of str2			
	var pos = str1.indexOf(str2);  
	
	//if not found (returns -1), then return the original string
	if(pos == -1) {
		return str1; 	
	} else {
		var result = str1.substr(0, pos) + str1.substr(pos + str2.length);
		return result;
	}
}

/*---------------------------------------------------------------------------------------------------------------------------
Strips the passed in string/html argument of any html tags and returns the new string. 

@param 
	- html -- The html, string, to be stripped of tags. 

@return 
	- string -- returns a string with not HTML tags
---------------------------------------------------------------------------------------------------------------------------*/
function stripStringAllTags(html) {
	var temp = document.createElement("div");
	temp.innerHTML = html; 

	return temp.textContent || temp.innerText; 
}

/*---------------------------------------------------------------------------------------------------------------------------
Removes all the tags inside the passed html string according to passed in boolean. 
Useful when there is no separation in the node between a header/quote and other body text

@param
	- html ------ The html, string, to be stripped of font, br, and i tags 
	- brBool ---- Boolean value if the <br/> tags should be stripped 
	- fontBool -- Boolea value if the <font> tags should be stripped
	- iBool	----- Boolean value if the <i> tags should be stripped

@return 
	- string -- returns a html string of stripped of what ever tag was passed in
---------------------------------------------------------------------------------------------------------------------------*/
function extractTagsOptions(html, spanBool, brBool, fontBool, iBool) {
	var temp = document.createElement("div");
	$temp = $(temp).append(html);

	if(brBool)   $temp.find('br').remove(); 				//remove the <br> tags IF boolean is true
	if(spanBool) $temp.find('span').contens().unwrap();		//remove the <span> tags IF boolean is true
	if(fontBool) $temp.find('font').contents().unwrap();	//remove the <font> tags IF boolean is true
	if(iBool)    $temp.find('i').contents().unwrap(); 		//remove any <i> tags IF boolean is true

	return $temp.html();			//returns a string representation of the HTML
}

/*---------------------------------------------------------------------------------------------------------------------------
Searches the string and updates the tags and removes the <font> tag as well (since there is alredy CSS to define these 
stylistic choices). It will check if the string contains any of the tags and if so it will update/remove the necessary ones, 
if not won't don anything and return the string as it was. 

@notes
	- <i> = <em>
	- <b> = <strong>
	- <br> = <br/>
	- <font> = none, remove
	- ® = <sup>®</sup>

@param
	- string -- the string of where to replace the elements

@return 
	- string -- the string with the updated tags and removed <font> tag

@calls 
	- extractTagsOptions(): Used to unwrap the text around the <font> tag and remove it.
---------------------------------------------------------------------------------------------------------------------------*/
function updateTags(string) {
	var br 		= /<br>/g
	var iopen 	= /<i>/g; 
	var iclose 	= /<\/i>/g;
	var bopen 	= /<b>/g;
	var bclose 	= /<\/b>/g; 
	var reg		= /®/g;

	//replace and update the tags with their new tags
	if(string.indexOf('<br>')) {
		string = string.replace(br, '<br/>');
	}

	if(string.indexOf('<i>')) {
		string = string.replace(iopen, '<em>');
		string = string.replace(iclose, '</em>');
	}

	if(string.indexOf('<em>')) {
		string = string.replace(bopen, '<strong>');
		string = string.replace(bclose, '</strong>');
	}

	//remove the wrapping font tags
	if(string.indexOf('</font>')) {
		string = extractTagsOptions(string, false, false, true, false);
	}

	//superscript the ®
	if(string.indexOf('®')) {
		string = string.replace(reg, '<sup>®</sup>');
	}

	return string;
}
