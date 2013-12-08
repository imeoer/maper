// task

var task = {
	get_task_info: function (task) {
		document.getElementsByName('task_name')[0].value = task.task_name;
		document.getElementsByName('end_time')[0].value = task.end_time;
		document.getElementsByName('point')[0].value = task.point.join(',');
		document.getElementsByName('type')[0].value = task.type;
		document.getElementsByName('description')[0].value = task.description;
		document.getElementsByName('task_name')[0].disabled = true;	
		document.getElementsByName('end_time')[0].disabled = true;
		document.getElementsByName('point')[0].disabled = true;
		document.getElementsByName('type')[0].disabled = true;
		document.getElementsByName('description')[0].disabled = true;
		$('.task-create-add').hide();
		$('.task-create-finish').hide();
		task_create.showPanel('task');
	},
	add_task: function (callback) {
		var task_name = document.getElementsByName('task_name')[0].value;
		var end_time = document.getElementsByName('end_time')[0].value;
		var point = document.getElementsByName('point')[0].value;
		point = point.split(',');
		var type = document.getElementsByName('type')[0].value;
		var description = document.getElementsByName('description')[0].value;
		return callback(task_name, description, point, type, end_time);
	},
	navi: function (task) {
		algorithm.navigition(task);
	}
};