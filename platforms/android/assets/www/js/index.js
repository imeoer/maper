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

		$('.received').text('GPS Loading');

		console.log('Received Event: ' + id);
	},

	run: function() {
		var that = this;
		that.runGPS(function(latitude, longitude) {
			that.runMap(latitude, longitude);
		});
	},

	runGPS: function(callback) {

		var onSuccess = function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			callback(latitude, longitude);
			$('.received').text(latitude + ', ' + longitude);
		};

		var onError = function(error) {
			alert(error.message);
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			timeout: 30000,
			enableHighAccuracy: false
		});
	},

	runMap: function(latitude, longitude) {
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
				}
			}
		}

		service.nearbySearch(request, querySuccess);
	}
};

app.initialize();