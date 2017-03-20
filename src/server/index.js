/*
  Starts WebSocket and HTTP servers

  Dev env:  Websocket server only
  Prod env: WebSocket and HTTP server
*/

const ChatServer = require('./lib/ChatServer');



const isDevEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

if (isDevEnv) {
  const chatServer = new ChatServer({ port: 8080 });

  chatServer.open().then(() => {
    console.log('success');
  });
}

// http.listen();
