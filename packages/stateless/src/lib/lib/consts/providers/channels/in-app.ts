import { wolfInAppConfig } from '../credentials';

import {
  InAppProviderIdEnum,
  UTM_CAMPAIGN_QUERY_PARAM,
} from '../provider.enum';
import { ChannelTypeEnum } from '../../../entities';
import { IProviderConfig } from '../../../consts';

export const inAppProviders: IProviderConfig[] = [
  {
    id: InAppProviderIdEnum.Novu,
    displayName: 'wolf In-App',
    channel: ChannelTypeEnum.IN_APP,
    credentials: wolfInAppConfig,
    docReference: `https://docs.wolf.co/notification-center/introduction${UTM_CAMPAIGN_QUERY_PARAM}`,
    logoFileName: { light: 'wolf.png', dark: 'wolf.png' },
  },
];
