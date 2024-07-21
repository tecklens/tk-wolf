"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatFactory = void 0;
const slack_handler_1 = require("./handlers/slack.handler");
const discord_handler_1 = require("./handlers/discord.handler");
const msteams_handler_1 = require("./handlers/msteams.handler");
const mattermost_handler_1 = require("./handlers/mattermost.handler");
const grafana_on_call_handler_1 = require("./handlers/grafana-on-call.handler");
const ryver_handler_1 = require("./handlers/ryver.handler");
const zulip_handler_1 = require("./handlers/zulip.handler");
const getstream_handler_1 = require("./handlers/getstream.handler");
const rocket_chat_handler_1 = require("./handlers/rocket-chat.handler");
const telegram_handler_1 = require("./handlers/telegram.handler");
class ChatFactory {
    constructor() {
        this.handlers = [
            new slack_handler_1.SlackHandler(),
            new discord_handler_1.DiscordHandler(),
            new msteams_handler_1.MSTeamsHandler(),
            new mattermost_handler_1.MattermostHandler(),
            new ryver_handler_1.RyverHandler(),
            new zulip_handler_1.ZulipHandler(),
            new grafana_on_call_handler_1.GrafanaOnCallHandler(),
            new getstream_handler_1.GetstreamChatHandler(),
            new rocket_chat_handler_1.RocketChatHandler(),
            new telegram_handler_1.TelegramHandler(),
        ];
    }
    getHandler(integration) {
        const handler = this.handlers.find((handlerItem) => handlerItem.canHandle(integration.providerId, integration.channel)) ?? null;
        if (!handler)
            return null;
        handler.buildProvider(integration.credentials);
        return handler;
    }
}
exports.ChatFactory = ChatFactory;
//# sourceMappingURL=chat.factory.js.map