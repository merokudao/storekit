import express from "express";
import cors from 'cors';

import routes from "./routes";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();

    const corsOptions = {
      origin: [ /\.meroku\.store$/,
        'http://localhost:3000',
        'https://staging-dapp-registry.netlify.app',
        'https://editor.swagger.io',
      ]
    }

    this.server.use(cors(corsOptions));
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
