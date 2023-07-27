import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/in-memory-db.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly Db: DbService) {}
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
    const isRemove = this.Db.removeArtist(id);
    if (!isRemove) {
      throw new InternalServerErrorException('something went wrong');
    }

    return;
  }
}
