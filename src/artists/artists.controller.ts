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
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    const newArtist = this.artistsService.create(createArtistDto);
    return newArtist;
  }

  @Get()
  @ApiOperation({ summary: ArtistConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: ArtistConstants.OK_MESSAGE, type: [Artist] })
  findAll(): Artist[] {
    return this.artistsService.findAll();
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
  findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.findOne(id);
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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistsService.update(id, updateArtistDto);
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
