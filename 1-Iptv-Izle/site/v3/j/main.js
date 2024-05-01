var width = $(window).width();
var height = $(window).height();


function mobileMenuClose() {
    if (width > 767) {

        $('.header-bottom, .opacity-bg, .sub-menu').removeClass('active');
    }
}


// header sticky menu

var body = $('body'),
    mainHeader = $('.main-header'),
    lastScrollTop = 0;


function headerStickyFunction() {

    var st = $(this).scrollTop();
    $('body').addClass('sticky');
    if (st >= mainHeader.height() && st > lastScrollTop) {
        // upscroll code
        $('body').removeClass('sticky');
        setTimeout(function () {
            $('.main-header').removeClass('active');
            $('body').removeClass('downScrollActive');
            $('.mobile-menu-button').removeClass('active');
        }, 50);

    } else if (st < 157) {

        $('.main-header').removeClass('sticky active');
        $('body').removeClass('downScrollActive');
    } else {

        // downscroll code
        $('body').addClass('sticky');
        $('.main-header').addClass('sticky');
        $('body').addClass('downScrollActive');
        setTimeout(function () {
            $('.main-header').addClass('active');
            $('body').addClass('downScrollActive');
        }, 50);

    }
    lastScrollTop = st;

}

function dropMenu() {

    $('.mobile-menu-nav .sub-menu').each(function () {


        var positionTop = $(this).position().top + $('.mobile-menu').position().top;
        var positionRight = ($(window).width() - ($('.mobile-menu').position().left) - 10);



        if (positionTop + $(this).find('> ul').height() > $(window).height()) {
            // yukarı doğru açılma
            // console.log("yukarı doğru açılma");
            var positionTop = $(this).position().top + $('.mobile-menu').position().top - $(this).find('> ul').height() + 28;
            $(this).find('> ul').css('top', positionTop).css('right', positionRight);
        } else if (positionTop < $('.main-header').outerHeight()) {
            // scroll yapınca headera sabitleme
            /*
                        positionTop = $('.main-header').outerHeight();
                        $(this).find('> ul').css('top',positionTop).css('right',positionRight);
                        */
        }

        // normal alta açılma
        $(this).find('> ul').css('top', positionTop).css('right', positionRight);


    });

}

function calcSpeed(speed) {
    // son dakika alanı speed hesaplama
    var sum = 0,
        timeTaken;

    $('.last-minute-content > div span').each(function () {
        sum += $(this).width();
    });

    timeTaken = sum / speed * 20;

    $('.last-minute-content > div').css('animation-duration', timeTaken + "s");


}


$(document).ready(function () {

    headerStickyFunction();
    calcSpeed(700);





    $('.modContent span').click(function (event) {
        $('body').addClass('adPnone');
    });

    $('.header-search-icon').click(function () {
        $('.mobile-menu, .mobile-menu-button').removeClass('active');
        $(this).toggleClass('active');
        $('.header-search-content').toggleClass('active');
        $('.header-search-content input').focus();
    });

    $('.mobile-menu-button').click(function () {
        setTimeout(function () {
            dropMenu();
        }, 200);

        var width_ = $(window).width();
        if (width_ < 767) {
            $('html, body').addClass('hidden');
        }
        $(this).toggleClass('active');
        $('.mobile-menu, .opacity-bg').toggleClass('active');
        $('.header-search-icon ,.header-search-content').removeClass('active');


    });

    $('.opacity-bg, .mobile-menu-close').click(function () {
        $('html, body').removeClass('hidden');
        $(this).removeClass('active');
        $('.mobile-menu, .mobile-menu-button').removeClass('active');
    });

    $('.sub-icon').click(function () {
        if ($(this).parents('.sub-menu').hasClass('active')) {
            $(this).parents('.sub-menu').removeClass('active');
            $(this).parents('.sub-menu').prev('li').removeClass('no-border');
        } else {
            $('.sub-menu').removeClass('active');
            $('.mobile-menu-nav > ul > li').removeClass('no-border');
            $(this).parents('.sub-menu').addClass('active');
            $(this).parents('.sub-menu').prev('li').addClass('no-border');
        }
    });




    $('.mobile-menu-nav').scroll(function () {
        dropMenu();
    });


    $(window).scroll(function () {
        headerStickyFunction();
        dropMenu();

        //        $('.mobile-menu, .mobile-menu-button').removeClass('active');
        $('.header-search-icon, .header-search-content').removeClass('active');

        if ($(this).scrollTop() > 50) {
            $('#contactLink').addClass("active");
        } else {
            $('#contactLink').removeClass("active");
        }
    });
});

$(document).mouseup(function (e) {
    var container = $(".header-search-content, .header-search-icon, .mobile-menu-button, .mobile-menu, .social-more-content, .social-more");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('active');
        $('.header-search-icon, .mobile-menu-button, .social-more .more').removeClass('active');
    }
});

$(window).resize(function () {
    width = $(window).width();
    height = $(window).height();

    mobileMenuClose();
    dropMenu();

});
