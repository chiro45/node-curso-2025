import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { IUser } from "../types/user/usuario.types";

declare global {
  namespace Express {
    interface Request {
      uid?: string;
      user?: IUser;
    }
  }
}

const key = process.env.SECRETORPRIVATEKEY;
export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const payload = jwt.verify(token!, key!) as JwtPayload;
    const uid = payload.uid as string;
    req.uid = uid;
    const userMongo = await User.findById(uid);
    if (!userMongo) {
      return res.status(401).json({
        msg: "token no valiod => usuario no existe en db",
      });
    }
    if (!userMongo?.state) {
      return res.status(401).json({
        msg: "token no valido => usuario con state === false",
      });
    }

    req.user = userMongo as IUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};
