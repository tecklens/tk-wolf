import { EnvironmentId, OrganizationId } from '../../types';

export class CreateNotiDto {
  title: string;
  description: string;

  userId: string;
  environmentId: EnvironmentId;
  organizationId: OrganizationId;
}
