import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
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
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserConstants } from 'src/constants/constants';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: UserConstants.POST_SUMMARY })
  @ApiBadRequestResponse({
    description: UserConstants.BAD_REQUEST_POST_MESSAGE,
  })
  @ApiCreatedResponse({
    description: UserConstants.OK_MESSAGE,
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: UserConstants.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: UserConstants.OK_MESSAGE, type: [User] })
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: UserConstants.GET_ONE_SUMMARY })
  @ApiParam({
    format: 'uuid',
    name: 'id',
    required: true,
    description: 'User identifier',
  })
  @ApiOkResponse({ description: UserConstants.OK_MESSAGE, type: User })
  @ApiNotFoundResponse({ description: UserConstants.NOT_FOUND_MESSAGE })
  @ApiBadRequestResponse({ description: UserConstants.BAD_REQUEST_MESSAGE })
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: UserConstants.PUT_SUMMARY })
  @ApiOkResponse({ description: UserConstants.OK_MESSAGE, type: User })
  @ApiNotFoundResponse({ description: UserConstants.NOT_FOUND_MESSAGE })
  @ApiForbiddenResponse({ description: UserConstants.FORBIDDEN_MESSAGE })
  @ApiBadRequestResponse({ description: UserConstants.BAD_REQUEST_MESSAGE })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: UserConstants.DELETE_SUMMARY })
  @ApiNoContentResponse({ description: UserConstants.NO_CONTENT_MESSAGE })
  @ApiNotFoundResponse({ description: UserConstants.NOT_FOUND_MESSAGE })
  @ApiBadRequestResponse({ description: UserConstants.BAD_REQUEST_MESSAGE })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.usersService.remove(id);
  }
}
