import jwt from "jsonwebtoken";
const key = process.env.SECRETORPRIVATEKEY;

export const generarJWT = (uid: string) => {
  return new Promise((res, rej) => {
    const payload = { uid };
    jwt.sign(payload, key!, { expiresIn: "4h" }, (err, token) => {
      if (err) {
        rej("No se pudo generar el token");
      } else {
        res(token);
      }
    });
  });
};
