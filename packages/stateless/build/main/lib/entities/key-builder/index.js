"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVariablesKey = exports.buildServiceConfigApiRateLimitMaximumKey = exports.buildEvaluateApiRateLimitKey = exports.buildMaximumApiRateLimitKey = exports.buildAuthServiceKey = exports.buildGroupedBlueprintsKey = exports.buildKeyById = exports.buildEnvironmentByApiKey = exports.buildNotificationTemplateIdentifierKey = exports.buildNotificationTemplateKey = exports.buildSubscriberKey = exports.buildUserKey = exports.BLUEPRINT_IDENTIFIER = exports.OrgScopePrefixEnum = exports.ServiceConfigIdentifierEnum = exports.IdentifierPrefixEnum = exports.CacheKeyTypeEnum = exports.CacheKeyPrefixEnum = exports.QUERY_PREFIX = exports.prefixWrapper = exports.buildCommonEnvironmentKey = exports.buildCommonKey = void 0;
const crypto_1 = require("crypto");
const buildCommonKey = ({ type, keyEntity, environmentIdPrefix = OrgScopePrefixEnum.ENVIRONMENT_ID, environmentId, identifierPrefix = IdentifierPrefixEnum.ID, identifier, }) => prefixWrapper(`${type}:${keyEntity}:${environmentIdPrefix}=${environmentId}:${identifierPrefix}=${identifier}`);
exports.buildCommonKey = buildCommonKey;
const buildCommonEnvironmentKey = ({ type, keyEntity, environmentIdPrefix = OrgScopePrefixEnum.ENVIRONMENT_ID, environmentId, }) => prefixWrapper(`${type}:${keyEntity}:${environmentIdPrefix}=${environmentId}`);
exports.buildCommonEnvironmentKey = buildCommonEnvironmentKey;
const buildKeyById = ({ type, keyEntity, identifierPrefix = IdentifierPrefixEnum.ID, identifier, }) => prefixWrapper(`${type}:${keyEntity}:${identifierPrefix}=${identifier}`);
exports.buildKeyById = buildKeyById;
function prefixWrapper(prefixString) {
    return `{${prefixString}}`;
}
exports.prefixWrapper = prefixWrapper;
exports.QUERY_PREFIX = '#query#';
var CacheKeyPrefixEnum;
(function (CacheKeyPrefixEnum) {
    CacheKeyPrefixEnum["MESSAGE_COUNT"] = "message_count";
    CacheKeyPrefixEnum["FEED"] = "feed";
    CacheKeyPrefixEnum["SUBSCRIBER"] = "subscriber";
    CacheKeyPrefixEnum["NOTIFICATION_TEMPLATE"] = "notification_template";
    CacheKeyPrefixEnum["WORKFLOW_VARIABLES"] = "workflow_variables";
    CacheKeyPrefixEnum["USER"] = "user";
    CacheKeyPrefixEnum["INTEGRATION"] = "integration";
    CacheKeyPrefixEnum["ENVIRONMENT_BY_API_KEY"] = "environment_by_api_key";
    CacheKeyPrefixEnum["GROUPED_BLUEPRINTS"] = "grouped-blueprints";
    CacheKeyPrefixEnum["AUTH_SERVICE"] = "auth_service";
    CacheKeyPrefixEnum["MAXIMUM_API_RATE_LIMIT"] = "maximum_api_rate_limit";
    CacheKeyPrefixEnum["EVALUATE_API_RATE_LIMIT"] = "evaluate_api_rate_limit";
    CacheKeyPrefixEnum["SERVICE_CONFIG"] = "service_config";
})(CacheKeyPrefixEnum = exports.CacheKeyPrefixEnum || (exports.CacheKeyPrefixEnum = {}));
var CacheKeyTypeEnum;
(function (CacheKeyTypeEnum) {
    CacheKeyTypeEnum["ENTITY"] = "entity";
    CacheKeyTypeEnum["QUERY"] = "query";
})(CacheKeyTypeEnum = exports.CacheKeyTypeEnum || (exports.CacheKeyTypeEnum = {}));
var IdentifierPrefixEnum;
(function (IdentifierPrefixEnum) {
    IdentifierPrefixEnum["ID"] = "i";
    IdentifierPrefixEnum["SUBSCRIBER_ID"] = "s";
    IdentifierPrefixEnum["TEMPLATE_IDENTIFIER"] = "t_i";
    IdentifierPrefixEnum["API_KEY"] = "a_k";
    IdentifierPrefixEnum["GROUPED_BLUEPRINT"] = "g_b";
    IdentifierPrefixEnum["API_RATE_LIMIT_CATEGORY"] = "a_r_l_c";
    IdentifierPrefixEnum["SERVICE_CONFIG"] = "s_c";
})(IdentifierPrefixEnum = exports.IdentifierPrefixEnum || (exports.IdentifierPrefixEnum = {}));
var ServiceConfigIdentifierEnum;
(function (ServiceConfigIdentifierEnum) {
    ServiceConfigIdentifierEnum["API_RATE_LIMIT_SERVICE_MAXIMUM"] = "api_rate_limit_service_maximum";
})(ServiceConfigIdentifierEnum = exports.ServiceConfigIdentifierEnum || (exports.ServiceConfigIdentifierEnum = {}));
var OrgScopePrefixEnum;
(function (OrgScopePrefixEnum) {
    OrgScopePrefixEnum["ENVIRONMENT_ID"] = "e";
    OrgScopePrefixEnum["ORGANIZATION_ID"] = "o";
})(OrgScopePrefixEnum = exports.OrgScopePrefixEnum || (exports.OrgScopePrefixEnum = {}));
exports.BLUEPRINT_IDENTIFIER = 'blueprints/group-by-category';
const buildSubscriberKey = ({ subscriberId, _environmentId, }) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.SUBSCRIBER,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.SUBSCRIBER_ID,
    identifier: subscriberId,
});
exports.buildSubscriberKey = buildSubscriberKey;
const buildVariablesKey = ({ _environmentId, _organizationId, }) => (0, exports.buildCommonEnvironmentKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.WORKFLOW_VARIABLES,
    environmentId: _environmentId,
});
exports.buildVariablesKey = buildVariablesKey;
const buildUserKey = ({ _id }) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.USER,
    identifier: _id,
});
exports.buildUserKey = buildUserKey;
const buildNotificationTemplateKey = ({ _id, _environmentId, }) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.NOTIFICATION_TEMPLATE,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.ID,
    identifier: _id,
});
exports.buildNotificationTemplateKey = buildNotificationTemplateKey;
const buildNotificationTemplateIdentifierKey = ({ templateIdentifier, _environmentId, }) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.NOTIFICATION_TEMPLATE,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.TEMPLATE_IDENTIFIER,
    identifier: templateIdentifier,
});
exports.buildNotificationTemplateIdentifierKey = buildNotificationTemplateIdentifierKey;
const buildEnvironmentByApiKey = ({ apiKey }) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.ENVIRONMENT_BY_API_KEY,
    identifier: apiKey,
    identifierPrefix: IdentifierPrefixEnum.API_KEY,
});
exports.buildEnvironmentByApiKey = buildEnvironmentByApiKey;
const buildGroupedBlueprintsKey = (environmentId) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.GROUPED_BLUEPRINTS,
    environmentIdPrefix: OrgScopePrefixEnum.ORGANIZATION_ID,
    environmentId: environmentId,
    identifierPrefix: IdentifierPrefixEnum.GROUPED_BLUEPRINT,
    identifier: exports.BLUEPRINT_IDENTIFIER,
});
exports.buildGroupedBlueprintsKey = buildGroupedBlueprintsKey;
const createHash = (apiKey) => {
    const hash = (0, crypto_1.createHash)('sha256');
    hash.update(apiKey);
    return hash.digest('hex');
};
const buildAuthServiceKey = ({ apiKey }) => {
    const apiKeyHash = createHash(apiKey);
    return buildKeyById({
        type: CacheKeyTypeEnum.ENTITY,
        keyEntity: CacheKeyPrefixEnum.AUTH_SERVICE,
        identifier: apiKeyHash,
        identifierPrefix: IdentifierPrefixEnum.API_KEY,
    });
};
exports.buildAuthServiceKey = buildAuthServiceKey;
const buildMaximumApiRateLimitKey = ({ apiRateLimitCategory, _environmentId, }) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.MAXIMUM_API_RATE_LIMIT,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.API_RATE_LIMIT_CATEGORY,
    identifier: apiRateLimitCategory,
});
exports.buildMaximumApiRateLimitKey = buildMaximumApiRateLimitKey;
const buildEvaluateApiRateLimitKey = ({ apiRateLimitCategory, _environmentId, }) => (0, exports.buildCommonKey)({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.EVALUATE_API_RATE_LIMIT,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.API_RATE_LIMIT_CATEGORY,
    identifier: apiRateLimitCategory,
});
exports.buildEvaluateApiRateLimitKey = buildEvaluateApiRateLimitKey;
const buildServiceConfigKey = (identifier) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.SERVICE_CONFIG,
    identifierPrefix: IdentifierPrefixEnum.SERVICE_CONFIG,
    identifier,
});
const buildServiceConfigApiRateLimitMaximumKey = () => buildServiceConfigKey(ServiceConfigIdentifierEnum.API_RATE_LIMIT_SERVICE_MAXIMUM);
exports.buildServiceConfigApiRateLimitMaximumKey = buildServiceConfigApiRateLimitMaximumKey;
//# sourceMappingURL=index.js.map