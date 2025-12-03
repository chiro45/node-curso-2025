import { Response, Request, RequestHandler } from "express";
import { User } from "../models/user";
import { CreateUserDto, UpdateUserDto } from "../types/user/usuario.dtos";
21;
import bcrypt from "bcryptjs";

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  const { limit = 5, page = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(page)).limit(Number(limit)),
  ]);

  return res.json({
    total,
    usuarios,
  });
};

export const putUsers: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto }: UpdateUserDto = req.body;

  const datosActualizar: UpdateUserDto = { ...resto };

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    datosActualizar.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, datosActualizar, {
    new: true,
  });

  return res.status(200).json({
    msg: "Usuario actualizado",
    usuario,
  });
};

export const deleteUsers: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const usuario = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Usuario eliminado",
    usuario,
  });
};

export const postUsers: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, email, password, role }: CreateUserDto = req.body;

  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  return res.json({
    msg: `Usuario ${name} creado`,
    user,
  });
};
