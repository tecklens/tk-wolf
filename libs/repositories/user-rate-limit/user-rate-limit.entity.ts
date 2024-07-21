import { ChannelId, IUserRateLimit } from '@wolf/stateless';

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
