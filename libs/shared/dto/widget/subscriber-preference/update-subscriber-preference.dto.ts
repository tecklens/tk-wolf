import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export interface IUpdateSubscriberPreferenceDto {
  channel?: IChannelPreference;

  enabled?: boolean;
}

export interface IChannelPreference {
  type: ChannelTypeEnum;

  enabled: boolean;
}
