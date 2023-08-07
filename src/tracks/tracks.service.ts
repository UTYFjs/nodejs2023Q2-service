import {
  //Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  //forwardRef,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
//import { DbService } from 'src/db/in-memory-db.service';
//import { FavsService } from 'src/favs/favs.service';
import { TrackConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(
    //@Inject(forwardRef(() => FavsService))
    //private readonly favsService: FavsService,
    //private readonly db: DbService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = await this.prisma.track.create({
      data: createTrackDto,
    });
    //const createdTrack = this.db.createTrack(createTrackDto);
    return createdTrack;
  }

  async findAll() {
    const allTracks = await this.prisma.track.findMany();
    //const allTracks = this.db.findAllTracks();
    return allTracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    //const track = this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException(TrackConstants.NOT_FOUND_MESSAGE);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    //const track = this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException(TrackConstants.NOT_FOUND_MESSAGE);
    }
    const updatedTrack = await this.prisma.track.update({
      where: { id: id },
      data: updateTrackDto,
    });
    //const updatedTrack = this.db.updateTrack(id, updateTrackDto);
    if (!updatedTrack) {
      throw new InternalServerErrorException('something went wrong');
    }
    return updatedTrack;
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({
        where: { id: id },
      });
      return;
    } catch {
      throw new NotFoundException(TrackConstants.NOT_FOUND_MESSAGE);
    }
  }
  /*isExist(id: string) {
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
  }*/
}
