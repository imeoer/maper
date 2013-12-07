/** 
** Camera Method
**/

var cameraSet = {
	bindCamera : function(){
		$('.camera-img').click(function(){
			cameraSet.getPicture(navigator);
		});
	},
	
	getPicture : function(navigation, success, fail){
		navigation.camera.getPicture(success?success:this.onSuccess, fail?fail:this.onFail, { quality: 50});
	},
	
	onSuccess : function(imageData){
		$('.camera-img').attr("src", "data:image/jpeg;base64," + imageData);
		return true;
	},
	
	onFail : function(message){
		console.log("camera false")
		alert("获取照片失败:" + message);
		return false;
	}
}