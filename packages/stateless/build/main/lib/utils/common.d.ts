import { IVariable, UserPlan } from '@stateless/lib/entities';
export declare function makeid(length: number): string;
export declare function transformContent(variables: IVariable[], content: string, payload: any): string;
export declare function getDateDataTimeout(plan: UserPlan): Date;
