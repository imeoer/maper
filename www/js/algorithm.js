// algorithm

var algorithm = {
  // 任务导航
  navigition: function (task) {
    var R = 6371;  //地球半径
    var locationWatchId;
    var compassWatchId;
    var destinationBearing;
    var currentHeading;
    var that = this;
    var calculate_distance = function (position) {
      alert('oooo');
      try {
        var dLat = (task.point[0] - position.coords.latitude).toRad();
        var dLon = (task.point[1] - position.coords.longitude).toRad();
        var lat1 = task.latitude.toRad();
        var lat2 = position.coords.latitude.toRad();
        // alert(task.longitude + ', ' + position.coords.longitude);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        // alert(d);

        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        // alert(y + ', ' + x);
        destinationBearing = Math.atan2(y, x).toDeg();

        $('#compass-text').text((d * 1000).toFixed(4) + '米');

        if (d === 0) { // 到达指定地点
          navigator.geolocation.clearWatch(locationWatchId);
          navigator.compass.clearWatch(compassWatchId);
          if (task.type === 1) {
            that.jump(task);
          }
        }

      } catch (err) {
        alert(err.message);
      }
      return d;
    };
    var onPositionUpdate = function (position) {
      // alert(JSON.stringify(position));
      algorithm.runGoogleMap(position.coords.latitude, position.coords.longitude);
      calculate_distance(position);
    };
    var calculate_angle = function () {
      if (destinationBearing !== undefined) {
        diff = destinationBearing - currentHeading;
        var resultDeg = diff + 180;
        $('#compass').css('-webkit-transform', 'rotate(' + resultDeg + 'deg)');
        // alert(destinationBearing + ', ' + currentHeading);
      }
      //TODO
    };
    var onCompassUpdate = function (heading) {
      currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading): Math.round(heading.magneticHeading);
      calculate_angle();
    };
    var onError = function (error) {
      alert(error.message);
    };
    if (locationWatchId) {
      navigator.geolocation.clearWatch(locationWatchId);
    }
    if (compassWatchId) {
      navigator.compass.clearWatch(compassWatchId);
    }

    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }

    if (typeof(Number.prototype.toDeg) === "undefined") {
      Number.prototype.toDeg = function() {
        return this * 180 / Math.PI;
      }
    }

    locationWatchId = navigator.geolocation.watchPosition(onPositionUpdate, onError,
      {timeout: 30000, enableHighAccuracy: true});
    compassWatchId = navigator.compass.watchHeading(onCompassUpdate, onError, {frequency: 1000});
    
  },
  // 照相任务
  camera_shot: function (task) {
    var onSuccess = function (imageUrl) {
      //上传任务
    };
    var onError = function (message) {
      alert('Failed because: ' + message);
    };
    navigator.camera.getPicture(onSuccess, onError, {quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URL}
    );
  },
  // 跳起任务
  jump: function (task) {
    var lastUpdateTime = null;
    var lastPosition = null;
    var jumpWatchId;
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
    var mLimit = 4.44; // 1.97  2.96  4.44  6.66  10.00  15.00  22.50  33.75  50.62
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
              // one jump
              counter++;
              $('#jump').text(counter + '步');
              Toast.shortshow(String(counter));
              if (counter === 10) {
                navigator.accelerometer.clearWatach(jumpWatchId);
                mapapi.finishTask(task.task_name, function (err, data) {
                  if (data) {
                    alert('任务完成');
                  }
                  return;
                });
              }
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
    var onError = function() {
      alert('Accelerometer failed');
    };
    jumpWatchId = navigator.accelerometer.watchAcceleration(calcStep, onError, {
      frequency: 100
    });
    Toast.shortshow('Step counter start...');
  },
  // 谷歌地图
  runGoogleMap: function(latitude, longitude) {
    Toast.shortshow('Google map request...');
    var origin = new google.maps.LatLng(latitude, longitude);
    var mapElem = $('#map')[0];
    var map = new google.maps.Map(mapElem, {
      center: origin
    });

    var request = {
      location: origin,
      radius: 1000
      // types: ['bus_station']
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
        var place = results[0];
        if (place) {
          $('#navi-info').val('最近位置：' + place.name);
        }
        // for (var i = 0; i < results.length; i++) {
        //   var place = results[i];
        //   placeAry.push(place.name);
        // }
        // if (placeAry.length) {
        //   $('.received').text(placeAry.join(', '));
        //   Toast.shortshow('Google request finish');
        //   getPlaceDetail(results[0].reference);
        // } else {
        //   Toast.shortshow('Google map no data');
        // }
      }
    };

    service.nearbySearch(request, querySuccess);
  }
};
