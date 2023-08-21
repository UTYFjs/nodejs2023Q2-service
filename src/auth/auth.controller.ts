import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from './public.decorator';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { AuthConstants } from 'src/constants/constants';
import { User } from 'src/users/entities/user.entity';
import { Tokens } from './dto/tokens-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  @ApiOperation({
    summary: AuthConstants.SIGNUP_SUMMARY,
  })
  @ApiCreatedResponse({
    description: AuthConstants.OK_MESSAGE,
    type: User,
  })
  @ApiBadRequestResponse({
    description: AuthConstants.BAD_REQUEST_AUTH_MESSAGE,
  })
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }
  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: AuthConstants.LOGIN_SUMMARY,
  })
  @ApiOkResponse({ description: AuthConstants.OK_MESSAGE, type: Tokens })
  @ApiBadRequestResponse({
    description: AuthConstants.BAD_REQUEST_AUTH_MESSAGE,
  })
  @ApiForbiddenResponse({ description: AuthConstants.FORBIDDEN_LOGIN })
  login(@Body() loginAuthDto: CreateUserDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: AuthConstants.REFRESH_SUMMARY,
  })
  @ApiOkResponse({ description: AuthConstants.OK_MESSAGE, type: Tokens })
  @ApiUnauthorizedResponse({
    description: AuthConstants.BAD_REQUEST_AUTH_MESSAGE,
  })
  @ApiForbiddenResponse({ description: AuthConstants.FORBIDDEN_REFRESH_TOKEN })
  refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(refreshAuthDto);
  }
}
