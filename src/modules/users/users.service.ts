import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserResponse } from './responses/user-response';
import { EXCLUDED_FIELDS } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createUser(data: UserCreateDto): Promise<UserResponse> {
    data.password = await this.hashPassword(data.password);
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async publicUser(email: string): Promise<UserResponse> {
    return await this.userModel
      .findOne({ email: email })
      .select(EXCLUDED_FIELDS)
      .exec();
  }

  async getAllUsers(): Promise<UserResponse[]> {
    return await this.userModel.find().select(EXCLUDED_FIELDS).exec();
  }
}
