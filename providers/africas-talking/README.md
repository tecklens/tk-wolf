# wolf Africa's Talking Provider

An Africa's Talking SMS provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { AfricasTalkingSmsProvider } from '@wolf/africas-talking';

 const provider = new AfricasTalkingSmsProvider({
    apiKey: process.env.AFRICAS_TALKING_API_KEY,
    username: process.env.AFRICAS_TALKING_USERNAME,
    from: process.env.AFRICAS_TALKING_FROM
  });
```
