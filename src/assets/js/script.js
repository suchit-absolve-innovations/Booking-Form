/** Author: matchthemes.com **/
 
(function($) {
    "use strict";
	
	$('.slider-home').owlCarousel({
		items:1,
		margin:0,
		loop:false,
		nav:false,
		navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		dots:false,
		autoHeight: false,
		autoplay: false	
		
	});

	$('.testimonial').owlCarousel({
		items: 2,
		margin: 80,
		loop: true,
		nav: false,
		navText : ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
		dots: true,
		autoHeight: false,
		autoplay: false,
		responsive:{
			0:{
				items:1
			},

			767:{
				items:1
			},

			991:{
				items:2
			},

			1366:{
				items:2
			}
		}		
	});

	$('.portfolio').owlCarousel({
		items:2.7,
		margin:30,
		loop:true,
		nav:true,
		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
		dots:false,
		autoHeight: false,
		autoplay: false,
		responsive:{
			0:{
				items:2.2,
				margin:15
			},

			767:{
				items:2.5,
				margin:15
			},

			991:{
				items:3.5,
				margin:15
			},

			1366:{
				items:2.7
			}
		}		
	});

//Cta Video
	$('.video-play-icon').magnificPopup({
		disableOn: 375,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});

	//mobile menu
$('.nav-button').on('click', function(e){
	
	e.preventDefault();
	
    $('.mobile-menu-holder, .menu-mask').addClass('is-active');
	$('body').addClass('has-active-menu');

});

$('.exit-mobile, .menu-mask').on('click', function(e){
	
	e.preventDefault();

    $('.mobile-menu-holder, .menu-mask').removeClass('is-active');
	$('body').removeClass('has-active-menu');

});

$('.menu-mobile > li.menu-item-has-children > a').on('click', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			
			if ( $(this).parent().hasClass('menu-open') )
			
			$(this).parent().removeClass('menu-open');
			
			else {
			
			$(this).parent().addClass('menu-open');
			
			}
																  
			});
	
	// end mobile menu
	
// menu edge screen turn left

$(".menu-nav li").on('mouseenter mouseleave', function (e) {
        if ($('ul', this).length) {
            var elm = $('.sub-menu', this);
            var off = elm.offset();
            var l = off.left;
            var w = elm.width();
            var docW = $(window).width();

            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('edge');
            } else {
                $(this).removeClass('edge');
            }
        }
    });		
	
	/*=========================
			wow js
	==========================*/

	if ($(window).width() > 767) {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true,
		});
		new WOW().init();
	}

 //scroll up button
 
	$(".scrollup").hide();
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 400) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

$("a.scrolltop[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   $('html, body').stop().animate({scrollTop:0}, 1000, 'easeOutExpo');

});
 
})(jQuery);