jQuery(function($) {
	$('.square').prepend('<a href="#" />').children('a').click(function() {
		$(this).parent().toggleClass('onn').siblings('.onn').removeClass('onn');
		return false;
	});
	$('.squares').click(function() {
		$('.square').removeClass('onn');
		return false;
	});
});