(function () {
  'use strict';

  var loginButton = document.querySelector('.button-container__login-button');
  var formInput = document.querySelector('.form-container__input');

  loginButton.addEventListener('click', handleLoginClick);
  formInput.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      handleLoginClick();
    }
  });

  function handleLoginClick () {
    var loginForm = document.querySelector('.form-container__input');
    var runId = loginForm.value;
    if (!runId) { return; }
    directToHomePage(runId);
  }

  function directToHomePage (runId) {
    window.location.pathname = runId;
  }
})();
