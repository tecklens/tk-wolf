import type {
  OrganizationId,
  EnvironmentId,
} from '@tps/organization.interface';

export type EnforceOrgId = { _organizationId: OrganizationId };
export type EnforceEnvId = { _environmentId: EnvironmentId };
export type EnforceEnvOrOrgIds = EnforceEnvId | EnforceOrgId;
