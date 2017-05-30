(function () {
  'use strict';
  var addedNode = '';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
  }

  var qrContainer = document.getElementsByClassName('qr-container')[0];
  if (qrContainer) {
    if (!sessionStorage.run_id || sessionStorage.run_id === undefined) {
      sessionStorage.setItem('run_id', window.location.pathname.split('/')[2]);
    }
  }

  var saveButton = document.getElementsByClassName('button-container__save-button')[0];
  if (saveButton) {
    window.onload = getRun();
    saveButton.addEventListener('click', saveToDatabase);
  }

  var loginButton = document.getElementsByClassName('button-container__login-button')[0];
  if (loginButton) {
    var formInput = document.getElementsByClassName('form-container__input')[0];
    loginButton.addEventListener('click', handleLoginClick);
    formInput.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        handleLoginClick();
      }
    });
  }

  var backToQRButton = document.getElementsByClassName('button-container__confirmation-button')[0];
  if (backToQRButton) {
    backToQRButton.addEventListener('click', function () {
      window.location.pathname = '/qr/' + sessionStorage.run_id;
    });
  }

  var confirmationPage = document.getElementsByClassName('confirmation-container')[0];
  if (confirmationPage) {
    var taskSheetLocation = window.location.origin + '/task-sheet/' + sessionStorage.run_id;
    httpPostRequest({
      taskSheetURL: taskSheetLocation,
      firstName: document.getElementsByClassName('confirmation-body__firstName')[0].innerText,
      emailAddress: document.getElementsByClassName('confirmation-body__emailAddress')[0].innerText
    }, '/send-task-sheet/:id');
  }

  var sendEmailButton = document.getElementsByClassName('button-container__send-email-button')[0];
  if (sendEmailButton) {
    sendEmailButton.addEventListener('click', function () {
      var emailBody = {
        emailAddress: document.getElementsByClassName('email-container__email-input')[0].value,
        qrAddress: window.location.origin + '/qr' + window.location.pathname
      };
      httpPostRequest(emailBody, '/send-qr-email/:id');
    });
  }

  function handleLoginClick () {
    var username = document.getElementsByClassName('form-container__input')[0].value;
    var password = document.getElementsByClassName('form-container__input')[1].value;
    var runId = document.getElementsByClassName('form-container__input')[2].value;
    directToHomePage(runId);
    httpPostRequest({username: username, password: password}, '/login');
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
    this.email = tasks[5].value;
  }

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    var taskObj = new Task(taskInfoArray, runId);
    httpPostRequest(taskObj, '/post-run/:id');
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
