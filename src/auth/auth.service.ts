import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  signup(createAuthDto: CreateUserDto) {
    return `This action adds a new signup user ${JSON.stringify(
      createAuthDto,
    )}`;
  }

  login(loginAuthDto: CreateUserDto) {
    return `This action login user ${JSON.stringify(loginAuthDto)}`;
  }

  refresh(refreshAuthDto: string) {
    return `This action returns ${refreshAuthDto} new refresh token`;
  }
}
