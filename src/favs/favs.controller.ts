import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryType, Fav } from './entities/fav.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorType, FavsConstants } from 'src/constants/constants';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: FavsConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: FavsConstants.OK_MESSAGE, type: Fav })
  findAll() {
    return this.favsService.findAll();
  }

  @Post(['artist/:id', 'track/:id', 'album/:id'])
  @ApiOperation({ summary: FavsConstants.POST_SUMMARY })
  @ApiBadRequestResponse({
    description: FavsConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @ApiUnprocessableEntityResponse({
    description: FavsConstants.UNPROCESSABLE_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @ApiCreatedResponse({
    description: FavsConstants.OK_MESSAGE,
    //type: 'string',
  })
  @ApiParam({
    format: 'uuid',
    name: 'id',
    required: true,
    description: 'Id',
  })
  createFavAtrist(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Req()
    request: Request,
  ) {
    const category = this.parseCategory(request);
    return this.favsService.createFav(category, id);
  }
  @Delete(['artist/:id', 'track/:id', 'album/:id'])
  @ApiOperation({ summary: FavsConstants.DELETE_SUMMARY })
  @ApiNoContentResponse({ description: FavsConstants.NO_CONTENT_MESSAGE })
  @ApiNotFoundResponse({
    description: FavsConstants.NOT_FOUND_MESSAGE,
    type: ErrorType,
  })
  @ApiBadRequestResponse({
    description: FavsConstants.BAD_REQUEST_MESSAGE,
    type: ErrorType,
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFav(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request) {
    const category = this.parseCategory(request);
    return this.favsService.remove(category, id);
  }

  private parseCategory(request: Request): CategoryType {
    const url = request.url;
    const arrUrl = url.split('/');
    const category = arrUrl[arrUrl.length - 2];
    return category as CategoryType;
  }
}
