"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiAccessible = void 0;
const common_1 = require("@nestjs/common");
const ExternalApiAccessible = () => (0, common_1.SetMetadata)('external_api_accessible', true);
exports.ExternalApiAccessible = ExternalApiAccessible;
//# sourceMappingURL=external-api.decorator.js.map