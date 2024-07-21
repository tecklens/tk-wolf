import { UserPlan } from '../../entities';
export interface IJwtPayload {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
    organizationId: string;
    environmentId: string;
    roles: string[];
    exp: number;
    plan: UserPlan;
}
export declare enum ApiAuthSchemeEnum {
    BEARER = "Bearer",
    API_KEY = "ApiKey"
}
export declare enum PassportStrategyEnum {
    JWT = "jwt",
    HEADER_API_KEY = "apikey",
    GITHUB = "github",
    GOOGLE = "google",
    LOCAL = "local"
}
