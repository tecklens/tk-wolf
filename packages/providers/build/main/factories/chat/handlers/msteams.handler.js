"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSTeamsHandler = void 0;
const base_handler_1 = require("./base.handler");
const ms_teams_1 = require("@wolfxlabs/ms-teams");
const stateless_1 = require("@wolfxlabs/stateless");
class MSTeamsHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('msteams', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new ms_teams_1.MsTeamsProvider({});
    }
}
exports.MSTeamsHandler = MSTeamsHandler;
//# sourceMappingURL=msteams.handler.js.map