import type { ICategoria } from "../types/categoria/categoria.types";
import { model, Schema } from "mongoose";

const CategorieScheme = new Schema({
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
});
CategorieScheme.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};
export const Categorie = model<ICategoria>("Categorie", CategorieScheme);
