"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostmarkHandler = void 0;
const stateless_1 = require("@wolf/stateless");
const postmark_1 = require("@wolf/postmark");
const base_handler_1 = require("./base.handler");
class PostmarkHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('postmark', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
        };
        this.provider = new postmark_1.PostmarkEmailProvider(config);
    }
}
exports.PostmarkHandler = PostmarkHandler;
//# sourceMappingURL=postmark.handler.js.map