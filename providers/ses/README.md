# wolf Ses Provider

A SES email provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { SESEmailProvider } from "@wolfxlabs/ses"

const provider = new SESEmailProvider({
    region: "eu-west-1",
    accessKeyId: "AWS_ACCESS_KEY_ID",
    secretAccessKey: "AWS_SECRET_ACCESS_KEY",
    from: "from@email.com",
});
```
