import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/in-memory-db.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    private readonly db: DbService,
  ) {}
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
    try {
      this.favsService.remove('track', id);
    } catch (err) {}
    const isRemoved = this.db.removeTrack(id);
    if (!isRemoved) {
      throw new InternalServerErrorException('something went wrong');
    }
    /*const isFavs = this.favsService.findOne('track', id);
    if (isFavs) {
      this.favsService.remove('track', id);
    }*/

    return;
  }
  isExist(id: string) {
    const track = this.db.findOneTrack(id);
    return track ? true : false;
  }
  removeAlbumId(albumId: string) {
    const tracks = this.db.findAllTracks();
    const selectedTracks = tracks.filter((track) => track.albumId === albumId);
    selectedTracks.forEach((track) => (track.albumId = null));
  }
  removeArtistId(artistId: string) {
    const tracks = this.db.findAllTracks();
    const selectedTracks = tracks.filter(
      (track) => track.artistId === artistId,
    );
    selectedTracks.forEach((track) => (track.artistId = null));
  }
}
