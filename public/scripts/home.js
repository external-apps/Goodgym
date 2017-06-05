/* global app anime */

(function () {
  'use strict';

  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  registerButton.href = window.location.origin + '/qr' + window.location.pathname;

  var saveButton = document.getElementsByClassName('button-container__save-button')[0];
  window.addEventListener('load', app.getRun);
  saveButton.addEventListener('click', saveToDatabase);

  var sendEmailButton = document.getElementsByClassName('button-container__send-email-button')[0];
  sendEmailButton.addEventListener('click', function () {
    triggerVerification(
      document.querySelector('.button-container__send-email-button'),
      document.querySelector('.button-container__qr-verification-button'),
      document.getElementsByClassName('checkmark')[1]
    );
    var emailBody = {
      emailAddress: document.getElementsByClassName('email-container__email-input')[0].value,
      qrAddress: window.location.origin + '/qr' + window.location.pathname
    };
    app.httpPostRequest(emailBody, '/send-qr-email/:id');
  });

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);
    var taskInfoArray = [].slice.call(document.querySelectorAll('textarea'));
    var taskObj = new app.Task(taskInfoArray, runId);
    app.httpPostRequest(taskObj, '/post-run/:id');
    triggerVerification(
      document.querySelector('.button-container__save-button'),
      document.querySelector('.button-container__save-verification-button'),
      document.getElementsByClassName('checkmark')[0]
    );
  }

  function triggerVerification (element, verifiedButton, checkmark) {
    checkmark.style.visibility = 'hidden';
    verifiedButton.classList.remove('hidden');
    element.classList.add('hidden');
    setTimeout(function () {
      animateCheckmark();
    }, 100);

    setTimeout(function () {
      checkmark.style.visibility = 'visible';
    }, 250);

    setTimeout(function () {
      verifiedButton.classList.add('hidden');
      element.classList.remove('hidden');
    }, 1250);
  }

  function animateCheckmark () {
    anime({
      targets: '#checkmark path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      opacity: {
        value: 1,
        duration: 100
      }
    });
  }
})();
