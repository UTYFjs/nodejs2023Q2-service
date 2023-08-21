import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { StatusCodes } from 'http-status-codes';
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AlbumConstants, ErrorType } from 'src/constants/constants';

@ApiTags('album')
@ApiBearerAuth()
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({ summary: AlbumConstants.POST_SUMMARY })
  @ApiBadRequestResponse({
    description: AlbumConstants.BAD_REQUEST_POST_MESSAGE,
    type: ErrorType,
  })
  @ApiCreatedResponse({
    description: AlbumConstants.OK_MESSAGE,
    type: Album,
  })
  @ApiBody({ type: CreateAlbumDto })
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: AlbumConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: AlbumConstants.OK_MESSAGE, type: [Album] })
  async findAll(): Promise<Album[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: AlbumConstants.GET_ONE_SUMMARY })
  @ApiParam({
    format: 'uuid',
    name: 'id',
    required: true,
    description: 'Album identifier',
  })
  @ApiOkResponse({ description: AlbumConstants.OK_MESSAGE, type: Album })
  @ApiNotFoundResponse({
    description: AlbumConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: AlbumConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: AlbumConstants.PUT_SUMMARY })
  @ApiOkResponse({ description: AlbumConstants.OK_MESSAGE, type: Album })
  @ApiNotFoundResponse({
    description: AlbumConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: AlbumConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @ApiBody({ type: UpdateAlbumDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: AlbumConstants.DELETE_SUMMARY })
  @ApiNoContentResponse({
    description: AlbumConstants.NO_CONTENT_MESSAGE,
    type: ErrorType,
  })
  @ApiNotFoundResponse({
    description: AlbumConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: AlbumConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumsService.remove(id);
  }
}
