var app = {

	initialize: function() {
		$.mobile.loadingMessage = false;
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);

		// first
		$(document).on('swiperight', function (event) {
			$('#content').addClass('animation');
			$('#task').addClass('animation');
			$('#navi').addClass('animation');
			$('#progress').addClass('animation');
		}).on('swipeleft', function (event) {
			$('#content').removeClass('animation');
			$('#task').removeClass('animation');
			$('#navi').removeClass('animation');
			$('#progress').removeClass('animation');
		});
		$('#logo').addClass('animation1');

		$('#first-btn').click(function () {
			$('#main').hide();
			$('#main1').show();
			$('#content').show();
			$('#task').show();
			$('#navi').show();
			$('#progress').show();
		});

		//global
		$('.input').on('focus', function () {
			if (!$(this).hasClass('picker')) {
				$(this).addClass('input-adjust');
				$(this).focus();
			}
		}).on('blur', function () {
			$(this).removeClass('input-adjust');
			$(this).blur();
		});
		$('body').click(function () {
			$('body').removeClass('input-adjust');
		});

		task_create.init();
	},

	onDeviceReady: function() {
		$(function() {
			// app.receivedEvent('deviceready');
			try {
				algorithm.jump();
				algorithm.navigition({
					latitude: 39.958046,
					longitude: 116.358368
				});
			}
			catch(error) {
				alert(error.message);
			}
		});
	}
};

app.initialize();