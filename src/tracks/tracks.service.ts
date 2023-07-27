import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/in-memory-db.service';

@Injectable()
export class TracksService {
  constructor(private readonly db: DbService) {}
  create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.db.createTrack(createTrackDto);
    return createdTrack;
  }

  findAll() {
    const allTracks = this.db.findAllTracks();
    return allTracks;
  }

  findOne(id: string) {
    const track = this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException('track is not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException('track is not found');
    }
    const updatedTrack = this.db.updateTrack(id, updateTrackDto);
    if (!updatedTrack) {
      throw new InternalServerErrorException('something went wrong');
    }
    return updatedTrack;
  }

  remove(id: string) {
    const currentTrack = this.db.findOneTrack(id);
    if (!currentTrack) {
      throw new NotFoundException('track is not found');
    }
    const isRemoved = this.db.removeTrack(id);
    if (!isRemoved) {
      throw new InternalServerErrorException('something went wrong');
    }
    return;
  }
}
