import http from 'http';
import express from 'express';
import path from 'path';

export default class HTTPserver {
  constructor(config = {}) {
    if (!config.port) throw ('No port found in config');

    const port = this.port = config.port;



    /* Express setup */
    const app = this.app = express();

    app.use(express.static(__dirname + '/public'));
    // 
    // app.get('/', (req, res) => {
    //   console.log('hi');
    //   console.log('dir:', __dirname + '/public/index.html');
    //   res.sendFile(__dirname + '/public/index.html');
    // });
    //
    // app.get('/table', (req, res) => {
    //   console.log('dir:', __dirname + '/public/table.html');
    //   res.sendFile('/public/table.html');
    // });
    //
    // app.get('/cards', (req, res) => {
    //   res.sendFile(__dirname + '/public/cards.html');
    // });




    /* HTTP server setup */
    const server = this.server = http.createServer(app);


  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`HTTP Server listening at http://localhost:${this.port}`);
    });
  }
}
