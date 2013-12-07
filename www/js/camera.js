/** 
** Camera Method
**/


var cameraSet = {

	initCamera : function(){
		$(document).on('swiperight', function (event) {
			$('#cameraTask').addClass('animation');
		}).on('swipeleft', function (event) {
			$('#cameraTask').removeClass('animation');
		});
		$('#main').hide();
		$('#main1').hide();
		$('#content').hide();
		$('#task').hide();
		$('#navi').hide();
		$('#cameraTask').show();
	},
	
	bindCamera : function(){
		$('.img-camera').click(function(){
			cameraSet.getPicture(navigator);
		});
	},
	
	getPicture : function(navigation, success, fail){
		navigation.camera.getPicture(success?success:this.onSuccess, fail?fail:this.onFail, { quality: 50});
	},
	
	onSuccess : function(imageData){
		console.log("camera suc")
		var image = document.getElementById('myImage');
   		image.src = "data:image/jpeg;base64," + imageData;
		$('.img-camera').attr("status","ok");
		return true;
	},
	
	onFail : function(message){
		console.log("camera false")
		alert("获取照片失败:" + message);
		return false;
	}
}