const { guardarDB, leerDB } = require("./src/helpers/guardarArchivo");
const {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./src/helpers/inquirer");
const Tareas = require("./src/models/tareas");

console.clear();

const main = async () => {
  const tareas = new Tareas();
  let opt = "";

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Description: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const confirmation = await confirmar("deseas eliminarlo?");
          if (confirmation) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pause();
  } while (opt !== "0");
};

main();
