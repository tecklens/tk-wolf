# wolf Sns Provider

A SNS SMS provider library for [@novu/stateless](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { SNSSmsProvider } from "@wolfxlabs/sns"

const provider = new SNSSmsProvider({
    region: "eu-west-1",
    accessKeyId: "AWS_ACCESS_KEY_ID",
    secretAccessKey: "AWS_SECRET_ACCESS_KEY",
});
```
