var app = {

	initialize: function() {
		$.mobile.loadingMessage = false;
		this.bindEvents();
	},

	bindEvents: function() {

		var that = this;
		var create_tasks = {player: {username: '', progress: '0%'}, create_tasks: []};
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
			game.create_game(function (invite_user, reward) {
				create_tasks.player.username = invite_user;
			});
			task_create.showPanel('task');
		});

		//创建任务
		$('.task-create-add').bind('click', function () {
			task.add_task(function (task_name, description, point, type, end_time) {
				var tmp = {task_name: task_name, description: description,
						   point: point, type: type, end_time: end_time};
				if (task_name.length > 0) {
					create_tasks.create_tasks.push(tmp);
				}	
			});
			return false;
		});

		$('.task-create-finish').bind('click', function () {
			var html = '';
			for (var i = 0; i < create_tasks.create_tasks.length; i ++) {
				html += '<li class="createtask"><div>·</div>';
            	html += create_tasks.create_tasks[i].task_name + '</li>';
			}
			$('#create-tasks').html(html);
			$('.createtask').each(function (index, value) {
	            $(value).bind('click', function () {
	                $('.createtask').removeClass('select');
	                $(this).addClass('select');
	                task.get_task_info(create_tasks.create_tasks[index]);
	            });
	        });
			task_create.showPanel('progress');
			return false;
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