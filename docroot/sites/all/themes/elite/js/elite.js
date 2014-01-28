function qelite_taketraining_btn() {
	if ( jQuery('body').hasClass('node-type-training') ) {
		jQuery('#quiz-start-quiz-button-form').submit();
	} else {
		jQuery('#wback').click();
	}
	return false;
}

(function ($) {
  Drupal.behaviors.qElite = {
    attach: function (context, settings) {
			// and then
			$(window).unbind('resize.qelite').bind('resize.qelite', function () {
				$("#qvideo").each(function() {
					var tw = $(this).parent().width();
					var th = Math.ceil(tw*9/16);
					$(this).attr({'width':tw,'height':th});
				});
				if ( $('#wslashd').size() > 0 ) {
					var ih = $(window).height() - ( $('body').hasClass('admin-menu') ? 20 : 0 ) - 54;
					$('#wslashd iframe').attr('height',ih);
				}
			}).trigger('resize.qelite');
			
			if ( $('#elite-user-flop').size() > 0 ) {
				$('#avatar-block-wrapper a').unbind('click.qelite').bind('click.qelite',function() {
					$('#block-elite-custom-userflop').slideToggle(100);
					return false;
				});
				if ( $('#elite-user-flop a.x').size() == 0 ) {
					$('<a href="#x" class="x">x</a>').click(function() {
						$('#block-elite-custom-userflop').slideUp(41);
						return false;
					}).appendTo('#elite-user-flop');
				}
			}
			// training details
			if ( $('body').hasClass('node-type-training') || $('body').hasClass('node-type-quiz') ) {
				var wslash = $('.field-name-field-wslash-training a');
				if ( wslash.size() > 0 ) {
					wslash.click(function() {
						var turl = $(this).attr('href');
						$("#section-header, #section-content, #section-footer").hide();
						var wc = $('<div />');
						wc.attr('id','wslashd').append('<div class="wbar"><a href="#back" id="wback">Back</a><a href="/" id="logo">Qualcomm Elite</a></div>');
						
						var wh = $(window).height() - ( $('body').hasClass('admin-menu') ? 20 : 0 ) - 54;
						
						var ifr = $('<iframe />');
						ifr.attr('src',turl).attr('width','100%').attr('height',wh);
						ifr.appendTo(wc);
						wc.appendTo('#page');
						
						$("#wback").click(function() {
							$('#section-header, #section-content, #section-footer').show();
							$('#wslashd').remove();
							return false;
						});
						
						return false;
					});
				}
			}
			// training details
			if ( $('body').hasClass('node-type-article') ) {
				var extl = $('.field-name-field-external-link a');
				if ( extl.size() > 0 ) {
					var collectpts = $('.flag-collect-points a.flag-action');
					if ( collectpts.size() > 0 ) {
						collectpts.hide();
						extl.click(function() {
							collectpts.show();
						});
					}
				}
			}
		}
	};
})(jQuery);