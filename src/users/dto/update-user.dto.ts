import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty } from 'class-validator';
//export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
  oldPassword: string; // previous password
  newPassword: string;
}
