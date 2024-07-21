# Nodejs Postmark Provider

A postmark email provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { PostmarkEmailProvider } from '@wolf/postmark';

const provider = new PostmarkEmailProvider({
  apiKey: process.env.POSTMARK_API_KEY
});
```
