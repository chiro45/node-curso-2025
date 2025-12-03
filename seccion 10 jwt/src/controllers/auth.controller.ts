import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "@models/user";
import { generarJWT } from "@helpers/generar-jwt";
import { googleVerify } from "@helpers/google-verify";
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
    console.log(validPass);
    if (!validPass) {
      return res.status(400).json({ msg: "Email or passowrd incorrect" });
    }
    //generar el jwr
    const token = await generarJWT(usuario.id);
    return res.send({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal contactate con el adminitrador",
    });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { id_token } = req.body;
  try {
    const googleUser = await googleVerify(id_token);

    if (!googleUser) {
      return res.status(400).json({
        msg: "Token de Google no válido",
      });
    }

    const { email, name, img } = googleUser;

    // Verificar si el usuario existe
    let user = await User.findOne({ email });

    if (!user) {
      // Crear usuario si no existe
      const data = {
        name,
        email,
        password: ":P",
        img,
        role: "USER_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Verificar si el usuario está activo
    if (!user.state) {
      return res.status(401).json({
        msg: "Usuario bloqueado, contacte al administrador",
      });
    }

    // Generar JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal contactate con el adminitrador",
    });
  }
};
