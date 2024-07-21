import { BaseRepository } from '../base-repository';
import { BrandDBModel, BrandEntity } from './brand.entity';
import { Brand } from './brand.schema';
import { OrganizationId, UserId } from '@wolfxlabs/stateless';

export class BrandRepository extends BaseRepository<
  BrandDBModel,
  BrandEntity,
  object
> {
  constructor() {
    super(Brand, BrandEntity);
  }

  async findById(id: string, select?: string): Promise<BrandEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByOrgId(
    userId: UserId,
    organizationId: OrganizationId,
    select?: string,
  ): Promise<BrandEntity> {
    return await this.findOne(
      {
        _userId: userId,
        _organizationId: organizationId,
      },
      select,
    );
  }
}
