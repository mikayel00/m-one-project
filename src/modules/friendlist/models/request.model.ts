import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class RequestModel extends Model<RequestModel> {
  @ForeignKey(() => User)
  @Column
  senderId: number;

  @ForeignKey(() => User)
  @Column
  receiverId: number;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => User, 'receiverId')
  receiver: User;
}
