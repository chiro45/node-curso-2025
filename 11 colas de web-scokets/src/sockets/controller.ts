import { Socket } from "socket.io";
import { TicketControl } from "../models/ticket-control";

const ticketControl = new TicketControl();

const socketController = (socket: Socket) => {
  // Cuando un cliente se conecta
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("current-state", ticketControl.lastFourTickets);
  socket.emit("pending-tickets", ticketControl.tickets.length);

  socket.on("next-ticket", (_, callback) => {
    const siguiente = ticketControl.next();
    callback(siguiente);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
  });

  socket.on("send-message", (payload, callback) => {
    console.log("Received send-message:", payload);
    socket.broadcast.emit("send-message", payload);
    if (typeof callback === "function") {
      callback({ ok: true, id: "msg-" + new Date().getTime() });
    }
  });

  socket.on("attend-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "Es escritorio es obligatorio",
      });
    }

    const ticket = ticketControl.attendTicket(escritorio);

    socket.broadcast.emit("current-state", ticketControl.lastFourTickets);
    socket.emit("pending-tickets", ticketControl.tickets.length);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: "Ya no hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

export default socketController;
