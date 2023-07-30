import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class Fav {
  @ApiProperty({
    description: 'All favorit artists by one user',
    example: [
      {
        id: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
        name: 'Pol Waker',
        grammy: false,
      },
    ],
    format: 'Artist',
  })
  artists: Artist[];
  @ApiProperty({
    description: 'All favorit artists by one user',
    example: [
      {
        id: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
        name: 'Сold Heart',
        year: 1990,
        artistId: null,
      },
    ],
    format: 'Album',
  })
  albums: Album[];
  @ApiProperty({
    description: 'All favorit artists by one user',
    example: [
      {
        id: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
        name: 'Ho-Ho-Ho',
        duration: 159,
        artistId: null,
        albumId: 'bf75580a-9212-43de-9f3d-36b4c9d5d126',
      },
    ],
    format: 'Album',
  })
  tracks: Track[];
}

export type CategoryType = 'artist' | 'album' | 'track';
