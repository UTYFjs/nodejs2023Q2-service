import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/in-memory-db.service';

@Injectable()
export class UsersService {
  private readonly usersDto = [];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    //DbService;
    return this.usersDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
