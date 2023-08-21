import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: CreateUserDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refresh')
  refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(refreshAuthDto);
  }
}
