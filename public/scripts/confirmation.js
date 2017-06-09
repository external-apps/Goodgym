/* global index sessionStorage */

(function () {
  'use strict';

  var backToQRButton = document.querySelector('.button-container__confirmation-button');
  backToQRButton.addEventListener('click', function () {
    window.location.pathname = '/qr/' + sessionStorage.run_id;
  });

  var taskSheetLocation = window.location.origin + '/task-sheet/' + sessionStorage.run_id;

  index.httpPostRequest({
    runId: sessionStorage.run_id,
    runner: document.querySelector('.confirmation-body__emailAddress').innerText
  }, '/add-runner', console.log);

  index.httpPostRequest({
    taskSheetURL: taskSheetLocation,
    firstName: document.querySelector('.confirmation-body__firstName').innerText,
    emailAddress: document.querySelector('.confirmation-body__emailAddress').innerText
  }, '/send-task-sheet', console.log);
})();
