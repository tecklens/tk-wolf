# wolf Nexmo Provider

A Nexmo SMS provider library for [@novu/stateless](https://github.com/wolfhq/wolf)

## Usage

```javascript
import { NexmoSmsProvider } from '@wolf/nexmo';

const provider = new NexmoSmsProvider({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  from: process.env.VONAGE_FROM_NUMBER, // a valid Vonage phone number
});
```
