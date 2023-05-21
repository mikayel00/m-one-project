import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Friendship extends Model<Friendship> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  friendId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => User, 'friendId')
  friend: User;
}
