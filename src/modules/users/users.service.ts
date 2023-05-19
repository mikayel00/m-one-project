import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { EXCLUDED_FIELDS } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(data: UserCreateDto): Promise<UserCreateDto> {
    data.password = await this.hashPassword(data.password);
    await this.userRepository.create({
      firstName: data.firstName,
      secondName: data.secondName,
      username: data.username,
      email: data.email,
      password: data.password,
      age: data.age,
    });
    return data;
  }

  async publicUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: EXCLUDED_FIELDS },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({
      attributes: { exclude: EXCLUDED_FIELDS },
    });
  }
}
