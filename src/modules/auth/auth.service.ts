import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { USER_ERROR } from '../common/exceptions/constants';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/responses/user-response';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async registerUser(data: UserCreateDto): Promise<UserResponse> {
    const existUser = await this.usersService.findUserByEmail(data.email);

    if (existUser) throw new BadRequestException(USER_ERROR.USER_EXISTS);

    return this.usersService.createUser(data);
  }
}
