import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return newArtist;
  }

  async findAll() {
    const allArtists = await this.prisma.artist.findMany();
    return allArtists;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }
    const updatedArtist = await this.prisma.artist.update({
      where: { id: id },
      data: updateArtistDto,
    });
    return updatedArtist;
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id: id } });
      return;
    } catch {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }
  }
}
