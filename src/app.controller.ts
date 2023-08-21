import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
