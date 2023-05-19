import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './responses/auth-response';
import { UserLoginDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('Auth Endpoints')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    type: UserCreateDto,
    description: 'Register user',
  })
  @Post('/register')
  register(@Body() data: UserCreateDto): Promise<UserCreateDto> {
    return this.authService.registerUser(data);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    type: AuthResponse,
    description: 'Login user',
  })
  @Post('/login')
  login(@Body() data: UserLoginDto): Promise<AuthResponse> {
    return this.authService.loginUser(data);
  }
}
