/* global index */

(function () {
  'use strict';

  var textareas = [].slice.call(document.querySelectorAll('textarea'));
  textareas.forEach(function (textarea) {
    textarea.readOnly = 'true';
  });

  index.getRun();
})();
