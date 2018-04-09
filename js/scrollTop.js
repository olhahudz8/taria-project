(function(a){
    a.fn.scrollToTop=function(c){
        let d={speed:800};
        c&&a.extend(d,{speed:c});
        return this.each(function(){
            let b=a(this);
            a(window).scroll(function(){
                100<a(this).scrollTop()?b.fadeIn():b.fadeOut();
            });
            b.click(function(b){
                b.preventDefault();
                a("body, html").animate({scrollTop:0},d.speed);
            });
        });
    };
})(jQuery);