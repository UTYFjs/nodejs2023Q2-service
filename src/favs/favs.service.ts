import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { DbService } from 'src/db/in-memory-db.service';
import { ArtistsService } from 'src/artists/artists.service';
import { Request } from 'express';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { CategoryType } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    @Inject(forwardRef(() => AlbumsService))
    @Inject(forwardRef(() => TracksService))
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
    private readonly trackService: TracksService,
    private readonly db: DbService,
  ) {}
  findAll() {
    const allFavsId = this.db.findAllFavsId();
    console.log('ALL FAVS ID', allFavsId);
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
    }
    // console.log(allFavs);
    return allFavs;
  }
  findOne(category: CategoryType, id: string) {
    return this.db.findOneFavId(category, id);
  }
  createFav(category: CategoryType, id: string) {
    const entity = this.isExistEntity(category, id);

    if (!entity) {
      throw new UnprocessableEntityException();
    }

    this.db.createFavEntity(category, id);
    return `This ${category} added to favs`;
  }

  remove(category: CategoryType, id: string) {
    const entity = this.isExistEntity(category, id);
    if (!entity) {
      throw new UnprocessableEntityException();
    }

    const isRemoved = this.db.removeFav(category, id);
    if (!isRemoved) {
      throw new NotFoundException(`this ${category} is not favorite`);
    }
    return `This action removes a #${id} fav`;
  }

  private isExistEntity(category: string, id: string) {
    let entity;
    switch (category) {
      case 'artist':
        entity = this.artistService.isExist(id);
        break;
      case 'album':
        entity = this.albumService.isExist(id);
        break;
      case 'track':
        entity = this.trackService.isExist(id);
        break;
      default:
        entity = null;
    }
    return entity;
  }
}
