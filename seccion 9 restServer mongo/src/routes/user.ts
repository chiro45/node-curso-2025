import { Router } from "express";
import {
  deleteUsers,
  getUsers,
  postUsers,
  putUsers,
} from "../controllers/user.controller";
import { check, param, query } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  esEmailValido,
  esRolValido,
  existeUsuarioPorId,
} from "../helpers/db-validators";

export const router: Router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: number
 *         description: Número de usuarios a retornar
 *       - in: query
 *         name: desde
 *         schema:
 *           type: number
 *         description: Desde qué usuario comenzar (paginación)
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get(
  "/",
  [
    query("limite", "El límite debe ser un número").optional().isNumeric(),
    query("desde", "Desde debe ser un número").optional().isNumeric(),
    validarCampos,
  ],
  getUsers
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del usuario
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               state:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put(
  "/:id",
  [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(existeUsuarioPorId),
    check("name", "El nombre debe tener al menos 2 caracteres")
      .optional()
      .isLength({ min: 2 }),
    check("email", "El email no es válido").optional().isEmail(),
    check("password", "El password debe tener al menos 6 caracteres")
      .optional()
      .isLength({ min: 6 }),
    check("role").optional().custom(esRolValido),
    check("state", "El estado debe ser un booleano").optional().isBoolean(),
    validarCampos,
  ],
  putUsers
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("name", "El nombre debe tener al menos 2 caracteres").isLength({
      min: 2,
    }),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(esEmailValido),
    check("password", "El password es obligatorio").notEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    check("role").custom(esRolValido),
    validarCampos,
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsers
);
