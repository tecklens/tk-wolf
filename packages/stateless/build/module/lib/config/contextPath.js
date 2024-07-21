export var WolfComponentEnum;
(function (WolfComponentEnum) {
    WolfComponentEnum[WolfComponentEnum["WEB"] = 0] = "WEB";
    WolfComponentEnum[WolfComponentEnum["API"] = 1] = "API";
    WolfComponentEnum[WolfComponentEnum["WIDGET"] = 2] = "WIDGET";
    WolfComponentEnum[WolfComponentEnum["WS"] = 3] = "WS";
})(WolfComponentEnum || (WolfComponentEnum = {}));
export function getContextPath(component) {
    let contextPath = '';
    const env = typeof process !== 'undefined' && process?.env
        ? process?.env
        : window._env_;
    if (!env) {
        return contextPath;
    }
    if (env.GLOBAL_CONTEXT_PATH) {
        contextPath += env.GLOBAL_CONTEXT_PATH + '/';
    }
    switch (component) {
        case WolfComponentEnum.API:
            if (env.API_CONTEXT_PATH) {
                contextPath += env.API_CONTEXT_PATH + '/';
            }
            break;
        case WolfComponentEnum.WEB:
            if (env.FRONT_BASE_CONTEXT_PATH) {
                contextPath += env.FRONT_BASE_CONTEXT_PATH + '/';
            }
            break;
        case WolfComponentEnum.WIDGET:
            if (env.WIDGET_CONTEXT_PATH) {
                contextPath += env.WIDGET_CONTEXT_PATH + '/';
            }
            break;
        case WolfComponentEnum.WS:
            if (env.WS_CONTEXT_PATH) {
                contextPath += env.WS_CONTEXT_PATH + '/';
            }
            break;
    }
    return contextPath;
}
//# sourceMappingURL=contextPath.js.map