import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistConstants, ErrorType } from 'src/constants/constants';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({ summary: ArtistConstants.POST_SUMMARY })
  @ApiBadRequestResponse({
    description: ArtistConstants.BAD_REQUEST_POST_MESSAGE,
    type: ErrorType,
  })
  @ApiCreatedResponse({
    description: ArtistConstants.OK_MESSAGE,
    type: Artist,
  })
  @ApiBody({ type: CreateArtistDto })
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.artistsService.create(createArtistDto);
    return newArtist;
  }

  @Get()
  @ApiOperation({ summary: ArtistConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: ArtistConstants.OK_MESSAGE, type: [Artist] })
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ArtistConstants.GET_ONE_SUMMARY })
  @ApiParam({
    format: 'uuid',
    name: 'id',
    required: true,
    description: 'Artist identifier',
  })
  @ApiOkResponse({ description: ArtistConstants.OK_MESSAGE, type: Artist })
  @ApiNotFoundResponse({
    description: ArtistConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: ArtistConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ArtistConstants.PUT_SUMMARY })
  @ApiOkResponse({ description: ArtistConstants.OK_MESSAGE, type: Artist })
  @ApiNotFoundResponse({
    description: ArtistConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: ArtistConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @ApiBody({ type: UpdateArtistDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: ArtistConstants.DELETE_SUMMARY })
  @ApiNoContentResponse({
    description: ArtistConstants.NO_CONTENT_MESSAGE,
  })
  @ApiNotFoundResponse({
    description: ArtistConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: ArtistConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistsService.remove(id);
  }
}
