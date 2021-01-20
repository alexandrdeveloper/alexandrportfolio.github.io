$(function() {

	$('.portfolio-cat__item').on('click', function(e) {
		$(this).addClass('portfolio-cat__item_active').siblings().removeClass('portfolio-cat__item_active');
	});

	



$('.project-item').magnificPopup({
	type: 'image',
	closeOnContentClick: false,
	closeBtnInside: false,
	
	image: {
		verticalFit: true,
		titleSrc: function(item) {
			return item.el.attr('title') + ' <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank"><i class="fa fa-eye"></i></a>';
		}
	},
	gallery: {
		enabled: true
	},
	zoom: {
		enabled: true,
		duration: 300, // don't foget to change the duration also in CSS
		opener: function(element) {
			return element.find('img');
		}
	}	
});






	let menuBtn = $('.menu-toggle');

	menuBtn.on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('menu-toggle_close');
		$('.menu').toggleClass('menu_opened');
		$('body').toggleClass('no-scroll-y');
	});

	let navbar = $('.navbar');


	$(window).scroll(function() {
		if ( $(this).scrollTop() > 50) {
			navbar.addClass('navbar_scrolled');
		} else {
			navbar.removeClass('navbar_scrolled');
		}
	});



	let portfolioGrid = $('.portfolio-grid');
	
	let mixer = mixitup(portfolioGrid, {
		"animation": {
			"duration": 250,
			"nudge": true,
			"reverseOut": false,
			"effects": "fade translateZ(-100px)"
		}
	});

		



});
