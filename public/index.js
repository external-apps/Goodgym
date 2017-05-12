'use strict';

if (window.location.pathname.match(/^\/[0-9a-z]+$/)) {
  var registerButton = document.getElementsByClassName('_yoti-verify-button')[0];
  registerButton.href = window.location.origin + '/qr/test';
}

var qrcode = document.querySelector('.qr-code-output');
var result = document.querySelector('.result');
var info = undefined;

window.onload = function () {
  var http = new XMLHttpRequest();
  http.addEventListener('load', function (e) {
    var responseObj = JSON.parse(e.target.responseText);
    qrcode.innerHTML = responseObj.svg;
    listenForToken(responseObj.proto, responseObj.url);
    info = responseObj.svg;
    console.log(info);
  });
  var url = window.location.origin + '/qr-maker/:id';
  http.open('GET', url);
  http.send();
};

// 2. After SVG received, set up WebSocket with YOTI to handle response
function listenForToken (proto, url) {
  var host = 'wss://api.yoti.com/api/v1/connect-sessions/' + proto;
  var socket = new WebSocket(host);
  socket.onopen = function () {
    socket.send(JSON.stringify({subscription: proto}));
  };
  // Get Token
  socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.status) {
      case 'COMPLETED' : {
        window.location = 'confirmation?token=' + data.token;
      }
    }
  };
}
