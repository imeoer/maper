// user

var user = {
    // 获取用户个人信息
	get_profile: function () {
		mapapi.getUserName(function (err, data) {
            if (err) {
                alert(err);
            } else {
                $('.name').text(data.username);
            }   
        });
	},
    // 获取用户的任务
    get_user_tasks: function () {
        mapapi.getTasks(function (err, data) {
            var create_tasks = '';
            var join_tasks = '';
            for (var i = 0; i < data.create.length; i++) {
                create_tasks += '<li><div>·</div>' + data.create[i].task_name + '</li>'; 
            }
            $('#create-tasks').html(create_tasks);
            for (var i = 0; i < data.join.length; i++) {
                join_tasks += '<li><div>·</div>' + data.join[i].task_name + '</li>'; 
            }
            $('#join-tasks').html(join_tasks);
        });
    }
};