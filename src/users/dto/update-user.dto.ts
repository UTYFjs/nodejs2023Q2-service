import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User Password',
    example: 'adminadmin',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({
    description: 'User Password',
    example: 'newPassword',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
