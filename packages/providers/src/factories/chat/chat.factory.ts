import { IChatFactory, IChatHandler } from './interfaces';
import { SlackHandler } from './handlers/slack.handler';
import { DiscordHandler } from './handlers/discord.handler';
import { MSTeamsHandler } from './handlers/msteams.handler';
import { MattermostHandler } from './handlers/mattermost.handler';
import { GrafanaOnCallHandler } from './handlers/grafana-on-call.handler';
import { RyverHandler } from './handlers/ryver.handler';
import { ZulipHandler } from './handlers/zulip.handler';
import { GetstreamChatHandler } from './handlers/getstream.handler';
import { RocketChatHandler } from './handlers/rocket-chat.handler';
import { TelegramHandler } from './handlers/telegram.handler';
import { IProvider } from '@wolfxlabs/stateless';

export class ChatFactory implements IChatFactory {
  handlers: IChatHandler[] = [
    new SlackHandler(),
    new DiscordHandler(),
    new MSTeamsHandler(),
    new MattermostHandler(),
    new RyverHandler(),
    new ZulipHandler(),
    new GrafanaOnCallHandler(),
    new GetstreamChatHandler(),
    new RocketChatHandler(),
    new TelegramHandler(),
  ];

  getHandler(integration: IProvider) {
    const handler =
      this.handlers.find((handlerItem) =>
        handlerItem.canHandle(integration.providerId, integration.channel),
      ) ?? null;

    if (!handler) return null;

    handler.buildProvider(integration.credentials);

    return handler;
  }
}
