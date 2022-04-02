const preloader = document.getElementById('preloader');

function fadeOutEffect() {
	const fadeEffect = setInterval(function () {
		if (!preloader.style.opacity) {
			preloader.style.opacity = 1;
		}
		if (preloader.style.opacity > 0) {
			preloader.style.opacity -= 0.1;
		} else {
			preloader.style.display = 'none';
			clearInterval(fadeEffect);
		}
	}, 200);
}

//Typed.js
$(function () {
	'use strict';
	$('.type').typed({
		strings: ['Creativity', 'Artist', 'Designer'], //Headlines(Change It)
		loop: true,
		startDelay: 1e3,
		backDelay: 2e3,
	});
});

//Handling preloader
window.addEventListener('load', (event) => {
	console.log('The page has fully loaded');
	fadeOutEffect();
});
