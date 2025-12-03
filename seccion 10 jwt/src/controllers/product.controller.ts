import { Product } from "@models/product";
import type { Response, Request } from "express";
import { IProduct } from "src/types/product/product.types";

export const createProduct = async (req: Request, res: Response) => {
  const { state, user, ...body } = req.body;
  const nameProduct = body.name.toUpperCase();
  const productDb: IProduct | null = await Product.findOne({ nameProduct });

  if (productDb) {
    return res.status(400).json({
      msg: `la categoria con el${productDb.name} ya existe`,
    });
  }
  //generar data
  const data = {
    ...body,
    name: nameProduct,
    user: req.user?._id,
  };
  const product = new Product(data);
  //guardar
  product.save();
  res.status(201).send(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const { limit = 5, page = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments({ state: true }),
    Product.find({ state: true })
      .skip(Number(page))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  return res.json({
    total,
    products: products,
  });
};
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("user", "name");
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user, state, ...product } = req.body;
  if (user) product.user = user._id;

  if (product.name) product.name = product.name.toUpperCase();

  const productUpdated = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });
  if (productUpdated) productUpdated.save();
  res.send(productUpdated);
};
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Producto eliminado",
    ProductDeleted: productDeleted,
  });
};
