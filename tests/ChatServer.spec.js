/* eslint-env jest */

const WebSocket = require('ws');

const ChatServer = require('../src/server/lib/ChatServer');

const server = new ChatServer({ port: 8080 });
const serverAddress = `ws://localhost:${server.port}`;

// Start each test with a fresh server
beforeEach(() => {
  return server.open();
});

// Close server after each test
afterEach(() => {
  return server.close();
});

describe('ChatServer', () => {

  it('opens a WebSocket server at the port provided', () => {
    return new Promise(function (resolve, reject) {

      let client = new WebSocket(serverAddress);

      client.addEventListener('error', () => {});

      client.addEventListener('unexpected-response', (req, res) => {
        client.close();

        /* server should return a 400 Bad Request status code due to lack of nickname header - this will confirm the server is running */
        if (res.statusCode === 400) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });

  it('accepts a connection from a client that provides an unused nickname', () => {
    return new Promise(function (resolve, reject) {
      let options = { headers: { nickname: 'john' } };

      let client = new WebSocket(serverAddress, options);

      client.addEventListener('open', () => {
        client.close();
        resolve();
      });

      client.addEventListener('error', error => {
        client.close();
        reject(error);
      });
    });
  });

  it('denies a connection from a client that provides a used nickname', () => {
    return new Promise(function (resolve, reject) {
      let client1options = { headers: { nickname: 'bob' } };
      let client2options = client1options;

      let client1 = new WebSocket(serverAddress, client1options);

      // open a connection from client 1 with nickname 'john'
      client1.addEventListener('open', () => {
        let client2 = new WebSocket(serverAddress, client2options);


        // expect a 401 status code as the nickname is taken
        client2.addEventListener('unexpected-response', (req, res) => {
          client1.close();
          client2.close();
          res.statusCode === 401 ? resolve() : reject();
        });



        client2.addEventListener('error', (err) => {});
        client2.addEventListener('open', () => reject('Client 2 connection was accepted'));
      });

      client1.addEventListener('error', (err) => reject(`Client 1 error: "${err}"`));
    });
  });

  it('broadcasts to all connected clients when a new client connects', () => {
    let client1options = { headers: { nickname: 'bob' } };
    let client2options = { headers: { nickname: 'bill' } };

    let client1 = new WebSocket(serverAddress, client1options);

    client1.addEventListener('open', () => {
      let client2 = new WebSocket(serverAddress, client2options);
    });

    client1.addEventListener('message', (message) => {
      // TODO: check message event type
    });
  });

  it('broadcasts to all connected clients when a client disconnects', () => {

  });
});
