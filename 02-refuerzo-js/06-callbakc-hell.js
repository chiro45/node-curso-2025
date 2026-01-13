const empleados = [{ id: 1, nombre: "luciano" }];
const salarios = [
  { id: 1, salario: 1000 },
  { id: 2, salario: 2000 },
];
const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre;

  if (empleado) {
    return callback(null, empleado);
  } else {
    return callback(`El empleado con el ${id} no esta`);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((s) => s.id === id)?.salario;

  if (salario) {
    return callback(null, salario);
  } else {
    return callback(`El salario deempleado con el ${id} no existe`);
  }
};

getEmpleado(1, (err, empleado) => {
  if (err) {
    console.log("ERROR!");
    return console.log(err);
  }
  console.log(empleado);

  getSalario(1, (err, salario) => {
    if (err) {
      console.log("ERROR!");
      return console.log(err);
    }
    console.log(salario);
  });
});
