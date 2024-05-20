# wolf Expo Provider

A Expo push provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

The payload field supports all [Message Request](https://docs.expo.dev/push-notifications/sending-notifications/#message-request-format) values, example below.

```ts
import { wolf } from '@novu/node';

const wolf = new wolf(process.env.NOVU_API_KEY);

wolf.trigger('event-name', {
  to: {
    subscriberId: '...',
  },
  payload: {
    badge: 1, 
    sound: 'default',
    priority: 'high',
  },
});
```
