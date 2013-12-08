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
			// user.get_profile();
			// user.get_user_tasks();
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

		// 我的游戏和我创建游戏切换
		$('#create-switch').bind('click', function () {
			$('#create').show();
			$('#join').hide();
			if ($('#create-tasks').children().length > 0) {
				task_create.showPanel('progress');
			} else {
				task_create.showPanel('game');
			}
			return false;
		});
		$('#join-switch').bind('click', function () {
			$('#join').show();
			$('#create').hide();
			return false;
		});

		// 创建游戏
		$('#content-create-game').bind('click', function () {
			// alert('dadsdasd');
			game.create_game();
			return false;
		});

		//创建任务
		$('.task-create-add').bind('click', function () {
			var rst = task.add_task();
			if (rst) {
				task_create.showPanel('task');
			}
			return false;
		});

		$('.task-create-finish').bind('click', function () {
			task_create.showPanel('progress');
		});

		$(document).ready(function () {
			user.get_profile();
			user.get_user_tasks();
		});
		task_create.init();
	},

	onDeviceReady: function() {
		$(function() {
			// app.receivedEvent('deviceready');
			// 退去应用
			$('.exit').bind('click', function () {
				navigator.app.exitApp();
			});
			try {
				algorithm.jump();
				algorithm.navigition({
					point: [39.958046, 116.358368]
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