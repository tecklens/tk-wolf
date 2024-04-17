import { BaseRepository } from '../base-repository';
import {
  IApiKey,
  EnvironmentEntity,
  EnvironmentDBModel,
} from './environment.entity';
import { Environment } from './environment.schema';

export class EnvironmentRepository extends BaseRepository<
  EnvironmentDBModel,
  EnvironmentEntity,
  object
> {
  constructor() {
    super(Environment, EnvironmentEntity);
  }

  async findEnvironmentByIdentifier(identifier: string) {
    const data = await this.MongooseModel.findOne({ identifier }).read(
      'secondaryPreferred',
    );
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async updateApiKeyUserId(
    organizationId: string,
    oldUserId: string,
    newUserId: string,
  ) {
    return await this.update(
      {
        _organizationId: organizationId,
        'apiKeys._userId': oldUserId,
      },
      {
        $set: {
          'apiKeys.$._userId': newUserId,
        },
      },
    );
  }

  async findOrganizationEnvironments(organizationId: string) {
    return this.find({
      _organizationId: organizationId,
    });
  }

  async addApiKey(environmentId: string, key: string, userId: string) {
    return await this.update(
      {
        _id: environmentId,
      },
      {
        $push: {
          apiKeys: {
            key,
            _userId: userId,
          },
        },
      },
    );
  }

  async findByApiKey(key: string) {
    return await this.findOne({
      'apiKeys.key': key,
    });
  }

  async getApiKeys(environmentId: string): Promise<IApiKey[]> {
    const environment = await this.findOne(
      {
        _id: environmentId,
      },
      'apiKeys',
    );
    if (!environment) return [];

    return environment.apiKeys;
  }

  async updateApiKey(environmentId: string, key: string, userId: string) {
    await this.update(
      {
        _id: environmentId,
      },
      {
        $set: {
          apiKeys: [
            {
              key,
              _userId: userId,
            },
          ],
        },
      },
    );

    return await this.getApiKeys(environmentId);
  }
}
