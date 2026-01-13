import {
  showImages,
  updateFile,
  uploadFile,
} from "@controllers/uploads.controller";
import { collectionsAllowed } from "@helpers/db-validators";
import { validateFile } from "@middlewares/file-validate";
import { validarCampos } from "@middlewares/validar-campos";
import { Router } from "express";
import { check } from "express-validator";

export const uploadRouter: Router = Router();

uploadRouter.post("/", [], uploadFile);

uploadRouter.post(
  "/:collection/:id",
  [
    check("id", "el ide debe ser de mogno").isMongoId(),
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validateFile,
    validarCampos,
  ],
  updateFile
);

uploadRouter.get(
  "/:collection/:id",
  [
    check("id", "el ide debe ser de mogno").isMongoId(),
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validarCampos,
  ],
  showImages
);
