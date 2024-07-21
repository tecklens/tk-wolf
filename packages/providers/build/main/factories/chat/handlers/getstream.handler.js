"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetstreamChatHandler = void 0;
const stateless_1 = require("@wolf/stateless");
const base_handler_1 = require("./base.handler");
const getstream_1 = require("@wolf/getstream");
class GetstreamChatHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('getstream', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
        };
        this.provider = new getstream_1.GetstreamChatProvider(config);
    }
}
exports.GetstreamChatHandler = GetstreamChatHandler;
//# sourceMappingURL=getstream.handler.js.map