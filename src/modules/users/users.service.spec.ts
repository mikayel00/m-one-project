import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UserFilterDto } from './dtos/user-find.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  const createUserDto = {
    firstName: 'test',
    secondName: 'test',
    username: 'test',
    age: 30,
    email: 'user@test.test',
  };

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => [createUserDto]),
          },
        },
      ],
    }).compile();
    usersService = app.get(UsersService);
  });
  describe('should return all users by filter', () => {
    it("which are includes filter's substrings in their values", async () => {
      const users: UserFilterDto[] = await usersService.getAllUsers({
        firstName: 't',
        secondName: 't',
        age: null,
        username: 'te',
        email: 'test',
      });
      expect(users).toEqual([createUserDto]);
    });
    it('if filter is empty', async () => {
      const users: UserFilterDto[] = await usersService.getAllUsers({
        firstName: undefined,
        secondName: undefined,
        age: undefined,
        username: undefined,
        email: undefined,
      });
      expect(users).toEqual([createUserDto]);
    });
  });
});
