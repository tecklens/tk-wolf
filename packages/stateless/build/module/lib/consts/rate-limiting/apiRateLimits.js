import { UserPlan } from '@stateless/lib/entities';
export var UserRateLimitPolicy;
(function (UserRateLimitPolicy) {
    UserRateLimitPolicy["CHANNEL"] = "channel";
    UserRateLimitPolicy["SUBSCRIPTION_PER_CHANNEL"] = "subscription_per_channel";
})(UserRateLimitPolicy || (UserRateLimitPolicy = {}));
export const getRateLimitThresh = (plan) => {
    switch (plan) {
        case UserPlan.diamond:
            return {
                [UserRateLimitPolicy.CHANNEL]: 1000,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 50000,
            };
        case UserPlan.gold:
            return {
                [UserRateLimitPolicy.CHANNEL]: 200,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 10000,
            };
        case UserPlan.silver:
            return {
                [UserRateLimitPolicy.CHANNEL]: 60,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 5000,
            };
        case UserPlan.free:
            return {
                [UserRateLimitPolicy.CHANNEL]: 10,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 1000,
            };
    }
};
//# sourceMappingURL=apiRateLimits.js.map