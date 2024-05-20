# wolf Clicksend Provider

A Clicksend sms provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

```javascript
    import { ClicksendSmsProvider } from '@wolf/clicksend'

    const provider = new ClicksendSmsProvider({
        username: process.env.CLICKSEND_USERNAME,
        apiKey: process.env.CLICKSEND_API_KEY,
        })
    ```
