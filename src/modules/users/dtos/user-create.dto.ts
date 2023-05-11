import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    description: "User's name",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "User's second name",
  })
  @IsString()
  secondName: string;

  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  username: string;

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
