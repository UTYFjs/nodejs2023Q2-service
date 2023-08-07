import {
  Injectable,
  //Inject,
  InternalServerErrorException,
  NotFoundException,
  // forwardRef,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
//import { DbService } from 'src/db/in-memory-db.service';
//import { FavsService } from 'src/favs/favs.service';
//import { TracksService } from 'src/tracks/tracks.service';
import { AlbumConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(
    //@Inject(forwardRef(() => FavsService))
    //@Inject(forwardRef(() => TracksService))
    //private readonly favsService: FavsService,
    //private readonly tracksService: TracksService,
    //private readonly db: DbService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });
    //const createdAlbum = this.db.createAlbum(createAlbumDto);
    return createdAlbum;
  }

  async findAll() {
    const allAlbums = await this.prisma.album.findMany();
    //const allAlbums = this.db.findAllAlbums();
    return allAlbums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    //const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    //const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }
    const updatedAlbum = await this.prisma.album.update({
      where: { id: id },
      data: updateAlbumDto,
    });
    //const updatedAlbum = this.db.updateAlbum(id, updateAlbumDto);
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
    /*const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException(AlbumConstants.NOT_FOUND_MESSAGE);
    }
    try {
      this.favsService.remove('album', id);
    } catch (err) {}
    this.tracksService.removeAlbumId(id);
    const isRemoved = this.db.removeAlbum(id);
    if (!isRemoved) {
      throw new InternalServerErrorException('something went wrong');
    }

    return;*/
  }
  /*removeArtistId(artistId: string) {
    const albums = this.db.findAllAlbums();
    const selectedAlbums = albums.filter(
      (album) => album.artistId === artistId,
    );
    selectedAlbums.forEach((album) => (album.artistId = null));
  }
  isExist(id: string) {
    const album = this.db.findOneAlbum(id);
    return album ? true : false;
  }*/
}
