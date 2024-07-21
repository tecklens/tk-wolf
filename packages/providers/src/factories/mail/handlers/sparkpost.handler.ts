import { SparkPostEmailProvider } from '@wolfxlabs/sparkpost';

import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
export class SparkPostHandler extends BaseHandler {
  constructor() {
    super('sparkpost', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config = {
      from: from as string,
      apiKey: credentials.apiKey as string,
      region: credentials.region as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new SparkPostEmailProvider(config);
  }
}
