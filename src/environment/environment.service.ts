import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  EnvironmentEntity,
  EnvironmentRepository,
  IApiKey,
} from '@libs/repositories/environment';
import { createHash } from 'crypto';
import hat from 'hat';
import { v4 as uuidv4 } from 'uuid';
import { ApiException } from '@pak/utils/exceptions';
import { IJwtPayload } from '@libs/shared/types';
import {
  decryptApiKey,
  encryptApiKey,
} from '@libs/shared/encryptions/encrypt-provider';
import { CreateEnvironmentRequestDto } from '@app/environment/dtos/create-environment-request.dto';

const API_KEY_GENERATION_MAX_RETRIES = 5;

@Injectable()
export class EnvironmentService {
  constructor(private environmentRepository: EnvironmentRepository) {}

  async createEnvironment(
    user: IJwtPayload,
    d: CreateEnvironmentRequestDto,
    parentEnvironmentId: string,
  ): Promise<EnvironmentEntity> {
    const key = await this.generateUniqueApiKey();
    const encryptedApiKey = encryptApiKey(key);
    const hashedApiKey = createHash('sha256').update(key).digest('hex');

    const environment = await this.environmentRepository.create({
      _organizationId: user.organizationId,
      name: d.name,
      identifier: uuidv4(),
      _parentId: parentEnvironmentId,
      apiKeys: [
        {
          key: encryptedApiKey,
          _userId: user._id,
          hash: hashedApiKey,
        },
      ],
    });

    if (!parentEnvironmentId) {
      // await this.createNotificationGroup.execute(
      //   CreateNotificationGroupCommand.create({
      //     organizationId: command.organizationId,
      //     environmentId: environment._id,
      //     userId: command.userId,
      //     name: 'General',
      //   }),
      // );
      // await this.createDefaultLayoutUsecase.execute(
      //   CreateDefaultLayoutCommand.create({
      //     organizationId: command.organizationId,
      //     environmentId: environment._id,
      //     userId: command.userId,
      //   }),
      // );
    }

    return environment;
  }

  async getMeEnvironment(user: IJwtPayload) {
    const environment: Omit<EnvironmentEntity, 'apiKeys'> | null =
      await this.environmentRepository.findOne(
        {
          _id: user.environmentId,
          _organizationId: user.organizationId,
        },
        '-apiKeys',
      );

    if (!environment)
      throw new NotFoundException(
        `Environment ${user.environmentId} not found`,
      );

    return environment;
  }

  async getApiKey(user: IJwtPayload) {
    const keys = await this.environmentRepository.getApiKeys(
      user.environmentId,
    );

    return keys.map((apiKey: IApiKey) => {
      return {
        key: decryptApiKey(apiKey.key),
        _userId: apiKey._userId,
      };
    });
  }

  async regenerateUniqueApiKey(user: IJwtPayload) {
    const environment = await this.environmentRepository.findOne({
      _id: user.environmentId,
    });

    if (!environment) {
      throw new ApiException(`Environment id: ${user.environmentId} not found`);
    }

    const key = await this.generateUniqueApiKey();
    const encryptedApiKey = encryptApiKey(key);
    const hashedApiKey = createHash('sha256').update(key).digest('hex');

    const environments = await this.environmentRepository.updateApiKey(
      user.environmentId,
      encryptedApiKey,
      user._id,
      hashedApiKey,
    );

    return environments.map((item) => {
      return {
        _userId: item._userId,
        key: decryptApiKey(item.key),
      };
    });
  }

  async generateUniqueApiKey() {
    let apiKey = '';
    let count = 0;
    let isApiKeyUsed = true;
    while (isApiKeyUsed) {
      apiKey = this.generateApiKey();
      isApiKeyUsed = await this.validateIsApiKeyUsed(apiKey);
      count += 1;

      if (count === API_KEY_GENERATION_MAX_RETRIES) {
        const errorMessage = 'Clashing of the API key generation';
        throw new InternalServerErrorException(
          new Error(errorMessage),
          errorMessage,
        );
      }
    }

    return apiKey as string;
  }

  private async validateIsApiKeyUsed(apiKey: string) {
    const hashedApiKey = createHash('sha256').update(apiKey).digest('hex');

    const environment = await this.environmentRepository.findByApiKey({
      key: apiKey,
      hash: hashedApiKey,
    });

    return !!environment;
  }

  /**
   * Extracting the generation functionality so it can be stubbed for functional testing
   *
   * @requires hat
   * @todo Dependency is no longer accessible to source code due of removal from GitHub. Consider look for an alternative.
   */
  private generateApiKey(): string {
    return hat();
  }
}
