$(document).ready(function () {

    var tagWidgetSlider = new Swiper(".tag-widget .swiper-container", {
        slidesPerView: 2.5,
        spaceBetween: 10,
        navigation: {
            nextEl: ".tag-widget .swiper-button-next",
            prevEl: ".tag-widget .swiper-button-prev",
        },
        autoplay: false,
        loop: false,
        breakpoints: {
            768: {
                slidesPerView: 4,
                autoplay: false,
            },
            992: {
                slidesPerView: 5,
                autoplay: false,
            }
        }
    });
});
