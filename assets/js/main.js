(function ($) {
	"use strict";

/*=============================================
	=    		 Preloader			      =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	wowAnimation();
});



/*=============================================
	=    		Mobile Menu			      =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.menu__area li.menu-item-has-children ul').length) {
	$('.menu__area .navigation li.menu-item-has-children').append('<div class="dropdown__btn"><span class="fas fa-angle-down"></span></div>');

}

//Mobile Nav Hide Show
if ($('.mobile__menu').length) {

	var mobileMenuContent = $('.menu__area .main__menu').html();
	$('.mobile__menu .menu__box .menu__outer').append(mobileMenuContent);

	//Dropdown Button
	$('.mobile__menu li.menu-item-has-children .dropdown__btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(500);
	});
	//Menu Toggle Btn
	$('.mobile__nav__toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.menu__backdrop, .mobile__menu .close__btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
}



/*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
		$('.scroll-to-target').removeClass('open');

	} else {
		$("#sticky-header").addClass("sticky-menu");
		$('.scroll-to-target').addClass('open');
	}
});


/*=============================================
	=    		 Scroll Up & Smooth Scroll	     =
	= Handled by assets/js/smooth-scroll.js      =
=============================================*/



/*=============================================
	=    		 Tab Switcher		      =
=============================================*/
$(".mode__switcher, .switcher__tab__btn, .theme-switcher-btn").on("click", function (e) {
	e.preventDefault();
	if (window.PortfolioTheme && typeof window.PortfolioTheme.toggle === 'function') {
		window.PortfolioTheme.toggle();
	} else {
		$(".mode__switcher").toggleClass("active");
		$('body').toggleClass("active-dark-mode");
	}
});


/*=============================================
	=    		Brand Active		      =
=============================================*/
$('.brand-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 6,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		Services Active		      =
=============================================*/
$('.services__active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: false,
	arrows: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev"><i class="far fa-long-arrow-left"></i></button>',
	nextArrow: '<button class="slick-next"><i class="far fa-long-arrow-right"></i></button>',
	appendArrows: ".services__arrow",
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		Portfolio Active		      =
=============================================*/
var $portfolioSlider = $('.portfolio__active');

// Autoplay timing configuration
// Requirements specify 5-second interval; constant allows easy tuning if needed
var PORTFOLIO_AUTOPLAY_SPEED = 5000;
var PORTFOLIO_SLIDE_SPEED = 1000;

// Accessibility: Check user's prefers-reduced-motion preference
var motionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
var isReducedMotion = motionQuery ? motionQuery.matches : false;

// Function to update active/blur states on all slides
function updatePortfolioBlur($slider) {
	$slider.find('.slick-slide').each(function () {
		var $slide = $(this);
		if ($slide.hasClass('slick-current') && $slide.hasClass('slick-active')) {
			$slide.removeClass('slick-blur').addClass('slick-focus');
		} else {
			$slide.removeClass('slick-focus').addClass('slick-blur');
		}
	});
}

// Bind init event before slick initialization
$portfolioSlider.on('init', function (event, slick) {
	updatePortfolioBlur($(this));
});

$portfolioSlider.slick({
	dots: false,
	infinite: true,
	speed: PORTFOLIO_SLIDE_SPEED,
	autoplay: true,
	autoplaySpeed: PORTFOLIO_AUTOPLAY_SPEED,
	pauseOnHover: false, // Managed by custom container-wide hover handler below
	pauseOnFocus: true,
	cssEase: 'cubic-bezier(0.25, 1, 0.5, 1)',
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev" aria-label="Previous Project"><i class="far fa-long-arrow-alt-left"></i></button>',
	nextArrow: '<button class="slick-next" aria-label="Next Project"><i class="far fa-long-arrow-alt-right"></i></button>',
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
			}
		},
	]
});

// Immediately pause any sliders that are hidden (e.g. in inactive tab panes)
// or if reduced-motion is requested, avoiding overlapping background timers
$portfolioSlider.each(function () {
	var $slider = $(this);
	updatePortfolioBlur($slider);
	if (!$slider.is(':visible') || isReducedMotion) {
		$slider.slick('slickPause');
	}
});

// Update slide blur/active state on slide transitions
$portfolioSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	var $slider = $(this);
	$slider.find('.slick-slide').removeClass('slick-focus').addClass('slick-blur');

	// Target incoming slide (including cloned slides in infinite mode)
	var $next = $slider.find('.slick-slide[data-slick-index="' + nextSlide + '"]');
	if (slick.options.infinite) {
		if (currentSlide === slick.slideCount - 1 && nextSlide === 0) {
			$next = $next.add($slider.find('.slick-slide[data-slick-index="' + slick.slideCount + '"]'));
		} else if (currentSlide === 0 && nextSlide === slick.slideCount - 1) {
			$next = $next.add($slider.find('.slick-slide[data-slick-index="-1"]'));
		}
	}
	$next.removeClass('slick-blur').addClass('slick-focus');
});

$portfolioSlider.on('afterChange', function (event, slick, currentSlide) {
	var $slider = $(this);
	updatePortfolioBlur($slider);

	// If visitor is currently hovering or reduced-motion is enabled, remain paused
	if ($slider.data('is-hovered') || isReducedMotion) {
		$slider.slick('slickPause');
	} else if ($slider.is(':visible')) {
		// Reset & restart the 5-second timer cleanly after manual or auto slide change
		$slider.slick('slickPlay');
	}
});

