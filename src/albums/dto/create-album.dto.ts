import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
