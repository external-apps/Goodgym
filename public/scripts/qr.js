/* global sessionStorage MutationObserver */

(function () {
  'use strict';
  var addedNode = '';

  if (!sessionStorage.run_id || sessionStorage.run_id === undefined) {
    sessionStorage.setItem('run_id', window.location.pathname.split('/')[2]);
  }

  // This makes browser.js think that the browser is a desktop and not mobile.
  Object.defineProperty(navigator, 'userAgent', {
    get: function () { return 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0)'; }
  });

  var observer = new MutationObserver(function (mutation) {
    if (!mutation[0].addedNodes[0]) { return; }
    if (mutation[0].type === 'childList' && !mutation[0].removedNodes[0]) {
      var qrSvg = mutation[0].addedNodes[0].querySelector('#canvas').getAttribute('src');
      addedNode = mutation[0].addedNodes[0];
      createQR(qrSvg);
      addedNode.remove();
    }
  });

  var config = { attributes: true, childList: true, characterData: true };
  var target = document.querySelector('.qr-container');
  if (window.location.pathname.split('/')[1] === 'qr') {
    observer.observe(target, config);
  }

  function createQR (qrSvg) {
    var qr = document.querySelector('.qr-image');
    qr.classList.remove('display-none');
    qr.src = qrSvg;
  };
})();
