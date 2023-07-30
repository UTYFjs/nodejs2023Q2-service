import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Name of album',
    example: 'Сold Heart',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Year of album',
    example: 1990,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @ApiProperty({
    description: 'Artist Id',
    example: null,
    format: 'uuid',
  })
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
