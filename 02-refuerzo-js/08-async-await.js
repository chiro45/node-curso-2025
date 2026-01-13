const empleados = [
  { id: 1, nombre: "Luciano" },
  { id: 2, nombre: "Pedro" },
];
const salarios = [
  { id: 1, salario: 1000 },
  { id: 2, salario: 2000 },
];

const getEmpleado = (id) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre;
  const promesa = new Promise((resolve, reject) => {
    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
  return promesa;
};
const getSalario = (id) => {
  const salario = salarios.find((e) => e.id === id)?.salario;
  const promesa = new Promise((resolve, reject) => {
    salario ? resolve(salario) : reject(`No salario para el id ${id}`);
  });
  return promesa;
};

const id = 1;
const getInfoUsuarios = async (id) => {
  try {
    const user = await getEmpleado(id);
    const salario = await getSalario(id);

    return`${user} y ${salario}`
  } catch (error) {
   return error
  }
};

getInfoUsuarios(id)
  .then((msg) => console.log(msg))
  .catch((error) => console.log(error))
