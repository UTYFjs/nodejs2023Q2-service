import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });
    return createdAlbum;
  }

  async findAll() {
    const allAlbums = await this.prisma.album.findMany();
    return allAlbums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }
    const updatedAlbum = await this.prisma.album.update({
      where: { id: id },
      data: updateAlbumDto,
    });
    if (!updatedAlbum) {
      throw new InternalServerErrorException('something went wrong');
    }
    return updatedAlbum;
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id: id } });
      return;
    } catch {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }
  }
}
