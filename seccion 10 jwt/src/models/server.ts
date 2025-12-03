import express, { type Express } from "express";

import cors from "cors";
import { dbConnection } from "../datbase/config";
import { swaggerDocs } from "../config/swagger";
import { routeUser } from "@routes/users";
import { authRouter } from "@routes/auth";
import { routeCategories } from "@routes/categories";
import { routeProducts } from "@routes/products";
import { routeSearch } from "@routes/search";

export class Server {
  protected port: string;
  app: Express;
  userRoutesPath: string;
  categoriesPath: string;
  productsPath: string;
  authPath: string;
  searchPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.userRoutesPath = "/api/users";
    this.authPath = "/api/auth";
    this.categoriesPath = "/api/cateogories";
    this.productsPath = "/api/products";
    this.searchPath = "/api/search";
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
    this.app.use(this.categoriesPath, routeCategories);
    this.app.use(this.productsPath, routeProducts);
    this.app.use(this.searchPath, routeSearch);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app corriendo http://localhost:${this.port}`);
    });
  }
}
