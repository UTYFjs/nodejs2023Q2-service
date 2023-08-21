import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'Album Id',
    example: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
    format: 'uuid',
  })
  id: string; // uuid v4
  @ApiProperty({
    description: 'Name of album',
    example: 'Сold Heart',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'year of album',
    example: 1990,
    required: true,
  })
  year: number;

  @ApiProperty({
    description: 'Artist Id',
    example: null,
    format: 'uuid',
  })
  artistId: string | null;
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
