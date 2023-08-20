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
    //const findUser = await this.userService.findOne({});
    const hashPassword = await hash(userDto.password, 10);
    //console.log('user Auth', hashPassword);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    console.log('user Auth', user);

    return `This action adds a new signup user ${JSON.stringify(
      userDto,
    )}, hashpassword: ${hashPassword}`;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: userDto.login },
    });
    const isPasswordEqual = await compare(userDto.password, user.password);
    if (user && isPasswordEqual) {
    } else {
      throw new ForbiddenException(UserConstants.FORBIDDEN_USER_LOGIN);
    }
    /*const payload = { userId: user.id, login: userDto.login };
    console.log('JWT Token', this.jwtService.sign(payload));*/
    const token = this.generateToken(user.id, userDto.login);
    return token;
  }

  refresh(refreshAuthDto: string) {
    return `This action returns ${refreshAuthDto} new refresh token`;
  }

  private async generateToken(userId, login) {
    const payload = { userId: userId, login: login };
    return this.jwtService.sign(payload);
  }
  /* private async validateUser(userDto: CreateUserDto) {
    //const passwordEquals = await compare(userDto.password);
  }*/
}
