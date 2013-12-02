var app = {

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		$(function() {
			app.receivedEvent('deviceready');
			try {
				app.run();
			}
			catch(error) {
				alert(error.message);
			}
		});
	},

	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		// $('.received').text('GPS Loading');

		console.log('Received Event: ' + id);
	},

	run: function() {
		var that = this;
		Toast.shortshow('GPS loading...');
		that.runGPS(function(latitude, longitude) {
			Toast.shortshow('GPS load success');
			that.runGoogleMap(latitude, longitude);
		});
		// that.runAccelerometer();
	},

	runGPS: function(callback) {

		var onSuccess = function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			callback(latitude, longitude);
			// $('.received').text(latitude + ', ' + longitude);
		};

		var onError = function(error) {
			alert(error.message);
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			timeout: 30000,
			enableHighAccuracy: false
		});
	},

	runGoogleMap: function(latitude, longitude) {
		Toast.shortshow('Google map request...');
		var origin = new google.maps.LatLng(latitude, longitude);
		var mapElem = $('#map')[0];
		var map = new google.maps.Map(mapElem, {
			center: origin
		});

		var request = {
			location: origin,
			radius: 1000,
			types: ['bus_station']
		};

		infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(map);

		var querySuccess = function(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				var placeAry = [];
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					placeAry.push(place.name);
				}
				if (placeAry.length) {
					$('.received').text(placeAry.join(', '));
					Toast.shortshow('Google request finish');
				} else {
					Toast.shortshow('Google map no data');
				}
			}
		}

		service.nearbySearch(request, querySuccess);
	},

	runAccelerometer: function() {

		var lastUpdateTime = null;
		var lastPosition = null;

		var UPTATE_INTERVAL_TIME = 500;

		var onSuccess = function(position) {
			var currentX = position.x.toFixed(1);
			var currentY = position.y.toFixed(1);
			var currentZ = position.z.toFixed(1);
			var currentUpdateTime = position.timestamp;

			if (!lastPosition) {
				lastPosition = {
					x: currentX,
					y: currentY,
					z: currentZ
				};
				lastUpdateTime = currentUpdateTime;
			} else {
				var timeInterval = currentUpdateTime - lastUpdateTime;
				if (timeInterval > UPTATE_INTERVAL_TIME) {
					lastUpdateTime = currentUpdateTime;
					var lastX = lastPosition.x;
					var lastY = lastPosition.y;
					var lastZ = lastPosition.z;

					var deltaX = currentX - lastX;
					var deltaY = currentY - lastY;
					var deltaZ = currentZ - lastZ;

					lastPosition = {
						x: currentX,
						y: currentY,
						z: currentZ
					};

					var speed = Math.sqrt(
						deltaX * deltaX +
						deltaY * deltaY +
						deltaZ * deltaZ) / timeInterval * 10000;

					$('.received').text(speed);
				}
			}
		};

		var onError = function() {
			alert('Accelerometer failed');
		};

		navigator.accelerometer.watchAcceleration(onSuccess, onError, {
			frequency: 100
		});

	},
};

app.initialize();