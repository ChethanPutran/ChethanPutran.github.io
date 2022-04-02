// Defining a function to display error message
function printError(elemId, hintMsg) {
	document.getElementById(elemId).innerHTML = hintMsg;
}

//Typed.js
$(function () {
	'use strict';
	$('.header-logo-desc p').typed({
		strings: ['Creativity', 'Artist', 'Designer'], //Headlines(Change It)
		loop: true,
		startDelay: 1e3,
		backDelay: 2e3,
	});
});

//Wow.js
new WOW().init();

// this has nothing to do with the animation, just forces the window to be a size that allows a scroll
var containerHeight = $(window).height() / 2;

$('.spacer').css('height', containerHeight);

// Find the height of the previous section, half it so when you have scrolled more than half past the section, it triggers the animation
var x = $('.skills').prev().height() / 4;

$(window).scroll(function () {
	// checks to see if you have scrolled far enough down to activate the animation
	if ($(window).scrollTop() >= x) {
		//find each element with the class .skill-percent
		$('.skill-percent').each(function () {
			// animate
			$(this).animate(
				{
					//finds the width from the data-percent attribute
					width: $(this).data('percent') + '%',
				},
				1000
			);
		});
	}
});

(function ($, window, document, undefined) {
	// our plugin constructor
	var OnePageNav = function (elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false,
		},

		init: function () {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			this.config = $.extend(
				{},
				this.defaults,
				this.options,
				this.metadata
			);

			this.$nav = this.$elem.find(this.config.navItems);

			//Filter any links out of the nav
			if (this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			//Handle clicks on the nav
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			//Get the section positions
			this.getPositions();

			//Handle scroll changes
			this.bindInterval();

			//Update the positions on resize too
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

			return this;
		},

		adjustNav: function (self, $parent) {
			self.$elem
				.find('.' + self.config.currentClass)
				.removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function () {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function () {
				self.didScroll = true;
			});

			self.t = setInterval(function () {
				docHeight = self.$doc.height();

				//If it was scrolled
				if (self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if (docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function ($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function () {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function () {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if ($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		getSection: function (windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(
				this.$win.height() * this.config.scrollThreshold
			);

			for (var section in this.sections) {
				if (this.sections[section] - windowHeight < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function (e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if (!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if (self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				self.scrollTo(newLoc, function () {
					//Do we need to change the hash?
					if (self.config.changeHash) {
						window.location.hash = newLoc;
					}

					//Add the auto-adjust on scroll back in
					self.bindInterval();

					//End callback
					if (self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function () {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if (position !== null) {
				$parent = this.$elem
					.find('a[href$="#' + position + '"]')
					.parent();

				//If it's not already the current section
				if (!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if (this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function (target, callback) {
			var offset = $(target).offset().top;

			$('html, body').animate(
				{
					scrollTop: offset,
				},
				this.config.scrollSpeed,
				this.config.easing,
				callback
			);
		},

		unbindInterval: function () {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		},
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function (options) {
		return this.each(function () {
			new OnePageNav(this, options).init();
		});
	};
})(jQuery, window, document);

$(document).ready(function () {
	$('#nav').onePageNav();
});
$(document).ready(function () {
	$('.slide-in').onePageNav();
});

// Defining a function to validate form
function validateForm() {
	// Retrieving the values of form elements
	var fname = document.contactForm.fname.value;
	var lname = document.contactForm.lname.value;
	var email = document.contactForm.email.value;
	var mobile = document.contactForm.phone.value;
	var password = document.contactForm.password.value;
	var cpassword = document.contactForm.confirmpassword.value;
	var age = document.contactForm.age.value;
	var country = document.contactForm.country.value;
	var gender = document.contactForm.gender.value;

	var role = document.contactForm.role.value;

	var passErr = true;

	if (password != cpassword) {
		printError('passErr', 'Passwords should match');
	} else {
		printError('passErr', '');
		passErr = false;
	}

	if (password == '') {
		printError('passErr', 'Please enter password');
	} else {
		var regex =
			/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;
		if (regex.test(password) === false) {
			alert(
				`<div id="message">
          <h3>Password must contain the following:</h3>
          <ul>
            <li>
              A <b>lowercase </b> letter (a-z)
            </li>
            <li>
              A <b>capital (uppercase)</b> letter (A-Z)
            </li>
            <li>
              A <b>number</b> (0-9)
            </li>
            <li>
              A <b>special character</b> (!@#$%^&*_)
            </li>
            <li>
              Minimum <b>8 characters</b> and maximum <b>16 characters</b>
            </li>
          </ul>
        </div>`
			);
		} else {
			printError('passErr', '');
			passErr = false;
		}
	}

	if (passErr == true) {
		return false;
	} else {
		// Creating a string from input data for preview
		var dataPreview =
			' You have entered the following details: ' +
			'\n' +
			'First Name: ' +
			fname +
			'\n' +
			'Last Name: ' +
			lname +
			'\n' +
			'Email Address: ' +
			email +
			'\n' +
			'Mobile Number: ' +
			mobile +
			'\n' +
			'Country: ' +
			country +
			'\n' +
			'Gender: ' +
			gender +
			'\n' +
			'Age: ' +
			age +
			'\n' +
			'Role: ' +
			role +
			'\n';
		alert(dataPreview);

		//   if (hobbies.length) {
		//     dataPreview += "Hobbies: " + hobbies.join(", ");
		//   }
		//   // Display input data in a dialog box before submitting the form
		//   alert(dataPreview);
	}
}

function fadeOutEffect() {
	var fadeTarget = document.querySelector('.preloader');
	var fadeEffect = setInterval(function () {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			fadeTarget.style.display = 'none';
			clearInterval(fadeEffect);
		}
	}, 200);
}
window.addEventListener('load', (event) => {
	console.log('The page has fully loaded');
	fadeOutEffect();
});
