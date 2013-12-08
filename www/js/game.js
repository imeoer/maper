// for game

var game = {
	create_game: function (callback) {
		var invite_user = document.getElementsByName('invite_user')[0].value;
		var reward = document.getElementsByName('reward')[0].value;
		return callback(invite_user, reward);
	}
};