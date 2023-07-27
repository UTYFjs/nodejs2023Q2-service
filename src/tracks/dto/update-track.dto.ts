import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
