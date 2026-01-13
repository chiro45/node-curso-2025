console.log("socket io");

const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

const btn = document.querySelector("#btnSend");
const input = document.querySelector("#inputMessage");

const socket = io();

socket.on("connect", () => {
  console.log("se conecto desde el front");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});
socket.on("disconnect", () => {
  console.log("Se desconecto desde el front");
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});
socket.on("mensaje", (data) => {
  console.log("mensaje mandado desde el front y regreso del back", data);
});

btn.addEventListener("click", () => {
  const message = input.value;
  const payload = {
    message,
    date: new Date().getTime(),
    id: "123ABC",
  };
  socket.emit("send-message", payload, (id) => {
    console.log("desde el server", id);
  });
});
