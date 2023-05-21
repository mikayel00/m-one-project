import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RequestModel } from './models/request.model';
import { User } from '../users/models/user.model';
import { REQUEST_ERROR } from '../common/exceptions/constants';
import { Friendship } from './models/friendship.model';

@Injectable()
export class FriendlistService {
  constructor(
    @InjectModel(RequestModel) private requestRepository: typeof RequestModel,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(Friendship)
    private readonly friendshipRepository: typeof Friendship,
  ) {}

  async getAllFriends(userId: number): Promise<Friendship[]> {
    const user = await this.userRepository.findByPk(userId, {
      include: [{ model: this.friendshipRepository, as: 'friendships' }],
    });
    return user.friendships;
  }
  async createFriendRequest(
    senderId: number,
    receiverId: number,
  ): Promise<RequestModel> {
    if (senderId === receiverId) {
      throw new BadRequestException(REQUEST_ERROR.SELF_RECEIVER);
    }
    return this.requestRepository.create({
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  async findRequestById(requestId: number): Promise<RequestModel> {
    return this.requestRepository.findOne({ where: { id: requestId } });
  }

  async getUserSentRequests(userId: number): Promise<RequestModel[]> {
    const user = await this.userRepository.findByPk(userId, {
      include: [{ model: this.requestRepository, as: 'sentRequests' }],
    });
    return user.sentRequests;
  }

  async getUserReceivedRequests(userId: number): Promise<RequestModel[]> {
    const user = await this.userRepository.findByPk(userId, {
      include: [{ model: this.requestRepository, as: 'receivedRequests' }],
    });
    return user.receivedRequests;
  }

  async acceptRequest(userId: number, requestId: number): Promise<boolean> {
    const request = await this.findRequestById(requestId);
    if (!request) {
      throw new NotFoundException(REQUEST_ERROR.NOT_FOUND);
    }
    if (request.receiverId !== userId) {
      throw new BadRequestException(REQUEST_ERROR.NOT_ALLOWED_ACCEPT);
    }
    await this.friendshipRepository.create({
      userId: userId,
      friendId: request.senderId,
    });
    await this.requestRepository.destroy({ where: { id: request.id } });
    return true;
  }

  async declineRequest(userId: number, requestId: number): Promise<boolean> {
    const request = await this.findRequestById(requestId);
    if (!request) {
      throw new NotFoundException(REQUEST_ERROR.NOT_FOUND);
    }
    if (request.receiverId !== userId) {
      throw new BadRequestException(REQUEST_ERROR.NOT_ALLOWED_DECLINE);
    }
    await this.requestRepository.destroy({ where: { id: request.id } });
    return true;
  }
}
