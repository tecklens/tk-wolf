"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inAppProviders = void 0;
const credentials_1 = require("../credentials");
const provider_enum_1 = require("../provider.enum");
const entities_1 = require("@stateless/lib/entities");
exports.inAppProviders = [
    {
        id: provider_enum_1.InAppProviderIdEnum.Novu,
        displayName: 'wolf In-App',
        channel: entities_1.ChannelTypeEnum.IN_APP,
        credentials: credentials_1.wolfInAppConfig,
        docReference: `https://docs.wolf.co/notification-center/introduction${provider_enum_1.UTM_CAMPAIGN_QUERY_PARAM}`,
        logoFileName: { light: 'wolf.png', dark: 'wolf.png' },
    },
];
//# sourceMappingURL=in-app.js.map