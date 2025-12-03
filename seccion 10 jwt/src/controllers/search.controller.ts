import { esMongoID } from "@helpers/db-validators";
import { Categorie } from "@models/categorie";
import { Product } from "@models/product";
import { User } from "@models/user";
import type { Response, Request } from "express";

const collectionsAvailables = ["users", "products", "categories"];

const searchUsers = async (term: string, response: Response) => {
  if (esMongoID(term)) {
    const user = await User.findById(term);

    return response.json({
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  return response.json({
    results: users,
  });
};

const searchCategories = async (term: string, response: Response) => {
  if (esMongoID(term)) {
    const categorie = await Categorie.findById(term);

    return response.json({
      results: categorie ? [categorie] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const categories = await Categorie.find({ name: regex, state: true });
  return response.json({
    results: categories,
  });
};

const searchProducts = async (term: string, response: Response) => {
  if (esMongoID(term)) {
    const product = await Product.findById(term).populate("categorie", "name");

    return response.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const products = await Product.find({
    name: regex,
    state: true,
  }).populate("categorie", "name");
  return response.json({
    results: products,
  });
};

export const search = async (req: Request, res: Response) => {
  const { term, collection } = req.params;
  if (!collectionsAvailables.includes(collection)) {
    return res.status(400).json({ msg: "La coleccion no es permitida" });
  }

  switch (collection) {
    case "users":
      await searchUsers(term, res);
      return;
    case "products":
      await searchProducts(term, res);
      return;
    case "categories":
      await searchCategories(term, res);
      return;
    default:
      res.status(500).json({ msg: "Esta collection no ha sido bien manejada" });
  }
};
