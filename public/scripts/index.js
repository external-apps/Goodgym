/* global XMLHttpRequest */

window.app = (function () {
  'use strict';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
  }

  function Task (tasks, runId) {
    this.runId = runId;
    this.task = tasks[0].value;
    this.location = tasks[1].value;
    this.purpose = tasks[2].value;
    this.contact = tasks[3].value;
    this.risk = tasks[4].value;
    this.email = tasks[5].value;
  }

  function getRun () {
    var data = {
      runId: window.location.pathname
    };
    var url = window.location.origin + '/get-run' + data.runId;
    var req = new XMLHttpRequest();

    req.open('GET', url);
    req.onload = function () {
      if (req.status === 200) {
        fillForm(JSON.parse(req.response));
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
    if (!response[0]) return;
    var data = response[0].run;
    var textareas = [].slice.call(document.querySelectorAll('textarea'));
    textareas.forEach(function (textarea) {
      if (textarea.name in data) {
        textarea.value = data[textarea.name];
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
    Task: Task,
    httpPostRequest: httpPostRequest
  };
})();
