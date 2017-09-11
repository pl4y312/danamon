var executed = 0;
var windowWidth = $(window).width();
var windowHeight = $(window).height();

$(window).on('load', function() {
	
	/**
	 *
	 * Header Mega Menu
	 *
	 */
	if (windowWidth > 1200) {
		$("#header .menu .level-2 > ul > li").has('.level-3').append('<div class="arrow-submenu"></div>');
		$("#header .menu .level-2 > ul > li").on("mouseover", function () {
			if($(this).has('.level-3').length){
				$(this).siblings(".active").removeClass("active").find('.level-3').hide();
				$(this).addClass("active").find('.level-3').show();
			}
		});
	}

	/**
	 *
	 * Mobile Toggle Menu
	 *
	 */
	if (!executed) {
		if (windowWidth < 1200) {
			$('#header .menu .level-1').css({'right': -windowWidth});
			$('#icon-menu-responsive').click(function(){
				$(this).toggleClass('open');

				if($(this).hasClass('open')){
					$('#header .menu .level-1').animate({right: "0px"}, 500);
					if($('#sticky-menu').hasClass('open'))
						$('#sticky-menu .glyphicon-remove').trigger('click');
					$('body').addClass('disableScroll');
				} else {
					$('#header .menu .level-1').animate({right: -windowWidth}, 500);
					$('body').removeClass('disableScroll');
				}
			});

			// Submenu
			$('#header .menu li').has('ul').append('<div class="arrow-submenu"></div>')
			$('#header .menu li a').click(function(e){
				var _li = $(this).closest('li');
				if(_li.has('ul').length){
					e.preventDefault();
					_li.siblings('.open')
						.removeClass('open')
						.find('ul').slideUp();
					_li.toggleClass('open');
					_li.find('ul').slideToggle();
					_li.find('ul ul').hide();
				}
			});
		};
	}

	/**
	 *
	 * Slideshow
	 *
	 */
	if (!executed) {
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

		$('#slideshow .description').css({'left': function(){
			return $('.wrap').offset().left;
		}});

		$('#slideshow').on('swipeleft', function() {
			clearInterval(slideInt);
			slideshow();
			slideInt = setInterval( "slideshow()", 3000);
		})

		$('#slideshow').on('swiperight', function() {
			clearInterval(slideInt);

			var $active = $('#slideshow .item.active');
			var $prev = $active.prev('.item');

			$active.fadeOut().removeClass('active');
			$('#slideshow-nav li.active').removeClass('active');

			if($prev.length > 0){
				$prev.fadeIn().addClass('active');
			} else {
				$('#slideshow .item').last().fadeIn().addClass('active');
			}

			var activeIndex = $('#slideshow .item.active').index();
			$('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

			slideInt = setInterval( "slideshow()", 3000);
		})
	}

	/**
	 *
	 * Sidebar Menu
	 *
	 */
	if (windowWidth < 992) {
		$('#sidebar ul').width(function(){
			return $('#sidebar').width() - 40
		})
		$('#selected-sidebar').click(function(){
			$('#sidebar > ul').slideToggle();
			$('#sidebar .active ul').hide();
		})
	}

	/**
	 *
	 * Content Tab
	 *
	 */
	$("#featured-menu .tab-menu").first().addClass('current');
	$(".tab-content").first().css("display", "block");
	$("#featured-menu .tab-menu").click(function(e){
		$(this).addClass('current');
		$(this).siblings().removeClass('current');
		var tab = $(this).attr('id');
		$(".tab-content").not(tab).hide();
		$(tab).fadeIn();
	});

	if (windowWidth < 992) {
		$('#tab-1 .switch-side .pull-right').removeClass('pull-right');
	}

	/**
	 *
	 * Simulation Tab
	 *
	 */
	$("#simulation-content .row").first().css("display", "block");
	$("#simulation-select select").change(function() {
		$("#simulation-content .row").css("display", "none");
		$("#simulation-content #" + this.value).fadeIn();
	});

	/**
	 *
	 * More News AJAX
	 *
	 */
	$("#news-section .col-md-4:gt(2)").hide();
	$("#more-news").click(function(e) {
		e.preventDefault();
		$("#news-section .col-md-4:gt(2)").slideDown();
		$("#news-section #more-news").hide();
		$("#news-section .link-page-news").show();
	});

	/**
	 *
	 * Sidebar Submenu
	 *
	 */
	$("#sidebar li.active").children("ul").show();
	$("#sidebar li").has("ul").append('<div class="arrow-submenu"></div>');
	$('#sidebar .arrow-submenu').on("click", function(e) {
		var _li = $(this).closest('li');
		if(_li.has('ul').length){
			if(windowWidth < 992){
				if(!_li.hasClass('active')){
					_li.toggleClass('active');
				}
			} else {
				_li.toggleClass('active');
			}
			_li.siblings().removeClass('active').find('ul').slideUp();
			_li.children('ul').slideToggle();
		};
	})

	/**
	 *
	 * Accordion
	 *
	 */
	$(".accordion .item.active").find(".item-content").show();
	$(".accordion .item-title").append('<div class="arrow"></div>');
	$(".accordion .item-title").on("click", function(e){
		var item = $(this).closest(".item");
		item.toggleClass('active').find('.item-content').slideToggle();
		item.siblings().removeClass('active').find('.item-content').slideUp();
	})

	/**
	 *
	 * Scroll to top
	 *
	 */
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 50) {
			$('#gototop').fadeIn(500);
			if (windowWidth > 992) {
				$('#gototop').css('left', function(){
					return $('#container .wrap').offset().left + $('#container .wrap').width() - 61;
				}); // Fade in the arrow
			} else {
				$('#gototop').css('right', 0);
			}
		} else {
			$('#gototop').fadeOut(500);
		}
	});
	$('#gototop').click(function() {
		$('body').animate({
			scrollTop : 0
		}, 500);
	});

	/**
	 *
	 * Sticky Menu
	 *
	 */
	if (!executed) {
		if (windowWidth >= 1200) {
			$('#sticky-menu a').click(function(){
				var stickyMenuWidth = $("#sticky-menu").width();
				var thisContent = $(this).siblings('.content');
				var otherOpenedContent = $('#sticky-menu .current').removeClass('current').siblings('.content');

				$(this).addClass('current');
				otherOpenedContent.hide();
				thisContent.show();

				if(!$('#sticky-menu').hasClass('open')){
					$('#sticky-menu').addClass('open');
					thisContent.animate({right: stickyMenuWidth}, 500);
				} else {
					thisContent.css({right: stickyMenuWidth})
				}
			});

			$('#sticky-menu .glyphicon-remove').click(function(){
				$('#sticky-menu').removeClass('open').removeClass('auto-hide');
				$('#sticky-menu .current').siblings('.content').animate({right: -320}, 500);
				$('#sticky-menu a').removeClass('current');
			});
		} else {
			stickyContentHeight = windowHeight - $('#header').height() - 30 - $("#sticky-menu").height();

			$('#sticky-menu .content').css({
				'height': stickyContentHeight,
				'bottom': -stickyContentHeight
			})

			$('#sticky-menu a').click(function(){
				var thisContent = $(this).siblings('.content');
				var otherOpenedContent = $('#sticky-menu .current').removeClass('current').siblings('.content');

				$('body').addClass('disableScroll');
				$(this).addClass('current');
				$('#sticky-menu .glyphicon-remove').css({bottom: stickyContentHeight + 25, top: 'auto'}).show();
				otherOpenedContent.hide();
				thisContent.show();

				if(!$('#sticky-menu').hasClass('open')){
					$('#sticky-menu').addClass('open');
					thisContent.animate({bottom: $("#sticky-menu").height()}, 500);
				} else {
					thisContent.css({bottom: $("#sticky-menu").height()})
				}

				$('#icon-menu-responsive').removeClass('open');
				$('#header .menu .level-1').animate({right: -windowWidth}, 500);
			});

			$('#sticky-menu .glyphicon-remove').click(function(){
				$('#sticky-menu .glyphicon-remove').animate({bottom: -stickyContentHeight}, 500);
				$('#sticky-menu .current').siblings('.content').animate({bottom: -stickyContentHeight}, 500);
				$('#sticky-menu').removeClass('open').removeClass('auto-hide');
				$('body').removeClass('disableScroll');
				$('#sticky-menu a').removeClass('current');
			});
		}
	}

	// Auto close sticky menu when idle
	var idleTime = 0;
	var idleInterval = setInterval(timerIncrement, 1000);
	$(this).mousemove(function() {
		idleTime = 0;
		if ($('#sticky-menu').hasClass('auto-hide')) {
			if (windowWidth >= 1200) {
				$('#sticky-menu')
					.removeClass('auto-hide')
					.animate({right: 0}, 500);
			}
		}
	})
	$(this).keypress(function() {
		idleTime = 0;
		if ($('#sticky-menu').hasClass('auto-hide')) {
			if (windowWidth >= 1200) {
				$('#sticky-menu')
				.removeClass('auto-hide')
				.animate({right: 0}, 500);
			}
		}
	})
	$(this).scroll(function() {
		idleTime = 0;
		if ($('#sticky-menu').hasClass('auto-hide')) {
			if (windowWidth >= 1200) {
				$('#sticky-menu')
				.removeClass('auto-hide')
				.animate({right: 0}, 500);
			} else {
				$('#sticky-menu')
				.removeClass('auto-hide')
				.animate({top: windowHeight - 60}, 500);
			}
		}	
	})
	function timerIncrement() {
		idleTime++;
		if (idleTime >= 5 && !$('#sticky-menu').hasClass('open')){ // idle time 5 seconds
			if (windowWidth >= 1200) {
				$('#sticky-menu').addClass('auto-hide');
				$('#sticky-menu').animate({right: -$('#sticky-menu').width()}, 500);
			} else {
				$('#sticky-menu').animate({top: windowHeight}, 500);
				$('#sticky-menu').addClass('auto-hide');
			}
		}
	}

	/**
	 *
	 * Utilities
	 *
	 */
	$('#sidebar-right').css("margin-top", function(){
		return $('.content-meta').height() + 50;
	})

	/**
	 * 
	 * Form Carousel
	 * 
	 */
	var frameWidth = $('.form-carousel form').width();
	$('.form-carousel .wrap-content-carousel').width(function(){
		return 3 * frameWidth;
	});
	$('.form-carousel .content-carousel').width(function(){
		return frameWidth;
	});
	$('.form-carousel .content-carousel .next-link').on('click', function(e){
		e.preventDefault();
		var nextIndexContent = $(this).closest('.content-carousel').index() + 1;
		var nextContentHeight = $(this).closest('.content-carousel').next('.content-carousel').height()
			+ $(this).closest('.form-body').find('.step-carousel').height()
			+ 70 ;
		
		$(this).closest('.form-body').height(nextContentHeight);
		$('.step-carousel li').eq(nextIndexContent).addClass('current');
		$(this)
			.closest('.content-carousel')
			.animate({marginLeft: frameWidth * -1}, 500)
			.next('.content-carousel')
			.animate({marginLeft: 0}, 500);
		$('html, body').animate({
			scrollTop: $('.form-carousel').offset().top
		}, 500);
	})
	$('.form-carousel .content-carousel .prev-link').on('click', function(e){
		e.preventDefault();
		var currentIndexContent = $(this).closest('.content-carousel').index();
		var prevContentHeight = $(this).closest('.content-carousel').prev('.content-carousel').height()
			+ $(this).closest('.form-body').find('.step-carousel').height()
			+ 70 ;
		
		$(this).closest('.form-body').height(prevContentHeight);

		$('.step-carousel li').eq(currentIndexContent).removeClass('current')
		$(this)
			.closest('.content-carousel')
			.animate({marginLeft: frameWidth}, 500)
			.prev('.content-carousel')
			.animate({marginLeft: 0}, 500)
		$('html, body').animate({
			scrollTop: $('.form-carousel').offset().top
		}, 500);
	})

	/**
	 *
	 * Carousel Caption Outside of Carousel
	 *
	 */
	$("#carousel").on('slide.bs.carousel', function(evt) {
	   var step = $(evt.relatedTarget).index();
	   $('#carousel-captions .carousel-caption').hide();
	   $('#carousel-captions #caption-' + step).fadeIn();
	});

	/**
	 *
	 * Carousel on Swipe
	 *
	 */
	$('.carousel').on('swipeleft', function() {
		$(this).carousel('next');
	}).on('swiperight', function() {
		$(this).carousel('prev');
	});

	/**
	 *
	 * Fixed Header
	 *
	 */
	if (windowWidth < 992) {
		$('.list-style-2 .description').css('width', function(){
			return windowWidth - $(this).siblings('.marker').width() - 40;
		})

		$('.list-style-3 .description').css('width', function(){
			return windowWidth - $(this).siblings('.thumbnail').width() - 20;
		})
	}

	/**
	 *
	 * Column Scroll Width
	 *
	 */
	var gridScreenWidth = windowWidth / 12;
	if (windowWidth < 768) {
		for(i = 1; i <= 12; i++){
			$(".sc-col-sm-" + i).width(gridScreenWidth * i);
		}
	}

	/**
	 *
	 * Additional Config on Extra Small Screen
	 *
	 */
	if (windowWidth < 768) {
		$(".scroll-wrap").width(function(){
			return $(this).find('.item').length * $(this).find('.item').width();
		});

		$("#slideshow .description").width(windowWidth - 20);

		$(".contact-address .address").width(function(){
			return $(this).closest('.clearfix').width() - $(this).siblings('.icon').width()
		})
	}

	/**
	 *
	 * Fixed Column Table
	 *
	 */
	if (windowWidth < 768) {
		$('.fixed-column thead tr th:first-child').addClass('headCol');
		$('.fixed-column tbody tr td:first-child').addClass('headCol');
		$('.fixed-column tfoot tr td:first-child').addClass('headCol');
		$('.fixed-column td').not('.headCol').height(function(){
			var _thisHeight = $(this).height();
			var _thisHeadColHeight = $(this).siblings('.headCol').height();
			if( _thisHeight < _thisHeadColHeight ) {
				return _thisHeadColHeight - 3;
			}
		});
		$('.fixed-column .headCol').height(function(){
			var _thisHeight = $(this).height();
			var _thisSiblingsHeight = $(this).siblings('td').height();
			if( _thisHeight < _thisSiblingsHeight ) {
				return _thisSiblingsHeight + 3;
			}
		})
	}

	/**
	 * 
	 * Sharing Social Arrow
	 *
	 */
	if( $('.sharing-social.bottom').length > 0 ) {
		var _wrapWidth = $('.sharing-social .images-wrap').width();
		var _scrollWidth = $('.sharing-social .images-wrap').get(0).scrollWidth;
		if( _wrapWidth < _scrollWidth ) {
			$('.sharing-social').find('.arrow-right').show();
		} else {
			$('.sharing-social').find('.arrow-right').hide();
		}
		if (windowWidth < 768) {
			$('.images-screen-width').scroll(function() {
				var _wrapWidth = $('.sharing-social .images-wrap').width()
				var _scrollWidth = $('.sharing-social .images-wrap').get(0).scrollWidth;
				var _scrollLeft = $('.sharing-social .images-screen-width').scrollLeft()
				if( $('.sharing-social .images-wrap').offset().left < 0 ) {
					$(this).closest('.sharing-social').find('.arrow-left').show();
				} else {
					$(this).closest('.sharing-social').find('.arrow-left').hide();
				}

				if( _scrollWidth - _scrollLeft > _wrapWidth ) {
					$(this).closest('.sharing-social').find('.arrow-right').show();
				} else {
					$(this).closest('.sharing-social').find('.arrow-right').hide();
				}
			})
		}
	}

	/**
	 *
	 * Scroll Div Arrow
	 *
	 */
	if( $('.scroll-wrap-width').length > 0 ) {
		$('.scroll-wrap-width .arrow-right').show();
		var _wrapWidth2 = $('.scroll-wrap-width .scroll-width').width();
		var _scrollWidth2 = $('.scroll-wrap-width .scroll-wrap').get(0).scrollWidth;
		$('.scroll-width').scroll(function() {
			var _wrapWidth2 = $('.scroll-wrap-width .scroll-width').width();
			var _scrollWidth2 = $('.scroll-wrap-width .scroll-wrap').get(0).scrollWidth;
			var _scrollLeft2 = $('.scroll-wrap-width .scroll-width').scrollLeft();
			if( $('.scroll-wrap').offset().left < 0 ){
				$('.scroll-wrap-width .arrow-left').show();
			} else {
				$('.scroll-wrap-width .arrow-left').hide();
			}

			if( _scrollWidth2 - _scrollLeft2 > _wrapWidth2 + 10 ) {
				$('.scroll-wrap-width .arrow-right').show();
			} else {
				$('.scroll-wrap-width .arrow-right').hide();
			}
			
		})
	}

	executed++;
});


