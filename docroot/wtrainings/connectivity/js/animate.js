/**
 * Javascript Animations & Helpers
**/
$(document).ready(function() {
	// default animation offset for each section (variance from top of <section>)
	var qwh, qww, offsetDefault = '30%';
	// scale full bg img slides
	$('.bg-img').each(function() {
		var th = $(this).height();
		var mh = $(this).data('min-height');
		if ( mh ) th = mh;
		$(this).data('og-height', th);
	});
	$(window).bind('resize', function() {
		qwh= $(this).height();
		qww = $(this).width();
		$('.bg-img:not(.noscale)').each(function() {
			var ogh = $(this).data('og-height');
			var bgh = $(this).data('bg-height');
			$(this).height(function( index, height ) {
				//if ( $(this).hasClass('max-height') ) return qwh;
				
				var nh = Math.round(qww * bgh / 1280);
				if ( $(this).hasClass('max-height') ) {
					if ( nh > qwh ) nh = qwh;
				} else if ( nh < ogh ) {
					nh = ogh;
				}
				return nh;
			});
		});
	}).trigger('resize');
	
	// "qualcommreveal" loader
	$('.content-container').qualcommreveal({
      targets: '.block',
	  scrollspeed: 0,
    });
	$.subscribe('qualcommreveal/reveal-finish', function(event, elem, counter) {
		elem.trigger('qinview');
	});
	
	// waypoints & more mayhem
	var onoffsets = new Array();
	$('.comeon').each(function(i) {
		if ( $(this).is('[data-waypoint-offset]') == false ) {
			$(this).data('waypoint-offset', offsetDefault);
		}
		var ofs = $(this).data('waypoint-offset');
		onoffsets[i] = ofs;
		$(this).on('qinview', function() {
			$(this).waypoint(function() {
				$(this).addClass('onn');
			}, {
				offset: onoffsets[i]
			});
		}).on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(!isInView) {
				$(this).trigger('reset');
			}
		});
	});
	// #8 chipd
	$('#chipd .graphic-position').children().addClass('fadein');
	
	// #9 super
	q_supertime = function() {
		jQuery('#super a.next').click();
	};
	
	var q_supertimer;
	$('#super').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if ( isInView ) {
			clearTimeout(q_supertimer);
			q_supertimer = setTimeout(q_supertime, 2400);
		}
	}).on('reset', function() {
		clearTimeout(q_supertimer);
		var qsfs = $('#super .slide:first');
		if ( qsfs.hasClass('onn') == false ) {
			qsfs.add(qsfs.siblings('.onn')).toggleClass('onn');
		}
	});
	$('#super .btn').click(function() {
		clearTimeout(q_supertimer);
		var onn = $('#super .slide.onn');
		var nex = onn.next();
		if ( $(this).hasClass('prev') ) {
			nex = onn.prev();
			if ( nex.size() == 0 ) {
				nex = onn.parent().children(':last');
			}
		} else {
			if ( nex.size() == 0 ) {
				nex = onn.parent().children(':first');
			}
		}
		onn.add(nex).toggleClass('onn');
		q_supertimer = setTimeout(q_supertime, 2400);
		return false;
	});
	// add swipe too
	$('#super').swipe({
		swipeRight: function() {
			$(this).find('a.prev').click();
		},
		swipeLeft: function() {
			q_supertime();
		}
	});
	// #10 benies
	$('#benies .bk').children().addClass('fadein');
	// #11 delivr
	$('#delivr .graphic-position').children().addClass('fadein');
	// # videos
	$('#vs3g').bind('qinview', function() {
		sublime.prepare('v3gvs');
	});
	$('#vs4g').bind('qinview', function() {
		sublime.prepare('v4gvs');
	});
	// #13 adv4g
	$('#adv4g .graphic-position').children().addClass('fadein');
	
	// add reset btn to each block?
	$('.block').append('<a href="#" class="btn-reset"><i></i></a>').children('.btn-reset').click(function() {
		var bpid = '#' + $(this).parent().removeClass('onn').attr('id');
		setTimeout(function() {
			$(bpid).addClass('onn').trigger('reset');
		}, 0);
		return false;
	});
	// fun with ecos
	$('.eco:not(.bg)').click(function() {
		$(this).fadeOut(100,function() { $(this).fadeIn(1000) });
	});
});

//browser-update.org
var $buoop = {vs:{i:9,f:5,o:12,s:5,n:9},reminder:0,onshow:function(infos) {
	jQuery('#buorg > div').prepend('<strong>This module is built with the latest HTML5 + CSS3 in mind.</strong> ');
	}}; 
$buoop.ol = window.onload; 
window.onload=function(){ 
 try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
 var e = document.createElement("script"); 
 e.setAttribute("type", "text/javascript"); 
 e.setAttribute("src", "//browser-update.org/update.js"); 
 document.body.appendChild(e); 
} 