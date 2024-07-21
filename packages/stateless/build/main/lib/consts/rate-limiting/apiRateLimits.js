"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateLimitThresh = exports.UserRateLimitPolicy = void 0;
const entities_1 = require("../../entities");
var UserRateLimitPolicy;
(function (UserRateLimitPolicy) {
    UserRateLimitPolicy["CHANNEL"] = "channel";
    UserRateLimitPolicy["SUBSCRIPTION_PER_CHANNEL"] = "subscription_per_channel";
})(UserRateLimitPolicy = exports.UserRateLimitPolicy || (exports.UserRateLimitPolicy = {}));
const getRateLimitThresh = (plan) => {
    switch (plan) {
        case entities_1.UserPlan.diamond:
            return {
                [UserRateLimitPolicy.CHANNEL]: 1000,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 50000,
            };
        case entities_1.UserPlan.gold:
            return {
                [UserRateLimitPolicy.CHANNEL]: 200,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 10000,
            };
        case entities_1.UserPlan.silver:
            return {
                [UserRateLimitPolicy.CHANNEL]: 60,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 5000,
            };
        case entities_1.UserPlan.free:
            return {
                [UserRateLimitPolicy.CHANNEL]: 10,
                [UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL]: 1000,
            };
    }
};
exports.getRateLimitThresh = getRateLimitThresh;
//# sourceMappingURL=apiRateLimits.js.map