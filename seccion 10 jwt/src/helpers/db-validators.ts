import { User } from "../models/usuario";
import mongoose from "mongoose";
import { TypeRole } from "../types/role/role.types";
import { Role } from "../models/role";

export const esEmailValido = async (email: string = ""): Promise<void> => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya está registrado21`);
  }
};

export const esMongoID = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const existeUsuarioPorId = async (id: string): Promise<void> => {
  if (!esMongoID(id)) {
    throw new Error(`El id ${id} no es un ID de MongoDB válido`);
  }

  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

export const esRolValido = async (role: TypeRole) => {
  const isExistRol = await Role.findOne({ role: role });
  if (!isExistRol) {
    throw new Error("Rol no valido");
  }
};
