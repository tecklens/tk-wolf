"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsFactory = void 0;
const handlers_1 = require("./handlers");
class SmsFactory {
    constructor() {
        this.handlers = [
            new handlers_1.SnsHandler(),
            new handlers_1.TelnyxHandler(),
            new handlers_1.TwilioHandler(),
            new handlers_1.Sms77Handler(),
            new handlers_1.TermiiSmsHandler(),
            new handlers_1.PlivoHandler(),
            new handlers_1.ClickatellHandler(),
            new handlers_1.GupshupSmsHandler(),
            new handlers_1.FiretextSmsHandler(),
            new handlers_1.InfobipSmsHandler(),
            new handlers_1.BurstSmsHandler(),
            new handlers_1.FortySixElksHandler(),
            new handlers_1.KannelSmsHandler(),
            new handlers_1.MaqsamHandler(),
            new handlers_1.SmsCentralHandler(),
            new handlers_1.AfricasTalkingSmsHandler(),
            new handlers_1.SendchampSmsHandler(),
            new handlers_1.ClicksendSmsHandler(),
            new handlers_1.SimpletextingSmsHandler(),
            new handlers_1.BandwidthHandler(),
            new handlers_1.GenericSmsHandler(),
            new handlers_1.MessageBirdHandler(),
            new handlers_1.AzureSmsHandler(),
            new handlers_1.WolfSmsHandler(),
            new handlers_1.NexmoHandler(),
            new handlers_1.ISendSmsHandler(),
            new handlers_1.RingCentralHandler(),
            new handlers_1.BrevoSmsHandler(),
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
exports.SmsFactory = SmsFactory;
//# sourceMappingURL=sms.factory.js.map