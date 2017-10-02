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
        $(elemToToggle).slideToggle("fast");
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

var dropDowns = {
    setUpDropDown: function(elemToShow, elemToClick) {
        elemToClick.mouseenter(function() {
            dropDowns.setMouseEnter(elemToShow, "fast");
        });

        elemToClick.mouseleave(function() {
            dropDowns.setMouseLeave(elemToShow);
        });
    },

    setUpAdditionalListener: function(elemToShow) {
        elemToShow.mouseenter(function() {
            elemToShow.stop(true, false);
        });

        elemToShow.mouseleave(function() {
            dropDowns.setMouseLeave(elemToShow, "fast");
        });
    },

    setMouseEnter: function (elemToShow, speed) {
        elemToShow.stop(true, false);
        elemToShow.slideDown(speed);
    },

    setMouseLeave: function(elemToShow, speed) {
        elemToShow.stop(true, false);
        elemToShow.slideUp(speed);
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

    carouselMain.init("review-carousel", {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true
    });

    newsBlock.cutLongText();

    dropDowns.setUpDropDown($(".languages"), $(".language-selector"));
    dropDowns.setUpAdditionalListener($(".languages"));

    dropDowns.setUpDropDown($(".login-dropdown"), $(".signin-dropdown"));
    dropDowns.setUpAdditionalListener($(".login-dropdown"));

    // $('.dropdown').click(function() {
    //     $('.dropdown-menu').slideToggle("fast");
    // })
});

$(window).load(function () {
    var $wrapper = $('.shop-content'),
        $plus = $wrapper.find('.plus'),
        $minus = $wrapper.find('.minus');

    var datacount;
    $plus.on('click touch', function (e) {
        e.preventDefault();

        var $elem = $(this).parent().find('.num');
        datacount = $elem.data('count');
        datacount++;
        $elem.data('count', datacount);

        $elem.val(datacount);
    });

    $minus.on('click touch', function (e) {
        e.preventDefault();

        var $elem = $(this).parent().find('.num');
        datacount = $elem.data('count');

        if (datacount > 1) {
            datacount--;
            $elem.data('count', datacount);
            $elem.val(datacount);
        }
    })
});