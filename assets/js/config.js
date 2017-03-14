$(document).ready(function(){

	/**
	*
	* Slideshow
	*
	**/
	
	$('#slideshow .item').css('display', 'none');
	$('#slideshow .item').first().fadeIn().addClass('active');
	var slideInt = setInterval( "slideshow()", 3000);

	$('#slideshow-nav').append(function(){
		var nav = '<ul>';

		for(i=0; i < $('#slideshow .item').length; i++){
			nav += '<li data-id="' + i + '"></li>';
		}
		nav += '</ul>';

		return nav;
	}).css("margin-left", function(){
		return -$(this).width()/2;
	});

	$('#slideshow-nav li').first().addClass('active');

	$('#slideshow-nav li').on('click', function(){

		clearInterval(slideInt);

		$('#slideshow-nav li.active').removeClass('active');
		$(this).addClass('active');

		var index = $(this).data('id');

		$('#slideshow .item.active').fadeOut().removeClass('active');
		$("#slideshow .item:eq(" + index + ")").fadeIn().addClass('active');

		slideInt = setInterval( "slideshow()", 3000);

	});

	/**
	*
	* Simulation Tab
	*
	**/
	$("#simulation-content .row").first().css("display", "block");
	$("#simulation-select select").change(function(){
		$("#simulation-content .row").css("display", "none");
		$("#simulation-content #" + this.value).fadeIn();
	});

	/**
	*
	* More News AJAX
	*
	**/
	$("#more-news").click(function(e){
		e.preventDefault();
		$.ajax({
            type: "GET",
            url: "news.xml",
            cache: false,
            dataType: "xml",
            success: function(xml) {
            	var separator = "<div class='separator clear'></div>";
            	var html = "";
				$(xml).find('news item').each(function(){
					html += "<div class='col-md-4'><div class='news-item'><div class='news-thumbnail'><img src='"+ $(this).find('thumbnail').text() +"' alt='' /></div><div class='news-title'><strong>" + $(this).find('title').text() + "</strong></div><a href='" + $(this).find('pagelink').text() + "' class='news-link orange'>Selanjutnya</a></div></div>";
				});
				$(separator).insertBefore("#news-section .more-item");
				$(html).insertBefore("#news-section .more-item").hide().slideDown();
            }
        });
	});

	/**
	*
	* Scroll to top
	*
	**/
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 50) {
			$('#gototop')
				.fadeIn(500)
				.css('left', $('#container .wrap').offset().left + $('#container .wrap').width() - 61);    // Fade in the arrow
		} else {
			$('#gototop').fadeOut(500);
		}
	});
	$('#gototop').click(function() {
		$('body').animate({
			scrollTop : 0
		}, 500);
	});
});

function slideshow(){
	var $active = $('#slideshow .item.active');
	var $next = $active.next('.item');

	$active.fadeOut().removeClass('active');
	$('#slideshow-nav li.active').removeClass('active');

	if($next.length > 0){
		$next.fadeIn().addClass('active');
	} else {
		$('#slideshow .item').first().fadeIn().addClass('active');
	}

	var activeIndex = $('#slideshow .item.active').index();
	$('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

}