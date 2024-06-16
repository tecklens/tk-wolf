import { UserPlan } from '@libs/repositories/user';

export enum UserRateLimitPolicy {
  CHANNEL = 'channel',
  SUBSCRIPTION_PER_CHANNEL = 'subscription_per_channel',
}

export const getRateLimitThresh = (plan: UserPlan) => {
  switch (plan) {
    case UserPlan.diamond:
      return {
        [UserRateLimitPolicy.CHANNEL]: 50,
        [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 50000,
      };
    case UserPlan.gold:
      return {
        [UserRateLimitPolicy.CHANNEL]: 30,
        [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 10000,
      };
    case UserPlan.silver:
      return {
        [UserRateLimitPolicy.CHANNEL]: 10,
        [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 5000,
      };
    case UserPlan.free:
      return {
        [UserRateLimitPolicy.CHANNEL]: 10,
        [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 1000,
      };
  }
};
