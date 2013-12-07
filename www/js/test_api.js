var mapapi = {
	getUserName : function(){
		mapapi.getUserName(deviceid);
	},

	regester : function(username){
		mapapi.regester("abcdefg");
	},

	createGame : function(gameName, description, reward, username){
		
	},

	getTasks : function(username, task){
		
	},

	createTask : function(game_name, task_name, description, reward, point, rule, type, end_time){
		
		mapapi.createTask(game_name, task_name, description, reward, point, rule, type, end_time);
	},

	finishTask : function(task_name){
		var task_name = "1";
		mapapi.finishTask();
	}

};