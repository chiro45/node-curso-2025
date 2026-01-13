import { User } from "../models/user";
import mongoose from "mongoose";
import { TypeRole } from "../types/role/role.types";
import { Role } from "../models/role";
import { Categorie } from "@models/categorie";
import { Product } from "@models/product";

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

export const collectionsAllowed = <T>(collection: string, collections: string[]) => {
  const include = collections.includes(collection);
  if (!include) {
    throw new Error(
      `La coleccion ${collection} no es permitida, ${collection}`
    );
  }
  return true;
};

export const esRolValido = async (role: TypeRole) => {
  const isExistRol = await Role.findOne({ role: role });
  if (!isExistRol) {
    throw new Error("Rol no valido");
  }
};

export const isValidId = (id: string) => {
  if (!esMongoID(id)) {
    throw new Error(`El id ${id} no es un ID de MongoDB válido`);
  }
};

export const existsCategorieInBD = async (id: string) => {
  isValidId(id);
  const existsCategorie = await Categorie.findById(id);
  if (!existsCategorie) {
    throw new Error(`La categorie con id ${id} no existe`);
  }
};
export const existsProductInBD = async (id: string) => {
  isValidId(id);
  const existsCategorie = await Product.findById(id);
  if (!existsCategorie) {
    throw new Error(`La categorie con id ${id} no existe`);
  }
};
