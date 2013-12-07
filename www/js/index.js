var app = {

	initialize: function() {
		$.mobile.loadingMessage = false;
		this.bindEvents();
	},

	bindEvents: function() {

		var that = this;

		document.addEventListener('deviceready', this.onDeviceReady, false);

		// first
		$(document).on('swiperight', function (event) {
			$('.panel').addClass('animation');
		}).on('swipeleft', function (event) {
			$('.panel').removeClass('animation');
		});
		$('#logo').addClass('animation1');

		$('#first-btn').click(function () {
			$('#main1').show();
			task_create.showPanel('progress');
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
				algorithm.jump();
				algorithm.navigition({
					latitude: 39.958046,
					longitude: 116.358368
				});
				cameraSet.bindCamera();
			}
			catch(error) {
				alert(error.message);
			}
		});
	}
};

app.initialize();