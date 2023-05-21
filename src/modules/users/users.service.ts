import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { EXCLUDED_FIELDS } from './constants';
import { UserFilterDto } from './dtos/user-find.dto';
import { Op } from 'sequelize';

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

  async getAllUsers(filter: UserFilterDto): Promise<UserFilterDto[]> {
    const searchBody = [];
    for (const val in filter) {
      if (+filter[val]) {
        searchBody.push({ [val]: { [Op.eq]: +filter[val] } });
      } else {
        searchBody.push({ [val]: { [Op.substring]: filter[val] } });
      }
    }
    return this.userRepository.findAll({
      where: {
        [Op.and]: [searchBody],
      },
      attributes: { exclude: EXCLUDED_FIELDS },
    });
  }
}
