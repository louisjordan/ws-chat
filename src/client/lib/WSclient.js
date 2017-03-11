/* Client WebSocket code */

var wss = new window.WebSocket('ws://localhost:8080/');
var client_id = null

wss.onopen = function () {
  console.log('WS connected!');
};

wss.onmessage = function (message) {
  handleWSMessage(message);
};

wss.onclose = function () {
  console.log('Connection closed');
};

wss.onerror = function (err) {
  console.log('Connection error');
  console.log(err);
};

export default class WSClient {
  constructor() {

  }

  connect() {
    this.socket = socket = new window.WebSocket('ws://localhost:3030/');

    socket.onopen = () => {
      console.log('Socket connected!');
    };
  }
};
