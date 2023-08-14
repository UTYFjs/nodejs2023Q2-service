import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackConstants } from 'src/constants/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = await this.prisma.track.create({
      data: createTrackDto,
    });
    return createdTrack;
  }

  async findAll() {
    const allTracks = await this.prisma.track.findMany();
    return allTracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(TrackConstants.NOT_FOUND_MESSAGE);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(TrackConstants.NOT_FOUND_MESSAGE);
    }
    const updatedTrack = await this.prisma.track.update({
      where: { id: id },
      data: updateTrackDto,
    });
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
}
