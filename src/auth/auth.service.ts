import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthConstants, UserConstants } from 'src/constants/constants';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async signup(userDto: CreateUserDto) {
    const hashPassword = await hash(
      userDto.password,
      +process.env.CRYPT_SALT || 10,
    );
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return user;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: userDto.login },
    });
    const isPasswordEqual = await compare(userDto.password, user.password);
    if (user && isPasswordEqual) {
      const token = await this.generateToken(user.id, userDto.login);
      return token;
    } else {
      throw new ForbiddenException(UserConstants.FORBIDDEN_USER_LOGIN);
    }
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    try {
      const { userId, login } = await this.jwtService.verifyAsync(
        refreshAuthDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret', ////   not sure what is secret? is it secret from JWT Module.register from auth module
        },
      );
      if (userId && login) {
        const tokens = this.generateToken(userId, login);
        return tokens;
      } else {
        throw new ForbiddenException(AuthConstants.INVALID_REFRESH_TOKEN);
      }
    } catch {
      throw new ForbiddenException(AuthConstants.FORBIDDEN_REFRESH_TOKEN);
    }
  }

  private async generateToken(userId: string, login: string) {
    const payload = { userId, login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
