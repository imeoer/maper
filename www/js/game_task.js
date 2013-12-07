// task

var task = {
	get_task_info: function (task) {
		document.getElementsByName('task_name')[0].value = task.task_name;
		document.getElementsByName('end_time')[0].value = task.end_time;
		document.getElementsByName('point')[0].value = ','.join(task.point);
		document.getElementsByName('type')[0].value = task.type;
		document.getElementsByName('description')[0].value = task.description;
		if (task.finished) {
			document.getElementsByName('task_name')[0].disabled = true;	
			document.getElementsByName('end_time')[0].disabled = true;
			document.getElementsByName('point')[0].disabled = true;
			document.getElementsByName('type')[0].disabled = true;
			document.getElementsByName('description')[0].disabled = true;
		}
	},
	add_task: function () {
		var task_name = document.getElementsByName('task_name')[0].value;
		var end_time = document.getElementsByName('end_time')[0];
		var ponint = document.getElementsByName('point')[0];
		var type = document.getElementsByName('type')[0].value = task.type;
		var description = document.getElementsByName('description')[0].value;
		mapapi.createTask(task_name, description, point, type, end_time, function (err, data) {

		});
	},
	navi: function (task) {
		algorithm.navigition(task);
	}
};