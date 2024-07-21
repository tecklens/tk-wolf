import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { TelegramProvider } from '@wolfxlabs/telegram';
import { BaseChatHandler } from './base.handler';
export class TelegramHandler extends BaseChatHandler {
    constructor() {
        super('telegram', ChannelTypeEnum.CHAT);
    }
    buildProvider(_) {
        this.provider = new TelegramProvider();
    }
}
//# sourceMappingURL=telegram.handler.js.map