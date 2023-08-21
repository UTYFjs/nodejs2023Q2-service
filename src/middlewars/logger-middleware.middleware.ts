import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { body, baseUrl, query } = req;
    const logString = `body: ${JSON.stringify(body)}, query: ${JSON.stringify(
      query,
    )}, url: ${JSON.stringify(baseUrl)}`;

    this.logger.log(logString, baseUrl);

    next();
  }
}
