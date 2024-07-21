import { MemberRoleEnum } from '../entities';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: MemberRoleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
