# wolf Telnyx Provider

A Telnyx sms provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { TelnyxSmsProvider } from '@wolfxlabs/telnyx';

const provider = new TelnyxSmsProvider({
  apiKey: process.env.TELNYX_API_KEY,
  messageProfileId: process.env.TELNYX_MESSAGE_PROFILE_ID,
  from: process.env.FROM, // an alphanumeric sender Id 
});
```

