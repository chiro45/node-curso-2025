import { Router } from "express";
import {
  deleteUsers,
  getUsers,
  postUsers,
  putUsers,
} from "../controllers/user.controller.js";

export const router: Router = Router();

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", deleteUsers);
router.delete("/", postUsers);
