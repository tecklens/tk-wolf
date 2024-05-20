import { wolfInAppConfig } from '../credentials';

import { InAppProviderIdEnum } from '../provider.enum';
import { IProviderConfig } from '../provider.interface';

import { UTM_CAMPAIGN_QUERY_PARAM } from '../../../ui';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export const inAppProviders: IProviderConfig[] = [
  {
    id: InAppProviderIdEnum.wolf,
    displayName: 'wolf In-App',
    channel: ChannelTypeEnum.IN_APP,
    credentials: wolfInAppConfig,
    docReference: `https://docs.wolf.co/notification-center/introduction${UTM_CAMPAIGN_QUERY_PARAM}`,
    logoFileName: { light: 'wolf.png', dark: 'wolf.png' },
  },
];
