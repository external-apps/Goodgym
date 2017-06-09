/* global index sessionStorage */

(function () {
  'use strict';

  var backToQRButton = document.getElementsByClassName('button-container__confirmation-button')[0];
  backToQRButton.addEventListener('click', function () {
    window.location.pathname = '/qr/' + sessionStorage.run_id;
  });

  var taskSheetLocation = window.location.origin + '/task-sheet/' + sessionStorage.run_id;
  index.httpPostRequest({
    taskSheetURL: taskSheetLocation,
    firstName: document.getElementsByClassName('confirmation-body__firstName')[0].innerText,
    emailAddress: document.getElementsByClassName('confirmation-body__emailAddress')[0].innerText
  }, '/send-task-sheet/:id', console.log);
})();
