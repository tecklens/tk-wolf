import { EnvironmentId, OrganizationId } from '@libs/shared/types';

export type EnforceOrgId = { _organizationId: OrganizationId };
export type EnforceEnvId = { _environmentId: EnvironmentId };
export type EnforceEnvOrOrgIds = EnforceEnvId | EnforceOrgId;
