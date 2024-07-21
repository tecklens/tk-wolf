"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponseHeaderKeysEnum = exports.HttpRequestHeaderKeysEnum = void 0;
var HttpRequestHeaderKeysEnum;
(function (HttpRequestHeaderKeysEnum) {
    HttpRequestHeaderKeysEnum["AUTHORIZATION"] = "Authorization";
    HttpRequestHeaderKeysEnum["USER_AGENT"] = "User-Agent";
    HttpRequestHeaderKeysEnum["CONTENT_TYPE"] = "Content-Type";
    HttpRequestHeaderKeysEnum["SENTRY_TRACE"] = "Sentry-Trace";
})(HttpRequestHeaderKeysEnum = exports.HttpRequestHeaderKeysEnum || (exports.HttpRequestHeaderKeysEnum = {}));
var HttpResponseHeaderKeysEnum;
(function (HttpResponseHeaderKeysEnum) {
    HttpResponseHeaderKeysEnum["CONTENT_TYPE"] = "Content-Type";
    HttpResponseHeaderKeysEnum["RATELIMIT_REMAINING"] = "RateLimit-Remaining";
    HttpResponseHeaderKeysEnum["RATELIMIT_LIMIT"] = "RateLimit-Limit";
    HttpResponseHeaderKeysEnum["RATELIMIT_RESET"] = "RateLimit-Reset";
    HttpResponseHeaderKeysEnum["RATELIMIT_POLICY"] = "RateLimit-Policy";
    HttpResponseHeaderKeysEnum["RETRY_AFTER"] = "Retry-After";
    HttpResponseHeaderKeysEnum["IDEMPOTENCY_KEY"] = "Idempotency-Key";
    HttpResponseHeaderKeysEnum["IDEMPOTENCY_REPLAY"] = "Idempotency-Replay";
    HttpResponseHeaderKeysEnum["LINK"] = "Link";
})(HttpResponseHeaderKeysEnum = exports.HttpResponseHeaderKeysEnum || (exports.HttpResponseHeaderKeysEnum = {}));
//# sourceMappingURL=headers.types.js.map