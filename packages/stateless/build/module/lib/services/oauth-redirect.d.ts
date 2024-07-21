export declare const buildOauthRedirectUrl: (request: {
    user: {
        token: string;
        newUser: any;
    };
    query: {
        state: string;
    };
}) => string;
export declare const buildGoogleOauthRedirectUrl: (request: {
    user: {
        email: string;
        newUser: boolean;
        token: string;
        inviteToken: string;
    };
    query: {
        code: string;
        scope: string;
        authuser: string;
    };
}) => string;
