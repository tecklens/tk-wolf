"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTTLOptions = exports.TTL_INDEX_ENABLED = exports.TTL_EXPIRE_AFTER_AMOUNT = void 0;
exports.TTL_EXPIRE_AFTER_AMOUNT = '48h';
exports.TTL_INDEX_ENABLED = !(process.env.NOVU_MANAGED_SERVICE === 'true' ||
    process.env.DISABLE_TTL === 'true');
function getTTLOptions() {
    if (exports.TTL_INDEX_ENABLED) {
        return { expires: exports.TTL_EXPIRE_AFTER_AMOUNT };
    }
}
exports.getTTLOptions = getTTLOptions;
//# sourceMappingURL=ttl.js.map