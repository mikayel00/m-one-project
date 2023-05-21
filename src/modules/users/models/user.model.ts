import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Friendship } from '../../friendlist/models/friendship.model';
import { RequestModel } from '../../friendlist/models/request.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  secondName: string;

  @Column
  age: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Friendship, 'userId')
  friendships: Friendship[];

  @HasMany(() => RequestModel, 'senderId')
  sentRequests: RequestModel[];

  @HasMany(() => RequestModel, 'receiverId')
  receivedRequests: RequestModel[];
}
