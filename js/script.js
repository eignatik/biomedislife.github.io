var main = {
    init: function() {
        mobileMenu.init();
        scrollHelper.init();
        slidersHelper.init();
        menuHelper.init();
        cartButtons.init();
        cartFloating.init();
    }
};

var cartFloating = {
    cartButton: '',
    cartWindow: '',
    shadow: '',

    init: function() {
        this.cartButton = $('.cart-item');
        this.cartWindow = $('.cart-floating');
        this.shadow = $('.shadow');
        this.cartItemClick();
    },

    cartItemClick: function() {
        var modal = cartFloating.cartWindow;
        var cartItem = $('.cart-item > a > svg > g');
        this.cartButton.click(function(e) {
            e.preventDefault();
            if (!modal.hasClass("cart-opened")) {
                cartFloating.shadow.fadeIn("slow");
                cartItem.attr("stroke", "#ee4036");
                modal.slideDown("fast");
                modal.addClass("cart-opened");
            } else {
                cartFloating.shadow.fadeOut("slow");
                cartItem.attr("stroke", "#000");
                modal.slideUp("fast");
                modal.removeClass("cart-opened");
            }
        });
    }
};

var menuHelper = {
    searchInput: '',
    searchItem: '',
    menuElems: '',
    shadow: '',
    suggestionsBlock: '',
    suggestionItems: '',
    floatingCatalog: '',

    init: function () {
        this.searchItem = $(".search-item");
        this.searchInput= $(".search-item > input");
        this.menuElems = $(".menu-view > li");
        this.shadow = $(".shadow");
        this.suggestionsBlock = $(".search-suggestions");
        this.suggestionItems = $(".search-suggestions > ul > li");
        this.floatingCatalog = $(".products-floating");
        this.initSearchSlider();
        this.initShadowActions();
        this.initSuggestions();
        this.initFloatingCatalog();
    },

    initSearchSlider: function() {
        this.searchInput.click(function() {
            menuHelper.menuElems.each(function() {
                if (!$(this).hasClass("cart-item") && !$(this).hasClass("search-item")) {
                    $(this).hide();
                }
            });
            menuHelper.shadow.fadeIn("fast");
            menuHelper.searchItem.addClass("unfoldered");
            menuHelper.searchItem.css("width", "90%");
            menuHelper.searchInput.animate({width: "88%"});
        });
    },

    initFloatingCatalog: function() {
        var products = $('.product-catalog');
        var corner = $('.product-catalog > img');
        $('.special-offer').html(this.getDefaultBanner());
        products.click(function(e) {
            e.preventDefault();
            menuHelper.shadow.stop();
            menuHelper.floatingCatalog.stop();
            if (menuHelper.floatingCatalog.hasClass("opened")) {
                menuHelper.shadow.fadeOut("slow");
                menuHelper.floatingCatalog.slideUp("fast");
                menuHelper.floatingCatalog.removeClass("opened");
                corner.slideUp("fast");
                return;
            }
            menuHelper.shadow.fadeIn("fast");
            menuHelper.floatingCatalog.slideDown("fast");
            menuHelper.floatingCatalog.addClass("opened");
            corner.slideDown("fast");
        });
        this.hoverOnSections();
    },

    hoverOnSections: function() {
        var sections = $('.section-categories > div > ul > li > a');
        sections.mouseenter(function() {
            var category = $(this).text();
            menuHelper.showBannerByCategoryName(category);
        });
    },

    /**
     * @param categoryName
     */
    showBannerByCategoryName: function(categoryName) {
        var banner = this.getSuitableBanner(categoryName);
        $('.special-offer').html(banner);
    },

    /**
     * Method to get banner for catalog menu for suitable category.
     * There are two banners as placeholders (TEMPBANNER_FIRST, TEMPBANNER_SECOND). Switch statement defines which banner should be displayed. TODO: in any switch statement it's gonna be some back-end getters that get HTML code of banner.
     * HTML code for banners is specified in platform documentation.
     * @see TODO: put the link here
     * @param categoryName
     * @returns {*}
     */
    getSuitableBanner: function(categoryName) {
        var sections = $('.section-categories > div > ul > li > a');
        var TEMPBANNER_FIRST = "<div style=\"background-image: url('images/placeholders/milk@3x.jpg');\"><div><h5 style=\"color: #fff; text-align: center;\">Новое поступление!</h5></div><div><p style=\"color: #fff;\">Большой выбор продукции «Простоквашино» теперь в Смороза.ру</p></div></div>";

        var TEMPBANNER_SECOND = "<div style=\"background-image: url('images/placeholders/group-12@3x.jpg');\"><div><h5 style=\"color: #fff; text-align: center;\">Котлеты из говядины</h5></div><div><p style=\"color: #fff; text-decoration: line-through;\">290 руб</p></div></div>";

        var banner;
        switch(categoryName) {
            case sections[0].innerText:
                banner = TEMPBANNER_FIRST;
                break;
            case sections[1].innerText:
                banner = TEMPBANNER_SECOND;
                break;
            case sections[2].innerText:
                banner = TEMPBANNER_FIRST;
                break;
            case sections[3].innerText:
                banner = TEMPBANNER_SECOND;
                break;
            case sections[4].innerText:
                banner = TEMPBANNER_FIRST;
                break;
            case sections[5].innerText:
                banner = TEMPBANNER_SECOND;
                break;
            case sections[6].innerText:
                banner = TEMPBANNER_FIRST;
                break;
            case sections[7].innerText:
                banner = TEMPBANNER_SECOND;
                break;
            case sections[8].innerText:
                banner = TEMPBANNER_FIRST;
                break;
            default:
                console.log("There is no suitable category");
                banner = this.getDefaultbanner();
        }
        return banner;
    },

    /**
     * Get default banner to display that first time and in case of there are no another suitable banners.
     * TODO: getting this banner code from back-end
     * @returns {string}
     */
    getDefaultBanner: function() {
        return "<div style=\"background-image: url('images/placeholders/milk@3x.jpg');\"><div><h5 style=\"color: #fff; text-align: center;\">Новое поступление!</h5></div><div><p style=\"color: #fff;\">Большой выбор продукции «Простоквашино» теперь в Смороза.ру</p></div></div>"
    },

    /**
     * Initialization of shadow block actions to close search, catalog menu
     */
    initShadowActions: function() {
        var foldSearchItems = $('.shadow, .products-floating');
        var cart = $('.cart-floating');
        var cartItem = $('.cart-item > a');
        foldSearchItems.click(function () {
            if (menuHelper.searchItem.hasClass("unfoldered")) {
                if (!$(this).hasClass("products-floating") && !menuHelper.floatingCatalog.hasClass("opened")) menuHelper.shadow.fadeOut("fast");
                menuHelper.suggestionsBlock.slideUp("fast");
                menuHelper.searchItem.removeClass("unfoldered");
                menuHelper.searchItem.css("width", "auto");
                menuHelper.searchInput.css("width", "auto");
                menuHelper.searchInput.val("");
                menuHelper.menuElems.each(function () {
                    if (!$(this).hasClass("cart-item") && !$(this).hasClass("search-item")) {
                        $(this).show();
                    }
                });
            }
            if ($(this).hasClass("shadow")) {
                $(this).fadeOut("slow");
                if (menuHelper.floatingCatalog.hasClass("opened")) {
                    menuHelper.floatingCatalog.slideUp("fast");
                    menuHelper.floatingCatalog.removeClass("opened")
                }
                if (cart.hasClass("cart-opened")) {
                    cart.slideUp("fast");
                    cart.removeClass("cart-opened");
                    cartItem.removeClass("cart-item-selected");
                }
            }
        });
    },

    /**
     * Suggestions block initializator that creates an event on key up into the search input
     */
    initSuggestions: function () {
        menuHelper.searchInput.keyup(function() {
            var input = menuHelper.searchInput.val();
            if (!!!input) {
                menuHelper.suggestionsBlock.slideUp("fast");
            } else {
                menuHelper.fillSuggestions(menuHelper.getProducts());
                menuHelper.suggestionsBlock.slideDown("fast");
            }
        });
    },

    /**
     * !Important: This is a temporary placeholder that must be redesigned by developers who will implement the whole integration
     * TODO: implement logic to get products names from server to show in suggestions
     * @param name of product that will be used as pattern to get products names
     */
    getProducts: function(name) {
        return [
            "Молоко",
            "Молочные продукты",
            "Сухое молоко",
            "Безлактозное молоко"
        ]
    },

    /**
     * Fill suggestions list by products from input arg.
     * @param products
     */
    fillSuggestions: function(products) {
        var listOfProducts = $('.search-suggestions > ul');
        var html = "";
        $.each(products, function (index) {
            html += "<li>" + products[index] + "</li>";
        });
        listOfProducts.html(html);
        menuHelper.suggestionItems = $('.search-suggestions > ul > li');
        this.selectSuggestion();
    },

    /**
     * Select suggestion and add this one to search input
     */
    selectSuggestion: function() {
        var searchInput = menuHelper.searchInput;
        menuHelper.suggestionItems.click(function () {
            var clickedItem = $(this);
            searchInput.val(clickedItem.context.innerText);
        });
    }
};

