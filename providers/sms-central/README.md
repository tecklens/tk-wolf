# wolf SmsCentral Provider

A SmsCentral sms provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage


```javascript
  import { SmsCentralSmsProvider } from '@wolf/sms-central';

  const provider = new SmsCentralSmsProvider({
    username: process.env.SMS_CENTRAL_USERNAME,
    password: process.env.SMS_CENTRAL_PASSWORD,
    from: process.env.SMS_CENTRAL_FROM,
    baseUrl: process.env.SMS_CENTRAL_BASE_URL,
  });
```
