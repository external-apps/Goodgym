var directionsDisplay = '';
var waypoints = null;

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

  // This is the function that we will need to run to render the map. directionsDisplay
  // will either have to come from the database or the runId in the params
  displayRoute('Camberwell, London, UK', 'Peckham, London, UK', directionsService,
  directionsDisplay, waypoints);
}

function displayRoute (origin, destination, service, display, waypoints) {
  console.log(waypoints);
  if (waypoints) {
    var lat = waypoints[0].location.lat;
    var lon = waypoints[0].location.lng;
    var lat2 = waypoints[1].location.lat;
    var lon2 = waypoints[1].location.lng;
    var points = [
      { location: new google.maps.LatLng({lat: lat, lng: lon}) },
      { location: new google.maps.LatLng({lat: lat2, lng: lon2}) }
    ];
    console.log({lat: lat, lng: lon});
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
