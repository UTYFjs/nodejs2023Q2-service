import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
