import { BaseRepository } from '../base-repository';
import {
  UserRateLimitDBModel,
  UserRateLimitEntity,
} from './user-rate-limit.entity';
import { UserRateLimitSchema } from './user-rate-limit.schema';

export class UserRateLimitRepository extends BaseRepository<
  UserRateLimitDBModel,
  UserRateLimitEntity,
  object
> {
  constructor() {
    super(UserRateLimitSchema, UserRateLimitEntity);
  }

  async increaseRequestCount(
    userId: string,
    policyId: string,
    key: string,
    inc: number,
  ) {
    await this.updateOne(
      {
        _userId: userId,
        policyId: policyId,
        key: key,
      },
      {
        $inc: {
          requestCount: inc,
        },
      },
    );
  }
}
