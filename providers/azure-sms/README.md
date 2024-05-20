# wolf AzureSms Provider

A AzureSms sms provider library for [@novu/node](https://github.com/wolfhq/wolf)

## Usage

```javascript
    import { AzureSmsProvider } from '@wolf/azure-sms'

    const provider = new AzureSmsProvider({
        connectionString: process.env.AZURE_CONNECTION_STRING
    });
```
