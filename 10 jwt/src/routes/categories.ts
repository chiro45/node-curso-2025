import {
  createCategorie,
  deleteCategorie,
  getCategorieById,
  getCategories,
  updateCategorie,
} from "@controllers/categorie.controller";
import { existsCategorieInBD } from "@helpers/db-validators";
import { validarCampos } from "@middlewares/validar-campos";
import { validateJWT } from "@middlewares/validar-jwt";
import { validateAdminRole } from "@middlewares/validate-rol";
import { Router } from "express";
import { check } from "express-validator";

export const routeCategories: Router = Router();

//todas las categorias => public
routeCategories.get("/", getCategories);

//obtener categoria por id - publico
routeCategories.get(
  "/:id",
  [check("id").custom(existsCategorieInBD), validarCampos],
  getCategorieById
);
//crear categoria -privado - cualquier persona con token valido
routeCategories.post("/", [validateJWT], createCategorie);
//crear categoria -privado - cualquier persona con token valido
routeCategories.put(
  "/:id",
  [validateJWT, check("id").custom(existsCategorieInBD), validarCampos],
  updateCategorie
);
//crear categoria -privado - solo admin
routeCategories.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRole,
    check("id").custom(existsCategorieInBD),
    validarCampos,
  ],
  deleteCategorie
);
