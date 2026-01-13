import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const PORT = process.env.PORT;
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST con Swagger",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // <- ajustá a tu estructura
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express): void => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger disponible en: http://localhost:${PORT}/api/docs`);
};
