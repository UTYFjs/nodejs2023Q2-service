import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { DbService } from 'src/db/in-memory-db.service';
//import { v4 as uuidv4 } from 'uuid';
import { UserConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    //private readonly dbService: DbService,
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
    return new User({
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    });
  }

  async findAll() {
    console.log('Prisma request');

    const users = await this.prisma.user.findMany();
    return users.map(
      (user) =>
        new User({
          ...user,
          createdAt: user.createdAt.getTime(),
          updatedAt: user.updatedAt.getTime(),
        }),
    );
    //return this.dbService.findAllUsers();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    //const user = this.dbService.findOneUser(id);
    if (!user) {
      return null;
      //return 'Hello , no user';
    }
    return new User({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
    //return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    //const user = this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(UserConstants.FORBIDDEN_MESSAGE);
    }
    const updatedUser = await this.prisma.user.update({
      data: { password: updateUserDto.newPassword, version: user.version + 1 },
      where: { id: id },
    });
    //const updatedUser = this.dbService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new InternalServerErrorException('somethig went wrong');
    }
    return new User({
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id: id } });
      console.log('try');
      return;
    } catch {
      console.log('catch ');
      //throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }
    /*
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    console.log('user ', user);
    //const user = this.dbService.findOneUser(id);
    if (!user) {
      console.log('no user code ');
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }
    console.log('no user code2 ');
    const isRemove = await this.prisma.user.delete({ where: { id: id } });
    console.log('isRemove', isRemove, user);

    //const isRemove = this.dbService.removeUser(id);
    if (!isRemove) {
      throw new InternalServerErrorException('somethig went wrong');
    }
    return;*/
  }
}
