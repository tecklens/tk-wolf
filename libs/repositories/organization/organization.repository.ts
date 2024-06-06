import { OrganizationDBModel, OrganizationEntity } from './organization.entity';
import { Organization } from './organization.schema';
import { BaseRepository } from '@libs/repositories/base-repository';
import { MemberEntity, MemberRepository } from '@libs/repositories/member';

export class OrganizationRepository extends BaseRepository<
  OrganizationDBModel,
  OrganizationEntity,
  object
> {
  private memberRepository = new MemberRepository();
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

  async findUserActiveOrganizations(
    userId: string,
  ): Promise<{ organizations: OrganizationEntity[]; members: MemberEntity[] }> {
    const members = await this.getUsersMembersOrganizationIds(userId);

    return {
      organizations: await this.find({
        _id: { $in: members.map((member) => member._organizationId) },
      }),
      members: members,
    };
  }

  async findUserOrganizations(userId: string): Promise<OrganizationEntity[]> {
    const members = await this.getUsersMembersOrganizationIds(userId);

    return await this.find({
      _id: { $in: members.map((member) => member._organizationId) },
    });
  }

  private async getUsersMembersOrganizationIds(
    userId: string,
  ): Promise<MemberEntity[]> {
    return await this.memberRepository.findUserActiveMembers(userId);
  }
}
