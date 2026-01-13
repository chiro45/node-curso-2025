import type { Response, Request } from "express";
import { uploadFileHelper } from "../helpers/upload-file";
import { User } from "@models/user";
import { Product } from "@models/product";
import path, { dirname } from "path";
import { existsSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


export const uploadFile = async (req: Request, res: Response) => {
  try {
    const fullPath = await uploadFileHelper(req.files!.file, undefined, "imgs");
    res.json({
      path: fullPath,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};


export const updateFile = async (req: Request, res: Response) => {
  const { id, collection } = req.params;
  let modelo: any;

  // Buscar el modelo según la colección
  switch (collection) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `NO existe un usuario con el id ${id}` });
      break;

    case "products":
      modelo = await Product.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `NO existe un producto con el id ${id}` });
      break;

    default:
      return res.status(500).json({ msg: "No se ha validado" });
  }

  // Si ya tiene una imagen local, eliminarla
  if (modelo.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
    if (existsSync(pathImg)) {
      unlinkSync(pathImg);
    }
  }

  const nombre = await uploadFileHelper(req.files!.file, undefined, collection);
  modelo.img = nombre;
  await modelo.save();
  res.json(modelo);
};

export const showImages = async (req: Request, res: Response) => {
  const { id, collection } = req.params;
  let modelo: any;
  switch (collection) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `NO existe un usuario con el id ${id}` });

      break;
    case "products":
      modelo = await Product.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `NO existe un producto con el id ${id}` });
      break;
    default:
      return res.status(500).json({ msg: "No se ha validado" });
  }
  if (modelo.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
    if (existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }
  const pathImageNotFound = path.join(__dirname, '../assets/', 'notFound.jpg');
  res.sendFile(pathImageNotFound);
};
