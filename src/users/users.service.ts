import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/in-memory-db.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}
  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = this.dbService.createUser(newUser);
    return createdUser;
  }

  findAll() {
    return this.dbService.findAllUsers();
  }

  findOne(id: string) {
    const user = this.dbService.findOneUser(id);
    if (!user) {
      return null;
      //return 'Hello , no user';
    }
    return user;
    //return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException(' user not found');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('wrong old password');
    }
    const updatedUser = this.dbService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new InternalServerErrorException('somethig went wrong');
    }
    return updatedUser;
  }

  remove(id: string) {
    const user = this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException(' user not found');
    }

    const isRemove = this.dbService.removeUser(id);
    if (!isRemove) {
      throw new InternalServerErrorException('somethig went wrong');
    }
    return;
  }
}
