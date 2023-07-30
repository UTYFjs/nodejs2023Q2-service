import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    description: 'Album Id',
    example: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
    format: 'uuid',
  })
  id: string; // uuid v4
  @ApiProperty({
    description: 'User name',
    example: 'Admin',
    required: true,
  })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ description: 'increment on update', example: 1 })
  version: number; // integer number, increments on update
  @ApiProperty({
    description: 'timestamp of time created',
    example: 19000222550,
    required: true,
  })
  createdAt: number; // timestamp of creation
  @ApiProperty({
    description: 'timestamp of time updated',
    example: 19000222550,
    required: true,
  })
  updatedAt: number; // timestamp of last update
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
