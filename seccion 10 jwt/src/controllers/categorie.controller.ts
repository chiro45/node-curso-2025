import { Categorie } from "@models/categorie";
import type { ICategoria } from "../types/categoria/categoria.types";
import type { Response, Request, RequestHandler } from "express";

export const createCategorie: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const name = req.body.name.toUpperCase();
  const categoriaDb: ICategoria | null = await Categorie.findOne({ name });
  if (categoriaDb) {
    return res.status(400).json({
      msg: `la categoria con el${categoriaDb.name} ya existe`,
    });
  }
  //generar data
  const data = {
    name,
    user: req.user?._id,
  };
  const categoria = new Categorie(data);
  //guardar
  categoria.save();
  res.status(201).send(categoria);
};

export const getCategories = async (req: Request, res: Response) => {
  const { limit = 5, page = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Categorie.countDocuments({ state: true }),
    Categorie.find({ state: true })
      .skip(Number(page))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  return res.json({
    total,
    categories,
  });
};
export const getCategorieById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await Categorie.findById(id).populate("user", "name");
  res.json(categoria);
};

export const updateCategorie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user, state, ...categorie } = req.body;
  categorie.name = categorie.name.toUpperCase();
  if (user) categorie.user = user._id;

  const categorieUpdated = await Categorie.findByIdAndUpdate(id, categorie, {
    new: true,
  });
  if (categorieUpdated) categorieUpdated.save();
  res.send(categorieUpdated);
};
export const deleteCategorie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categorieDeleted = await Categorie.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Categoria eliminada ",
    categorieDeleted,
  });
};
