import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/in-memory-db.service';
import { FavsService } from 'src/favs/favs.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    @Inject(forwardRef(() => AlbumsService))
    @Inject(forwardRef(() => TracksService))
    private readonly favsService: FavsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly Db: DbService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const newArtist = this.Db.createArtist(createArtistDto);
    return newArtist;
  }

  findAll() {
    const allArtists = this.Db.findAllArtists();
    return allArtists;
  }

  findOne(id: string) {
    const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('artist is not found');
    }
    //console.log('aRTIST', artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException(' artist is not found');
    }
    const updatedArtist = this.Db.updateArtist(id, updateArtistDto);
    return updatedArtist;
  }

  remove(id: string) {
    const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('artist is not found');
    }
    this.albumsService.removeArtistId(id);
    this.tracksService.removeArtistId(id);
    try {
      this.favsService.remove('artist', id);
    } catch (err) {}
    const isRemove = this.Db.removeArtist(id);
    if (!isRemove) {
      throw new InternalServerErrorException('something went wrong');
    }

    return;
  }

  isExist(id: string) {
    const artist = this.Db.findOneArtist(id);
    return artist ? true : false;
  }
}
