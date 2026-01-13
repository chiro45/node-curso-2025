import express, { type Express } from "express";
import cors from "cors";
import { createServer, Server as HttpServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";
import  socketController  from "../sockets/controller";

export class Server {
  public app: Express;
  public port: number;
  public paths: { [key: string]: string };
  public server: HttpServer;
  public io: SocketIOServer;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    // Primero crear el servidor HTTP
    this.server = createServer(this.app);

    // Luego inicializar Socket.IO con el servidor HTTP
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "*", // En producción, especifica los orígenes permitidos
        methods: ["GET", "POST"],
      },
    });

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Configurar Socket.IO
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    // IMPORTANTE: usar this.server.listen() en lugar de this.app.listen()
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
