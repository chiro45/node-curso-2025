import express, { type Express } from "express";

import cors from "cors";
import { router } from "../routes/user.js";

export class Server {
  protected port: string;
  app: Express;
  userRoutesPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.userRoutesPath = "/api/users";
    //Middlewares
    this.middlewares();
    //Rutas de aplicacion

    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use(this.userRoutesPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app corriendo http://localhost:${this.port}`);
    });
  }
}
