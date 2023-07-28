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
import { CategoryType } from './entities/fav.entity';
//import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post(['artist/:id', 'track/:id', 'album/:id'])
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
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFav(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request) {
    const category = this.parseCategory(request);
    return this.favsService.remove(category, id);
  }

  private parseCategory(request: Request): CategoryType {
    const url = request.url;
    const arrUrl = url.split('/');
    const category = arrUrl[arrUrl.length - 2];
    /*if (category === 'artist' || 'album' || 'track') {
      return category as CategoryType;
    }
    return null;*/
    return category as CategoryType;
  }
}
