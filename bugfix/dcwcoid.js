$(document).ready(function () {
    var placeEmail = '';
    var lang = $('html').attr('lang');
    if (lang == 'id') {

        placeEmail = 'Masukkan email Anda';
    }
    else if (lang == 'en') {
        placeEmail = 'Input your email';
    }
    //create accordion buttton
    //$('#featured-menu').find('.tab-menu').each(function () {
    //    var tabhtml = $(this).html();
    //    var tab = $(this).attr('id');
    //    $('<div class="accordion-lifestage accor-control" data-content="' + tab + '">' + tabhtml + '</div>').insertBefore(tab);
    //});
    //$('.accordion-items').find('.accordion-item').each(function () {
    //    var contentId = 'accor-content' + counter;
    //    var title = $(this).find('.accordion-item-title').text();
    //    $(this).attr('id', contentId);
    //    $('<div class="accordion-control col-sm-4" data-content="#' + contentId + '">' + title + '</div>').insertBefore('#' + contentId);
    //    counter++;
    //});
    var counter = 0;
    $(".accor-control").click(function (e) {
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
        var tab = $(this).data('content');
        $(".tab-content").not(tab).hide();
        $(tab).fadeIn();

    });
    $(".accordion-control").click(function (e) {
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
        var tab = $(this).data('content');
        $(".accordion-item").not(tab).hide();
        $(tab).fadeIn();

    });
    if ($(".dcwcoid-newsletter .form-group") != null) {
        var formcounter = 0;
        //var btnLinkConfirmation = '<input id="btn-confirm" type="button" style="display:none;" value="DAFTAR" />';
        //$(".dcwcoid-newsletter .form-group").each(function () {
            //$(this).addClass('form-group-' + formcounter);
            //if (formcounter > 0) {
              //  $(this).css('display', 'none');
            //}
            //formcounter++;
        //});
        //$('.dcwcoid-newsletter .form-group .checkbox input[type="checkbox"]').attr('checked', 'true');

        //$('.dcwcoid-newsletter .form-submit-border .btn-default').css('display', 'none');
        //$(btnLinkConfirmation).insertBefore('.dcwcoid-newsletter .form-submit-border .btn-default');
    }

    var form_newsletter = $(".form-dcwcoid .dcwcoid-newsletter");
    if (form_newsletter != null) {

        form_newsletter.addClass(' wrap clearfix');
        // form_newsletter.find(".form-group").addClass("col-sm-10");
        // form_newsletter.find(".form-submit-border").addClass("col-sm-2");

        //$(".form-dcwcoid .dcwcoid-newsletter .form-control").insertBefore(".form-dcwcoid .dcwcoid-newsletter .btn");
        $('<div class="col-sm-7 text-label"></div><div class="col-sm-5 text-button"></div>').insertBefore(".form-dcwcoid .dcwcoid-newsletter .form-submit-border");
        $('.form-dcwcoid .dcwcoid-newsletter input[type="checkbox"]').parent().css('line-height', '20px');
        $(".form-dcwcoid .dcwcoid-newsletter .form-group").appendTo(".form-dcwcoid .dcwcoid-newsletter .text-button");
        $(".form-dcwcoid .dcwcoid-newsletter .form-submit-border").appendTo(".form-dcwcoid .dcwcoid-newsletter .text-button");
        $(".form-dcwcoid .dcwcoid-newsletter .control-label").appendTo(".form-dcwcoid .dcwcoid-newsletter .text-label");
        var labelcount = 0;
        $('.text-label .control-label').each(function () {
            $(this).addClass('control-label-' + labelcount);
            labelcount++;
        });
        $('.form-dcwcoid .dcwcoid-newsletter .text-label .control-label-1').css('display', 'none');
        form_newsletter.parent().css('background', '#e7e7e9');
    }
    var longtext = $('.news-more-less').text();
    $('.news-more-less').data('more', longtext);
    $('.news-more-less').text(trim_words(longtext, 200) + '...');

    $('<a href="#.news-more-less" style="font-weight:bolder;" class="link-more-less news-link orange arrow arrow-green">Selengkapnya</a>').insertAfter('.news-more-less');

    $(".link-more-less").click(function () {
        if ($('.news-more-less').data('more') != '') {
            var lesstext = $('.news-more-less').text().replace('...', '');
            $('.news-more-less').data('less', lesstext);
            $('.news-more-less').text($('.news-more-less').data('more'));
            $('.news-more-less').data('more', '');
            $('.link-more-less').text('Sedikitkan').addClass('arrow-left').removeClass('arrow arrow-green ');
        }
        else {
            var longtext = $('.news-more-less').text();
            $('.news-more-less').data('more', longtext);
            $('.news-more-less').text($('.news-more-less').data('less') + '...');
            $('.link-more-less').text('Selengkapnya').addClass('arrow arrow-green').removeClass('arrow-left');
        }
    });
    $("#btn-confirm").click(function () {
        //var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        //var email = $('.dcwcoid-newsletter input[type=email]').val();
        //if ('.dcwcoid-newsletter input[type=email]') {
        //    if ($('.dcwcoid-newsletter input[type=email]').val() == '') {        
        //        if ($('.dcwcoid-newsletter .validation-summary-valid ul .cust-empty').text() == '') {
        //            if ($('.dcwcoid-newsletter .validation-summary-valid ul .cust-wrong-format').text() != '') {
        //                $('.dcwcoid-newsletter .validation-summary-valid ul .cust-wrong-format').remove();
        //            }
        //            $('.validation-summary-valid ul').append('<li class="cust-empty cust-error list-group-item list-group-item-danger">The Fill field is required.</li>');
        //        }
        //    }
        //    else if (!re.test(email)) {
        //        if ($('.dcwcoid-newsletter .validation-summary-valid ul .cust-wrong-format').text() == '') {
        //            if ($('.dcwcoid-newsletter .validation-summary-valid ul .cust-empty').text() != '')
        //            {
        //                $('.dcwcoid-newsletter .validation-summary-valid ul .cust-empty').remove();
        //            }
        //            $('.validation-summary-valid ul').append('<li class="cust-wrong-format cust-error list-group-item list-group-item-danger">Email format is wrong.</li>');
        //        }
        //    }
        //    else {
        //        $(this).css('display', 'none');
        //        $('.cust-error').remove(); 
        //        $('.dcwcoid-newsletter .form-group-0').addClass('has-success');
        //        $('.dcwcoid-newsletter .form-submit-border .btn-default').css('display', 'block');
        //        $(".dcwcoid-newsletter .form-group-0").css('display', 'none');
        //        $(".dcwcoid-newsletter .form-group-1").css('display', 'block');    
        //        $(".form-dcwcoid .dcwcoid-newsletter .control-label-0").css('display', 'none');
        //        $(".form-dcwcoid .dcwcoid-newsletter .control-label-1").css('display', 'block');
        //    }
        //}

    });
    var src;
    $('#follow-us .Twitter img').hover(function () {
        src = $(this).attr('src');
        $(this).attr('src', '/styles/dcwcoid/img/twitter-hover.png');
    }, function () {
        $(this).attr('src', src);
    });
    $('#follow-us .Facebook img').hover(function () {
        src = $(this).attr('src');
        $(this).attr('src', '/styles/dcwcoid/img/facebook-hover.png');
    }, function () {
        $(this).attr('src', src);
    });
    $('#follow-us .LinkedIn img').hover(function () {
        src = $(this).attr('src');
        $(this).attr('src', '/styles/dcwcoid/img/linkedin-hover.png');
    }, function () {
        $(this).attr('src', src);
    });
    $('#follow-us .Youtube img').hover(function () {
        src = $(this).attr('src');
        $(this).attr('src', '/styles/dcwcoid/img/youtube-hover.png');
    }, function () {
        $(this).attr('src', src);
    });
    //$('#follow-us .Snapchat img').hover(function () {
    //    src = $(this).attr('src');
    //    $(this).attr('src', '/styles/dcwcoid/img/icon-20x15-twitter.png');
    //}, function () {
    //    $(this).attr('src', src);
    //});
    $('#follow-us .Instagram img').hover(function () {
        src = $(this).attr('src');
        $(this).attr('src', '/styles/dcwcoid/img/instagram-hover.png');
    }, function () {
        $(this).attr('src', src);
    });

    if ($(window).width() < 992) {
        //SLIDESHOW
        $('#slideshow .item img').css('margin-left', function () {
            //var marginsetting = -1336 + $(window).width();
            ////return marginsetting + 'px';
            //if ($(window).width() < 768)
            //    return '-768px';
            //else
            //    return '-568px';
        });

        $('#slideshow .description .big').addClass('medium').removeClass('big');
        $('#slideshow .description').css({ 'text-align': 'center', 'left': '10px', 'bottom': '50px', 'top': 'auto' });


    }

    $('.dcwcoid-newsletter input[type="email"]').attr('placeholder', placeEmail);


    $("a").click(function (event) {
        var mysubs = getParameterByName("dis", $(this).attr('href'));
        //alert( mysubs );
        if (mysubs != null) {
            if (mysubs.length > 0) {
                if (confirm(mysubs)) {
                } else {
                    event.preventDefault();
                }
            }
        }
    });

    $('.level-1 li').each(function () {

        var anchor = $(this).find('a');
        var currUrl = window.location.href;
        if (currUrl.includes(anchor.attr('href'))) {
            $(this).find('a').addClass('active');
        }
    });

    $("#hello img").wrap("<a href='tel:1500090'></a>");
    setBannerHeight($(window).width());
    $(window).on('resize', function () {
        setBannerHeight($(this).width());
    });

    //create slider newscard
    var slideItems = '';
	var countcarousel=0;
    $('.lifestage-content .tab-content').each(function () {
        var control = '<div class="carousel-controls">'
                            + '<a class="left carousel-control" href="#carouselnewscard-'+countcarousel+'" role="button" data-slide="prev">'
                                 + ' <span class="glyphicon glyphicon-chevron-left previous" aria-hidden="true"></span>'
                                  + '<span class="sr-only">Previous</span>'
                              + '</a>'
                             + ' <a class="right carousel-control" href="#carouselnewscard-'+countcarousel+'" role="button" data-slide="next">'
                                + '  <span class="glyphicon glyphicon-chevron-right next" aria-hidden="true"></span>'
                                 + ' <span class="sr-only">Next</span>'
                             + ' </a>'
                          + '</div>';
        $('<div id="carouselnewscard-'+countcarousel+'" class="carousel featured-news slide hidden-lg hidden-md" data-ride="carousel"><div class="carousel-inner">' + control + '</div></div>').insertAfter($(this).find('.img-fit'));
        $(this).find('#promo-section .col-md-4').each(function () {
            //$('<div class="item news-card"></div>').appendTo('#carouselnewscard-'+countcarousel+' .carousel-inner');
            $(this).children().clone().appendTo('#carouselnewscard-'+countcarousel+' .carousel-inner');//

        });
	countcarousel++;
    });
    
$('.lifestage-content .tab-content').each(function () {
  var count = 0;
    $(this).find('.carousel .carousel-inner .news-item').each(function () {
        if (count == 0)
        { $(this).wrap("<div class='item active'></div>"); }
        else
        { $(this).wrap("<div class='item'></div>"); }
        count++;
       
    });
});


    $("#container").click(function () {
        if ($('#sticky-menu').hasClass('open'))
            $('#sticky-menu .close-classic').trigger('click');
    });
    $("#header").click(function () {
        if ($('#sticky-menu').hasClass('open'))
            $('#sticky-menu .close-classic').trigger('click');
    });
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function trim_words(theString, numWords) {
    if (theString != '') {
        var trimmedString = theString.substr(0, numWords);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
        return trimmedString;
    }
    else return '';
}
$(function () {
    //$(".dcwcoid-newsletter .form-submit-border .btn-default").on("click", function (e) {
    //    if ($(".lifestage-content .dcwcoid-newsletter .form-group").hasClass('has-error')==false) {
    //        $(".lifestage-content .dcwcoid-newsletter .form-group").css('display', 'none');
    //    }
    //});
});
//$(window).resize(function () { location.reload(); });
$(window).on('load', function () {
    if ($(window).width() >= screen.width) {
        if (!($("#featured-menu-2 > .scroll-wrap").hasClass("injectWidth"))) {
            $("#featured-menu-2 > .scroll-wrap").addClass("injectWidth");
            $("#featured-menu-2 > .scroll-wrap").css({ "width": screen.width, "margin": "auto" });
        }

        if (!($("#inspirasi").hasClass("injectWidth"))) {
            $("#inspirasi").addClass("injectWidth");
            $("#inspirasi").css({ "width": screen.width, "margin": "auto" });
        }
    }
    else if ($(window).width() <= screen.width) {
        if ($("#featured-menu-2 > .scroll-wrap").hasClass("injectWidth")) {
            $("#featured-menu-2 > .scroll-wrap").removeClass("injectWidth");
            $("#featured-menu-2 > .scroll-wrap").removeAttr("style");
        }

        if ($("#inspirasi").hasClass("injectWidth")) {
            $("#inspirasi").removeClass("injectWidth");
            $("#inspirasi").removeAttr("style");
        }
    }
});

function setBannerHeight(windowWidth) {
    var bannerHeight = 0;
    if (windowWidth < 992) { // XS & SM
        bannerHeight = windowWidth;
    } else { // MD & LG
        bannerHeight = windowWidth * 360 / 1024;
    }

    $(".banner-wide").css({'height': bannerHeight});
    $("#banner-page").css({'height': bannerHeight});
    $("#slideshow").css({'height': bannerHeight});
}
