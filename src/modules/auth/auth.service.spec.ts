import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { User } from '../users/models/user.model';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { TokenModule } from '../token/token.module';
import { AppModule } from '../../app/app.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './index';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { USER_ERROR } from '../common/exceptions/constants';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let model: typeof User;

  const createUserDto: UserCreateDto = {
    firstName: 'test',
    secondName: 'test',
    username: 'test',
    age: 30,
    email: 'user@test.test',
    password: 'test',
  };
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, UsersModule, TokenModule],
      providers: [
        JwtStrategy,
        AuthService,
        {
          provide: getModelToken(User),
          useValue: {
            registerUser: jest.fn(() => {
              usersService.hashPassword(createUserDto.password);
            }),
          },
        },
      ],
    }).compile();
    authService = app.get(AuthService);
    model = app.get<typeof User>(getModelToken(User));
  });

  describe('should register and login into account', () => {
    it('should register a new user', async () => {
      const user = await authService.registerUser(createUserDto);
      expect(user).toEqual(createUserDto);
    });

    it('should login with this user', async () => {
      const data = await authService.loginUser({
        email: 'user@test.test',
        password: 'test',
      });
      expect(data.user.email).toEqual(createUserDto.email);
      expect(data.user.username).toEqual(createUserDto.username);
      expect(data.user.firstName).toEqual(createUserDto.firstName);
      expect(data.user.secondName).toEqual(createUserDto.secondName);
      expect(data.user.age).toEqual(createUserDto.age);
      // delete created user from db
      await model.destroy({ where: { email: data.user.email } });
    });
  });

  describe('should throw an error', () => {
    it('user with this email already exists', async () => {
      try {
      } catch (e) {
        expect(await authService.registerUser(createUserDto)).toThrow(
          new BadRequestException(USER_ERROR.USER_EXISTS),
        );
      }
    });
    it('if entered wrong email and password or not registered', async () => {
      const user = {
        email: 'wrongemail@test.test',
        password: 'test',
      };
      try {
      } catch (e) {
        expect(await authService.loginUser(user)).toThrow(
          new BadRequestException(USER_ERROR.WRONG_DATA),
        );
      }
    });
  });
});
