import { Injectable } from '@nestjs/common';

import { FeatureFlagCommand } from './get-feature-flag.command';
import { GetFeatureFlag } from './get-feature-flag.use-case';
import { FeatureFlagsKeysEnum } from '@config/feature-flags.enum';

@Injectable()
export class GetIsTemplateStoreEnabled extends GetFeatureFlag {
  async execute(featureFlagCommand: FeatureFlagCommand): Promise<boolean> {
    const value = process.env.IS_TEMPLATE_STORE_ENABLED;
    const fallbackValue = false;
    const defaultValue = this.prepareBooleanStringFeatureFlag(
      value,
      fallbackValue,
    );
    const key = FeatureFlagsKeysEnum.IS_TEMPLATE_STORE_ENABLED;

    const command = this.buildCommand(key, defaultValue, featureFlagCommand);

    return await this.featureFlagsService.getWithContext(command);
  }
}
