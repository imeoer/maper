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
		that.runAccelerometer();
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

		var getPlaceDetail = function(reference) {

			service.getDetails({
				reference: reference
			}, function(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					console.log(JSON.stringify(place));
					Toast.shortshow('Google place detail finish');
				}
			});
			
		};

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
					getPlaceDetail(results[0].reference);
				} else {
					Toast.shortshow('Google map no data');
				}
			}
		};

		service.nearbySearch(request, querySuccess);
	},

	runAccelerometer: function() {

		var lastUpdateTime = null;
		var lastPosition = null;

		var UPTATE_INTERVAL_TIME = 500;

		// init step counter
		var counter = 0;

		var h = 480;
		var mYOffset = h * 0.5;
		var STANDARD_GRAVITY = 9.80665;
		var MAGNETIC_FIELD_EARTH_MAX = 60.0;
		var mScale = [0, 0];
		mScale[0] = - (h * 0.5 * (1.0 / (STANDARD_GRAVITY * 2)));
		mScale[1] = - (h * 0.5 * (1.0 / (MAGNETIC_FIELD_EARTH_MAX)));
		var mLimit = 10.00; // 1.97  2.96  4.44  6.66  10.00  15.00  22.50  33.75  50.62
		var mLastValues = [0, 0, 0, 0, 0, 0];
		var mLastDirections = [0, 0, 0, 0, 0, 0];
		var mLastDiff = [0, 0, 0, 0, 0, 0];
		var mLastExtremes = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0]
		];
		var mLastMatch = -1;
		// init step counter

		var calcStep = function(position) {

			try {

				var vSum = 0;
				var currentPosAry = [position.x, position.y, position.z];
				for (var i = 0; i < 3; i++) {
					var v = mYOffset + currentPosAry[i] * mScale[1];
					vSum += v;
				}
				var k = 0;
				var v = vSum / 3;
				
				var direction = (v > mLastValues[k] ? 1 : (v < mLastValues[k] ? -1 : 0));
				if (direction == - mLastDirections[k]) {
					// Direction changed
					var extType = (direction > 0 ? 0 : 1); // minumum or maximum?
					mLastExtremes[extType][k] = mLastValues[k];
					var diff = Math.abs(mLastExtremes[extType][k] - mLastExtremes[1 - extType][k]);

					if (diff > mLimit) {
						
						var isAlmostAsLargeAsPrevious = diff > (mLastDiff[k]*2/3);
						var isPreviousLargeEnough = mLastDiff[k] > (diff/3);
						var isNotContra = (mLastMatch != 1 - extType);
						
						if (isAlmostAsLargeAsPrevious && isPreviousLargeEnough && isNotContra) {
							// one step
							Toast.shortshow(String(++counter));
							mLastMatch = extType;
						}
						else {
							mLastMatch = -1;
						}
					}
					mLastDiff[k] = diff;
				}
				mLastDirections[k] = direction;
				mLastValues[k] = v;
			} catch(err) {
				Toast.shortshow(err.message);
			}

		};

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

		navigator.accelerometer.watchAcceleration(calcStep, onError, {
			frequency: 100
		});

		Toast.shortshow('Step counter start...');

	},
};

app.initialize();