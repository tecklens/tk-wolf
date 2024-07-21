import { CredentialsKeyEnum } from '../provider.enum';
const mailConfigBase = [
    {
        key: CredentialsKeyEnum.From,
        displayName: 'From email address',
        description: 'Use the same email address you used to authenticate your delivery provider',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SenderName,
        displayName: 'Sender name',
        type: 'string',
        required: true,
    },
];
const smsConfigBase = [
    {
        key: CredentialsKeyEnum.From,
        displayName: 'From',
        type: 'string',
        required: true,
    },
];
const pushConfigBase = [];
export const mailJsConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const mailgunConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.BaseUrl,
        displayName: 'Base URL',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.User,
        displayName: 'User name',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Domain,
        displayName: 'Domain',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const mailjetConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'API Secret',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const nexmoConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'API secret',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const mandrillConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const nodemailerConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'User',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Host,
        displayName: 'Host',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Port,
        displayName: 'Port',
        type: 'number',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Secure,
        displayName: 'Secure',
        type: 'boolean',
        required: false,
    },
    {
        key: CredentialsKeyEnum.RequireTls,
        displayName: 'Require TLS',
        type: 'switch',
        required: false,
    },
    {
        key: CredentialsKeyEnum.IgnoreTls,
        displayName: 'Ignore TLS',
        type: 'switch',
        required: false,
    },
    {
        key: CredentialsKeyEnum.TlsOptions,
        displayName: 'TLS options',
        type: 'object',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Domain,
        displayName: 'DKIM: Domain name',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'DKIM: Private key',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.AccountSid,
        displayName: 'DKIM: Key selector',
        type: 'string',
        required: false,
    },
    ...mailConfigBase,
];
export const postmarkConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const sendgridConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.IpPoolName,
        displayName: 'IP Pool Name',
        type: 'string',
        required: false,
    },
    ...mailConfigBase,
];
export const resendConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const mailtrapConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const plunkConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const sparkpostConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Region,
        displayName: 'Region',
        description: 'Use EU if your account is registered to SparkPost EU',
        type: 'dropdown',
        required: false,
        value: null,
        dropdown: [
            { name: 'Default', value: null },
            { name: 'EU', value: 'eu' },
        ],
    },
    ...mailConfigBase,
];
export const netCoreConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const sendinblueConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const sesConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Access key ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret access key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Region,
        displayName: 'Region',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const mailerSendConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const plivoConfig = [
    {
        key: CredentialsKeyEnum.AccountSid,
        displayName: 'Account SID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Token,
        displayName: 'Auth token',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const sms77Config = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const termiiConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const burstSmsConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'API Secret',
        type: 'string',
        required: true,
    },
];
export const bulkSmsConfig = [
    {
        key: CredentialsKeyEnum.ApiToken,
        displayName: 'API Token',
        type: 'string',
        required: true,
    },
];
export const iSendSmsConfig = [
    {
        key: CredentialsKeyEnum.ApiToken,
        displayName: 'API Token',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.From,
        displayName: 'Default Sender ID',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.ContentType,
        displayName: 'Content Type',
        type: 'dropdown',
        required: false,
        value: null,
        dropdown: [
            { name: 'Default', value: null },
            { name: 'Unicode', value: 'unicode' },
            { name: 'Plain', value: 'plain' },
        ],
    },
];
export const clickatellConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
];
export const snsConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Access key ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret access key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Region,
        displayName: 'AWS region',
        type: 'string',
        required: true,
    },
];
export const telnyxConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.MessageProfileId,
        displayName: 'Message profile ID',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const twilioConfig = [
    {
        key: CredentialsKeyEnum.AccountSid,
        displayName: 'Account SID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Token,
        displayName: 'Auth token',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const messagebirdConfig = [
    {
        key: CredentialsKeyEnum.AccessKey,
        displayName: 'Access key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const slackConfig = [
    {
        key: CredentialsKeyEnum.ApplicationId,
        displayName: 'Application Id',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ClientId,
        displayName: 'Client ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Client Secret',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.RedirectUrl,
        displayName: 'Redirect URL',
        description: 'Redirect after Slack OAuth flow finished (default behaviour will close the tab)',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Hmac,
        displayName: 'HMAC',
        type: 'switch',
        required: false,
    },
];
export const grafanaOnCallConfig = [
    {
        key: CredentialsKeyEnum.alertUid,
        displayName: 'Alert UID',
        type: 'string',
        description: 'a unique alert ID for grouping, maps to alert_uid of grafana webhook body content',
        required: false,
    },
    {
        key: CredentialsKeyEnum.title,
        displayName: 'Title.',
        type: 'string',
        description: 'title for the alert',
        required: false,
    },
    {
        key: CredentialsKeyEnum.imageUrl,
        displayName: 'Image URL',
        type: 'string',
        description: 'a URL for an image attached to alert, maps to image_url of grafana webhook body content',
        required: false,
    },
    {
        key: CredentialsKeyEnum.state,
        displayName: 'Alert State',
        type: 'string',
        description: 'either "ok" or "alerting". Helpful for auto-resolving',
        required: false,
    },
    {
        key: CredentialsKeyEnum.externalLink,
        displayName: 'External Link',
        type: 'string',
        description: 'link back to your monitoring system, maps to "link_to_upstream_details" of grafana webhook body content',
        required: false,
    },
];
export const getstreamConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
];
export const fcmConfig = [
    {
        key: CredentialsKeyEnum.ServiceAccount,
        displayName: 'Service Account (entire JSON file)',
        type: 'text',
        required: true,
    },
    ...pushConfigBase,
];
export const expoConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Access Token',
        type: 'text',
        required: true,
    },
    ...pushConfigBase,
];
export const pushWebhookConfig = [
    {
        key: CredentialsKeyEnum.WebhookUrl,
        displayName: 'Webhook URL',
        type: 'string',
        description: 'the webhook URL to call to trigger push notifications',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret Hmac Key',
        type: 'string',
        description: 'the secret used to sign webhooks calls',
        required: true,
    },
    ...pushConfigBase,
];
export const oneSignalConfig = [
    {
        key: CredentialsKeyEnum.ApplicationId,
        displayName: 'Application ID',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'text',
        required: true,
    },
    ...pushConfigBase,
];
export const pushpadConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Auth Token',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApplicationId,
        displayName: 'Project ID',
        type: 'text',
        required: true,
    },
    ...pushConfigBase,
];
export const apnsConfig = [
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Private Key',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Key ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ProjectName,
        displayName: 'Team ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApplicationId,
        displayName: 'Bundle ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Secure,
        displayName: 'Production',
        type: 'switch',
        required: false,
    },
    ...pushConfigBase,
];
export const gupshupConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'User id',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: true,
    },
];
export const firetextConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const outlook365Config = [
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const infobipSMSConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.BaseUrl,
        displayName: 'Base URL',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const infobipEmailConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.BaseUrl,
        displayName: 'Base URL',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const brazeEmailConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiURL,
        displayName: 'Base URL',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.AppID,
        displayName: 'Base URL',
        type: 'string',
        required: true,
    },
    ...mailConfigBase,
];
export const fortySixElksConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const kannelConfig = [
    {
        key: CredentialsKeyEnum.Host,
        displayName: 'Host',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Port,
        displayName: 'Port',
        type: 'number',
        required: true,
    },
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        type: 'string',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: false,
    },
    ...smsConfigBase,
];
export const maqsamConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'Access Key ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Access Secret',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const smsCentralConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.BaseUrl,
        displayName: 'Base URL',
        type: 'string',
        required: false,
    },
    ...smsConfigBase,
];
export const emailWebhookConfig = [
    {
        key: CredentialsKeyEnum.WebhookUrl,
        displayName: 'Webhook URL',
        type: 'string',
        description: 'the webhook URL to call instead of sending the email',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret Hmac Key',
        type: 'string',
        description: 'the secret used to sign webhooks calls',
        required: true,
    },
    ...mailConfigBase,
];
export const africasTalkingConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const wolfInAppConfig = [
    {
        key: CredentialsKeyEnum.Hmac,
        displayName: 'Security HMAC encryption',
        type: 'switch',
        required: false,
        tooltip: {
            text: 'When active it verifies if a request is performed by a specific user',
            when: false,
        },
    },
];
export const sendchampConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const clickSendConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        description: 'Your Clicksend API username',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'text',
        required: true,
    },
    ...smsConfigBase,
];
export const simpleTextingConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'text',
        required: true,
    },
    ...smsConfigBase,
];
export const bandwidthConfig = [
    {
        key: CredentialsKeyEnum.User,
        displayName: 'Username',
        description: 'Your Bandwidth account username',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Password,
        displayName: 'Password',
        type: 'password',
        required: true,
    },
    {
        key: CredentialsKeyEnum.AccountSid,
        displayName: 'Account ID',
        type: 'text',
        required: true,
    },
    ...smsConfigBase,
];
export const genericSmsConfig = [
    {
        key: CredentialsKeyEnum.BaseUrl,
        displayName: 'Base URL',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiKeyRequestHeader,
        displayName: 'API Key Request Header',
        type: 'string',
        description: 'The name of the header attribute to use for the API key ex. (X-API-KEY, apiKey, ...)',
        required: true,
    },
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        description: 'The value of the header attribute to use for the API key.',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKeyRequestHeader,
        displayName: 'Secret Key Request Header',
        type: 'string',
        description: 'The name of the header attribute to use for the secret key ex. (X-SECRET-KEY, secretKey, ...)',
        required: false,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret Key',
        type: 'string',
        description: 'The value of the header attribute to use for the secret key',
        required: false,
    },
    {
        key: CredentialsKeyEnum.IdPath,
        displayName: 'Id Path',
        type: 'string',
        value: 'data.id',
        description: 'The path to the id field in the response data ex. (id, message.id, ...)',
        required: true,
    },
    {
        key: CredentialsKeyEnum.DatePath,
        displayName: 'Date Path',
        type: 'string',
        value: 'data.date',
        description: 'The path to the date field in the response data ex. (date, message.date, ...)',
        required: false,
    },
    {
        key: CredentialsKeyEnum.AuthenticateByToken,
        displayName: 'Authenticate by token',
        type: 'switch',
        description: 'If enabled, the API key and secret key will be sent as a token in the Authorization header',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Domain,
        displayName: 'Auth URL',
        type: 'string',
        description: 'The URL to use for authentication in case the Authenticate by token option is enabled',
        required: false,
        tooltip: {
            text: 'The URL to use for authentication in case the Authenticate by token option is enabled',
            when: true,
        },
    },
    {
        key: CredentialsKeyEnum.AuthenticationTokenKey,
        displayName: 'Authentication Token Key',
        type: 'string',
        description: 'The name of the header attribute to use for the authentication token ex. (X-AUTH-TOKEN, auth-token, ...)',
        required: false,
    },
    ...smsConfigBase,
];
export const pusherBeamsConfig = [
    {
        key: CredentialsKeyEnum.InstanceId,
        displayName: 'Instance ID',
        description: 'The unique identifier for your Beams instance',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Secret Key',
        description: 'The secret key your server will use to access your Beams instance',
        type: 'string',
        required: true,
    },
    ...pushConfigBase,
];
export const azureSmsConfig = [
    {
        key: CredentialsKeyEnum.AccessKey,
        displayName: 'Connection string',
        description: 'Your Azure account connection string',
        type: 'text',
        required: true,
    },
    ...smsConfigBase,
];
export const rocketChatConfig = [
    {
        key: CredentialsKeyEnum.Token,
        displayName: 'Personal Access Token (x-auth-token)',
        description: 'Personal Access Token of your user',
        type: 'text',
        required: true,
    },
    {
        key: CredentialsKeyEnum.User,
        displayName: 'User id (x-user-id)',
        description: 'Your User id',
        type: 'text',
        required: true,
    },
];
export const ringCentralConfig = [
    {
        key: CredentialsKeyEnum.ClientId,
        displayName: 'Client ID',
        description: 'Your RingCentral app client ID',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.SecretKey,
        displayName: 'Client secret',
        description: 'Your RingCentral app client secret',
        type: 'string',
        required: true,
    },
    {
        key: CredentialsKeyEnum.Secure,
        displayName: 'Is sandbox',
        type: 'switch',
        required: false,
    },
    {
        key: CredentialsKeyEnum.Token,
        displayName: 'JWT token',
        description: 'Your RingCentral user JWT token',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
export const brevoSmsConfig = [
    {
        key: CredentialsKeyEnum.ApiKey,
        displayName: 'API Key',
        type: 'string',
        required: true,
    },
    ...smsConfigBase,
];
//# sourceMappingURL=provider-credentials.js.map