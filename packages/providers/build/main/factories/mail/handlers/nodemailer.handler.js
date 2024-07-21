"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const nodemailer_1 = require("@wolfxlabs/nodemailer");
const base_handler_1 = require("./base.handler");
class NodemailerHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('nodemailer', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new nodemailer_1.NodemailerProvider({
            from: from,
            host: credentials.host,
            port: Number(credentials.port),
            secure: credentials.secure,
            user: credentials.user,
            password: credentials.password,
            requireTls: credentials.requireTls,
            ignoreTls: credentials.ignoreTls,
            tlsOptions: credentials.tlsOptions,
            dkim: {
                domainName: credentials.domain,
                keySelector: credentials.accountSid,
                privateKey: credentials.secretKey,
            },
            senderName: credentials.senderName,
        });
    }
}
exports.NodemailerHandler = NodemailerHandler;
//# sourceMappingURL=nodemailer.handler.js.map