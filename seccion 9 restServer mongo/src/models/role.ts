import { model, Schema } from "mongoose";
import { IRole } from "../types/role/role.types";

const RoleSchema = new Schema({
  role: {
    type: String,
    require: [true, "El role es obligatorio"],
  },
});

export const Role = model<IRole>("Role", RoleSchema);
