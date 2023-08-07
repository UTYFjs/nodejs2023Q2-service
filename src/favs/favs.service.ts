import {
  //Inject,
  Injectable,
  //NotFoundException,
  UnprocessableEntityException,
  //forwardRef,
} from '@nestjs/common';
//import { ArtistsService } from 'src/artists/artists.service';
//import { AlbumsService } from 'src/albums/albums.service';
//import { TracksService } from 'src/tracks/tracks.service';
import { CategoryType } from './entities/fav.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavsService {
  constructor(
    //@Inject(forwardRef(() => ArtistsService))
    //@Inject(forwardRef(() => AlbumsService))
    //@Inject(forwardRef(() => TracksService))
    //private readonly artistService: ArtistsService,
    //private readonly albumService: AlbumsService,
    //private readonly trackService: TracksService,
    //private readonly db: DbService,
    private readonly prisma: PrismaService,
  ) {}
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
    /*if (allFavs.length === 0) {
      ///create favorites
      await this.prisma.favorites.create({
        data: { id: uuidv4() },
      });
    }*/
    //const allFavsId = this.db.findAllFavsId();
    /*console.log('ALL FAVS ID', allFavsId);
    const allFavs = { artists: [], albums: [], tracks: [] };
    for (const category in allFavsId) {
      allFavsId[category].forEach((id) => {
        switch (category) {
          case 'artist':
            const artist = this.artistService.findOne(id);
            //console.log(artist);
            allFavs[category + 's'].push(artist);
            break;
          case 'album':
            const album = this.albumService.findOne(id);
            allFavs[category + 's'].push(album);
            break;
          case 'track':
            const track = this.trackService.findOne(id);
            allFavs[category + 's'].push(track);
            break;
        }
      });
    }*/
    console.log(allFavs);
    return allFavs.length
      ? allFavs[0]
      : await this.prisma.favorites.create({
          data: { id: uuidv4() },
        })[0];
  }
  /*findOne(category: CategoryType, id: string) {
    return this.db.findOneFavId(category, id);
  }*/

  async createFav(category: CategoryType, id: string) {
    const entity = await this.isExistEntity(category, id);

    if (!entity) {
      throw new UnprocessableEntityException();
    }
    //let fav;
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
    /*await this.prisma[category].update({
      where: { id: id },
      data: { connect: { favoritesId: favoritesId } },
    });*/
    //await this.prisma[category];
    //console.log('isExistFavorites', idExistsFavorites);
    console.log('category', category);
    /*switch (category) {
      case 'artist':
        await this.prisma.favorites.update({
          where: { id },
          data: { artists: { connect: { id: id } } },
        });
        break;
      case 'album':
        await this.prisma.favorites.update({
          where: { id },
          data: { albums: { connect: { id: id } } },
        });
        break;
      case 'track':
        await this.prisma.favorites.update({
          where: { id },
          data: { tracks: { connect: { id: id } } },
        });
        break;
      default:
        throw new UnprocessableEntityException();
    }*/

    //await this.prisma.$transaction([fav]);

    //this.prisma.favorites.create;
    //this.prisma[category].create({ data: id });
    //this.db.createFavEntity(category, id);
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
    /*const isRemoved = this.db.removeFav(category, id);
    if (!isRemoved) {
      throw new NotFoundException(`this ${category} is not favorite`);
    }*/
    return `This Item removes a #${id} fav`;
  }

  private async isExistEntity(category: string, id: string) {
    let entity;
    switch (category) {
      case 'artist':
        entity = await this.prisma.artist.findUnique({
          where: { id: id },
        });
        console.log(entity);
        //entity = this.artistService.isExist(id);
        break;
      case 'album':
        entity = await this.prisma.album.findUnique({ where: { id: id } });
        //entity = this.albumService.isExist(id);
        break;
      case 'track':
        entity = await this.prisma.track.findUnique({ where: { id: id } });
        //entity = this.trackService.isExist(id);
        break;
      default:
        entity = null;
    }
    return entity;
  }
}
