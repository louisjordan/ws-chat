const WebSocket = require('ws');
const EVENT = require('../../const').EVENT;

class ChatServer {
  constructor(config = { port: 8080, httpServer: null }) {
    this.port = config.port;
    this.httpServer = config.httpServer;

    this.chat = {
      clients: []
    };

    this.serverConfig = {
      verifyClient: (info, callback) => {
        this.verifyClient(info, callback);
      }
    };
  }

  /*
    opens a WebSocket server on http server or port provided

    returns a Promise that resolves when the server is listening

  */
  open() {
    let config = this.serverConfig;

    if (this.httpServer) {
      config.server = this.httpServer;
    } else {
      config.port = this.port;
    }

    return new Promise((resolve, reject) => {
      const server = this.server = new WebSocket.Server(config);
      server.on('message', (message) => this.messageEventHandler(message));
      server.on('listening', () => resolve());
    });
  }

  close() {
    this.chat.clients = [];
    this.server.close();
  }

  /*
    Verifies a client connection request

    Checks the nickname proveded as a header isn't taken.
    Responses:
      202 - Nickname accepted
      400 - No nickname header provided
      401 - Nickname is taken
  */
  verifyClient(info, callback) {
    if (info.req.headers.nickname) {
      let nickname = info.req.headers.nickname,
        clients = this.chat.clients,
        nicknameAdded = false;

      if (clients.length) {
        clients.forEach((client, index) => {
          if (!nicknameAdded) {
            if (nickname === client) {
              callback(false, 401, 'Nickname is taken');
            } else if (index === clients.length - 1) {
              this.addClient(nickname);
              callback(true, 202, 'Nickname accepted');
              nicknameAdded = true;
            };
          }
        });
      } else {
        this.addClient(nickname);
        callback(true, 202, 'Nickname accepted');
      }
    } else {
      callback(false, 400, 'No nickname header provided');
    }
  }

  addClient(nickname) {
    this.chat.clients.push(nickname);
  }

  messageEventHandler(message) {
    console.log(message);
  }

  pingEventHandler(data, socket) {
    console.log(data, socket);
  }

  /* Websocket Server initialisation */
  init(serverConfig) {
    const server = this.server = new WebSocket.Server(serverConfig);

    server.on('listening', () => {
      console.log(`WS Server listening at ws://localhost:${this.port}`);
    });
  }


};

module.exports = ChatServer;