// Clicking a side slide directly navigates to it and resets timer
$portfolioSlider.on('click', '.slick-slide:not(.slick-current)', function (e) {
	e.preventDefault();
	var index = $(this).data('slick-index');
	if (index !== undefined) {
		var $slider = $(this).closest('.portfolio__active');
		$slider.slick('slickGoTo', index);
	}
});

// Manual arrow navigation: clicking prev/next immediately transitions
$portfolioSlider.on('click', '.slick-arrow', function () {
	var $slider = $(this).closest('.portfolio__active');
	if (!$slider.data('is-hovered') && !isReducedMotion && $slider.is(':visible')) {
		// Reset the 5-second timer
		$slider.slick('slickPlay');
	}
});

// Hover Management: Pause on mouseenter over entire carousel (including previews & arrows)
// Resume automatically on mouseleave with fresh 5-second countdown
$portfolioSlider.on('mouseenter', function () {
	$(this).data('is-hovered', true);
	$(this).slick('slickPause');
});

$portfolioSlider.on('mouseleave', function () {
	var $slider = $(this);
	$slider.data('is-hovered', false);
	if (!isReducedMotion && $slider.is(':visible')) {
		$slider.slick('slickPlay');
	}
});

// Touch Management for mobile/tablet: pause on touch, resume on release
$portfolioSlider.on('touchstart', function () {
	$(this).data('is-hovered', true);
	$(this).slick('slickPause');
});

$portfolioSlider.on('touchend touchcancel', function () {
	var $slider = $(this);
	setTimeout(function () {
		$slider.data('is-hovered', false);
		if (!isReducedMotion && $slider.is(':visible')) {
			$slider.slick('slickPlay');
		}
	}, 100);
});

// Viewport Intersection: Pause when scrolled out of view to save resources
if ('IntersectionObserver' in window) {
	var portfolioEl = document.getElementById('portfolioSection');
	if (portfolioEl) {
		var portfolioObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					$portfolioSlider.each(function () {
						$(this).slick('slickPause');
					});
				} else {
					var $vis = $('.portfolio__active:visible');
					if ($vis.length && !isReducedMotion && !$vis.data('is-hovered')) {
						$vis.slick('slickPlay');
					}
				}
			});
		}, { threshold: 0.15 });
		portfolioObserver.observe(portfolioEl);
	}
}

// Reduced Motion: Listen for OS accessibility setting changes
if (motionQuery && motionQuery.addEventListener) {
	motionQuery.addEventListener('change', function (e) {
		isReducedMotion = e.matches;
		if (isReducedMotion) {
			$portfolioSlider.each(function () {
				$(this).slick('slickPause');
			});
		} else {
			var $vis = $('.portfolio__active:visible');
			if ($vis.length && !$vis.data('is-hovered')) {
				$vis.slick('slickPlay');
			}
		}
	});
}

// Tab Switching: Cleanly coordinate autoplay between tabs (All, Website, Apps, Branding, etc.)
$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
	var target = $(this).attr('data-bs-target') || $(this).attr('href');

	// Pause all sliders first so inactive tabs never run background timers
	$portfolioSlider.each(function () {
		$(this).slick('slickPause');
	});

	function refreshVisibleSlider() {
		if (target) {
			var $slider = $(target).find('.portfolio__active');
			if ($slider.length && $slider.hasClass('slick-initialized')) {
				$slider.slick('setPosition');
				updatePortfolioBlur($slider);
				if (!isReducedMotion && !$slider.data('is-hovered')) {
					$slider.slick('slickPlay');
				}
			}
		}
		$('.portfolio__active:visible').each(function () {
			if ($(this).hasClass('slick-initialized')) {
				$(this).slick('setPosition');
				updatePortfolioBlur($(this));
				if (!isReducedMotion && !$(this).data('is-hovered')) {
					$(this).slick('slickPlay');
				}
			}
		});
	}
	refreshVisibleSlider();
	setTimeout(refreshVisibleSlider, 60);
});


/*=============================================
	=         Testimonial Active          =
=============================================*/
$('.testimonial__active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: false,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev"><i class="far fa-long-arrow-left"></i></button>',
	nextArrow: '<button class="slick-next"><i class="far fa-long-arrow-right"></i></button>',
	appendArrows: ".testimonial__arrow",
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
	]
});


/*=============================================
	=         Testimonial Active          =
=============================================*/
$('.testimonial__two__active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: false,
	arrows: true,
	fade: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev"><i class="far fa-long-arrow-left"></i></button>',
	nextArrow: '<button class="slick-next"><i class="far fa-long-arrow-right"></i></button>',
	appendArrows: ".testimonial__arrow",
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
	]
});


/*=============================================
	=    		Magnific Popup		      =
=============================================*/
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


/*=============================================
	=    		Isotope	Active  	      =
=============================================*/
$('.portfolio__inner__active').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.portfolio__inner__active').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		transitionDuration: '0.6s',
		masonry: {
			columnWidth: 1,
		}
	});
	// filter items on button click
	$('.portfolio__inner__nav').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

});
//for menu active class
$('.portfolio__inner__nav button').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


/*=============================================
	=    		 Wow Active  	         =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}


})(jQuery);