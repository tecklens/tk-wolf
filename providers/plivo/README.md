# Nodejs Plivo Provider

A plivo sms provider library for [@novu/stateless](https://github.com/wolfhq/wolf).

## Usage

```javascript
import { PlivoSmsProvider } from '@wolf/plivo';

const provider = new PlivoSmsProvider({
  accountSid: process.env.PLIVO_ACCOUNT_ID,
  authToken: process.env.PLIVO_AUTH_TOKEN,
  from: process.env.PLIVO_FROM_NUMBER, // a valid plivo phone number
});
```
