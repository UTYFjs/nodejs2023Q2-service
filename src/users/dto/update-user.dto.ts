import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty } from 'class-validator';
//export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
