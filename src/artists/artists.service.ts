import {
  Injectable,
  //Inject,
  //InternalServerErrorException,
  NotFoundException,
  //forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
//import { DbService } from 'src/db/in-memory-db.service';
//import { FavsService } from 'src/favs/favs.service';
//import { AlbumsService } from 'src/albums/albums.service';
//import { TracksService } from 'src/tracks/tracks.service';
import { ArtistConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(
    //@Inject(forwardRef(() => FavsService))
    // @Inject(forwardRef(() => AlbumsService))
    // @Inject(forwardRef(() => TracksService))
    //private readonly favsService: FavsService,
    //private readonly albumsService: AlbumsService,
    //private readonly tracksService: TracksService,
    //private readonly Db: DbService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    //const newArtist = this.Db.createArtist(createArtistDto);
    return newArtist;
  }

  async findAll() {
    const allArtists = await this.prisma.artist.findMany();
    //const allArtists = this.Db.findAllArtists();
    return allArtists;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    //const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }
    //console.log('aRTIST', artist);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    //const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }
    const updatedArtist = await this.prisma.artist.update({
      where: { id: id },
      data: updateArtistDto,
    });
    //const updatedArtist = this.Db.updateArtist(id, updateArtistDto);
    return updatedArtist;
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id: id } });
      return;
    } catch {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
    }

    /*const artist = this.Db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException(ArtistConstants.NOT_FOUND_MESSAGE);
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

    return;*/
  }

  /* isExist(id: string) {
    const artist = this.Db.findOneArtist(id);
    return artist ? true : false;
  }*/
}
