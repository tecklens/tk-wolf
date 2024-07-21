# wolf Gupshup Provider

A Gupshup sms provider library for [@novu/node](https://github.com/tecklens/tk-wolf/)

## Usage

```javascript
import { GupshupSmsProvider } from '@wolfxlabs/gupshup';

const provider = new GupshupSmsProvider({
    userId: process.env.GUPSHUP_USER_ID,
    password: process.env.GUPSHUP_PASSWORD
});
```
