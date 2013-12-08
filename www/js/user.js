// user

var data = {
    
}

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
        if (data.create.create_tasks.length) {
            $('.info').text('1个游戏，' + data.join.join_tasks.length + '个任务')
        } else {
            $('.info').text('0个游戏，' + data.join.join_tasks.length + '个任务')
        }
        var create_tasks = '';
        var join_tasks = '';
        for (var i = 0; i < data.create.create_tasks.length; i++) {
            create_tasks += '<li class="createtask"><div>·</div>';
            create_tasks += data.create.create_tasks[i].task_name + '</li>';
        }
        $('#create-tasks').html(create_tasks);
        for (var i = 0; i < data.join.join_tasks.length; i++) {
            join_tasks += '<li class="jointask"><div>·</div>' + data.join.join_tasks[i].task_name + '</li>'; 
        }
        $('#join-tasks').html(join_tasks);
        $('#progress-info').text('我的进度');
        $('#progress-main').text(data.join.player.progress);
        $('.createtask').each(function (index, value) {
            $(value).bind('click', function () {
                $('.createtask').removeClass('select');
                $(this).addClass('select');
                task.get_task_info(data.create.create_tasks[index]);
            });
        });
        $('.jointask').each(function (index, value) {
            $(value).bind('click', function () {
                $('.jointask').removeClass('select');
                $(this).addClass('select');
                task.get_task_info(data.join.join_tasks[index]);

                        //对于正在进行的游戏
                if (!data.join.join_tasks[index].finished) {
                    $('.nav').bind('click', function () {
                        task_create.showPanel('navi');
                        task.navi(data.join.join_tasks[index]);
                    });
                }
            });
        });
        $('#create-switch').bind('click', function () {
            if (data.create.player.username) {
                $('#progress-info').text('玩家 ' + data.create.player.username + ' 进度');
            }
            $('#progress-main').text(data.create.player.progress);
        });
        $('#join-switch').bind('click', function () {
            $('#progress-info').text('我的进度');
            $('#progress-main').text(data.join.player.progress);
        });
    }
};