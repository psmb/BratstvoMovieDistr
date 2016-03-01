(function () {
	var toggleSelector = 'js-Collapse-isCollapsed';
	Array.prototype.forEach.call(document.querySelectorAll('.js-Collapse'), function (el) {
		el.classList.add(toggleSelector);
		el.querySelector('.js-Collapse-toggle').addEventListener('click', function (event) {
			el.classList.toggle(toggleSelector);
			event.preventDefault();
		});
	});
})();
