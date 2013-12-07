var task_create = {
	showPanel: function (type) {
		$('.panel').hide();
		if (type == 'first') {
			$('#main').removeClass('animation');
			$('#main').show();
		} else if (type == 'progress') {
			$('#progress').removeClass('animation');
			$('#progress').show();
		} else if (type == 'navi') {
			$('#navi').removeClass('animation');
			$('#navi').show();
		} else if (type == 'task') {
			$('#task').removeClass('animation');
			$('#task').show();
		} else if (type == 'game') {
			$('#content').removeClass('animation');
			$('#content').show();
		}
	},
	init: function () {

		$('.task-time').mobiscroll().time({
			theme: 'android-ics light',
			lang: 'zh',
			display: 'bottom',
			mode: 'scroller',
			setText: '确定',
			cancelText: '取消',
			headerText: false
		});

		$('.task-type-selector').mobiscroll().select({
			theme: 'android-ics light',
			lang: 'zh',
			display: 'bottom',
			mode: 'scroller',
			inputClass: 'i-txt',
			width: 200
		});

		$('.task-create-add').click(function () {
			$('.task-name').val('');
			$('.task-gps').val('');
			$('.task-description').val('');
			$('.task-type-selector').val('');
			$('.task-time').val('');
		});

		$('.task-create-finish').click(function () {

		});

		$('#main1 .navi').click(function () {
			task_create.showPanel('navi');
		});
	}
};