/**
 * object to control buttons widgets for cart.
 * @type {{init: buttons.init, initCartClicking: buttons.initCartClicking, initChangeController: buttons.initChangeController, checkUserInput: buttons.checkUserInput}}
 */
var cartButtons = {
    init: function() {
        this.initCartClicking();
        this.initChangeController();
        this.checkUserInput();
    },

    /**
     * Init listener for clicking on add to cart (or plus button in case of mobile version) to show widget with count of items
     */
    initCartClicking: function() {
        var cartButtons = $('.item-interact > div > button');
        cartButtons.click(function() {
            var section = $(this).siblings("section");
            $(this).slideUp("fast");
            section.slideDown("slow");
        });
    },

    /**
     * Init listener for count change controller
     * Plus adds one item to input controller, minus decreases final count
     */
    initChangeController: function() {
        var pluses = $('.plus');
        var minuses = $('.minus');
        var productLimit = this.getProductLimit();
        pluses.click(function() {
            var input = $(this).siblings("input");
            var count = input.val() !== '' ? parseInt(input.val()) : 0;
            if (count >= productLimit) {
                $(this).attr("disabled");
            } else {
                $(this).removeAttr("disabled");
                input.val(count + 1);
            }
        });

        minuses.click(function() {
            var input = $(this).siblings("input");
            var value = parseInt(input.val());
            if (value > 0) {
                input.val(parseInt(input.val()) - 1);
            }
        });
    },

    /**
     * Product limits placeholder
     * @returns {number}
     */
    getProductLimit: function() {
        return 5;
    },

    /**
     * Check what kind of symbol user has entered.
     * If it doesn't match the regexp (ony digits) this symbols is gonna be erased
     */
    checkUserInput: function() {
        var counts = $('.count');
        counts.keyup(function() {
            var input = $(this).val();
            if (!input.charAt(input.length - 1).match(/\d/)) {
                $(this).val(input.substring(0, input.length-1));
            }
        });
    }
};

