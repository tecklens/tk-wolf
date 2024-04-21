import { OrganizationDBModel, OrganizationEntity } from './organization.entity';
import { Organization } from './organization.schema';
import { BaseRepository } from '@libs/repositories/base-repository';

export class OrganizationRepository extends BaseRepository<
  OrganizationDBModel,
  OrganizationEntity,
  object
> {
  constructor() {
    super(Organization, OrganizationEntity);
  }

  async findById(
    id: string,
    select?: string,
  ): Promise<OrganizationEntity | null> {
    const data = await this.MongooseModel.findById(id, select).read(
      'secondaryPreferred',
    );
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async updateBrandingDetails(
    organizationId: string,
    branding: { color: string; logo: string },
  ) {
    return this.update(
      {
        _id: organizationId,
      },
      {
        $set: {
          branding,
        },
      },
    );
  }

  async renameOrganization(organizationId: string, payload: { name: string }) {
    return this.update(
      {
        _id: organizationId,
      },
      {
        $set: {
          name: payload.name,
        },
      },
    );
  }
}
