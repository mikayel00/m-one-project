import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FriendDto {
  @ApiProperty({
    description: 'Friendship id',
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'User id',
  })
  @IsOptional()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Friend id',
  })
  @IsOptional()
  @IsNumber()
  friendId: number;

  @ApiProperty({
    description: 'Created at',
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
