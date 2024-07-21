import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
import { MandrillProvider } from '@wolfxlabs/mandrill';
import { BaseHandler } from './base.handler';

export class MandrillHandler extends BaseHandler {
  constructor() {
    super('mandrill', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: { apiKey: string; from: string; senderName: string } = {
      from: from as string,
      apiKey: credentials.apiKey as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new MandrillProvider(config);
  }
}
