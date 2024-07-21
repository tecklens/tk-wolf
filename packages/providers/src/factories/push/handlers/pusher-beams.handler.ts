import { PusherBeamsPushProvider } from '@wolf/pusher-beams';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class PusherBeamsHandler extends BasePushHandler {
  constructor() {
    super('pusher-beams', ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.instanceId || !credentials.secretKey) {
      throw Error('Config is not valid for Pusher Beams');
    }

    this.provider = new PusherBeamsPushProvider({
      instanceId: credentials.instanceId,
      secretKey: credentials.secretKey,
    });
  }
}