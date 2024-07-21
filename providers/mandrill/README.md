# Nodejs Mandrill Provider

A mandrill email provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { MandrillProvider } from '@wolf/mandrill';

const provider = new MandrillProvider({
  apiKey: process.env.API_KEY,
  from: process.env.EMAIL,
  senderName: process.env.SENDER_NAME
});
```
