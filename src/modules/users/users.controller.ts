import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { User } from './schemas/user.schema';

@Controller('users')
@ApiTags('User Endpoints')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Get authorized user data' })
  @ApiOkResponse({
    type: User,
    description: 'Get authorized user data',
  })
  @Get('/get-data')
  @UseGuards(JwtAuthGuard)
  getOwnData(@Req() request): Promise<User> {
    const { user } = request;
    return this.usersService.publicUser(user.email);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: [User],
    description: 'Get all users',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
