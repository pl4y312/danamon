$(document).ready(function(){
	$(window).scroll(function() {
	    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
	        $('#gototop')
	        	.fadeIn(500)
	        	.css('left', $('#container .wrap').offset().left + $('#container .wrap').width() - 61);    // Fade in the arrow
	    } else {
	        $('#gototop').fadeOut(500);   // Else fade out the arrow
	    }
	});
	$('#gototop').click(function() {      // When arrow is clicked
	    $('body').animate({
	        scrollTop : 0                       // Scroll to top of body
	    }, 500);
	});
});