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
		}).on('swipeleft', function (event) {
			$('#content').removeClass('animation');
			$('#task').removeClass('animation');
			$('#navi').removeClass('animation');
		});
		$('#logo').addClass('animation1');

		// first
		$('#first-btn').click(function () {
			$('#main').hide();
			$('#main1').show();
			$('#content').show();
			$('#task').show();
			$('#navi').show();
		});

		//global
		$('.input').on('focus', function () {
			$(this).addClass('input-adjust');
			$(this).focus();
		}).on('blur', function () {
			$(this).removeClass('input-adjust');
			$(this).blur();
		});
		$('body').click(function () {
			$('body').removeClass('input-adjust');
		});
	},

	onDeviceReady: function() {
		$(function() {
			// app.receivedEvent('deviceready');
			// try {
			// 	app.run();
			// }
			// catch(error) {
			// 	alert(error.message);
			// }
		});
	}
};

app.initialize();