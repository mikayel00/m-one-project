import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const createdUser = {
    id: 1,
    firstName: 'test',
    secondName: 'test',
    username: 'test',
    age: 30,
    email: 'test@test.test',
    password: 'hashedPassword',
  };

  const createUserDto: UserCreateDto = {
    firstName: 'test',
    secondName: 'test',
    username: 'test',
    age: 30,
    email: 'test@test.test',
    password: 'test',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn(() => createdUser),
          },
        },
        UsersService,
        {
          provide: UsersService,
          useValue: {
            hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
          },
        },
      ],
    }).compile();
    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should have id field and hash a password after registration', async () => {
    jest.spyOn(authService, 'registerUser').mockResolvedValue(createdUser);
    const user = await authController.register(createUserDto);
    expect(user).toEqual({
      id: 1,
      ...createdUser,
    });
  });
});
