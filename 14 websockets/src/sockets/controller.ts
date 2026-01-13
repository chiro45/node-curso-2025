import { Socket } from "socket.io";

export const socketController = (socket: Socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });

  // Aquí puedes agregar más eventos
  socket.on("send-message", (payload, callback) => {
    console.log("Mensaje recibido:", payload);
    callback(payload);
    // Emitir a todos los clientes
    //se usa en lugares super especificos
    //this.io
    //socket.emit solo emite a ese socket

    //broadcast emite a todos los sockets
    socket.broadcast.emit("mensaje", payload);
  });
};
