(function () {
  'use strict';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr/test';
  }

  var saveButton = document.getElementsByClassName('save-button')[0];
  saveButton.addEventListener('click', saveToDatabase);

  function Task () {
    this.task = arguments[0][0].value;
    this.location = arguments[0][1].value;
    this.purpose = arguments[0][2].value;
    this.contact = arguments[0][3].value;
    this.risk = arguments[0][4].value;
  }

  function saveToDatabase () {
    // Send post request to backend with the data from all of the text areas.
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    var taskObj = new Task(taskInfoArray);
    httpPostRequest(taskObj);
  }

  function httpPostRequest (info) {
    var http = new XMLHttpRequest();
    var url = '/post-run/:id';
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
})();
