import { ConsoleLogger, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { appendFile, mkdir, stat } from 'fs/promises';
import { EOL } from 'os';
import { join } from 'path';
type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private pathLogDir = join(process.cwd(), 'nestLogs');
  private pathLogsFile: string;
  private pathErrorLogsFile: string;
  private maxLogFileSizeKB = +process.env.MAX_LOG_FILE_SIZE_KB || 24;
  private logLevel =
    +process.env.LOG_LEVEL === 0 ? 0 : +process.env.LOG_LEVEL || 2;

  constructor() {
    super();
    this.initLogDirectory();
  }
  private async initLogDirectory() {
    try {
      await mkdir(this.pathLogDir);
    } catch {}
  }

  async error(message: string, stack?: string, context?: string) {
    if (this.logLevel >= 0) {
      super.error(message, stack, context);
      await this.saveLogs('error', message, context, stack);
    }
  }
  warn(message: any, context?: string) {
    if (this.logLevel >= 1) {
      super.warn(message, context);
      this.saveLogs('warn', message, context);
    }
  }
  log(message: string, context?: string) {
    if (this.logLevel >= 2) {
      super.log(message, context);
      this.saveLogs('log', message, context);
    }
  }

  debug(message: any, context?: string) {
    if (this.logLevel >= 3) {
      super.debug(message, context);
      this.saveLogs('debug', message, context);
    }
  }
  verbose(message: any, context?: string) {
    if (this.logLevel >= 4) {
      super.verbose(message, context);
      this.saveLogs('verbose', message, context);
    }
  }
  private async saveLogs(
    logLevel: LogLevel,
    message: string,
    context?: string,
    stack?: string,
  ) {
    const messageForLogger = `LogLevel: [${logLevel}], context: [${context}], ${message}, stack: ${stack}`;

    try {
      if (logLevel === 'error') {
        if (existsSync(this.pathErrorLogsFile)) {
          const statFile = stat(this.pathErrorLogsFile);
          const fileSizeKB = (await statFile).size / 1024;
          if (fileSizeKB > this.maxLogFileSizeKB) {
            const newLogErrorPath = join(
              this.pathLogDir,
              `nestLogs-${this.getCurrentDate()}-errors.log`,
            );
            this.pathErrorLogsFile = newLogErrorPath;
            await appendFile(
              this.pathErrorLogsFile,
              messageForLogger + EOL + EOL,
            );
          } else {
            await appendFile(
              this.pathErrorLogsFile,
              messageForLogger + EOL + EOL,
            );
          }
        } else {
          this.pathErrorLogsFile = join(
            this.pathLogDir,
            `nestLogs-${this.getCurrentDate()}-errors.log`,
          );
          await appendFile(
            this.pathErrorLogsFile,
            messageForLogger + EOL + EOL,
          );
        }
      } else {
        if (existsSync(this.pathLogsFile)) {
          const statFile = stat(this.pathLogsFile);
          const fileSizeKB = (await statFile).size / 1024;
          if (fileSizeKB > this.maxLogFileSizeKB) {
            const newLogPath = join(
              this.pathLogDir,
              `nestLogs-${this.getCurrentDate()}-log.log`,
            );
            this.pathLogsFile = newLogPath;
            await appendFile(this.pathLogsFile, messageForLogger + EOL + EOL);
          } else {
            await appendFile(this.pathLogsFile, messageForLogger + EOL + EOL);
          }
        } else {
          this.pathLogsFile = join(
            this.pathLogDir,
            `nestLogs-${this.getCurrentDate()}-log.log`,
          );
          await appendFile(this.pathLogsFile, messageForLogger + EOL + EOL);
        }
      }
    } catch {}
  }

  private getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  }
}
