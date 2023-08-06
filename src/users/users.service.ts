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
import { UserConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly prisma: PrismaService,
  ) {}
  async create(dto: CreateUserDto) {
    const newUser = {
      //id: uuidv4(),
      login: dto.login,
      password: dto.password,
      //version: 1,
      //createdAt: Date.now(),
      //updatedAt: Date.now(),
    };
    const createdUser = await this.prisma.user.create({ data: newUser });
    //const createdUser = this.dbService.createUser(newUser);
    return createdUser;
  }

  async findAll() {
    console.log('Prisma request');

    const users = await this.prisma.user.findMany();
    const users2 = [...users];
    return users2;
    //return this.dbService.findAllUsers();
  }

  async findOne(id: string) {
    const user1 = await this.prisma.user.findUnique({ where: { id: id } });
    const user = this.dbService.findOneUser(id);
    if (!user1) {
      return null;
      //return 'Hello , no user';
    }
    return user1;
    //return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user1 = await this.prisma.user.findUnique({ where: { id: id } });
    const user = this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(UserConstants.FORBIDDEN_MESSAGE);
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
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }

    const isRemove = this.dbService.removeUser(id);
    if (!isRemove) {
      throw new InternalServerErrorException('somethig went wrong');
    }
    return;
  }
}