/**
 *
 * Window On Resize
 *
 */
$(window).on('resize', function(){
	windowWidth = $(this).width();
	windowHeight = $(this).height();
	$('body').removeClass('disableScroll');

	if(windowWidth < 1200) {
		$('#icon-menu-responsive').removeClass('open');
		$('#header .menu .level-1').css({'right': -windowWidth});

		headerHeight = $('#header').height() + 30;
		stickyMenuHeight = $("#sticky-menu").height();
		stickyContentHeight = windowHeight - headerHeight - stickyMenuHeight;

		$('#sticky-menu .content').css({
			'height': stickyContentHeight,
			'bottom': -stickyContentHeight
		})

		$('#sticky-menu').css({'bottom': 0, 'top': 'auto'});
		$('#sticky-menu .glyphicon-remove').css({bottom: -stickyContentHeight});
		$('#sticky-menu .current').siblings('.content').css({bottom: -stickyContentHeight});
		$('#sticky-menu').removeClass('open').removeClass('auto-hide');
		$('#sticky-menu a.menu').removeClass('current');
		$('#sticky-menu .glyphicon-remove').css({bottom: stickyContentHeight + 25, top: 'auto'}).hide();
	}
	
	if(windowWidth < 992) {
		$('#tab-1 .switch-side .pull-right').removeClass('pull-right');
	} else {
		$('#tab-1 .switch-side > div').addClass('pull-right');
	}

	$(this).trigger('load');
})

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
