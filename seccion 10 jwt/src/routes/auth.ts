import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

export const authRouter: Router = Router();

authRouter.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatoria").notEmpty()
  ],
  validarCampos,
  login
);
