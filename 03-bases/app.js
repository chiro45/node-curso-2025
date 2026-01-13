const { crearArchivoTabla } = require("./helpers/multiplicar");
const argv = require("./config/yargs");

console.clear();

const { base, listar, hasta } = argv;

crearArchivoTabla(base, listar, hasta)
  .then((nombre) => console.log(nombre, "creado"))
  .catch((error) => console.log(error));
