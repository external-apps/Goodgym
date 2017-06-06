/* global initMap XMLHttpRequest */

window.index = (function () {
  'use strict';

  var destination = '';
  var waypointsFromDatabase = [];
  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
  }

  function getRun () {
    var locationInfo = document.getElementsByClassName('location-info')[0].value;
    var runId = window.location.pathname;
    var url = window.location.origin + '/get-run' + runId;
    var req = new XMLHttpRequest();

    req.open('GET', url);
    req.onload = function () {
      if (req.status === 200) {
        var data = JSON.parse(req.response);
        if (data.length > 0) {
          waypointsFromDatabase = data[0].mapDetails;
          initMap(data);
          fillForm(data);
        } else {
          initMap([{
            startPoint: locationInfo
          }]);
        }
      } else {
        throw new Error(req.statusText);
      }
    };
    req.onerror = function () {
      throw new Error('Network error');
    };
    req.send();
  }

  function fillForm (response) {
<<<<<<< HEAD
    var data = response.length === 0 ? '' : response[0];
||||||| merged common ancestors
    if (!response[0]) return;
    var data = response[0];
=======
    if (!response) return;
>>>>>>> master
    var textareas = [].slice.call(document.querySelectorAll('textarea'));
    textareas.forEach(function (textarea) {
      if (textarea.name in response) {
        textarea.value = response[textarea.name];
      }
    });
  }

  function httpPostRequest (info, url) {
    var http = new XMLHttpRequest();
    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    var payload = JSON.stringify(info);

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);
      }
    };
    http.send(payload);
  }

  return {
    getRun: getRun,
    destination: destination,
    httpPostRequest: httpPostRequest,
    waypointsFromDatabase: waypointsFromDatabase
  };
})();
