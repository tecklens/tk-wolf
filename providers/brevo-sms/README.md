# wolf BrevoSms Provider

A BrevoSms sms provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { BrevoSmsProvider } from '@wolf/brevo-sms';

const provider = new BrevoSmsProvider({
  apiKey: process.env.BREVO_API_KEY,
  from: process.env.BREVO_FROM, // Sender displayed to the recipient
});

await provider.sendMessage({
  to: 'My Company',
  content: 'Message to send',
});
```
