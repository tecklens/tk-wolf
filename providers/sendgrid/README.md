# Nodejs SendGrid Provider

A sendgrid email provider library for [@novu/stateless](https://github.com/wolfhq/wolf)

## Usage

```javascript
import { SendgridEmailProvider } from '@wolf/sendgrid';

const provider = new SendgridEmailProvider({
  apiKey: process.env.SENDGRID_API_KEY
});
```
