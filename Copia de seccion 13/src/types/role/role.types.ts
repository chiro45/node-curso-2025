import { Document } from "mongoose";

export interface IRole extends Document {
  role: TypeRole;
}


export type TypeRole = "ADMIN_ROLE" | "USER_ROLE";
