import path from "node:path";
import json from "../../db/data.json";
import { writeFileSync } from "node:fs";
import { Ticket } from "./ticket";

export class TicketControl {
  public last: number;
  public today: number;
  public tickets: any[];
  public lastFourTickets: any[];
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFourTickets = [];
    this.init();
  }

  public toJson() {
    return {
      last: this.tickets,
      toda: this.today,
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets,
    };
  }

  init() {
    const { last, today, tickets, lastFourTickets } = json as any;
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFourTickets = lastFourTickets;
    } else {
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../../db/data.json");
    writeFileSync(dbPath, JSON.stringify(this.toJson()));
  }
  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveDB();
    return "Ticket" + ticket.number;
  }

  attendTicket(desktop: number) {
    //not have tikcets
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    ticket.desktop = desktop;
    this.lastFourTickets.unshift(ticket);
    if (this.lastFourTickets.length > 4) {
      this.lastFourTickets.slice(1, -1);
    }
    return ticket;
  }
}
