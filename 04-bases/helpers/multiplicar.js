const fs = require("fs");
require("colors");
const crearArchivoTabla = async (base = 5, listar = false, hasta = 10) => {
  try {
    let salida = "";
    let consola = "";

    for (let i = 1; i <= hasta; i++) {
      salida += `${base} x ${i} = ${base * i} \n`;
      consola += `${base} ${"x".green} ${i} ${"=".green} ${base * i} \n`;
    }
    fs.writeFileSync(`tabla-${base}.txt`, salida);

    if (listar) {
      console.log("=========================".green);
      console.log(`=======`.red, `TABLA DEL ${base}`.white, `=====`.red);
      console.log("=========================".green);
      console.log(consola);
    }

    return `tabla-${base}.txt creada exitosamente`.rainbow;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  crearArchivoTabla,
};
