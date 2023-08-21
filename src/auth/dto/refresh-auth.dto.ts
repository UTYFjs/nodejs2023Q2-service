import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
  @ApiProperty({
    description: 'User refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGNkZjU5ZS0xMTRjLTRkYTAtODZiZS02NDBlYTA4N2FkN2IiLCJsb2dpbiI6IkJvc3NBdXRocyIsImlhdCI6MTY5MjYxODI0NiwiZXhwIjoxNjkyNzA0NjQ2fQ._nezfXCgsDLm4QbG_9_9tNaXCK70OVc7rCTARMBf1MY',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
