import { ChannelId, IUserRateLimit } from '@wolfxlabs/stateless';

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
