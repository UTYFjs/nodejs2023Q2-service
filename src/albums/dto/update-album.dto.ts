import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
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
