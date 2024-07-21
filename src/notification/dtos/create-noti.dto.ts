import { EnvironmentId, OrganizationId } from '@wolfxlabs/stateless';

export class CreateNotiDto {
  title: string;
  description: string;

  userId: string;
  environmentId: EnvironmentId;
  organizationId: OrganizationId;
}
