var directionsDisplay = '';
var waypoints = [];

function initMap (data) {
  var startCity = {lat: 51.507368, lng: -0.128142};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: startCity
  });

  var directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });

  directionsDisplay.addListener('directions_changed', function () {
    logWaypoints();
    computeTotalDistance(directionsDisplay.getDirections());
  });

  // var waypoints = directionsDisplay[0].getDirections().route[0].legs[0].via_waypoint;
  // console.log(waypoints);
  function logWaypoints () {
    setTimeout(function () {
      // console.log(directionsDisplay.getDirections());
      if (directionsDisplay.getDirections()) {
        waypoints = directionsDisplay.getDirections().routes[0].legs[0].via_waypoint;
      }
    }, 500);
  }

  if (data) {
    var startPoint = data.startPoint;
    var endPoint = data.endPoint;
    if (data.mapDetails){
      waypoints = data.mapDetails;
    }
  } else {
    startPoint = 'brixton, London, UK';
    endPoint = 'clapham, London, UK';
  }

  displayRoute(startPoint, endPoint, directionsService, directionsDisplay, waypoints);
}

function displayRoute (origin, destination, service, display, waypoints) {
  var points = [];
  if (waypoints.length > 0) {
    waypoints.forEach(function (point) {
      points.push({ location: new google.maps.LatLng({lat: point.location.lat, lng: point.location.lng}) });
    });
  } else {
    points = [];
  };
  service.route({
    origin: origin,
    destination: destination,
    waypoints: points,
    travelMode: 'WALKING'
  }, function (response, status) {
    // console.log(response);
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance (result) {
  // var total = 0;
  // var myroute = result.routes[0];
  // for (var i = 0; i < myroute.legs.length; i++) {
  //   total += myroute.legs[i].distance.value;
  // }
  // total = total / 1000;
  // document.getElementById('total').innerHTML = total + ' km';
}

// This is aysnc
// setTimeout(function () {
//   console.log(directionsDisplay);
// }, 500);
