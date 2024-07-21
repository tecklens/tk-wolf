"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatProviders = void 0;
const credentials_1 = require("../credentials");
const provider_enum_1 = require("../provider.enum");
const entities_1 = require("../../../entities");
exports.chatProviders = [
    {
        id: provider_enum_1.ChatProviderIdEnum.Slack,
        displayName: 'Slack',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: credentials_1.slackConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/chat/slack${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'slack.svg', dark: 'slack.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.Discord,
        displayName: 'Discord',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: [],
        docReference: `https://docs.wolf.co/channels-and-providers/chat/discord${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'discord.svg', dark: 'discord.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.GrafanaOnCall,
        displayName: 'Grafana On Call Webhook',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: credentials_1.grafanaOnCallConfig,
        docReference: 'https://grafana.com/docs/oncall/latest/integrations/webhook/',
        logoFileName: { light: 'grafana-on-call.png', dark: 'grafana-on-call.png' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.MsTeams,
        displayName: 'MSTeams',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: [],
        docReference: `https://docs.wolf.co/channels-and-providers/chat/ms-teams${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'msteams.svg', dark: 'msteams.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.Mattermost,
        displayName: 'Mattermost',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: [],
        docReference: 'https://developers.mattermost.com/integrate/webhooks/incoming/',
        logoFileName: { light: 'mattermost.svg', dark: 'mattermost.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.Ryver,
        displayName: 'Ryver',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: [],
        docReference: 'https://api.ryver.com/ryvrest_api_examples.html#create-chat-message',
        logoFileName: { light: 'ryver.png', dark: 'ryver.png' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.Zulip,
        displayName: 'Zulip',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: [],
        docReference: `https://docs.wolf.co/channels-and-providers/chat/zulip${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'zulip.svg', dark: 'zulip.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.GetStream,
        displayName: 'GetStream',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: credentials_1.getstreamConfig,
        docReference: 'https://getstream.io/chat/docs/node/?language=javascript',
        logoFileName: { light: 'getstream.svg', dark: 'getstream.svg' },
    },
    {
        id: provider_enum_1.ChatProviderIdEnum.RocketChat,
        displayName: 'Rocket.Chat',
        channel: entities_1.ChannelTypeEnum.CHAT,
        credentials: credentials_1.rocketChatConfig,
        docReference: 'https://developer.rocket.chat/reference/api/rest-api/endpoints',
        logoFileName: { light: 'rocket-chat.svg', dark: 'rocket-chat.svg' },
    },
];
//# sourceMappingURL=chat.js.map