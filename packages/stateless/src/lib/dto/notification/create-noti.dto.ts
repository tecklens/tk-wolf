import { EnvironmentId, OrganizationId } from '@stateless/lib/types';

export class CreateNotiDto {
  title: string;
  description: string;

  userId: string;
  environmentId: EnvironmentId;
  organizationId: OrganizationId;
}
