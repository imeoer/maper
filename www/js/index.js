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

		$('#first-btn').click(function () {
			$('#main').hide();
			$('#create').hide();
			$('#main1').show();
			$('#content').show();
			$('#task').show();
			$('#navi').show();
			$('#join').show();
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
		$(document).ready(function () {
			user.get_profile();
			user.get_user_tasks();
			$('#create-switch').bind('click', function () {
				$('#create').show();
				$('#join').hide();
			});
			$('#join-switch').bind('click', function () {
				$('#join').show();
				$('#create').hide();
			});
		});
	},

	onDeviceReady: function() {
		$(function() {
			// app.receivedEvent('deviceready');
			try {
				// app.run();
				//algorithm.jump();
				//algorithm.navigition({
				//	latitude: 39.958046,
				//	longitude: 116.358368
				//});
				// var onPositionUpdate = function (postion) {
				// 	alert(JSON.stringify(postion));
				// };
				// var onError = function (error) {
				// 	alert(JSON.stringify(error));
				// };
				// navigator.geolocation.getCurrentPosition(onPositionUpdate, onError, {
				// 	maximumAge: 3000, timeout: 30000, enableHighAccuracy: false
				// });
			}
			catch(error) {
				alert(error.message);
			}
		});
	}
};

app.initialize();