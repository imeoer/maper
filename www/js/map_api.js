/***
** map js api
***/

//var deviceid = device.uuid;

var deviceid = 12345678;

var baseUri = "http://10.10.0.103:3000/v1/";

var errorCode = {
	"101": "Network error",
	"102": "User not exsit",
	"103": "Create game error",
	"104": "Get tasks error",
	"105": "Create task error",
	"106": "Finish task error",
	"900": "Unknown reason"
};

var succCode = {
	"201": "Login successful",
	"202": "Register successful",
	"203": "Create game successful",
	"204": "Get tasks successful",
	"205": "Create tasks successful",
	"206": "Finish task successful",
	"900": "Other"
};

var header = "";

var mapapi = {
	getUserName : function(callback){
		$.ajax({
        type:'POST',
        url: baseUri+'token',
        dataType:'json',
        data: {'uuid': deviceid},
        timeout: 50000,
        cache: true,
        async: true,
        success: function(data, textStatus, HRX){
            if (data){
            	if (data.error){
            		return callback(data.error, null);
            	}else {
            		return callback(null, data);
            	}
            }else {
            	errorHandler("102");
            }
        },
    	error: function(err){
    			errorHandler("102");
    		}
    	});
	},

	regester : function(username, callback){
		$.ajax({
	        type:"POST",
	        url: baseUri+'users/register',
	        dataType:'json',
	        data: {"uuid": deviceid, "username": username},
	        timeout: 50000,
	        cache: true,
	        async: true,
	        success: function(data, textStatus, HRX){
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	errorHandler("102");
	            }
	        },
	    	error: function(err, ajaxOptions, thrownError){
	    			errorHandler("102");
	    		}
	    	});
	},
	//key Authorization value "bearer uuid"
	createGame : function(gameName, description, reward, username, callback){
		var param = {"game_name" : gameName,
					
					"description": description,
					"reward": reward,
					"username": username};
		$.ajax({
	        type:'POST',
	        url: baseUri+'games',
	        dataType:'json',
	        data: param,
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	errorHandler("103");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	getTasks : function(callback){
		$.ajax({
	        type:'GET',
	        //url: baseUri + username + "/" + task,
	        url: baseUri + "users/tasks",
	        dataType:'json',
	        data: "",
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){//{'create':[], 'join':[]}
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	errorHandler("104");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	createTask : function(game_name, task_name, description, reward, point, rule, type, end_time, callback){
		var params = {
			"game_name":game_name,
			"task_name":task_name,
			"description":description,
			"reward":reward,
			"point":point,
			"rule":rule,
			"type":type,
			"end_time":end_time
		};
		$.ajax({
	        type:'POST',
	        url: baseUri+'tasks',
	        dataType:'json',
	        data: params,
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	errorHandler("105");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	finishTask : function(task_name, callback){
		$.ajax({
	        type:'PUT',
	        url: baseUri+'tasks/' + task_name,
	        dataType:'json',
	        data: "",
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	errorHandler("106");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	}

};

function succHandler(code, data, msg){
	switch (code){
		case "201" :
			break; 
		case "202" :
			break;
		case "203" :
			break;
		case "204" :
			break;
		case "205" :
			break;
		case "206" :
			break;
		default:
			break;
		return;
	}
}

function errorHandler(code, msg){
	switch (code) {
		case "101" :
			break
		case "102" :
			break;
		case "103" :
			break;
		case "104" :
			break;
		case "105" :
			break;
		case "106" :
			break;
		default:
			break;
		return;
	}
}