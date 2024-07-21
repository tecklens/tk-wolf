# wolf PushWebhook Provider

This is a library that triggers a custom webhook and shows itself as a push library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { PushWebhookPushProvider } from '@wolf/push-webhook';

const provider = new PushWebhookPushProvider({
  webhookUrl: credentials.webhookUrl,
  hmacSecretKey: credentials.secretKey,
});
```
