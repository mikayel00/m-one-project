import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponse } from '../../users/responses/user-response';

export class AuthResponse {
  @ApiProperty({
    description: 'Auth user',
  })
  user: UserResponse;

  @ApiProperty({
    description: 'Auth token',
  })
  @IsString()
  token: string;
}
