import { ApiProperty } from '@nestjs/swagger';

export const enum AlbumConstants {
  NOT_FOUND_MESSAGE = 'Album was not found',
  OK_MESSAGE = 'Successful',
  BAD_REQUEST_MESSAGE = 'AlbumId is not uuid',
  BAD_REQUEST_POST_MESSAGE = 'Request body does not contains required fields',
  NO_CONTENT_MESSAGE = 'Album removed',
  PUT_SUMMARY = 'Update a album with specified Id',
  POST_SUMMARY = 'Create new album',
  DELETE_SUMMARY = 'Delete a album with specific Id',
  GET_ONE_SUMMARY = 'Get one album with specific Id',
  GET_ALL_SUMMARY = 'Get all albums',
}

export const enum TrackConstants {
  NOT_FOUND_MESSAGE = 'Track was not found',
  OK_MESSAGE = 'Successful',
  BAD_REQUEST_MESSAGE = 'TrackId is not uuid',
  BAD_REQUEST_POST_MESSAGE = 'Request body does not contains required fields',
  NO_CONTENT_MESSAGE = 'Track removed',
  PUT_SUMMARY = 'Update a track with specified Id',
  POST_SUMMARY = 'Create new track',
  DELETE_SUMMARY = 'Delete a track with specific Id',
  GET_ONE_SUMMARY = 'Get one track with specific Id',
  GET_ALL_SUMMARY = 'Get all tracks',
}

export const enum ArtistConstants {
  NOT_FOUND_MESSAGE = 'Artist was not found',
  OK_MESSAGE = 'Successful',
  BAD_REQUEST_MESSAGE = 'ArtistId is not uuid',
  BAD_REQUEST_POST_MESSAGE = 'Request body does not contains required fields',
  NO_CONTENT_MESSAGE = 'Artist removed',
  PUT_SUMMARY = 'Update a artist with specified Id',
  POST_SUMMARY = 'Create new artist',
  DELETE_SUMMARY = 'Delete a artist with specific Id',
  GET_ONE_SUMMARY = 'Get one artist with specific Id',
  GET_ALL_SUMMARY = 'Get all artists',
}
export const enum UserConstants {
  NOT_FOUND_MESSAGE = 'User was not found',
  OK_MESSAGE = 'Successful',
  BAD_REQUEST_MESSAGE = 'UserId is not uuid',
  BAD_REQUEST_POST_MESSAGE = 'Request body does not contains required fields',
  NO_CONTENT_MESSAGE = 'User removed',
  PUT_SUMMARY = 'Update a user with specified Id',
  POST_SUMMARY = 'Create new user',
  DELETE_SUMMARY = 'Delete a user with specific Id',
  GET_ONE_SUMMARY = 'Get one user with specific Id',
  GET_ALL_SUMMARY = 'Get all users',
  FORBIDDEN_MESSAGE = 'Old password is wrong',
  FORBIDDEN_USER_LOGIN = 'Login or password is wrong',
}
export const enum FavsConstants {
  NOT_FOUND_MESSAGE = 'This item is not favorites',
  OK_MESSAGE = 'Successful added to favorites',
  BAD_REQUEST_MESSAGE = 'Id is not uuid',
  NO_CONTENT_MESSAGE = 'Item removed from favorites',
  //PUT_SUMMARY = 'Update a user with specified Id',
  POST_SUMMARY = 'Add to favorites',
  DELETE_SUMMARY = 'Delete from favorites',
  //GET_ONE_SUMMARY = 'Get one user with specific Id',
  GET_ALL_SUMMARY = 'Get all favorites by one user',
  UNPROCESSABLE_REQUEST_MESSAGE = 'Entity with this Id doesn`t exist',
  //FORBIDDEN_MESSAGE = 'Old password is wrong',
}

export class ErrorType {
  @ApiProperty({
    description: 'Status code of error',
    format: 'number',
  })
  statusCode: number;
  @ApiProperty({
    description: 'Error message',
    format: 'string',
  })
  message: string;
  @ApiProperty({
    description: 'Error',
    format: 'string',
  })
  error: string;
}
