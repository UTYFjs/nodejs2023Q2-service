import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
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

  findAllUsers() {
    return this.users;
  }
  findOneUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  createUser(user: User) {
    const newUser = new User({ ...user });
    this.users.push(newUser);
    return newUser;
  }
  removeUser(id: string) {
    const indexUser = this.users.findIndex((user) => user.id === id);
    if (indexUser !== -1) {
      this.users.splice(indexUser, 1);
      return true;
    }
    return false;
  }
  updateUser(id: string, updateDto: UpdateUserDto) {
    const indexUser = this.users.findIndex((user) => user.id === id);

    if (
      indexUser !== -1 &&
      updateDto.oldPassword === this.users[indexUser].password
    ) {
      const currentUser = this.users[indexUser];
      currentUser.password = updateDto.newPassword;
      currentUser.version += 1;
      currentUser.updatedAt = Date.now();
      return currentUser;
    }
    return null;
  }

  findAllArtists() {
    return this.artists;
  }
  findAllAlbums() {
    return this.albums;
  }
  findAllTracks() {
    return this.tracks;
  }
}
