"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGoogleOauthRedirectUrl = exports.buildOauthRedirectUrl = void 0;
const common_1 = require("@nestjs/common");
const buildOauthRedirectUrl = (request) => {
    let url = process.env.FRONT_BASE_URL + '/sign-in';
    if (!request.user || !request.user.token) {
        return `${url}?error=AuthenticationError`;
    }
    const redirectUrl = JSON.parse(request.query.state).redirectUrl;
    if (redirectUrl &&
        redirectUrl.startsWith('http://localhost:') &&
        !redirectUrl.includes('@')) {
        url = redirectUrl;
    }
    url += `?token=${request.user.token}`;
    if (request.user.newUser) {
        url += '&newUser=true';
    }
    const partnerCode = JSON.parse(request.query.state).partnerCode;
    if (partnerCode) {
        url += `&code=${partnerCode}`;
    }
    const next = JSON.parse(request.query.state).next;
    if (next) {
        url += `&next=${next}`;
    }
    const configurationId = JSON.parse(request.query.state).configurationId;
    if (configurationId) {
        url += `&configurationId=${configurationId}`;
    }
    const inviteToken = JSON.parse(request.query.state).inviteToken;
    if (inviteToken) {
        url += `&inviteToken=${inviteToken}`;
    }
    return url;
};
exports.buildOauthRedirectUrl = buildOauthRedirectUrl;
const buildGoogleOauthRedirectUrl = (request) => {
    if (!request.user) {
        throw new common_1.NotFoundException('No user from google');
    }
    console.log('request', request);
    let url = process.env.FRONT_BASE_URL + '/sign-in';
    if (!request.user || !request.user.token) {
        return `${url}?error=AuthenticationError`;
    }
    url += `?token=${request.user.token}`;
    if (request.user.newUser) {
        url += '&newUser=true';
    }
    return url;
};
exports.buildGoogleOauthRedirectUrl = buildGoogleOauthRedirectUrl;
//# sourceMappingURL=oauth-redirect.js.map