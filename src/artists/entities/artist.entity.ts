import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'Artist Id',
    example: 'cc75580a-9212-43de-9f3d-36b4c9d5d126',
    format: 'uuid',
  })
  id: string; // uuid v4

  @ApiProperty({
    description: 'Artist name',
    example: 'Pol Waker',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Is there a grammy',
    example: false,
    required: true,
  })
  grammy: boolean;
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
