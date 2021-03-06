$(function () {
	var width = $(window).width(),
		height = $(window).height(),
		headerHeight = $('header').outerHeight();
	$('#year').text(new Date().getFullYear());
	$('a.smooth-scroll[href*="#"]:not([href="#"])').on("click", function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - headerHeight + 1)
				}, 1000);
				return false;
			}
		}
	});
	$(".message__close").on("click", function() {
		$(this).parent().parent().fadeOut();
		$('.black').removeClass('opened');
		$('body').removeClass('message__open');
	});
	$(".btn__close").on("click", function() {
		$(this).parent().parent().parent().fadeOut();
		$('.black').removeClass('opened');
		$('body').removeClass('message__open');
	});
	$("form").on('submit', function(event) {
		var mail = $('#email').val(),
			paper = $('#email').attr('data-paper');
		// console.log(paper);
		event.preventDefault();
		function validateEmail(mail) {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(mail);
		}
		if ( validateEmail(mail) ) {
			$('#email').parent().removeClass('form__group--error').addClass('form__group--correct');
		} else if ( mail == '' ) {
			$('.form__group__help').text('請輸入 e-mail');
			$('#email').parent().removeClass('form__group--correct').addClass('form__group--error');
			return false;
		} else {
			$('.form__group__help').text('請輸入正確格式');
			$('#email').parent().removeClass('form__group--correct').addClass('form__group--error');
			return false;
		}
		$.post("https://www.cw.com.tw/api/newsletter/outer/subscribe", {
			email: mail,
			code: paper,
			function(d) {
				$('.loader').fadeIn();
				// setTimeout(() => {
				// 	$('.loader').hide();
				// 	$('#error').show();
				// 	$('.black').addClass('opened');
				// }, 5000);
			}
		}, function(data, status) {
			// alert("Data: " + data + "\nStatus: " + status);
			if ( data['code'] == '0000' ) {
				$('.loader, #error').hide();
				$('#success').show();
				$('.black').addClass('opened');
			} else {
				$('.loader').hide();
				$('#error').show();
				$('.black').addClass('opened');
			}
		});
	});
	$(window).resize(function () {});
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= height) {
		} else {
		}	
	});
	if ( window.location.href.indexOf('print') > 0 ) {
		$('body').addClass('printscreen');
	}
});
