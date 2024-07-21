import { EnvironmentId, OrganizationId } from '../../types';
export declare class CreateNotiDto {
    title: string;
    description: string;
    userId: string;
    environmentId: EnvironmentId;
    organizationId: OrganizationId;
}
