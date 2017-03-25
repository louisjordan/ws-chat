const WebSocket = require('ws');
const EVENT = require('../../const').EVENT;

class ChatServer {
  constructor(config = { port: 8080, httpServer: null }) {
    this.port = config.port;
    this.httpServer = config.httpServer;

    this.chat = {
      clients: [],
    };

    this.serverConfig = {
      verifyClient: (info, callback) => {
        this.verifyClient(info, callback);
      },
    };
  }

  /*
    opens a WebSocket server on http server or port provided

    returns a Promise that resolves when the server is listening

  */
  open() {
    const config = this.serverConfig;

    if (this.httpServer) {
      config.server = this.httpServer;
    } else {
      config.port = this.port;
    }

    return new Promise((resolve, reject) => {
      this.server = new WebSocket.Server(this.serverConfig);
      this.server.on('connection', socket => this.connectionEventHandler(socket));
      this.server.on('error', error => reject(error));
      this.server.on('listening', () => resolve());
    });
  }

  /* Empty the client list and close the WebSocket server */
  close() {
    this.chat.clients = [];
    this.server.close();
  }

  /* New connection event handler */
  connectionEventHandler(socket) {
    this.configureSocket(socket);
  }

  /* Configure socket events */
  configureSocket(socket) {
    socket.on('message', jsonMessage => this.socketMessageEventHandler(socket, jsonMessage));
    socket.on('disconnect');
  }

  /* Socket message event handler */
  socketMessageEventHandler(socket, jsonMessage) {
    const messageObj = typeof jsonMessage === 'string' ? JSON.parse(jsonMessage) : jsonMessage;
    if (!messageObj.type) throw new Error('No message type');

    switch (messageObj.type) {
      case EVENT.CHAT_MESSAGE:
        this.broadcastToAll(messageObj);
        break;
      default:
        throw new Error(`Unsupport message type ${messageObj.type}`);
    }
  }

  /* Send a message to all connected clients */
  broadcastToAll(messageObj) {
    if (!messageObj.type) throw new Error('No message type');
    const jsonMessage = typeof messageObj === 'string' ? messageObj : JSON.stringify(messageObj);

    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonMessage);
      }
    });
  }

  /* Send a message to all connected clients except one */
  broadcastToAllExceptOne(messageObj, exceptClient) {
    if (!messageObj.type) throw new Error('No message type');
    const jsonMessage = typeof messageObj === 'string' ? messageObj : JSON.stringify(messageObj);

    this.server.clients.forEach((client) => {
      if (client !== exceptClient && client.readyState === WebSocket.OPEN) {
        client.send(jsonMessage);
      }
    });
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
    const nickname = info.req.headers.nickname;
    const clients = this.chat.clients;

    // 400: No nickname header provided.
    if (!nickname) return callback(false, 400, 'No nickname header provided');

    // filter clients with the same name
    const duplicateNickname = clients.filter(client => client.nickname === nickname);

    // 401: Nickname is taken.
    if (duplicateNickname.length) return callback(false, 401, 'Nickname is taken');

    // 202: Nickname accepted
    this.addClient(nickname);
    return callback(true, 202, 'Nickname accepted');
  }

  /* Add a client to the client list */
  addClient(nickname) {
    this.chat.clients.push({ nickname });
    this.broadcastToAll({ type: EVENT.CLIENT_CONNECTED, nickname });
  }

  /* Remove a client from the list */
  removeClient(nickname) {
    this.chat.clients = this.chat.clients.filter(client => client.nickname !== nickname);
    this.broadcastToAll({ type: EVENT.CLIENT_DISCONNECTED, nickname });
  }

  pingEventHandler(data, socket) {
    console.log(data, socket);
  }


}

module.exports = ChatServer;
