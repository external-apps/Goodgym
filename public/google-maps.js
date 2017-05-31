var waypoints = [];
var destination = '';

function initMap (data) {
  // waypoints += data.mapDetails;
  // console.log('Waypoints:', waypoints);
  // console.log(data);
  var map = new google.maps.Map(document.getElementById('map'));
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });

  directionsDisplay.addListener('directions_changed', function () {
    waypoints = directionsDisplay.getDirections().routes[0].legs[0].via_waypoint;
    destination = directionsDisplay.getDirections().routes[0].legs[0].end_address;
    computeTotalDistance(directionsDisplay.getDirections());
  });

  if (data.length > 0) {
    console.log(data);
    var startPoint = data[0].run.startPoint;
    // var endPoint = destination || data[0].run.startPoint;
    var endPoint = data[0].run.endPoint;

    if (data.mapDetails) {
      // data.mapDetails.forEach(function (point) {
      //   console.log(point);
      //   waypoints.push(point);
      // });
      // console.log(waypoints);
      // console.log(data.mapDetails);
      waypoints = data.mapDetails;
    }
  } else {
    startPoint = 'brixton, London, UK';
    endPoint = 'clapham, London, UK';
  }

  displayRoute(startPoint, endPoint, directionsService, directionsDisplay, waypoints);
}

function displayRoute (startPoint, endPoint, service, display, waypoints) {
  var points = [];
  if (waypoints.length > 0) {
    waypoints.forEach(function (point) {
      points.push({ location: new google.maps.LatLng({lat: point.location.lat, lng: point.location.lng}) });
    });
  }
  console.log(points);
  service.route({
    origin: startPoint,
    destination: endPoint,
    waypoints: points,
    travelMode: 'WALKING'
  }, function (response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance (result) {
  if (!result) { return; }
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}
