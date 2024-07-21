# Nodejs SendGrid Provider

A sendgrid email provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { SendgridEmailProvider } from '@wolfxlabs/sendgrid';

const provider = new SendgridEmailProvider({
  apiKey: process.env.SENDGRID_API_KEY
});
```
