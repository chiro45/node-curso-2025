export class Ticket {
  number: number;
  desktop: number | null;

  constructor(number: number, desktop: number | null) {
    this.desktop = desktop;
    this.number = number;
  }
}
