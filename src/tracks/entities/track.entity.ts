import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    description: 'Track Id',
    example: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    description: 'Name of track',
    example: 'Ho-Ho-Ho',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Artist Id',
    example: null,
    format: 'uuid',
  })
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'Album Id',
    example: null,
    format: 'uuid',
  })
  albumId: string | null; // refers to Album

  @ApiProperty({
    description: 'Duration of track',
    example: 180,
    required: true,
  })
  duration: number; // integer number
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
