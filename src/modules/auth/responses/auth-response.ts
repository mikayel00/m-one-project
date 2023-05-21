import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserLoginDto } from '../../users/dtos/user-login.dto';

export class AuthResponse {
  @ApiProperty({
    description: 'Auth user',
  })
  user: UserLoginDto;

  @ApiProperty({
    description: 'Auth token',
  })
  @IsString()
  token: string;
}
