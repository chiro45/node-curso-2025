require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("====================".green);
    console.log("Seleccion una opcion");
    console.log("====================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas pendientes`);
    console.log(`${"4.".green} Completar tarea(s)`);
    console.log(`${"5.".green} Borrar Tarea`);
    console.log(`${"6.".green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Seleccione una opcion:`, (opt) => {
      resolve(opt);
      readline.close();
    });
  });
};

module.exports = {
  mostrarMenu,
};
