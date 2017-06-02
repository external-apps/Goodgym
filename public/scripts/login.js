(function () {
  'use strict';

  var loginButton = document.getElementsByClassName('button-container__login-button')[0];
  var formInput = document.getElementsByClassName('form-container__input')[0];

  loginButton.addEventListener('click', handleLoginClick);
  formInput.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      handleLoginClick();
    }
  });

  function handleLoginClick () {
    var loginForm = document.getElementsByClassName('form-container__input')[0];
    var runId = loginForm.value;
    directToHomePage(runId);
  }

  function directToHomePage (runId) {
    window.location.pathname = runId;
  }
})();
