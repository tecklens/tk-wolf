import { UserId } from '@libs/shared/types';
import { ChannelId } from '@libs/repositories/channel/types';
import { IUserRateLimit } from '@libs/repositories/user-rate-limit/types';

export class UserRateLimitEntity implements IUserRateLimit {
  _id?: ChannelId;
  _userId: string;
  key: string;
  policyId?: string;
  requestCount: number;
  windowStart: Date;

  createdAt: Date;
}

export type UserRateLimitDBModel = UserRateLimitEntity;
