const fs = require("fs");

const archivo = "./db/data.json";

const guardarDB = (data) => {
  const parseData = JSON.stringify(data);
  fs.writeFileSync(archivo, parseData);
};

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
};

module.exports = {
  guardarDB,
  leerDB,
};
