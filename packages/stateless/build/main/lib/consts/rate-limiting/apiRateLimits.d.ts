import { UserPlan } from '@stateless/lib/entities';
export declare enum UserRateLimitPolicy {
    CHANNEL = "channel",
    SUBSCRIPTION_PER_CHANNEL = "subscription_per_channel"
}
export declare const getRateLimitThresh: (plan: UserPlan) => {
    channel: number;
    subscription_per_channel: number;
};
