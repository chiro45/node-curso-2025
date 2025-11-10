import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const urlMongo = process.env.MONGODB_CNN || "";
export const dbConnection = async () => {
  try {
    await mongoose.connect(urlMongo);
  } catch (error) {
    throw new Error("Error to connect bd");
  }
  console.log("Base de datos online");
};
