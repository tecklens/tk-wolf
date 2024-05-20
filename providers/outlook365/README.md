# wolf Outlook365 Provider

A Outlook365 email provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

```javascript
import { Outlook365Provider } from '@wolf/outlook365';

const provider = new Outlook365Provider({
  from: process.env.OUTLOOK365_FROM_EMAIL,
  senderName: process.env.OUTLOOK365_SENDER_NAME,
  password: process.env.OUTLOOK365_PASSWORD,
});
```
