import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { UserResponse } from './responses/user-response';

@Controller('users')
@ApiTags('User Endpoints')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Get authorized user data' })
  @ApiOkResponse({
    type: UserResponse,
    description: 'Get authorized user data',
  })
  @Post('/get-data')
  @UseGuards(JwtAuthGuard)
  getOwnData(@Req() request): Promise<UserResponse> {
    const { user } = request;
    return this.usersService.publicUser(user.email);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: [UserResponse],
    description: 'Get all users',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<UserResponse[]> {
    return this.usersService.getAllUsers();
  }
}
