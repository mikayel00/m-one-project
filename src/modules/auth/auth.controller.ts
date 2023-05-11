import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { AuthService } from './auth.service';
import { UserResponse } from '../users/responses/user-response';

@Controller('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    type: UserCreateDto,
    description: 'Register user',
  })
  @Post('/register')
  register(@Body() data: UserCreateDto): Promise<UserResponse> {
    return this.authService.registerUser(data);
  }
}
