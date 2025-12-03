import type { IProduct } from "src/types/product/product.types";
import { model, Schema } from "mongoose";

const ProductScheme = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "El name es obligatorio"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
    require: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export const Product = model<IProduct>("Product", ProductScheme);
