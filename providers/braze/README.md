# wolf Braze Provider

A Braze email provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { BrazeEmailProvider } from '@wolf/braze';
const provider = new BrazeEmailProvider({
    apiKey: process.env.BRAZE_API_KEY,
    apiURL: process.env.BRAZE_API_URL,
    appID: process.env.BRAZE_API_ID,
})
```
