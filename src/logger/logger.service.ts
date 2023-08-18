import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  error(message: string, stack?: string, context?: string) {
    super.error(message, stack, context);
  }
  log(message: string, context?: string) {
    super.log(message, context);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
  }
  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
  debug(message: any, context?: string) {
    super.debug(message, context);
  }
}
