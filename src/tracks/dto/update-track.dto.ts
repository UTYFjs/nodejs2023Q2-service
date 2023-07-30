import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({
    description: 'Name of track',
    example: 'Ha-Ha-Ha',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Artist Id',
    example: null,
    format: 'uuid',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'Album Id',
    example: null,
    format: 'uuid',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @ApiProperty({
    description: 'Duration of track',
    example: 180,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
