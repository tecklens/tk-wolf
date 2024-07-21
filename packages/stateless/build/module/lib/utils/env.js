const hasCloudflareProxyContext = (context) => {
    return !!context?.cloudflare?.env;
};
const hasCloudflareContext = (context) => {
    return !!context?.env;
};
export const getEnvVariable = (name, context) => {
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
//# sourceMappingURL=env.js.map