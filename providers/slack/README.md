# wolf Slack Provider

A Slack chat provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

````javascript
import { SlackProvider } from '@wolf/slack';

const provider = new SlackProvider({
  applicationId: process.env.APPLICATION_ID,
  clientID: process.env.CLIENT_ID,
  secretKey: process.env.SECRET_KEY,
});
````
