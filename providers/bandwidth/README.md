# wolf Bandwidth Provider

A Bandwidth sms provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

```javascript
    import { BandwidthSmsProvider } from '@wolf/bandwidth'

    const provider = new TwilioSmsProvider({
        username: process.env.BANDWIDTH_USERNAME,
        password: process.env.BANDWIDTH_PASSWORD,
        accountId: process.env.BANDWIDTH_ACCOUNT_ID, 
    });
```
