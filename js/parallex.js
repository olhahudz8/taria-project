jQuery.fn.parallex = function(options) {
    let y = 0;
    let defaults = {
        nav: "",
        currentClass: "",
        elements: [],
        parallex: [],
        positions: [],
        scrollSpeed: 500
    },
    
    settings = $.extend({}, defaults, options),
    
    METHODS = {
        'getElementsPositions': function() {
            $(settings.elements).each(function(i, ele) {
                settings.positions.push($(ele).position().top);
                if (i === settings.elements.length - 1) {
                    METHODS.appendNavigationBullets();
                }
            });
        },
            
        'appendNavigationBullets': function() {
            let target = '';
            $(settings.elements).each(function(i, ele) {
                $(settings.nav).append("<li><a href='" + ele + "' data-target='" + $(ele).position().top + "'></a></li>");
                $(settings.nav).find('a').eq(0).addClass(settings.currentClass);
            });
            $(settings.nav).promise().done(function() {
                $(settings.nav).find('a').each(function(i, ele) {
                    $(ele).on('click', function(event) {
                        event.preventDefault();
                        target = $(ele).data("target");
                        METHODS.animatePageScroll(target);
                    });
                });
                METHODS.handleScrolling();
            });
        },
            
        'animatePageScroll': function(target) {
            $('html, body').animate({
                scrollTop: target
            },
            settings.scrollSpeed);
        },
            
        'searchInRange': function(value) {
            for (let i = 0; i < settings.positions.length; i++) {
                let lastIndex = i + 1;
                if (lastIndex < settings.positions.length) {
                    let start = settings.positions[i],
                    end = settings.positions[lastIndex];
                    if (value >= start && value < end) {
                        $(settings.nav).find('a').removeClass(settings.currentClass);
                        $(settings.nav).find('a').eq(settings.positions.indexOf(start)).addClass(settings.currentClass);
                        if (settings.parallex.length > 0) {
                            $(settings.parallex[settings.positions.indexOf(start)]).css('background-position', 'center ' + value / 30 + 'px');
                        }
                    }
                }
                if (value >= settings.positions[settings.positions.length - 1]) {
                    $(settings.nav).find('a').removeClass(settings.currentClass);
                    $(settings.nav).find('a').last().addClass(settings.currentClass);
                }
            }
        },
            
        'handleScrolling': function() {
            $(document).on('scroll', function(event) {
                METHODS.searchInRange($(document).scrollTop());
            });
        },
            
        'init': function() {
            return METHODS.getElementsPositions();
        }
    };
    
    METHODS.init();
};