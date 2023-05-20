import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { User } from './models/user.model';
import { UserFilterDto } from './dtos/user-find.dto';

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

  @ApiOperation({ summary: 'Get users by filter' })
  @ApiOkResponse({
    type: [User],
    description: 'Get users by filter',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(@Query() filter: UserFilterDto): Promise<User[]> {
    return this.usersService.getAllUsers(filter);
  }
}
