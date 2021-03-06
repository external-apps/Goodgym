/* global map home XMLHttpRequest */

window.index = (function () {
  'use strict';

  var registerButton = document.querySelector('._yoti-verify-button');
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
  }

  function request (method, url, body, cb) {
    var req = new XMLHttpRequest();

    req.addEventListener('load', function () {
      if (req.status === 200) {
        cb(null, JSON.parse(req.responseText));
      } else {
        cb(new Error(req.statusText));
      }
    });
    req.addEventListener('error', cb);

    req.open(method, url);

    if (method.toUpperCase() === 'POST') {
      req.setRequestHeader('Content-Type', 'application/json');
    }

    req.send(JSON.stringify(body));
  }

  function get (url, cb) {
    request('GET', url, null, cb);
  }

  function httpPostRequest (body, url, cb) {
    request('POST', url, body, cb);
  }

  function getRun () {
    var locationInfo = document.querySelector('.location-info').value;
    var destinationInfo = document.querySelector('.destination').innerText;
    if (destinationInfo === ', , ') { destinationInfo = null; }
    var runId = window.location.pathname;
    if (runId.indexOf('/task-sheet') !== -1) {
      runId = runId.replace('/task-sheet', '');
    }
    var url = window.location.origin + '/get-run' + runId;
    get(url, function (err, data) {
      if (err) return console.log(err);
      if (data) {
        home.addToWaypoints(data.mapDetails);
        map.initMap(data);
        fillForm(data);
      } else {
        map.initMap({
          startPoint: locationInfo,
          endPoint: destinationInfo
        });
      }
    });
  }

  function fillForm (response) {
    var textareas = [].slice.call(document.querySelectorAll('textarea'));
    textareas.forEach(function (textarea) {
      if (textarea.name in response) {
        if (textarea.name === 'runners') {
          textarea.value = response[textarea.name.split(',')].join(', ');
        } else {
          textarea.value = response[textarea.name];
        }
      }
    });
  }

  return {
    getRun: getRun,
    httpPostRequest: httpPostRequest
  };
})();
