import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: "User's email",
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: "User's password",
  })
  @IsString()
  password: string;
}
