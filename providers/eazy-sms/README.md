# wolf Eazy SMS Provider

A EazySms sms provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { EazySmsProvider } from '@wolf/eazy-sms';

const provider = new EazySmsProvider({
    apiKey: process.env.API_KEY,
    channelId: process.env.CHANNEL_ID,
});
```
