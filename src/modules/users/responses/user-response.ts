import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserResponse {
  @ApiProperty({
    description: 'User first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User second name',
  })
  @IsString()
  secondName: string;

  @ApiProperty({
    description: 'User username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  email: string;
}
