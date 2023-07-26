import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DbService {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly albums: Album[] = [];
  readonly tracks: Track[] = [];
  readonly favorites: Fav = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
