export declare const buildCommonKey: ({ type, keyEntity, environmentIdPrefix, environmentId, identifierPrefix, identifier, }: {
    type: CacheKeyTypeEnum;
    keyEntity: CacheKeyPrefixEnum;
    environmentIdPrefix?: OrgScopePrefixEnum;
    environmentId: string;
    identifierPrefix?: IdentifierPrefixEnum;
    identifier: string;
}) => string;
export declare const buildCommonEnvironmentKey: ({ type, keyEntity, environmentIdPrefix, environmentId, }: {
    type: CacheKeyTypeEnum;
    keyEntity: CacheKeyPrefixEnum;
    environmentIdPrefix?: OrgScopePrefixEnum;
    environmentId: string;
}) => string;
declare const buildKeyById: ({ type, keyEntity, identifierPrefix, identifier, }: {
    type: CacheKeyTypeEnum;
    keyEntity: CacheKeyPrefixEnum;
    identifierPrefix?: IdentifierPrefixEnum;
    identifier: string;
}) => string;
export declare function prefixWrapper(prefixString: string): string;
export declare const QUERY_PREFIX = "#query#";
export declare enum CacheKeyPrefixEnum {
    MESSAGE_COUNT = "message_count",
    FEED = "feed",
    SUBSCRIBER = "subscriber",
    NOTIFICATION_TEMPLATE = "notification_template",
    WORKFLOW_VARIABLES = "workflow_variables",
    USER = "user",
    INTEGRATION = "integration",
    ENVIRONMENT_BY_API_KEY = "environment_by_api_key",
    GROUPED_BLUEPRINTS = "grouped-blueprints",
    AUTH_SERVICE = "auth_service",
    MAXIMUM_API_RATE_LIMIT = "maximum_api_rate_limit",
    EVALUATE_API_RATE_LIMIT = "evaluate_api_rate_limit",
    SERVICE_CONFIG = "service_config"
}
export declare enum CacheKeyTypeEnum {
    ENTITY = "entity",
    QUERY = "query"
}
export declare enum IdentifierPrefixEnum {
    ID = "i",
    SUBSCRIBER_ID = "s",
    TEMPLATE_IDENTIFIER = "t_i",
    API_KEY = "a_k",
    GROUPED_BLUEPRINT = "g_b",
    API_RATE_LIMIT_CATEGORY = "a_r_l_c",
    SERVICE_CONFIG = "s_c"
}
export declare enum ServiceConfigIdentifierEnum {
    API_RATE_LIMIT_SERVICE_MAXIMUM = "api_rate_limit_service_maximum"
}
export declare enum OrgScopePrefixEnum {
    ENVIRONMENT_ID = "e",
    ORGANIZATION_ID = "o"
}
export declare const BLUEPRINT_IDENTIFIER = "blueprints/group-by-category";
declare const buildSubscriberKey: ({ subscriberId, _environmentId, }: {
    subscriberId: string;
    _environmentId: string;
}) => string;
declare const buildVariablesKey: ({ _environmentId, _organizationId, }: {
    _environmentId: string;
    _organizationId: string;
}) => string;
declare const buildUserKey: ({ _id }: {
    _id: string;
}) => string;
declare const buildNotificationTemplateKey: ({ _id, _environmentId, }: {
    _id: string;
    _environmentId: string;
}) => string;
declare const buildNotificationTemplateIdentifierKey: ({ templateIdentifier, _environmentId, }: {
    templateIdentifier: string;
    _environmentId: string;
}) => string;
declare const buildEnvironmentByApiKey: ({ apiKey }: {
    apiKey: string;
}) => string;
declare const buildGroupedBlueprintsKey: (environmentId: string) => string;
declare const buildAuthServiceKey: ({ apiKey }: {
    apiKey: string;
}) => string;
declare const buildMaximumApiRateLimitKey: ({ apiRateLimitCategory, _environmentId, }: {
    apiRateLimitCategory: string;
    _environmentId: string;
}) => string;
declare const buildEvaluateApiRateLimitKey: ({ apiRateLimitCategory, _environmentId, }: {
    apiRateLimitCategory: string;
    _environmentId: string;
}) => string;
declare const buildServiceConfigApiRateLimitMaximumKey: () => string;
export { buildUserKey, buildSubscriberKey, buildNotificationTemplateKey, buildNotificationTemplateIdentifierKey, buildEnvironmentByApiKey, buildKeyById, buildGroupedBlueprintsKey, buildAuthServiceKey, buildMaximumApiRateLimitKey, buildEvaluateApiRateLimitKey, buildServiceConfigApiRateLimitMaximumKey, buildVariablesKey, };
