(function () {
  'use strict';
  var addedNode = '';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr/test';
  }

  var saveButton = document.getElementsByClassName('save-button')[0];
  if (saveButton) {
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
