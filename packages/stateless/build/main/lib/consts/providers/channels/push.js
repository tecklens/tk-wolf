"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushProviders = void 0;
const credentials_1 = require("../credentials");
const provider_enum_1 = require("../provider.enum");
const entities_1 = require("../../../entities");
exports.pushProviders = [
    {
        id: provider_enum_1.PushProviderIdEnum.OneSignal,
        displayName: 'OneSignal',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.oneSignalConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/onesignal${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'one-signal.svg', dark: 'one-signal.svg' },
    },
    {
        id: provider_enum_1.PushProviderIdEnum.Pushpad,
        displayName: 'Pushpad',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.pushpadConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/pushpad${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'pushpad.svg', dark: 'pushpad.svg' },
    },
    {
        id: provider_enum_1.PushProviderIdEnum.FCM,
        displayName: 'Firebase Cloud Messaging',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.fcmConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/fcm${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'fcm.svg', dark: 'fcm.svg' },
    },
    {
        id: provider_enum_1.PushProviderIdEnum.EXPO,
        displayName: 'Expo Push',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.expoConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/expo-push${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'expo.svg', dark: 'expo.svg' },
    },
    {
        id: provider_enum_1.PushProviderIdEnum.APNS,
        displayName: 'APNs',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.apnsConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/apns${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'apns.png', dark: 'apns.png' },
        betaVersion: true,
    },
    {
        id: provider_enum_1.PushProviderIdEnum.PushWebhook,
        displayName: 'Push Webhook',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.pushWebhookConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/push-webhook${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'push-webhook.svg', dark: 'push-webhook.svg' },
        betaVersion: true,
    },
    {
        id: provider_enum_1.PushProviderIdEnum.PusherBeams,
        displayName: 'Pusher Beams',
        channel: entities_1.ChannelTypeEnum.PUSH,
        credentials: credentials_1.pusherBeamsConfig,
        docReference: `https://docs.wolf.co/channels-and-providers/push/pusher-beams${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'pusher-beams.svg', dark: 'pusher-beams.svg' },
    },
];
//# sourceMappingURL=push.js.map