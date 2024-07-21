import { createHash as createHashCrypto } from 'crypto';
export const buildCommonKey = ({ type, keyEntity, environmentIdPrefix = OrgScopePrefixEnum.ENVIRONMENT_ID, environmentId, identifierPrefix = IdentifierPrefixEnum.ID, identifier, }) => prefixWrapper(`${type}:${keyEntity}:${environmentIdPrefix}=${environmentId}:${identifierPrefix}=${identifier}`);
export const buildCommonEnvironmentKey = ({ type, keyEntity, environmentIdPrefix = OrgScopePrefixEnum.ENVIRONMENT_ID, environmentId, }) => prefixWrapper(`${type}:${keyEntity}:${environmentIdPrefix}=${environmentId}`);
const buildKeyById = ({ type, keyEntity, identifierPrefix = IdentifierPrefixEnum.ID, identifier, }) => prefixWrapper(`${type}:${keyEntity}:${identifierPrefix}=${identifier}`);
export function prefixWrapper(prefixString) {
    return `{${prefixString}}`;
}
export const QUERY_PREFIX = '#query#';
export var CacheKeyPrefixEnum;
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
})(CacheKeyPrefixEnum || (CacheKeyPrefixEnum = {}));
export var CacheKeyTypeEnum;
(function (CacheKeyTypeEnum) {
    CacheKeyTypeEnum["ENTITY"] = "entity";
    CacheKeyTypeEnum["QUERY"] = "query";
})(CacheKeyTypeEnum || (CacheKeyTypeEnum = {}));
export var IdentifierPrefixEnum;
(function (IdentifierPrefixEnum) {
    IdentifierPrefixEnum["ID"] = "i";
    IdentifierPrefixEnum["SUBSCRIBER_ID"] = "s";
    IdentifierPrefixEnum["TEMPLATE_IDENTIFIER"] = "t_i";
    IdentifierPrefixEnum["API_KEY"] = "a_k";
    IdentifierPrefixEnum["GROUPED_BLUEPRINT"] = "g_b";
    IdentifierPrefixEnum["API_RATE_LIMIT_CATEGORY"] = "a_r_l_c";
    IdentifierPrefixEnum["SERVICE_CONFIG"] = "s_c";
})(IdentifierPrefixEnum || (IdentifierPrefixEnum = {}));
export var ServiceConfigIdentifierEnum;
(function (ServiceConfigIdentifierEnum) {
    ServiceConfigIdentifierEnum["API_RATE_LIMIT_SERVICE_MAXIMUM"] = "api_rate_limit_service_maximum";
})(ServiceConfigIdentifierEnum || (ServiceConfigIdentifierEnum = {}));
export var OrgScopePrefixEnum;
(function (OrgScopePrefixEnum) {
    OrgScopePrefixEnum["ENVIRONMENT_ID"] = "e";
    OrgScopePrefixEnum["ORGANIZATION_ID"] = "o";
})(OrgScopePrefixEnum || (OrgScopePrefixEnum = {}));
export const BLUEPRINT_IDENTIFIER = 'blueprints/group-by-category';
const buildSubscriberKey = ({ subscriberId, _environmentId, }) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.SUBSCRIBER,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.SUBSCRIBER_ID,
    identifier: subscriberId,
});
const buildVariablesKey = ({ _environmentId, _organizationId, }) => buildCommonEnvironmentKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.WORKFLOW_VARIABLES,
    environmentId: _environmentId,
});
const buildUserKey = ({ _id }) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.USER,
    identifier: _id,
});
const buildNotificationTemplateKey = ({ _id, _environmentId, }) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.NOTIFICATION_TEMPLATE,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.ID,
    identifier: _id,
});
const buildNotificationTemplateIdentifierKey = ({ templateIdentifier, _environmentId, }) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.NOTIFICATION_TEMPLATE,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.TEMPLATE_IDENTIFIER,
    identifier: templateIdentifier,
});
const buildEnvironmentByApiKey = ({ apiKey }) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.ENVIRONMENT_BY_API_KEY,
    identifier: apiKey,
    identifierPrefix: IdentifierPrefixEnum.API_KEY,
});
const buildGroupedBlueprintsKey = (environmentId) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.GROUPED_BLUEPRINTS,
    environmentIdPrefix: OrgScopePrefixEnum.ORGANIZATION_ID,
    environmentId: environmentId,
    identifierPrefix: IdentifierPrefixEnum.GROUPED_BLUEPRINT,
    identifier: BLUEPRINT_IDENTIFIER,
});
const createHash = (apiKey) => {
    const hash = createHashCrypto('sha256');
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
const buildMaximumApiRateLimitKey = ({ apiRateLimitCategory, _environmentId, }) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.MAXIMUM_API_RATE_LIMIT,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.API_RATE_LIMIT_CATEGORY,
    identifier: apiRateLimitCategory,
});
const buildEvaluateApiRateLimitKey = ({ apiRateLimitCategory, _environmentId, }) => buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.EVALUATE_API_RATE_LIMIT,
    environmentId: _environmentId,
    identifierPrefix: IdentifierPrefixEnum.API_RATE_LIMIT_CATEGORY,
    identifier: apiRateLimitCategory,
});
const buildServiceConfigKey = (identifier) => buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.SERVICE_CONFIG,
    identifierPrefix: IdentifierPrefixEnum.SERVICE_CONFIG,
    identifier,
});
const buildServiceConfigApiRateLimitMaximumKey = () => buildServiceConfigKey(ServiceConfigIdentifierEnum.API_RATE_LIMIT_SERVICE_MAXIMUM);
export { buildUserKey, buildSubscriberKey, buildNotificationTemplateKey, buildNotificationTemplateIdentifierKey, buildEnvironmentByApiKey, buildKeyById, buildGroupedBlueprintsKey, buildAuthServiceKey, buildMaximumApiRateLimitKey, buildEvaluateApiRateLimitKey, buildServiceConfigApiRateLimitMaximumKey, buildVariablesKey, };
//# sourceMappingURL=index.js.map