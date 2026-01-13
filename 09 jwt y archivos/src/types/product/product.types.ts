import type { Types } from "mongoose";

export interface IProduct {
  name: string;
  state: boolean;
  user: Types.ObjectId;
  price: number;
  categorie: Types.ObjectId;
  description?: string;
  available: boolean;
  img: string;
}
