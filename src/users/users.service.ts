import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const newUser = {
      login: dto.login,
      password: dto.password,
    };
    const createdUser = await this.prisma.user.create({ data: newUser });
    return new User({
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) =>
        new User({
          ...user,
          createdAt: user.createdAt.getTime(),
          updatedAt: user.updatedAt.getTime(),
        }),
    );
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return null;
    }
    return new User({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
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
      return;
    } catch {
      throw new NotFoundException(UserConstants.NOT_FOUND_MESSAGE);
    }
  }
}
