import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLoggerService } from 'src/logger/logger.service';
//import { Response, Request } from 'express';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: MyLoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    let message: string;
    let statusCode: number;

    if (exception instanceof HttpException) {
      message = exception.message;
      statusCode = exception.getStatus();
      console.log('exception.getResponse()', exception.getResponse());
    } else {
      message = 'Internal Server Error';
      statusCode = 500;
    }
    //const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();

    const messageForLogger = `type: Error, statusCode: ${statusCode}, message: ${message}, `;
    this.logger.error(messageForLogger);

    const responseBody = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
