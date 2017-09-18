var partnerBlock = {
    setPartnerBlockListeners: function(elemToShow) {
        this.setListenerOnButton();
        this.desktopSwitcher("." + elemToShow);
        this.mobileSwitcher("." + elemToShow);
    },

    desktopSwitcher: function(elemToShow) {
        var partnerItem = $(".partner-item");
        partnerItem.click(function() {
            partnerBlock.toggleShowing(elemToShow);
        });
    },

    mobileSwitcher: function(elemToShow) {
        $(".partner-block > span.close-partner-block").click(function() {
            partnerBlock.toggleShowing(elemToShow);
        });
    },

    toggleShowing: function(elemToToggle) {
        $(elemToToggle).stop(true, false);
        $(elemToToggle).slideToggle(1000);
    },

    setListenerOnButton: function() {
        var partnerItem = $(".partner-item");
        partnerItem.click(function() {
            if (partnerItem.hasClass("active-item")) {
                partnerItem.removeClass("active-item");
            } else {
                partnerItem.addClass("active-item");
            }
        });
    }
};

var carouselMain = {
    init: function(sliderClass, sliderProps) {
        $("." + sliderClass).slick(sliderProps);
    }
};

var newsBlock = {
    cutLongText: function () {
        var MAX_SIZE = 40;
        console.log("array");
        $(".news-block > div > a > p").each(function () {
            var pContent = $(this).html();
            if (pContent.length >= MAX_SIZE) {
                console.log("do cut");
                $(this).html(pContent.substring(0, 39) + "...");
            }
        });
    }
};

$(document).ready(function() {
    partnerBlock.setPartnerBlockListeners("partner-block");
});

$(window).load(function() {
    carouselMain.init("carousel-main", {
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true
    });

    carouselMain.init("products-carousel", {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    newsBlock.cutLongText();
});