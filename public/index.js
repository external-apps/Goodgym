(function () {
  'use strict';
  var addedNode = '';
  var waypointsFromDatabase = [];

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr/test';
  }

  var saveButton = document.getElementsByClassName('save-button')[0];
  if (saveButton) {
    window.onload = getRun();
    saveButton.addEventListener('click', saveToDatabase);
  }

  var loginButton = document.getElementsByClassName('login-button')[0];
  if (loginButton) {
    loginButton.addEventListener('click', handleLoginClick);
  }

  function handleLoginClick () {
    var loginForm = document.getElementsByClassName('form-container__input')[0];
    var runId = loginForm.value;
    directToHomePage(runId);
  }

  function directToHomePage (runId) {
    window.location.pathname = runId;
  }

  function Task (tasks, runId, startPoint, endPoint, waypoints) {
    this.mapDetails = waypoints;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.task = tasks[0].value;
    this.location = tasks[1].value;
    this.purpose = tasks[2].value;
    this.contact = tasks[3].value;
    this.risk = tasks[4].value;
    this.runId = runId;
  }

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    // Take the points from the map pulled from database rather than the array which clears on page reload
    // console.log(waypoints);
    var startPoint = 'Camberwell, London, UK'; // This needs to come from the goodgym API
    var endPoint = 'Peckham, London, UK'; // This needs to come from the goodgym api API
    // add waypointsFromDatabase to waypoints here
    // console.log(waypointsFromDatabase, waypoints);
    waypointsFromDatabase.forEach(function (point) {
      console.log('forEach running');
      console.log(point);
      waypoints.push(point);
    });
    console.log(waypoints);
    var taskObj = new Task(taskInfoArray, runId, startPoint, endPoint, waypoints);
    // console.log('TASK Object:', taskObj);
    httpPostRequest(taskObj);
  }

  function httpPostRequest (info) {
    var http = new XMLHttpRequest();
    var url = '/post-run/:id';
    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    console.log(info);
    var payload = JSON.stringify(info);
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);
      }
    };
    http.send(payload);
  }

  function getRun () {
    var data = {
      runId: window.location.pathname
    };
    var url = 'https://localhost:3000/get-run' + data.runId;
    var req = new XMLHttpRequest();

    req.open('GET', url);
    req.onload = function () {
      if (req.status === 200) {
        var data = JSON.parse(req.response);
        waypointsFromDatabase = data[0].run.mapDetails;
        // console.log(waypointsFromDatabase);
        fillForm(data);
      } else {
        new Error(req.statusText);
      }
    };
    req.onerror = function () {
      new Error('Network error');
    };
    req.send();
  }

  function fillForm (response) {
    var data = response.length === 0 ? '' : response[0].run;
    initMap(data);

    var textareas = [].slice.call(document.querySelectorAll('textarea'));
    textareas.forEach(function (textarea) {
      if (textarea.name in data) {
        textarea.value = data[textarea.name];
      }
    });
  }

  var observer = new MutationObserver(function (mutation) {
    if (!mutation[0].addedNodes[0]) { return; }
    if (mutation[0].type === 'childList') {
      var qrSvg = mutation[0].addedNodes[0].querySelector('#canvas').getAttribute('src');
      addedNode = mutation[0].addedNodes[0];
      createQR(qrSvg);
      addedNode.remove();
    }
  });

  var config = { attributes: true, childList: true, characterData: true };
  var target = document.getElementsByClassName('qr-container')[0];
  if (window.location.pathname.split('/')[1] === 'qr') {
    observer.observe(target, config);
  }

  function createQR (qrSvg) {
    var qr = document.getElementsByClassName('qr-image')[0];
    qr.classList.remove('display-none');
    qr.src = qrSvg;
  };
})();
