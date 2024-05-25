import { EnvironmentId, OrganizationId } from '@libs/shared/types';

export class CreateNotiDto {
  title: string;
  description: string;

  userId: string;
  environmentId: EnvironmentId;
  organizationId: OrganizationId;
}
