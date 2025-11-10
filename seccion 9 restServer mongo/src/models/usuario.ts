import { model, Schema } from "mongoose";
import { IUser } from "../types/user/usuario.types";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La password es obligatoria"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
  },

  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export const User = model<IUser>("User", UserSchema);
