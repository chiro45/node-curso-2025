import { Document } from "mongoose";
import { TypeRole } from "../role/role.types";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  img?: string;
  state: boolean;
  role: TypeRole;
  google: boolean;
}
