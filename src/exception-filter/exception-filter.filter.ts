import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLoggerService } from 'src/logger/logger.service';
import { Request } from 'express';
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
    let responseBody: any;
    let stack: string;
    if (exception instanceof HttpException) {
      message = exception.message;
      statusCode = exception.getStatus();
      responseBody = exception.getResponse();
      stack = exception.stack;
    } else {
      message = 'Internal Server Error';
      statusCode = 500;
      responseBody = {
        error: message,
        statusCode: statusCode,
        message: message,
      };
    }
    const request = ctx.getRequest<Request>();
    const { body, url, query } = request;
    const messageForLogger = `statusCode: ${statusCode}, message: ${message}, request: {body: ${JSON.stringify(
      body,
    )}, query: ${JSON.stringify(query)}, url: ${url}} `;
    this.logger.error(messageForLogger, stack);

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
