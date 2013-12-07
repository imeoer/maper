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
            if (data.create.length) {
                $('.info').text('1个游戏，' + data.join.length + '个任务')
            } else {
                $('.info').text('0个游戏，' + data.join.length + '个任务')
            }
            var create_tasks = '';
            var join_tasks = '';
            for (var i = 0; i < data.create.length; i++) {
                create_tasks += '<li class="createtask"><div>·</div>';
                create_tasks += data.create[i].task_name + '</li>';
            }
            $('#create-tasks').html(create_tasks);
            for (var i = 0; i < data.join.length; i++) {
                join_tasks += '<li class="jointask"><div>·</div>' + data.join[i].task_name + '</li>'; 
            }
            $('#join-tasks').html(join_tasks);
            $('.createtask').each(function (index, value) {
                $(value).bind('click', function () {
                    alert(data.create[index]);
                    // TODO for imeoer
                });
            });
            $('.jointask').each(function (index, value) {
                $(value).bind('click', function () {
                    alert(data.join[index]);
                    // TODO for imeoer
                });
            });
        });
    }
};