import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user/usuario.types";

export const validateAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "ser quiere verificar el error sin token primero",
    });
  }

  const { role, name } = req.user!;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }

  next();
};


// Si extendiste el Request para agregar el usuario del JWT:
interface AuthenticatedRequest extends Request {
  user?: IUser
}

export const hasRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).json({
        msg: `El servicio requiere uno de estos roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};
