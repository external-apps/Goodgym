/* global index maps waypoints destination anime */

window.home = (function () {
  'use strict';

  var taskInfo = [].slice.call(document.querySelectorAll('textarea'));

  window.addEventListener('load', function () {
    var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
    registerButton.href = window.location.origin + '/qr' + window.location.pathname;
    index.getRun();
  });

  var saveButton = document.getElementsByClassName('button-container__save-button')[0];
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
    index.httpPostRequest(emailBody, '/send-qr-email/:id');
  });

  function saveToDatabase () {
    var runId = window.location.pathname.slice(1);

    index.waypointsFromDatabase.forEach(function (point) {
      if (maps.waypoints.indexOf(point) === -1) {
        maps.waypoints.push(point);
      }
    });

    var taskObj = {
      mapDetails: waypoints,
      startPoint: taskInfo[1].value,
      endPoint: destination,
      task: taskInfo[0].value,
      location: taskInfo[1].value,
      purpose: taskInfo[2].value,
      contact: taskInfo[3].value,
      risk: taskInfo[4].value,
      email: taskInfo[5].value,
      runId: runId
    };

    index.httpPostRequest(taskObj, '/post-run/:id');
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

  return {
    taskInfo: taskInfo
  };
})();
