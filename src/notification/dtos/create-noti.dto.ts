import { EnvironmentId, OrganizationId } from '@wolf/stateless';

export class CreateNotiDto {
  title: string;
  description: string;

  userId: string;
  environmentId: EnvironmentId;
  organizationId: OrganizationId;
}
