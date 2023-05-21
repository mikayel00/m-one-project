import { Module } from '@nestjs/common';
import { FriendlistService } from './friendlist.service';
import { FriendlistController } from './friendlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestModel } from './models/request.model';
import { User } from '../users/models/user.model';
import { Friendship } from './models/friendship.model';

@Module({
  imports: [SequelizeModule.forFeature([RequestModel, User, Friendship])],
  providers: [FriendlistService],
  controllers: [FriendlistController],
})
export class FriendlistModule {}
