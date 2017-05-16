(function () {
  'use strict';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr/test';
  }

  var saveButton = document.getElementsByClassName('save-button')[0];
  saveButton.addEventListener('click', saveToDatabase);

  function Task (tasks, runId) {
    this.runId = runId;
    this.task = tasks[0].value;
    this.location = tasks[1].value;
    this.purpose = tasks[2].value;
    this.contact = tasks[3].value;
    this.risk = tasks[4].value;
  }

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    var taskObj = new Task(taskInfoArray, runId);
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
