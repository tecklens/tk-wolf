import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  CHANNELS_WITH_PRIMARY,
  IJwtPayload,
  OrganizationId,
} from '@libs/shared/types';
import { CreateProviderRequestDto } from '@app/provider/dtos/create-provider-request.dto';
import { ApiException } from '@pak/utils/exceptions';
import { DbException } from '@libs/shared/exceptions/db.exception';
import { InAppProviderIdEnum, providers } from '@libs/shared/consts';
import { EmailProviderIdEnum, SmsProviderIdEnum } from '@novu/node';
import {
  IntegrationQuery,
  ProviderEntity,
  ProviderRepository,
} from '@libs/repositories/provider';
import slugify from 'slugify';
import { MailFactory } from '@app/provider/factories';
import { ICredentials } from '@libs/shared/entities/integration';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import {
  decryptCredentials,
  encryptCredentials,
} from '@libs/shared/encryptions/encrypt-provider';
import * as shortid from 'shortid';
import { ProviderId } from '@libs/repositories/provider/types';
import { GetProviderRequestDto } from '@app/provider/dtos/get-provider-request.dto';
import { CacheKey } from "@nestjs/cache-manager";

@Injectable()
export class ProviderService {
  constructor(private readonly providerRepository: ProviderRepository) {}

  async getListProvider(u: IJwtPayload, payload: GetProviderRequestDto) {
    const query: Partial<ProviderEntity> & { _organizationId: string } = {
      _organizationId: u.organizationId,
      _environmentId: u.environmentId,
    };

    if (payload.active) {
      query.active = payload.active;
    }

    if (payload.channel) {
      query.channel = payload.channel;
    }

    if (payload.providerId) {
      query.providerId = payload.providerId;
    }

    const foundIntegrations = payload.findOne
      ? [await this.providerRepository.findOne(query)]
      : await this.providerRepository.find(query);

    return foundIntegrations
      .filter((p) => p)
      .map((p: ProviderEntity) => this.getDecryptedCredentials(p));
  }

  async createProvider(u: IJwtPayload, payload: CreateProviderRequestDto) {
    await this.validate(
      u.environmentId,
      u.organizationId,
      payload.providerId,
      payload.channel,
      payload.identifier,
    );

    // this.analyticsService.track('Create Integration - [Integrations]', u._id, {
    //   providerId: payload.providerId,
    //   channel: payload.channel,
    //   _organization: u.organizationId,
    // });

    try {
      if (payload.check) {
        await this.checkProvider(
          payload.channel,
          payload.credentials,
          payload.providerId,
        );
      }

      // await this.invalidateCache.invalidateQuery({
      //   key: buildIntegrationKey().invalidate({
      //     _organizationId: u.organizationId,
      //   }),
      // });
      const providerIdCapitalized = `${payload.providerId.charAt(0).toUpperCase()}${payload.providerId.slice(1)}`;
      const defaultName =
        providers.find((provider) => provider.id === payload.providerId)
          ?.displayName ?? providerIdCapitalized;
      const name = payload.name ?? defaultName;
      const identifier =
        payload.identifier ??
        `${slugify(name, { lower: true, strict: true })}-${shortid.generate()}`;

      const query: IntegrationQuery = {
        name,
        identifier,
        _environmentId: payload._environmentId ?? u.environmentId,
        _organizationId: u.organizationId,
        providerId: payload.providerId,
        channel: payload.channel,
        credentials: encryptCredentials(payload.credentials ?? {}),
        active: payload.active,
        conditions: payload.conditions,
      };

      const isActiveAndChannelSupportsPrimary =
        payload.active && CHANNELS_WITH_PRIMARY.includes(payload.channel);

      if (isActiveAndChannelSupportsPrimary) {
        const { primary, priority } = await this.calculatePriorityAndPrimary(
          u.environmentId,
          u.organizationId,
          payload.channel,
        );

        query.primary = primary;
        query.priority = priority;
      }

      return await this.providerRepository.create(query);
    } catch (e) {
      if (e instanceof DbException) {
        throw new ApiException(e.message);
      }
      throw e;
    }
  }

