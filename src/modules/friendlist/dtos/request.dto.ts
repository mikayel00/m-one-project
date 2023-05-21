import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    description: 'Friendship id',
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Sender Id',
  })
  @IsOptional()
  @IsNumber()
  senderId: number;

  @ApiProperty({
    description: 'Receiver id',
  })
  @IsOptional()
  @IsNumber()
  receiverId: number;

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
