var task_create = {
	init: function () {
		$('#main').hide();
		$('#main1').show();
		$('#content').hide();
		$('#task').hide();
		$('#navi').hide();
		$('#progress').show();

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
			$('#content').addClass('animation');
			$('#task').addClass('animation');
			$('#navi').addClass('animation');
		});
	}
};