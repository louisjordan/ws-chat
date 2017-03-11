const WebSocket = require('ws');

module.exports = class WSserver {
  constructor(config = {}) {
    if (!config.server && !config.port) throw ('No server or port supplied');

    if (config.port) {
      this.port = config.port;
      this.init({ port: this.port });
    } else if (config.server) {
      this.http = server;
      this.init({ server: this.http });
    }
  }

  /* Websocket Server initialisation */
  init(serverConfig) {
    const server = this.server = new WebSocket.Server(serverConfig);

    server.on('listening', () => {
      console.log(`WS Server listening at ws://localhost:${this.port}`);
    });
  }


};
