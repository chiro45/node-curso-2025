import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@controllers/product.controller";
import {
  existsCategorieInBD,
  existsProductInBD,
  isValidId,
} from "@helpers/db-validators";
import { validarCampos } from "@middlewares/validar-campos";
import { validateJWT } from "@middlewares/validar-jwt";
import { validateAdminRole } from "@middlewares/validate-rol";
import { Router } from "express";
import { check } from "express-validator";

export const routeProducts: Router = Router();

//todas las categorias => public
routeProducts.get("/", getProducts);
//obtener categoria por id - publico
routeProducts.get(
  "/:id",
  [check("id").custom(existsProductInBD), validarCampos],
  getProductById
);
//crear categoria -privado - cualquier persona con token valido
routeProducts.post(
  "/",
  [validateJWT, check("categoria").custom(existsCategorieInBD)],
  createProduct
);
//crear categoria -privado - cualquier persona con token valido
routeProducts.put(
  "/:id",
  [validateJWT, check("id").custom(existsProductInBD), validarCampos],
  updateProduct
);
//crear categoria -privado - solo admin
routeProducts.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRole,
    check("id").custom(existsProductInBD),
    validarCampos,
  ],
  deleteProduct
);
