const preloader = document.getElementById('preloader');
const nav_btn_open = document.getElementById('nav_btn_open');
const nav_btn_close = document.getElementById('nav_btn_close');
const menu = document.querySelector('.nav__navigation');
const nav_logo = document.querySelector('.nav__logo');

const operate_menu = () => {
	menu.classList.toggle('show');
	nav_btn_open.classList.toggle('hide');
	nav_btn_close.classList.toggle('show');
	nav_logo.classList.toggle('hide');
};

nav_btn_open.addEventListener('click', operate_menu);
nav_btn_close.addEventListener('click', operate_menu);
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
		strings: ['Engineer', 'Designer', 'Coder', 'Web Developer', 'Artist'], //Headlines(Change It)
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
