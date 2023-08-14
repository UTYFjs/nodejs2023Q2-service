import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'Pol Waker',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Is there a grammy',
    example: false,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
