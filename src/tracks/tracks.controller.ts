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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorType, TrackConstants } from 'src/constants/constants';

@ApiTags('track')
@ApiBearerAuth()
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({ summary: TrackConstants.POST_SUMMARY })
  @ApiBadRequestResponse({
    description: TrackConstants.BAD_REQUEST_POST_MESSAGE,
    type: ErrorType,
  })
  @ApiCreatedResponse({
    description: TrackConstants.OK_MESSAGE,
    type: Track,
  })
  @ApiBody({ type: CreateTrackDto })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: TrackConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: TrackConstants.OK_MESSAGE, type: [Track] })
  async findAll(): Promise<Track[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: TrackConstants.GET_ONE_SUMMARY })
  @ApiParam({
    format: 'uuid',
    name: 'id',
    required: true,
    description: 'Track identifier',
  })
  @ApiOkResponse({ description: TrackConstants.OK_MESSAGE, type: Track })
  @ApiNotFoundResponse({
    description: TrackConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: TrackConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: TrackConstants.PUT_SUMMARY })
  @ApiOkResponse({ description: TrackConstants.OK_MESSAGE, type: Track })
  @ApiNotFoundResponse({
    description: TrackConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: TrackConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @ApiBody({ type: UpdateTrackDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: TrackConstants.DELETE_SUMMARY })
  @ApiNoContentResponse({
    description: TrackConstants.NO_CONTENT_MESSAGE,
  })
  @ApiNotFoundResponse({
    description: TrackConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: TrackConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tracksService.remove(id);
  }
}
