export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export class ConsoleLogger implements Logger {
  constructor(
    private readonly prefix: string = 'e2e',
    private readonly level: LogLevel = 'info',
  ) {}

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_ORDER[level] >= LEVEL_ORDER[this.level];
  }

  debug(message: string): void {
    if (!this.shouldLog('debug')) return;
    console.log(`[${this.prefix}] [DEBUG] ${message}`);
  }

  info(message: string): void {
    if (!this.shouldLog('info')) return;
    console.log(`[${this.prefix}] [INFO] ${message}`);
  }

  warn(message: string): void {
    if (!this.shouldLog('warn')) return;
    console.warn(`[${this.prefix}] [WARN] ${message}`);
  }

  error(message: string): void {
    if (!this.shouldLog('error')) return;
    console.error(`[${this.prefix}] [ERROR] ${message}`);
  }
}
