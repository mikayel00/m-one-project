import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { USER_ERROR } from '../common/exceptions/constants';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dtos/auth.dto';
import { AuthResponse } from './responses/auth-response';
import { TokenService } from '../token/token.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUser(data: UserCreateDto): Promise<User> {
    const existUser = await this.usersService.findUserByEmail(data.email);

    if (existUser) throw new BadRequestException(USER_ERROR.USER_EXISTS);

    return this.usersService.createUser(data);
  }

  async loginUser(data: UserLoginDto): Promise<AuthResponse> {
    const existUser = await this.usersService.findUserByEmail(data.email);
    if (!existUser) throw new UnauthorizedException(USER_ERROR.WRONG_DATA);

    const validatePassword = await bcrypt.compare(
      data.password,
      existUser.password,
    );
    if (!validatePassword)
      throw new UnauthorizedException(USER_ERROR.WRONG_DATA);
    const user = await this.usersService.publicUser(data.email);
    const token = await this.tokenService.generateJwtToken(user);
    return { user, token };
  }
}
