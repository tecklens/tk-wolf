"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHash = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
function createHash(key, valueToHash) {
    common_1.Logger.verbose('Creating Hmac');
    return (0, crypto_1.createHmac)('sha256', key).update(valueToHash).digest('hex');
}
exports.createHash = createHash;
//# sourceMappingURL=hmac.js.map