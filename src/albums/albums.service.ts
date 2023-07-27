import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/in-memory-db.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: DbService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = this.db.createAlbum(createAlbumDto);
    return createdAlbum;
  }

  findAll() {
    const allAlbums = this.db.findAllAlbums();
    return allAlbums;
  }

  findOne(id: string) {
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('album is not found');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('album is not found');
    }
    const updatedAlbum = this.db.updateAlbum(id, updateAlbumDto);
    if (!updatedAlbum) {
      throw new InternalServerErrorException('something went wrong');
    }
    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('album is not found');
    }
    const isRemoved = this.db.removeAlbum(id);
    if (!isRemoved) {
      throw new InternalServerErrorException('something went wrong');
    }
    return;
  }
}
