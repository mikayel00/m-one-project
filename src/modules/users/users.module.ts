import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
