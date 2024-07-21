# wolf ClickatellSmsProvider Provider

A ClickatellSmsProvider sms provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { ClickatellSmsProvider } from '@wolf/clickatell';

// one way sms integration
const provider = new ClickatellSmsProvider({
  apiKey: process.env.CLICKATELL_API_KEY,
});

// two way sms integration
const provider = new ClickatellSmsProvider({
  apiKey: process.env.CLICKATELL_API_KEY,
  isTwoWayIntegration: true
});
```
