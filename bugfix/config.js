var executed = 0;

//$(window).on('load', function() {
$(document).ready(function () {
    /**
	 *
	 * Header Mega Menu
	 *
	 */
    if ($(window).width() > 1024) {
        $("#header .menu .level-2 > ul > li").has('.level-3').append('<div class="arrow-submenu"></div>');
        $("#header .menu .level-2 > ul > li").on("mouseover", function () {
            if ($(this).has('.level-3').length) {
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
    if ($(window).width() < 1024) {
        $('#header .menu .level-1').css({ 'right': - $(window).width() });
    }

    var dEvent = 'click';
    if ($('html').hasClass('ipad') && $(window).width() < 1024){
        dEvent = 'hover';
    }

    $('#icon-menu-responsive').on(dEvent, function (e) {
        if ($(window).width() < 1024) {
            $(this).toggleClass('open');
            if ($(this).hasClass('open')) {
                $('#header .menu .level-1').animate({ right: "0px" }, 500);
                if ($('#sticky-menu').hasClass('open')){
                    $('#sticky-menu .close-classic').trigger('click');
                }
                $('body').addClass('disableScroll');
                $('#header').css('position', 'fixed');
            } else {
                $('#header .menu .level-1').animate({ right: - $(window).width() }, 500);
                $('body').removeClass('disableScroll');
                $('#header').css('position', 'fixed');
            }
            
        }
    });

    $('#icon-menu-responsive').hover(function() {
        $(this).trigger('click');
    })

    // Submenu
    $('#header .menu li').has('ul').append('<div class="arrow-submenu-wrapper"><div class="arrow-submenu"></div></div>')
    $('#header .menu li .arrow-submenu-wrapper').on(dEvent, function (e) {
        var _li = $(this).closest('li');
        if (_li.has('ul').length) {
            e.preventDefault();
            _li.siblings('.open').removeClass('open').find('ul').slideUp();
            _li.toggleClass('open');
            _li.find('ul').slideToggle();
            _li.find('ul ul').hide();
        }
    });

    /**
	 *
	 * Slideshow
	 *
	 */
    if (!executed) {
        $('#slideshow .item').css('display', 'none');

        $('#slideshow .item').first().fadeIn().addClass('active');
        var slideInt = setInterval("slideshow()", 3000);

        $('#slideshow-nav').append(function () {
            var nav = '<ul>';

            for (i = 0; i < $('#slideshow .item').length; i++) {
                nav += '<li data-id="' + i + '"></li>';
            }
            nav += '</ul>';

            return nav;
        });/*.css("margin-left", function(){
			return 0;//-$(window).width()/2;
		});*/
	if($(window).height() > 1024) {
        $('#slideshow').css('height', function () {
            var h = $(this).find('.item img').height();
            if (h <= 80) {
                h = $('#slideshow').data('image-height');
                if (h == '' || h <= 80) {
                    h = 480;
                }
            }

            return h + 'px';
        });
	}
        $('#slideshow-nav li').first().addClass('active');

        $('#slideshow-nav li').on('click', function () {
            clearInterval(slideInt);

            $('#slideshow-nav li.active').removeClass('active');
            $(this).addClass('active');

            var index = $(this).data('id');

            $('#slideshow .item.active').fadeOut().removeClass('active');
            $("#slideshow .item:eq(" + index + ")").fadeIn().addClass('active');

            if ($('#slideshow').hasClass('stop')) {
                clearInterval(slideInt);
            }
            else {
                slideInt = setInterval("slideshow()", 3000);
            }

        });

        $('#slideshow .item').each(function () {
            if ($(this).find('.description').hasClass('left-pos')) {
                $(this).find('.description').css({
                    'left': function () {
                        return $('.wrap').offset().left;
                    }
                });
            }
            else if ($(this).find('.description').hasClass('right-pos')) {
                $(this).find('.description').css({
                    'right': function () {
                        return $('.wrap').offset().left;
                    }
                });
            }
        });
        //if ($('#slideshow .description').hasClass('left-pos')) {
        //    $('#slideshow .description').css({
        //        'left': function () {
        //            return $('.wrap').offset().left;
        //        }
        //    });
        //}
        //else if($('#slideshow .description').hasClass('right-pos')){
        //    $('#slideshow .description').css({
        //        'right': function () {
        //            return $('.wrap').offset().right;
        //        }
        //    });
        //}
        //  if ($(".stop")[1]) {
        //clearInterval(slideInt);
        // }
        $('#slideshow').on('swipeleft', function (e) {
            clearInterval(slideInt);
            slideshow();
            slideInt = setInterval("slideshow()", 3000);
        })

        $('#slideshow').on('swiperight', function (e) {
            clearInterval(slideInt);

            var $active = $('#slideshow .item.active');
            var $prev = $active.prev('.item');

            $active.fadeOut().removeClass('active');
            $('#slideshow-nav li.active').removeClass('active');

            if ($prev.length > 0) {
                $prev.fadeIn().addClass('active');
            } else {
                $('#slideshow .item').last().fadeIn().addClass('active');
            }

            var activeIndex = $('#slideshow .item.active').index();
            $('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

            slideInt = setInterval("slideshow()", 3000);
        });
        executed++;
    }

    /**
	 *
	 * Sidebar Menu
	 *
	 */
    if ($(window).width() < 992) {
        $('#sidebar ul').width(function () {
            return $('#sidebar').width() - 40
        })
        $('#selected-sidebar').click(function () {
            $('#sidebar > ul').slideToggle(500, function() {
                var sidebarHeight = $('#sidebar').height();
                var submenuSidebarHeight = $('#sidebar > ul').height();
                var contentWrapperHeight = $('#content-wrapper').height();
                if(contentWrapperHeight < sidebarHeight + submenuSidebarHeight){
                    $('#content-wrapper').animate({height: sidebarHeight + submenuSidebarHeight}, 500);
                }
		//else{
		//	 $('#content-wrapper').animate({height: contentWrapperHeight}, 500);
		//}
            });
            $('#sidebar .active ul').hide();
        });
    }
    //RESPONSIVE TABLE
    var tablecount = 0;
    var divClass = '';
    var currwidth = $(window).width();
    if (currwidth < 992) {
        divClass = " fixed-column ";
    }
    $('.content-page-body>div').find('table').each(function () {

        if (currwidth < 768) {
            $(this).find('td').removeAttr("style");
        }

        $(this).addClass('table table-color table-content');
        //$(this).find('table').find('table tr:first td').css('background', 'red');
        var hasColumn = $(this).filter(function () {
            return this.textContent === 'Col 1';
        }).length > 0;
        if (!hasColumn) {
            $(this).find('tr:first td').addClass('thead');
        }

        // if (table != null) {
        $('<div class="table-responsive' + divClass + ' resp-table' + tablecount + '"></div>').insertAfter($(this));
        $(this).appendTo('.resp-table' + tablecount);
        tablecount++;
        // }
    });

    /**
	 *
	 * Content Tab
	 *
	 */
    //$("#featured-menu .tab-menu").first().addClass('current');
    //$(".tab-content").first().css("display", "block");
    //$("#featured-menu .tab-menu").click(function (e) {
    //    $(this).addClass('current');
    //    $(this).siblings().removeClass('current');
    //    var tab = $(this).attr('id');
    //    $(".tab-content").not(tab).hide();
    //    $(tab).fadeIn();
    //});

    //if ($(window).width() < 992) {
    //    $('#tab-1 .switch-side .pull-right').removeClass('pull-right');
    //}

    $("#featured-menu .tab-menu").first().addClass('current');
    $(".tab-content").first().css("display", "block");
    $("#featured-menu .tab-menu").click(function (e) {
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
        if ($(this).find('.submenu').length == 0) {
            var tab = $(this).attr('id');
            $(".tab-content").not(tab).hide();
            $(tab).fadeIn();
        }
    });

    $("#featured-menu .tab-submenu").click(function (e) {

        var tab = $(this).attr('id');
        $(".tab-content").not(tab).hide();
        $(tab).fadeIn();
    });


    ///**
    //*
    //* Simulation Tab
    //*
    //**/
    //// $("#simulation-content .row").first().css("display", "block");
    //$("#simulation-select select").change(function () {
    //    $("#simulation-content .row").css("display", "none");
    //    $("#simulation-content #" + this.value).fadeIn();
    //});


    $("#PressRelease").hide();
    $("#ListAll").show();
    $("#Berita").hide();
    $("#Article").hide();

    $("#news-section #ListAll .col-md-4:gt(2)").hide();
    $("#news-section #Berita .col-md-4:gt(2)").hide();
    $("#news-section #Article .col-md-4:gt(2)").hide();
    $("#news-section #PressRelease .col-md-4:gt(2)").hide();

    //$(".col-md-4:gt(2)").hide();

    //$("#more-news").click(function (e) {
    //    e.preventDefault();
    //    $("#news-section .col-md-4:gt(2)").slideDown();
    //    $("#news-section #more-news").hide();
    //    $("#news-section .link-page-news").show();

    //    $("#news-section #Berita .col-md-4:gt(2)").slideDown();
    //    $("#news-section #Article .col-md-4:gt(2)").slideDown();
    //    $("#news-section #PressRelease .col-md-4:gt(2)").slideDown();
    //});

    //$("#tab-1 #promo-section .col-md-4:gt(2)").hide();
    //$("#more-news-1").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-1 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-1 #promo-section #more-news-1").show();
    //});

    //$("#tab-2 #promo-section .col-md-4:gt(2)").hide();
    //$("#more-news-2").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-2 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-2 #promo-section #more-news-2").show();
    //});

    //$("#tab-3 #promo-section .col-md-4:gt(2)").hide();
    //$("#more-news-3").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-3 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-3 #promo-section #more-news-3").show();
    //});

    //$("#tab-4 #promo-section .col-md-4:gt(2)").hide();
    //$("#more-news-4").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-4 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-4 #promo-section #more-news-4").show();
    //});

    //$("#tab-5 #promo-section .col-md-4:gt(2)").hide();

    //$("#more-news-5").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-5 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-5 #promo-section #more-news-5").show();
    //});

    //$("#tab-6 #promo-section .col-md-4:gt(2)").hide();
    //$("#more-news-6").click(function (e) {
    //    e.preventDefault();
    //    $("#tab-6 #promo-section .col-md-4:gt(2)").slideToggle();
    //    $("#tab-6 #promo-section #more-news-6").show();
    //});

    $(".lifestage-content .lifestage-item").each(function () {
        $(this).find(".col-md-4:gt(3)").hide();
    });

    $(".more-newscard-toggle").click(function () {
        var $el = $(this);
        var textMore = 'Lainnya';
        var textHide = 'Sembunyikan';
        var lang = $('html').attr('lang');
        if (lang == 'id') {
            textMore = 'Lainnya';
            textHide = 'Sembunyikan';
        }
        else if (lang == 'en') {
            textMore = 'More';
            textHide = 'Hide';
        }
        $(this).parent().parent().find(".col-md-4:gt(2)").slideToggle('slow', function () {
            $el.removeClass('arrow-bottom');
            $el.addClass('arrow-top');
            $el.html('<strong>' + textHide + '</strong>');
            if ($(this).is(":hidden")) {
                $el.removeClass('arrow-top');
                $el.addClass('arrow-bottom');
                $el.html('<strong>' + textMore + '</strong>');
            }
        });
    });

    if ($(".stop")[0]) {
        clearInterval(slideInt);
        $("#tab-1 #promo-section .col-md-4:gt(2)").slideDown();
    }

    /**
	 *
	 * Sidebar Submenu
	 *
	 */
    //$("#sidebar li.active").children("ul").show();
    //$("#sidebar > ul > li.active").prependTo("#sidebar > ul");
    //$("#sidebar li").has("ul").append('<div class="click-area"><div class="arrow-submenu"></div></div>');
    //$('#sidebar .click-area').on("click", function (e) {
    //    var _li = $(this).closest('li');
    //    if (_li.has('ul').length) {
    //        if ($(window).width() < 992) {
    //            if (!_li.hasClass('active')) {
    //                _li.toggleClass('active');
    //            }
    //        } else {
    //            _li.toggleClass('active');
    //        }
    //        _li.siblings().removeClass('active').find('ul').slideUp();
    //        _li.children('ul').slideToggle();
    //    };
    //});
    //update yoga 19-09-2017====
    $("#sidebar li.active").children("ul").show();
    $("#sidebar > ul > li.active").prependTo("#sidebar > ul");
    $("#sidebar li").has("ul").append('<div class="click-area"><div class="arrow-submenu"></div></div>');
    $('#sidebar .click-area').on("click", function (e) {
        var _li = $(this).closest('li');
        if (_li.has('ul').length) {
            if ($(window).width() < 992) {
                if (!_li.hasClass('active')) {
                    _li.toggleClass('active');
                }
            } else {
                _li.toggleClass('active');
            }
            _li.siblings().removeClass('active').find('ul').slideUp();
            _li.children('ul').slideToggle(500, function () {
                var sidebarHeight = $('#sidebar').height();
                var submenuSidebarHeight = $('#sidebar > ul').height();
                var contentWrapperHeight = $('#content-wrapper').height();
                if(contentWrapperHeight < sidebarHeight + submenuSidebarHeight){
                    $('#content-wrapper').animate({height: sidebarHeight + submenuSidebarHeight}, 500);
                }
            });
        };
    });
    //end update yoga 19-09-2017====
    /**
	 *
	 * Accordion
	 *
	 */
    $(".accordion .item.active").find(".item-content").show();
    $(".accordion .item-title").append('<div class="arrow"></div>');
    $(".accordion .item-title").on("click", function (e) {
        var item = $(this).closest(".item");
        item.toggleClass('active').find('.item-content').slideToggle();
        item.siblings().removeClass('active').find('.item-content').slideUp();
    })

    /**
     *
     * Scroll to top
     *
     */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('#gototop').fadeIn(500);
            // $('#breadcrumb').addClass('breadcrum-fixed');
            if ($(window).width() > 992) {
                $('#gototop').css('left', function () {
                    return $('#container .wrap').offset().left + $('#container .wrap').width() - 61;
                }); // Fade in the arrow
            } else {
                $('#gototop').css('right', 0);
            }
        } else {
            $('#gototop').fadeOut(500);
            // $('#breadcrumb').removeClass('breadcrum-fixed');

        }
    });
    $('#gototop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /**
     *
     * Sticky Menu
     *
     */
    if ($(window).width() >= 1024) {
        $('#sticky-menu a.menu').click(function () {
            var stickyMenuWidth = $("#sticky-menu").width();
            var thisContent = $(this).siblings('.content');
            var thisIndex = thisContent.closest('li').index();
            var otherOpenedContent = $('#sticky-menu .current').removeClass('current').siblings('.content');
            var otherOpenedIndex = otherOpenedContent.closest('li').index();
            otherOpenedContent.animate({ right: -320 }, 500);
            $('#sticky-menu .close-classic').animate({ right: -320 }, 500);
            if (thisIndex != otherOpenedIndex) {
                $(this).addClass('current');
	        $('#sticky-menu .close-classic').animate({ right: 100 }, 20);
                thisContent.animate({ right: stickyMenuWidth }, 500);
            } else {
		$(this).find('a').removeClass('current');
                $('#sticky-menu').removeClass('open');
            }

            if (!$('#sticky-menu').hasClass('open'))
                $('#sticky-menu').addClass('open');
	    
			
		
        });

        //$('#sticky-menu .glyphicon-remove').click(function () {
        //    $('#sticky-menu>ul').addClass('box-shadow');
        //    $('#sticky-menu').removeClass('open').removeClass('auto-hide');
        //    $('#sticky-menu .current').siblings('.content').animate({ right: -320 }, 500);
        //    $('#sticky-menu .glyphicon-remove').animate({ right: -320 }, 500);
        //    $('#sticky-menu a').removeClass('current');
        //});
        $('#sticky-menu .close-classic').click(function () {
            $('#sticky-menu>ul').addClass('box-shadow');
            $('#sticky-menu').removeClass('open').removeClass('auto-hide');
            $('#sticky-menu .current').siblings('.content').animate({ right: -320 }, 500);
            $('#sticky-menu .close-classic').animate({ right: -320 }, 500);
            $('#sticky-menu a.menu').removeClass('current');
        });
    } else {
        var windowHeight = $(window).height();
        var headerHeight = $('#header').height() + 30;
        var stickyMenuHeight = $("#sticky-menu").height();
        var stickyContentHeight = windowHeight - headerHeight - stickyMenuHeight;
        $('#sticky-menu .content').css({
            'height': stickyContentHeight,
            'bottom': -stickyContentHeight
        })

        $('#sticky-menu a.menu').click(function () {
            stickyContentHeight = windowHeight - headerHeight - stickyMenuHeight;
            var thisContent = $(this).siblings('.content');
            var otherOpenedContent = $('#sticky-menu .current').removeClass('current').siblings('.content');

            $('body').addClass('disableScroll');
            $(this).addClass('current');
            //$('#sticky-menu .glyphicon-remove').css({ bottom: stickyContentHeight + 25, top: 'auto' })
            $('#sticky-menu .close-classic').css({ bottom: stickyContentHeight + 25, top: 'auto' })
            otherOpenedContent.hide();
            thisContent.show();

            if (!$('#sticky-menu').hasClass('open')) {
                $('#sticky-menu').addClass('open');
                thisContent.animate({ bottom: stickyMenuHeight }, 500);
            } else {
                thisContent.css({ bottom: stickyMenuHeight })
            }

            $('#header').css({
                'position': 'fixed',
                'width': '100%'
            });
            //$('#sticky-menu .glyphicon-remove').show();
            $('#sticky-menu .close-classic').show();
            $('#icon-menu-responsive').removeClass('open');
            $('#header .menu .level-1').animate({ right: -menuWidth }, 500);
        });

        //$('#sticky-menu .glyphicon-remove').click(function () {
        //    $('#sticky-menu .glyphicon-remove').hide();
        //    $('#sticky-menu .current').siblings('.content').animate({ bottom: -stickyContentHeight }, 500);
        //    //$('#header').css({ 'position': 'absolute' });
        //    $('#sticky-menu').removeClass('open').removeClass('auto-hide');
        //    $('body').removeClass('disableScroll');
        //    $('#sticky-menu a').removeClass('current');
        //});
        $('#sticky-menu .close-classic').click(function () {
            $('#sticky-menu .close-classic').hide();
            $('#sticky-menu .current').siblings('.content').animate({ bottom: -stickyContentHeight }, 500);
            //$('#header').css({ 'position': 'absolute' });
            $('#sticky-menu').removeClass('open').removeClass('auto-hide');
            $('body').removeClass('disableScroll');
            $('#sticky-menu a').removeClass('current');
        });
    }

    // Auto close sticky menu when idle
    var idleTime = 0;
    var idleInterval = setInterval(timerIncrement, 1000);
    $(this).mouseover(function () {
        idleTime = 0;
        if ($('#sticky-menu').hasClass('auto-hide')) {
            if ($(window).width() >= 1024) {
                $('#sticky-menu')
					.removeClass('auto-hide')
					.animate({ right: 0 }, 500);
            }
        }
    })
    $(this).keypress(function () {
        idleTime = 0;
        if ($('#sticky-menu').hasClass('auto-hide')) {
            if ($(window).width() >= 1024) {
                $('#sticky-menu')
				.removeClass('auto-hide')
				.animate({ right: 0 }, 500);
            }
        }
    })
    $(this).scroll(function () {
    idleTime = 0;
    if ($('#sticky-menu').hasClass('auto-hide')) {
        if ($(window).width() >= 1024) {
            $('#sticky-menu')
            .removeClass('auto-hide')
            .animate({ right: 0 }, 500);
        } else {
            $('#sticky-menu')
            .removeClass('auto-hide')
//            .animate({top: windowHeight - 80}, 500);
            .animate({bottom: 0}, 500);
        }
    }
});
    function timerIncrement() {
        idleTime++;
        if (idleTime >= 3 && !$('#sticky-menu').hasClass('open')) { // idle time 5 seconds
            if ($(window).width() >= 1024) {
                $('#sticky-menu').addClass('auto-hide');
                $('#sticky-menu').animate({ right: -$('#sticky-menu').width() }, 500);
            } else {
//                $('#sticky-menu').animate({ top: windowHeight + 100 }, 500);
                $('#sticky-menu').animate({ bottom: -80 }, 500);
                $('#sticky-menu').addClass('auto-hide');
            }
        }
    }

    /**
	 *
	 * Utilities
	 *
	 */
    $('#sidebar-right').css("margin-top", function () {
        return $('.content-meta').height() + 50;
    })

    /**
	 * 
	 * Form Carousel
	 * 
	 */
    var frameWidth = $('.form-carousel form').width();
    $('.form-carousel .wrap-content-carousel').width(function () {
        return 3 * frameWidth;
    });
    $('.form-carousel .content-carousel').width(function () {
        return frameWidth;
    });
    $('.form-carousel .content-carousel .next-link').on('click', function (e) {
        e.preventDefault();
        var nextIndexContent = $(this).closest('.content-carousel').index() + 1;
        var nextContentHeight = $(this).closest('.content-carousel').next('.content-carousel').height()
			+ $(this).closest('.form-body').find('.step-carousel').height()
			+ 70;

        $(this).closest('.form-body').height(nextContentHeight);
        $('.step-carousel li').eq(nextIndexContent).addClass('current');
        $(this)
			.closest('.content-carousel')
			.animate({ marginLeft: frameWidth * -1 }, 500)
			.next('.content-carousel')
			.animate({ marginLeft: 0 }, 500);
        $('html, body').animate({
            scrollTop: $('.form-carousel').offset().top
        }, 500);
    })
    $('.form-carousel .content-carousel .prev-link').on('click', function (e) {
        e.preventDefault();
        var currentIndexContent = $(this).closest('.content-carousel').index();
        var prevContentHeight = $(this).closest('.content-carousel').prev('.content-carousel').height()
			+ $(this).closest('.form-body').find('.step-carousel').height()
			+ 70;

        $(this).closest('.form-body').height(prevContentHeight);

        $('.step-carousel li').eq(currentIndexContent).removeClass('current')
        $(this)
			.closest('.content-carousel')
			.animate({ marginLeft: frameWidth }, 500)
			.prev('.content-carousel')
			.animate({ marginLeft: 0 }, 500)
        $('html, body').animate({
            scrollTop: $('.form-carousel').offset().top
        }, 500);
    })

    /**
	 *
	 * Carousel Caption Outside of Carousel
	 *
	 */
    $("#carousel").on('slide.bs.carousel', function (evt) {
        var step = $(evt.relatedTarget).index();
        $('#carousel-captions .carousel-caption').hide();
        $('#carousel-captions #caption-' + step).fadeIn();
    });

    /**
	 *
	 * Fixed Header
	 *
	 */
    if ($(window).width() < 992) {
        //   var currentPosition = 0
        //   $(window).scroll(function () {
        //      if ($(this).scrollTop() > 109) {
        //           if ($(this).scrollTop() < currentPosition) {
        //               $('#header').css('position', 'fixed');
        //           } else {
        //              $('#header').css('position', 'absolute');
        //          }
        //       } else {
        //          $('#header').css('position', 'absolute');
        //      }
        //      currentPosition = $(this).scrollTop()
        //  })

        $('.list-style-2 .description').css('width', function () {
            return $(window).width() - $(this).siblings('.marker').width() - 40;
        })

        $('.list-style-3 .description').css('width', function () {
	    var diff = 48
            if($(window).width() < 768) diff = 30;
            return $(window).width() - $(this).siblings('.thumbnail').width() - diff;
        })
    }

    /**
         *
         * Column Scroll Width
         *
         */
    var gridScreenWidth = Math.floor($(window).width() / 12);
    if ($(window).width() <= 768) {
        for (i = 1; i <= 12; i++) {
            $(".sc-col-sm-" + i).width(gridScreenWidth * i);
        }
    }

    /**
	 *
	 * Additional Config on Extra Small Screen
	 *
	 */
    if ($(window).width() <= 768) {
        //don't remove this!!!
        $(".scroll-wrap").width(function () {
            if (this.id != 'featured-menu') {
                return $(this).find('.item').length * $(this).find('.item').width();
            }
        });

        $("#slideshow .description").width($(window).width() - 20);

        $(".contact-address .address").width(function () {
            return $(this).closest('.clearfix').width() - $(this).siblings('.icon').width()
        });
    }

    /**
	 *
	 * Fixed Column Table
	 *
	 */
    if ($(window).width() < 768) {
        $('.fixed-column thead tr th:first-child').addClass('headCol');
        $('.fixed-column tbody tr td:first-child').addClass('headCol');
        $('.fixed-column tfoot tr td:first-child').addClass('headCol');
        $('.fixed-column td').not('.headCol').height(function () {
            var _thisHeight = $(this).height();
            var _thisHeadColHeight = $(this).siblings('.headCol').height();
            if (_thisHeight < _thisHeadColHeight) {
                return _thisHeadColHeight - 3;
            }
        });
        $('.fixed-column .headCol').height(function () {
            var _thisHeight = $(this).height();
            var _thisSiblingsHeight = $(this).siblings('td').height();
            if (_thisHeight < _thisSiblingsHeight) {
                return _thisSiblingsHeight + 3;
            }
        })
    }

    /**
	 * 
	 * Sharing Social Arrow
	 *
	 */
    if ($('.sharing-social.bottom').length > 0) {
        var _wrapWidth = $('.sharing-social .images-wrap').width();
        var _scrollWidth = $('.sharing-social .images-wrap').get(0).scrollWidth;
        if (_wrapWidth < _scrollWidth) {
            $('.sharing-social').find('.arrow-right').show();
        } else {
            $('.sharing-social').find('.arrow-right').hide();
        }
        if ($(window).width() < 768) {
            $('.images-screen-width').scroll(function () {
                var _wrapWidth = $('.sharing-social .images-wrap').width()
                var _scrollWidth = $('.sharing-social .images-wrap').get(0).scrollWidth;
                var _scrollLeft = $('.sharing-social .images-screen-width').scrollLeft()
                if ($('.sharing-social .images-wrap').offset().left < 0) {
                    $(this).closest('.sharing-social').find('.arrow-left').show();
                } else {
                    $(this).closest('.sharing-social').find('.arrow-left').hide();
                }

                if (_scrollWidth - _scrollLeft > _wrapWidth) {
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
    if ($('.scroll-wrap-width').length > 0) {
        $('.scroll-wrap-width .arrow-right').show();
        var _wrapWidth2 = $('.scroll-wrap-width .scroll-width').width();
        var _scrollWidth2 = $('.scroll-wrap-width .scroll-wrap').get(0).scrollWidth;
        $('.scroll-width').scroll(function () {
            var _wrapWidth2 = $('.scroll-wrap-width .scroll-width').width();
            var _scrollWidth2 = $('.scroll-wrap-width .scroll-wrap').get(0).scrollWidth;
            var _scrollLeft2 = $('.scroll-wrap-width .scroll-width').scrollLeft();
            if ($('.scroll-wrap').offset().left < 0) {
                $('.scroll-wrap-width .arrow-left').show();
            } else {
                $('.scroll-wrap-width .arrow-left').hide();
            }

            if (_scrollWidth2 - _scrollLeft2 > _wrapWidth2 + 10) {
                $('.scroll-wrap-width .arrow-right').show();
            } else {
                $('.scroll-wrap-width .arrow-right').hide();
            }

        })
    }

    if ($(window).width() < 992 && $('.content-page-body table').closest('.table-responsive').length == 0) {
        $('.content-page-body table').wrap('<div class="table-responsive"></div>');
    }

    $('.carousel-inner').each(function () {
         $(this).find('.item').first().addClass('active');
    });
    
    $('.arrow-scroll.arrow-right').click(function () {
        var scrollWidth = $(this).siblings('.scroll-width');
        var leftOffset = scrollWidth.scrollLeft();
        scrollWidth.animate({
            scrollLeft: leftOffset + 157
        }, 500);
    });

    $('.arrow-scroll.arrow-left').click(function () {
        var scrollWidth = $(this).siblings('.scroll-width');
        var leftOffset = scrollWidth.scrollLeft();
        scrollWidth.animate({
            scrollLeft: leftOffset - 157
        }, 500);
    });

    $('.carousel').on('swipeleft', function () {
        $(this).carousel('next');
    }).on('swiperight', function () {
        $(this).carousel('prev');
    });
    
    if($(window).width() < 1024) {
        $('#content-page').closest('.col-md-9').css({clear: 'both'});
    }

});

//var j = jQuery.noConflict();
//j(window).on('load', function () {
//    var slideInt = setInterval("slideshow()", 3000);
//    j('#slideshow').on('swipeleft', function ($) {
//        clearInterval(slideInt);
//        slideshow();
//        slideInt = setInterval("slideshow()", 3000);
//    });
//    j('#slideshow').on('swiperight', function ($) {
//        clearInterval(slideInt);
//        var $active = j('#slideshow .item.active');
//        var $prev = $active.prev('.item');
//        $active.fadeOut().removeClass('active');
//        j('#slideshow-nav li.active').removeClass('active');

//        if ($prev.length > 0) {
//            $prev.fadeIn().addClass('active');
//        } else {
//            j('#slideshow .item').last().fadeIn().addClass('active');
//        }

//        var activeIndex = j('#slideshow .item.active').index();
//        j('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

//        slideInt = setInterval("slideshow()", 3000);
//    });
//});
/**
 *
 * Window On Resize
 *
 */
var prevWindowWidth = $(window).width();
$(window).on('resize', function () {
    if ($(this).width() != prevWindowWidth) {
        $('body').removeClass('disableScroll');
        if ($(window).width() < 1024) {
            $('#icon-menu-responsive').removeClass('open');
            $('#header .menu .level-1').css({ 'right': -$(window).width() });
        }

        if ($(window).width() < 992) {
            $('#tab-1 .switch-side .pull-right').removeClass('pull-right');
        } else {
            $('#tab-1 .switch-side > div').addClass('pull-right');
        }

        $(this).trigger('load');
    }
    prevWindowWidth = $(this).width();
});

function slideshow() {
    var $active = $('#slideshow .item.active');
    var $next = $active.next('.item');

    $active.fadeOut().removeClass('active');
    $('#slideshow-nav li.active').removeClass('active');

    if ($next.length > 0) {
        $next.fadeIn().addClass('active');
    } else {
        $('#slideshow .item').first().fadeIn().addClass('active');
    }

    var activeIndex = $('#slideshow .item.active').index();
    $('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

}
