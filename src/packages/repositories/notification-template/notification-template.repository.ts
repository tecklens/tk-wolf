import { FilterQuery } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';

import { BaseRepository } from '../base-repository';
import { NotificationTemplate } from './notification-template.schema';
import {
  NotificationTemplateDBModel,
  NotificationTemplateEntity,
} from './notification-template.entity';
import type { EnforceEnvOrOrgIds } from '@tps/enforce';
import { EnvironmentRepository } from '../environment';

type NotificationTemplateQuery = FilterQuery<NotificationTemplateDBModel> &
  EnforceEnvOrOrgIds;

export class NotificationTemplateRepository extends BaseRepository<
  NotificationTemplateDBModel,
  NotificationTemplateEntity,
  EnforceEnvOrOrgIds
> {
  private notificationTemplate: SoftDeleteModel;
  private environmentRepository = new EnvironmentRepository();

  constructor() {
    super(NotificationTemplate, NotificationTemplateEntity);
    this.notificationTemplate = NotificationTemplate;
  }

  async findByTriggerIdentifier(environmentId: string, identifier: string) {
    const requestQuery: NotificationTemplateQuery = {
      _environmentId: environmentId,
      'triggers.identifier': identifier,
    };

    const item =
      await this.MongooseModel.findOne(requestQuery).populate('steps.template');

    return this.mapEntity(item);
  }

  async findById(id: string, environmentId: string) {
    const requestQuery: NotificationTemplateQuery = {
      _id: id,
      _environmentId: environmentId,
    };

    const item =
      await this.MongooseModel.findOne(requestQuery).populate('steps.template');

    return this.mapEntity(item);
  }

  async findBlueprint(id: string) {
    if (!this.blueprintOrganizationId)
      throw new Error('Blueprint environment id was not found');

    const requestQuery: NotificationTemplateQuery = {
      _id: id,
      isBlueprint: true,
      _organizationId: this.blueprintOrganizationId,
    };

    const item = await this.MongooseModel.findOne(requestQuery)
      .populate('steps.template')
      .lean();

    return this.mapEntity(item);
  }

  async findBlueprintTemplates(
    organizationId: string,
    environmentId: string,
  ): Promise<NotificationTemplateEntity[]> {
    const _organizationId = organizationId;

    if (!_organizationId)
      throw new Error('Blueprint environment id was not found');

    const templates = await this.MongooseModel.find({
      isBlueprint: true,
      _environmentId: environmentId,
      _organizationId,
    })
      .populate('steps.template')
      .populate('notificationGroup')
      .lean();

    if (!templates) {
      return [];
    }

    return this.mapEntities(templates);
  }

  async findAllGroupedByCategory(): Promise<
    { name: string; blueprints: NotificationTemplateEntity[] }[]
  > {
    const organizationId = this.blueprintOrganizationId;

    if (!organizationId) {
      return [];
    }

    const productionEnvironmentId = (
      await this.environmentRepository.findOrganizationEnvironments(
        organizationId,
      )
    )?.find((env) => env.name === 'Production')?._id;

    if (!productionEnvironmentId) {
      throw new Error(
        `Production environment id for BLUEPRINT_CREATOR ${process.env.BLUEPRINT_CREATOR} was not found`,
      );
    }

    const requestQuery: NotificationTemplateQuery = {
      isBlueprint: true,
      _environmentId: productionEnvironmentId,
      _organizationId: organizationId,
    };

    const result = await this.MongooseModel.find(requestQuery)
      .populate('steps.template')
      .populate('notificationGroup')
      .lean();

    const items = result?.map((item) => this.mapEntity(item));

    const groupedItems = items.reduce((acc, item) => {
      const notificationGroupId = item._notificationGroupId;
      const notificationGroupName = item.notificationGroup?.name;

      if (!acc[notificationGroupId]) {
        acc[notificationGroupId] = {
          name: notificationGroupName,
          blueprints: [],
        };
      }

      acc[notificationGroupId].blueprints.push(item);

      return acc;
    }, {});

    return Object.values(groupedItems);
  }

  async getBlueprintList(skip = 0, limit = 10) {
    if (!this.blueprintOrganizationId) {
      return { totalCount: 0, data: [] };
    }

    const requestQuery: NotificationTemplateQuery = {
      isBlueprint: true,
      _organizationId: this.blueprintOrganizationId,
    };

    const totalItemsCount = await this.count(requestQuery);
    const items = await this.MongooseModel.find(requestQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'notificationGroup' });

    return { totalCount: totalItemsCount, data: this.mapEntities(items) };
  }

  async getList(
    organizationId: string,
    environmentId: string,
    skip = 0,
    limit = 10,
  ) {
    const totalItemsCount = await this.count({ _environmentId: environmentId });

    const requestQuery: NotificationTemplateQuery = {
      _environmentId: environmentId,
      _organizationId: organizationId,
    };

    const items = await this.MongooseModel.find(requestQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'notificationGroup' })
      .populate('steps.template', { type: 1 })
      .lean();

    return { totalCount: totalItemsCount, data: this.mapEntities(items) };
  }

  async getActiveList(
    organizationId: string,
    environmentId: string,
    active?: boolean,
  ) {
    const requestQuery: NotificationTemplateQuery = {
      _environmentId: environmentId,
      _organizationId: organizationId,
      active: active,
    };

    const items =
      await this.MongooseModel.find(requestQuery).populate('notificationGroup');

    return this.mapEntities(items);
  }

  async delete(query: NotificationTemplateQuery) {
    const item = await this.findOne({
      _id: query._id,
      _environmentId: query._environmentId,
    });
    if (!item)
      throw new Error(`Could not find workflow with id ${query._id}`);

    return await this.notificationTemplate.delete({
      _id: item._id,
      _environmentId: item._environmentId,
    });
  }

  async findDeleted(
    query: NotificationTemplateQuery,
  ): Promise<NotificationTemplateEntity> {
    const res: NotificationTemplateEntity =
      await this.notificationTemplate.findDeleted(query);

    return this.mapEntity(res);
  }

  private get blueprintOrganizationId(): string | undefined {
    return process.env.BLUEPRINT_CREATOR;
  }

  public static getBlueprintOrganizationId(): string | undefined {
    return process.env.BLUEPRINT_CREATOR;
  }
}
