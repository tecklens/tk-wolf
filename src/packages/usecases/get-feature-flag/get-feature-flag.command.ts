import { IsDefined } from 'class-validator';

import { EnvironmentWithUserCommand } from '@pak/commands';
import { FeatureFlagsKeysEnum } from '@config/feature-flags.enum';

export class FeatureFlagCommand extends EnvironmentWithUserCommand {}

export class GetGlobalFeatureFlagCommand<T> {
  @IsDefined()
  key: FeatureFlagsKeysEnum;

  @IsDefined()
  defaultValue: T;
}

export class GetFeatureFlagCommand<T> extends FeatureFlagCommand {
  @IsDefined()
  key: FeatureFlagsKeysEnum;

  @IsDefined()
  defaultValue: T;
}
