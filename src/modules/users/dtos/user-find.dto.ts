import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @ApiProperty({
    description: "User's name",
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "User's second name",
  })
  @IsOptional()
  @IsString()
  secondName: string;

  @ApiProperty({
    description: "User's age",
  })
  @IsOptional()
  age: number;
}
