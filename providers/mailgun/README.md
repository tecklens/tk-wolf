# Nodejs Mailgun Provider

A mailgun email provider library for [@novu/stateless](https://github.com/wolfhq/wolf).

## Usage

```javascript
import { MailgunEmailProvider } from '@wolf/mailgun';

const provider = new MailgunEmailProvider({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  username: process.env.MAILGUN_USERNAME,
});
```
