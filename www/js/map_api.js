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
        async: true,
        success: function(data, textStatus, HRX){
            if (data) {
            	if (data.error){
            		return callback(data.error, null);
            	}else {
            		return callback(null, data);
            	}
            }else {
            	return callback("102", null);
            }
        },
    	error: function(err){
    			return callback("102", null);
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
	        async: true,
	        success: function(data, textStatus, HRX){
	            if (data){
	            	if (data.error){
            			return callback(data.error, null);
            		}else {
            			return callback(null, data);
            		}
	            }else {
	            	return callback("102", null);
	            }
	        },
	    	error: function(err, ajaxOptions, thrownError){
	    			return callback("102", null);
	    		}
	    	});
	},
	//key Authorization value "bearer uuid"
	createGame : function(reward, invite_user_name, callback){
		var param = {"reward": reward,
					 "invite_user_name": invite_user_name};
		$.ajax({
	        type:'POST',
	        url: baseUri+'games',
	        dataType:'json',
	        data: param,
	        timeout: 5000,
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
	            	return callback("103", null);
	            }
	        },
	    	error: function(err){
	    			return callback("102", null);
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
	            	return callback("104", null);
	            }
	        },
	    	error: function(err){
	    			return callback("102", null);
	    		}
	    	});
	},

	createTask : function(task_name, description, point, type, end_time, callback){
		var params = {
			"task_name":task_name,
			"description":description,
			"point":point,
			"type":type,
			"end_time":end_time
		};
		$.ajax({
	        type:'POST',
	        url: baseUri+'tasks',
	        dataType:'json',
	        data: params,
	        timeout: 5000,
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
	            	return callback("105", null);
	            }
	        },
	    	error: function(err){
	    			return callback("102", null);
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
	            	return callback("106", null);
	            }
	        },
	    	error: function(err){
	    			return callback("102", null);
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