var scrollHelper = {
    init: function() {
        this.initParalax();
        this.initListenerToJumpMenu();
    },

    initParalax: function() {
        $(window).bind('scroll',function(e){
            var scrolled = $(window).scrollTop();
            // 700 is y position of background
            var calculated = 700 - (scrolled*.550);
            $('.search-block').css('backgroundPositionY',(calculated)+'px');
        });
    },

    initListenerToJumpMenu: function() {
        window.onscroll = function() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled >= 550) {
                $('.navigation-mobile').addClass("fixed-menu");
                $('.scrolled-menu').addClass("fixed-menu");
                $('.shadow').addClass("scrolled-shadow");
            } else {
                $('.navigation-mobile').removeClass("fixed-menu");
                $('.scrolled-menu').removeClass("fixed-menu");
                $('.shadow').removeClass("scrolled-shadow");
            }
        }
    }
};

var mobileMenu = {
    sandwitch: '',
    menu: '',
    init: function() {
        this.sandwitch = $('.sandwitch');
        this.menu = $('.mobile-menu');
        this.setMenuListener();
    },
    setMenuListener: function () {
        var hamburger = $(".sandwitch > span");
        this.sandwitch.click(function() {
            if (mobileMenu.menu.hasClass("rolled")) {
                mobileMenu.menu.animate({left:"100%"}, "fast");
                mobileMenu.menu.removeClass("rolled");
                hamburger.removeClass("glyphicon-remove");
                hamburger.addClass("glyphicon-menu-hamburger");
                mobileMenu.sandwitch.removeClass("close-menu");
                mobileMenu.releaseScroll();
            } else {
                mobileMenu.fixScroll();
                mobileMenu.sandwitch.addClass("close-menu");
                hamburger.removeClass("glyphicon-menu-hamburger");
                hamburger.addClass("glyphicon-remove");
                mobileMenu.menu.animate({
                    left:"0"
                }, "fast");
                mobileMenu.menu.addClass("rolled");
            }
        });
    },
    fixScroll: function() {
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];

        var html = $('html'); // it would make more sense to apply this to body, but IE7 won't have that
        html.data('scroll-position', scrollPosition);
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
    },

    releaseScroll: function() {
        var html = jQuery('html');
        var scrollPosition = html.data('scroll-position');
        html.css('overflow', html.data('previous-overflow'));
        window.scrollTo(scrollPosition[0], scrollPosition[1])
    }
};

var slidersHelper = {
    init: function() {
        this.initItemsSliders("discount-slider", 5);
        this.initItemsSliders("news-slider", 5);
        this.initItemsSliders("new-year-slider", 5);

        /* Catalog sliders */
        this.initItemsSliders("meat-slider-1", 4);
        this.initItemsSliders("meat-slider-2", 4);
        this.initItemsSliders("meat-slider-3", 4);

        this.initItemsSliders("similar-slider > div", 5);

        this.initTopSlider();
    },

    initItemsSliders: function(sliderParentNode, slides) {
        $("." + sliderParentNode + " > .items-slider").slick(
            Object.assign({
                prevArrow: $("." + sliderParentNode + " > .items-left-arrow"),
                nextArrow: $("." + sliderParentNode + " > .items-right-arrow"),
                slidesToShow: slides
            }, slidersHelper.itemSliderProperties)
        );
    },

    initTopSlider: function() {
        $(".top-slider > div").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.left-arrow'),
            nextArrow: $('.right-arrow'),
            dots: true
        });
    },

    itemSliderProperties: {
        infinite: false,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
}

$(document).ready(function() {
    main.init();
    new WOW().init();

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.product-item-slider > .items-left-arrow'),
        nextArrow: $('.product-item-slider > .items-right-arrow'),
        infinite: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        infinite: true
    });

});