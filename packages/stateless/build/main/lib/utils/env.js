"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVariable = void 0;
const hasCloudflareProxyContext = (context) => {
    return !!context?.cloudflare?.env;
};
const hasCloudflareContext = (context) => {
    return !!context?.env;
};
const getEnvVariable = (name, context) => {
    if (typeof process !== 'undefined' &&
        process.env &&
        typeof process.env[name] === 'string') {
        return process.env[name];
    }
    if (hasCloudflareProxyContext(context)) {
        return context.cloudflare.env[name] || '';
    }
    if (hasCloudflareContext(context)) {
        return context.env[name] || '';
    }
    if (context && typeof context[name] === 'string') {
        return context[name];
    }
    try {
        return globalThis[name];
    }
    catch (_) {
    }
    return '';
};
exports.getEnvVariable = getEnvVariable;
//# sourceMappingURL=env.js.map