import { FilterQuery } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { NOVU_PROVIDERS } from '@novu/shared';

import { ProviderDBModel, ProviderEntity } from './provider.entity';
import { Provider } from './provider.schema';
import type { EnforceEnvOrOrgIds } from '@tps/enforce';

import { BaseRepository } from '../base-repository';

export type IntegrationQuery = FilterQuery<ProviderDBModel> &
  EnforceEnvOrOrgIds;

export class ProviderRepository extends BaseRepository<
  ProviderDBModel,
  ProviderEntity,
  EnforceEnvOrOrgIds
> {
  private provider: SoftDeleteModel<any>;
  constructor() {
    super(Provider, ProviderEntity);
    // @ts-ignore
    this.provider = Provider;
  }

  async findById(id: string, select?: string): Promise<ProviderEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async find(
    query: IntegrationQuery,
    select = '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: { limit?: number; sort?: any; skip?: number } = {},
  ): Promise<ProviderEntity[]> {
    return super.find(query, select, options);
  }

  async findByEnvironmentId(environmentId: string): Promise<ProviderEntity[]> {
    return await this.find({
      _environmentId: environmentId,
    });
  }

  async findHighestPriorityIntegration({
    _organizationId,
    _environmentId,
    channel,
  }: Pick<ProviderEntity, '_environmentId' | '_organizationId' | 'channel'>) {
    return await this.findOne(
      {
        _organizationId,
        _environmentId,
        channel,
        active: true,
      },
      undefined,
      { query: { sort: { priority: -1 } } },
    );
  }

  async countActiveExcludingNovu({
    _organizationId,
    _environmentId,
    channel,
  }: Pick<ProviderEntity, '_environmentId' | '_organizationId' | 'channel'>) {
    return await this.count({
      _organizationId,
      _environmentId,
      channel,
      active: true,
      providerId: {
        $nin: NOVU_PROVIDERS,
      },
    });
  }

  async create(data: IntegrationQuery): Promise<ProviderEntity> {
    return await super.create(data);
  }

  // async deleteProvider(query: IntegrationQuery) {
  //   const integration = await this.findOne({
  //     _id: query._id,
  //     _organizationId: query._organizationId,
  //   });
  //   if (!integration)
  //     throw new DbException(`Could not find integration with id ${query._id}`);
  //
  //   return await this.provider.delete({
  //     _id: integration._id,
  //     _organizationId: integration._organizationId,
  //   });
  // }

  // async deleteMany(query: IntegrationQuery): Promise<IDeleteResult> {
  //   const { _environmentId, _organizationId } = query || {};
  //   if (!_environmentId || !_organizationId) {
  //     throw new DalException(
  //       'Deletion operation blocked for missing any of these properties: [_environmentId, _organizationId]. We are avoiding a potential unexpected multiple deletion'
  //     );
  //   }
  //
  //   const { acknowledged, modifiedCount, matchedCount } = await this.integration.delete(query);
  //
  //   if (matchedCount === 0 || modifiedCount === 0) {
  //     throw new DalException(
  //       `Deletion of many integrations in environment ${_environmentId} and organization ${_organizationId}  was not performed properly`
  //     );
  //   }
  //
  //   return {
  //     modifiedCount,
  //     matchedCount,
  //   };
  // }

  async findDeleted(query: IntegrationQuery): Promise<ProviderEntity> {
    const res: ProviderEntity[] = await this.provider.findDeleted(query);

    return this.mapEntity(res);
  }

  async recalculatePriorityForAllActive({
    _id,
    _organizationId,
    _environmentId,
    channel,
  }: Pick<ProviderEntity, '_environmentId' | '_organizationId' | 'channel'> & {
    _id?: string;
    exclude?: boolean;
  }) {
    const otherActiveIntegrations = await this.find(
      {
        _organizationId,
        _environmentId,
        channel,
        active: true,
        ...(_id && {
          _id: {
            $nin: [_id],
          },
        }),
      },
      '_id',
      { sort: { priority: -1 } },
    );

    let ids = otherActiveIntegrations.map((integration) => integration._id);
    if (_id) {
      ids = [
        _id,
        ...otherActiveIntegrations.map((integration) => integration._id),
      ];
    }

    const promises = ids.map((id, index) =>
      this.update(
        {
          _id: id,
          _organizationId,
          _environmentId,
        },
        {
          $set: {
            priority: ids.length - index,
          },
        },
      ),
    );
    await Promise.all(promises);
  }
}
