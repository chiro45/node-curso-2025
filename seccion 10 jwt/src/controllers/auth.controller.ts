import { Request, Response } from "express";
import { User } from "../models/usuario";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt";
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Email or passowrd incorrect" });
    }
    //verificar si el usuario esta activo
    if (!usuario.state) {
      return res.status(400).json({ msg: "User disabled" });
    }
    //verificar la passwd
    const validPass = bcrypt.compareSync(password, usuario.password);
    console.log(validPass)
    if (!validPass) {
      return res.status(400).json({ msg: "Email or passowrd incorrect" });
    }
    //generar el jwr
    const token = await generarJWT(usuario.id)
    return res.send({usuario,token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal contactate con el adminitrador",
    });
  }
};
