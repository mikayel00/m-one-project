import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../../users/models/user.model';

export class AuthResponse {
  @ApiProperty({
    description: 'Auth user',
  })
  user: User;

  @ApiProperty({
    description: 'Auth token',
  })
  @IsString()
  token: string;
}
