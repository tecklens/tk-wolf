import { UserPlan } from '../entities';
import { find, get } from 'lodash';
export function makeid(length) {
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
export function transformContent(variables, content, payload) {
    const regex = /{{[a-zA-Z_]{1,50}}}/g;
    const varInContent = content.match(regex);
    let result = content;
    if (!varInContent || varInContent.length <= 0)
        return content;
    for (const s of varInContent) {
        const varname = s.replace('{{', '').replace('}}', '');
        const defineVar = find(variables, (e) => e.name === varname);
        if (defineVar) {
            const payloadVar = get(payload, varname);
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
export function getDateDataTimeout(plan) {
    let secondsTimeout = 0;
    if (plan == UserPlan.free)
        secondsTimeout = 7 * 24 * 60 * 60;
    else if (plan == UserPlan.silver)
        secondsTimeout = 7 * 24 * 60 * 60;
    else if (plan == UserPlan.gold)
        secondsTimeout = 30 * 24 * 60 * 60;
    else if (plan == UserPlan.diamond)
        secondsTimeout = 60 * 24 * 60 * 60;
    const now = new Date();
    return new Date(now.getTime() + secondsTimeout * 1000);
}
//# sourceMappingURL=common.js.map