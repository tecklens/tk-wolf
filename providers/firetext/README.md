# wolf Firetext Provider

A Firetext sms provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { FiretextSmsProvider } from '@wolfxlabs/firetext';

const provider = new FiretextSmsProvider({
  apiKey: process.env.FIRETEXT_API_KEY,
  from: process.env.FIRETEXT_FROM, // a valid Firetext reply number or Sender ID
});

await provider.sendMessage({
  to: '0123456789',
  content: 'Message to send',
});
```