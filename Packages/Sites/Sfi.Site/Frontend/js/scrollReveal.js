$(function () {
	// Don't load while in backend
	if (!$('body').hasClass('neos-backend')) {
		window.sr = new scrollReveal();
	}
});
