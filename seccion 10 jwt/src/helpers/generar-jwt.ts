import jwt from "jsonwebtoken";
const key = process.env.SECRETORPRIVATEKEY;

export const generarJWT = (uuid: string) => {
  return new Promise((res, rej) => {
    const payload = { uuid };
    console.log(uuid)
    jwt.sign(payload, key!, { expiresIn: "4h" }, (err, token) => {
      if (err) {
        console.log(err);
        rej("No se pudo generar el token");
      } else {
        res(token);
      }
    });
  });
};
