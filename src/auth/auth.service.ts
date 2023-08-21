import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserConstants } from 'src/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async signup(userDto: CreateUserDto) {
    const hashPassword = await hash(userDto.password, 10);
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

  refresh(refreshAuthDto: string) {
    return `This action returns ${refreshAuthDto} new refresh token`;
  }

  private async generateToken(userId: string, login: string) {
    const payload = { userId, login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
