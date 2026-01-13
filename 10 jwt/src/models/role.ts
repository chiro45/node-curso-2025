import { model, Schema } from "mongoose";
import type { IRole } from "../types/role/role.types";

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, "El role es obligatorio"],
  },
});

export const Role = model<IRole>("Role", RoleSchema);
