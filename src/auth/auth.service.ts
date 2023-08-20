import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateUserDto) {
    //const findUser = await this.userService.findOne({});
    const hashPassword = await hash(createAuthDto.password, 10);
    console.log('user Auth', hashPassword);
    const user = await this.userService.create({
      ...createAuthDto,
      password: hashPassword,
    });
    console.log('user Auth', user);
    return `This action adds a new signup user ${JSON.stringify(
      createAuthDto,
    )}, hashpassword: ${hashPassword}`;
  }

  login(loginAuthDto: CreateUserDto) {
    return `This action login user ${JSON.stringify(loginAuthDto)}`;
  }

  refresh(refreshAuthDto: string) {
    return `This action returns ${refreshAuthDto} new refresh token`;
  }
}
