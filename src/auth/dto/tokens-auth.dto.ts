/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    description: 'User refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZWM1NzhkNi0yOWU5LTQ0NDItYjI4OS1lNDBhMzI0M2QzZGUiLCJsb2dpbiI6IkJvc3NBdXRocyIsImlhdCI6MTY5MjYzOTQ4NiwiZXhwIjoxNjkyNjQzMDg2fQ.hR6LrWlLHEr86q9r5sMAEtqmUTZhSHW1FXvNZN5YksQ',
    required: true,
  })
  refreshToken: string;

  @ApiProperty({
    description: 'User acess token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZWM1NzhkNi0yOWU5LTQ0NDItYjI4OS1lNDBhMzI0M2QzZGUiLCJsb2dpbiI6IkJvc3NBdXRocyIsImlhdCI6MTY5MjYzOTQ4NiwiZXhwIjoxNjk3ODIzNDg2fQ.-3DFlyAXqY86cedrbsWgUjm4GwizTisdjvuobjM4vII',
    required: true,
  })
  accessToken: string;
}
