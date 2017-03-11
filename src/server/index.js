/*
  Starts WebSocket and HTTP servers

  Dev env:  Websocket server only
  Prod env: WebSocket and HTTP server
*/

const WSserver = require('./lib/WSServer');



const isDevEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

if (isDevEnv) {
  const ws = new WSserver({ port: 3030 });
}

// http.listen();
