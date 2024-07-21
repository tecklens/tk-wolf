import { EnvironmentId, OrganizationId } from '@stateless/lib/types';
export declare class CreateNotiDto {
    title: string;
    description: string;
    userId: string;
    environmentId: EnvironmentId;
    organizationId: OrganizationId;
}
