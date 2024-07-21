"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportStrategyEnum = exports.ApiAuthSchemeEnum = void 0;
var ApiAuthSchemeEnum;
(function (ApiAuthSchemeEnum) {
    ApiAuthSchemeEnum["BEARER"] = "Bearer";
    ApiAuthSchemeEnum["API_KEY"] = "ApiKey";
})(ApiAuthSchemeEnum = exports.ApiAuthSchemeEnum || (exports.ApiAuthSchemeEnum = {}));
var PassportStrategyEnum;
(function (PassportStrategyEnum) {
    PassportStrategyEnum["JWT"] = "jwt";
    PassportStrategyEnum["HEADER_API_KEY"] = "apikey";
    PassportStrategyEnum["GITHUB"] = "github";
    PassportStrategyEnum["GOOGLE"] = "google";
    PassportStrategyEnum["LOCAL"] = "local";
})(PassportStrategyEnum = exports.PassportStrategyEnum || (exports.PassportStrategyEnum = {}));
//# sourceMappingURL=auth.types.js.map