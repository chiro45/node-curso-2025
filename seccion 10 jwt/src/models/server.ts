import express, { type Express } from "express";

import cors from "cors";
import { routeUser } from "../routes/user";
import { dbConnection } from "../datbase/config";
import { swaggerDocs } from "../config/swagger";
import { authRouter } from "../routes/auth";

export class Server {
  protected port: string;
  app: Express;
  userRoutesPath: string;
  authPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.userRoutesPath = "/api/users";
    this.authPath = "/api/auth";
    //conection bd
    this.connectToMongo();
    //Middlewares
    this.middlewares();
    //Rutas de aplicacion
    this.routes();
    //Swagger
    this.initSwagger();
  }

  //conectar a la bd
  async connectToMongo() {
    await dbConnection();
  }
  initSwagger() {
    swaggerDocs(this.app);
  }
  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use(this.authPath, authRouter);
    this.app.use(this.userRoutesPath, routeUser);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app corriendo http://localhost:${this.port}`);
    });
  }
}
