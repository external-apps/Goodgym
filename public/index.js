(function () {
  'use strict';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  if (registerButton) {
    registerButton.href = window.location.origin + '/qr/test';
  }

  var saveButton = document.getElementsByClassName('save-button')[0];
  saveButton.addEventListener('click', saveToDatabase);

  function Task () {
    this.task = arguments[0][0];
    this.location = arguments[0][1];
    this.purpose = arguments[0][2];
    this.contact = arguments[0][3];
    this.risk = arguments[0][4];
  }

  function saveToDatabase () {
    // Send post request to backend with the data from all of the text areas.
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    var taskInfoObj = taskInfoArray.map(function (textarea) {
      return textarea.value;
    });

    var taskObj = new Task(taskInfoObj);
    console.log(taskObj);
  }
})();
