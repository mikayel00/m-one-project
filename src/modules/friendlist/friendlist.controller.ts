import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { FriendlistService } from './friendlist.service';
import { Friendship } from './models/friendship.model';
import { RequestModel } from './models/request.model';
import { FriendDto } from './dtos/friend.dto';
import { RequestDto } from './dtos/request.dto';
import { ApiNoContentResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('friends')
@ApiTags('Friend Request Endpoints')
export class FriendlistController {
  constructor(private readonly friendlistService: FriendlistService) {}

  @ApiOperation({ summary: 'Get all friends' })
  @ApiOkResponse({
    type: [FriendDto],
    description: 'Get all friends',
  })
  @Get('')
  @UseGuards(JwtAuthGuard)
  getAllFriends(@Req() request): Promise<Friendship[]> {
    const { user } = request;
    return this.friendlistService.getAllFriends(user.id);
  }
  @ApiOperation({ summary: 'Add friend by ID' })
  @ApiCreatedResponse({
    type: RequestDto,
    description: 'Add friend by ID',
  })
  @Post('/add-friend')
  @UseGuards(JwtAuthGuard)
  sendFriendRequest(
    @Query('id') receiverId: number,
    @Req() request,
  ): Promise<RequestModel> {
    const { user } = request;
    return this.friendlistService.createFriendRequest(user.id, +receiverId);
  }

  @ApiOperation({ summary: 'Sent requests' })
  @ApiOkResponse({
    type: [RequestDto],
    description: 'Sent requests',
  })
  @Get('/sent-requests')
  @UseGuards(JwtAuthGuard)
  showSentRequests(@Req() request): Promise<RequestModel[]> {
    const { user } = request;
    return this.friendlistService.getUserSentRequests(user.id);
  }

  @ApiOperation({ summary: 'Received requests' })
  @ApiOkResponse({
    type: [RequestDto],
    description: 'Received requests',
  })
  @Get('/received-requests')
  @UseGuards(JwtAuthGuard)
  showReceivedRequests(@Req() request): Promise<RequestModel[]> {
    const { user } = request;
    return this.friendlistService.getUserReceivedRequests(user.id);
  }

  @ApiOperation({ summary: 'Accept friend request by ID' })
  @ApiNoContentResponse({
    description: 'Accept friend request by ID',
  })
  @Post('/accept')
  @UseGuards(JwtAuthGuard)
  acceptRequest(
    @Query('id') requestId: number,
    @Req() request,
  ): Promise<boolean> {
    const { user } = request;
    return this.friendlistService.acceptRequest(user.id, +requestId);
  }

  @ApiOperation({ summary: 'Decline friend request by ID' })
  @ApiNoContentResponse({
    description: 'Decline friend request by ID',
  })
  @Post('/decline')
  @UseGuards(JwtAuthGuard)
  declineRequest(
    @Query('id') requestId: number,
    @Req() request,
  ): Promise<boolean> {
    const { user } = request;
    return this.friendlistService.declineRequest(user.id, +requestId);
  }
}