  async updateProvider(
    u: IJwtPayload,
    id: string,
    payload: CreateProviderRequestDto,
  ) {
    // this.analyticsService.track('Create Integration - [Integrations]', u._id, {
    //   providerId: payload.providerId,
    //   channel: payload.channel,
    //   _organization: u.organizationId,
    // });

    try {
      if (payload.check) {
        await this.checkProvider(
          payload.channel,
          payload.credentials,
          payload.providerId,
        );
      }

      // await this.invalidateCache.invalidateQuery({
      //   key: buildIntegrationKey().invalidate({
      //     _organizationId: u.organizationId,
      //   }),
      // });
      const providerIdCapitalized = `${payload.providerId.charAt(0).toUpperCase()}${payload.providerId.slice(1)}`;
      const defaultName =
        providers.find((provider) => provider.id === payload.providerId)
          ?.displayName ?? providerIdCapitalized;
      const name = payload.name ?? defaultName;
      const query: IntegrationQuery = {
        name,
        _environmentId: payload._environmentId ?? u.environmentId,
        _organizationId: u.organizationId,
        providerId: payload.providerId,
        channel: payload.channel,
        credentials: encryptCredentials(payload.credentials ?? {}),
        active: payload.active,
        conditions: payload.conditions,
      };

      const isActiveAndChannelSupportsPrimary =
        payload.active && CHANNELS_WITH_PRIMARY.includes(payload.channel);

      if (isActiveAndChannelSupportsPrimary) {
        const { primary, priority } = await this.calculatePriorityAndPrimary(
          u.environmentId,
          u.organizationId,
          payload.channel,
        );

        query.primary = primary;
        query.priority = priority;
      }

      await this.providerRepository.updateOne(
        {
          _environmentId: u.environmentId,
          _organizationId: u.organizationId,
          _id: id,
        },
        query,
      );
    } catch (e) {
      if (e instanceof DbException) {
        throw new ApiException(e.message);
      }
      throw e;
    }
  }

  @CacheKey('provider:connected')
  async getConnectedProvider(user: IJwtPayload) {
    const providers = await this.providerRepository.find(
      {
        _environmentId: user.environmentId,
        _organizationId: user.organizationId,
      },
      'providerId',
    );

    return providers.map((e) => e.providerId);
  }

  private getDecryptedCredentials(integration: ProviderEntity) {
    integration.credentials = decryptCredentials(integration.credentials);

    return integration;
  }
  private async calculatePriorityAndPrimary(
    environmentId: string,
    organizationId: string,
    channel: ChannelTypeEnum,
  ) {
    const result: { primary: boolean; priority: number } = {
      primary: false,
      priority: 0,
    };

    const highestPriorityIntegration =
      await this.providerRepository.findHighestPriorityIntegration({
        _organizationId: organizationId,
        _environmentId: environmentId,
        channel: channel,
      });

    if (highestPriorityIntegration?.primary) {
      result.priority = highestPriorityIntegration.priority;
      await this.providerRepository.update(
        {
          _id: highestPriorityIntegration._id,
          _organizationId: organizationId,
          _environmentId: environmentId,
        },
        {
          $set: {
            priority: highestPriorityIntegration.priority + 1,
          },
        },
      );
    } else {
      result.priority = highestPriorityIntegration
        ? highestPriorityIntegration.priority + 1
        : 1;
    }

    return result;
  }

  private async validate(
    environmentId: string,
    organizationId: string,
    providerId: string,
    channel: ChannelTypeEnum,
    identifier: string,
  ): Promise<void> {
    const existingIntegration = await this.providerRepository.findOne({
      _environmentId: environmentId,
      providerId: providerId,
      channel: channel,
    });

    if (
      existingIntegration &&
      providerId === InAppProviderIdEnum.Novu &&
      channel === ChannelTypeEnum.IN_APP
    ) {
      throw new BadRequestException(
        'One environment can only have one In app provider',
      );
    }

    if (
      providerId === SmsProviderIdEnum.Novu ||
      providerId === EmailProviderIdEnum.Novu
    ) {
      const count = await this.providerRepository.count({
        _environmentId: environmentId,
        providerId: providerId,
        channel: channel,
      });

      if (count > 0) {
        throw new ConflictException(
          `Integration with wolf provider for ${channel.toLowerCase()} channel already exists`,
        );
      }
    }

    if (identifier) {
      const existingIntegrationWithIdentifier =
        await this.providerRepository.findOne({
          _organizationId: organizationId,
          identifier: identifier,
        });

      if (existingIntegrationWithIdentifier) {
        throw new ConflictException(
          'Integration with identifier already exists',
        );
      }
    }
  }

  private async checkProvider(
    channel: ChannelTypeEnum,
    credentials: ICredentials,
    providerId: string,
  ) {
    try {
      switch (channel) {
        case ChannelTypeEnum.EMAIL:
          return await this.checkProviderEmail(
            channel,
            credentials,
            providerId,
          );
      }
    } catch (e) {
      if (e.message?.includes('getaddrinfo ENOTFOUND')) {
        throw new BadRequestException(
          `Provider gateway can't resolve the host with the given hostname ${credentials?.host || ''}`,
        );
      }

      throw e;
    }
  }

  private async checkProviderEmail(
    channel: ChannelTypeEnum,
    credentials: ICredentials,
    providerId: string,
  ) {
    const mailFactory = new MailFactory();
    const mailHandler = mailFactory.getHandler(
      {
        channel: channel,
        credentials: credentials ?? {},
        providerId: providerId,
      },
      credentials?.from,
    );

    return await mailHandler.check();
  }
}
