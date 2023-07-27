import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

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
  findOneArtist(id: string) {
    const artist = this.artists.find((user) => user.id === id);
    if (artist) {
      return artist;
    } else {
      return null;
    }
  }
  createArtist(data: CreateArtistDto) {
    const newArtist = new Artist({ ...data, id: uuidv4() });
    this.artists.push(newArtist);
    return newArtist;
  }
  removeArtist(id: string) {
    const indexArtist = this.artists.findIndex((user) => user.id === id);
    if (indexArtist !== -1) {
      this.artists.splice(indexArtist, 1);
      return true;
    }
    return false;
  }
  updateArtist(id: string, updateDto: UpdateArtistDto) {
    const indexArtist = this.artists.findIndex((artist) => artist.id === id);

    if (indexArtist !== -1) {
      const currentArtist = this.artists[indexArtist];
      currentArtist.name = updateDto.name;
      currentArtist.grammy = updateDto.grammy;
      return currentArtist;
    }
    return null;
  }

  findAllAlbums() {
    return this.albums;
  }
  findOneAlbum(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      return album;
    } else {
      return null;
    }
  }
  createAlbum(data: CreateAlbumDto) {
    const newAlbum = new Album({ id: uuidv4(), ...data });
    this.albums.push(newAlbum);
    return newAlbum;
  }
  removeAlbum(id: string) {
    const indexAlbum = this.albums.findIndex((album) => album.id === id);
    if (indexAlbum !== -1) {
      this.albums.splice(indexAlbum, 1);
      return true;
    }
    return false;
  }
  updateAlbum(id: string, updateDto: UpdateAlbumDto) {
    const indexAlbum = this.albums.findIndex((album) => album.id === id);

    if (indexAlbum !== -1) {
      const currentAlbum = this.albums[indexAlbum];
      currentAlbum.name = updateDto.name;
      currentAlbum.year = updateDto.year;
      currentAlbum.artistId = updateDto.artistId;
      return currentAlbum;
    }
    return null;
  }

  findAllTracks() {
    return this.tracks;
  }
}
