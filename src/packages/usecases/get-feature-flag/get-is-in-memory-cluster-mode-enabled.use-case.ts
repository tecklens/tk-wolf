import { Injectable } from '@nestjs/common';

import { GetSystemCriticalFlag } from './get-system-critical-flag.use-case';
import { SystemCriticalFlagsEnum } from '@config/system-critical-flags.enum';

@Injectable()
export class GetIsInMemoryClusterModeEnabled extends GetSystemCriticalFlag {
  execute(): boolean {
    const value = process.env.IS_IN_MEMORY_CLUSTER_MODE_ENABLED
      ? process.env.IS_IN_MEMORY_CLUSTER_MODE_ENABLED
      : process.env.IN_MEMORY_CLUSTER_MODE_ENABLED;
    const fallbackValue = false;
    const defaultValue = this.prepareBooleanStringSystemCriticalFlag(
      value,
      fallbackValue,
    );
    const key = SystemCriticalFlagsEnum.IS_IN_MEMORY_CLUSTER_MODE_ENABLED;

    this.log<boolean>(key, defaultValue);

    return defaultValue;
  }
}
