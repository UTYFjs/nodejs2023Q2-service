import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Admin',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'User Password',
    example: 'adminadmin',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
