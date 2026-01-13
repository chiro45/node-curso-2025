console.log("inicio"); //1

setTimeout(() => {
  console.log("Primer timeout");
}, 3000); //5
setTimeout(() => {
  console.log("Segundo timeout");
}, 0); //3
setTimeout(() => {
  console.log("Tercer timeout");
}, 0); //4
console.log("fin"); //2
console.log("carlos");
