# wolf Telnyx Provider

A Telnyx sms provider library for [@novu/stateless](https://github.com/wolfhq/wolf)

## Usage

```javascript
import { TelnyxSmsProvider } from '@wolf/telnyx';

const provider = new TelnyxSmsProvider({
  apiKey: process.env.TELNYX_API_KEY,
  messageProfileId: process.env.TELNYX_MESSAGE_PROFILE_ID,
  from: process.env.FROM, // an alphanumeric sender Id 
});
```

