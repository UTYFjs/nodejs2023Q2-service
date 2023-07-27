import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Track {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll(): Track[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
