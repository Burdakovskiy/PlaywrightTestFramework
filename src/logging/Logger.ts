export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export class ConsoleLogger implements Logger {
  constructor(private readonly prefix: string = 'e2e') {}

  info(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
  warn(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
  error(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
}
