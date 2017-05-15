'use strict';

if (window.location.pathname.match(/^\/[0-9a-z]+$/)) {
  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  registerButton.href = window.location.origin + '/qr/test';
}
