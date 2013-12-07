// for game

var game = {
	create_game: function () {
		var invite_user = document.getElementsByName('invite_user')[0].value;
		var reward = document.getElementsByName('reward')[0].value;
		mapapi.createGame(function (err, data) {
			if (data) {
				task_create.showPanel('task');
			} else {
				alert(err);
			}
		});
	}
};