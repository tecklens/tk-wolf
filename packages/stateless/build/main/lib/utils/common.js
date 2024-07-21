"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateDataTimeout = exports.transformContent = exports.makeid = void 0;
const entities_1 = require("@stateless/lib/entities");
const lodash_1 = require("lodash");
function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
exports.makeid = makeid;
function transformContent(variables, content, payload) {
    const regex = /{{[a-zA-Z_]{1,50}}}/g;
    const varInContent = content.match(regex);
    let result = content;
    if (!varInContent || varInContent.length <= 0)
        return content;
    for (const s of varInContent) {
        const varname = s.replace('{{', '').replace('}}', '');
        const defineVar = (0, lodash_1.find)(variables, (e) => e.name === varname);
        if (defineVar) {
            const payloadVar = (0, lodash_1.get)(payload, varname);
            if (payloadVar) {
                result = result.replace(s, payloadVar);
            }
            else if (defineVar.defaultValue) {
                result = result.replace(s, defineVar.defaultValue);
            }
        }
    }
    return result;
}
exports.transformContent = transformContent;
function getDateDataTimeout(plan) {
    let secondsTimeout = 0;
    if (plan == entities_1.UserPlan.free)
        secondsTimeout = 7 * 24 * 60 * 60;
    else if (plan == entities_1.UserPlan.silver)
        secondsTimeout = 7 * 24 * 60 * 60;
    else if (plan == entities_1.UserPlan.gold)
        secondsTimeout = 30 * 24 * 60 * 60;
    else if (plan == entities_1.UserPlan.diamond)
        secondsTimeout = 60 * 24 * 60 * 60;
    const now = new Date();
    return new Date(now.getTime() + secondsTimeout * 1000);
}
exports.getDateDataTimeout = getDateDataTimeout;
//# sourceMappingURL=common.js.map