/* eslint-env jest */

const WebSocket = require('ws');

const EVENT = require('../src/const').EVENT;

const ChatServer = require('../src/server/lib/ChatServer');

const server = new ChatServer({ port: 8080 });
const serverAddress = `ws://localhost:${server.port}`;

// Start each test with a fresh server
beforeEach(() => server.open());

// Close server after each test
afterEach(() => server.close());

describe('ChatServer', () => {
  it('opens a WebSocket server at the port provided', () => new Promise((resolve, reject) => {
    const client = new WebSocket(serverAddress);

    client.addEventListener('error', () => {});

    client.addEventListener('unexpected-response', (req, res) => {
      client.close();


      /* server should return a 400 Bad Request status code
         due to lack of nickname header - this will confirm the server is running */
      return res.statusCode === 400 ? resolve() : reject();
    });
  }));

  describe('authentication', () => {
    it('accepts a connection from a client that provides an unused nickname', () => new Promise((resolve, reject) => {
      const options = { headers: { nickname: 'john' } };

      const client = new WebSocket(serverAddress, options);

      client.addEventListener('open', () => {
        client.close();
        resolve();
      });

      client.addEventListener('error', (error) => {
        client.close();
        reject(error);
      });
    }));

    it('denies a connection from a client that provides a used nickname', () => new Promise((resolve, reject) => {
      const client1options = { headers: { nickname: 'bob' } };
      const client2options = client1options;

      const client1 = new WebSocket(serverAddress, client1options);


      client1.addEventListener('error', err => reject(`Client 1 error: "${err}"`));


      // open a connection from client 1 with nickname 'john'
      client1.addEventListener('open', () => {
        const client2 = new WebSocket(serverAddress, client2options);


        client2.addEventListener('error', () => { /* do nothing - let unexpected-response check the response */ });
        client2.addEventListener('open', () => reject('Client 2 connection was accepted'));


        // expect a 401 status code as the nickname is taken
        client2.addEventListener('unexpected-response', (req, res) => {
          client1.close();
          client2.close();
          return res.statusCode === 401 ? resolve() : reject();
        });
      });
    }));
  });

  describe('event handler', () => {
    it('broadcasts to all connected clients when a new client connects', () => {
      const client2nickname = 'bill';
      const client1options = { headers: { nickname: 'bob' } };
      const client2options = { headers: { nickname: client2nickname } };

      return new Promise((resolve) => {
        // open client1 socket
        const client1 = new WebSocket(serverAddress, client1options);

        // listen to messages and wait for a CLIENT_CONNECTED event with client2 nickname
        client1.addEventListener('message', (message) => {
          const messageObj = JSON.parse(message.data);

          if (messageObj.type === EVENT.CLIENT_CONNECTED && messageObj.nickname === client2nickname) {
            resolve();
          }
        });

        client1.addEventListener('open', () => {
          // when client1 opens, wait 2 seconds then open client 2
          const client2 = new WebSocket(serverAddress, client2options);

          client2.addEventListener('open', () => {});
        });
      });
    });

    /*
      Open client 1 -> Open client 2 -> Close client 2 -> Check for disconnect message to client 1
    */
    it('broadcasts to all connected clients when a client disconnects', () => {
      const client2nickname = 'bill';
      const client1options = { headers: { nickname: 'bob' } };
      const client2options = { headers: { nickname: client2nickname } };

      return new Promise((resolve) => {
        const client1 = new WebSocket(serverAddress, client1options);

        client1.addEventListener('message', (message) => {
          const messageObj = JSON.parse(message.data);

          if (messageObj.type === EVENT.CLIENT_DISCONNECTED && messageObj.nickname === client2nickname) {
            resolve();
          }
        });

        client1.addEventListener('open', () => {
          // when client1 opens, wait 2 seconds then open client 2
          const client2 = new WebSocket(serverAddress, client2options);

          client2.addEventListener('open', () => {
            client2.close();
          });
        });
      });
    });
  });
});
