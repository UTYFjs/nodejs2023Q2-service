import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'Rikki',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Is there a grammy',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
