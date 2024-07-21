"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const base_handler_1 = require("./base.handler");
const discord_1 = require("@wolfxlabs/discord");
class DiscordHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('discord', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new discord_1.DiscordProvider({});
    }
}
exports.DiscordHandler = DiscordHandler;
//# sourceMappingURL=discord.handler.js.map