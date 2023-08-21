import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CategoryType } from './entities/fav.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const allFavs = await this.prisma.favorites.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    if (allFavs.length) {
      await this.prisma.favorites.create({
        data: { id: uuidv4() },
      });
    }
    return allFavs.length
      ? allFavs[0]
      : { artists: [], albums: [], tracks: [] };
  }

  async createFav(category: CategoryType, id: string) {
    const entity = await this.isExistEntity(category, id);

    if (!entity) {
      throw new UnprocessableEntityException();
    }
    let favoritesId = '';
    try {
      const idExistsFavorites = await this.prisma.favorites.findMany();
      favoritesId = idExistsFavorites[0].id;
    } catch {
      const favorites = await this.prisma.favorites.create({
        data: { id: uuidv4() },
      });
      favoritesId = favorites.id;
    }
    await this.prisma.favorites.update({
      where: { id: favoritesId },
      data: { [category + 's']: { connect: { id: id } } },
    });
    return `This ${category} added to favs`;
  }

  async remove(category: CategoryType, id: string) {
    const entity = this.isExistEntity(category, id);
    if (!entity) {
      throw new UnprocessableEntityException();
    }
    let favoritesId = '';
    try {
      const idExistsFavorites = await this.prisma.favorites.findMany();
      favoritesId = idExistsFavorites[0].id;
    } catch {
      const favorites = await this.prisma.favorites.create({
        data: { id: uuidv4() },
      });
      favoritesId = favorites.id;
    }
    await this.prisma.favorites.update({
      where: { id: favoritesId },
      data: { [category + 's']: { disconnect: { id: id } } },
    });
    return `This Item removes a #${id} fav`;
  }

  private async isExistEntity(category: string, id: string) {
    let entity;
    switch (category) {
      case 'artist':
        entity = await this.prisma.artist.findUnique({
          where: { id: id },
        });
        break;
      case 'album':
        entity = await this.prisma.album.findUnique({ where: { id: id } });
        break;
      case 'track':
        entity = await this.prisma.track.findUnique({ where: { id: id } });
        break;
      default:
        entity = null;
    }
    return entity;
  }
}
