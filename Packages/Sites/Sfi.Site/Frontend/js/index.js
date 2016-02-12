$(function () {
	$('.owl-carousel').owlCarousel({
		items: 1,
    loop: true,
		nav: true,
		navText: ['<','>']
	});
	window.sr = new scrollReveal();
});
