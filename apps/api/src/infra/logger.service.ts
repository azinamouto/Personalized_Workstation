import { Injectable, LoggerService } from '@nestjs/common';

/**
 * Simple console-based logger that implements the NestJS LoggerService interface.
 * Each method prefixes output with a level tag and ISO timestamp.
 * Can be swapped for a structured logger (e.g. pino) without changing call sites.
 */
@Injectable()
export class AppLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(`[DEBUG] [${new Date().toISOString()}] ${message}`, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`[VERBOSE] [${new Date().toISOString()}] ${message}`, ...optionalParams);
  }
}
