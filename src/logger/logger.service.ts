import { ConsoleLogger, Injectable } from '@nestjs/common';

import { appendFile, mkdir } from 'fs/promises';
import { EOL } from 'os';
import { join } from 'path';
type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private pathLogDir = join(process.cwd(), 'nestLogs');
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
    //super.error(message, stack, context);
    await this.saveLogs('error', message, stack, context);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
    this.saveLogs('warn', message, context);
  }
  log(message: string, context?: string) {
    super.log(message, context);
    this.saveLogs('log', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.saveLogs('debug', message, context);
  }
  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.saveLogs('verbose', message, context);
  }
  private async saveLogs(
    logLevel: LogLevel,
    message: string,
    stack?: string,
    context?: string,
  ) {
    //console.log('saveLogs function', logLevel, message, stack, context);
    const messageForLogger = `LogLevel: [${logLevel}], context: [${context}], ${message}, stack: ${stack}`;

    try {
      if (logLevel === 'error') {
        await appendFile(
          join(this.pathLogDir, 'nestLogs-errors.log'),
          messageForLogger + EOL + EOL,
        );
      } else {
        await appendFile(
          join(this.pathLogDir, 'nestLogs-logs.log'),
          messageForLogger + EOL + EOL,
        );
      }
    } catch {}
  }
}
